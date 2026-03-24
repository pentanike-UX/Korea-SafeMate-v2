"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function GuardianStickyCta({ requestHref }: { requestHref: string }) {
  const t = useTranslations("GuardianDetail");
  return (
    <div className="border-border/80 bg-background/95 supports-[backdrop-filter]:bg-background/80 fixed inset-x-0 bottom-0 z-40 border-t p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <Button asChild className="h-12 w-full rounded-2xl text-base font-semibold shadow-[var(--shadow-brand)]">
        <Link href={requestHref}>{t("ctaPrimary")}</Link>
      </Button>
    </div>
  );
}
