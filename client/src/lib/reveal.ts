import type { CSSProperties } from "react";

/**
 * Inline style that staggers a scroll-reveal element (see ScrollReveal).
 * The value is read by the reveal keyframes in globals.css.
 */
export function revealDelay(ms = 0): CSSProperties | undefined {
  return ms ? ({ "--reveal-delay": `${ms}ms` } as CSSProperties) : undefined;
}
