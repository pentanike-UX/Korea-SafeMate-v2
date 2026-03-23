import { HomePageContent } from "@/components/home/home-page-content";
import { PublicSiteShell } from "@/components/layout/public-site-shell";

/** Explicit root route for `/` — avoids edge cases with only `app/(group)/page.tsx` on some hosts. */
export default function HomePage() {
  return (
    <PublicSiteShell>
      <HomePageContent />
    </PublicSiteShell>
  );
}
