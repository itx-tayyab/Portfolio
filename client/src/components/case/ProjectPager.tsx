import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/cn";

function PagerLink({ project, direction }: { project: Project; direction: "prev" | "next" }) {
  const isNext = direction === "next";
  const Icon = isNext ? ArrowRight : ArrowLeft;
  return (
    <Link
      href={`/projects/${project.slug}`}
      rel={isNext ? "next" : "prev"}
      className={cn(
        "group/pager flex min-h-32 flex-col justify-between gap-6 rounded-card bg-surface p-7",
        "transition-[background-color,color] duration-(--duration-ui) ease-out hover:bg-ink hover:text-white",
        isNext && "md:items-end md:text-right",
      )}
    >
      <span className="inline-flex items-center gap-2 font-display text-eyebrow font-semibold uppercase text-brand-text group-hover/pager:text-brand">
        {!isNext && (
          <Icon aria-hidden="true" size={16} className="transition-transform duration-(--duration-ui) ease-out group-hover/pager:-translate-x-1" />
        )}
        {isNext ? "Next project" : "Previous project"}
        {isNext && (
          <Icon aria-hidden="true" size={16} className="transition-transform duration-(--duration-ui) ease-out group-hover/pager:translate-x-1" />
        )}
      </span>
      <span className="font-display text-h3 font-semibold">{project.title}</span>
    </Link>
  );
}

export function ProjectPager({ prev, next }: { prev: Project; next: Project }) {
  return (
    <nav aria-label="More projects" className="grid gap-4 md:grid-cols-2">
      <PagerLink project={prev} direction="prev" />
      <PagerLink project={next} direction="next" />
    </nav>
  );
}
