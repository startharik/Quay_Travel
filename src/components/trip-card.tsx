import { Link } from "@tanstack/react-router";
import { Calendar, Users } from "lucide-react";
import { StatusPill } from "@/components/status-pill";
import { lodgingLabel, type TripRequest } from "@/lib/quay-types";
import { formatMoney, formatRange, nightsBetween } from "@/lib/utils";

export function DestinationArt({ placeKey, className = "" }: { placeKey: string; className?: string }) {
  const key = ["santorini", "kyoto", "lisbon", "iceland", "marrakech", "amalfi"].includes(placeKey)
    ? placeKey
    : "default";
  return <div className={`dest-art ${className}`} data-place={key} aria-hidden="true" />;
}

export function TripCard({ trip }: { trip: TripRequest }) {
  return (
    <Link
      to="/trips/$id"
      params={{ id: trip.id }}
      className="group block overflow-hidden rounded-[var(--radius-xl)] border border-border bg-bg-elevated shadow-[var(--shadow-card)] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5"
    >
      <DestinationArt placeKey={trip.placeKey} className="h-36 w-full" />
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">{trip.country}</p>
            <h3 className="font-display text-2xl leading-tight tracking-tight">{trip.destination}</h3>
          </div>
          <StatusPill status={trip.status} />
        </div>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            {formatRange(trip.startDate, trip.endDate)}
          </span>
          <span>{nightsBetween(trip.startDate, trip.endDate)} nights</span>
        </p>
        <p className="flex items-center gap-1.5 text-sm text-muted">
          <Users className="size-3.5" />
          {trip.adults} adult{trip.adults === 1 ? "" : "s"}
          {trip.children ? ` · ${trip.children} child${trip.children === 1 ? "" : "ren"}` : ""}
          <span className="text-subtle">·</span>
          {trip.tripType}
          <span className="text-subtle">·</span>
          {lodgingLabel(trip.lodging)}
        </p>
        <div className="flex items-end justify-between border-t border-border pt-3">
          <div>
            <p className="text-xs text-muted">Budget</p>
            <p className="font-display text-xl tabular-nums">{formatMoney(trip.budget)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted">
              {trip.bidCount === 0 ? "No bids yet" : `${trip.bidCount} bid${trip.bidCount === 1 ? "" : "s"}`}
            </p>
            {trip.lowestBid != null ? (
              <p className="text-sm tabular-nums text-accent">from {formatMoney(trip.lowestBid)}</p>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
}
