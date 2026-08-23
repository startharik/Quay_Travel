import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { user } = useCurrentUserState();

  return (
    <div className="space-y-16">
      <section className="max-w-2xl pt-4">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Reverse auction for holidays</p>
        <h1 className="mt-3 font-display text-4xl leading-[1.08] tracking-tight sm:text-6xl">
          Name the trip. Let agencies compete.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          Post where you want to go, the dates, the people, and a budget. Licensed desks send real packages. You accept one.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/login">
              Sign in to start
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/how-it-works">How it works</Link>
          </Button>
        </div>
        {user ? (
          <p className="mt-4">
            <Link to="/desk" className="text-sm text-accent">
              Open your desk
            </Link>
          </p>
        ) : null}
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { n: "01", t: "Brief", d: "Destination, dates, party, ceiling, and the things you will not compromise on." },
          { n: "02", t: "Bids", d: "Agencies answer with a price, an itinerary, and what is actually included." },
          { n: "03", t: "Award", d: "Accept one offer. Talk in the inbox. The rest of the bids close." },
        ].map((s) => (
          <article key={s.n} className="rounded-[var(--radius-lg)] border border-border bg-bg-elevated p-5">
            <p className="text-xs tracking-[0.16em] text-subtle">{s.n}</p>
            <h2 className="mt-2 font-display text-2xl">{s.t}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
