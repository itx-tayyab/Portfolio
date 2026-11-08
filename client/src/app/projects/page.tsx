import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ProjectFilter } from "@/components/work/ProjectFilter";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Full-stack and mobile projects by Tayyab Tariq: NestJS and Node.js backends, Next.js interfaces and Flutter apps.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Work | Tayyab Tariq",
    description: "Full-stack and mobile projects by Tayyab Tariq: NestJS and Node.js backends, Next.js interfaces and Flutter apps.",
    url: "/projects",
  },
};

export default function WorkPage() {
  const counts = {
    all: projects.length,
    web: projects.filter((p) => p.type === "web").length,
    mobile: projects.filter((p) => p.type === "mobile").length,
  };

  return (
    <Section spacing="default" className="pt-14 md:pt-20">
      <SectionHead
        as="h1"
        eyebrow="My work"
        title="Projects I’ve Designed And Built"
        intro="Web platforms I built end to end, and the Flutter apps where I learned mobile. Each project page covers the problem, my approach and what I learned."
      />
      <ProjectFilter counts={counts}>
        {projects.map((project, i) => (
          <div key={project.slug} data-type={project.type}>
            <ProjectCard project={project} headingLevel="h2" priority={i < 2} />
          </div>
        ))}
      </ProjectFilter>
    </Section>
  );
}
