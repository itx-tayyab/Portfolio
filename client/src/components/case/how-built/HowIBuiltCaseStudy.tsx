import type { Project } from "@/data/projects";
import type { ProjectDeepDive } from "@/data/deepDiveTypes";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { HowIBuiltStepper } from "./HowIBuiltStepper";

/** Permanent "How I Built" case-study layout: an interactive phase stepper. */
export function HowIBuiltCaseStudy({
  project,
  deepDive,
}: {
  project: Project;
  deepDive?: ProjectDeepDive;
}) {
  const challengeText = project.problem || deepDive?.challenge || project.summary;
  const solutionText = project.approach || project.summary;
  const capabilitiesList =
    project.features.length > 0 ? project.features : deepDive?.capabilities ?? [];
  const takeawaysList =
    project.learnings.length > 0 ? project.learnings : deepDive?.takeaways ?? [];

  return (
    <Section spacing="none" aria-labelledby="how-built-title">
      <SectionHead
        id="how-built-title"
        eyebrow="Case study"
        title={`How I Built ${project.title}`}
        intro="The problem, the architectural response, the shipped capabilities and the takeaways."
        compact
      />
      <HowIBuiltStepper
        challengeText={challengeText}
        solutionText={solutionText}
        capabilitiesList={capabilitiesList}
        takeawaysList={takeawaysList}
      />
    </Section>
  );
}
