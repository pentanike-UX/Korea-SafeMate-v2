"use client";

import { useId, useMemo } from "react";
import type { MapLatLng, RouteSpot } from "@/types/domain";
import { boundsFromPoints, projectToUnitSquare } from "@/lib/maps/geo-project";
import { cn } from "@/lib/utils";

export type RouteMapPreviewProps = {
  spots: RouteSpot[];
  path: MapLatLng[];
  selectedSpotId?: string | null;
  onSpotSelect?: (id: string) => void;
  /** Editor: pick coordinates from the schematic map (provider-agnostic until real tiles ship). */
  onMapClick?: (lat: number, lng: number) => void;
  className?: string;
  /** When true and onMapClick is set, empty map area forwards clicks. */
  mapClickEnabled?: boolean;
};

/**
 * Schematic route map: monochrome grid, polyline, numbered pins, fit-bounds projection.
 * Replace inner implementation with MapLibre/Mapbox later — props stay stable.
 */
export function RouteMapPreview({
  spots,
  path,
  selectedSpotId,
  onSpotSelect,
  onMapClick,
  className,
  mapClickEnabled,
}: RouteMapPreviewProps) {
  const gridId = useId().replace(/:/g, "");
  const points = useMemo(() => {
    if (path.length >= 2) return path;
    return spots.map((s) => ({ lat: s.lat, lng: s.lng }));
  }, [path, spots]);

  const bounds = useMemo(() => boundsFromPoints(points), [points]);

  const pathD = useMemo(() => {
    if (points.length < 2) return "";
    return points
      .map((pt, i) => {
        const { x, y } = projectToUnitSquare(pt.lat, pt.lng, bounds);
        return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(" ");
  }, [points, bounds]);

  function handleSvgClick(ev: React.MouseEvent<SVGSVGElement>) {
    if (!mapClickEnabled || !onMapClick) return;
    const svg = ev.currentTarget;
    const rect = svg.getBoundingClientRect();
    const vx = ((ev.clientX - rect.left) / rect.width) * 100;
    const vy = ((ev.clientY - rect.top) / rect.height) * 100;
    const lat = bounds.minLat + (1 - vy / 100) * (bounds.maxLat - bounds.minLat);
    const lng = bounds.minLng + (vx / 100) * (bounds.maxLng - bounds.minLng);
    onMapClick(lat, lng);
  }

  const sortedSpots = useMemo(() => [...spots].sort((a, b) => a.order - b.order), [spots]);

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn(
        "bg-muted/40 text-foreground block h-full w-full touch-none select-none",
        mapClickEnabled && onMapClick ? "cursor-crosshair" : "cursor-default",
        className,
      )}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Route map preview"
      onClick={handleSvgClick}
    >
      <defs>
        <pattern id={`rg-${gridId}`} width="8" height="8" patternUnits="userSpaceOnUse">
          <path
            d="M 8 0 L 0 0 0 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.12"
            className="text-foreground/12"
          />
        </pattern>
      </defs>
      <rect width="100" height="100" fill={`url(#rg-${gridId})`} />
      <rect width="100" height="100" className="pointer-events-none fill-[color-mix(in_oklab,var(--foreground)_6%,transparent)]" />

      {pathD ? (
        <path
          d={pathD}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-foreground/75 pointer-events-none"
        />
      ) : null}

      {sortedSpots.map((s) => {
        const { x, y } = projectToUnitSquare(s.lat, s.lng, bounds);
        const selected = s.id === selectedSpotId;
        return (
          <g
            key={s.id}
            transform={`translate(${x} ${y})`}
            className={cn(onSpotSelect && "cursor-pointer")}
            onClick={(e) => {
              e.stopPropagation();
              onSpotSelect?.(s.id);
            }}
          >
            {selected ? (
              <circle r="6" className="fill-primary/25 text-primary" stroke="none" />
            ) : null}
            <circle
              r={selected ? 3.6 : 2.8}
              className={cn(
                selected ? "fill-primary stroke-background" : "fill-background stroke-foreground",
                "stroke-[0.7]",
              )}
            />
            <text
              x={0}
              y={1.1}
              textAnchor="middle"
              dominantBaseline="middle"
              className={cn("font-bold", selected ? "fill-white" : "fill-foreground")}
              style={{ fontSize: 3.2, pointerEvents: "none" }}
            >
              {s.order + 1}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
