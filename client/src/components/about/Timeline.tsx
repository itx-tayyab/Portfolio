import { GraduationCap, Briefcase } from "lucide-react";
import { timeline } from "@/data/timeline";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";

/** Education and work, newest first, as cards in the reference card style. */
export function Timeline() {
  const entries = [...timeline].reverse();
  const hasWork = entries.some((e) => e.type === "work");

  return (
    <Section tone="surface" shape="band" aria-labelledby="timeline-title">
      <SectionHead
        id="timeline-title"
        eyebrow="My journey"
        title={hasWork ? "Experience And Education" : "My Education"}
        intro="Where I learned the fundamentals behind the projects."
      />
      <ol className="grid gap-6 md:grid-cols-2">
        {entries.map((entry) => {
          const Icon = entry.type === "work" ? Briefcase : GraduationCap;
          return (
            <li key={entry.id} className="flex flex-col rounded-card bg-page p-7 md:p-9">
              <div className="flex items-start justify-between gap-4">
                <Icon aria-hidden="true" size={44} strokeWidth={1.3} className="text-brand" />
                <span className="rounded-full bg-surface px-4 py-1.5 font-display text-label font-semibold tabular-nums">
                  {entry.period}
                </span>
              </div>
              <h3 className="mt-6 font-display text-h3 font-semibold">{entry.title}</h3>
              <p className="mt-1 font-display text-label font-semibold uppercase tracking-[0.04em] text-brand-text">
                {entry.org}, {entry.location}
              </p>
              <p className="mt-4 text-muted">{entry.description}</p>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
