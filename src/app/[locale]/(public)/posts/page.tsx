import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { PostsListClient } from "@/components/posts/posts-list-client";
import { mockContentCategories } from "@/data/mock";
import { listApprovedPosts } from "@/lib/posts-public";
import { BRAND } from "@/lib/constants";

export async function generateMetadata() {
  const t = await getTranslations("Posts");
  return {
    title: `${t("metaTitle")} | ${BRAND.name}`,
    description: t("metaDescription"),
  };
}

function PostsListFallback() {
  return (
    <div className="text-muted-foreground flex min-h-[40vh] items-center justify-center px-4 text-sm">…</div>
  );
}

export default async function PostsPage() {
  const approved = listApprovedPosts();
  return (
    <Suspense fallback={<PostsListFallback />}>
      <PostsListClient posts={approved} categories={mockContentCategories} />
    </Suspense>
  );
}
