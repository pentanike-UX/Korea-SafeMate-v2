import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { PostDetailView } from "@/components/posts/post-detail-view";
import { getPublicPostById, listApprovedPosts } from "@/lib/posts-public";
import { BRAND } from "@/lib/constants";

type Props = { params: Promise<{ locale: string; postId: string }> };

export function generateStaticParams() {
  return listApprovedPosts().map((p) => ({ postId: p.id }));
}

export async function generateMetadata({ params }: Props) {
  const { postId } = await params;
  const post = getPublicPostById(postId);
  const t = await getTranslations("Posts");
  if (!post) {
    return { title: `${t("notFound")} | ${BRAND.name}` };
  }
  return {
    title: `${post.title} | ${BRAND.name}`,
    description: post.summary,
  };
}

export default async function PostDetailPage({ params }: Props) {
  const { postId } = await params;
  const post = getPublicPostById(postId);
  if (!post) notFound();
  return <PostDetailView post={post} />;
}
