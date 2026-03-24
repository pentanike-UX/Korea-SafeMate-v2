import NextLink from "next/link";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BRAND } from "@/lib/constants";

export async function SiteFooter() {
  const tFooter = await getTranslations("Footer");
  const tBrand = await getTranslations("Brand");
  const tNav = await getTranslations("Nav");
  const tHeader = await getTranslations("Header");

  return (
    <footer className="border-t border-border/80 bg-[var(--bg-surface-subtle)]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-text-strong text-sm font-semibold">{BRAND.name}</p>
            <p className="text-muted-foreground mt-1 text-sm leading-snug">{tBrand("tagline")}</p>
            <p className="text-muted-foreground mt-4 text-xs leading-relaxed">{tFooter("disclaimerShort")}</p>
          </div>
          <nav className="grid grid-cols-2 gap-x-10 gap-y-1 text-sm sm:grid-cols-3" aria-label="Footer">
            <div>
              <p className="text-text-strong mb-2 text-xs font-semibold uppercase tracking-wider">
                {tFooter("product")}
              </p>
              <ul className="text-muted-foreground space-y-1.5">
                <li>
                  <Link href="/explore" className="hover:text-foreground transition-colors">
                    {tNav("explore")}
                  </Link>
                </li>
                <li>
                  <Link href="/posts" className="hover:text-foreground transition-colors">
                    {tNav("posts")}
                  </Link>
                </li>
                <li>
                  <Link href="/guardians" className="hover:text-foreground transition-colors">
                    {tNav("guardians")}
                  </Link>
                </li>
                <li>
                  <Link href="/traveler" className="hover:text-foreground transition-colors">
                    {tHeader("myJourney")}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-foreground transition-colors">
                    {tNav("about")}
                  </Link>
                </li>
                <li>
                  <Link href="/book" className="hover:text-foreground font-medium text-primary transition-colors">
                    {tNav("book")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-text-strong mb-2 text-xs font-semibold uppercase tracking-wider">
                {tFooter("guardians")}
              </p>
              <ul className="text-muted-foreground space-y-1.5">
                <li>
                  <Link href="/guardians" className="hover:text-foreground transition-colors">
                    {tNav("guardians")}
                  </Link>
                </li>
                <li>
                  <Link href="/guardians/apply" className="hover:text-foreground transition-colors">
                    {tFooter("apply")}
                  </Link>
                </li>
                <li>
                  <NextLink href="/guardian/dashboard" className="hover:text-foreground transition-colors">
                    {tFooter("dashboard")}
                  </NextLink>
                </li>
                <li>
                  <Link href="/login/guardian" className="hover:text-foreground transition-colors">
                    {tFooter("guardianLogin")}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-text-strong mb-2 text-xs font-semibold uppercase tracking-wider">
                {tFooter("operations")}
              </p>
              <ul className="text-muted-foreground space-y-1.5">
                <li>
                  <NextLink href="/admin" className="hover:text-foreground transition-colors">
                    {tFooter("admin")}
                  </NextLink>
                </li>
                <li>
                  <Link href="/login" className="hover:text-foreground transition-colors">
                    {tHeader("logIn")}
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}
