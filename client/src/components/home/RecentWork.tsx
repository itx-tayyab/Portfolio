import { ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "@/data/projects";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/work/ProjectCard";

/**
 * Home preview of the work: only the featured projects (featured: true in
 * data/projects.ts). The full list lives on /work.
 */
export function RecentWork() {
  return (
    <Section aria-labelledby="work-title">
      <SectionHead
        id="work-title"
        eyebrow="Selected work"
        title="Featured Work"
        intro="Web platforms built end to end, from the database schema to the interface."
      />
      <div className="grid gap-x-6 gap-y-12 md:grid-cols-2">
        {getFeaturedProjects().map((p, i) => (
          <ProjectCard key={p.slug} project={p} reveal={i * 100} />
        ))}
      </div>
      <div className="mt-14 flex justify-center">
        <Button href="/work" variant="dark" icon={<ArrowRight size={16} />}>
          View all work
        </Button>
      </div>
    </Section>
  );
}
