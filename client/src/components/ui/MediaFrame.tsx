import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type MediaFrameProps = {
  children: ReactNode;
  /** CSS aspect ratio, e.g. "16 / 10". */
  ratio?: string;
  /**
   * Content for the notched bottom-right pocket (usually a round arrow).
   * The notch is reserved for project tiles; leave empty elsewhere.
   */
  notch?: ReactNode;
  /** Surface color around the frame, used to paint the notch pocket. */
  surface?: "ink" | "ink-raised" | "bone";
  className?: string;
};

const surfaceVar = {
  ink: "[--notch-bg:var(--color-ink)]",
  "ink-raised": "[--notch-bg:var(--color-ink-raised)]",
  bone: "[--notch-bg:var(--color-bone)]",
} as const;

/** Rounded media container with an optional notched action pocket. */
export function MediaFrame({
  children,
  ratio = "16 / 10",
  notch,
  surface = "ink",
  className,
}: MediaFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-media bg-ink-raised",
        surfaceVar[surface],
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      {children}
      {notch ? <div className="notch z-10">{notch}</div> : null}
    </div>
  );
}

/**
 * Round icon "button" sized for the notch pocket. Always decorative: the
 * whole tile is the link and carries the accessible name.
 */
export function NotchButton({ children }: { children: ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-14 place-items-center rounded-full bg-bone text-ink",
        "transition-[background-color,color,transform] duration-(--duration-ui) ease-out",
        "group-hover/tile:bg-signal group-hover/tile:text-signal-ink group-hover/tile:-rotate-45",
      )}
    >
      {children}
    </span>
  );
}
