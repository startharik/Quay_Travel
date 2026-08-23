import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import t from "@/lib/i18n";

export const Route = createFileRoute("/how-it-works")({ component: How });

function How() {
  return (
    <article className="mx-auto max-w-2xl space-y-8">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">{t("GUIDE")}</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">{t("HOW_QUAY_WORKS")}</h1>
      </header>
      <section className="space-y-3">
        <h2 className="font-display text-2xl">{t("FOR_TRAVELERS")}</h2>
        <p className="leading-relaxed text-muted">{t("FOR_TRAVELERS")} — {t("BRIEF_DESC")}</p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-2xl">{t("FOR_AGENCIES")}</h2>
        <p className="leading-relaxed text-muted">{t("BIDS_DESC")}</p>
      </section>
      <section className="space-y-3">
        <h2 className="font-display text-2xl">{t("ACCOUNTS")}</h2>
        <p className="leading-relaxed text-muted">{t("SIGN_IN")} {t("OR_EMAIL")}. {t("PROFILE_DESC")}</p>
      </section>
      <Button asChild>
        <Link to="/login">{t("SIGN_IN")}</Link>
      </Button>
    </article>
  );
}
