import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/reveal";

/**
 * Project tile after reference image 6: large rounded image, then title and
 * category with a black round arrow button on the right. The whole tile is
 * one link.
 */
export function ProjectCard({
  project,
  priority = false,
  headingLevel: Heading = "h3",
  reveal = 0,
  className,
}: {
  project: Project;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
  /** Stagger for the scroll reveal, in milliseconds. */
  reveal?: number;
  className?: string;
}) {
  const category = project.type === "web" ? "Web platform" : "Mobile app";
  return (
    <Link
      href={`/projects/${project.slug}`}
      data-reveal=""
      style={revealDelay(reveal)}
      className={cn("group/card block transition-transform duration-300 ease-out will-change-transform hover:-translate-y-2", className)}
    >
      {/* Wide dashboards read best at roughly 2:1; object-cover then fills the
          tile without the extreme side crop a square-ish frame would cause. */}
      <div className="relative aspect-[2/1] overflow-hidden rounded-card border border-transparent bg-ink transition-[border-color,box-shadow] duration-300 ease-out group-hover/card:border-brand/40 group-hover/card:shadow-xl">
        {project.cover ? (
          <Image
            src={project.cover.src}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover/card:scale-105"
          />
        ) : (
          // No image yet: the same dark tile and orange glow, with the name.
          <>
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: "radial-gradient(80% 80% at 100% 100%, rgb(244 91 22 / 0.45), transparent 60%)" }}
            />
            <span
              aria-hidden="true"
              className="absolute bottom-[11%] left-[8%] font-display text-h2 font-semibold text-white transition-transform duration-(--duration-media) ease-out group-hover/card:-translate-y-1"
            >
              {project.title}
            </span>
          </>
        )}
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <Heading className="font-display text-h4 font-semibold">{project.title}</Heading>
          <p className="mt-1 text-label text-muted">
            {category}
            {project.status === "in-progress" ? ", in progress" : ""}
          </p>
        </div>
        <span
          aria-hidden="true"
          className="grid size-12 shrink-0 place-items-center rounded-full bg-ink text-white transition-[background-color,transform] duration-300 ease-out group-hover/card:rotate-45 group-hover/card:bg-brand-strong"
        >
          <ArrowUpRight size={20} />
        </span>
      </div>
    </Link>
  );
}
