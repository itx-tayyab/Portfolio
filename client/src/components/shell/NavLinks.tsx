"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { isActive, navItems } from "./nav";

/**
 * Desktop navigation. The current page gets a signal-orange underline:
 * orange is the "you are here / live" color in this system.
 */
export function NavLinks() {
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
                "relative inline-flex min-h-11 items-center px-3 text-body",
                "transition-colors duration-(--duration-ui) ease-out",
                active ? "text-bone" : "text-stone hover:text-bone",
              )}
            >
              {label}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-3 bottom-2 h-0.5 rounded-full bg-signal origin-left",
                  "transition-transform duration-(--duration-ui) ease-out",
                  active ? "scale-x-100" : "scale-x-0",
                )}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
