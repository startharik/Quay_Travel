import type { BidStatus, RequestStatus } from "@/lib/quay-types";
import t from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function StatusPill({ status }: { status: RequestStatus | BidStatus }) {
  const map: Record<string, string> = {
    open: "bg-accent-soft text-accent",
    awarded: "bg-surface text-ok",
    closed: "bg-surface text-muted",
    pending: "bg-accent-soft text-accent",
    accepted: "bg-surface text-ok",
    declined: "bg-surface text-muted",
  };
  const label: Record<string, string> = {
    open: t("STATUS_OPEN"),
    awarded: t("STATUS_AWARDED"),
    closed: t("STATUS_CLOSED"),
    pending: t("STATUS_PENDING"),
    accepted: t("STATUS_ACCEPTED"),
    declined: t("STATUS_DECLINED"),
  };
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-full px-2.5 text-[11px] font-medium uppercase tracking-wider",
        map[status],
      )}
    >
      {label[status]}
    </span>
  );
}
