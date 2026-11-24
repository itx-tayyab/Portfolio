"use client";

import { useState } from "react";
import { Code2, Database, Gauge, LayoutTemplate, Network } from "lucide-react";
import { technicalApproach } from "@/data/sections";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/reveal";

const icons = {
  architecture: Network,
  database: Database,
  performance: Gauge,
  ux: LayoutTemplate,
  code: Code2,
};

/**
 * Engineering principles as hairline-separated rows. Hovering a row brings
 * it forward and dims the rest, so one principle can be read at a time
 * without losing the full list.
 */
export function TechnicalApproach() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Section aria-labelledby="approach-title">
      <SectionHead
        id="approach-title"
        eyebrow={technicalApproach.eyebrow}
        title={technicalApproach.heading}
        intro={technicalApproach.intro}
      />
      <ul onMouseLeave={() => setHoveredIndex(null)}>
        {technicalApproach.items.map(({ id, icon, title, text }, index) => {
          const Icon = icons[icon];
          const isHovered = hoveredIndex === index;
          const isDimmed = hoveredIndex !== null && !isHovered;

          return (
            <li
              key={id}
              data-reveal=""
              style={revealDelay(index * 70)}
              onMouseEnter={() => setHoveredIndex(index)}
              className={cn(
                "relative -mx-3 grid items-center gap-4 rounded-media border-b border-line px-3 py-6 transition-all duration-300 ease-out sm:grid-cols-[auto_1fr_1fr] sm:gap-6",
                "first:pt-0 last:border-b-0",
                isDimmed ? "opacity-40" : "opacity-100",
                isHovered && "z-10 scale-[1.02] bg-surface shadow-[0_18px_40px_-26px_rgb(20_20_20/0.45)]",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "grid size-14 place-items-center rounded-full border border-line bg-surface text-brand transition-all duration-300 ease-out",
                  isHovered && "-rotate-6 scale-110 border-brand/30 bg-brand/10 shadow-[0_10px_24px_-14px_rgb(244_91_22/0.6)]",
                )}
              >
                <Icon size={24} />
              </span>
              <h3 className="font-display text-h4 font-semibold">{title}</h3>
              <p className="text-label text-muted">{text}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
