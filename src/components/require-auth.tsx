import type { ReactNode } from "react";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return (
      <div className="space-y-3 py-10">
        <div className="h-8 w-48 animate-pulse rounded-[var(--radius-sm)] bg-surface" />
        <div className="h-40 animate-pulse rounded-[var(--radius-lg)] bg-surface" />
      </div>
    );
  }
  if (!user) return <RedirectToSignIn />;
  return <>{children}</>;
}
