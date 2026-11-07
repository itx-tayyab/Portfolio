import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadProps = {
  title: ReactNode;
  /** Short intro shown to the right of the title on wide screens. */
  intro?: ReactNode;
  /** Heading level. Pages use h1 once; sections use h2. */
  as?: "h1" | "h2";
  id?: string;
  className?: string;
};

/**
 * Split section head: title on the left (cols 1-7), intro paragraph on the
 * right (cols 9-12), stacked on mobile. Replaces the old centered
 * eyebrow + H2 + paragraph pattern.
 */
export function SectionHead({ title, intro, as = "h2", id, className }: SectionHeadProps) {
  const Heading = as;
  return (
    <div
      className={cn(
        "grid gap-5 md:grid-cols-12 md:items-end md:gap-6",
        "mb-12 md:mb-16",
        className,
      )}
    >
      <Heading
        id={id}
        className={cn(
          "font-display md:col-span-7",
          as === "h1" ? "text-h1" : "text-h2",
        )}
      >
        {title}
      </Heading>
      {intro ? (
        <p className="max-w-[46ch] text-lead opacity-75 md:col-span-4 md:col-start-9">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
