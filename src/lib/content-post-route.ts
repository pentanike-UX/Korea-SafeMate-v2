import type { ContentPost, ContentPostFormat, MapLatLng, RouteJourney } from "@/types/domain";

export function getContentPostFormat(post: ContentPost): ContentPostFormat {
  return post.post_format ?? "article";
}

export function postHasRouteJourney(post: ContentPost): boolean {
  return Boolean(post.route_journey && post.route_journey.spots.length > 0);
}

export function isRouteLikeFormat(format: ContentPostFormat): boolean {
  return format === "spot" || format === "route" || format === "hybrid";
}

export function routeJourneyPoints(journey: RouteJourney): MapLatLng[] {
  const fromPath = journey.path?.length ? journey.path : [];
  if (fromPath.length >= 2) return fromPath;
  return journey.spots.map((s) => ({ lat: s.lat, lng: s.lng }));
}

export function postCoverImageUrl(post: ContentPost): string | null {
  if (post.cover_image_url) return post.cover_image_url;
  const first = post.route_journey?.spots.find((s) => s.image_urls[0])?.image_urls[0];
  return first ?? null;
}
