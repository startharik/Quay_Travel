import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Button } from "./router-DBA8Znij.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/how-it-works-DTgZyVui.js
var import_jsx_runtime = require_jsx_runtime();
function How() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-2xl space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.18em] text-accent",
				children: "Guide"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight",
				children: "How Quay works"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "For travelers"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "leading-relaxed text-muted",
					children: "You are not browsing a catalogue. You write the trip you actually want — destination, dates, who is coming, a hard budget, lodging level, and notes. Agencies see that brief and bid. You compare packages, accept one, and message the desk from the inbox."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "For agencies"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "leading-relaxed text-muted",
					children: "Open requests sit on the marketplace. Bid with a real price and a list of inclusions. If the traveler accepts, the other bids close. You can write in the thread attached to that trip."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Accounts"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "leading-relaxed text-muted",
					children: "Sign in with Google, X, or email. On first visit you choose traveler or agency and complete a short profile. Your requests, bids, and messages stay on your account."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					children: "Sign in"
				})
			})
		]
	});
}
//#endregion
export { How as component };
