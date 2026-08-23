import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RequireAuth } from "@/components/require-auth";
import { listInbox } from "@/lib/quay-api";
import type { Thread } from "@/lib/quay-types";

export const Route = createFileRoute("/inbox")({ component: () => (
  <RequireAuth>
    <Inbox />
  </RequireAuth>
) });

function Inbox() {
  const [threads, setThreads] = useState<Thread[] | null>(null);

  useEffect(() => {
    void listInbox().then(setThreads);
  }, []);

  if (!threads) return <div className="h-48 animate-pulse rounded-[var(--radius-lg)] bg-surface" />;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-4xl tracking-tight">Inbox</h1>
      <p className="mt-2 text-muted">Threads live on each trip. Seed conversations appear for the sample briefs.</p>
      <div className="mt-8 divide-y divide-border rounded-[var(--radius-xl)] border border-border bg-bg-elevated">
        {threads.length === 0 ? (
          <p className="px-5 py-12 text-center text-sm text-muted">No messages yet. Bid or post a request first.</p>
        ) : (
          threads.map((t) => (
            <Link
              key={t.tripId}
              to="/trips/$id"
              params={{ id: t.tripId }}
              className="block px-5 py-4 hover:bg-surface"
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-medium">{t.destination}</p>
                <p className="text-xs text-subtle">{new Date(t.lastAt).toLocaleDateString()}</p>
              </div>
              <p className="mt-1 text-sm text-muted">{t.counterpart}</p>
              <p className="mt-1 line-clamp-2 text-sm">{t.lastBody}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
