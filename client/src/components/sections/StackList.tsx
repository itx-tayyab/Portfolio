import { stack } from "@/data/stack";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";

type StackListProps = {
  title?: string;
  intro?: string;
};

/**
 * Capabilities as a hairline-divided list: area, what I do there, tools.
 * Drawn as the page's raised band. Replaces icon cards and skill bars.
 */
export function StackList({
  title = "What I work with",
  intro = "The tools I reach for, grouped by the part of the product they build.",
}: StackListProps) {
  return (
    <Section tone="raised" shape="band" aria-labelledby="stack-title">
      <SectionHead id="stack-title" title={title} intro={intro} />
      <dl className="border-t border-line">
        {stack.map((group) => (
          <div
            key={group.id}
            className="grid gap-x-6 gap-y-2 border-b border-line py-6 md:grid-cols-12 md:py-8"
          >
            <dt className="font-display text-h3 font-semibold md:col-span-3">{group.title}</dt>
            <dd className="max-w-[40ch] text-lead md:col-span-5">{group.statement}</dd>
            <dd className="text-stone md:col-span-4 md:text-right">
              <span className="sr-only">Tools: </span>
              {group.tools.join(", ")}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
