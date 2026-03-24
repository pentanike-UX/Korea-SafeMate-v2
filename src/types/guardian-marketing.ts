import type { LaunchAreaSlug } from "@/types/launch-area";

export type GuardianTrustBadgeId = "verified" | "language_checked" | "reviewed" | "fast_response";

export interface GuardianMarketingProfile {
  user_id: string;
  launch_area_slug: LaunchAreaSlug;
  /** K-content & trip themes for matching */
  theme_slugs: string[];
  companion_style_slugs: string[];
  trust_badge_ids: GuardianTrustBadgeId[];
  photo_url: string;
  /** One-line positioning for detail hero */
  positioning: { ko: string; en: string };
  /** Richer intro for detail */
  intro: { ko: string; en: string };
  recommended_routes: { title: { ko: string; en: string }; blurb: { ko: string; en: string } }[];
  trip_type_labels: { ko: string; en: string }[];
  representative_post_ids: string[];
  /** Typical response time copy */
  response_note: { ko: string; en: string };
  review_count_display: number;
}
