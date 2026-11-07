"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { marqueeStack } from "@/data/stack";
import { cn } from "@/lib/cn";

function Star() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[0.6em] shrink-0" fill="currentColor">
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
    </svg>
  );
}

function Items({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      aria-label={hidden ? undefined : "Main technologies"}
      className="flex shrink-0 items-center"
    >
      {marqueeStack.map((tech) => (
        <li key={tech} className="flex items-center gap-[0.6em] pr-[0.6em]">
          <span className="whitespace-nowrap">{tech}</span>
          <Star />
        </li>
      ))}
    </ul>
  );
}

/**
 * Full-bleed signal-orange band carrying the stack, scrolling continuously.
 * This is the page's one bold element. The list renders twice so the -50%
 * loop is seamless; the copy is hidden from assistive tech.
 *
 * Pausing: hover pauses it, and a visible button pauses it for keyboard and
 * touch users (WCAG 2.2.2). Under reduced motion the global rule stops it.
 */
export function StackMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <div className="relative overflow-hidden bg-signal text-signal-ink">
      <div
        className={cn(
          "flex w-max animate-marquee py-5 font-display text-h2 font-semibold md:py-7",
          "hover:[animation-play-state:paused]",
          paused && "[animation-play-state:paused]",
        )}
      >
        <Items />
        <Items hidden />
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        className={cn(
          "absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full",
          "bg-signal-ink text-signal transition-transform duration-(--duration-press) ease-out active:scale-[0.94]",
          "focus-visible:outline-signal-ink",
        )}
      >
        {paused ? <Play aria-hidden="true" size={16} /> : <Pause aria-hidden="true" size={16} />}
        <span className="sr-only">Pause the scrolling technology list</span>
      </button>
    </div>
  );
}
