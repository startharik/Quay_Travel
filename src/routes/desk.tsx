import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RequireAuth } from "@/components/require-auth";
import { TripCard } from "@/components/trip-card";
import { PageError, PageLoading } from "@/components/page-state";
import { Button } from "@/components/ui/button";
import { getMyProfile, listMarketplace, listMyBids, listMyTrips } from "@/lib/quay-api";
import type { Profile, TripRequest } from "@/lib/quay-types";
import t from "@/lib/i18n";

export const Route = createFileRoute("/desk")({ component: () => (
  <RequireAuth>
    <Desk />
  </RequireAuth>
) });

function Desk() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [trips, setTrips] = useState<TripRequest[] | null>(null);
  const [mine, setMine] = useState<TripRequest[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
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
      } catch {
        setError(true);
      }
    })();
  }, []);

  if (error) return <PageError />;
  if (!profile || !trips) {
    return <PageLoading className="h-64" />;
  }

  const isAgency = profile.role === "agency";

  return (
    <div className="space-y-10">
      <section className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">{profile.displayName}</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">{isAgency ? t("OPEN_BRIEFS") : t("YOUR_TRAVEL_DESK")}</h1>
        <p className="mt-3 text-muted">
          {isAgency
            ? t("TRAVELERS_POST")
            : t("POST_WHERE")}
        </p>
        {!isAgency ? (
          <Button asChild className="mt-6" size="lg">
            <Link to="/trips/new">{t("POST_A_TRIP")}</Link>
          </Button>
        ) : null}
      </section>

      {!isAgency ? (
        <section className="space-y-4">
          <h2 className="font-display text-2xl">{t("YOUR_TRAVEL_DESK")}</h2>
          {mine.length === 0 ? (
            <Empty text={t("NO_REQUESTS_YET")} />
          ) : (
            <Grid trips={mine} />
          )}
        </section>
      ) : (
        <section className="space-y-4">
          <h2 className="font-display text-2xl">{t("BIDS")}</h2>
          {mine.length === 0 ? <Empty text={t("YOU_HAVE_NOT_BID")} /> : <Grid trips={mine} />}
        </section>
      )}

      <section className="space-y-4">
        <h2 className="font-display text-2xl">{isAgency ? t("MARKETPLACE") : t("ALSO_OPEN")}</h2>
        {trips.length === 0 ? <Empty text={t("NOTHING_OPEN")} /> : <Grid trips={trips} />}
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
