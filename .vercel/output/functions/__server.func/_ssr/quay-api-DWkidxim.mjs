import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { A as number, C as _enum, E as boolean, P as string, T as array, j as object } from "../_libs/@better-auth/core+[...].mjs";
import { i as getSql, t as authMiddleware } from "./middleware-DT3aJ7cf.mjs";
import { n as placeKeyFrom } from "./quay-types-CObPU0Mv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quay-api-DWkidxim.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function mapTrip(r) {
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
		lowestBid: r.lowest_bid == null ? null : Number(r.lowest_bid)
	};
}
function mapBid(r) {
	let includes = [];
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
		status: r.status
	};
}
var tripSelect = `
  select t.*,
    (select count(*) from bids b where b.trip_id = t.id) as bid_count,
    (select min(b.price) from bids b where b.trip_id = t.id) as lowest_bid
  from trips t
`;
var getMyProfile_createServerFn_handler = createServerRpc({
	id: "f39c9a7ad39ed19cbcf8740bdde6cfb691f0d673a822d465337c9a69721bf834",
	name: "getMyProfile",
	filename: "src/lib/quay-api.ts"
}, (opts) => getMyProfile.__executeServer(opts));
var getMyProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getMyProfile_createServerFn_handler, async ({ context }) => {
	const r = (await (await getSql())`select user_id, role, display_name, company, city, bio, phone from profiles where user_id = ${context.userId}`)[0];
	if (!r) return null;
	return {
		userId: r.user_id,
		role: r.role,
		displayName: r.display_name,
		company: r.company,
		city: r.city,
		bio: r.bio,
		phone: r.phone
	};
});
var saveProfile_createServerFn_handler = createServerRpc({
	id: "c5f42d203a4cbc16a9e9a617ad8225a0b2e6d8be2fda9806c0e84067baae08b2",
	name: "saveProfile",
	filename: "src/lib/quay-api.ts"
}, (opts) => saveProfile.__executeServer(opts));
var saveProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	role: _enum(["traveler", "agency"]),
	displayName: string().min(1).max(80),
	company: string().max(80).optional(),
	city: string().max(80).optional(),
	bio: string().max(600).optional(),
	phone: string().max(40).optional()
})).handler(saveProfile_createServerFn_handler, async ({ context, data }) => {
	await (await getSql())`
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
var listMarketplace_createServerFn_handler = createServerRpc({
	id: "ac6c4d8c0b979236450fb9e40a53acd19a0c1c29b47daab377a779f8ada8190f",
	name: "listMarketplace",
	filename: "src/lib/quay-api.ts"
}, (opts) => listMarketplace.__executeServer(opts));
var listMarketplace = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listMarketplace_createServerFn_handler, async () => {
	return (await (await getSql()).query(`${tripSelect} where t.status = 'open' order by t.created_at desc`)).map(mapTrip);
});
var listMyTrips_createServerFn_handler = createServerRpc({
	id: "cdc49ee9ed5fce84b49a6f60b6f1766b33bb57a8ffbdad24f0b04de030844402",
	name: "listMyTrips",
	filename: "src/lib/quay-api.ts"
}, (opts) => listMyTrips.__executeServer(opts));
var listMyTrips = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listMyTrips_createServerFn_handler, async ({ context }) => {
	return (await (await getSql()).query(`${tripSelect} where t.user_id = $1 order by t.created_at desc`, [context.userId])).map(mapTrip);
});
var listMyBids_createServerFn_handler = createServerRpc({
	id: "ec5a034b9350e842539dc7ceebabf6e47e4f2ac1408ae0876135ab0b429beb9c",
	name: "listMyBids",
	filename: "src/lib/quay-api.ts"
}, (opts) => listMyBids.__executeServer(opts));
var listMyBids = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listMyBids_createServerFn_handler, async ({ context }) => {
	return (await (await getSql()).query(`${tripSelect} where t.id in (select trip_id from bids where user_id = $1) order by t.created_at desc`, [context.userId])).map(mapTrip);
});
var getTrip_createServerFn_handler = createServerRpc({
	id: "048cb27033008cdc1a882303522c284868794c6240de34f83f8c14428716d127",
	name: "getTrip",
	filename: "src/lib/quay-api.ts"
}, (opts) => getTrip.__executeServer(opts));
var getTrip = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator(string()).handler(getTrip_createServerFn_handler, async ({ data: id }) => {
	const sql = await getSql();
	const rows = await sql.query(`${tripSelect} where t.id = $1`, [id]);
	return {
		trip: rows[0] ? mapTrip(rows[0]) : null,
		bids: (await sql.query(`select * from bids where trip_id = $1 order by price asc`, [id])).map(mapBid)
	};
});
var createTrip_createServerFn_handler = createServerRpc({
	id: "67dc27c71d6534a1430b2d58b9e77cf3e832bb9d33e2402ea6035075bffbb4ad",
	name: "createTrip",
	filename: "src/lib/quay-api.ts"
}, (opts) => createTrip.__executeServer(opts));
var createTrip = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	destination: string().min(1).max(80),
	country: string().max(80),
	origin: string().max(80),
	startDate: string(),
	endDate: string(),
	flexible: boolean(),
	adults: number().int().min(1).max(20),
	children: number().int().min(0).max(20),
	budget: number().int().min(200),
	tripType: string().min(1).max(40),
	lodging: _enum([
		"budget",
		"mid",
		"luxury"
	]),
	notes: string().max(2e3)
})).handler(createTrip_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const profile = await sql`
      select display_name, role from profiles where user_id = ${context.userId}
    `;
	if (!profile[0] || profile[0].role !== "traveler") throw new Error("Only travelers can post requests");
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
var placeBid_createServerFn_handler = createServerRpc({
	id: "d85a2d07a923d48f8019d8073e2016d6dcdf5cd940764feb340ecf08ceb022c6",
	name: "placeBid",
	filename: "src/lib/quay-api.ts"
}, (opts) => placeBid.__executeServer(opts));
var placeBid = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	tripId: string(),
	price: number().int().min(100),
	title: string().min(1).max(120),
	highlights: string().max(2e3),
	includes: array(string()).max(20),
	validUntil: string()
})).handler(placeBid_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const profile = await sql`
      select display_name, role, company, city, bio from profiles where user_id = ${context.userId}
    `;
	if (!profile[0] || profile[0].role !== "agency") throw new Error("Only agencies can bid");
	const trip = await sql`select status from trips where id = ${data.tripId}`;
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
var acceptBid_createServerFn_handler = createServerRpc({
	id: "dfd0930cee78c63b70e581c2ec3ff3fdbf8e7ef577d93354bbba831ea86d30ff",
	name: "acceptBid",
	filename: "src/lib/quay-api.ts"
}, (opts) => acceptBid.__executeServer(opts));
var acceptBid = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(string()).handler(acceptBid_createServerFn_handler, async ({ context, data: bidId }) => {
	const sql = await getSql();
	const row = (await sql`
      select b.id, b.trip_id, t.user_id
      from bids b join trips t on t.id = b.trip_id
      where b.id = ${bidId}
    `)[0];
	if (!row || row.user_id !== context.userId) throw new Error("Not allowed");
	await sql`update bids set status = 'declined' where trip_id = ${row.trip_id} and id <> ${bidId}`;
	await sql`update bids set status = 'accepted' where id = ${bidId}`;
	await sql`update trips set status = 'awarded', awarded_bid_id = ${bidId} where id = ${row.trip_id} and user_id = ${context.userId}`;
	return { ok: true };
});
var listMessages_createServerFn_handler = createServerRpc({
	id: "12ecc0c8ba1a1682a6641465415c5a0a6781668bc296986dac457761f989be13",
	name: "listMessages",
	filename: "src/lib/quay-api.ts"
}, (opts) => listMessages.__executeServer(opts));
var listMessages = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator(string()).handler(listMessages_createServerFn_handler, async ({ context, data: tripId }) => {
	const sql = await getSql();
	if (!await canAccessTrip(sql, context.userId, tripId)) throw new Error("Not allowed");
	return (await sql`select id, trip_id, user_id, author_name, body, created_at from messages where trip_id = ${tripId} order by created_at asc`).map((r) => ({
		id: r.id,
		tripId: r.trip_id,
		userId: r.user_id,
		authorName: r.author_name,
		body: r.body,
		createdAt: String(r.created_at)
	}));
});
var sendMessage_createServerFn_handler = createServerRpc({
	id: "16b8c36aeb8c6bab40c282b2ec67411d2800b66a03eb6f53dfe23f27c72b3555",
	name: "sendMessage",
	filename: "src/lib/quay-api.ts"
}, (opts) => sendMessage.__executeServer(opts));
var sendMessage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	tripId: string(),
	body: string().min(1).max(2e3)
})).handler(sendMessage_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	if (!await canAccessTrip(sql, context.userId, data.tripId)) throw new Error("Not allowed");
	const profile = await sql`
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
var listInbox_createServerFn_handler = createServerRpc({
	id: "a9ed0a8bfdc5e6f29d4fd13e9d5805d6f38f5709713d0654300003c74ea1d62d",
	name: "listInbox",
	filename: "src/lib/quay-api.ts"
}, (opts) => listInbox.__executeServer(opts));
var listInbox = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listInbox_createServerFn_handler, async ({ context }) => {
	return (await (await getSql()).query(`select m.trip_id, t.destination, m.body as last_body, m.created_at as last_at,
              case when t.user_id = $1 then coalesce((
                select b.agency_name from bids b where b.trip_id = t.id order by b.created_at desc limit 1
              ), 'Agencies') else t.traveler_name end as counterpart
       from messages m
       join trips t on t.id = m.trip_id
       where m.created_at = (select max(m2.created_at) from messages m2 where m2.trip_id = m.trip_id)
         and (t.user_id = $1 or exists (select 1 from bids b where b.trip_id = t.id and b.user_id = $1))
       order by m.created_at desc`, [context.userId])).map((r) => ({
		tripId: r.trip_id,
		destination: r.destination,
		lastBody: r.last_body,
		lastAt: String(r.last_at),
		counterpart: r.counterpart
	}));
});
var listAgencies_createServerFn_handler = createServerRpc({
	id: "06c633024344ccf75aad819c2f5658ce8b9e8cb6f63f3af78289c4b3f3632466",
	name: "listAgencies",
	filename: "src/lib/quay-api.ts"
}, (opts) => listAgencies.__executeServer(opts));
var listAgencies = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listAgencies_createServerFn_handler, async () => {
	return (await getSql())`select user_id, display_name, company, city, bio from profiles where role = 'agency' order by display_name`;
});
async function canAccessTrip(sql, userId, tripId) {
	if ((await sql`select 1 from trips where id = ${tripId} and user_id = ${userId}`)[0]) return true;
	const bid = await sql`select 1 from bids where trip_id = ${tripId} and user_id = ${userId}`;
	return Boolean(bid[0]);
}
//#endregion
export { acceptBid_createServerFn_handler, createTrip_createServerFn_handler, getMyProfile_createServerFn_handler, getTrip_createServerFn_handler, listAgencies_createServerFn_handler, listInbox_createServerFn_handler, listMarketplace_createServerFn_handler, listMessages_createServerFn_handler, listMyBids_createServerFn_handler, listMyTrips_createServerFn_handler, placeBid_createServerFn_handler, saveProfile_createServerFn_handler, sendMessage_createServerFn_handler };
