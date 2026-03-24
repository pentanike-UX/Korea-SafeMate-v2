"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { mockContentPosts } from "@/data/mock";
import { isActiveLaunchArea, listPublicGuardians, type PublicGuardian } from "@/lib/guardian-public";
import type { LaunchAreaSlug } from "@/types/launch-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TrustBadgeRow } from "@/components/forty-two/trust-badges";
import { guardianTierBadgeVariant } from "@/lib/guardian-tier-ui";
import { SaveGuardianButton } from "@/components/guardians/save-guardian-button";
import { cn } from "@/lib/utils";
import { MapPin, SlidersHorizontal, Star } from "lucide-react";

type SortMode = "recommended" | "rating" | "reviews" | "fast";

const LANGS = ["en", "ko", "ja", "es"] as const;
const THEMES = ["k_drama_romance", "k_pop_day", "seoul_night", "movie_location", "safe_solo", "photo_route"] as const;
const STYLES = ["calm", "planner", "energetic", "trendy", "friendly", "flexible"] as const;

function repPostFor(g: PublicGuardian) {
  const id = g.representative_post_ids[0];
  if (!id) return null;
  return mockContentPosts.find((p) => p.id === id) ?? null;
}

export function GuardiansDiscoverClient() {
  const t = useTranslations("GuardiansDiscover");
  const tLaunch = useTranslations("LaunchAreas");
  const tThemes = useTranslations("ExperienceThemes");
  const tStyles = useTranslations("CompanionStyles");
  const tTier = useTranslations("GuardianTier");
  const locale = useLocale();
  const isKo = locale === "ko";

  const [region, setRegion] = useState<LaunchAreaSlug | "all" | "">("");
  const [language, setLanguage] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [style, setStyle] = useState<string>("");
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sort, setSort] = useState<SortMode>("recommended");
  const [showFilters, setShowFilters] = useState(false);

  const all = listPublicGuardians();

  const filtered = useMemo(() => {
    let g = [...all];
    if (region && region !== "all") {
      g = g.filter((x) => x.launch_area_slug === region);
    } else if (region !== "all") {
      g = g.filter((x) => isActiveLaunchArea(x.launch_area_slug));
    }
    if (language) {
      g = g.filter((x) => x.languages.some((l) => l.language_code === language));
    }
    if (theme) {
      g = g.filter((x) => x.theme_slugs.includes(theme));
    }
    if (style) {
      g = g.filter((x) => x.companion_style_slugs.includes(style));
    }
    if (minRating > 0) {
      g = g.filter((x) => (x.avg_traveler_rating ?? 0) >= minRating);
    }
    if (verifiedOnly) {
      g = g.filter((x) => x.guardian_tier === "verified_guardian");
    }
    if (sort === "rating") {
      g.sort((a, b) => (b.avg_traveler_rating ?? 0) - (a.avg_traveler_rating ?? 0));
    } else if (sort === "reviews") {
      g.sort((a, b) => b.review_count_display - a.review_count_display);
    } else if (sort === "fast") {
      g.sort((a, b) => {
        const af = a.trust_badge_ids.includes("fast_response");
        const bf = b.trust_badge_ids.includes("fast_response");
        if (af !== bf) return af ? -1 : 1;
        return (b.avg_traveler_rating ?? 0) - (a.avg_traveler_rating ?? 0);
      });
    } else {
      g.sort((a, b) => {
        const vf = (x: PublicGuardian) => (x.matching_enabled ? 2 : 0) + (x.featured ? 1 : 0);
        return vf(b) - vf(a) || (b.avg_traveler_rating ?? 0) - (a.avg_traveler_rating ?? 0);
      });
    }
    return g;
  }, [all, region, language, theme, style, minRating, verifiedOnly, sort]);

  function pos(g: PublicGuardian) {
    return isKo ? g.positioning.ko : g.positioning.en;
  }

  function clearFilters() {
    setRegion("");
    setLanguage("");
    setTheme("");
    setStyle("");
    setMinRating(0);
    setVerifiedOnly(false);
    setSort("recommended");
  }

  return (
    <div className="bg-[var(--bg-page)]">
      <section className="relative overflow-hidden border-b border-border/60 bg-white">
        <div className="absolute inset-0 bg-hero-42 opacity-90" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18">
          <h1 className="text-text-strong max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {t("heroTitle")}
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">{t("heroBody")}</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="text-muted-foreground size-4" aria-hidden />
            <h2 className="text-lg font-semibold">{t("filterTitle")}</h2>
          </div>
          <Button type="button" variant="outline" size="sm" className="md:hidden" onClick={() => setShowFilters((v) => !v)}>
            {t("filterTitle")}
          </Button>
        </div>

        <div
          className={cn(
            "border-border/60 bg-card mb-8 space-y-4 rounded-2xl border p-4 shadow-[var(--shadow-sm)]",
            !showFilters && "hidden md:block",
          )}
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-muted-foreground mb-2 text-xs font-semibold uppercase tracking-wide">{t("filterRegion")}</p>
              <div className="flex flex-wrap gap-1.5">
                <Button
                  type="button"
                  size="sm"
                  variant={region === "" ? "default" : "outline"}
                  className="rounded-full text-xs"
                  onClick={() => setRegion("")}
                >
                  {t("filterLaunchAreas")}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={region === "all" ? "default" : "outline"}
                  className="rounded-full text-xs"
                  onClick={() => setRegion("all")}
                >
                  {t("all")}
                </Button>
                {(["gwanghwamun", "gangnam", "busan", "jeju"] as const).map((slug) => (
                  <Button
                    key={slug}
                    type="button"
                    size="sm"
                    variant={region === slug ? "default" : "outline"}
                    className="rounded-full text-xs"
                    onClick={() => setRegion(slug)}
                  >
                    {(tLaunch.raw(slug) as { name: string }).name}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-muted-foreground mb-2 text-xs font-semibold uppercase tracking-wide">{t("filterLanguage")}</p>
              <div className="flex flex-wrap gap-1.5">
                <Button
                  type="button"
                  size="sm"
                  variant={language === "" ? "default" : "outline"}
                  className="rounded-full text-xs"
                  onClick={() => setLanguage("")}
                >
                  {t("all")}
                </Button>
                {LANGS.map((code) => (
                  <Button
                    key={code}
                    type="button"
                    size="sm"
                    variant={language === code ? "default" : "outline"}
                    className="rounded-full text-xs uppercase"
                    onClick={() => setLanguage(code)}
                  >
                    {code}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-muted-foreground mb-2 text-xs font-semibold uppercase tracking-wide">{t("sort")}</p>
              <div className="flex flex-wrap gap-1.5">
                {(["recommended", "rating", "reviews", "fast"] as const).map((m) => (
                  <Button
                    key={m}
                    type="button"
                    size="sm"
                    variant={sort === m ? "default" : "outline"}
                    className="rounded-full text-xs"
                    onClick={() => setSort(m)}
                  >
                    {m === "recommended"
                      ? t("sortRecommended")
                      : m === "rating"
                        ? t("sortRating")
                        : m === "reviews"
                          ? t("sortReviews")
                          : t("sortFast")}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-muted-foreground mb-2 text-xs font-semibold uppercase tracking-wide">{t("filterTheme")}</p>
              <div className="flex flex-wrap gap-1.5">
                <Button
                  type="button"
                  size="sm"
                  variant={theme === "" ? "default" : "outline"}
                  className="rounded-full text-xs"
                  onClick={() => setTheme("")}
                >
                  {t("all")}
                </Button>
                {THEMES.map((slug) => (
                  <Button
                    key={slug}
                    type="button"
                    size="sm"
                    variant={theme === slug ? "default" : "outline"}
                    className="rounded-full text-xs"
                    onClick={() => setTheme(slug)}
                  >
                    {(tThemes.raw(slug) as { title: string }).title}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-muted-foreground mb-2 text-xs font-semibold uppercase tracking-wide">{t("filterStyle")}</p>
              <div className="flex flex-wrap gap-1.5">
                <Button
                  type="button"
                  size="sm"
                  variant={style === "" ? "default" : "outline"}
                  className="rounded-full text-xs"
                  onClick={() => setStyle("")}
                >
                  {t("all")}
                </Button>
                {STYLES.map((slug) => (
                  <Button
                    key={slug}
                    type="button"
                    size="sm"
                    variant={style === slug ? "default" : "outline"}
                    className="rounded-full text-xs"
                    onClick={() => setStyle(slug)}
                  >
                    {tStyles(slug)}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-muted-foreground mb-2 text-xs font-semibold uppercase tracking-wide">{t("filterRating")}</p>
              <div className="flex flex-wrap gap-1.5">
                {[0, 4, 4.5].map((r) => (
                  <Button
                    key={r}
                    type="button"
                    size="sm"
                    variant={minRating === r ? "default" : "outline"}
                    className="rounded-full text-xs"
                    onClick={() => setMinRating(r)}
                  >
                    {r === 0 ? t("all") : `${r}+`}
                  </Button>
                ))}
              </div>
              <label className="text-muted-foreground mt-3 flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="accent-primary size-4 rounded border-border"
                />
                {t("filterVerified")}
              </label>
            </div>
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={clearFilters}>
            {t("clear")}
          </Button>
        </div>

        {filtered.length === 0 ? (
          <div className="border-border/60 mx-auto max-w-lg rounded-2xl border border-dashed bg-muted/10 px-6 py-16 text-center">
            <p className="text-foreground text-sm font-semibold">{t("empty")}</p>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{t("emptyBody")}</p>
          </div>
        ) : (
          <ul className="grid gap-6 lg:grid-cols-2">
            {filtered.map((g) => {
              const rep = repPostFor(g);
              const areaName = (tLaunch.raw(g.launch_area_slug) as { name: string }).name;
              return (
                <li key={g.user_id}>
                  <Card className="border-border/70 h-full overflow-hidden rounded-2xl py-0 shadow-[var(--shadow-sm)] transition-all hover:shadow-[var(--shadow-md)]">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative aspect-[5/4] w-full sm:aspect-auto sm:h-auto sm:w-[42%] sm:min-h-[220px]">
                        <Image src={g.photo_url} alt="" fill className="object-cover" sizes="(max-width:640px) 100vw, 40vw" />
                      </div>
                      <CardContent className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <p className="text-foreground text-lg font-semibold">{g.display_name}</p>
                            <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">{pos(g)}</p>
                          </div>
                          <Badge variant={guardianTierBadgeVariant(g.guardian_tier)} className="shrink-0">
                            {tTier(g.guardian_tier)}
                          </Badge>
                        </div>
                        <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs">
                          <MapPin className="size-3.5 shrink-0" aria-hidden />
                          <span>{areaName}</span>
                          <span aria-hidden>·</span>
                          <span>
                            {g.languages.map((l) => l.language_code.toUpperCase()).join(" · ")}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {g.expertise_tags.slice(0, 5).map((tag) => (
                            <span
                              key={tag}
                              className="bg-primary/8 text-primary rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <TrustBadgeRow ids={g.trust_badge_ids} size="xs" />
                        {g.avg_traveler_rating != null ? (
                          <p className="flex items-center gap-1 text-sm font-medium">
                            <Star className="size-4 fill-amber-400 text-amber-400" aria-hidden />
                            {g.avg_traveler_rating.toFixed(1)}
                            <span className="text-muted-foreground font-normal">
                              ({g.review_count_display} {t("reviewsWord")})
                            </span>
                          </p>
                        ) : null}
                        <p className="text-muted-foreground text-[11px] font-semibold tracking-wide uppercase">{t("tripTypes")}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {g.trip_type_labels.map((trip, i) => (
                            <Badge key={i} variant="outline" className="font-normal">
                              {isKo ? trip.ko : trip.en}
                            </Badge>
                          ))}
                        </div>
                        {rep ? (
                          <div className="border-border/60 bg-muted/20 rounded-xl border p-3">
                            <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">{t("repPost")}</p>
                            <p className="text-foreground mt-1 line-clamp-2 text-sm font-medium leading-snug">{rep.title}</p>
                            <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">{rep.summary}</p>
                          </div>
                        ) : null}
                        <div className="mt-auto grid gap-2 pt-2 sm:grid-cols-3">
                          <Button asChild className="rounded-xl sm:col-span-1">
                            <Link href={`/guardians/${g.user_id}`}>{t("cardCtaPrimary")}</Link>
                          </Button>
                          <div className="sm:col-span-1">
                            <SaveGuardianButton guardianUserId={g.user_id} />
                          </div>
                          <Button asChild variant="outline" className="rounded-xl sm:col-span-1">
                            <Link href={`/book?guardian=${g.user_id}`}>{t("cardCtaSecondary")}</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>
        )}

        <section className="border-border/60 from-card to-muted/20 mt-16 rounded-[1.75rem] border bg-gradient-to-br p-8 sm:p-10">
          <h2 className="text-text-strong text-xl font-semibold tracking-tight">{t("footerCtaTitle")}</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-relaxed">{t("footerCtaBody")}</p>
          <Button asChild className="mt-6 rounded-2xl">
            <Link href="/guardians/apply">{t("footerCtaButton")}</Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
