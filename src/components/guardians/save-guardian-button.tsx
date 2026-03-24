"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";

export function SaveGuardianButton({ guardianUserId }: { guardianUserId: string }) {
  const t = useTranslations("GuardiansDiscover");
  const [loading, setLoading] = useState(false);
  const [hint, setHint] = useState<string | null>(null);

  async function toggle() {
    setLoading(true);
    setHint(null);
    try {
      const res = await fetch("/api/traveler/saved-guardians", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guardian_user_id: guardianUserId, action: "toggle" }),
      });
      const data = (await res.json()) as { ids?: string[]; saved?: boolean; error?: string };
      if (!res.ok) {
        setHint(data.error ?? t("saveError"));
        return;
      }
      setHint(data.saved ? t("saveAdded") : t("saveRemoved"));
    } catch {
      setHint(t("saveError"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <Button
        type="button"
        variant="secondary"
        className="rounded-xl"
        disabled={loading}
        onClick={() => void toggle()}
      >
        {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Heart className="size-4" aria-hidden />}
        <span className="ml-1.5">{t("cardSave")}</span>
      </Button>
      <Link
        href="/traveler/saved-guardians"
        className="text-primary text-center text-[11px] font-semibold underline-offset-2 hover:underline"
      >
        {t("saveViewList")}
      </Link>
      {hint ? <p className="text-muted-foreground text-center text-[11px] leading-snug">{hint}</p> : null}
    </div>
  );
}
