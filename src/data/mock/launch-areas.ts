import type { LaunchAreaSlug } from "@/types/launch-area";

export type { LaunchAreaSlug };

export interface LaunchAreaCard {
  slug: LaunchAreaSlug;
  /** Unsplash or CDN image */
  imageUrl: string;
  active: boolean;
  comingSoon?: boolean;
}

export const mockLaunchAreas: LaunchAreaCard[] = [
  {
    slug: "gwanghwamun",
    active: true,
    imageUrl:
      "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&q=80",
  },
  {
    slug: "gangnam",
    active: true,
    imageUrl:
      "https://images.unsplash.com/photo-1583508915901-b5f84c1cdcde?w=800&q=80",
  },
  {
    slug: "busan",
    active: false,
    comingSoon: true,
    imageUrl:
      "https://images.unsplash.com/photo-1596422846843-79f76391b04a?w=800&q=80",
  },
  {
    slug: "jeju",
    active: false,
    comingSoon: true,
    imageUrl:
      "https://images.unsplash.com/photo-1614115508305-7dc4f6b6f6f5?w=800&q=80",
  },
];
