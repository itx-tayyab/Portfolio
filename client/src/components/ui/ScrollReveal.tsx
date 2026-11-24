"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One page-wide IntersectionObserver for every `[data-reveal]` element.
 * Elements fade and rise in once, then the observer lets them go so hover
 * transforms keep working. Re-runs on navigation, so client-side route
 * changes pick up the new page's elements. Without JavaScript, or with
 * reduced motion, content is simply visible (see globals.css).
 *
 * The revealed state is written to `data-revealed`, an attribute React never
 * renders. Writing a className instead would be fragile: a client component
 * that re-renders (for example a hover row) rewrites className and would
 * wipe the reveal class, leaving its content at opacity 0.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => {
        element.dataset.revealed = "true";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "true";
          observer.unobserve(entry.target);
        }
      },
      // Wait until a little of the element is inside the viewport, not just
      // touching its bottom edge.
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
