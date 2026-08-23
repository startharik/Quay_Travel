import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Calendar, i as Check, r as MapPin, s as ArrowLeft, t as Users } from "../_libs/lucide-react.mjs";
import { S as useCurrentUser, _ as Button, a as getMyProfile, b as formatRange, h as sendMessage, n as Route$2, o as getTrip, p as placeBid, r as acceptBid, u as listMessages, x as nightsBetween, y as formatMoney } from "./router-DBA8Znij.mjs";
import { t as RequireAuth } from "./require-auth-j1S483Z6.mjs";
import { t as lodgingLabel } from "./quay-types-C24c-OuU.mjs";
import { n as StatusPill, t as DestinationArt } from "./trip-card-Dp5ve8Lr.mjs";
import { n as Label, r as Textarea, t as Input } from "./label-DwzFMLaJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trips._id-CIbc50mm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BidCard({ bid, canAccept, onAccept }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-[var(--radius-lg)] border border-border bg-bg-elevated p-5 shadow-[var(--shadow-card)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.14em] text-muted",
						children: bid.agencyTag
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-1 font-display text-xl leading-tight",
						children: bid.agencyName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							bid.rating.toFixed(1),
							" · ",
							bid.reviews,
							" reviews"
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl tabular-nums leading-none",
						children: formatMoney(bid.price)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted",
						children: ["Offer valid until ", bid.validUntil]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-base font-medium",
				children: bid.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm leading-relaxed text-muted",
				children: bid.highlights
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 grid gap-1.5 sm:grid-cols-2",
				children: bid.includes.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-3.5 shrink-0 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
				}, item))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: bid.status }), canAccept && bid.status === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "accent",
					onClick: onAccept,
					children: "Accept this offer"
				}) : null]
			})
		]
	});
}
function TripDetail() {
	const { id } = Route$2.useParams();
	const user = useCurrentUser();
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [trip, setTrip] = (0, import_react.useState)(void 0);
	const [bids, setBids] = (0, import_react.useState)([]);
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [showBidForm, setShowBidForm] = (0, import_react.useState)(false);
	const [notice, setNotice] = (0, import_react.useState)(null);
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
	(0, import_react.useEffect)(() => {
		reload();
	}, [id]);
	if (trip === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 animate-pulse rounded-[var(--radius-lg)] bg-surface" });
	if (!trip) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-20 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl",
			children: "Request not found"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/desk",
			className: "mt-4 inline-block text-sm text-accent",
			children: "Back to desk"
		})]
	});
	const tripId = trip.id;
	const isOwner = user?.id === trip.userId;
	const myBid = bids.find((b) => b.userId === user?.id);
	const canAccept = profile?.role === "traveler" && isOwner && trip.status === "open";
	const canBid = profile?.role === "agency" && trip.status === "open";
	const canMessage = isOwner || Boolean(myBid);
	async function onAccept(bidId) {
		await acceptBid({ data: bidId });
		setNotice("Offer accepted. Message the agency below to confirm details.");
		await reload();
	}
	async function onBid(e) {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const includes = String(data.get("includes") || "").split("\n").map((s) => s.trim()).filter(Boolean);
		await placeBid({ data: {
			tripId,
			price: Number(data.get("price") || 0),
			title: String(data.get("title") || "").trim(),
			highlights: String(data.get("highlights") || "").trim(),
			includes: includes.length ? includes : ["Package as described"],
			validUntil: String(data.get("validUntil") || "2026-09-15")
		} });
		setShowBidForm(false);
		await reload();
	}
	async function onMessage(e) {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const body = String(data.get("body") || "").trim();
		if (!body) return;
		await sendMessage({ data: {
			tripId,
			body
		} });
		e.currentTarget.reset();
		setMessages(await listMessages({ data: tripId }));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/desk",
				className: "inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Desk"]
			}),
			notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-[var(--radius-lg)] border border-accent/30 bg-accent-soft px-4 py-3 text-sm",
				children: notice
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-hidden rounded-[var(--radius-xl)] border border-border bg-bg-elevated shadow-[var(--shadow-card)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DestinationArt, {
					placeKey: trip.placeKey,
					className: "h-44 w-full sm:h-56"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 p-5 sm:grid-cols-[1fr_auto] sm:p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-[0.14em] text-muted",
							children: trip.country
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-1 font-display text-4xl tracking-tight",
							children: trip.destination
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-xl text-sm leading-relaxed text-muted",
							children: trip.notes
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-6 grid gap-3 text-sm sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Info, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-4" }),
									label: "Dates",
									children: [
										formatRange(trip.startDate, trip.endDate),
										" · ",
										nightsBetween(trip.startDate, trip.endDate),
										" nights",
										trip.flexible ? " · flexible" : ""
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Info, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }),
									label: "Party",
									children: [
										trip.adults,
										" adult",
										trip.adults === 1 ? "" : "s",
										trip.children ? `, ${trip.children} child${trip.children === 1 ? "" : "ren"}` : ""
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Info, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }),
									label: "Style",
									children: [
										trip.tripType,
										" · ",
										lodgingLabel(trip.lodging)
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
									label: "Posted by",
									children: trip.travelerName
								}),
								trip.origin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
									label: "Flying from",
									children: trip.origin
								}) : null
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-start gap-3 sm:items-end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: trip.status }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-left sm:text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: "Ceiling"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-3xl tabular-nums",
									children: formatMoney(trip.budget)
								})]
							}),
							canBid && !showBidForm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "accent",
								onClick: () => setShowBidForm(true),
								children: myBid ? "Update your bid" : "Place a bid"
							}) : null
						]
					})]
				})]
			}),
			showBidForm && canBid ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: onBid,
				className: "space-y-4 rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-5 sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Your offer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "title",
								children: "Package title"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "title",
								name: "title",
								required: true,
								defaultValue: myBid?.title ?? ""
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "price",
								children: "Price (USD)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "price",
								name: "price",
								type: "number",
								min: 100,
								required: true,
								defaultValue: myBid?.price ?? trip.budget
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "highlights",
							children: "Why this package"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "highlights",
							name: "highlights",
							defaultValue: myBid?.highlights ?? ""
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "includes",
							children: "Included (one per line)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "includes",
							name: "includes",
							defaultValue: myBid?.includes.join("\n") ?? "Flights\nTransfers\nHotel with breakfast"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid max-w-xs gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "validUntil",
							children: "Offer valid until"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "validUntil",
							name: "validUntil",
							type: "date",
							defaultValue: "2026-09-15"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							variant: "accent",
							children: "Submit bid"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							onClick: () => setShowBidForm(false),
							children: "Cancel"
						})]
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-tight",
					children: bids.length === 0 ? "Bids" : `${bids.length} bid${bids.length === 1 ? "" : "s"}`
				}), bids.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[var(--radius-xl)] border border-dashed border-border-strong px-6 py-12 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl",
						children: "No bids yet"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: canBid ? "Be the first desk to answer this brief." : "Agencies will appear here as they bid."
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4",
					children: bids.map((bid) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BidCard, {
						bid,
						canAccept,
						onAccept: () => void onAccept(bid.id)
					}, bid.id))
				})]
			}),
			canMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Thread"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-5",
					children: [
						messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "No messages yet."
						}) : null,
						messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b border-border pb-3 last:border-0 last:pb-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									m.authorName,
									" · ",
									new Date(m.createdAt).toLocaleString()
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm",
								children: m.body
							})]
						}, m.id)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: onMessage,
							className: "flex flex-col gap-2 pt-2 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "body",
								placeholder: "Write to the other desk",
								className: "flex-1"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								children: "Send"
							})]
						})
					]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Message the traveler after you place a bid."
			})
		]
	});
}
function Info({ label, children, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex gap-2",
		children: [icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-0.5 text-muted",
			children: icon
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children })] })]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TripDetail, {}) });
//#endregion
export { SplitComponent as component };
