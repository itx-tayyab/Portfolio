import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  /** External links open in a new tab and use the diagonal arrow. */
  external?: boolean;
  className?: string;
};

/** Inline text link with an arrow that nudges in its direction on hover. */
export function ArrowLink({ href, children, external, className }: ArrowLinkProps) {
  const classes = cn(
    "group/arrow inline-flex min-h-11 items-center gap-1.5 font-medium underline decoration-line-strong",
    "underline-offset-[0.3em] transition-[text-decoration-color] duration-(--duration-ui) ease-out hover:decoration-current",
    className,
  );
  const Icon = external ? ArrowUpRight : ArrowRight;
  const icon = (
    <Icon
      aria-hidden="true"
      size={16}
      className={cn(
        "transition-transform duration-(--duration-ui) ease-out",
        external
          ? "group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5"
          : "group-hover/arrow:translate-x-1",
      )}
    />
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        {icon}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
      {icon}
    </Link>
  );
}
