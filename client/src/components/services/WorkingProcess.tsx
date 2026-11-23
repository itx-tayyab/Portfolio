import { workingProcess } from "@/data/sections";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";

/** Discovery → Planning → Development → Testing → Delivery, in the numbered-card style. */
export function WorkingProcess() {
  return (
    <Section tone="dark" shape="band" aria-labelledby="process-title" className="mt-20 md:mt-28">
      <SectionHead
        id="process-title"
        eyebrow={workingProcess.eyebrow}
        title={workingProcess.heading}
        intro={workingProcess.intro}
        tone="dark"
      />
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {workingProcess.items.map((step, i) => (
          <li key={step.id} className="flex flex-col rounded-card bg-ink-2 p-7">
            <span
              aria-hidden="true"
              data-n={String(i + 1).padStart(2, "0")}
              className="font-display text-[2.75rem] font-semibold leading-none text-brand before:text-white/15 before:content-[attr(data-n)]"
            >
              .
            </span>
            <h3 className="mt-6 font-display text-h4 font-semibold">{step.title}</h3>
            <p className="mt-2 text-label text-muted-dark">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
