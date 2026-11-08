import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type MediaFrameProps = {
  children: ReactNode;
  /** CSS aspect ratio, e.g. "16 / 10". */
  ratio?: string;
  /** Content for the notched bottom-right pocket (a round button). */
  notch?: ReactNode;
  /** Surface the frame sits on, used to paint the notch pocket. */
  surface?: "page" | "surface";
  className?: string;
};

const surfaceVar = {
  page: "[--notch-bg:var(--color-page)]",
  surface: "[--notch-bg:var(--color-surface)]",
} as const;

/** Rounded media container with an optional notched action pocket. */
export function MediaFrame({ children, ratio = "16 / 10", notch, surface = "page", className }: MediaFrameProps) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-media bg-surface", surfaceVar[surface], className)}
      style={{ aspectRatio: ratio }}
    >
      {children}
      {notch ? <div className="notch z-10">{notch}</div> : null}
    </div>
  );
}

/** Round button for the notch: black circle with a white icon (reference "+"). */
export function NotchButton({ children }: { children: ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-14 place-items-center rounded-full bg-ink text-white",
        "transition-[background-color,transform] duration-(--duration-ui) ease-out",
        "group-hover/card:bg-brand-strong group-hover/card:rotate-90",
      )}
    >
      {children}
    </span>
  );
}
