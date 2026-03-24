import { getTranslations } from "next-intl/server";
import NextLink from "next/link";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/constants";

export async function generateMetadata() {
  const t = await getTranslations("LoginGuardian");
  return {
    title: `${t("title")} | ${BRAND.name}`,
  };
}

export default async function GuardianLoginPage() {
  const t = await getTranslations("LoginGuardian");
  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-text-strong text-2xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{t("description")}</p>
      <div className="mt-8 flex flex-col gap-3">
        <Button disabled className="rounded-xl" variant="secondary">
          {t("title")} — soon
        </Button>
        <Button asChild variant="outline" className="rounded-xl">
          <Link href="/login">{t("travelerLogin")}</Link>
        </Button>
        <Button asChild className="rounded-xl">
          <NextLink href="/guardian/onboarding">{t("startOnboarding")}</NextLink>
        </Button>
        <Button asChild variant="ghost" className="rounded-xl">
          <NextLink href="/guardian/dashboard">{t("dashboardPreview")}</NextLink>
        </Button>
      </div>
    </div>
  );
}
