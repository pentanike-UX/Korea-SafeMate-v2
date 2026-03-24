"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { ContentPost, RouteSpot } from "@/types/domain";
import { RouteMapPreview } from "@/components/maps/route-map-preview";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Map, Maximize2 } from "lucide-react";

function spotShortName(spot: RouteSpot, maxLen: number) {
  const raw = spot.title?.trim() || spot.place_name?.trim() || "—";
  return raw.length > maxLen ? `${raw.slice(0, maxLen - 1)}…` : raw;
}

type Props = {
  post: ContentPost;
  spots: RouteSpot[];
  activeSpotId: string | null;
  onSpotNavigate: (id: string) => void;
  onScrollToMainMap: () => void;
  isMobile: boolean;
};

export function RouteStickyLocalNav({ post, spots, activeSpotId, onSpotNavigate, onScrollToMainMap, isMobile }: Props) {
  const t = useTranslations("RoutePosts");
  const journey = post.route_journey!;
  const [expanded, setExpanded] = useState(true);
  const [mapSheetOpen, setMapSheetOpen] = useState(false);
  const chipScrollDesktopRef = useRef<HTMLDivElement>(null);
  const chipScrollMobileRef = useRef<HTMLDivElement>(null);
  const activeChipRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!activeSpotId || !activeChipRef.current) return;
    const wrap = (isMobile ? chipScrollMobileRef.current : chipScrollDesktopRef.current) ?? null;
    if (!wrap) return;
    const chip = activeChipRef.current;
    const chipLeft = chip.offsetLeft;
    const chipW = chip.offsetWidth;
    const wrapW = wrap.clientWidth;
    const target = chipLeft - wrapW / 2 + chipW / 2;
    wrap.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [activeSpotId, isMobile]);

  const desktopChips = (
    <div
      ref={chipScrollDesktopRef}
      className={cn(
        "flex min-h-[44px] min-w-0 flex-1 items-center gap-1.5 overflow-x-auto py-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:gap-2 [&::-webkit-scrollbar]:hidden",
        !expanded && "hidden",
      )}
      role="tablist"
      aria-label={t("stickyNavSpotsAria")}
    >
      {spots.map((spot, index) => {
        const short = spotShortName(spot, 22);
        const full = `${index + 1}. ${spot.title?.trim() || spot.place_name || "—"}`;
        const active = spot.id === activeSpotId;
        return (
          <button
            key={spot.id}
            ref={active ? activeChipRef : undefined}
            type="button"
            role="tab"
            aria-selected={active}
            title={full}
            onClick={() => onSpotNavigate(spot.id)}
            className={cn(
              "shrink-0 rounded-full border px-3 py-2 text-left text-xs font-medium transition-colors sm:text-[13px]",
              active
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border/70 bg-white/90 text-foreground hover:border-primary/35 hover:bg-primary/5",
            )}
          >
            <span className={cn("font-semibold tabular-nums", active ? "text-primary-foreground" : "text-primary")}>
              {index + 1}
            </span>{" "}
            <span className="font-medium">{short}</span>
          </button>
        );
      })}
    </div>
  );

  const miniMapInteractive = (
    <div
      className={cn(
        "border-border/60 shrink-0 overflow-hidden rounded-xl border bg-muted/30 shadow-sm",
        isMobile ? "size-12" : "h-14 w-[4.5rem] sm:h-16 sm:w-20",
      )}
    >
      <RouteMapPreview
        spots={journey.spots}
        path={journey.path}
        selectedSpotId={activeSpotId}
        onSpotSelect={onSpotNavigate}
        className="h-full w-full"
      />
    </div>
  );

  const miniMapThumbnail = (
    <div
      className="border-border/60 size-12 shrink-0 overflow-hidden rounded-xl border bg-muted/30 shadow-sm"
      aria-hidden
    >
      <RouteMapPreview
        spots={journey.spots}
        path={journey.path}
        selectedSpotId={activeSpotId}
        className="pointer-events-none h-full w-full"
      />
    </div>
  );

  return (
    <>
      <nav
        className={cn(
          "fixed right-0 left-0 z-40 border-b border-border/60 bg-[color-mix(in_oklab,var(--background)_92%,transparent)] shadow-[0_1px_0_color-mix(in_oklab,var(--foreground)_6%,transparent)] backdrop-blur-md",
          "top-14 sm:top-16",
          isMobile ? "h-14 px-2" : "min-h-[4rem] px-3 py-2 sm:min-h-[4.25rem] sm:px-4",
        )}
        aria-label={t("stickyNavAria")}
      >
        <div className="mx-auto flex max-w-6xl items-center gap-2 lg:gap-3">
          {isMobile ? (
            <button
              type="button"
              onClick={() => setMapSheetOpen(true)}
              className="flex shrink-0 items-center justify-center rounded-xl border border-border/60 bg-white/90 p-0 shadow-sm"
              aria-label={t("stickyNavOpenMapSheet")}
            >
              {miniMapThumbnail}
            </button>
          ) : (
            miniMapInteractive
          )}

          {!isMobile && desktopChips}

          {isMobile ? (
            <div
              ref={chipScrollMobileRef}
              className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto py-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              role="tablist"
              aria-label={t("stickyNavSpotsAria")}
            >
              {spots.map((spot, index) => {
                const short = spotShortName(spot, 12);
                const full = `${index + 1}. ${spot.title?.trim() || spot.place_name || "—"}`;
                const active = spot.id === activeSpotId;
                return (
                  <button
                    key={spot.id}
                    ref={active ? activeChipRef : undefined}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    title={full}
                    onClick={() => onSpotNavigate(spot.id)}
                    className={cn(
                      "shrink-0 rounded-full border px-2.5 py-1.5 text-[11px] font-semibold",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border/70 bg-white/95 text-foreground",
                    )}
                  >
                    <span className="tabular-nums">{index + 1}</span> {short}
                  </button>
                );
              })}
            </div>
          ) : null}

          <div className="ml-auto flex shrink-0 items-center gap-1 border-l border-border/50 pl-2 sm:gap-1.5 sm:pl-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-9 gap-1.5 rounded-xl px-2 text-xs font-semibold sm:h-10 sm:px-3"
              onClick={onScrollToMainMap}
              aria-label={t("stickyNavFullMap")}
            >
              {isMobile ? (
                <Map className="size-4 opacity-90" aria-hidden />
              ) : (
                <>
                  <Maximize2 className="size-3.5 opacity-80 sm:size-4" aria-hidden />
                  <span className="hidden sm:inline">{t("stickyNavFullMap")}</span>
                </>
              )}
            </Button>
            {!isMobile ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-9 rounded-xl px-2 text-muted-foreground sm:h-10"
                onClick={() => setExpanded((e) => !e)}
                aria-expanded={expanded}
                aria-label={expanded ? t("stickyNavCollapse") : t("stickyNavExpand")}
              >
                {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
              </Button>
            ) : null}
          </div>
        </div>

        {!isMobile && !expanded ? (
          <p className="text-muted-foreground mx-auto max-w-6xl px-4 pb-1 text-center text-[11px]">{t("stickyNavCollapsedHint")}</p>
        ) : null}
      </nav>

      {isMobile ? (
        <Sheet open={mapSheetOpen} onOpenChange={setMapSheetOpen}>
          <SheetContent side="bottom" className="h-[min(70vh,520px)] rounded-t-3xl px-4 pt-2 pb-6" showCloseButton>
            <SheetHeader className="text-left">
              <SheetTitle className="text-base">{t("mapTitle")}</SheetTitle>
            </SheetHeader>
            <div className="border-border/60 relative mt-3 aspect-[16/11] w-full overflow-hidden rounded-2xl border bg-muted">
              <RouteMapPreview
                spots={journey.spots}
                path={journey.path}
                selectedSpotId={activeSpotId}
                onSpotSelect={(id) => {
                  onSpotNavigate(id);
                  setMapSheetOpen(false);
                }}
                className="h-full"
              />
            </div>
          </SheetContent>
        </Sheet>
      ) : null}
    </>
  );
}
