import Link from "next/link";
import { cn } from "@/lib/cn";

/** Two slanted orange strokes, after the reference logo mark. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 34 22" className={cn("h-[22px] w-[34px] shrink-0", className)}>
      <path d="M9 2h9l-9 18H0z" fill="var(--color-brand)" />
      <path d="M25 2h9l-9 18h-9z" fill="var(--color-brand)" opacity="0.75" />
    </svg>
  );
}

/** Wordmark: mark + lowercase name, like the reference "digitos". */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Tayyab Tariq, home"
      className={cn("inline-flex min-h-11 items-center gap-2 font-display text-[1.625rem] font-semibold tracking-[-0.02em]", className)}
    >
      <LogoMark />
      <span>tayyab</span>
    </Link>
  );
}
