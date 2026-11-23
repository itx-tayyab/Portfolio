import { Code2, Database, Gauge, LayoutTemplate, Network } from "lucide-react";
import { technicalApproach } from "@/data/sections";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";

const icons = {
  architecture: Network,
  database: Database,
  performance: Gauge,
  ux: LayoutTemplate,
  code: Code2,
};

/**
 * Engineering principles as hairline-separated rows, the same pattern as
 * the reasons list in the dark "philosophy" band, set here on a light page.
 */
export function TechnicalApproach() {
  return (
    <Section aria-labelledby="approach-title">
      <SectionHead
        id="approach-title"
        eyebrow={technicalApproach.eyebrow}
        title={technicalApproach.heading}
        intro={technicalApproach.intro}
      />
      <ul>
        {technicalApproach.items.map(({ id, icon, title, text }) => {
          const Icon = icons[icon];
          return (
            <li
              key={id}
              className="grid items-center gap-4 border-b border-line py-6 first:pt-0 last:border-b-0 sm:grid-cols-[auto_1fr_1fr] sm:gap-6"
            >
              <span aria-hidden="true" className="grid size-14 place-items-center rounded-full border border-line bg-surface text-brand">
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
