import Link from "next/link";
import { BRAND } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export default function GuardianAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted/20 flex min-h-full flex-col">
      <header className="border-border/60 bg-background/95 sticky top-0 z-40 border-b backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
          <Link href="/" className="leading-tight">
            <p className="text-primary text-[10px] font-bold tracking-widest uppercase">Guardian</p>
            <p className="text-sm font-semibold">{BRAND.name}</p>
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="rounded-xl text-muted-foreground">
              <Link href="/guardian/onboarding">Onboarding</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="rounded-xl text-muted-foreground">
              <Link href="/guardian/posts">My posts</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="rounded-xl text-muted-foreground">
              <Link href="/guardian/posts/new">New route</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="rounded-xl">
              <Link href="/">Exit</Link>
            </Button>
          </div>
        </div>
      </header>
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">{children}</div>
    </div>
  );
}
