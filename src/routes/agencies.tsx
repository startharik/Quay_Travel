import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RequireAuth } from "@/components/require-auth";
import { listAgencies } from "@/lib/quay-api";

export const Route = createFileRoute("/agencies")({ component: () => (
  <RequireAuth>
    <Agencies />
  </RequireAuth>
) });

function Agencies() {
  const [rows, setRows] = useState<
    { user_id: string; display_name: string; company: string; city: string; bio: string }[] | null
  >(null);

  useEffect(() => {
    void listAgencies().then(setRows);
  }, []);

  if (!rows) return <div className="h-48 animate-pulse rounded-[var(--radius-lg)] bg-surface" />;

  return (
    <div>
      <h1 className="font-display text-4xl tracking-tight">Agencies</h1>
      <p className="mt-2 max-w-xl text-muted">Desks that have a profile on Quay. Sample houses are listed so the marketplace is not empty.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {rows.map((a) => (
          <article key={a.user_id} className="rounded-[var(--radius-lg)] border border-border bg-bg-elevated p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-muted">{a.city || "Independent"}</p>
            <h2 className="mt-1 font-display text-2xl">{a.company || a.display_name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{a.bio || "No bio yet."}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
