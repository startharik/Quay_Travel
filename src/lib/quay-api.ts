import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { placeKeyFrom, type Bid, type Message, type Profile, type Role, type Thread, type TripRequest } from "@/lib/quay-types";

type TripRow = {
  id: string;
  user_id: string;
  traveler_name: string;
  destination: string;
  place_key: string;
  country: string;
  origin: string;
  start_date: string;
  end_date: string;
  flexible: boolean;
  adults: number;
  children: number;
  budget: number;
  trip_type: string;
  lodging: TripRequest["lodging"];
  notes: string;
  status: TripRequest["status"];
  awarded_bid_id: string | null;
  created_at: string;
  bid_count: number;
  lowest_bid: number | null;
};

type BidRow = {
  id: string;
  trip_id: string;
  user_id: string;
  agency_name: string;
  agency_tag: string;
  rating: string | number;
  reviews: number;
  price: number;
  title: string;
  includes: string;
  highlights: string;
  valid_until: string;
  status: Bid["status"];
};

function mapTrip(r: TripRow): TripRequest {
  return {
    id: r.id,
    userId: r.user_id,
    travelerName: r.traveler_name,
    destination: r.destination,
    placeKey: r.place_key,
    country: r.country,
    origin: r.origin,
    startDate: String(r.start_date).slice(0, 10),
    endDate: String(r.end_date).slice(0, 10),
    flexible: Boolean(r.flexible),
    adults: Number(r.adults),
    children: Number(r.children),
    budget: Number(r.budget),
    tripType: r.trip_type,
    lodging: r.lodging,
    notes: r.notes,
    status: r.status,
    awardedBidId: r.awarded_bid_id,
    createdAt: String(r.created_at),
    bidCount: Number(r.bid_count ?? 0),
    lowestBid: r.lowest_bid == null ? null : Number(r.lowest_bid),
  };
}

function mapBid(r: BidRow): Bid {
  let includes: string[] = [];
  try {
    includes = JSON.parse(r.includes);
  } catch {
    includes = [];
  }
  return {
    id: r.id,
    tripId: r.trip_id,
    userId: r.user_id,
    agencyName: r.agency_name,
    agencyTag: r.agency_tag,
    rating: Number(r.rating),
    reviews: Number(r.reviews),
    price: Number(r.price),
    title: r.title,
    includes,
    highlights: r.highlights,
    validUntil: String(r.valid_until ?? "").slice(0, 10),
    status: r.status,
  };
}

const tripSelect = `
  select t.*,
    (select count(*) from bids b where b.trip_id = t.id) as bid_count,
    (select min(b.price) from bids b where b.trip_id = t.id) as lowest_bid
  from trips t
`;

export const getMyProfile = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{
      user_id: string;
      role: Role;
      display_name: string;
      company: string;
      city: string;
      bio: string;
      phone: string;
    }>`select user_id, role, display_name, company, city, bio, phone from profiles where user_id = ${context.userId}`;
    const r = rows[0];
    if (!r) return null;
    const profile: Profile = {
      userId: r.user_id,
      role: r.role,
      displayName: r.display_name,
      company: r.company,
      city: r.city,
      bio: r.bio,
      phone: r.phone,
    };
    return profile;
  });

export const saveProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      role: z.enum(["traveler", "agency"]),
      displayName: z.string().min(1).max(80),
      company: z.string().max(80).optional(),
      city: z.string().max(80).optional(),
      bio: z.string().max(600).optional(),
      phone: z.string().max(40).optional(),
    }),
  )
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`
      insert into profiles (user_id, role, display_name, company, city, bio, phone)
      values (
        ${context.userId},
        ${data.role},
        ${data.displayName.trim()},
        ${data.company?.trim() ?? ""},
        ${data.city?.trim() ?? ""},
        ${data.bio?.trim() ?? ""},
        ${data.phone?.trim() ?? ""}
      )
      on conflict (user_id) do update set
        role = excluded.role,
        display_name = excluded.display_name,
        company = excluded.company,
        city = excluded.city,
        bio = excluded.bio,
        phone = excluded.phone
    `;
    return { ok: true };
  });

