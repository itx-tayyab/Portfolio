"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Download, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { profile } from "@/data/profile";
import { isActive, navItems } from "./nav";

/**
 * Full-screen mobile menu built on the native modal <dialog>: focus is
 * trapped and Esc closes it for free. Open/close motion is CSS
 * (see .modal-sheet in globals.css).
 */
export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Close when the route changes (a link inside the menu was followed).
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  function open() {
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-current/50 px-4 text-label font-medium md:hidden"
      >
        <Menu aria-hidden="true" size={18} />
        Menu
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        onClose={() => triggerRef.current?.focus()}
        className="modal-sheet m-0 h-dvh max-h-none w-full max-w-none bg-ink p-0 text-bone"
      >
        <div className="flex h-full flex-col px-4 pb-8 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" onClick={close} className="inline-flex min-h-11 items-center font-display text-[1.25rem] font-semibold sm:text-h4">
              {profile.name}
            </Link>
            <button
              type="button"
              onClick={close}
              autoFocus
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-current/50 px-4 text-label font-medium"
            >
              <X aria-hidden="true" size={18} />
              Close
            </button>
          </div>

          <nav aria-label="Menu" className="mt-10">
            <ul className="border-t border-line">
              {[{ label: "Home", href: "/" }, ...navItems].map(({ label, href }) => {
                const active = href === "/" ? pathname === "/" : isActive(pathname, href);
                return (
                  <li key={href} className="border-b border-line">
                    <Link
                      href={href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className="flex min-h-16 items-center justify-between font-display text-h2"
                    >
                      {label}
                      <span
                        aria-hidden="true"
                        className={cn("size-2.5 rounded-full", active ? "bg-signal" : "bg-transparent")}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-auto space-y-4 text-label">
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex min-h-11 items-center gap-2 font-medium"
            >
              <Download aria-hidden="true" size={16} />
              Download résumé (PDF)
            </a>
            <p className="text-stone">
              <a href={`mailto:${profile.email}`} className="underline underline-offset-4">
                {profile.email}
              </a>
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
