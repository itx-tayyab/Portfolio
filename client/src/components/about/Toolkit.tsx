import { stack } from "@/data/stack";
import { toolkitSection } from "@/data/sections";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { Tag } from "@/components/ui/Tag";

/** The existing technology groups from data/stack.ts, unchanged. */
export function Toolkit() {
  return (
    <Section aria-labelledby="toolkit-title">
      <SectionHead
        id="toolkit-title"
        eyebrow={toolkitSection.eyebrow}
        title={toolkitSection.heading}
        intro={toolkitSection.intro}
      />
      <ul className="grid gap-6 sm:grid-cols-2">
        {stack.map((group) => (
          <li key={group.id} className="flex flex-col rounded-card bg-surface p-7 md:p-9">
            <h3 className="font-display text-h3 font-semibold">{group.title}</h3>
            <p className="mt-3 text-label text-muted">{group.statement}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {group.tools.map((tool) => (
                <li key={tool}>
                  <Tag>{tool}</Tag>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Section>
  );
}