export const listMarketplace = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const sql = await getSql();
    const rows = await sql.query<TripRow>(`${tripSelect} where t.status = 'open' order by t.created_at desc`);
    return rows.map(mapTrip);
  });

export const listMyTrips = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql.query<TripRow>(`${tripSelect} where t.user_id = $1 order by t.created_at desc`, [
      context.userId,
    ]);
    return rows.map(mapTrip);
  });

export const listMyBids = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql.query<TripRow>(
      `${tripSelect} where t.id in (select trip_id from bids where user_id = $1) order by t.created_at desc`,
      [context.userId],
    );
    return rows.map(mapTrip);
  });

export const getTrip = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(z.string())
  .handler(async ({ data: id }) => {
    const sql = await getSql();
    const rows = await sql.query<TripRow>(`${tripSelect} where t.id = $1`, [id]);
    const trip = rows[0] ? mapTrip(rows[0]) : null;
    const bidRows = await sql.query<BidRow>(`select * from bids where trip_id = $1 order by price asc`, [id]);
    return { trip, bids: bidRows.map(mapBid) };
  });

export const createTrip = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      destination: z.string().min(1).max(80),
      country: z.string().max(80),
      origin: z.string().max(80),
      startDate: z.string(),
      endDate: z.string(),
      flexible: z.boolean(),
      adults: z.number().int().min(1).max(20),
      children: z.number().int().min(0).max(20),
      budget: z.number().int().min(200),
      tripType: z.string().min(1).max(40),
      lodging: z.enum(["budget", "mid", "luxury"]),
      notes: z.string().max(2000),
    }),
  )
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const profile = await sql<{ display_name: string; role: Role }>`
      select display_name, role from profiles where user_id = ${context.userId}
    `;
    if (!profile[0] || profile[0].role !== "traveler") {
      throw new Error("Only travelers can post requests");
    }
    const id = crypto.randomUUID();
    await sql`
      insert into trips (
        id, user_id, traveler_name, destination, place_key, country, origin,
        start_date, end_date, flexible, adults, children, budget, trip_type, lodging, notes, status
      ) values (
        ${id}, ${context.userId}, ${profile[0].display_name}, ${data.destination.trim()},
        ${placeKeyFrom(data.destination)}, ${data.country.trim() || "—"}, ${data.origin.trim()},
        ${data.startDate}, ${data.endDate}, ${data.flexible}, ${data.adults}, ${data.children},
        ${data.budget}, ${data.tripType}, ${data.lodging}, ${data.notes.trim()}, 'open'
      )
    `;
    return { id };
  });

export const placeBid = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      tripId: z.string(),
      price: z.number().int().min(100),
      title: z.string().min(1).max(120),
      highlights: z.string().max(2000),
      includes: z.array(z.string()).max(20),
      validUntil: z.string(),
    }),
  )
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const profile = await sql<{ display_name: string; role: Role; company: string; city: string; bio: string }>`
      select display_name, role, company, city, bio from profiles where user_id = ${context.userId}
    `;
    if (!profile[0] || profile[0].role !== "agency") {
      throw new Error("Only agencies can bid");
    }
    const trip = await sql<{ status: string }>`select status from trips where id = ${data.tripId}`;
    if (!trip[0] || trip[0].status !== "open") throw new Error("This request is closed");
    const id = crypto.randomUUID();
    const name = profile[0].company || profile[0].display_name;
    const tag = [profile[0].city, profile[0].bio.slice(0, 48)].filter(Boolean).join(" · ");
    await sql`delete from bids where trip_id = ${data.tripId} and user_id = ${context.userId} and status = 'pending'`;
    await sql`
      insert into bids (id, trip_id, user_id, agency_name, agency_tag, rating, reviews, price, title, includes, highlights, valid_until, status)
      values (
        ${id}, ${data.tripId}, ${context.userId}, ${name}, ${tag || "Independent desk"},
        5, 0, ${data.price}, ${data.title.trim()}, ${JSON.stringify(data.includes)},
        ${data.highlights.trim()}, ${data.validUntil}, 'pending'
      )
    `;
    return { id };
  });

