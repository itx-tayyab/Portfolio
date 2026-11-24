"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/reveal";

type SpotlightCardProps = {
  children: ReactNode;
  /** Stagger for the scroll reveal, in milliseconds. */
  delay?: number;
  className?: string;
};

/**
 * Card with a cursor-following radial highlight. The pointer position is
 * written straight to CSS variables on the element (no React state), so
 * moving the mouse does not re-render the card on every frame.
 */
export function SpotlightCard({ children, delay = 0, className }: SpotlightCardProps) {
  const ref = useRef<HTMLLIElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLLIElement>) {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
    element.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
  }

  return (
    <li
      ref={ref}
      data-reveal=""
      style={revealDelay(delay)}
      onPointerMove={handlePointerMove}
      className={cn(
        "group/spot relative overflow-hidden rounded-card border border-line bg-page p-6",
        "transition-all duration-300 ease-out will-change-transform",
        "hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-[0_20px_45px_-20px_rgb(244_91_22/0.4)]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgb(244 91 22 / 0.12), transparent 72%)",
        }}
      />
      {children}
    </li>
  );
}
