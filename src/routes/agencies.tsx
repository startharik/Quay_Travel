import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RequireAuth } from "@/components/require-auth";
import { listAgencies } from "@/lib/quay-api";
import t from "@/lib/i18n";

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
      <h1 className="font-display text-4xl tracking-tight">{t("AGENCIES")}</h1>
      <p className="mt-2 max-w-xl text-muted">{t("AGENCIES_DESC")}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {rows.map((a) => (
          <article key={a.user_id} className="rounded-[var(--radius-lg)] border border-border bg-bg-elevated p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-muted">{a.city || t("INDEPENDENT")}</p>
            <h2 className="mt-1 font-display text-2xl">{a.company || a.display_name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{a.bio || t("NO_BIO_YET")}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
