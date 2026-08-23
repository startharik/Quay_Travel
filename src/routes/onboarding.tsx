import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { RequireAuth } from "@/components/require-auth";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import t from "@/lib/i18n";
import { getMyProfile, saveProfile } from "@/lib/quay-api";
import type { Role } from "@/lib/quay-types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({ component: () => (
  <RequireAuth>
    <Onboarding />
  </RequireAuth>
) });

function Onboarding() {
  const user = useCurrentUser();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("traveler");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void getMyProfile().then((p) => {
      if (p) {
        void navigate({ to: "/desk" });
        return;
      }
      setReady(true);
    });
  }, [navigate]);

  if (!ready) {
    return <div className="h-40 animate-pulse rounded-[var(--radius-lg)] bg-surface" />;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    await saveProfile({
      data: {
        role,
        displayName: String(data.get("displayName") || user?.displayName || t("ROLE_TRAVELER")),
        company: String(data.get("company") || ""),
        city: String(data.get("city") || ""),
        bio: String(data.get("bio") || ""),
        phone: String(data.get("phone") || ""),
      },
    });
    void navigate({ to: "/desk" });
  }

  return (
    <div className="mx-auto max-w-xl">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">{t("WELCOME")}</p>
      <h1 className="mt-2 font-display text-4xl tracking-tight">{t("CHOOSE_YOUR_DESK")}</h1>
      <p className="mt-3 text-muted">{t("CAN_CHANGE_LATER")}</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5 rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-6">
        <div className="grid gap-2 sm:grid-cols-2">
          {(["traveler", "agency"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={cn(
                "rounded-[var(--radius-md)] border p-4 text-left",
                role === r ? "border-ink bg-surface" : "border-border",
              )}
            >
              <span className="block font-medium capitalize">{r === "traveler" ? t("ROLE_TRAVELER") : t("ROLE_AGENCY")}</span>
              <span className="mt-1 block text-sm text-muted">
                {r === "traveler" ? t("POST_BRIEF_PICK_OFFER") : t("BROWSE_OPEN_BRIEFS")}
              </span>
            </button>
          ))}
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="displayName">{t("YOUR_NAME")}</Label>
          <Input id="displayName" name="displayName" required defaultValue={user?.displayName ?? ""} />
        </div>
        {role === "agency" ? (
          <div className="grid gap-1.5">
            <Label htmlFor="company">{t("AGENCY_NAME")}</Label>
            <Input id="company" name="company" placeholder="Atlas & Co" />
          </div>
        ) : null}
        <div className="grid gap-1.5">
          <Label htmlFor="city">{t("CITY")}</Label>
          <Input id="city" name="city" placeholder="Athens" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="phone">{t("PHONE_OPTIONAL")}</Label>
          <Input id="phone" name="phone" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="bio">{t("SHORT_BIO")}</Label>
          <Textarea id="bio" name="bio" placeholder="ما الذي تبحث عنه أو ما الذي تبيعه." />
        </div>
        <Button type="submit" size="lg">
          {t("ENTER_THE_DESK")}
        </Button>
      </form>
    </div>
  );
}
