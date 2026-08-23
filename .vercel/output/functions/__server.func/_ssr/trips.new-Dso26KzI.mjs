import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Button, a as getMyProfile, i as createTrip, v as cn } from "./router-DBA8Znij.mjs";
import { t as RequireAuth } from "./require-auth-j1S483Z6.mjs";
import { n as Label, r as Textarea, t as Input } from "./label-DwzFMLaJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trips.new-Dso26KzI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TYPES = [
	"Honeymoon",
	"Family",
	"City break",
	"Adventure",
	"Beach",
	"Culture"
];
var LODGING = [
	{
		id: "budget",
		label: "Budget",
		hint: "Clean, simple, well located"
	},
	{
		id: "mid",
		label: "Mid-range",
		hint: "Comfort without the theatre"
	},
	{
		id: "luxury",
		label: "Luxury",
		hint: "Rooms with a point of view"
	}
];
function NewTrip() {
	const navigate = useNavigate();
	const [tripType, setTripType] = (0, import_react.useState)("City break");
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
			children: "Agency desks cannot post briefs"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-muted",
			children: "Switch your role in profile if you are traveling yourself."
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
			setError(err instanceof Error ? err.message : "Could not publish");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.18em] text-accent",
				children: "New request"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight",
				children: "Tell agencies what you want"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: "Be specific. Vague briefs get vague bids."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "mt-8 space-y-6 rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-5 sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Destination",
							htmlFor: "destination",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "destination",
								name: "destination",
								required: true,
								placeholder: "Amalfi Coast"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Country",
							htmlFor: "country",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "country",
								name: "country",
								placeholder: "Italy"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Flying from",
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
							label: "Start",
							htmlFor: "startDate",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "startDate",
								name: "startDate",
								type: "date",
								required: true,
								defaultValue: "2026-10-15"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "End",
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
						}), "Dates are flexible by a few days"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Adults",
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
								label: "Children",
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
								label: "Budget (USD, total)",
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
						children: "Trip type"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setTripType(t),
							className: cn("h-10 rounded-full border px-3 text-sm", tripType === t ? "border-ink bg-ink text-bg-elevated" : "border-border bg-bg text-muted"),
							children: t
						}, t))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs font-medium tracking-wide text-muted",
						children: "Lodging"
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
						label: "Must-haves and notes",
						htmlFor: "notes",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "notes",
							name: "notes",
							placeholder: "Flights from New York. Quiet hotel. One cooking class."
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
							children: "Publish request"
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
