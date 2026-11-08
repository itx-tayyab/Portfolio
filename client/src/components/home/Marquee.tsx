"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/cn";

const phrases = ["Backend first", "Pixel-perfect UI", "Built to scale", "Full-stack delivery", "Web and mobile"];

/** Eight-spoke asterisk between phrases (reference). */
function Asterisk() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[0.8em] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1" />
    </svg>
  );
}

function Items({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {phrases.map((p) => (
        <li key={p} className="flex items-center gap-[0.9em] pr-[0.9em]">
          <span className="whitespace-nowrap">{p}</span>
          <Asterisk />
        </li>
      ))}
    </ul>
  );
}

/**
 * Full-width orange band of large uppercase phrases scrolling continuously
 * (reference image 1). White on the reference orange is 3.3:1, which passes
 * for text this large. Pause button for WCAG 2.2.2; reduced motion stops it.
 */
export function Marquee() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="relative overflow-hidden bg-brand text-white">
      <div
        className={cn(
          "flex w-max animate-marquee py-6 font-display text-[clamp(1.75rem,1rem+2.4vw,2.75rem)] font-medium uppercase md:py-8",
          "hover:[animation-play-state:paused]",
          paused && "[animation-play-state:paused]",
        )}
      >
        <Items />
        <Items hidden />
      </div>
      <button
        type="button"
        onClick={() => setPaused((v) => !v)}
        aria-pressed={paused}
        className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-ink text-white transition-transform duration-(--duration-press) ease-out active:scale-[0.94]"
      >
        {paused ? <Play aria-hidden="true" size={16} /> : <Pause aria-hidden="true" size={16} />}
        <span className="sr-only">Pause the scrolling banner</span>
      </button>
    </div>
  );
}
