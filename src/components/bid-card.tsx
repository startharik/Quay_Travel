import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/status-pill";
import t from "@/lib/i18n";
import type { Bid } from "@/lib/quay-types";
import { formatMoney } from "@/lib/utils";

export function BidCard({
  bid,
  canAccept,
  onAccept,
}: {
  bid: Bid;
  canAccept: boolean;
  onAccept: () => void;
}) {
  return (
    <article className="rounded-[var(--radius-lg)] border border-border bg-bg-elevated p-5 shadow-[var(--shadow-card)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">{bid.agencyTag}</p>
          <h3 className="mt-1 font-display text-xl leading-tight">{bid.agencyName}</h3>
          <p className="mt-1 text-sm text-muted">
            {bid.rating.toFixed(1)} · {bid.reviews} {t("REVIEWS")}
          </p>
        </div>
        <div className="text-right">
          <p className="font-display text-2xl tabular-nums leading-none">{formatMoney(bid.price)}</p>
          <p className="mt-1 text-xs text-muted">{t("OFFER_VALID_UNTIL_LABEL")} {bid.validUntil}</p>
        </div>
      </div>
      <p className="mt-4 text-base font-medium">{bid.title}</p>
      <p className="mt-1 text-sm leading-relaxed text-muted">{bid.highlights}</p>
      <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
        {bid.includes.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 size-3.5 shrink-0 text-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <StatusPill status={bid.status} />
        {canAccept && bid.status === "pending" ? (
          <Button variant="accent" onClick={onAccept}>
            {t("ACCEPT_THIS_OFFER")}
          </Button>
        ) : null}
      </div>
    </article>
  );
}
