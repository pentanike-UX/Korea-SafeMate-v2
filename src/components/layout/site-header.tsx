"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { BRAND } from "@/lib/constants";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV: { href: string; msgKey: "explore" | "posts" | "guardians" | "about" }[] = [
  { href: "/explore", msgKey: "explore" },
  { href: "/posts", msgKey: "posts" },
  { href: "/guardians", msgKey: "guardians" },
  { href: "/about", msgKey: "about" },
];

function isNavActive(href: string, pathname: string) {
  if (href === "/guardians") return pathname === "/guardians" || pathname.startsWith("/guardians/");
  if (href === "/explore") return pathname === "/explore" || pathname.startsWith("/explore/");
  if (href === "/posts") return pathname === "/posts" || pathname.startsWith("/posts/");
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const tNav = useTranslations("Nav");
  const tHeader = useTranslations("Header");
  const tBrand = useTranslations("Brand");

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <nav className={cn("flex gap-1", mobile ? "flex-col gap-2" : "items-center")}>
      {NAV.map((item) => {
        const active = isNavActive(item.href, pathname);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              mobile ? "text-base" : "",
              active
                ? "bg-[var(--brand-primary-soft)] text-[var(--brand-primary)] ring-1 ring-[color-mix(in_srgb,var(--brand-primary)_22%,transparent)]"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {tNav(item.msgKey)}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <header className="from-background/95 via-background/90 to-background/80 supports-[backdrop-filter]:bg-background/75 sticky top-0 z-50 border-b border-border/70 bg-gradient-to-b shadow-[var(--shadow-sm)] backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:gap-4 sm:px-6">
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-trust-blue)] text-sm font-bold text-white shadow-md ring-2 ring-[color-mix(in_srgb,var(--brand-primary)_30%,transparent)]">
            42
          </span>
          <div className="min-w-0 leading-tight">
            <span className="block truncate text-sm font-semibold tracking-tight">{BRAND.name}</span>
            <span className="text-muted-foreground hidden truncate text-[10px] font-medium sm:block">{tBrand("tagline")}</span>
          </div>
        </Link>

        <div className="hidden md:flex md:flex-1 md:justify-center">
          <NavLinks />
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher className="hidden sm:flex" />
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/traveler">{tHeader("myJourney")}</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link href="/login">{tHeader("logIn")}</Link>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex rounded-xl px-4 font-semibold shadow-sm">
            <Link href="/guardians">{tHeader("findGuardians")}</Link>
          </Button>

          <Sheet>
            <SheetTrigger
              className="border-input bg-background hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 inline-flex size-8 shrink-0 items-center justify-center rounded-lg border outline-none focus-visible:ring-3 md:hidden"
              aria-label={tHeader("openMenu")}
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,20rem)]">
              <SheetHeader>
                <SheetTitle>{tHeader("menu")}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4">
                <LanguageSwitcher className="w-fit" />
                <NavLinks mobile />
                <Button asChild className="w-full rounded-xl">
                  <Link href="/guardians">{tHeader("findGuardians")}</Link>
                </Button>
                <Button asChild variant="outline" className="w-full rounded-xl">
                  <Link href="/traveler">{tHeader("myJourney")}</Link>
                </Button>
                <Button asChild variant="outline" className="w-full rounded-xl">
                  <Link href="/login">{tHeader("signUp")}</Link>
                </Button>
                <Button asChild variant="ghost" className="w-full rounded-xl">
                  <Link href="/login/guardian">{tHeader("logIn")} · Guardian</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