export const acceptBid = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.string())
  .handler(async ({ context, data: bidId }) => {
    const sql = await getSql();
    const rows = await sql<{ id: string; trip_id: string; user_id: string }>`
      select b.id, b.trip_id, t.user_id
      from bids b join trips t on t.id = b.trip_id
      where b.id = ${bidId}
    `;
    const row = rows[0];
    if (!row || row.user_id !== context.userId) throw new Error("Not allowed");
    await sql`update bids set status = 'declined' where trip_id = ${row.trip_id} and id <> ${bidId}`;
    await sql`update bids set status = 'accepted' where id = ${bidId}`;
    await sql`update trips set status = 'awarded', awarded_bid_id = ${bidId} where id = ${row.trip_id} and user_id = ${context.userId}`;
    return { ok: true };
  });

export const listMessages = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(z.string())
  .handler(async ({ context, data: tripId }) => {
    const sql = await getSql();
    const allowed = await canAccessTrip(sql, context.userId, tripId);
    if (!allowed) throw new Error("Not allowed");
    const rows = await sql<{
      id: string;
      trip_id: string;
      user_id: string;
      author_name: string;
      body: string;
      created_at: string;
    }>`select id, trip_id, user_id, author_name, body, created_at from messages where trip_id = ${tripId} order by created_at asc`;
    return rows.map(
      (r): Message => ({
        id: r.id,
        tripId: r.trip_id,
        userId: r.user_id,
        authorName: r.author_name,
        body: r.body,
        createdAt: String(r.created_at),
      }),
    );
  });

export const sendMessage = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ tripId: z.string(), body: z.string().min(1).max(2000) }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const allowed = await canAccessTrip(sql, context.userId, data.tripId);
    if (!allowed) throw new Error("Not allowed");
    const profile = await sql<{ display_name: string; company: string }>`
      select display_name, company from profiles where user_id = ${context.userId}
    `;
    const name = profile[0]?.company || profile[0]?.display_name || "You";
    const id = crypto.randomUUID();
    await sql`
      insert into messages (id, trip_id, user_id, author_name, body)
      values (${id}, ${data.tripId}, ${context.userId}, ${name}, ${data.body.trim()})
    `;
    return { id };
  });

export const listInbox = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql.query<{
      trip_id: string;
      destination: string;
      last_body: string;
      last_at: string;
      counterpart: string;
    }>(
      `select m.trip_id, t.destination, m.body as last_body, m.created_at as last_at,
              case when t.user_id = $1 then coalesce((
                select b.agency_name from bids b where b.trip_id = t.id order by b.created_at desc limit 1
              ), 'Agencies') else t.traveler_name end as counterpart
       from messages m
       join trips t on t.id = m.trip_id
       where m.created_at = (select max(m2.created_at) from messages m2 where m2.trip_id = m.trip_id)
         and (t.user_id = $1 or exists (select 1 from bids b where b.trip_id = t.id and b.user_id = $1))
       order by m.created_at desc`,
      [context.userId],
    );
    return rows.map(
      (r): Thread => ({
        tripId: r.trip_id,
        destination: r.destination,
        lastBody: r.last_body,
        lastAt: String(r.last_at),
        counterpart: r.counterpart,
      }),
    );
  });

export const listAgencies = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const sql = await getSql();
    return sql<{
      user_id: string;
      display_name: string;
      company: string;
      city: string;
      bio: string;
    }>`select user_id, display_name, company, city, bio from profiles where role = 'agency' order by display_name`;
  });

async function canAccessTrip(
  sql: Awaited<ReturnType<typeof getSql>>,
  userId: string,
  tripId: string,
) {
  const own = await sql`select 1 from trips where id = ${tripId} and user_id = ${userId}`;
  if (own[0]) return true;
  const bid = await sql`select 1 from bids where trip_id = ${tripId} and user_id = ${userId}`;
  return Boolean(bid[0]);
}
