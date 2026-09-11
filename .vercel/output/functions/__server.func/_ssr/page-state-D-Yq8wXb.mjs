import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as t } from "./router-AcUgDc4y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-state-D-Yq8wXb.js
var import_jsx_runtime = require_jsx_runtime();
function PageLoading({ className = "h-48" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-[var(--radius-lg)] border border-border bg-bg-elevated p-6 ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: t("LOADING")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 h-2 w-2/3 animate-pulse rounded-full bg-surface" })]
	});
}
function PageError({ onRetry }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-lg)] border border-danger/30 bg-bg-elevated p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-danger",
			children: t("LOAD_FAILED")
		}), onRetry ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: onRetry,
			className: "mt-3 text-sm font-medium underline",
			children: t("RETRY")
		}) : null]
	});
}
//#endregion
export { PageLoading as n, PageError as t };
