import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { RequireAuth } from "@/components/require-auth";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import t from "@/lib/i18n";
import { createTrip, getMyProfile } from "@/lib/quay-api";
import type { Lodging } from "@/lib/quay-types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/trips/new")({ component: () => (
  <RequireAuth>
    <NewTrip />
  </RequireAuth>
) });

const TYPES = [t("TYPES_HONEYMOON"), t("TYPES_FAMILY"), t("TYPES_CITY_BREAK"), t("TYPES_ADVENTURE"), t("TYPES_BEACH"), t("TYPES_CULTURE")];
const LODGING: { id: Lodging; label: string; hint: string }[] = [
  { id: "budget", label: t("LODGING_BUDGET"), hint: t("LODGING_BUDGET_HINT") },
  { id: "mid", label: t("LODGING_MID"), hint: t("LODGING_MID_HINT") },
  { id: "luxury", label: t("LODGING_LUXURY"), hint: t("LODGING_LUX_HINT") },
];

function NewTrip() {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState(t("TYPES_CITY_BREAK"));
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
        <h1 className="font-display text-3xl">{t("AGENCY_CANNOT_POST")}</h1>
        <p className="mt-2 text-muted">{t("SWITCH_ROLE_IF_TRAVELING")}</p>
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
      setError(err instanceof Error ? err.message : t("COULD_NOT_PUBLISH"));
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">{t("NEW_REQUEST")}</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">{t("TELL_AGENCIES")}</h1>
      <p className="mt-3 text-muted">{t("BE_SPECIFIC")}</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-6 rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-5 sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={t("DESTINATION")} htmlFor="destination">
            <Input id="destination" name="destination" required placeholder="Amalfi Coast" />
          </Field>
          <Field label={t("COUNTRY")} htmlFor="country">
            <Input id="country" name="country" placeholder="Italy" />
          </Field>
        </div>
        <Field label={t("FLYING_FROM")} htmlFor="origin">
          <Input id="origin" name="origin" placeholder="New York" />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={t("START")} htmlFor="startDate">
            <Input id="startDate" name="startDate" type="date" required defaultValue="2026-10-15" />
          </Field>
          <Field label={t("END")} htmlFor="endDate">
            <Input id="endDate" name="endDate" type="date" required defaultValue="2026-10-22" />
          </Field>
        </div>
        <label className="flex items-center gap-2 text-sm text-muted">
          <input type="checkbox" name="flexible" className="size-4 accent-[var(--color-accent)]" defaultChecked />
          {t("DATES_FLEXIBLE")}
        </label>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label={t("ADULTS")} htmlFor="adults">
            <Input id="adults" name="adults" type="number" min={1} defaultValue={2} />
          </Field>
          <Field label={t("CHILDREN")} htmlFor="children">
            <Input id="children" name="children" type="number" min={0} defaultValue={0} />
          </Field>
          <Field label={t("BUDGET")} htmlFor="budget">
            <Input id="budget" name="budget" type="number" min={200} step={50} defaultValue={4000} />
          </Field>
        </div>
        <div>
          <p className="mb-2 text-xs font-medium tracking-wide text-muted">{t("TRIP_TYPE")}</p>
          <div className="flex flex-wrap gap-2">
            {TYPES.map((tVal) => (
              <button
                key={tVal}
                type="button"
                onClick={() => setTripType(tVal)}
                className={cn(
                  "h-10 rounded-full border px-3 text-sm",
                  tripType === tVal ? "border-ink bg-ink text-bg-elevated" : "border-border bg-bg text-muted",
                )}
              >
                {tVal}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-medium tracking-wide text-muted">{t("LODGING")}</p>
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
        <Field label={t("MUST_HAVES")} htmlFor="notes">
          <Textarea id="notes" name="notes" placeholder="رحلات من نيويورك. فندق هادئ. درس طهي واحد." />
        </Field>
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <div className="flex justify-end">
          <Button type="submit" size="lg">
            {t("PUBLISH_REQUEST")}
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
