"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { BRAND } from "@/lib/constants";
import { useHomeHeaderContrast } from "@/hooks/use-home-header-contrast";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { ThemeToggle } from "@/components/theme/theme-toggle";
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
  const isHome = pathname === "/";
  const heroContrast = useHomeHeaderContrast();
  const onDarkSurface = isHome && heroContrast === "dark";

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => {
    const glassHeaderNav = onDarkSurface && !mobile;
    return (
      <nav className={cn("flex gap-1", mobile ? "flex-col gap-2" : "items-center")}>
        {NAV.map((item) => {
          const active = isNavActive(item.href, pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
                mobile ? "text-base" : "",
                glassHeaderNav
                  ? active
                    ? "bg-white/18 text-white ring-1 ring-white/30"
                    : "text-white/88 hover:bg-white/12 hover:text-white"
                  : active
                    ? "bg-[var(--brand-primary-soft)] text-[var(--brand-primary)] ring-1 ring-[color-mix(in_srgb,var(--brand-primary)_22%,transparent)]"
                    : "text-[var(--text-strong)]/80 hover:bg-muted hover:text-[var(--text-strong)]",
              )}
            >
              {tNav(item.msgKey)}
            </Link>
          );
        })}
      </nav>
    );
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ease-out",
        onDarkSurface
          ? "border-white/10 bg-black/24 shadow-none supports-[backdrop-filter]:bg-black/18"
          : "border-border/70 bg-background/93 shadow-[var(--shadow-sm)] supports-[backdrop-filter]:bg-background/86",
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:gap-4 sm:px-6">
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2.5">
          <span
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-trust-blue)] text-sm font-bold text-white shadow-md ring-2 transition-[box-shadow] duration-300",
              onDarkSurface ? "ring-white/25" : "ring-[color-mix(in_srgb,var(--brand-primary)_28%,transparent)] shadow-[0_1px_0_rgba(0,0,0,0.06)]",
            )}
          >
            42
          </span>
          <div className="min-w-0 leading-tight">
            <span
              className={cn(
                "block truncate text-sm font-semibold tracking-tight transition-colors duration-300",
                onDarkSurface ? "text-white" : "text-[var(--text-strong)]",
              )}
            >
              {BRAND.name}
            </span>
            <span
              className={cn(
                "hidden truncate text-[10px] font-medium transition-colors duration-300 sm:block",
                onDarkSurface ? "text-white/70" : "text-muted-foreground",
              )}
            >
              {tBrand("tagline")}
            </span>
          </div>
        </Link>

        <div className="hidden md:flex md:flex-1 md:justify-center">
          <NavLinks />
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher className="hidden sm:flex transition-opacity duration-300" variant={onDarkSurface ? "onDark" : "default"} />
          <Button
            asChild
            variant="ghost"
            size="sm"
            className={cn(
              "hidden sm:inline-flex transition-colors duration-200",
              onDarkSurface ? "text-white/90 hover:bg-white/10 hover:text-white" : "text-[var(--text-strong)]/85 hover:bg-muted hover:text-[var(--text-strong)]",
            )}
          >
            <Link href="/traveler">{tHeader("myJourney")}</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className={cn(
              "hidden sm:inline-flex transition-colors duration-200",
              onDarkSurface ? "text-white/90 hover:bg-white/10 hover:text-white" : "text-[var(--text-strong)]/85 hover:bg-muted hover:text-[var(--text-strong)]",
            )}
          >
            <Link href="/login">{tHeader("logIn")}</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className={cn(
              "hidden sm:inline-flex rounded-xl px-4 font-semibold transition-[background-color,color,box-shadow] duration-300",
              onDarkSurface
                ? "border-0 bg-white text-[var(--brand-primary)] shadow-md shadow-black/20 hover:bg-white/92"
                : "shadow-[0_1px_0_rgba(14,27,61,0.06)]",
            )}
          >
            <Link href="/guardians">{tHeader("findGuardians")}</Link>
          </Button>

          <Sheet>
            <SheetTrigger
              className={cn(
                "inline-flex size-8 shrink-0 items-center justify-center rounded-lg border outline-none transition-colors duration-200 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:hidden",
                onDarkSurface
                  ? "border-white/28 bg-white/12 text-white hover:bg-white/18"
                  : "border-input bg-background text-[var(--text-strong)] hover:bg-muted",
              )}
              aria-label={tHeader("openMenu")}
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,20rem)]">
              <SheetHeader>
                <SheetTitle>{tHeader("menu")}</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <ThemeToggle variant="default" />
                  <LanguageSwitcher className="w-fit" />
                </div>
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
