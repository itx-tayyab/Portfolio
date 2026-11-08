import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/cn";

/**
 * Project tile after reference image 6: large rounded image, then title and
 * category with a black round arrow button on the right. The whole tile is
 * one link.
 */
export function ProjectCard({
  project,
  priority = false,
  headingLevel: Heading = "h3",
  className,
}: {
  project: Project;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  const category = project.type === "web" ? "Web platform" : "Mobile app";
  return (
    <Link href={`/projects/${project.slug}`} className={cn("group/card block", className)}>
      <div className="relative aspect-[1.42] overflow-hidden rounded-card bg-ink">
        {project.cover.kind === "screenshot" ? (
          // Light UI screenshots sit inset in a dark rounded frame and bleed
          // off its right and bottom edges, so the tile keeps the solid
          // rounded shape of the reference tiles.
          <>
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: "radial-gradient(80% 80% at 100% 100%, rgb(244 91 22 / 0.45), transparent 60%)" }}
            />
            <div className="absolute left-[8%] top-[11%] w-[140%] overflow-hidden rounded-tl-media shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)] transition-transform duration-(--duration-media) ease-out group-hover/card:-translate-x-[1.5%] group-hover/card:-translate-y-[1.5%]">
              <Image
                src={project.cover.src}
                alt=""
                width={project.cover.width}
                height={project.cover.height}
                priority={priority}
                sizes="(min-width: 768px) 70vw, 140vw"
                className="block h-auto w-full"
              />
            </div>
          </>
        ) : (
          <Image
            src={project.cover.src}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-(--duration-media) ease-out group-hover/card:scale-[1.03]"
          />
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
          className="grid size-12 shrink-0 place-items-center rounded-full bg-ink text-white transition-[background-color,transform] duration-(--duration-ui) ease-out group-hover/card:rotate-45 group-hover/card:bg-brand-strong"
        >
          <ArrowUpRight size={20} />
        </span>
      </div>
    </Link>
  );
}
