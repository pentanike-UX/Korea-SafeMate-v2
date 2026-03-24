"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Bookmark, Heart, LayoutDashboard, MessageCircle, Plane } from "lucide-react";

const NAV: { href: string; labelKey: "navOverview" | "navRequests" | "navSavedGuardians" | "navSavedPosts" | "navMessages"; Icon: typeof Plane }[] = [
  { href: "/traveler", labelKey: "navOverview", Icon: LayoutDashboard },
  { href: "/traveler/requests", labelKey: "navRequests", Icon: Plane },
  { href: "/traveler/saved-guardians", labelKey: "navSavedGuardians", Icon: Heart },
  { href: "/traveler/saved-posts", labelKey: "navSavedPosts", Icon: Bookmark },
  { href: "/traveler/messages", labelKey: "navMessages", Icon: MessageCircle },
];

export function TravelerHubShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const t = useTranslations("TravelerHub");

  return (
    <div className="bg-[var(--bg-page)] min-h-screen">
      <div className="border-border/60 border-b bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <p className="text-primary text-[11px] font-semibold tracking-[0.2em] uppercase">42 Guardians</p>
          <h1 className="text-text-strong mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{t("hubTitle")}</h1>
          <p className="text-muted-foreground mt-2 max-w-xl text-sm leading-relaxed">{t("hubLead")}</p>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 sm:py-10 lg:flex-row lg:gap-10">
        <nav
          className="border-border/60 lg:w-56 lg:shrink-0 lg:space-y-1 lg:border-r lg:pr-6"
          aria-label={t("navAria")}
        >
          <ul className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {NAV.map(({ href, labelKey, Icon }) => {
              const active = pathname === href || (href !== "/traveler" && pathname.startsWith(href));
              return (
                <li key={href} className="shrink-0 lg:shrink">
                  <Link
                    href={href}
                    className={cn(
                      "flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                      active
                        ? "bg-[var(--brand-primary-soft)] text-[var(--brand-primary)]"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <Icon className="size-4 shrink-0 opacity-80" aria-hidden />
                    {t(labelKey)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="min-w-0 flex-1 pb-20 lg:pb-10">{children}</div>
      </div>
    </div>
  );
}
