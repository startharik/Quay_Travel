import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as listAgencies, r as t } from "./router-AcUgDc4y.mjs";
import { t as RequireAuth } from "./require-auth-CIO8jNgP.mjs";
import { n as PageLoading, t as PageError } from "./page-state-D-Yq8wXb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/agencies-Ch7vNT1u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Agencies() {
	const [rows, setRows] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		listAgencies().then(setRows).catch(() => setError(true));
	}, []);
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageError, {});
	if (!rows) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoading, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-4xl tracking-tight",
			children: t("AGENCIES")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-xl text-muted",
			children: t("AGENCIES_DESC")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid gap-4 sm:grid-cols-2",
			children: rows.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-[var(--radius-lg)] border border-border bg-bg-elevated p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.14em] text-muted",
						children: a.city || t("INDEPENDENT")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-2xl",
						children: a.company || a.display_name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: a.bio || t("NO_BIO_YET")
					})
				]
			}, a.user_id))
		})
	] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Agencies, {}) });
//#endregion
export { SplitComponent as component };
