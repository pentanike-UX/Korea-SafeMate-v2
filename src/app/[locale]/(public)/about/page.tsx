import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/constants";

export async function generateMetadata() {
  const t = await getTranslations("AboutPage");
  return {
    title: `${t("metaTitle")} | ${BRAND.name}`,
    description: t("metaDescription"),
  };
}

export default async function AboutPage() {
  const t = await getTranslations("AboutPage");
  return (
    <div className="bg-[var(--bg-page)]">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-primary text-[11px] font-semibold tracking-[0.2em] uppercase">{BRAND.name}</p>
        <h1 className="text-text-strong mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{t("title")}</h1>
        <p className="text-muted-foreground mt-6 text-lg leading-relaxed">{t("lead")}</p>
        <p className="text-muted-foreground mt-6 text-sm leading-relaxed sm:text-base">{t("body")}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg" className="rounded-2xl">
            <Link href="/explore">{t("ctaExplore")}</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-2xl">
            <Link href="/guardians">{t("ctaGuardians")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
