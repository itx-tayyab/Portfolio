import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getAdjacentProjects, getProject, projects, type Project } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
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
      value:
        project.status === "in-progress" ? (
          <StatusDot>In progress</StatusDot>
        ) : (
          `Completed ${project.period}`
        ),
    },
  ];
  return (
    <dl className="grid gap-x-8 gap-y-5 border-t border-line pt-6 sm:grid-cols-3">
      {facts.map(({ term, value }) => (
        <div key={term}>
          <dt className="text-label text-stone">{term}</dt>
          <dd className="mt-1">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * The written case study on a bone "paper" panel. Numbered because it is a
 * real sequence: problem, then approach, then what came out of it.
 */
function CaseStudy({ project }: { project: Project }) {
  const steps = [
    { title: "The problem", body: <p>{project.problem}</p> },
    { title: "My approach", body: <p>{project.approach}</p> },
    {
      title: "What it does",
      body: (
        <ul className="list-disc space-y-2 pl-5 marker:text-stone-dark">
          {project.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "What I learned",
      body: (
        <ul className="list-disc space-y-2 pl-5 marker:text-stone-dark">
          {project.learnings.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <Section tone="bone" shape="band" aria-labelledby="case-title">
      <h2 id="case-title" className="sr-only">
        Case study
      </h2>
      <ol>
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="grid gap-4 border-t border-ink/15 py-10 first:border-t-0 first:pt-0 last:pb-0 md:grid-cols-12 md:gap-6"
          >
            <h3 className="font-display text-h3 font-semibold md:col-span-4">
              <span aria-hidden="true" className="mr-3 tabular-nums text-stone-dark">
                {String(i + 1).padStart(2, "0")}
              </span>
              {step.title}
            </h3>
            <div className="max-w-[62ch] text-lead md:col-span-8">{step.body}</div>
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
      <Container className="pt-8 md:pt-12">
        <Link
          href="/projects"
          className="group/back inline-flex min-h-11 items-center gap-2 text-label text-stone transition-colors duration-(--duration-ui) ease-out hover:text-bone"
        >
          <ArrowLeft aria-hidden="true" size={16} className="transition-transform duration-(--duration-ui) ease-out group-hover/back:-translate-x-1" />
          All work
        </Link>

        <header className="mt-8 grid gap-10 md:mt-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h1 className="font-display text-h1 font-semibold">{project.title}</h1>
            <p className="mt-5 max-w-[48ch] text-lead text-stone">{project.summary}</p>
            {project.links.repo || project.links.live ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.links.live ? (
                  <Button href={project.links.live} external icon={<ArrowUpRight size={18} />}>
                    Open live site
                  </Button>
                ) : null}
                {project.links.repo ? (
                  <Button
                    href={project.links.repo}
                    external
                    variant={project.links.live ? "secondary" : "primary"}
                    icon={<ArrowUpRight size={18} />}
                  >
                    View code on GitHub
                  </Button>
                ) : null}
              </div>
            ) : null}
          </div>
          <div className="lg:col-span-4 lg:pt-3">
            <p className="text-label text-stone">Built with</p>
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
            <div className="relative aspect-[16/9] overflow-hidden rounded-media bg-ink-raised">
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                fill
                priority
                sizes="(min-width: 1240px) 1192px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-label text-stone">
              Illustration, not a screenshot of the app.
            </figcaption>
          </figure>
        )}
      </Container>

      <CaseStudy project={project} />

      {adjacent ? (
        <Container className="py-20 md:py-28">
          <ProjectPager prev={adjacent.prev} next={adjacent.next} />
        </Container>
      ) : null}
    </article>
  );
}
