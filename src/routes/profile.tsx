import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { RequireAuth } from "@/components/require-auth";
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

  useEffect(() => {
    void getMyProfile().then((p) => {
      if (p) {
        setProfile(p);
        setRole(p.role);
      } else {
        window.location.href = "/onboarding";
      }
    });
  }, []);

  if (!profile) return <div className="h-48 animate-pulse rounded-[var(--radius-lg)] bg-surface" />;

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
      <h1 className="font-display text-4xl tracking-tight">Profile</h1>
      <p className="mt-2 text-muted">This is what agencies and travelers see on your bids and briefs.</p>
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
              {r}
            </button>
          ))}
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="displayName">Name</Label>
          <Input id="displayName" name="displayName" defaultValue={profile.displayName} required />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="company">Agency / company</Label>
          <Input id="company" name="company" defaultValue={profile.company} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" defaultValue={profile.city} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" defaultValue={profile.phone} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" name="bio" defaultValue={profile.bio} />
        </div>
        {saved ? <p className="text-sm text-ok">Saved.</p> : null}
        <Button type="submit">Save profile</Button>
      </form>
    </div>
  );
}
