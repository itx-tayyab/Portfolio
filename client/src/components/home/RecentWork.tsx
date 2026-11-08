import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/work/ProjectCard";

/** Two-column project grid after reference image 6. */
export function RecentWork() {
  return (
    <Section aria-labelledby="work-title">
      <SectionHead
        id="work-title"
        eyebrow="Recent work"
        title="Projects I’ve Designed And Built"
        intro="Web platforms built end to end, and the Flutter apps where I learned mobile."
      />
      <div className="grid gap-x-6 gap-y-12 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
      <div className="mt-14 flex justify-center">
        <Button href="/projects" variant="dark" icon={<ArrowRight size={16} />}>
          View all work
        </Button>
      </div>
    </Section>
  );
}
