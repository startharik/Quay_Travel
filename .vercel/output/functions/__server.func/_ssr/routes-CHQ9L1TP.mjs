import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as ArrowRight } from "../_libs/lucide-react.mjs";
import { C as useCurrentUserState, _ as Button } from "./router-DBA8Znij.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CHQ9L1TP.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { user } = useCurrentUserState();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "max-w-2xl pt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.18em] text-accent",
					children: "Reverse auction for holidays"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl leading-[1.08] tracking-tight sm:text-6xl",
					children: "Name the trip. Let agencies compete."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-xl text-lg leading-relaxed text-muted",
					children: "Post where you want to go, the dates, the people, and a budget. Licensed desks send real packages. You accept one."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/login",
							children: ["Sign in to start", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						size: "lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/how-it-works",
							children: "How it works"
						})
					})]
				}),
				user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/desk",
						className: "text-sm text-accent",
						children: "Open your desk"
					})
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "grid gap-4 sm:grid-cols-3",
			children: [
				{
					n: "01",
					t: "Brief",
					d: "Destination, dates, party, ceiling, and the things you will not compromise on."
				},
				{
					n: "02",
					t: "Bids",
					d: "Agencies answer with a price, an itinerary, and what is actually included."
				},
				{
					n: "03",
					t: "Award",
					d: "Accept one offer. Talk in the inbox. The rest of the bids close."
				}
			].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-[var(--radius-lg)] border border-border bg-bg-elevated p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.16em] text-subtle",
						children: s.n
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-2xl",
						children: s.t
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: s.d
					})
				]
			}, s.n))
		})]
	});
}
//#endregion
export { Home as component };
