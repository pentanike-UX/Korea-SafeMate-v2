import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { ContentPost } from "@/types/domain";
import { relatedPostsFor } from "@/lib/posts-public";
import { Button } from "@/components/ui/button";
import { PostAuthorAside } from "@/components/posts/post-author-aside";
import { RoutePostDetailClient } from "@/components/route-posts/route-post-detail-client";
import { ArrowLeft } from "lucide-react";

export async function RoutePostDetailView({ post }: { post: ContentPost }) {
  const t = await getTranslations("Posts");
  const related = relatedPostsFor(post, 4);

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

      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 sm:py-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8">
          <RoutePostDetailClient post={post} />
        </div>
        <div className="lg:col-span-4">
          <PostAuthorAside post={post} />
        </div>
      </div>

      {related.length > 0 ? (
        <section className="border-border/50 mt-12 border-t bg-white/80">
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
