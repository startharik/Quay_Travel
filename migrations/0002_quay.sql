create table if not exists profiles (
  user_id text primary key,
  role text not null check (role in ('traveler', 'agency')),
  display_name text not null,
  company text not null default '',
  city text not null default '',
  bio text not null default '',
  phone text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists trips (
  id text primary key,
  user_id text not null,
  traveler_name text not null,
  destination text not null,
  place_key text not null default 'default',
  country text not null default '',
  origin text not null default '',
  start_date date not null,
  end_date date not null,
  flexible boolean not null default false,
  adults integer not null default 1,
  children integer not null default 0,
  budget integer not null,
  trip_type text not null,
  lodging text not null,
  notes text not null default '',
  status text not null default 'open',
  awarded_bid_id text,
  created_at timestamptz not null default now()
);
create index if not exists trips_user_id_idx on trips (user_id);
create index if not exists trips_status_idx on trips (status);

create table if not exists bids (
  id text primary key,
  trip_id text not null references trips(id) on delete cascade,
  user_id text not null,
  agency_name text not null,
  agency_tag text not null default '',
  rating numeric not null default 4.8,
  reviews integer not null default 0,
  price integer not null,
  title text not null,
  includes text not null default '[]',
  highlights text not null default '',
  valid_until date,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);
create index if not exists bids_trip_id_idx on bids (trip_id);
create index if not exists bids_user_id_idx on bids (user_id);

create table if not exists messages (
  id text primary key,
  trip_id text not null references trips(id) on delete cascade,
  user_id text not null,
  author_name text not null,
  body text not null,
  created_at timestamptz not null default now()
);
create index if not exists messages_trip_id_idx on messages (trip_id);

insert into profiles (user_id, role, display_name, company, city, bio) values
  ('seed-maya', 'traveler', 'Maya Chen', '', 'London', 'Plans two trips a year, hates group tours.'),
  ('seed-james', 'traveler', 'James Okonkwo', '', 'London', 'City breaks, long weekends.'),
  ('seed-priya', 'traveler', 'Priya Shah', '', 'Manchester', 'Adventure with friends.'),
  ('seed-elena', 'traveler', 'Elena Rossi', '', 'Milan', 'Riads, food, no resorts.'),
  ('seed-atlas', 'agency', 'Atlas & Co', 'Atlas & Co', 'Athens', 'Independent desk. Islands and Japan.'),
  ('seed-north', 'agency', 'Northwind Travel', 'Northwind Travel', 'Stockholm', 'Nordic and winter specialists.'),
  ('seed-coral', 'agency', 'Coral Desk', 'Coral Desk', 'Naxos', 'Island specialists.'),
  ('seed-meridian', 'agency', 'Meridian Holidays', 'Meridian Holidays', 'Lisbon', 'City breaks across the EU.')
on conflict (user_id) do nothing;

insert into trips (id, user_id, traveler_name, destination, place_key, country, origin, start_date, end_date, flexible, adults, children, budget, trip_type, lodging, notes, status, awarded_bid_id, created_at) values
  ('req-santorini', 'seed-maya', 'Maya Chen', 'Santorini', 'santorini', 'Greece', 'London', '2026-09-12', '2026-09-19', true, 2, 0, 4500, 'Honeymoon', 'luxury', 'Caldera view if possible. Quiet hotel, not a party strip. Prefer sunset dinner included.', 'open', null, '2026-08-18'),
  ('req-kyoto', 'seed-maya', 'Maya Chen', 'Kyoto', 'kyoto', 'Japan', 'London', '2026-11-03', '2026-11-12', false, 2, 1, 6200, 'Family', 'mid', 'Ryokan one night. Easy trains with a 7-year-old. No capsule hotels.', 'awarded', 'bid-kyoto-atlas', '2026-08-02'),
  ('req-lisbon', 'seed-james', 'James Okonkwo', 'Lisbon', 'lisbon', 'Portugal', 'London', '2026-10-04', '2026-10-10', true, 2, 0, 2800, 'City break', 'mid', 'Walkable neighborhood. Wine tasting welcome. Flights from London.', 'open', null, '2026-08-20'),
  ('req-iceland', 'seed-priya', 'Priya Shah', 'Reykjavík & south coast', 'iceland', 'Iceland', 'Manchester', '2026-12-18', '2026-12-26', false, 4, 0, 9000, 'Adventure', 'mid', 'Northern lights attempt, glacier walk, 4x4. Two rooms.', 'open', null, '2026-08-21'),
  ('req-marrakech', 'seed-elena', 'Elena Rossi', 'Marrakech', 'marrakech', 'Morocco', 'Milan', '2026-09-28', '2026-10-04', true, 2, 0, 3200, 'Culture', 'luxury', 'Riad in the medina. Day trip to Atlas. Private transfers.', 'open', null, '2026-08-22')
on conflict (id) do nothing;

insert into bids (id, trip_id, user_id, agency_name, agency_tag, rating, reviews, price, title, includes, highlights, valid_until, status) values
  ('bid-san-atlas', 'req-santorini', 'seed-atlas', 'Atlas & Co', 'Independent, Athens desk', 4.9, 214, 4280, 'Caldera week, two cliff suites', '["Flights LHR–JTR","7 nights Oia","Private transfer","Sunset catamaran","Breakfast daily"]', 'Two connecting cave suites facing the caldera. Catamaran on day 3, no shared coaches.', '2026-08-30', 'pending'),
  ('bid-san-north', 'req-santorini', 'seed-north', 'Northwind Travel', 'Nordic & Med specialists', 4.7, 88, 3990, 'Quiet Imerovigli, half board', '["Flights","6 nights Imerovigli","Half board","Wine tasting","Airport transfers"]', 'Slightly inland of the crush in Oia. Infinity pool, no music after 10.', '2026-08-28', 'pending'),
  ('bid-san-coral', 'req-santorini', 'seed-coral', 'Coral Desk', 'Island specialists', 4.8, 141, 4550, 'Honeymoon edit with photographer', '["Business-class upgrade bid","7 nights","Private photographer 2h","Dinner at Ammoudi"]', 'A photographer at golden hour and a reserved table on the rocks.', '2026-08-29', 'pending'),
  ('bid-kyoto-atlas', 'req-kyoto', 'seed-atlas', 'Atlas & Co', 'Independent, Athens desk', 4.9, 214, 5980, 'Kyoto family, ryokan night included', '["Flights","Townhouse 7 nights","1 night ryokan","IC cards","Tea ceremony"]', 'Townhouse near Gion. One night in Arashiyama.', '2026-08-15', 'accepted'),
  ('bid-lis-meridian', 'req-lisbon', 'seed-meridian', 'Meridian Holidays', 'City breaks, EU', 4.6, 67, 2640, 'Alfama apartment + Douro day', '["Flights LHR","6 nights Alfama","Douro day trip","Tram 28 skip"]', 'Third-floor apartment, light, no street noise.', '2026-08-31', 'pending'),
  ('bid-ice-north', 'req-iceland', 'seed-north', 'Northwind Travel', 'Nordic & Med specialists', 4.7, 88, 8720, 'South coast winter, two 4x4s', '["Flights","Two rooms Reykjavík + Vik","Super jeeps","Glacier walk","Northern lights chase"]', 'Two vehicles so four adults are not packed.', '2026-09-05', 'pending')
on conflict (id) do nothing;

insert into messages (id, trip_id, user_id, author_name, body, created_at) values
  ('msg-1', 'req-santorini', 'seed-atlas', 'Atlas & Co', 'We can hold the Oia suites until Friday. Happy to swap the catamaran for a private boat if you prefer quiet.', '2026-08-19T10:00:00Z'),
  ('msg-2', 'req-santorini', 'seed-maya', 'Maya Chen', 'Private boat sounds better. Is the hotel actually quiet after 10?', '2026-08-19T14:20:00Z'),
  ('msg-3', 'req-kyoto', 'seed-atlas', 'Atlas & Co', 'Townhouse is confirmed. Ryokan night is Saturday in Arashiyama.', '2026-08-10T09:00:00Z')
on conflict (id) do nothing;
