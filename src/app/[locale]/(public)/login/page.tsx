import NextLink from "next/link";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BRAND } from "@/lib/constants";

export async function generateMetadata() {
  const t = await getTranslations("Login");
  return {
    title: `${t("metaTitle")} | ${BRAND.name}`,
  };
}

export default async function LoginPage() {
  const t = await getTranslations("Login");

  return (
    <div className="mx-auto flex max-w-md flex-1 flex-col justify-center px-4 py-16 sm:px-6">
      <Card className="border-primary/10 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">{t("title")}</CardTitle>
          <CardDescription>
            {/* TODO(prod): Implement Supabase Auth — email magic link, OAuth, or phone per market rules. */}
            {t("description")}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button disabled className="rounded-xl">
            {t("continueEmail")}
          </Button>
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/explore">{t("browseExplore")}</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/book">{t("continueBooking")}</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/login/guardian">{t("guardianLoginLink")}</Link>
          </Button>
          <Button asChild variant="ghost" className="rounded-xl">
            <NextLink href="/guardian/dashboard">{t("previewGuardian")}</NextLink>
          </Button>
          <Button asChild variant="ghost" className="rounded-xl">
            <NextLink href="/admin">{t("previewAdmin")}</NextLink>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
