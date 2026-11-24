"use client";

import { useState } from "react";
import { technicalHighlights } from "@/data/sections";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/reveal";

/** Engineering challenges and decisions, in the case-study card style. */
export function TechnicalHighlights() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Section tone="surface" shape="band" aria-labelledby="highlights-title">
      <SectionHead
        id="highlights-title"
        eyebrow={technicalHighlights.eyebrow}
        title={technicalHighlights.heading}
        intro={technicalHighlights.intro}
      />
      <ul
        className="grid gap-6 md:grid-cols-3"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {technicalHighlights.items.map((item, index) => {
          const isHovered = hoveredIndex === index;
          const isDimmed = hoveredIndex !== null && !isHovered;

          return (
            <li
              key={item.id}
              data-reveal=""
              style={revealDelay(index * 90)}
              onMouseEnter={() => setHoveredIndex(index)}
              className={cn(
                "rounded-card border-t-4 bg-page p-7 transition-all duration-300 ease-out will-change-transform md:p-9",
                isHovered ? "-translate-y-2 border-t-brand shadow-lg" : "border-t-transparent",
                isDimmed ? "opacity-50" : "opacity-100",
              )}
            >
              <p className="font-display text-eyebrow font-semibold uppercase text-brand-text">{item.project}</p>
              <h3 className="mt-3 font-display text-h3 font-semibold">{item.title}</h3>
              <p className="mt-4 text-muted">{item.text}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
