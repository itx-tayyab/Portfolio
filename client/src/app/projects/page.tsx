import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { ProjectTile } from "@/components/work/ProjectTile";
import { ProjectFilter } from "@/components/work/ProjectFilter";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Full-stack and mobile projects by Tayyab Tariq: NestJS and Node.js backends, Next.js interfaces and Flutter apps.",
  alternates: { canonical: "/projects" },
};

export default function WorkPage() {
  const counts = {
    all: projects.length,
    web: projects.filter((p) => p.type === "web").length,
    mobile: projects.filter((p) => p.type === "mobile").length,
  };

  return (
    <Section spacing="default" className="pt-12 md:pt-20">
      <SectionHead
        as="h1"
        title="Work"
        intro="Web platforms I built end to end, and the Flutter apps where I learned mobile. Each project page covers the problem, my approach and what I learned."
      />
      <ProjectFilter counts={counts}>
        {projects.map((project, i) => (
          <div key={project.slug} data-type={project.type}>
            <ProjectTile project={project} headingLevel="h2" priority={i < 2} />
          </div>
        ))}
      </ProjectFilter>
    </Section>
  );
}
