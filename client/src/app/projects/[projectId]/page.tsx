import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getAdjacentProjects, getProject, projects } from "@/data/projects";
import { getProjectDeepDive } from "@/data/projectDeepDives";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { ProjectPager } from "@/components/case/ProjectPager";
import { ProjectMeta } from "@/components/case/ProjectMeta";
import { TechStack } from "@/components/case/TechStack";
import { KeyMetrics } from "@/components/case/KeyMetrics";
import { FeatureShowcase } from "@/components/case/FeatureShowcase";
import { HowIBuiltCaseStudy } from "@/components/case/how-built/HowIBuiltCaseStudy";
import { ArchitectureDiagram } from "@/components/case/ArchitectureDiagram";
import { EngineeringChallenges } from "@/components/case/EngineeringChallenges";

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

export default async function ProjectPage({ params }: PageProps<"/projects/[projectId]">) {
  const { projectId } = await params;
  const project = getProject(projectId);
  if (!project) notFound();
  const adjacent = getAdjacentProjects(project.slug);
  const deepDive = getProjectDeepDive(project.slug);

  return (
    <article>
      <Container className="pt-10 md:pt-14">
        <Link
          href="/work"
          className="group/back inline-flex min-h-11 items-center gap-2 font-display text-label font-semibold uppercase tracking-[0.04em] text-muted transition-colors duration-(--duration-ui) ease-out hover:text-brand-text"
        >
          <ArrowLeft aria-hidden="true" size={16} className="transition-transform duration-(--duration-ui) ease-out group-hover/back:-translate-x-1" />
          All work
        </Link>

        <header className="mt-6 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:col-span-7">
            <Eyebrow>{project.type === "web" ? "Web platform" : "Mobile app"}</Eyebrow>
            <h1 className="mt-3 font-display text-h1 font-semibold">{project.title}</h1>
            <p className="mt-5 max-w-[62ch] text-lead leading-relaxed text-muted">
              {project.summary}
            </p>
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

          <div className="lg:col-span-5">
            <ProjectMeta project={project} />
          </div>
        </header>
      </Container>

      <div className="mt-12 space-y-12 md:mt-16 md:space-y-16">
        <TechStack stack={project.stack} projectTitle={project.title} />

        {deepDive ? <KeyMetrics metrics={deepDive.metrics} /> : null}

        {deepDive?.walkthrough?.length ? (
          <FeatureShowcase features={deepDive.walkthrough} />
        ) : null}

        <HowIBuiltCaseStudy project={project} deepDive={deepDive} />

        {deepDive?.architecture ? (
          <ArchitectureDiagram
            nodes={deepDive.architecture.nodes}
            tabs={deepDive.architecture.tabs}
          />
        ) : null}

        {deepDive?.challenges?.length ? (
          <EngineeringChallenges challenges={deepDive.challenges} />
        ) : null}
      </div>

      {adjacent ? (
        <Container className="pt-12 md:pt-16">
          <ProjectPager prev={adjacent.prev} next={adjacent.next} />
        </Container>
      ) : null}
    </article>
  );
}
