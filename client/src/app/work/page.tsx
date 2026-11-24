import type { Metadata } from "next";
import { getFeaturedProjects, projects } from "@/data/projects";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ProjectFilter } from "@/components/work/ProjectFilter";
import { FeaturedProject } from "@/components/work/FeaturedProject";
import { TechnicalHighlights } from "@/components/work/TechnicalHighlights";
import { ContactCta } from "@/components/shared/ContactCta";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Full-stack projects by Tayyab Tariq: NestJS and Node.js backends and Next.js interfaces.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work | Tayyab Tariq",
    description: "Full-stack projects by Tayyab Tariq: NestJS and Node.js backends and Next.js interfaces.",
    url: "/work",
  },
};

export default function WorkPage() {
  const counts = {
    all: projects.length,
    web: projects.filter((p) => p.type === "web").length,
    mobile: projects.filter((p) => p.type === "mobile").length,
  };
  const featured = getFeaturedProjects()[0];

  return (
    <>
      <Section spacing="compact" className="pt-14 md:pt-20">
        <SectionHead
          as="h1"
          eyebrow="My work"
          title="Projects I’ve Designed And Built"
          intro="Web platforms I built end to end, from the database schema to the interface. Each project page covers the problem, my approach and what I learned."
          className="mb-0 md:mb-0"
        />
      </Section>

      {featured ? <FeaturedProject project={featured} /> : null}

      <Section aria-labelledby="explorer-title">
        <SectionHead id="explorer-title" eyebrow="Project explorer" title="All Projects" layout="stacked" />
        <ProjectFilter counts={counts}>
          {projects.map((project, i) => (
            <div key={project.slug} data-type={project.type}>
              <ProjectCard project={project} reveal={(i % 2) * 100} />
            </div>
          ))}
        </ProjectFilter>
      </Section>

      <TechnicalHighlights />
      <ContactCta />
    </>
  );
}
