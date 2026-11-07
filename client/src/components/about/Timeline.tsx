import { timeline, type TimelineEntry } from "@/data/timeline";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";

const typeLabel: Record<TimelineEntry["type"], string> = {
  education: "Education",
  work: "Work",
};

/**
 * Chronological list, newest first. The years carry the sequence, so there
 * are no extra 01/02 markers.
 */
export function Timeline() {
  const entries = [...timeline].reverse();
  const hasWork = entries.some((e) => e.type === "work");

  return (
    <Section aria-labelledby="timeline-title">
      <SectionHead
        id="timeline-title"
        title={hasWork ? "Experience and education" : "Education"}
        intro="Where I learned the fundamentals behind the projects."
      />
      <ol className="border-t border-line">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className="grid gap-x-6 gap-y-3 border-b border-line py-8 md:grid-cols-12 md:py-10"
          >
            <p className="font-display text-h4 font-semibold tabular-nums md:col-span-3">
              {entry.period}
            </p>
            <div className="md:col-span-9">
              <h3 className="font-display text-h3 font-semibold">{entry.title}</h3>
              <p className="mt-1 text-stone">
                {entry.org}, {entry.location}
                {hasWork ? <span className="sr-only"> ({typeLabel[entry.type]})</span> : null}
              </p>
              <p className="mt-4 max-w-[60ch]">{entry.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
