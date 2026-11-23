import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { StatusDot } from "@/components/ui/StatusDot";

/**
 * One project given room on the Work page, in the dark band style. Uses the
 * project's own data (title, summary, role, stack, cover) unchanged.
 */
export function FeaturedProject({ project }: { project: Project }) {
  const category = project.type === "web" ? "Web platform" : "Mobile app";
  return (
    <Section tone="dark" shape="band" aria-labelledby="featured-title">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative aspect-[1.42] overflow-hidden rounded-media bg-ink-2 lg:col-span-7">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "radial-gradient(80% 80% at 100% 100%, rgb(244 91 22 / 0.45), transparent 60%)" }}
          />
          {!project.cover ? (
            <span aria-hidden="true" className="absolute bottom-[11%] left-[8%] font-display text-h2 font-semibold text-white">
              {project.title}
            </span>
          ) : project.cover.kind === "screenshot" ? (
            <div className="absolute left-[8%] top-[11%] w-[140%] overflow-hidden rounded-tl-media shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)]">
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                width={project.cover.width}
                height={project.cover.height}
                sizes="(min-width: 1024px) 60vw, 140vw"
                className="block h-auto w-full"
              />
            </div>
          ) : (
            <Image src={project.cover.src} alt={project.cover.alt} fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
          )}
        </div>
        <div className="lg:col-span-5">
          <Eyebrow tone="dark">Featured project</Eyebrow>
          <h2 id="featured-title" className="mt-3 font-display text-h2 font-semibold">
            {project.title}
          </h2>
          <p className="mt-2 text-label text-muted-dark">
            {project.status === "in-progress" ? <StatusDot>{category}, in progress</StatusDot> : `${category}, ${project.period}`}
          </p>
          <p className="mt-5 max-w-[48ch] text-muted-dark">{project.summary}</p>
          <p className="mt-6 font-display text-eyebrow font-semibold uppercase text-brand">My role</p>
          <p className="mt-1.5">{project.role}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>
          <Button href={`/projects/${project.slug}`} className="mt-8" icon={<ArrowRight size={16} />}>
            View case study
          </Button>
        </div>
      </div>
    </Section>
  );
}
