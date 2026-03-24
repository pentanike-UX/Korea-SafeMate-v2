import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { mockContentPosts, mockFeaturedGuardians, mockTravelerReviews, mockTravelerReviewQuotes } from "@/data/mock";
import { listLaunchReadyGuardians, type PublicGuardian } from "@/lib/guardian-public";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrustBadgesServer } from "@/components/forty-two/trust-badges-server";
import { HomeHeroCarousel } from "@/components/home/home-hero-carousel";
import { HomeQuickStartExplorer } from "@/components/home/home-quick-start-explorer";
import { ChevronRight, Star } from "lucide-react";
import { guardianTierBadgeVariant } from "@/lib/guardian-tier-ui";
import type { GuardianTier } from "@/types/domain";

function orderedLaunchGuardians(): PublicGuardian[] {
  const launch = listLaunchReadyGuardians();
  const featuredOrder = mockFeaturedGuardians.filter((f) => f.active).map((f) => f.guardian_user_id);
  const picked = featuredOrder
    .map((id) => launch.find((g) => g.user_id === id))
    .filter(Boolean) as PublicGuardian[];
  const rest = launch.filter((g) => !featuredOrder.includes(g.user_id));
  return [...picked, ...rest];
}

export async function HomeFortyTwoPage() {
  const t = await getTranslations("Home");
  const tTier = await getTranslations("GuardianTier");
  const tG = await getTranslations("GuardiansDiscover");
  const locale = await getLocale();
  const isKo = locale === "ko";

  function tierLabel(tier: GuardianTier) {
    return tTier(tier);
  }

  function pos(g: PublicGuardian) {
    return isKo ? g.positioning.ko : g.positioning.en;
  }

  const seoulPosts = mockContentPosts
    .filter((p) => p.status === "approved" && p.region_slug === "seoul")
    .sort((a, b) => b.popular_score - a.popular_score)
    .slice(0, 6);

  const guardians = orderedLaunchGuardians();
  const reviews = mockTravelerReviews.slice(0, 3);

  return (
    <div className="bg-[var(--bg-page)]">
      <HomeHeroCarousel />

      <HomeQuickStartExplorer />

      {/* Recommended guardians */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-text-strong text-2xl font-semibold tracking-tight sm:text-3xl">{t("featuredGuardiansSectionTitle")}</h2>
              <p className="text-muted-foreground mt-2 text-sm">{t("featuredGuardiansSectionLead")}</p>
            </div>
            <Button asChild variant="ghost" className="text-primary font-semibold">
              <Link href="/guardians">
                {t("featuredGuardiansCta")}
                <ChevronRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {guardians.slice(0, 6).map((g) => (
              <Card
                key={g.user_id}
                className="border-border/70 flex h-full flex-col overflow-hidden rounded-2xl py-0 shadow-[var(--shadow-sm)] transition-all hover:shadow-[var(--shadow-md)]"
              >
                <div className="relative aspect-[16/10]">
                  <Image src={g.photo_url} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
                </div>
                <CardContent className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-foreground font-semibold">{g.display_name}</p>
                      <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">{pos(g)}</p>
                    </div>
                    <Badge variant={guardianTierBadgeVariant(g.guardian_tier)} className="shrink-0 text-[10px]">
                      {tierLabel(g.guardian_tier)}
                    </Badge>
                  </div>
                  <TrustBadgesServer ids={g.trust_badge_ids} size="xs" />
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {g.expertise_tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-primary/8 text-primary rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {g.avg_traveler_rating != null ? (
                    <p className="text-muted-foreground flex items-center gap-1 text-xs font-medium">
                      <Star className="size-3.5 fill-amber-400 text-amber-400" aria-hidden />
                      {g.avg_traveler_rating.toFixed(1)} · {g.review_count_display}+ reviews
                    </p>
                  ) : null}
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button asChild className="flex-1 rounded-xl">
                      <Link href={`/guardians/${g.user_id}`}>{tG("cardCtaPrimary")}</Link>
                    </Button>
                    <Button asChild variant="outline" className="flex-1 rounded-xl">
                      <Link href={`/book?guardian=${g.user_id}`}>{tG("cardCtaSecondary")}</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended posts */}
      <section className="bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <h2 className="text-text-strong text-2xl font-semibold tracking-tight sm:text-3xl">{t("postsSectionTitle")}</h2>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{t("postsSectionLead")}</p>
            </div>
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/posts">{t("postsCta")}</Link>
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {seoulPosts.map((p) => (
              <Link
                key={p.id}
                href={`/posts/${p.id}`}
                className="border-border/70 bg-card group rounded-2xl border p-5 shadow-[var(--shadow-sm)] transition-all hover:-translate-y-0.5 hover:border-primary/20"
              >
                <p className="text-primary text-[10px] font-bold tracking-widest uppercase">{p.tags.slice(0, 2).join(" · ")}</p>
                <h3 className="text-foreground mt-2 font-semibold leading-snug group-hover:text-primary">{p.title}</h3>
                <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">{p.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-border/50 border-y bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-10 max-w-xl">
            <h2 className="text-text-strong text-2xl font-semibold tracking-tight sm:text-3xl">{t("trust42Title")}</h2>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{t("trust42Lead")}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(
              [
                ["trust42CardVerified", "trust42CardVerifiedDesc"],
                ["trust42CardLanguage", "trust42CardLanguageDesc"],
                ["trust42CardReviews", "trust42CardReviewsDesc"],
                ["trust42CardFast", "trust42CardFastDesc"],
              ] as const
            ).map(([title, body]) => (
              <Card key={title} className="border-border/60 rounded-2xl border bg-[var(--bg-surface-subtle)] shadow-none">
                <CardContent className="p-5">
                  <h3 className="text-foreground font-semibold">{t(title)}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{t(body)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-gradient-to-b from-[var(--brand-primary-soft)]/40 to-transparent">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-10 max-w-xl">
            <h2 className="text-text-strong text-2xl font-semibold tracking-tight sm:text-3xl">{t("reviewsSectionTitle")}</h2>
            <p className="text-muted-foreground mt-2 text-sm">{t("reviewsSectionLead")}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {reviews.map((r) => {
              const q = mockTravelerReviewQuotes[r.id];
              const text = q ? (isKo ? q.ko : q.en) : r.comment ?? "";
              return (
                <Card key={r.id} className="border-border/60 rounded-2xl border bg-white/90">
                  <CardContent className="flex flex-col gap-3 p-6">
                    <div className="flex items-center gap-1 text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={i < r.rating ? "size-4 fill-current" : "size-4"} aria-hidden />
                      ))}
                    </div>
                    <p className="text-foreground text-sm leading-relaxed">&ldquo;{text}&rdquo;</p>
                    <p className="text-muted-foreground text-xs font-medium">42 Guardians traveler</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-text-strong text-2xl font-semibold tracking-tight sm:text-3xl">{t("aboutSectionTitle")}</h2>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed sm:text-base">{t("aboutSectionLead")}</p>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{t("aboutSectionBody")}</p>
            <Button asChild className="mt-8 rounded-xl">
              <Link href="/about">{isKo ? "자세히 보기" : "Learn more"}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Coming soon cities */}
      <section id="coming-cities" className="bg-muted/25 scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <h2 className="text-text-strong text-xl font-semibold">{t("comingSectionTitle")}</h2>
          <p className="text-muted-foreground mt-2 max-w-xl text-sm">{t("comingSectionLead")}</p>
        </div>
      </section>

      {/* Traveler + Guardian CTA */}
      <section className="mx-auto max-w-6xl px-4 py-14 pb-20 sm:px-6 sm:py-18 sm:pb-24">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="border-border/60 from-card to-muted/15 flex flex-col rounded-[1.75rem] border bg-gradient-to-br p-8 shadow-[var(--shadow-sm)] sm:p-10">
            <h2 className="text-text-strong text-xl font-semibold tracking-tight text-balance sm:text-2xl">{t("dualCtaTravelerTitle")}</h2>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{t("dualCtaTravelerLead")}</p>
            <div className="mt-8 flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" className="rounded-2xl px-8 shadow-[var(--shadow-brand)]">
                <Link href="/guardians">{t("dualCtaTravelerPrimary")}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-2xl border-2 bg-white/90">
                <Link href="/explore">{t("dualCtaTravelerSecondary")}</Link>
              </Button>
            </div>
          </div>
          <div className="bg-cta-brand text-primary-foreground flex flex-col rounded-[1.75rem] p-8 sm:p-10">
            <h2 className="text-xl font-semibold tracking-tight text-balance sm:text-2xl">{t("dualCtaGuardianTitle")}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/90">{t("dualCtaGuardianLead")}</p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="rounded-2xl border border-white/35 bg-white font-semibold text-[var(--brand-primary)]"
              >
                <Link href="/guardians/apply">{t("dualCtaGuardianButton")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
