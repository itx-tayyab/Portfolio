"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";

type CopyButtonProps = {
  value: string;
  /** Accessible description of what gets copied, e.g. "email address". */
  label: string;
  /** "light" sits on white; "dark" sits on the ink footer. */
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Copies `value` to the clipboard and confirms in place for two seconds.
 * The confirmation is also announced through a polite live region.
 */
export function CopyButton({ value, label, tone = "light", className }: CopyButtonProps) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dark = tone === "dark";

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      setState("failed");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2000);
  }

  const text = state === "copied" ? "Copied!" : state === "failed" ? "Copy failed" : "Copy";
  const hoverText =
    state === "copied"
      ? dark
        ? "hover:text-emerald-400"
        : "hover:text-success-ink"
      : dark
        ? "hover:text-brand"
        : "hover:text-brand-text";

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={cn(
          "inline-flex min-h-11 items-center gap-2 rounded-full border border-current/50 px-4 text-label font-medium",
          "transition-all duration-300 ease-out hover:border-brand active:scale-[0.97]",
          hoverText,
          state === "copied" && (dark ? "text-emerald-400" : "text-success-ink"),
          className,
        )}
      >
        {state === "copied" ? (
          <Check aria-hidden="true" size={16} className={dark ? "text-emerald-400" : "text-success-ink"} />
        ) : (
          <Copy aria-hidden="true" size={16} />
        )}
        <span>{text}</span>
        <span className="sr-only"> {label}</span>
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {state === "copied" ? `${label} copied to clipboard` : state === "failed" ? `Couldn't copy the ${label}. Select it and copy manually.` : ""}
      </span>
    </>
  );
}
