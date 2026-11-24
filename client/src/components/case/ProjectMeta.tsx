import type { Project } from "@/data/projects";

/** Role / Type / Status cards used in the case-study hero. */
export function ProjectMeta({ project }: { project: Project }) {
  const statusLabel = project.status === "in-progress" ? "In progress" : project.status === "completed" ? "Completed" : "Ongoing";
  const live = project.status !== "completed";

  const facts = [
    { term: "Role", value: project.role },
    { term: "Type", value: project.type === "web" ? "Web platform" : "Mobile app" },
  ];

  return (
    <dl className="grid gap-3">
      {facts.map((fact) => (
        <div key={fact.term} className="rounded-media border border-line bg-surface/60 p-4">
          <dt className="font-display text-eyebrow font-semibold uppercase text-brand-text">
            {fact.term}
          </dt>
          <dd className="mt-1.5 font-display text-h4 font-semibold">{fact.value}</dd>
        </div>
      ))}

      <div className="rounded-media border border-line bg-surface/60 p-4">
        <dt className="font-display text-eyebrow font-semibold uppercase text-brand-text">
          Status
        </dt>
        <dd className="mt-1.5 font-display text-h4 font-semibold">
          <span className="inline-flex items-center gap-2.5">
            <span aria-hidden="true" className="relative inline-flex size-2.5 shrink-0">
              {live ? (
                <span className="absolute inset-0 rounded-full bg-brand opacity-75 motion-safe:animate-ping motion-reduce:animate-none" />
              ) : null}
              <span className="relative size-2.5 rounded-full bg-brand" />
            </span>
            {statusLabel}
          </span>
        </dd>
      </div>
    </dl>
  );
}
