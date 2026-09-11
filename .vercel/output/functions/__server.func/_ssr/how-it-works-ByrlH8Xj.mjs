import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as t, v as Button } from "./router-AcUgDc4y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/how-it-works-ByrlH8Xj.js
var import_jsx_runtime = require_jsx_runtime();
function How() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-2xl space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.18em] text-accent",
				children: t("GUIDE")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight",
				children: t("HOW_QUAY_WORKS")
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: t("FOR_TRAVELERS")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "leading-relaxed text-muted",
					children: [
						t("FOR_TRAVELERS"),
						" — ",
						t("BRIEF_DESC")
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: t("FOR_AGENCIES")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "leading-relaxed text-muted",
					children: t("BIDS_DESC")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: t("ACCOUNTS")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "leading-relaxed text-muted",
					children: [
						t("SIGN_IN"),
						" ",
						t("OR_EMAIL"),
						". ",
						t("PROFILE_DESC")
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					children: t("SIGN_IN")
				})
			})
		]
	});
}
//#endregion
export { How as component };
