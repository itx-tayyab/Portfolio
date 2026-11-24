"use client";

import { useState } from "react";
import { workingProcess } from "@/data/sections";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/reveal";

/** Discovery → Planning → Development → Testing → Delivery, in the numbered-card style. */
export function WorkingProcess() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Section tone="dark" shape="band" aria-labelledby="process-title" className="mt-20 md:mt-28">
      <SectionHead
        id="process-title"
        eyebrow={workingProcess.eyebrow}
        title={workingProcess.heading}
        intro={workingProcess.intro}
        tone="dark"
      />
      <ol
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {workingProcess.items.map((step, index) => {
          const isHovered = hoveredIndex === index;
          const isDimmed = hoveredIndex !== null && !isHovered;

          return (
            <li
              key={step.id}
              data-reveal=""
              style={revealDelay(index * 70)}
              onMouseEnter={() => setHoveredIndex(index)}
              className={cn(
                "group/process flex flex-col rounded-card border bg-ink-2 p-7 transition-all duration-300 ease-out will-change-transform",
                isDimmed ? "opacity-50" : "opacity-100",
                isHovered
                  ? "-translate-y-2 border-brand/50 shadow-[0_18px_40px_-22px_rgb(244_91_22/0.45)]"
                  : "border-transparent",
              )}
            >
              <span
                aria-hidden="true"
                data-n={String(index + 1).padStart(2, "0")}
                className="font-display text-[2.75rem] font-semibold leading-none text-brand transition-[filter] duration-300 before:text-white/15 before:transition-colors before:duration-300 before:content-[attr(data-n)] group-hover/process:drop-shadow-[0_0_12px_rgb(244_91_22/0.45)] group-hover/process:before:text-brand"
              >
                .
              </span>
              <h3 className="mt-6 font-display text-h4 font-semibold">{step.title}</h3>
              <p className="mt-2 text-label text-muted-dark">{step.text}</p>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
