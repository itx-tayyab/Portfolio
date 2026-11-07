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
        "inline-flex items-center rounded-full border border-current/20 px-3 py-1 text-label leading-none",
        className,
      )}
    >
      {children}
    </span>
  );
}
