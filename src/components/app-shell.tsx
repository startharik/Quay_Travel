import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Anchor,
  Compass,
  Home,
  Inbox,
  Plus,
  UserCircle2,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getMyProfile } from "@/lib/quay-api";
import type { Profile } from "@/lib/quay-types";
import { cn } from "@/lib/utils";
import t from "@/lib/i18n";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, isPending } = useCurrentUserState();
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState<Profile | null | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }
    void getMyProfile()
      .then(setProfile)
      .catch(() => setProfile(null));
  }, [user?.id]);

  const bare = pathname === "/login";
  const role = profile?.role;

  const navItems = user
    ? [
        { to: "/desk", label: role === "agency" ? t("MARKETPLACE") : t("DESK"), icon: Home },
        { to: "/inbox", label: t("INBOX"), icon: Inbox },
        ...(role === "traveler"
          ? [{ to: "/trips/new", label: t("NEW_REQUEST"), icon: Plus }]
          : []),
        { to: "/agencies", label: t("AGENCIES"), icon: Users },
        { to: "/profile", label: t("PROFILE"), icon: UserCircle2 },
      ]
    : [{ to: "/how-it-works", label: t("HOW_IT_WORKS"), icon: Compass }];

  return (
    <div className="min-h-dvh bg-bg text-ink">
      <header className="sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
          <Link to="/" className="flex items-center gap-2 text-ink">
            <span className="flex size-8 items-center justify-center rounded-[var(--radius-sm)] bg-ink text-bg">
              <Anchor className="size-4" strokeWidth={1.75} />
            </span>
            <span className="font-display text-xl tracking-tight">{t("APP_NAME")}</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <NavLink to="/how-it-works" active={pathname === "/how-it-works"}>
              {t("HOW_IT_WORKS")}
            </NavLink>
            {user ? (
              <>
                <NavLink to="/desk" active={pathname === "/desk" || pathname.startsWith("/trips")}>{role === "agency" ? t("MARKETPLACE") : t("DESK")}</NavLink>
                {role === "traveler" ? (
                  <NavLink to="/trips/new" active={pathname === "/trips/new"}>{t("NEW_REQUEST")}</NavLink>
                ) : null}
                <NavLink to="/inbox" active={pathname === "/inbox"}>{t("INBOX")}</NavLink>
                <NavLink to="/agencies" active={pathname === "/agencies"}>{t("AGENCIES")}</NavLink>
              </>
            ) : null}
          </nav>

          <div className="flex items-center gap-2">
            {!mounted || isPending ? (
              <div className="h-9 w-28 animate-pulse rounded-[var(--radius-sm)] bg-surface" />
            ) : user ? (
              <>
                <Link to="/profile" className="hidden text-sm text-muted hover:text-ink sm:inline">
                  {t("PROFILE")}
                </Link>
                <UserButton />
              </>
            ) : (
              <Button asChild size="sm">
                <Link to="/login">{t("SIGN_IN")}</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className={bare ? "min-h-[calc(100dvh-4rem)]" : "mx-auto w-full max-w-6xl px-4 pb-28 pt-8 sm:pt-10 md:pb-24"}>{children}</main>

      {user ? (
        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-2 shadow-[0_-12px_30px_-18px_rgba(26,25,22,0.18)] backdrop-blur-md md:hidden">
          <div className="mx-auto grid max-w-md grid-cols-5 gap-1 px-2">
            {navItems.map(({ to, label, icon: Icon }) => (
              <MobileNavLink key={to} to={to} label={label} active={isActivePath(to, pathname)}>
                <Icon className="size-5" strokeWidth={2.1} />
              </MobileNavLink>
            ))}
          </div>
        </nav>
      ) : null}
    </div>
  );
}

function isActivePath(to: string, pathname: string) {
  if (to === "/desk") return pathname === "/desk" || pathname.startsWith("/trips");
  if (to === "/how-it-works") return pathname === "/how-it-works";
  return pathname === to;
}

function NavLink({
  to,
  active,
  children,
}: {
  to: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "rounded-[var(--radius-sm)] px-3 py-2 text-sm transition-colors duration-150",
        active ? "bg-surface text-ink" : "text-muted hover:text-ink",
      )}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  to,
  label,
  active,
  children,
}: {
  to: string;
  label: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-center justify-center gap-1 rounded-[var(--radius-md)] px-1 py-2 text-[10px] font-medium transition-all duration-150",
        active ? "text-ink" : "text-muted",
      )}
    >
      <span className={cn("flex size-8 items-center justify-center rounded-full", active ? "bg-surface text-ink" : "text-muted")}>
        {children}
      </span>
      <span>{label}</span>
    </Link>
  );
}
