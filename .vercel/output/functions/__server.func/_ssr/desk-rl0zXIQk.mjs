import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Button, a as getMyProfile, d as listMyBids, f as listMyTrips, l as listMarketplace } from "./router-DBA8Znij.mjs";
import { t as RequireAuth } from "./require-auth-j1S483Z6.mjs";
import { r as TripCard } from "./trip-card-Dp5ve8Lr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/desk-rl0zXIQk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Desk() {
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [trips, setTrips] = (0, import_react.useState)(null);
	const [mine, setMine] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		(async () => {
			const p = await getMyProfile();
			setProfile(p);
			if (!p) {
				window.location.href = "/onboarding";
				return;
			}
			if (p.role === "agency") {
				const [open, bids] = await Promise.all([listMarketplace(), listMyBids()]);
				setTrips(open);
				setMine(bids);
			} else {
				const [own, open] = await Promise.all([listMyTrips(), listMarketplace()]);
				setMine(own);
				setTrips(open);
			}
		})();
	}, []);
	if (!profile || !trips) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 animate-pulse rounded-[var(--radius-lg)] bg-surface" });
	const isAgency = profile.role === "agency";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.18em] text-accent",
						children: profile.displayName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl tracking-tight sm:text-5xl",
						children: isAgency ? "Open briefs on the quay" : "Your travel desk"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted",
						children: isAgency ? "Travelers already named the destination and the ceiling. Answer with a real package." : "Post a brief. Agencies compete. You pick one offer and talk in the inbox."
					}),
					!isAgency ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-6",
						size: "lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/trips/new",
							children: "Post a trip request"
						})
					}) : null
				]
			}),
			!isAgency ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Your requests"
				}), mine.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { text: "No requests yet. Post one and agencies will bid." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, { trips: mine })]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Your bids"
				}), mine.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { text: "You have not bid yet." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, { trips: mine })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: isAgency ? "Marketplace" : "Also open"
				}), trips.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { text: "Nothing open right now." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, { trips })]
			})
		]
	});
}
function Grid({ trips }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-5 sm:grid-cols-2",
		children: trips.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TripCard, { trip: t }, t.id))
	});
}
function Empty({ text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-[var(--radius-xl)] border border-dashed border-border-strong px-6 py-12 text-center text-sm text-muted",
		children: text
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Desk, {}) });
//#endregion
export { SplitComponent as component };
