import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  mockContentCategories,
  mockContentPosts,
  mockFeaturedGuardians,
  mockGuardians,
  mockRegions,
} from "@/data/mock";
import { SERVICE_COPY } from "@/lib/constants";
import { TrustBoundaryCard } from "@/components/trust/trust-boundary-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { guardianTierBadgeVariant } from "@/lib/guardian-tier-ui";
import type { GuardianTier } from "@/types/domain";
import {
  ArrowRight,
  CalendarCheck,
  ChevronRight,
  Compass,
  Layers,
  LogIn,
  MapPin,
  Plane,
  Sparkles,
  Star,
  Sun,
  UserPlus,
} from "lucide-react";

const icons = {
  arrival: Plane,
  k_route: MapPin,
  first_24h: Sun,
} as const;

type ServiceCode = keyof typeof SERVICE_COPY;

function regionGradient(slug: string) {
  const h = slug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const hue = 270 + (h % 40);
  return `linear-gradient(135deg, hsl(${hue} 75% 42%) 0%, hsl(${(hue + 35) % 360} 70% 48%) 100%)`;
}

export async function HomePageContent() {
  const t = await getTranslations("Home");
  const tSvc = await getTranslations("Services");
  const tExp = await getTranslations("Explore");
  const tTier = await getTranslations("GuardianTier");
  const locale = await getLocale();

  const categoryChipMap = t.raw("categoryChip") as Record<string, string> | undefined;
  const regionCopy = t.raw("region") as Record<string, { name: string; desc: string }> | undefined;

  function categoryLabel(slug: string, fallback: string) {
    return categoryChipMap?.[slug] ?? fallback;
  }

  function regionTitle(slug: string, fallback: string) {
    return regionCopy?.[slug]?.name ?? fallback;
  }

  function regionDesc(slug: string, fallback: string) {
    return regionCopy?.[slug]?.desc ?? fallback;
  }

  function tierLabel(tier: GuardianTier) {
    return tTier(tier);
  }

  function spotlightHeadline(userId: string, fallback: string) {
    if (userId === "g1") return t("spotlightHeadlineG1");
    if (userId === "g2") return t("spotlightHeadlineG2");
    return fallback;
  }

  const approvedPosts = mockContentPosts.filter((p) => p.status === "approved");

  const regionsSorted = [...mockRegions].sort((a, b) => {
    if (a.phase !== b.phase) return a.phase - b.phase;
    return a.name.localeCompare(b.name);
  });
  const heroRegions = regionsSorted.slice(0, 3);

  const verifiedCount = mockGuardians.filter((g) => g.guardian_tier === "verified_guardian").length;
  const ratings = mockGuardians.filter((g) => g.avg_traveler_rating != null).map((g) => g.avg_traveler_rating!);
  const avgRating =
    ratings.length > 0 ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : "—";
  const langCodes = new Set<string>();
  mockGuardians.forEach((g) => g.languages.forEach((l) => langCodes.add(l.language_code.toUpperCase())));
  const languagesLine = Array.from(langCodes).sort().join(" · ");

  const nf = (n: number) =>
    new Intl.NumberFormat(locale === "ko" ? "ko-KR" : locale === "ja" ? "ja-JP" : "en-US").format(n);

  const featuredRows = mockFeaturedGuardians
    .filter((f) => f.active)
    .sort((a, b) => b.priority - a.priority)
    .map((f) => {
      const g = mockGuardians.find((x) => x.user_id === f.guardian_user_id);
      return g ? { f, g } : null;
    })
    .filter(Boolean) as { f: (typeof mockFeaturedGuardians)[0]; g: (typeof mockGuardians)[0] }[];

  const categoryChips = mockContentCategories.slice(0, 6);

  const layers = [
    { titleKey: "layer1Title" as const, bodyKey: "layer1Body" as const },
    { titleKey: "layer2Title" as const, bodyKey: "layer2Body" as const },
    { titleKey: "layer3Title" as const, bodyKey: "layer3Body" as const },
  ];

  const entryItems = [
    { href: "/book" as const, labelKey: "entryBook" as const, Icon: CalendarCheck },
    { href: "/explore" as const, labelKey: "entryExplore" as const, Icon: Compass },
    { href: "/services" as const, labelKey: "entryServices" as const, Icon: Layers },
    { href: "/guardians/apply" as const, labelKey: "entryGuardian" as const, Icon: UserPlus },
    { href: "/login" as const, labelKey: "entryLogin" as const, Icon: LogIn },
  ];

  return (
    <div>
      {/* 1. Emotional hero + product proof (glass UI) */}
      <section className="bg-hero-atmosphere relative isolate overflow-hidden">
        <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-24">
          <div className="text-white lg:col-span-5">
            <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.2em] text-white/55 uppercase">
              <Sparkles className="size-3.5 text-violet-300/90" aria-hidden />
              {t("eyebrow")}
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-[2.35rem] md:leading-[1.15]">
              {t("heroTitle")}
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/72">{t("heroLead")}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                asChild
                size="lg"
                className="rounded-xl border-0 bg-white px-7 font-semibold text-[var(--brand-primary)] shadow-lg hover:bg-white/95"
              >
                <Link href="/book">{t("ctaPrimaryRequest")}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-xl border-2 border-white/35 bg-transparent text-white hover:bg-white/10"
              >
                <Link href="/explore">
                  {t("ctaSecondaryExplore")}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <p className="mt-5">
              <Link href="/guardians/apply" className="text-sm font-medium text-violet-200/95 hover:text-white">
                {t("ctaTertiaryGuardian")}
              </Link>
              <span className="mx-2 text-white/25" aria-hidden>
                ·
              </span>
              <Link href="/services" className="text-sm font-medium text-white/70 hover:text-white">
                {t("viewServicesLink")}
              </Link>
            </p>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-white/45">{t("scopeNote")}</p>
          </div>

          <div className="lg:col-span-7">
            <div className="border-white/15 bg-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.35)] relative overflow-hidden rounded-2xl border p-4 backdrop-blur-xl sm:p-5">
              <p className="text-[10px] font-bold tracking-[0.18em] text-white/45 uppercase">{t("showcaseEyebrow")}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <div className="rounded-xl border border-white/12 bg-white/[0.06] px-2.5 py-2.5">
                  <p className="text-lg font-semibold tabular-nums text-white">{nf(verifiedCount)}</p>
                  <p className="text-[10px] font-medium leading-tight text-white/50">{t("statVerified")}</p>
                </div>
                <div className="rounded-xl border border-white/12 bg-white/[0.06] px-2.5 py-2.5">
                  <p className="text-lg font-semibold tabular-nums text-white">{nf(approvedPosts.length)}</p>
                  <p className="text-[10px] font-medium leading-tight text-white/50">{t("statPosts")}</p>
                </div>
                <div className="rounded-xl border border-white/12 bg-white/[0.06] px-2.5 py-2.5">
                  <p className="flex items-baseline gap-0.5 text-lg font-semibold tabular-nums text-white">
                    {avgRating}
                    {avgRating !== "—" ? <Star className="size-3.5 fill-amber-300/90 text-amber-300/90" aria-hidden /> : null}
                  </p>
                  <p className="text-[10px] font-medium leading-tight text-white/50">{t("statRating")}</p>
                </div>
                <div className="rounded-xl border border-white/12 bg-white/[0.06] px-2.5 py-2.5">
                  <p className="line-clamp-2 text-[11px] font-semibold leading-snug text-white">{languagesLine}</p>
                  <p className="mt-0.5 text-[10px] font-medium text-white/50">{t("statLanguages")}</p>
                </div>
              </div>
              <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-relaxed text-white/55">{t("processClarity")}</p>

              <p className="mt-6 text-[10px] font-bold tracking-[0.18em] text-white/45 uppercase">{t("chipsLabel")}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {categoryChips.map((c) => (
                  <Link
                    key={c.id}
                    href="/explore"
                    className="rounded-full border border-white/15 bg-white/[0.08] px-3 py-1 text-xs font-medium text-white/90 transition-colors hover:border-violet-300/40 hover:bg-white/[0.14]"
                  >
                    {categoryLabel(c.slug, c.name)}
                  </Link>
                ))}
              </div>

              <p className="mt-6 text-[10px] font-bold tracking-[0.18em] text-white/45 uppercase">{t("regionsPreviewLabel")}</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                {heroRegions.map((r) => (
                  <Link
                    key={r.id}
                    href={`/explore/${r.slug}`}
                    className="group border-white/12 hover:border-white/25 rounded-xl border bg-white/[0.05] transition-all"
                  >
                    <div className="h-14 w-full rounded-t-xl opacity-90" style={{ background: regionGradient(r.slug) }} />
                    <div className="flex items-start gap-2 p-2.5">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/20 text-violet-200">
                        <MapPin className="size-4" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold leading-tight text-white">{regionTitle(r.slug, r.name)}</p>
                        <p className="text-[10px] text-white/45">{tExp("phase", { n: r.phase })}</p>
                      </div>
                      <ChevronRight className="ml-auto size-4 shrink-0 text-white/35 transition-colors group-hover:text-white/70" />
                    </div>
                  </Link>
                ))}
              </div>

              <p className="mt-6 text-[10px] font-bold tracking-[0.18em] text-white/45 uppercase">{t("featuredGuardiansLabel")}</p>
              <div className="mt-2 space-y-2">
                {featuredRows.map(({ g }) => (
                  <Link
                    key={g.user_id}
                    href={`/guardians#guardian-${g.user_id}`}
                    className="border-white/10 hover:border-white/22 flex items-center gap-3 rounded-xl border bg-white/[0.04] p-2.5 transition-colors hover:bg-white/[0.07]"
                  >
                    <div
                      className="flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-md"
                      style={{ background: regionGradient(g.user_id) }}
                      aria-hidden
                    >
                      {g.display_name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="truncate text-sm font-semibold text-white">{g.display_name}</span>
                        <Badge variant={guardianTierBadgeVariant(g.guardian_tier)} className="text-[9px]">
                          {tierLabel(g.guardian_tier)}
                        </Badge>
                      </div>
                      <p className="truncate text-xs text-white/60">{spotlightHeadline(g.user_id, g.headline)}</p>
                      {g.avg_traveler_rating != null ? (
                        <p className="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-violet-200/90">
                          <Star className="size-3 fill-current" aria-hidden />
                          {g.avg_traveler_rating.toFixed(1)} · {t("travelerRatingLabel")}
                        </p>
                      ) : null}
                    </div>
                    <ChevronRight className="size-4 shrink-0 text-white/35" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Immediate entry points — web as real product surface */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <p className="text-muted-foreground text-center text-[11px] font-semibold tracking-[0.2em] uppercase">
            {t("entryStripEyebrow")}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
            {entryItems.map(({ href, labelKey, Icon }) => (
              <Link
                key={href}
                href={href}
                className="border-border/80 bg-card hover:border-primary/25 group flex flex-col items-center gap-2 rounded-2xl border p-4 text-center shadow-[var(--shadow-sm)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
              >
                <span className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-xl transition-colors group-hover:bg-primary/15">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="text-foreground text-sm font-semibold">{t(labelKey)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Region exploration — one message, airy */}
      <section className="bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="mb-10 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-lg">
              <p className="text-primary text-[11px] font-semibold tracking-[0.2em] uppercase">{t("regionsSectionEyebrow")}</p>
              <h2 className="text-text-strong mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                {t("regionsSectionTitle")}
              </h2>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{t("regionsSectionLead")}</p>
            </div>
            <Link href="/explore" className="text-primary text-sm font-semibold hover:underline sm:shrink-0">
              {t("regionsSectionCta")}
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {regionsSorted.map((r) => (
              <Link
                key={r.id}
                href={`/explore/${r.slug}`}
                className="border-border/70 bg-card group flex flex-col overflow-hidden rounded-2xl border shadow-[var(--shadow-sm)] transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[var(--shadow-md)]"
              >
                <div className="h-28 w-full" style={{ background: regionGradient(r.slug) }} />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="text-primary size-4 shrink-0" aria-hidden />
                    <span className="text-foreground text-lg font-semibold">{regionTitle(r.slug, r.name)}</span>
                  </div>
                  <p className="text-muted-foreground mt-3 flex-1 text-sm leading-relaxed">{regionDesc(r.slug, r.short_description)}</p>
                  <span className="text-primary mt-5 inline-flex items-center gap-1 text-sm font-semibold group-hover:underline">
                    {tExp("openHub")}
                    <ChevronRight className="size-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Support services — headline + one line each card */}
      <section className="border-y border-border/50 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="mb-12 flex max-w-xl flex-col gap-3 sm:mb-16">
            <h2 className="text-text-strong text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              {t("servicesSectionTitle")}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{t("servicesSectionLead")}</p>
            <Link href="/services" className="text-primary text-sm font-semibold hover:underline">
              {t("servicesOverviewLink")}
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {(Object.keys(SERVICE_COPY) as ServiceCode[]).map((code) => {
              const Icon = icons[code];
              return (
                <Card
                  key={code}
                  className="border-border/70 bg-card flex flex-col shadow-[var(--shadow-sm)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
                >
                  <CardHeader className="pb-3">
                    <div className="text-primary mb-3 flex size-11 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="text-lg">{tSvc(`cards.${code}.title`)}</CardTitle>
                    <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                      {tSvc(`cards.${code}.shortDescription`)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto pt-0">
                    <Button asChild variant="link" className="h-auto px-0 font-semibold">
                      <Link href="/book">{t("startBooking")}</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Trust + why it works */}
      <section className="from-[var(--brand-trust-blue-soft)]/35 bg-gradient-to-b via-background to-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="mb-8 max-w-xl sm:mb-10">
            <h2 className="text-text-strong text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{t("trustBandTitle")}</h2>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{t("trustBandLead")}</p>
          </div>
          <TrustBoundaryCard />

          <div className="border-border/60 mt-16 border-t pt-14 sm:mt-20 sm:pt-16">
            <div className="mb-8 max-w-xl sm:mb-10">
              <h3 className="text-text-strong text-xl font-semibold tracking-tight">{t("howItWorksTitle")}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{t("howItWorksLead")}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {layers.map((layer) => (
                <Card key={layer.titleKey} className="border-border/70 bg-card/90 shadow-[var(--shadow-sm)]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold">{t(layer.titleKey)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">{t(layer.bodyKey)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="bg-cta-brand text-primary-foreground flex flex-col items-start justify-between gap-8 rounded-2xl p-8 sm:flex-row sm:items-center sm:gap-10 sm:p-11 md:p-12">
          <div className="max-w-md">
            <h2 className="text-xl font-semibold tracking-tight text-balance sm:text-2xl">{t("ctaTitle")}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/88">{t("ctaLead")}</p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="rounded-xl border border-white/35 bg-white font-semibold text-[var(--brand-primary)] shadow-md hover:bg-white/95"
            >
              <Link href="/book">{t("ctaPrimaryRequest")}</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="rounded-xl font-semibold text-white hover:bg-white/15">
              <Link href="/explore">{t("ctaSecondaryExplore")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
