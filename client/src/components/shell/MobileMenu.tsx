"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ArrowRight, Mail, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { isActive, navItems } from "./nav";
import { Logo } from "./Logo";

/**
 * Hamburger menu for screens below lg, on the native modal <dialog>:
 * focus is trapped and Esc closes it. Open/close motion is CSS
 * (.modal-sheet in globals.css).
 */
export function MobileMenu({ tone }: { tone: "light" | "dark" }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Close when the route changes (a link inside the menu was followed).
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-haspopup="dialog"
        className="grid size-11 place-items-center lg:hidden"
      >
        {/* Three lines, the last one shorter, as in the reference. */}
        <span aria-hidden="true" className="flex w-6 flex-col items-end gap-[5px]">
          <span className={cn("h-0.5 w-6 rounded-full", tone === "dark" ? "bg-white" : "bg-ink")} />
          <span className={cn("h-0.5 w-6 rounded-full", tone === "dark" ? "bg-white" : "bg-ink")} />
          <span className={cn("h-0.5 w-4 rounded-full", tone === "dark" ? "bg-white" : "bg-ink")} />
        </span>
        <span className="sr-only">Menu</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        onClose={() => triggerRef.current?.focus()}
        className="modal-sheet m-0 h-dvh max-h-none w-full max-w-none bg-page p-0 text-ink"
      >
        <div className="flex h-full flex-col px-4 pb-8 sm:px-6">
          <div className="flex h-[4.5rem] items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={close}
              autoFocus
              className="grid size-11 place-items-center rounded-full bg-surface"
            >
              <X aria-hidden="true" size={20} />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav aria-label="Menu" className="mt-8">
            <ul>
              {navItems.map(({ label, href }) => {
                const active = isActive(pathname, href);
                return (
                  <li key={href} className="border-b border-line">
                    <Link
                      href={href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-16 items-center justify-between font-display text-h3 font-semibold uppercase",
                        active && "text-brand-text",
                      )}
                    >
                      {label}
                      <ArrowRight aria-hidden="true" size={20} className={active ? "" : "text-muted"} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-auto space-y-5">
            <a href={`mailto:${profile.email}`} className="flex min-h-11 items-center gap-3">
              <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-brand text-white">
                <Mail size={18} />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-display text-label font-semibold">Email anytime</span>
                <span className="text-[0.8125rem] text-muted">{profile.email}</span>
              </span>
            </a>
            <Button href="/contact" className="w-full">
              Let’s talk
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
}
