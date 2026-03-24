import { mockContentPosts } from "@/data/mock";
import type { ContentPost } from "@/types/domain";

export function listApprovedPosts(): ContentPost[] {
  return mockContentPosts.filter((p) => p.status === "approved");
}

export function getPublicPostById(id: string): ContentPost | null {
  const p = mockContentPosts.find((x) => x.id === id);
  if (!p || p.status !== "approved") return null;
  return p;
}

export function relatedPostsFor(current: ContentPost, limit = 4): ContentPost[] {
  return listApprovedPosts()
    .filter((p) => p.id !== current.id)
    .filter((p) => p.region_slug === current.region_slug || p.category_slug === current.category_slug)
    .sort((a, b) => b.recommended_score - a.recommended_score)
    .slice(0, limit);
}
