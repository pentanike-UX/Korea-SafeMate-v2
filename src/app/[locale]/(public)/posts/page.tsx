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

export default async function PostsPage() {
  const approved = listApprovedPosts();
  return <PostsListClient posts={approved} categories={mockContentCategories} />;
}
