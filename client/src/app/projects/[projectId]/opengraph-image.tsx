import { getProject, projects } from "@/data/projects";
import { defaultKicker, ogContentType, ogSize, renderOgImage } from "../../_og/render";

export const alt = "Project case study by Tayyab Tariq";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return projects.map((p) => ({ projectId: p.slug }));
}

/** Per-project social preview: project name, summary and stack. */
export default async function Image({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const project = getProject(projectId);
  return renderOgImage({
    kicker: defaultKicker,
    title: project?.title ?? "Project",
    summary: project?.summary,
    band: project ? project.stack.slice(0, 4) : [],
  });
}
