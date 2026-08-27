import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useCurrentUser } from "./client-BYnEhRYZ.mjs";
import { h as saveProfile, o as getMyProfile, r as t, v as Button, y as cn } from "./router-4-m4M6Ar.mjs";
import { t as RequireAuth } from "./require-auth-DxBBz8_1.mjs";
import { n as Label, r as Textarea, t as Input } from "./label-IJFEyiCq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-CcSR3moR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Onboarding() {
	const user = useCurrentUser();
	const navigate = useNavigate();
	const [role, setRole] = (0, import_react.useState)("traveler");
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		getMyProfile().then((p) => {
			if (p) {
				navigate({ to: "/desk" });
				return;
			}
			setReady(true);
		});
	}, [navigate]);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-[var(--radius-lg)] bg-surface" });
	async function onSubmit(e) {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		await saveProfile({ data: {
			role,
			displayName: String(data.get("displayName") || user?.displayName || t("ROLE_TRAVELER")),
			company: String(data.get("company") || ""),
			city: String(data.get("city") || ""),
			bio: String(data.get("bio") || ""),
			phone: String(data.get("phone") || "")
		} });
		navigate({ to: "/desk" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.18em] text-accent",
				children: t("WELCOME")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight",
				children: t("CHOOSE_YOUR_DESK")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: t("CAN_CHANGE_LATER")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "mt-8 space-y-5 rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2 sm:grid-cols-2",
						children: ["traveler", "agency"].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setRole(r),
							className: cn("rounded-[var(--radius-md)] border p-4 text-left", role === r ? "border-ink bg-surface" : "border-border"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-medium capitalize",
								children: r === "traveler" ? t("ROLE_TRAVELER") : t("ROLE_AGENCY")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-sm text-muted",
								children: r === "traveler" ? t("POST_BRIEF_PICK_OFFER") : t("BROWSE_OPEN_BRIEFS")
							})]
						}, r))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "displayName",
							children: t("YOUR_NAME")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "displayName",
							name: "displayName",
							required: true,
							defaultValue: user?.displayName ?? ""
						})]
					}),
					role === "agency" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "company",
							children: t("AGENCY_NAME")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "company",
							name: "company",
							placeholder: "Atlas & Co"
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "city",
							children: t("CITY")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "city",
							name: "city",
							placeholder: "Athens"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "phone",
							children: t("PHONE_OPTIONAL")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "phone",
							name: "phone"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "bio",
							children: t("SHORT_BIO")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "bio",
							name: "bio",
							placeholder: "ما الذي تبحث عنه أو ما الذي تبيعه."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "lg",
						children: t("ENTER_THE_DESK")
					})
				]
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Onboarding, {}) });
//#endregion
export { SplitComponent as component };
