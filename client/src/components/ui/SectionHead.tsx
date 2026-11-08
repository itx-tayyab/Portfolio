import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

type SectionHeadProps = {
  eyebrow?: string;
  title: ReactNode;
  /** Short intro. "split" layout puts it on the right (reference: services). */
  intro?: ReactNode;
  layout?: "split" | "stacked" | "center";
  as?: "h1" | "h2";
  id?: string;
  tone?: "light" | "dark";
  className?: string;
};

/** Eyebrow + heading (+ intro), in the reference designs' arrangements. */
export function SectionHead({
  eyebrow,
  title,
  intro,
  layout = "split",
  as = "h2",
  id,
  tone = "light",
  className,
}: SectionHeadProps) {
  const Heading = as;
  const introClass = cn("text-body", tone === "dark" ? "text-muted-dark" : "text-muted");
  const heading = (
    <Heading id={id} className={cn("mt-3 font-display font-semibold", as === "h1" ? "text-h1" : "text-h2")}>
      {title}
    </Heading>
  );

  if (layout === "split") {
    return (
      <div className={cn("mb-12 grid gap-6 md:mb-14 md:grid-cols-12 md:items-end", className)}>
        <div className="md:col-span-7">
          {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
          {heading}
        </div>
        {intro ? <p className={cn(introClass, "max-w-[44ch] md:col-span-4 md:col-start-9 md:pb-2")}>{intro}</p> : null}
      </div>
    );
  }

  return (
    <div className={cn("mb-12 md:mb-14", layout === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      {heading}
      {intro ? (
        <p className={cn(introClass, "mt-5 max-w-[56ch]", layout === "center" && "mx-auto")}>{intro}</p>
      ) : null}
    </div>
  );
}
