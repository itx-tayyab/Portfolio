"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { isActive, navItems } from "./nav";

/** Desktop navigation: small uppercase links; the current page turns orange. */
export function NavLinks({ tone }: { tone: "light" | "dark" }) {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-1">
      {navItems.map(({ label, href }) => {
        const active = isActive(pathname, href);
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "inline-flex min-h-11 items-center px-3.5 font-display text-[0.8125rem] font-medium uppercase tracking-[0.04em]",
                "transition-colors duration-(--duration-ui) ease-out",
                active
                  ? tone === "dark" ? "text-brand" : "text-brand-text"
                  : tone === "dark" ? "text-white hover:text-brand" : "text-ink hover:text-brand-text",
              )}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
