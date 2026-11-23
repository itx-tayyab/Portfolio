import { currentlyExploring } from "@/data/sections";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { StatusDot } from "@/components/ui/StatusDot";

/** Small section: what I'm learning now. */
export function CurrentlyExploring() {
  return (
    <Section spacing="compact" aria-labelledby="exploring-title">
      <SectionHead
        id="exploring-title"
        eyebrow={currentlyExploring.eyebrow}
        title={currentlyExploring.heading}
        intro={currentlyExploring.intro}
      />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentlyExploring.items.map((item) => (
          <li key={item.title} className="rounded-card border border-line p-6">
            <StatusDot>Exploring</StatusDot>
            <h3 className="mt-4 font-display text-h4 font-semibold">{item.title}</h3>
            <p className="mt-2 text-label text-muted">{item.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
