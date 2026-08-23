import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react";
import { BidCard } from "@/components/bid-card";
import { RequireAuth } from "@/components/require-auth";
import { DestinationArt } from "@/components/trip-card";
import { StatusPill } from "@/components/status-pill";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import t from "@/lib/i18n";
import { acceptBid, getMyProfile, getTrip, listMessages, placeBid, sendMessage } from "@/lib/quay-api";
import { lodgingLabel, type Bid, type Message, type Profile, type TripRequest } from "@/lib/quay-types";
import { formatMoney, formatRange, nightsBetween } from "@/lib/utils";

export const Route = createFileRoute("/trips/$id")({ component: () => (
  <RequireAuth>
    <TripDetail />
  </RequireAuth>
) });

function TripDetail() {
  const { id } = Route.useParams();
  const user = useCurrentUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [trip, setTrip] = useState<TripRequest | null | undefined>(undefined);
  const [bids, setBids] = useState<Bid[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showBidForm, setShowBidForm] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  async function reload() {
    const [{ trip: t, bids: b }, p] = await Promise.all([getTrip({ data: id }), getMyProfile()]);
    setTrip(t);
    setBids(b);
    setProfile(p);
    try {
      setMessages(await listMessages({ data: id }));
    } catch {
      setMessages([]);
    }
  }

  useEffect(() => {
    void reload();
  }, [id]);

  if (trip === undefined) return <div className="h-64 animate-pulse rounded-[var(--radius-lg)] bg-surface" />;
  if (!trip) {
    return (
      <div className="py-20 text-center">
        <h1 className="font-display text-3xl">{t("REQUEST_NOT_FOUND")}</h1>
        <Link to="/desk" className="mt-4 inline-block text-sm text-accent">
          {t("BACK_TO_DESK")}
        </Link>
      </div>
    );
  }

  const tripId = trip.id;
  const isOwner = user?.id === trip.userId;
  const myBid = bids.find((b) => b.userId === user?.id);
  const canAccept = profile?.role === "traveler" && isOwner && trip.status === "open";
  const canBid = profile?.role === "agency" && trip.status === "open";
  const canMessage = isOwner || Boolean(myBid);

  async function onAccept(bidId: string) {
    await acceptBid({ data: bidId });
    setNotice(t("OFFER_ACCEPTED_NOTICE"));
    await reload();
  }

  async function onBid(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const includes = String(data.get("includes") || "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    await placeBid({
      data: {
        tripId,
        price: Number(data.get("price") || 0),
        title: String(data.get("title") || "").trim(),
        highlights: String(data.get("highlights") || "").trim(),
        includes: includes.length ? includes : ["Package as described"],
        validUntil: String(data.get("validUntil") || "2026-09-15"),
      },
    });
    setShowBidForm(false);
    await reload();
  }

  async function onMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = String(data.get("body") || "").trim();
    if (!body) return;
    await sendMessage({ data: { tripId, body } });
    e.currentTarget.reset();
    setMessages(await listMessages({ data: tripId }));
  }

  return (
    <div className="space-y-8">
      <Link to="/desk" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
        <ArrowLeft className="size-4" />
        {t("DESK")}
      </Link>

      {notice ? (
        <div className="rounded-[var(--radius-lg)] border border-accent/30 bg-accent-soft px-4 py-3 text-sm">{notice}</div>
      ) : null}

      <div className="overflow-hidden rounded-[var(--radius-xl)] border border-border bg-bg-elevated shadow-[var(--shadow-card)]">
        <DestinationArt placeKey={trip.placeKey} className="h-44 w-full sm:h-56" />
        <div className="grid gap-6 p-5 sm:grid-cols-[1fr_auto] sm:p-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">{trip.country}</p>
            <h1 className="mt-1 font-display text-4xl tracking-tight">{trip.destination}</h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{trip.notes}</p>
            <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
              <Info icon={<Calendar className="size-4" />} label={t("DATES")}>
                {formatRange(trip.startDate, trip.endDate)} · {nightsBetween(trip.startDate, trip.endDate)} {t("NIGHTS")}
                {trip.flexible ? ` · ${t("DATES_FLEXIBLE")}` : ""}
              </Info>
              <Info icon={<Users className="size-4" />} label={t("PARTY")}>
                {trip.adults} {trip.adults === 1 ? t("ADULT") : t("ADULTS")}
                {trip.children ? `, ${trip.children} ${trip.children === 1 ? t("CHILD") : t("CHILDREN")}` : ""}
              </Info>
              <Info icon={<MapPin className="size-4" />} label={t("STYLE")}>
                {trip.tripType} · {lodgingLabel(trip.lodging)}
              </Info>
              <Info label={t("POSTED_BY")}>{trip.travelerName}</Info>
              {trip.origin ? <Info label={t("FLYING_FROM_LABEL")}>{trip.origin}</Info> : null}
            </dl>
          </div>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <StatusPill status={trip.status} />
            <div className="text-left sm:text-right">
              <p className="text-xs text-muted">{t("CEILING")}</p>
              <p className="font-display text-3xl tabular-nums">{formatMoney(trip.budget)}</p>
            </div>
            {canBid && !showBidForm ? (
              <Button variant="accent" onClick={() => setShowBidForm(true)}>
                {myBid ? t("UPDATE_YOUR_BID") : t("PLACE_A_BID")}
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      {showBidForm && canBid ? (
        <form onSubmit={onBid} className="space-y-4 rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-5 sm:p-8">
          <h2 className="font-display text-2xl">{t("YOUR_OFFER")}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="title">{t("PACKAGE_TITLE")}</Label>
              <Input id="title" name="title" required defaultValue={myBid?.title ?? ""} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="price">{t("PRICE_USD")}</Label>
              <Input id="price" name="price" type="number" min={100} required defaultValue={myBid?.price ?? trip.budget} />
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="highlights">{t("WHY_THIS_PACKAGE")}</Label>
            <Textarea id="highlights" name="highlights" defaultValue={myBid?.highlights ?? ""} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="includes">{t("INCLUDED_ONE_PER_LINE")}</Label>
            <Textarea
              id="includes"
              name="includes"
              defaultValue={myBid?.includes.join("\n") ?? "رحلات\nنقل\nفندق مع إفطار"}
            />
          </div>
          <div className="grid max-w-xs gap-1.5">
            <Label htmlFor="validUntil">{t("OFFER_VALID_UNTIL")}</Label>
            <Input id="validUntil" name="validUntil" type="date" defaultValue="2026-09-15" />
          </div>
          <div className="flex gap-2">
            <Button type="submit" variant="accent">
              {t("SUBMIT_BID")}
            </Button>
            <Button type="button" variant="ghost" onClick={() => setShowBidForm(false)}>
              {t("CANCEL")}
            </Button>
          </div>
        </form>
      ) : null}

      <section className="space-y-4">
        <h2 className="font-display text-2xl tracking-tight">
          {bids.length === 0 ? t("BIDS") : `${bids.length} ${bids.length === 1 ? t("BIDS_HEADER_SINGULAR") : t("BIDS_HEADER_PLURAL")}`}
        </h2>
        {bids.length === 0 ? (
          <div className="rounded-[var(--radius-xl)] border border-dashed border-border-strong px-6 py-12 text-center">
            <p className="font-display text-xl">{t("NO_BIDS_YET")}</p>
            <p className="mt-2 text-sm text-muted">
              {canBid ? t("FIRST_DESK_PROMPT") : t("AGENCIES_WILL_APPEAR")}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {bids.map((bid) => (
              <BidCard key={bid.id} bid={bid} canAccept={canAccept} onAccept={() => void onAccept(bid.id)} />
            ))}
          </div>
        )}
      </section>

      {canMessage ? (
        <section className="space-y-4">
          <h2 className="font-display text-2xl">{t("THREAD")}</h2>
          <div className="space-y-3 rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-5">
            {messages.length === 0 ? <p className="text-sm text-muted">{t("NO_MESSAGES_YET")}</p> : null}
            {messages.map((m) => (
              <div key={m.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                <p className="text-xs text-muted">
                  {m.authorName} · {new Date(m.createdAt).toLocaleString()}
                </p>
                <p className="mt-1 text-sm">{m.body}</p>
              </div>
            ))}
            <form onSubmit={onMessage} className="flex flex-col gap-2 pt-2 sm:flex-row">
              <Input name="body" placeholder={t("WRITE_TO_OTHER_DESK")} className="flex-1" />
              <Button type="submit">{t("SEND")}</Button>
            </form>
          </div>
        </section>
      ) : (
        <p className="text-sm text-muted">{t("MESSAGE_TRAVELER_AFTER_BID")}</p>
      )}
    </div>
  );
}

function Info({
  label,
  children,
  icon,
}: {
  label: string;
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="flex gap-2">
      {icon ? <span className="mt-0.5 text-muted">{icon}</span> : null}
      <div>
        <dt className="text-xs text-muted">{label}</dt>
        <dd>{children}</dd>
      </div>
    </div>
  );
}
