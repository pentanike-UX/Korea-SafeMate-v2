"use client";

import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const primaryBase =
  "group/text-act inline-flex items-center gap-1.5 font-semibold text-[var(--brand-primary)] transition-all duration-200";
const primaryLine =
  "border-b-2 border-[color-mix(in_srgb,var(--brand-primary)_35%,transparent)] pb-0.5 hover:border-[var(--brand-primary)] hover:gap-2";

/** 주요 텍스트 액션: 라벨 + 화살표, 하단 라인 + 화살표 미세 이동 */
export function TextActionLink({
  className,
  children,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link className={cn(primaryBase, primaryLine, className)} {...props}>
      <span>{children}</span>
      <ArrowRight
        className="size-4 shrink-0 transition-transform duration-200 group-hover/text-act:translate-x-0.5"
        aria-hidden
      />
    </Link>
  );
}

/** 본문·보조 링크: 밑줄 중심 */
export function InlineTextLink({ className, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "text-primary font-medium underline decoration-[color-mix(in_srgb,var(--brand-primary)_40%,transparent)] decoration-2 underline-offset-[5px] transition-colors duration-200",
        "hover:decoration-[var(--brand-primary)] hover:text-[var(--brand-primary)]",
        className,
      )}
      {...props}
    />
  );
}

/** 보조 텍스트 액션: 틴트 + 얇은 밑줄 호버 */
export function TextActionSecondary({
  className,
  children,
  showArrow = true,
  ...props
}: ComponentProps<typeof Link> & { showArrow?: boolean }) {
  return (
    <Link
      className={cn(
        "group/text-sec text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm font-medium transition-colors duration-200",
        "border-b border-transparent pb-px hover:border-foreground/25",
        showArrow && "hover:gap-1.5",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {showArrow ? (
        <ArrowRight
          className="size-3.5 shrink-0 opacity-70 transition-transform duration-200 group-hover/text-sec:translate-x-0.5 group-hover/text-sec:opacity-100"
          aria-hidden
        />
      ) : null}
    </Link>
  );
}
