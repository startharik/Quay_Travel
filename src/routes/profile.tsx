import { createFileRoute } from "@tanstack/react-router";
import t from "@/lib/i18n";
import { useEffect, useState, type FormEvent } from "react";
import { RequireAuth } from "@/components/require-auth";
import { PageError, PageLoading } from "@/components/page-state";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getMyProfile, saveProfile } from "@/lib/quay-api";
import type { Profile, Role } from "@/lib/quay-types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({ component: () => (
  <RequireAuth>
    <ProfilePage />
  </RequireAuth>
) });

function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [role, setRole] = useState<Role>("traveler");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    void getMyProfile().then((p) => {
      if (p) {
        setProfile(p);
        setRole(p.role);
      } else {
        window.location.href = "/onboarding";
      }
    }).catch(() => setError(true));
  }, []);

  if (error) return <PageError />;
  if (!profile) return <PageLoading />;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    await saveProfile({
      data: {
        role,
        displayName: String(data.get("displayName") || ""),
        company: String(data.get("company") || ""),
        city: String(data.get("city") || ""),
        bio: String(data.get("bio") || ""),
        phone: String(data.get("phone") || ""),
      },
    });
    setSaved(true);
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="font-display text-4xl tracking-tight">{t("PROFILE")}</h1>
      <p className="mt-2 text-muted">{t("PROFILE_DESC")}</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-6">
        <div className="grid gap-2 sm:grid-cols-2">
          {(["traveler", "agency"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={cn(
                "rounded-[var(--radius-md)] border p-3 text-left capitalize",
                role === r ? "border-ink bg-surface" : "border-border",
              )}
            >
              {r === "traveler" ? t("ROLE_TRAVELER") : t("ROLE_AGENCY")}
            </button>
          ))}
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="displayName">{t("NAME")}</Label>
          <Input id="displayName" name="displayName" defaultValue={profile.displayName} required />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="company">{t("AGENCY_COMPANY")}</Label>
          <Input id="company" name="company" defaultValue={profile.company} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="city">{t("CITY")}</Label>
          <Input id="city" name="city" defaultValue={profile.city} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="phone">{t("PHONE")}</Label>
          <Input id="phone" name="phone" defaultValue={profile.phone} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="bio">{t("BIO")}</Label>
          <Textarea id="bio" name="bio" defaultValue={profile.bio} />
        </div>
        {saved ? <p className="text-sm text-ok">{t("SAVED")}</p> : null}
        <Button type="submit">{t("SAVE_PROFILE")}</Button>
      </form>
    </div>
  );
}
