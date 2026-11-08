import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Small neutral pill for stack items and metadata. Deliberately one color:
 * the old per-technology tag colors carried no meaning.
 */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-page px-3.5 py-1.5 text-label leading-none text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
