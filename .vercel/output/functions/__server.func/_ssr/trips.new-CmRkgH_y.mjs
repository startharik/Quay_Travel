import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as createTrip, o as getMyProfile, r as t, v as Button, y as cn } from "./router-AcUgDc4y.mjs";
import { t as RequireAuth } from "./require-auth-CIO8jNgP.mjs";
import { n as Label, r as Textarea, t as Input } from "./label-B6S7RkWd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trips.new-CmRkgH_y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TYPES = [
	t("TYPES_HONEYMOON"),
	t("TYPES_FAMILY"),
	t("TYPES_CITY_BREAK"),
	t("TYPES_ADVENTURE"),
	t("TYPES_BEACH"),
	t("TYPES_CULTURE")
];
var LODGING = [
	{
		id: "budget",
		label: t("LODGING_BUDGET"),
		hint: t("LODGING_BUDGET_HINT")
	},
	{
		id: "mid",
		label: t("LODGING_MID"),
		hint: t("LODGING_MID_HINT")
	},
	{
		id: "luxury",
		label: t("LODGING_LUXURY"),
		hint: t("LODGING_LUX_HINT")
	}
];
function NewTrip() {
	const navigate = useNavigate();
	const [tripType, setTripType] = (0, import_react.useState)(t("TYPES_CITY_BREAK"));
	const [lodging, setLodging] = (0, import_react.useState)("mid");
	const [blocked, setBlocked] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		getMyProfile().then((p) => {
			if (!p) window.location.href = "/onboarding";
			else if (p.role !== "traveler") setBlocked(true);
		});
	}, []);
	if (blocked) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl",
			children: t("AGENCY_CANNOT_POST")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-muted",
			children: t("SWITCH_ROLE_IF_TRAVELING")
		})]
	});
	async function onSubmit(e) {
		e.preventDefault();
		setError(null);
		const data = new FormData(e.currentTarget);
		try {
			const res = await createTrip({ data: {
				destination: String(data.get("destination") || "").trim(),
				country: String(data.get("country") || "").trim(),
				origin: String(data.get("origin") || "").trim(),
				startDate: String(data.get("startDate") || ""),
				endDate: String(data.get("endDate") || ""),
				flexible: data.get("flexible") === "on",
				adults: Number(data.get("adults") || 1),
				children: Number(data.get("children") || 0),
				budget: Number(data.get("budget") || 0),
				tripType,
				lodging,
				notes: String(data.get("notes") || "").trim()
			} });
			navigate({
				to: "/trips/$id",
				params: { id: res.id }
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : t("COULD_NOT_PUBLISH"));
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.18em] text-accent",
				children: t("NEW_REQUEST")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight",
				children: t("TELL_AGENCIES")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: t("BE_SPECIFIC")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "mt-8 space-y-6 rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-5 sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("DESTINATION"),
							htmlFor: "destination",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "destination",
								name: "destination",
								required: true,
								placeholder: "Amalfi Coast"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("COUNTRY"),
							htmlFor: "country",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "country",
								name: "country",
								placeholder: "Italy"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("FLYING_FROM"),
						htmlFor: "origin",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "origin",
							name: "origin",
							placeholder: "New York"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("START"),
							htmlFor: "startDate",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "startDate",
								name: "startDate",
								type: "date",
								required: true,
								defaultValue: "2026-10-15"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("END"),
							htmlFor: "endDate",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "endDate",
								name: "endDate",
								type: "date",
								required: true,
								defaultValue: "2026-10-22"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							name: "flexible",
							className: "size-4 accent-[var(--color-accent)]",
							defaultChecked: true
						}), t("DATES_FLEXIBLE")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("ADULTS"),
								htmlFor: "adults",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "adults",
									name: "adults",
									type: "number",
									min: 1,
									defaultValue: 2
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("CHILDREN"),
								htmlFor: "children",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "children",
									name: "children",
									type: "number",
									min: 0,
									defaultValue: 0
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: t("BUDGET"),
								htmlFor: "budget",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "budget",
									name: "budget",
									type: "number",
									min: 200,
									step: 50,
									defaultValue: 4e3
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs font-medium tracking-wide text-muted",
						children: t("TRIP_TYPE")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: TYPES.map((tVal) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setTripType(tVal),
							className: cn("h-10 rounded-full border px-3 text-sm", tripType === tVal ? "border-ink bg-ink text-bg-elevated" : "border-border bg-bg text-muted"),
							children: tVal
						}, tVal))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs font-medium tracking-wide text-muted",
						children: t("LODGING")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2 sm:grid-cols-3",
						children: LODGING.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setLodging(l.id),
							className: cn("rounded-[var(--radius-md)] border p-3 text-left", lodging === l.id ? "border-ink bg-surface" : "border-border bg-bg"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm font-medium",
								children: l.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-xs text-muted",
								children: l.hint
							})]
						}, l.id))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("MUST_HAVES"),
						htmlFor: "notes",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "notes",
							name: "notes",
							placeholder: "رحلات من نيويورك. فندق هادئ. درس طهي واحد."
						})
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							size: "lg",
							children: t("PUBLISH_REQUEST")
						})
					})
				]
			})
		]
	});
}
function Field({ label, htmlFor, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor,
			children: label
		}), children]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewTrip, {}) });
//#endregion
export { SplitComponent as component };
