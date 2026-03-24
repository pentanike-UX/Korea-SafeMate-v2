import { getTranslations } from "next-intl/server";
import { GuardiansDiscoverClient } from "@/components/guardians/guardians-discover-client";
import { BRAND } from "@/lib/constants";

export async function generateMetadata() {
  const t = await getTranslations("GuardiansDiscover");
  return {
    title: `${t("metaTitle")} | ${BRAND.name}`,
    description: t("metaDescription"),
  };
}

export default function GuardiansPage() {
  return <GuardiansDiscoverClient />;
}
