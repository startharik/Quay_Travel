import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RequireAuth } from "@/components/require-auth";
import { TripCard } from "@/components/trip-card";
import { Button } from "@/components/ui/button";
import { getMyProfile, listMarketplace, listMyBids, listMyTrips } from "@/lib/quay-api";
import type { Profile, TripRequest } from "@/lib/quay-types";

export const Route = createFileRoute("/desk")({ component: () => (
  <RequireAuth>
    <Desk />
  </RequireAuth>
) });

function Desk() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [trips, setTrips] = useState<TripRequest[] | null>(null);
  const [mine, setMine] = useState<TripRequest[]>([]);

  useEffect(() => {
    void (async () => {
      const p = await getMyProfile();
      setProfile(p);
      if (!p) {
        window.location.href = "/onboarding";
        return;
      }
      if (p.role === "agency") {
        const [open, bids] = await Promise.all([listMarketplace(), listMyBids()]);
        setTrips(open);
        setMine(bids);
      } else {
        const [own, open] = await Promise.all([listMyTrips(), listMarketplace()]);
        setMine(own);
        setTrips(open);
      }
    })();
  }, []);

  if (!profile || !trips) {
    return <div className="h-64 animate-pulse rounded-[var(--radius-lg)] bg-surface" />;
  }

  const isAgency = profile.role === "agency";

  return (
    <div className="space-y-10">
      <section className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">{profile.displayName}</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">
          {isAgency ? "Open briefs on the quay" : "Your travel desk"}
        </h1>
        <p className="mt-3 text-muted">
          {isAgency
            ? "Travelers already named the destination and the ceiling. Answer with a real package."
            : "Post a brief. Agencies compete. You pick one offer and talk in the inbox."}
        </p>
        {!isAgency ? (
          <Button asChild className="mt-6" size="lg">
            <Link to="/trips/new">Post a trip request</Link>
          </Button>
        ) : null}
      </section>

      {!isAgency ? (
        <section className="space-y-4">
          <h2 className="font-display text-2xl">Your requests</h2>
          {mine.length === 0 ? (
            <Empty text="No requests yet. Post one and agencies will bid." />
          ) : (
            <Grid trips={mine} />
          )}
        </section>
      ) : (
        <section className="space-y-4">
          <h2 className="font-display text-2xl">Your bids</h2>
          {mine.length === 0 ? <Empty text="You have not bid yet." /> : <Grid trips={mine} />}
        </section>
      )}

      <section className="space-y-4">
        <h2 className="font-display text-2xl">{isAgency ? "Marketplace" : "Also open"}</h2>
        {trips.length === 0 ? <Empty text="Nothing open right now." /> : <Grid trips={trips} />}
      </section>
    </div>
  );
}

function Grid({ trips }: { trips: TripRequest[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {trips.map((t) => (
        <TripCard key={t.id} trip={t} />
      ))}
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-dashed border-border-strong px-6 py-12 text-center text-sm text-muted">
      {text}
    </div>
  );
}
