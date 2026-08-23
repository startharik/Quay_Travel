import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Anchor } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getMyProfile } from "@/lib/quay-api";
import type { Profile } from "@/lib/quay-types";
import { cn } from "@/lib/utils";

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

  return (
    <div className="min-h-dvh bg-bg text-ink">
      <header className="sticky top-0 z-30 border-b border-border bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
          <Link to="/" className="flex items-center gap-2 text-ink">
            <span className="flex size-8 items-center justify-center rounded-[var(--radius-sm)] bg-ink text-bg">
              <Anchor className="size-4" strokeWidth={1.75} />
            </span>
            <span className="font-display text-xl tracking-tight">Quay</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            <NavLink to="/how-it-works" active={pathname === "/how-it-works"}>
              How it works
            </NavLink>
            {user ? (
              <>
                <NavLink to="/desk" active={pathname === "/desk"}>
                  {role === "agency" ? "Marketplace" : "Desk"}
                </NavLink>
                {role === "traveler" ? (
                  <NavLink to="/trips/new" active={pathname === "/trips/new"}>
                    New request
                  </NavLink>
                ) : null}
                <NavLink to="/inbox" active={pathname === "/inbox"}>
                  Inbox
                </NavLink>
                <NavLink to="/agencies" active={pathname === "/agencies"}>
                  Agencies
                </NavLink>
              </>
            ) : null}
          </nav>

          <div className="flex items-center gap-2">
            {!mounted || isPending ? (
              <div className="h-9 w-28 animate-pulse rounded-[var(--radius-sm)] bg-surface" />
            ) : user ? (
              <>
                <Link
                  to="/profile"
                  className="hidden text-sm text-muted hover:text-ink sm:inline"
                >
                  Profile
                </Link>
                <UserButton />
              </>
            ) : (
              <Button asChild size="sm">
                <Link to="/login">Sign in</Link>
              </Button>
            )}
          </div>
        </div>
      </header>
      <main
        className={
          bare ? "min-h-[calc(100dvh-4rem)]" : "mx-auto w-full max-w-6xl px-4 pb-24 pt-8 sm:pt-10"
        }
      >
        {children}
      </main>
    </div>
  );
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
