import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type StatusDotProps = {
  /** "live" uses signal orange; "idle" is neutral. */
  state?: "live" | "idle";
  children: ReactNode;
  className?: string;
};

/**
 * A status line with a static dot. No infinite ping: the color alone says
 * "live", and a looping animation would pull focus from the content.
 */
export function StatusDot({ state = "live", children, className }: StatusDotProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-label", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "size-2 shrink-0 rounded-full",
          state === "live" ? "bg-brand shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-brand)_22%,transparent)]" : "bg-muted",
        )}
      />
      {children}
    </span>
  );
}
