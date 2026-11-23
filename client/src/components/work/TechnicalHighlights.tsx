import { technicalHighlights } from "@/data/sections";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";

/** Engineering challenges and decisions, in the case-study card style. */
export function TechnicalHighlights() {
  return (
    <Section tone="surface" shape="band" aria-labelledby="highlights-title">
      <SectionHead
        id="highlights-title"
        eyebrow={technicalHighlights.eyebrow}
        title={technicalHighlights.heading}
        intro={technicalHighlights.intro}
      />
      <ul className="grid gap-6 md:grid-cols-3">
        {technicalHighlights.items.map((item) => (
          <li key={item.id} className="rounded-card bg-page p-7 md:p-9">
            <p className="font-display text-eyebrow font-semibold uppercase text-brand-text">{item.project}</p>
            <h3 className="mt-3 font-display text-h3 font-semibold">{item.title}</h3>
            <p className="mt-4 text-muted">{item.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
