import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { ContentPost } from "@/types/domain";
import { getPublicGuardianById } from "@/lib/guardian-public";
import { relatedPostsFor } from "@/lib/posts-public";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TrustBadgesServer } from "@/components/forty-two/trust-badges-server";
import { ArrowLeft, Calendar, Heart, MapPin } from "lucide-react";
import { guardianTierBadgeVariant } from "@/lib/guardian-tier-ui";

function heroGradient(post: ContentPost) {
  const hue = post.title.length * 17 + post.kind.length * 40;
  return `linear-gradient(145deg, hsl(${hue % 360} 45% 92%) 0%, hsl(${(hue + 50) % 360} 40% 85%) 50%, #fff 100%)`;
}

export async function PostDetailView({ post }: { post: ContentPost }) {
  const t = await getTranslations("Posts");
  const tTier = await getTranslations("GuardianTier");
  const related = relatedPostsFor(post, 4);
  const guardian = getPublicGuardianById(post.author_user_id);

  const date = new Date(post.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="bg-[var(--bg-page)] pb-16">
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2 gap-1 text-muted-foreground">
          <Link href="/posts">
            <ArrowLeft className="size-4" />
            {t("backToList")}
          </Link>
        </Button>
      </div>

      <header className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="border-border/60 relative overflow-hidden rounded-[1.75rem] border shadow-[var(--shadow-md)]"
          style={{ background: heroGradient(post) }}
        >
          <div className="relative aspect-[21/10] max-h-[320px] min-h-[200px] sm:aspect-[3/1]">
            <Image
              src="https://images.unsplash.com/photo-1538485399081-7191377e8241?w=1200&q=80"
              alt=""
              fill
              className="object-cover opacity-35 mix-blend-multiply"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent" />
            <div className="absolute right-0 bottom-0 left-0 space-y-3 p-6 sm:p-10">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="rounded-full font-medium">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-text-strong max-w-4xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                {post.title}
              </h1>
              <p className="text-muted-foreground max-w-2xl text-base leading-relaxed sm:text-lg">{post.summary}</p>
              <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="size-4" aria-hidden />
                  {date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-4" aria-hidden />
                  <span className="capitalize">{t(`region.${post.region_slug}` as "region.seoul")}</span>
                </span>
                {post.helpful_rating != null ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Heart className="size-4 fill-rose-400/90 text-rose-400/90" aria-hidden />
                    {t("helpfulShort", { rating: post.helpful_rating.toFixed(1) })}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-12">
        <div className="max-w-none lg:col-span-8">
          <div className="text-foreground space-y-4 text-[15px] leading-relaxed sm:text-base">
            {post.body.split("\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        <aside className="space-y-6 lg:col-span-4">
          <Card className="border-border/60 overflow-hidden rounded-2xl py-0 shadow-[var(--shadow-sm)]">
            <div className="relative aspect-[16/10]">
              {guardian ? (
                <Image src={guardian.photo_url} alt="" fill className="object-cover" sizes="400px" />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-[var(--brand-primary-soft)] to-[var(--brand-trust-blue-soft)] text-2xl font-bold text-primary/40">
                  42
                </div>
              )}
            </div>
            <CardContent className="space-y-3 p-5">
              <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">{t("authorCardEyebrow")}</p>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-lg font-semibold">{post.author_display_name}</p>
                {guardian ? (
                  <Badge variant={guardianTierBadgeVariant(guardian.guardian_tier)} className="text-[10px]">
                    {tTier(guardian.guardian_tier)}
                  </Badge>
                ) : null}
              </div>
              {guardian ? (
                <>
                  <p className="text-muted-foreground text-sm leading-relaxed">{guardian.headline}</p>
                  <TrustBadgesServer ids={guardian.trust_badge_ids} size="xs" />
                  <Button asChild className="w-full rounded-xl">
                    <Link href={`/guardians/${guardian.user_id}`}>{t("viewGuardian")}</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full rounded-xl">
                    <Link href={`/book?guardian=${guardian.user_id}`}>{t("requestWithGuardian")}</Link>
                  </Button>
                </>
              ) : (
                <p className="text-muted-foreground text-sm">{t("authorFallback")}</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/60 rounded-2xl border bg-white/90 shadow-none">
            <CardContent className="space-y-2 p-5">
              <p className="text-sm font-semibold">{t("trustNoteTitle")}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{t("trustNoteBody")}</p>
            </CardContent>
          </Card>
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="border-border/50 border-t bg-white/80">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <h2 className="text-text-strong text-xl font-semibold">{t("relatedTitle")}</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/posts/${r.id}`}
                    className="border-border/70 bg-card block h-full rounded-2xl border p-4 shadow-[var(--shadow-sm)] transition-colors hover:border-primary/25"
                  >
                    <p className="line-clamp-2 font-semibold leading-snug">{r.title}</p>
                    <p className="text-muted-foreground mt-2 line-clamp-2 text-xs">{r.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </article>
  );
}
