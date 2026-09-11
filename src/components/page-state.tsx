import t from "@/lib/i18n";

export function PageLoading({ className = "h-48" }: { className?: string }) {
  return (
    <div className={`rounded-[var(--radius-lg)] border border-border bg-bg-elevated p-6 ${className}`}>
      <p className="text-sm text-muted">{t("LOADING")}</p>
      <div className="mt-4 h-2 w-2/3 animate-pulse rounded-full bg-surface" />
    </div>
  );
}

export function PageError({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-danger/30 bg-bg-elevated p-6">
      <p className="text-sm text-danger">{t("LOAD_FAILED")}</p>
      {onRetry ? (
        <button type="button" onClick={onRetry} className="mt-3 text-sm font-medium underline">
          {t("RETRY")}
        </button>
      ) : null}
    </div>
  );
}
