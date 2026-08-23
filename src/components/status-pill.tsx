import type { BidStatus, RequestStatus } from "@/lib/quay-types";
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
    open: "Open",
    awarded: "Awarded",
    closed: "Closed",
    pending: "Pending",
    accepted: "Accepted",
    declined: "Declined",
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
