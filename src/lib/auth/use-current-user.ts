import { useEffect, useState } from "react";

/** Normalized user shape used across the app, auth on or off. */
export type AppUser = {
  id: string;
  displayName: string | null;
  primaryEmail: string | null;
  profileImageUrl: string | null;
  /** True when this is the sandbox/dev fallback (auth not configured). */
  isDevFallback: boolean;
};

/**
 * Stable fallback user, used ONLY when auth is disabled
 * (`VITE_AUTH_ENABLED=false`, the shipped default). With auth on, the sandbox
 * live preview does real sign-in via the baked preview client. Its id is
 * `"dev-user"` — the SAME id `verify.server.ts` returns server-side — so per-user
 * rows written in that mode belong to one consistent owner.
 */
export const DEV_USER: AppUser = {
  id: "dev-user",
  displayName: "Dev User",
  primaryEmail: "dev@example.com",
  profileImageUrl: null,
  isDevFallback: true,
};

const DEMO_USER_KEY = "quay.demo.user";

export function saveDemoUser(name: string, email: string): AppUser {
  const user: AppUser = {
    id: DEV_USER.id,
    displayName: name.trim() || email.split("@")[0] || "Demo traveler",
    primaryEmail: email.trim() || DEV_USER.primaryEmail,
    profileImageUrl: null,
    isDevFallback: true,
  };
  if (typeof window !== "undefined") {
    window.localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event("quay-demo-auth"));
  }
  return user;
}

export function clearDemoUser(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(DEMO_USER_KEY);
    window.dispatchEvent(new Event("quay-demo-auth"));
  }
}

function readDemoUser(): AppUser | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(DEMO_USER_KEY);
    return stored ? (JSON.parse(stored) as AppUser) : null;
  } catch {
    return null;
  }
}

/** `useCurrentUserState()` result: the user plus the session-loading flag. */
export type CurrentUserState = {
  /** The user — `null` BOTH while the session loads and when signed out. */
  user: AppUser | null;
  /** True while the session is still resolving — don't treat `user: null` as signed out yet. */
  isPending: boolean;
};

/**
 * Current user + loading state. Same behavior in live preview and when deployed:
 *   - Auth enabled -> the real signed-in user; `user` is `null` while
 *                            the session resolves (`isPending: true`) and when
 *                            signed out (`isPending: false`). Session comes from
 *                            Better Auth `useSession()` → `/api/auth/get-session`
 *                            (cookie when deployed; bearer in live preview).
 *   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
 *
 * Protect a route by waiting out `isPending` before acting on `user` —
 * redirecting on `user: null` alone bounces signed-in visitors to sign-in on
 * every hard reload:
 *
 *   import { RedirectToSignIn } from "@/lib/auth/gates";
 *   const { user, isPending } = useCurrentUserState();
 *   if (isPending) return null;              // still resolving — don't redirect yet
 *   if (!user) return <RedirectToSignIn />;  // definitely signed out
 *
 * `authEnabled` is a module-level constant fixed at load, so the guarded hook
 * call keeps a stable hook order across every render of a given component.
 */
export function useCurrentUserState(): CurrentUserState {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isPending, setPending] = useState(true);

  useEffect(() => {
    const refresh = () => {
      setUser(readDemoUser());
      setPending(false);
    };
    refresh();
    window.addEventListener("quay-demo-auth", refresh);
    return () => window.removeEventListener("quay-demo-auth", refresh);
  }, []);

  return { user, isPending };
}

/**
 * Convenience view of `useCurrentUserState().user` for display (e.g.
 * `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
 * for redirects/guards use `useCurrentUserState()` and check `isPending`.
 */
export function useCurrentUser(): AppUser | null {
  return useCurrentUserState().user;
}
