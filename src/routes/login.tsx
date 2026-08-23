import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient, authEnabled } from "@/lib/auth/client";
import t from "@/lib/i18n";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { user, isPending } = useCurrentUserState();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!isPending && user) return <Navigate to="/desk" />;

  async function onEmail(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") || "");
    const password = String(data.get("password") || "");
    const name = String(data.get("name") || "");
    try {
      if (mode === "up") {
        const res = await authClient.signUp.email({ email, password, name });
        if (res.error) throw new Error(res.error.message);
      } else {
        const res = await authClient.signIn.email({ email, password });
        if (res.error) throw new Error(res.error.message);
      }
      window.location.href = "/onboarding";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in");
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-md place-items-center px-4 py-10">
      <div className="w-full rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-6 shadow-[var(--shadow-card)] sm:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">{t("APP_NAME")}</p>
                <h1 className="mt-2 font-display text-3xl tracking-tight">{t("SIGN_IN_TO_DESK")}</h1>
                <p className="mt-2 text-sm text-muted">{t("TRAVELERS_POST")}</p>

        {authEnabled ? null : (
          <p className="mt-6 text-sm text-muted">{t("SIGN_IN_DISABLED")}</p>
        )}

        <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wider text-subtle">
          <span className="h-px flex-1 bg-border" />
          {t("OR_EMAIL")}
          <span className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={onEmail} className="space-y-3">
          {mode === "up" ? (
            <div className="grid gap-1.5">
              <Label htmlFor="name">{t("NAME")}</Label>
              <Input id="name" name="name" required placeholder="Maya Chen" />
            </div>
          ) : null}
          <div className="grid gap-1.5">
            <Label htmlFor="email">{t("EMAIL")}</Label>
            <Input id="email" name="email" type="email" required placeholder="you@studio.com" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="password">{t("PASSWORD")}</Label>
            <Input id="password" name="password" type="password" required minLength={8} />
          </div>
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={busy}>
                      {mode === "up" ? t("CREATE_ACCOUNT") : t("SIGN_IN_WITH_EMAIL")}
          </Button>
        </form>

        <button
          type="button"
          className="mt-4 text-sm text-muted hover:text-ink"
          onClick={() => setMode(mode === "up" ? "in" : "up")}
        >
          {mode === "up" ? t("ALREADY_HAVE_ACCOUNT") : t("NEW_HERE_CREATE_ACCOUNT") }
        </button>
        <p className="mt-6 text-center text-xs text-subtle">
          <Link to="/how-it-works" className="underline">
                      {t("HOW_QUAY_WORKS")}
          </Link>
        </p>
      </div>
    </div>
  );
}
