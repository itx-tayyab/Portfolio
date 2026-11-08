import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "page" | "surface" | "dark";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  /** page = white, surface = light grey, dark = near-black. */
  tone?: Tone;
  /**
   * "band" draws the section as a rounded panel inset from the page edges,
   * like the reference services (grey) and why-choose-us (dark) sections.
   */
  shape?: "bleed" | "band";
  spacing?: "default" | "compact" | "none";
};

const toneClass: Record<Tone, string> = {
  page: "bg-page text-ink",
  surface: "bg-surface text-ink",
  dark: "on-dark bg-ink text-white",
};

const spacingClass = {
  default: "py-20 md:py-28",
  compact: "py-12 md:py-16",
  none: "",
} as const;

export function Section({
  tone = "page",
  shape = "bleed",
  spacing = "default",
  className,
  children,
  ...props
}: SectionProps) {
  if (shape === "band") {
    return (
      <section className={cn("px-3 sm:px-5 lg:px-8", className)} {...props}>
        <div
          className={cn(
            "relative mx-auto max-w-[96rem] overflow-hidden rounded-band",
            toneClass[tone],
            spacingClass[spacing],
          )}
        >
          <Container className="relative">{children}</Container>
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
