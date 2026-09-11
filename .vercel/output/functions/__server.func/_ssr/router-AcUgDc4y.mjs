import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, _ as createRootRoute, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, x as useRouter, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn, s as __exportAll } from "./ssr.mjs";
import { A as number, C as _enum, E as boolean, F as union, O as literal, P as string, T as array, j as object } from "../_libs/@better-auth/core+[...].mjs";
import { a as useCurrentUserState, i as useCurrentUser, n as signOut } from "./client-BYnEhRYZ.mjs";
import { t as authMiddleware } from "./middleware-DT3aJ7cf.mjs";
import { t as auth } from "./server-BziVAaMl.mjs";
import { a as Inbox, c as CircleUserRound, n as TriangleAlert, o as House, p as Anchor, r as Plus, s as Compass, t as Users } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-AcUgDc4y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatMoney(amount, currency = "USD") {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
		maximumFractionDigits: 0
	}).format(amount);
}
function formatRange(start, end) {
	const s = /* @__PURE__ */ new Date(start + "T00:00:00");
	const e = /* @__PURE__ */ new Date(end + "T00:00:00");
	const sameMonth = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
	return `${s.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric"
	})} – ${e.toLocaleDateString("en-US", {
		month: sameMonth ? void 0 : "short",
		day: "numeric",
		year: "numeric"
	})}`;
}
function nightsBetween(start, end) {
	const s = (/* @__PURE__ */ new Date(start + "T00:00:00")).getTime();
	const e = (/* @__PURE__ */ new Date(end + "T00:00:00")).getTime();
	return Math.max(1, Math.round((e - s) / 864e5));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] text-sm font-medium transition-[opacity,transform,background-color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] [&_svg]:size-4", {
	variants: {
		variant: {
			default: "bg-ink text-bg-elevated hover:opacity-90",
			accent: "bg-accent text-accent-fg hover:opacity-90",
			outline: "border border-border-strong bg-bg-elevated text-ink hover:bg-surface",
			ghost: "text-ink hover:bg-surface",
			danger: "bg-danger text-bg-elevated hover:opacity-90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
/**
* Auth state components — plain wrappers around `useCurrentUserState()`.
*
* With auth on, visitors are signed out until they authenticate — in the sandbox
* live preview too, which does real sign-in. The shared dev user appears only
* when auth is disabled (`VITE_AUTH_ENABLED=false`, the shipped default).
* While the session is still resolving, gates that care about signed-out state
* render nothing so there's no signed-out flash on hard reload.
*/
/** Where `RedirectToSignIn` sends signed-out visitors. Create this route. */
var SIGN_IN_PATH = "/login";
/**
* Client-side redirect to the sign-in route (TanStack `<Navigate>` — NOT a full
* `window.location` reload). A hard navigation re-bootstraps the SPA and re-runs
* session loading, which feels like a second "Loading…" on /login.
*
* Guard routes by waiting out `isPending` first (see `use-current-user`), then
* render this.
*/
function RedirectToSignIn({ to = SIGN_IN_PATH }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to });
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of).
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getMyProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("f39c9a7ad39ed19cbcf8740bdde6cfb691f0d673a822d465337c9a69721bf834"));
var saveProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	role: _enum(["traveler", "agency"]),
	displayName: string().min(1).max(80),
	company: string().max(80).optional(),
	city: string().max(80).optional(),
	bio: string().max(600).optional(),
	phone: string().max(40).optional()
})).handler(createSsrRpc("c5f42d203a4cbc16a9e9a617ad8225a0b2e6d8be2fda9806c0e84067baae08b2"));
var listMarketplace = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("ac6c4d8c0b979236450fb9e40a53acd19a0c1c29b47daab377a779f8ada8190f"));
var listMyTrips = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("cdc49ee9ed5fce84b49a6f60b6f1766b33bb57a8ffbdad24f0b04de030844402"));
var listMyBids = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("ec5a034b9350e842539dc7ceebabf6e47e4f2ac1408ae0876135ab0b429beb9c"));
var getTrip = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator(string()).handler(createSsrRpc("048cb27033008cdc1a882303522c284868794c6240de34f83f8c14428716d127"));
var createTrip = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	destination: string().min(1).max(80),
	country: string().max(80),
	origin: string().max(80),
	startDate: string(),
	endDate: string(),
	flexible: boolean(),
	adults: number().int().min(1).max(20),
	children: number().int().min(0).max(20),
	budget: number().int().min(200),
	tripType: string().min(1).max(40),
	lodging: _enum([
		"budget",
		"mid",
		"luxury"
	]),
	notes: string().max(2e3)
})).handler(createSsrRpc("67dc27c71d6534a1430b2d58b9e77cf3e832bb9d33e2402ea6035075bffbb4ad"));
var placeBid = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	tripId: string(),
	price: number().int().min(100),
	title: string().min(1).max(120),
	highlights: string().max(2e3),
	includes: array(string()).max(20),
	validUntil: string()
})).handler(createSsrRpc("d85a2d07a923d48f8019d8073e2016d6dcdf5cd940764feb340ecf08ceb022c6"));
var acceptBid = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(string()).handler(createSsrRpc("dfd0930cee78c63b70e581c2ec3ff3fdbf8e7ef577d93354bbba831ea86d30ff"));
var listMessages = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator(string()).handler(createSsrRpc("12ecc0c8ba1a1682a6641465415c5a0a6781668bc296986dac457761f989be13"));
var sendMessage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	tripId: string(),
	body: string().min(1).max(2e3)
})).handler(createSsrRpc("16b8c36aeb8c6bab40c282b2ec67411d2800b66a03eb6f53dfe23f27c72b3555"));
var listInbox = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("a9ed0a8bfdc5e6f29d4fd13e9d5805d6f38f5709713d0654300003c74ea1d62d"));
var listAgencies = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("06c633024344ccf75aad819c2f5658ce8b9e8cb6f63f3af78289c4b3f3632466"));
var translations = {
	APP_NAME: "كواي",
	DESCRIPTION: "انشر رحلة. وكالات السفر تقدم عروضًا.",
	REVERSE_AUCTION: "مزاد عكسي للعطلات",
	HERO_TAGLINE: "سم الرحلة. دع الوكالات تتنافس.",
	HERO_SUB: "انشر المكان الذي تريد الذهاب إليه، التواريخ، الأشخاص، والميزانية. المكاتب المرخّصة ترسل باقات حقيقية.",
	SIGN_IN_TO_START: "سجّل الدخول للبدء",
	SIGN_IN_TO_DESK: "تسجيل الدخول إلى اللوحة",
	OPEN_YOUR_DESK: "افتح لوحة التحكم الخاصة بك",
	HOW_IT_WORKS: "كيف يعمل",
	HOW_QUAY_WORKS: "كيف يعمل كواي",
	GUIDE: "دليل",
	FOR_TRAVELERS: "للمسافرين",
	FOR_AGENCIES: "للوكالات",
	ACCOUNTS: "الحسابات",
	MARKETPLACE: "السوق",
	DESK: "لوحة التحكم",
	NEW_REQUEST: "طلب جديد",
	INBOX: "البريد الوارد",
	AGENCIES: "الوكالات",
	PROFILE: "الملف الشخصي",
	SIGN_IN: "تسجيل الدخول",
	SIGN_OUT: "تسجيل الخروج",
	SIGN_IN_DISABLED: "تم تعطيل تسجيل الدخول.",
	CONTINUE_WITH: "المتابعة مع",
	OR_EMAIL: "أو عبر البريد الإلكتروني",
	NAME: "الاسم",
	EMAIL: "البريد الإلكتروني",
	PASSWORD: "كلمة المرور",
	CREATE_ACCOUNT: "إنشاء حساب",
	SIGN_IN_WITH_EMAIL: "تسجيل الدخول بالبريد الإلكتروني",
	LOADING: "جارٍ التحميل...",
	LOAD_FAILED: "تعذر تحميل محتوى هذه الصفحة.",
	RETRY: "إعادة المحاولة",
	ALREADY_HAVE_ACCOUNT: "هل لديك حساب؟ تسجيل الدخول",
	NEW_HERE_CREATE_ACCOUNT: "جديد هنا؟ إنشاء حساب",
	BRIEF: "الملخص",
	BRIEF_DESC: "الوجهة، التواريخ، عدد المسافرين، والقيود.",
	BIDS: "العروض",
	BIDS_DESC: "تقدّم الوكالات سعرًا ومسارًا وقائمة ما هو مُضمن.",
	AWARD: "الاختيار",
	AWARD_DESC: "اقبل عرضًا واحدًا وتحدث في المحادثة.",
	POST_WHERE: "انشر المكان الذي تريد الذهاب إليه، التواريخ، الأشخاص، والميزانية.",
	TRAVELERS_POST: "يقوم المسافرون بنشر طلبات السفر. تقدم الوكالات عروضًا.",
	BRIEF_TITLE: "المتطلبات",
	BIDS_TITLE: "العروض",
	AWARD_TITLE: "الاختيار",
	OPEN_BRIEFS: "الطلبات المفتوحة",
	YOUR_TRAVEL_DESK: "لوحة السفر الخاصة بك",
	POST_A_TRIP: "نشر طلب رحلة",
	NO_REQUESTS_YET: "لا توجد طلبات بعد. انشر واحدًا وستقدّم الوكالات عروضًا.",
	YOU_HAVE_NOT_BID: "لم تقدّم عرضًا بعد.",
	ALSO_OPEN: "أيضًا مفتوح",
	NOTHING_OPEN: "لا يوجد شيء مفتوح الآن.",
	THREADS_INFO: "تظهر المحادثات داخل كل رحلة. تظهر محادثات عينة للطلبات النموذجية.",
	NO_MESSAGES_YET: "لا رسائل بعد. قدم عرضًا أو انشر طلبًا أولًا.",
	AGENCIES_DESC: "مكاتب لها ملف على Quay. تظهر عينات حتى لا يكون السوق فارغًا.",
	INDEPENDENT: "مستقل",
	NO_BIO_YET: "لا يوجد سيرة ذاتية بعد.",
	PROFILE_DESC: "هذا ما تراه الوكالات والمسافرون على عروضك وطلباتك.",
	AGENCY_COMPANY: "الوكالة / الشركة",
	CITY: "المدينة",
	PHONE: "الهاتف",
	BIO: "نبذة",
	SAVE_PROFILE: "حفظ الملف الشخصي",
	SAVED: "تم الحفظ.",
	ROLE_TRAVELER: "مسافر",
	ROLE_AGENCY: "وكالة",
	WELCOME: "مرحبًا",
	CHOOSE_YOUR_DESK: "اختر لوحتك",
	CAN_CHANGE_LATER: "يمكنك تغيير هذا لاحقًا في الملف الشخصي، لكن العروض والطلبات تتبع الدور.",
	POST_BRIEF_PICK_OFFER: "انشر ملخصًا واختر عرضًا.",
	BROWSE_OPEN_BRIEFS: "تصفح الطلبات المفتوحة وقم بتقديم العروض.",
	YOUR_NAME: "اسمك",
	AGENCY_NAME: "اسم الوكالة",
	PHONE_OPTIONAL: "الهاتف (اختياري)",
	SHORT_BIO: "نبذة قصيرة",
	ENTER_THE_DESK: "الدخول إلى اللوحة",
	AGENCY_CANNOT_POST: "لا يمكن للمكاتب الوكالة نشر الطلبات",
	SWITCH_ROLE_IF_TRAVELING: "بدّل الدور في الملف الشخصي إذا كنت مسافرًا بنفسك.",
	COULD_NOT_PUBLISH: "تعذر النشر",
	TELL_AGENCIES: "أخبر الوكالات بما تريد",
	BE_SPECIFIC: "كن محددًا. الطلبات غير الواضحة تحصل على عروض غير واضحة.",
	DESTINATION: "الوجهة",
	COUNTRY: "البلد",
	FLYING_FROM: "المغادرة من",
	START: "تاريخ البدء",
	END: "تاريخ الانتهاء",
	DATES_FLEXIBLE: "التواريخ مرنة لبضعة أيام",
	ADULTS: "البالغون",
	CHILDREN: "الأطفال",
	BUDGET: "الميزانية (دولار أمريكي، الإجمالي)",
	TRIP_TYPE: "نوع الرحلة",
	LODGING: "الإقامة",
	MUST_HAVES: "المتطلبات والملاحظات",
	PUBLISH_REQUEST: "نشر الطلب",
	TYPES_HONEYMOON: "شهر عسل",
	TYPES_FAMILY: "عائلة",
	TYPES_CITY_BREAK: "عطلة مدينة",
	TYPES_ADVENTURE: "مغامرة",
	TYPES_BEACH: "شاطئ",
	TYPES_CULTURE: "ثقافة",
	LODGING_BUDGET: "اقتصادي",
	LODGING_MID: "متوسط",
	LODGING_LUXURY: "فاخر",
	LODGING_BUDGET_HINT: "نظيف وبسيط وموقع جيد",
	LODGING_MID_HINT: "راحة دون مبالغة",
	LODGING_LUX_HINT: "غرف ذات إطلالة",
	REQUEST_NOT_FOUND: "الطلب غير موجود",
	BACK_TO_DESK: "العودة إلى لوحة التحكم",
	OFFER_ACCEPTED_NOTICE: "تم قبول العرض. راسل الوكالة لتأكيد التفاصيل.",
	DATES: "التواريخ",
	PARTY: "المجموعة",
	STYLE: "الأسلوب",
	POSTED_BY: "نشر بواسطة",
	FLYING_FROM_LABEL: "المغادرة من",
	CEILING: "الحد الأقصى",
	PLACE_A_BID: "قدّم عرضًا",
	UPDATE_YOUR_BID: "تحديث عرضك",
	YOUR_OFFER: "عرضك",
	PACKAGE_TITLE: "عنوان الباقة",
	PRICE_USD: "السعر (دولار أمريكي)",
	WHY_THIS_PACKAGE: "لماذا هذه الباقة",
	INCLUDED_ONE_PER_LINE: "المضمن (سطر لكل عنصر)",
	OFFER_VALID_UNTIL: "العرض صالح حتى",
	SUBMIT_BID: "إرسال العرض",
	CANCEL: "إلغاء",
	BIDS_HEADER_SINGULAR: "عرض",
	BIDS_HEADER_PLURAL: "عروض",
	NO_BIDS_YET: "لا عروض بعد",
	FIRST_DESK_PROMPT: "كن أول مكتب يجيب على هذا الطلب.",
	AGENCIES_WILL_APPEAR: "ستظهر الوكالات هنا أثناء تقديمها للعروض.",
	THREAD: "المحادثة",
	WRITE_TO_OTHER_DESK: "اكتب إلى المكتب الآخر",
	SEND: "إرسال",
	MESSAGE_TRAVELER_AFTER_BID: "راسل المسافر بعد تقديم عرض",
	BUDGET_LABEL: "الميزانية",
	NO_BIDS_YET_SHORT: "لا عروض",
	NIGHTS: "ليالٍ",
	NIGHT_SINGULAR: "ليلة",
	ADULT: "بالغ",
	CHILD: "طفل",
	REVIEWS: "تقييمات",
	OFFER_VALID_UNTIL_LABEL: "العرض صالح حتى",
	ACCEPT_THIS_OFFER: "قبول هذا العرض",
	STATUS_OPEN: "مفتوح",
	STATUS_AWARDED: "تم الاختيار",
	STATUS_CLOSED: "مغلق",
	STATUS_PENDING: "قيد الانتظار",
	STATUS_ACCEPTED: "مقبول",
	STATUS_DECLINED: "مرفوض"
};
var englishTranslations = {
	APP_NAME: "Quay",
	DESCRIPTION: "Post a trip. Travel agencies compete with offers.",
	REVERSE_AUCTION: "A reverse auction for holidays",
	HERO_TAGLINE: "Name the trip. Let agencies compete.",
	HERO_SUB: "Share where you want to go, your dates, group, and budget. Licensed agencies send real packages.",
	SIGN_IN_TO_START: "Sign in to start",
	SIGN_IN_TO_DESK: "Sign in to your desk",
	OPEN_YOUR_DESK: "Open your desk",
	HOW_IT_WORKS: "How it works",
	HOW_QUAY_WORKS: "How Quay works",
	GUIDE: "Guide",
	FOR_TRAVELERS: "For travelers",
	FOR_AGENCIES: "For agencies",
	ACCOUNTS: "Accounts",
	MARKETPLACE: "Marketplace",
	DESK: "Desk",
	NEW_REQUEST: "New request",
	INBOX: "Inbox",
	AGENCIES: "Agencies",
	PROFILE: "Profile",
	SIGN_IN: "Sign in",
	SIGN_OUT: "Sign out",
	OR_EMAIL: "or with email",
	NAME: "Name",
	EMAIL: "Email",
	PASSWORD: "Password",
	CREATE_ACCOUNT: "Create account",
	SIGN_IN_WITH_EMAIL: "Sign in with email",
	LOADING: "Loading...",
	LOAD_FAILED: "This page could not load its content.",
	RETRY: "Try again",
	ALREADY_HAVE_ACCOUNT: "Already have an account? Sign in",
	NEW_HERE_CREATE_ACCOUNT: "New here? Create an account",
	BRIEF: "Brief",
	BRIEF_DESC: "Destination, dates, travelers, and constraints.",
	BIDS: "Offers",
	BIDS_DESC: "Agencies submit a price, itinerary, and inclusions.",
	AWARD: "Award",
	AWARD_DESC: "Accept one offer and continue the conversation.",
	POST_WHERE: "Post where you want to go, dates, travelers, and budget.",
	TRAVELERS_POST: "Travelers post requests. Agencies send offers.",
	OPEN_BRIEFS: "Open requests",
	YOUR_TRAVEL_DESK: "Your travel desk",
	POST_A_TRIP: "Post a trip request",
	NO_REQUESTS_YET: "No requests yet. Post one and agencies will respond.",
	YOU_HAVE_NOT_BID: "You have not submitted an offer yet.",
	ALSO_OPEN: "Also open",
	NOTHING_OPEN: "Nothing is open right now.",
	THREADS_INFO: "Conversations appear inside each trip.",
	NO_MESSAGES_YET: "No messages yet. Post a request or submit an offer first.",
	AGENCIES_DESC: "Agencies with a Quay profile.",
	INDEPENDENT: "Independent",
	NO_BIO_YET: "No bio yet.",
	PROFILE_DESC: "This is what travelers and agencies see on your profile.",
	AGENCY_COMPANY: "Agency / company",
	CITY: "City",
	PHONE: "Phone",
	BIO: "Bio",
	SAVE_PROFILE: "Save profile",
	SAVED: "Saved.",
	ROLE_TRAVELER: "Traveler",
	ROLE_AGENCY: "Agency",
	WELCOME: "Welcome",
	CHOOSE_YOUR_DESK: "Choose your desk",
	CAN_CHANGE_LATER: "You can change this later in your profile.",
	POST_BRIEF_PICK_OFFER: "Post a brief and choose an offer.",
	BROWSE_OPEN_BRIEFS: "Browse open requests and submit offers.",
	YOUR_NAME: "Your name",
	AGENCY_NAME: "Agency name",
	PHONE_OPTIONAL: "Phone (optional)",
	SHORT_BIO: "Short bio",
	ENTER_THE_DESK: "Enter the desk",
	TELL_AGENCIES: "Tell agencies what you want",
	BE_SPECIFIC: "Be specific. Unclear requests get unclear offers.",
	DESTINATION: "Destination",
	COUNTRY: "Country",
	FLYING_FROM: "Flying from",
	START: "Start date",
	END: "End date",
	DATES_FLEXIBLE: "Dates are flexible by a few days",
	ADULTS: "Adults",
	CHILDREN: "Children",
	BUDGET: "Budget (USD, total)",
	TRIP_TYPE: "Trip type",
	LODGING: "Lodging",
	MUST_HAVES: "Requirements and notes",
	PUBLISH_REQUEST: "Publish request",
	CANCEL: "Cancel",
	BACK_TO_DESK: "Back to desk",
	PLACE_A_BID: "Submit an offer",
	UPDATE_YOUR_BID: "Update your offer",
	YOUR_OFFER: "Your offer",
	PACKAGE_TITLE: "Package title",
	PRICE_USD: "Price (USD)",
	WHY_THIS_PACKAGE: "Why this package",
	INCLUDED_ONE_PER_LINE: "Included (one per line)",
	OFFER_VALID_UNTIL: "Offer valid until",
	SUBMIT_BID: "Submit offer",
	SEND: "Send",
	THREAD: "Conversation",
	STATUS_OPEN: "Open",
	STATUS_AWARDED: "Awarded",
	STATUS_CLOSED: "Closed",
	STATUS_PENDING: "Pending",
	STATUS_ACCEPTED: "Accepted",
	STATUS_DECLINED: "Declined"
};
var LANGUAGE_KEY = "quay.language";
function getLanguage() {
	if (typeof window === "undefined") return "ar";
	return window.localStorage.getItem(LANGUAGE_KEY) === "en" ? "en" : "ar";
}
function setLanguage(language) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(LANGUAGE_KEY, language);
	document.documentElement.lang = language;
	document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
	window.location.reload();
}
function t(key) {
	return (getLanguage() === "en" ? englishTranslations[key] : translations[key]) ?? translations[key] ?? key;
}
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { user, isPending } = useCurrentUserState();
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [profile, setProfile] = (0, import_react.useState)(void 0);
	(0, import_react.useEffect)(() => {
		setMounted(true);
		const language = getLanguage();
		document.documentElement.lang = language;
		document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
	}, []);
	(0, import_react.useEffect)(() => {
		if (!user) {
			setProfile(null);
			return;
		}
		getMyProfile().then(setProfile).catch(() => setProfile(null));
	}, [user?.id]);
	const bare = pathname === "/login";
	const role = profile?.role;
	const navItems = user ? [
		{
			to: "/desk",
			label: role === "agency" ? t("MARKETPLACE") : t("DESK"),
			icon: House
		},
		{
			to: "/inbox",
			label: t("INBOX"),
			icon: Inbox
		},
		...role === "traveler" ? [{
			to: "/trips/new",
			label: t("NEW_REQUEST"),
			icon: Plus
		}] : [],
		{
			to: "/agencies",
			label: t("AGENCIES"),
			icon: Users
		},
		{
			to: "/profile",
			label: t("PROFILE"),
			icon: CircleUserRound
		}
	] : [{
		to: "/how-it-works",
		label: t("HOW_IT_WORKS"),
		icon: Compass
	}];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-2 text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-8 items-center justify-center rounded-[var(--radius-sm)] bg-ink text-bg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Anchor, {
									className: "size-4",
									strokeWidth: 1.75
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-xl tracking-tight",
								children: t("APP_NAME")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "hidden items-center gap-1 md:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
								to: "/how-it-works",
								active: pathname === "/how-it-works",
								children: t("HOW_IT_WORKS")
							}), user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
									to: "/desk",
									active: pathname === "/desk" || pathname.startsWith("/trips"),
									children: role === "agency" ? t("MARKETPLACE") : t("DESK")
								}),
								role === "traveler" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
									to: "/trips/new",
									active: pathname === "/trips/new",
									children: t("NEW_REQUEST")
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
									to: "/inbox",
									active: pathname === "/inbox",
									children: t("INBOX")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
									to: "/agencies",
									active: pathname === "/agencies",
									children: t("AGENCIES")
								})
							] }) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setLanguage(getLanguage() === "ar" ? "en" : "ar"),
								className: "rounded-[var(--radius-sm)] border border-border px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-surface hover:text-ink",
								"aria-label": getLanguage() === "ar" ? "Switch to English" : "التبديل إلى العربية",
								children: getLanguage() === "ar" ? "English" : "العربية"
							}), !mounted || isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-9 w-28 animate-pulse rounded-[var(--radius-sm)] bg-surface" }) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/profile",
								className: "hidden text-sm text-muted hover:text-ink sm:inline",
								children: t("PROFILE")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									children: t("SIGN_IN")
								})
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: bare ? "min-h-[calc(100dvh-4rem)]" : "mx-auto w-full max-w-6xl px-4 pb-28 pt-8 sm:pt-10 md:pb-24",
				children
			}),
			user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-2 shadow-[0_-12px_30px_-18px_rgba(26,25,22,0.18)] backdrop-blur-md md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid max-w-md grid-cols-5 gap-1 px-2",
					children: navItems.map(({ to, label, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileNavLink, {
						to,
						label,
						active: isActivePath(to, pathname),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-5",
							strokeWidth: 2.1
						})
					}, to))
				})
			}) : null
		]
	});
}
function isActivePath(to, pathname) {
	if (to === "/desk") return pathname === "/desk" || pathname.startsWith("/trips");
	if (to === "/how-it-works") return pathname === "/how-it-works";
	return pathname === to;
}
function NavLink({ to, active, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		className: cn("rounded-[var(--radius-sm)] px-3 py-2 text-sm transition-colors duration-150", active ? "bg-surface text-ink" : "text-muted hover:text-ink"),
		children
	});
}
function MobileNavLink({ to, label, active, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: cn("flex flex-col items-center justify-center gap-1 rounded-[var(--radius-md)] px-1 py-2 text-[10px] font-medium transition-all duration-150", active ? "text-ink" : "text-muted"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("flex size-8 items-center justify-center rounded-full", active ? "bg-surface text-ink" : "text-muted"),
			children
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
	});
}
var styles_default = "/assets/styles-sZ0GWMXy.css";
var APP_NAME = t("APP_NAME");
var Route$11 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: t("DESCRIPTION")
			},
			{
				name: "theme-color",
				content: "#1a1916"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;700&family=Figtree:wght@400;500;600&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "ar",
		dir: "rtl",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "min-h-dvh bg-bg text-ink",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$9 = () => import("./routes-QzkQKId6.mjs");
var Route$10 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./agencies-Ch7vNT1u.mjs");
var Route$9 = createFileRoute("/agencies")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./desk-D3FxLG8W.mjs");
var Route$8 = createFileRoute("/desk")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./how-it-works-ByrlH8Xj.mjs");
var Route$7 = createFileRoute("/how-it-works")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./inbox-Bf6NA16Y.mjs");
var Route$6 = createFileRoute("/inbox")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./login-BYuc_LDV.mjs");
var Route$5 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./onboarding-CyXe4WqC.mjs");
var Route$4 = createFileRoute("/onboarding")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./profile-BbA6kWn1.mjs");
var Route$3 = createFileRoute("/profile")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./trips._id-q27oevwq.mjs");
var Route$2 = createFileRoute("/trips/$id")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./trips.new-CmRkgH_y.mjs");
var Route$1 = createFileRoute("/trips/new")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var rootRouteChildren = {
	IndexRoute: Route$10.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$11
	}),
	AgenciesRoute: Route$9.update({
		id: "/agencies",
		path: "/agencies",
		getParentRoute: () => Route$11
	}),
	DeskRoute: Route$8.update({
		id: "/desk",
		path: "/desk",
		getParentRoute: () => Route$11
	}),
	HowItWorksRoute: Route$7.update({
		id: "/how-it-works",
		path: "/how-it-works",
		getParentRoute: () => Route$11
	}),
	InboxRoute: Route$6.update({
		id: "/inbox",
		path: "/inbox",
		getParentRoute: () => Route$11
	}),
	LoginRoute: Route$5.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$11
	}),
	OnboardingRoute: Route$4.update({
		id: "/onboarding",
		path: "/onboarding",
		getParentRoute: () => Route$11
	}),
	ProfileRoute: Route$3.update({
		id: "/profile",
		path: "/profile",
		getParentRoute: () => Route$11
	}),
	TripsIdRoute: Route$2.update({
		id: "/trips/$id",
		path: "/trips/$id",
		getParentRoute: () => Route$11
	}),
	TripsNewRoute: Route$1.update({
		id: "/trips/new",
		path: "/trips/new",
		getParentRoute: () => Route$11
	}),
	ApiAuthSplatRoute: Route.update({
		id: "/api/auth/$",
		path: "/api/auth/$",
		getParentRoute: () => Route$11
	})
};
var routeTree = Route$11._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { nightsBetween as S, RedirectToSignIn as _, createTrip as a, formatMoney as b, listAgencies as c, listMessages as d, listMyBids as f, sendMessage as g, saveProfile as h, acceptBid as i, listInbox as l, placeBid as m, Route$2 as n, getMyProfile as o, listMyTrips as p, t as r, getTrip as s, router_exports as t, listMarketplace as u, Button as v, formatRange as x, cn as y };
