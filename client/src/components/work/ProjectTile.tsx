import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { MediaFrame, NotchButton } from "@/components/ui/MediaFrame";
import { StatusDot } from "@/components/ui/StatusDot";
import { cn } from "@/lib/cn";

type ProjectTileProps = {
  project: Project;
  /** Pass true for tiles in the first viewport so the cover loads eagerly. */
  priority?: boolean;
  /** Surface the tile sits on, so the notch pocket matches it. */
  surface?: "ink" | "ink-raised";
  /** Heading level for the title, to fit the page outline. */
  headingLevel?: "h2" | "h3";
  className?: string;
};

/**
 * Image-first project tile. The whole tile is one link; the notched corner
 * holds the arrow knob, which turns signal orange and rotates on hover.
 *
 * Screenshots are wide (about 2:1), so instead of cropping them into the
 * frame, the screenshot sits inset from the top-left and bleeds off the
 * right and bottom edges, like a window peeking into the frame.
 * Illustrations fill the frame.
 */
export function ProjectTile({
  project,
  priority = false,
  surface = "ink",
  headingLevel: Heading = "h3",
  className,
}: ProjectTileProps) {
  const { cover } = project;
  const isScreenshot = cover.kind === "screenshot";

  return (
    <Link href={`/projects/${project.slug}`} className={cn("group/tile block", className)}>
      <MediaFrame
        ratio="16 / 9"
        surface={surface}
        notch={
          <NotchButton>
            <ArrowUpRight size={22} />
          </NotchButton>
        }
      >
        {isScreenshot ? (
          <div
            className={cn(
              // 130% width at a 16:9 frame guarantees the bottom bleeds for
              // screenshots from 2:1 up to ~2.4:1 (all current covers).
              "absolute left-[6%] top-[8%] w-[130%] overflow-hidden rounded-tl-card",
              "shadow-[0_32px_64px_-24px_rgb(0_0_0/0.6)] ring-1 ring-white/10",
              "transition-transform duration-(--duration-media) ease-out group-hover/tile:-translate-x-[1.5%] group-hover/tile:-translate-y-[1.5%]",
            )}
          >
            <Image
              src={cover.src}
              alt=""
              width={cover.width}
              height={cover.height}
              priority={priority}
              sizes="(min-width: 768px) 65vw, 130vw"
              className="block h-auto w-full"
            />
          </div>
        ) : (
          <Image
            src={cover.src}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-(--duration-media) ease-out group-hover/tile:scale-[1.02]"
          />
        )}
      </MediaFrame>

      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <Heading className="font-display text-h3 font-semibold">{project.title}</Heading>
        {project.status === "in-progress" ? (
          <StatusDot className="text-stone">In progress</StatusDot>
        ) : (
          <p className="text-label text-stone">{project.period}</p>
        )}
      </div>
      <p className="mt-2 max-w-[52ch] text-stone">{project.summary}</p>
      <p className="mt-3 text-label text-stone">
        <span className="sr-only">Built with </span>
        {project.stack.slice(0, 4).join(", ")}
      </p>
    </Link>
  );
}
