"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import { cn } from "@/lib/cn";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";

/**
 * Sticky site header. Sits flush with the page at the top; once the page
 * scrolls it gains a hairline so it separates from the content beneath.
 * Scroll state comes from an IntersectionObserver on a 1px sentinel, not a
 * scroll listener.
 */
export function Header() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="pointer-events-none -mb-px h-px" />
      <header
        className={cn(
          "sticky top-0 z-40 border-b bg-ink",
          "transition-[border-color] duration-(--duration-ui) ease-out",
          scrolled ? "border-line" : "border-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-page items-center justify-between gap-3 px-4 sm:px-6 md:gap-6">
          <Link
            href="/"
            className="inline-flex min-h-11 min-w-0 items-center truncate font-display text-[1.25rem] font-semibold tracking-tight sm:text-h4"
          >
            {profile.name}
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <NavLinks />
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            {/* Wrapper owns the visibility: Button's own inline-flex would
                override a `hidden` passed through className. */}
            <div className="hidden md:block">
              <Button
                href={profile.resumeUrl}
                download
                variant="secondary"
                size="sm"
                icon={<Download size={16} />}
              >
                Résumé
              </Button>
            </div>
            <MobileMenu />
          </div>
        </div>
      </header>
    </>
  );
}
