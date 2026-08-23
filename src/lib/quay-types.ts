export type Role = "traveler" | "agency";
export type Lodging = "budget" | "mid" | "luxury";
export type RequestStatus = "open" | "awarded" | "closed";
export type BidStatus = "pending" | "accepted" | "declined";

export type Profile = {
  userId: string;
  role: Role;
  displayName: string;
  company: string;
  city: string;
  bio: string;
  phone: string;
};

export type TripRequest = {
  id: string;
  userId: string;
  travelerName: string;
  destination: string;
  placeKey: string;
  country: string;
  origin: string;
  startDate: string;
  endDate: string;
  flexible: boolean;
  adults: number;
  children: number;
  budget: number;
  tripType: string;
  lodging: Lodging;
  notes: string;
  status: RequestStatus;
  awardedBidId?: string | null;
  createdAt: string;
  bidCount: number;
  lowestBid: number | null;
};

export type Bid = {
  id: string;
  tripId: string;
  userId: string;
  agencyName: string;
  agencyTag: string;
  rating: number;
  reviews: number;
  price: number;
  title: string;
  includes: string[];
  highlights: string;
  validUntil: string;
  status: BidStatus;
};

export type Message = {
  id: string;
  tripId: string;
  userId: string;
  authorName: string;
  body: string;
  createdAt: string;
};

export type Thread = {
  tripId: string;
  destination: string;
  lastBody: string;
  lastAt: string;
  counterpart: string;
};

export function lodgingLabel(v: Lodging) {
  if (v === "budget") return "Budget";
  if (v === "luxury") return "Luxury";
  return "Mid-range";
}

export function placeKeyFrom(destination: string) {
  const d = destination.toLowerCase();
  if (d.includes("santo") || d.includes("oia")) return "santorini";
  if (d.includes("kyoto") || d.includes("japan")) return "kyoto";
  if (d.includes("lisbon") || d.includes("porto")) return "lisbon";
  if (d.includes("iceland") || d.includes("reyk")) return "iceland";
  if (d.includes("marra") || d.includes("fez")) return "marrakech";
  if (d.includes("amalfi") || d.includes("positano")) return "amalfi";
  return "default";
}
