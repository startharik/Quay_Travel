import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as saveProfile, o as getMyProfile, r as t, v as Button, y as cn } from "./router-CYVZTrp1.mjs";
import { t as RequireAuth } from "./require-auth-DE3SFmCY.mjs";
import { n as Label, r as Textarea, t as Input } from "./label-jbwHIUxX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-eawAEdkn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [role, setRole] = (0, import_react.useState)("traveler");
	const [saved, setSaved] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		getMyProfile().then((p) => {
			if (p) {
				setProfile(p);
				setRole(p.role);
			} else window.location.href = "/onboarding";
		});
	}, []);
	if (!profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-48 animate-pulse rounded-[var(--radius-lg)] bg-surface" });
	async function onSubmit(e) {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		await saveProfile({ data: {
			role,
			displayName: String(data.get("displayName") || ""),
			company: String(data.get("company") || ""),
			city: String(data.get("city") || ""),
			bio: String(data.get("bio") || ""),
			phone: String(data.get("phone") || "")
		} });
		setSaved(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-tight",
				children: t("PROFILE")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: t("PROFILE_DESC")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "mt-8 space-y-4 rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2 sm:grid-cols-2",
						children: ["traveler", "agency"].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setRole(r),
							className: cn("rounded-[var(--radius-md)] border p-3 text-left capitalize", role === r ? "border-ink bg-surface" : "border-border"),
							children: r === "traveler" ? t("ROLE_TRAVELER") : t("ROLE_AGENCY")
						}, r))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "displayName",
							children: t("NAME")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "displayName",
							name: "displayName",
							defaultValue: profile.displayName,
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "company",
							children: t("AGENCY_COMPANY")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "company",
							name: "company",
							defaultValue: profile.company
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "city",
							children: t("CITY")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "city",
							name: "city",
							defaultValue: profile.city
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "phone",
							children: t("PHONE")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "phone",
							name: "phone",
							defaultValue: profile.phone
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "bio",
							children: t("BIO")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "bio",
							name: "bio",
							defaultValue: profile.bio
						})]
					}),
					saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ok",
						children: t("SAVED")
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: t("SAVE_PROFILE")
					})
				]
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilePage, {}) });
//#endregion
export { SplitComponent as component };
