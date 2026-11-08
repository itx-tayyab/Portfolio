"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import { cn } from "@/lib/cn";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";

/**
 * Site header after the reference designs: logo left, uppercase nav in the
 * middle, contact block and "Let's talk" pill on the right. Dark over the
 * home page's dark hero (reference image 1), white elsewhere (images 2-6).
 * Sticky; gains a shadow once the page scrolls.
 */
export function Header() {
  const pathname = usePathname();
  const tone: "light" | "dark" = pathname === "/" ? "dark" : "light";
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
          "sticky top-0 z-40 transition-shadow duration-(--duration-ui) ease-out",
          tone === "dark" ? "on-dark bg-ink text-white" : "bg-page text-ink",
          tone === "dark"
            ? scrolled && "shadow-[0_1px_0_var(--color-line-dark)]"
            : scrolled
              ? "shadow-[0_8px_30px_-12px_rgb(20_20_20/0.18)]"
              : "shadow-[0_1px_0_var(--color-line)]",
        )}
      >
        <div className="mx-auto flex h-[4.5rem] w-full max-w-page items-center justify-between gap-4 px-4 sm:px-6 lg:h-[5.25rem]">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <NavLinks tone={tone} />
          </nav>

          <div className="flex shrink-0 items-center gap-4">
            <a href={`mailto:${profile.email}`} className="group/mail hidden min-h-11 items-center gap-3 xl:flex">
              <span
                aria-hidden="true"
                className="grid size-10 place-items-center rounded-full bg-brand text-white transition-transform duration-(--duration-ui) ease-out group-hover/mail:scale-105"
              >
                <Mail size={18} />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-display text-label font-semibold">Email anytime</span>
                <span className={cn("text-[0.8125rem]", tone === "dark" ? "text-muted-dark" : "text-muted")}>
                  {profile.email}
                </span>
              </span>
            </a>
            <div className="hidden md:block">
              <Button href="/contact" size="sm">
                Let’s talk
              </Button>
            </div>
            <MobileMenu tone={tone} />
          </div>
        </div>
      </header>
    </>
  );
}
