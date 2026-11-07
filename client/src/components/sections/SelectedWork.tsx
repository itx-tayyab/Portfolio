import { getFeaturedProjects, projects } from "@/data/projects";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ProjectTile } from "@/components/work/ProjectTile";

export function SelectedWork() {
  const featured = getFeaturedProjects();
  return (
    <Section aria-labelledby="work-title">
      <SectionHead
        id="work-title"
        title="Selected work"
        intro="Two full-stack products I designed and built, from the database schema to the interface."
      />
      <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
        {featured.map((project) => (
          <ProjectTile key={project.slug} project={project} />
        ))}
      </div>
      <div className="mt-14">
        <ArrowLink href="/projects">See all {projects.length} projects</ArrowLink>
      </div>
    </Section>
  );
}
