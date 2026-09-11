import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as listInbox, r as t } from "./router-AcUgDc4y.mjs";
import { t as RequireAuth } from "./require-auth-CIO8jNgP.mjs";
import { n as PageLoading, t as PageError } from "./page-state-D-Yq8wXb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inbox-Bf6NA16Y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Inbox() {
	const [threads, setThreads] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		listInbox().then(setThreads).catch(() => setError(true));
	}, []);
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageError, {});
	if (!threads) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoading, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-tight",
				children: t("INBOX")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: t("THREADS_INFO")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 divide-y divide-border rounded-[var(--radius-xl)] border border-border bg-bg-elevated",
				children: threads.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-5 py-12 text-center text-sm text-muted",
					children: t("NO_MESSAGES_YET")
				}) : threads.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/trips/$id",
					params: { id: t.tripId },
					className: "block px-5 py-4 hover:bg-surface",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: t.destination
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-subtle",
								children: new Date(t.lastAt).toLocaleDateString()
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: t.counterpart
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 line-clamp-2 text-sm",
							children: t.lastBody
						})
					]
				}, t.tripId))
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, {}) });
//#endregion
export { SplitComponent as component };
