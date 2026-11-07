import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "ink" | "raised" | "bone";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  /** Surface color. "bone" flips text to dark for light "paper" panels. */
  tone?: Tone;
  /**
   * "band" draws the section as a rounded inset panel inside the page
   * gutters (from the reference "why us" band) instead of full-bleed.
   */
  shape?: "bleed" | "band";
  /** Vertical rhythm. */
  spacing?: "default" | "compact" | "none";
};

const toneClass: Record<Tone, string> = {
  ink: "bg-ink text-bone",
  raised: "bg-ink-raised text-bone",
  bone: "bg-bone text-ink [--focus-ring:var(--color-ink)]",
};

const spacingClass = {
  default: "py-20 md:py-28",
  compact: "py-12 md:py-16",
  none: "",
} as const;

export function Section({
  tone = "ink",
  shape = "bleed",
  spacing = "default",
  className,
  children,
  ...props
}: SectionProps) {
  if (shape === "band") {
    return (
      <section className={cn("px-2 sm:px-4", className)} {...props}>
        <div
          className={cn(
            "mx-auto max-w-[calc(var(--container-page)+4rem)] rounded-band",
            toneClass[tone],
            spacingClass[spacing],
          )}
        >
          <Container>{children}</Container>
        </div>
      </section>
    );
  }

  return (
    <section className={cn(toneClass[tone], spacingClass[spacing], className)} {...props}>
      <Container>{children}</Container>
    </section>
  );
}
