import { journey } from "@/data/sections";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";

/** Development journey, oldest first, numbered because it is a sequence. */
export function Journey() {
  return (
    <Section aria-labelledby="journey-title">
      <SectionHead
        id="journey-title"
        eyebrow={journey.eyebrow}
        title={journey.heading}
        intro={journey.intro}
      />
      <ol className="grid gap-6 md:grid-cols-2">
        {journey.items.map((step, i) => (
          <li key={step.id} className="flex flex-col rounded-card bg-surface p-7 md:p-9">
            <div className="flex items-start justify-between gap-4">
              <span className="rounded-full bg-page px-4 py-1.5 font-display text-label font-semibold tabular-nums">
                {step.period}
              </span>
              <span
                aria-hidden="true"
                data-n={String(i + 1).padStart(2, "0")}
                className="font-display text-[2.75rem] font-semibold leading-none text-brand before:text-[#e4e4e8] before:content-[attr(data-n)]"
              >
                .
              </span>
            </div>
            <h3 className="mt-6 font-display text-h3 font-semibold">{step.title}</h3>
            <p className="mt-4 text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
