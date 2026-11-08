import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Four-point sparkle used before eyebrows and as an ornament (reference). */
export function Sparkle({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={cn("shrink-0", className)}>
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
    </svg>
  );
}

/**
 * Small orange uppercase label above a section heading, with a sparkle
 * ("✦ WHO WE ARE" in the references). On dark surfaces pass tone="dark":
 * the reference orange reads at 5.6:1 there; on light it uses the deeper
 * text orange to stay above 4.5:1.
 */
export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 font-display text-eyebrow font-semibold uppercase",
        tone === "dark" ? "text-brand" : "text-brand-text",
        className,
      )}
    >
      <Sparkle className="size-3" />
      {children}
    </p>
  );
}
