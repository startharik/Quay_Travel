import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { RequireAuth } from "@/components/require-auth";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createTrip, getMyProfile } from "@/lib/quay-api";
import type { Lodging } from "@/lib/quay-types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/trips/new")({ component: () => (
  <RequireAuth>
    <NewTrip />
  </RequireAuth>
) });

const TYPES = ["Honeymoon", "Family", "City break", "Adventure", "Beach", "Culture"];
const LODGING: { id: Lodging; label: string; hint: string }[] = [
  { id: "budget", label: "Budget", hint: "Clean, simple, well located" },
  { id: "mid", label: "Mid-range", hint: "Comfort without the theatre" },
  { id: "luxury", label: "Luxury", hint: "Rooms with a point of view" },
];

function NewTrip() {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState("City break");
  const [lodging, setLodging] = useState<Lodging>("mid");
  const [blocked, setBlocked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void getMyProfile().then((p) => {
      if (!p) window.location.href = "/onboarding";
      else if (p.role !== "traveler") setBlocked(true);
    });
  }, []);

  if (blocked) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <h1 className="font-display text-3xl">Agency desks cannot post briefs</h1>
        <p className="mt-2 text-muted">Switch your role in profile if you are traveling yourself.</p>
      </div>
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    try {
      const res = await createTrip({
        data: {
          destination: String(data.get("destination") || "").trim(),
          country: String(data.get("country") || "").trim(),
          origin: String(data.get("origin") || "").trim(),
          startDate: String(data.get("startDate") || ""),
          endDate: String(data.get("endDate") || ""),
          flexible: data.get("flexible") === "on",
          adults: Number(data.get("adults") || 1),
          children: Number(data.get("children") || 0),
          budget: Number(data.get("budget") || 0),
          tripType,
          lodging,
          notes: String(data.get("notes") || "").trim(),
        },
      });
      void navigate({ to: "/trips/$id", params: { id: res.id } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not publish");
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">New request</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">Tell agencies what you want</h1>
      <p className="mt-3 text-muted">Be specific. Vague briefs get vague bids.</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-6 rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-5 sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Destination" htmlFor="destination">
            <Input id="destination" name="destination" required placeholder="Amalfi Coast" />
          </Field>
          <Field label="Country" htmlFor="country">
            <Input id="country" name="country" placeholder="Italy" />
          </Field>
        </div>
        <Field label="Flying from" htmlFor="origin">
          <Input id="origin" name="origin" placeholder="New York" />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Start" htmlFor="startDate">
            <Input id="startDate" name="startDate" type="date" required defaultValue="2026-10-15" />
          </Field>
          <Field label="End" htmlFor="endDate">
            <Input id="endDate" name="endDate" type="date" required defaultValue="2026-10-22" />
          </Field>
        </div>
        <label className="flex items-center gap-2 text-sm text-muted">
          <input type="checkbox" name="flexible" className="size-4 accent-[var(--color-accent)]" defaultChecked />
          Dates are flexible by a few days
        </label>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Adults" htmlFor="adults">
            <Input id="adults" name="adults" type="number" min={1} defaultValue={2} />
          </Field>
          <Field label="Children" htmlFor="children">
            <Input id="children" name="children" type="number" min={0} defaultValue={0} />
          </Field>
          <Field label="Budget (USD, total)" htmlFor="budget">
            <Input id="budget" name="budget" type="number" min={200} step={50} defaultValue={4000} />
          </Field>
        </div>
        <div>
          <p className="mb-2 text-xs font-medium tracking-wide text-muted">Trip type</p>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTripType(t)}
                className={cn(
                  "h-10 rounded-full border px-3 text-sm",
                  tripType === t ? "border-ink bg-ink text-bg-elevated" : "border-border bg-bg text-muted",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-medium tracking-wide text-muted">Lodging</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {LODGING.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setLodging(l.id)}
                className={cn(
                  "rounded-[var(--radius-md)] border p-3 text-left",
                  lodging === l.id ? "border-ink bg-surface" : "border-border bg-bg",
                )}
              >
                <span className="block text-sm font-medium">{l.label}</span>
                <span className="mt-1 block text-xs text-muted">{l.hint}</span>
              </button>
            ))}
          </div>
        </div>
        <Field label="Must-haves and notes" htmlFor="notes">
          <Textarea id="notes" name="notes" placeholder="Flights from New York. Quiet hotel. One cooking class." />
        </Field>
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <div className="flex justify-end">
          <Button type="submit" size="lg">
            Publish request
          </Button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}
