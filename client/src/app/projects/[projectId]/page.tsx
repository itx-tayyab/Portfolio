import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { getAdjacentProjects, getProject, projects, type Project } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { StatusDot } from "@/components/ui/StatusDot";
import { Gallery } from "@/components/case/Gallery";
import { ProjectPager } from "@/components/case/ProjectPager";

/** Every project page is prerendered; unknown slugs are a real 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ projectId: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[projectId]">): Promise<Metadata> {
  const { projectId } = await params;
  const project = getProject(projectId);
  if (!project) return {};
  return {
    title: project.title,
    description: `${project.summary} ${project.role}, built with ${project.stack.slice(0, 4).join(", ")}.`,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: project.title, description: project.summary, url: `/projects/${project.slug}` },
  };
}

function Facts({ project }: { project: Project }) {
  const facts = [
    { term: "Role", value: project.role },
    { term: "Type", value: project.type === "web" ? "Web platform" : "Mobile app" },
    {
      term: "Status",
      value: project.status === "in-progress" ? <StatusDot>In progress</StatusDot> : `Completed ${project.period}`,
    },
  ];
  return (
    <dl className="grid gap-4 sm:grid-cols-3">
      {facts.map(({ term, value }) => (
        <div key={term} className="rounded-card bg-surface px-6 py-5">
          <dt className="font-display text-eyebrow font-semibold uppercase text-brand-text">{term}</dt>
          <dd className="mt-1.5 font-display text-h4 font-semibold">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** The written case study on a grey band; numbered because it is a real sequence. */
function CaseStudy({ project }: { project: Project }) {
  const steps = [
    { title: "The Problem", body: <p>{project.problem}</p> },
    { title: "My Approach", body: <p>{project.approach}</p> },
    {
      title: "What It Does",
      body: (
        <ul className="space-y-2.5">
          {project.features.map((f) => (
            <li key={f} className="flex gap-3">
              <span aria-hidden="true" className="mt-1.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                <Check size={12} strokeWidth={3} />
              </span>
              {f}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "What I Learned",
      body: (
        <ul className="space-y-2.5">
          {project.learnings.map((l) => (
            <li key={l} className="flex gap-3">
              <span aria-hidden="true" className="mt-1.5 grid size-5 shrink-0 place-items-center rounded-full bg-ink text-white">
                <Check size={12} strokeWidth={3} />
              </span>
              {l}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <Section tone="surface" shape="band" aria-labelledby="case-title">
      <SectionHead id="case-title" eyebrow="Case study" title={`How I Built ${project.title}`} layout="stacked" />
      <ol className="grid gap-6 md:grid-cols-2">
        {steps.map((step, i) => (
          <li key={step.title} className="rounded-card bg-page p-7 md:p-9">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-h3 font-semibold">{step.title}</h3>
              <span
                aria-hidden="true"
                data-n={String(i + 1).padStart(2, "0")}
                className="font-display text-[2.75rem] font-semibold leading-none text-brand before:text-[#e4e4e8] before:content-[attr(data-n)]"
              >
                .
              </span>
            </div>
            <div className="mt-5 text-muted">{step.body}</div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[projectId]">) {
  const { projectId } = await params;
  const project = getProject(projectId);
  if (!project) notFound();
  const adjacent = getAdjacentProjects(project.slug);
  const hasScreenshots = project.gallery.length > 0;

  return (
    <article>
      <Container className="pt-10 md:pt-14">
        <Link
          href="/projects"
          className="group/back inline-flex min-h-11 items-center gap-2 font-display text-label font-semibold uppercase tracking-[0.04em] text-muted transition-colors duration-(--duration-ui) ease-out hover:text-brand-text"
        >
          <ArrowLeft aria-hidden="true" size={16} className="transition-transform duration-(--duration-ui) ease-out group-hover/back:-translate-x-1" />
          All work
        </Link>

        <header className="mt-6 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>{project.type === "web" ? "Web platform" : "Mobile app"}</Eyebrow>
            <h1 className="mt-3 font-display text-h1 font-semibold">{project.title}</h1>
            <p className="mt-5 max-w-[52ch] text-lead text-muted">{project.summary}</p>
            {project.links.repo || project.links.live ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.links.live ? (
                  <Button href={project.links.live} external icon={<ArrowUpRight size={16} />}>
                    Open live site
                  </Button>
                ) : null}
                {project.links.repo ? (
                  <Button
                    href={project.links.repo}
                    external
                    variant={project.links.live ? "dark" : "primary"}
                    icon={<ArrowUpRight size={16} />}
                  >
                    View code on GitHub
                  </Button>
                ) : null}
              </div>
            ) : null}
          </div>
          <div className="lg:col-span-5 lg:pt-8">
            <p className="font-display text-eyebrow font-semibold uppercase text-brand-text">Built with</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech}>
                  <Tag>{tech}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </header>

        <div className="mt-12">
          <Facts project={project} />
        </div>
      </Container>

      <Container className="py-14 md:py-20">
        {hasScreenshots ? (
          <Gallery title={project.title} images={project.gallery} />
        ) : (
          <figure>
            <div className="relative aspect-[16/9] overflow-hidden rounded-card bg-surface">
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                fill
                priority
                sizes="(min-width: 1240px) 1192px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-label text-muted">Illustration, not a screenshot of the app.</figcaption>
          </figure>
        )}
      </Container>

      <CaseStudy project={project} />

      {adjacent ? (
        <Container className="pt-20 md:pt-28">
          <ProjectPager prev={adjacent.prev} next={adjacent.next} />
        </Container>
      ) : null}
    </article>
  );
}
