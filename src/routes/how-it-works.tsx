import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/how-it-works")({ component: How });

function How() {
  return (
    <article className="mx-auto max-w-2xl space-y-8">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Guide</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">How Quay works</h1>
      </header>
      <section className="space-y-3">
        <h2 className="font-display text-2xl">For travelers</h2>
        <p className="leading-relaxed text-muted">
          You are not browsing a catalogue. You write the trip you actually want — destination, dates, who is coming, a hard budget, lodging level, and notes. Agencies see that brief and bid. You compare packages, accept one, and message the desk from the inbox.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-2xl">For agencies</h2>
        <p className="leading-relaxed text-muted">
          Open requests sit on the marketplace. Bid with a real price and a list of inclusions. If the traveler accepts, the other bids close. You can write in the thread attached to that trip.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-2xl">Accounts</h2>
        <p className="leading-relaxed text-muted">
          Sign in with Google, X, or email. On first visit you choose traveler or agency and complete a short profile. Your requests, bids, and messages stay on your account.
        </p>
      </section>
      <Button asChild>
        <Link to="/login">Sign in</Link>
      </Button>
    </article>
  );
}
