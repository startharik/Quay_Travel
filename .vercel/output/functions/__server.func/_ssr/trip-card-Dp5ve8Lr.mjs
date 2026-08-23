import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Calendar, t as Users } from "../_libs/lucide-react.mjs";
import { b as formatRange, v as cn, x as nightsBetween, y as formatMoney } from "./router-DBA8Znij.mjs";
import { t as lodgingLabel } from "./quay-types-C24c-OuU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trip-card-Dp5ve8Lr.js
var import_jsx_runtime = require_jsx_runtime();
function StatusPill({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex h-7 items-center rounded-full px-2.5 text-[11px] font-medium uppercase tracking-wider", {
			open: "bg-accent-soft text-accent",
			awarded: "bg-surface text-ok",
			closed: "bg-surface text-muted",
			pending: "bg-accent-soft text-accent",
			accepted: "bg-surface text-ok",
			declined: "bg-surface text-muted"
		}[status]),
		children: {
			open: "Open",
			awarded: "Awarded",
			closed: "Closed",
			pending: "Pending",
			accepted: "Accepted",
			declined: "Declined"
		}[status]
	});
}
function DestinationArt({ placeKey, className = "" }) {
	const key = [
		"santorini",
		"kyoto",
		"lisbon",
		"iceland",
		"marrakech",
		"amalfi"
	].includes(placeKey) ? placeKey : "default";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `dest-art ${className}`,
		"data-place": key,
		"aria-hidden": "true"
	});
}
function TripCard({ trip }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/trips/$id",
		params: { id: trip.id },
		className: "group block overflow-hidden rounded-[var(--radius-xl)] border border-border bg-bg-elevated shadow-[var(--shadow-card)] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DestinationArt, {
			placeKey: trip.placeKey,
			className: "h-36 w-full"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.14em] text-muted",
						children: trip.country
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-2xl leading-tight tracking-tight",
						children: trip.destination
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: trip.status })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-3.5" }), formatRange(trip.startDate, trip.endDate)]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [nightsBetween(trip.startDate, trip.endDate), " nights"] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-1.5 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3.5" }),
						trip.adults,
						" adult",
						trip.adults === 1 ? "" : "s",
						trip.children ? ` · ${trip.children} child${trip.children === 1 ? "" : "ren"}` : "",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-subtle",
							children: "·"
						}),
						trip.tripType,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-subtle",
							children: "·"
						}),
						lodgingLabel(trip.lodging)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between border-t border-border pt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Budget"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl tabular-nums",
						children: formatMoney(trip.budget)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: trip.bidCount === 0 ? "No bids yet" : `${trip.bidCount} bid${trip.bidCount === 1 ? "" : "s"}`
						}), trip.lowestBid != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm tabular-nums text-accent",
							children: ["from ", formatMoney(trip.lowestBid)]
						}) : null]
					})]
				})
			]
		})]
	});
}
//#endregion
export { StatusPill as n, TripCard as r, DestinationArt as t };
