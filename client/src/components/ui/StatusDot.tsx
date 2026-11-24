import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type StatusDotProps = {
  /** "live" uses signal orange; "idle" is neutral. */
  state?: "live" | "idle";
  /** Looping ping ring, for a live/recording status ("Exploring"). */
  pulse?: boolean;
  children: ReactNode;
  className?: string;
};

/**
 * A status line with a dot. "live" uses signal orange; pass `pulse` when the
 * status itself is ongoing (a ping ring, not a color change).
 */
export function StatusDot({ state = "live", pulse = false, children, className }: StatusDotProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-label", className)}>
      <span className="relative inline-flex size-2 shrink-0" aria-hidden="true">
        {pulse ? (
          <span
            className={cn(
              "absolute inset-0 rounded-full opacity-75 motion-safe:animate-ping motion-reduce:animate-none",
              state === "live" ? "bg-brand" : "bg-muted",
            )}
          />
        ) : null}
        <span
          className={cn(
            "relative size-2 rounded-full",
            state === "live" ? "bg-brand shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-brand)_22%,transparent)]" : "bg-muted",
          )}
        />
      </span>
      {children}
    </span>
  );
}
