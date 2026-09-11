import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RequireAuth } from "@/components/require-auth";
import { PageError, PageLoading } from "@/components/page-state";
import { listInbox } from "@/lib/quay-api";
import type { Thread } from "@/lib/quay-types";
import t from "@/lib/i18n";

export const Route = createFileRoute("/inbox")({ component: () => (
  <RequireAuth>
    <Inbox />
  </RequireAuth>
) });

function Inbox() {
  const [threads, setThreads] = useState<Thread[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    void listInbox().then(setThreads).catch(() => setError(true));
  }, []);

  if (error) return <PageError />;
  if (!threads) return <PageLoading />;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-4xl tracking-tight">{t("INBOX")}</h1>
      <p className="mt-2 text-muted">{t("THREADS_INFO")}</p>
      <div className="mt-8 divide-y divide-border rounded-[var(--radius-xl)] border border-border bg-bg-elevated">
        {threads.length === 0 ? (
          <p className="px-5 py-12 text-center text-sm text-muted">{t("NO_MESSAGES_YET")}</p>
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
