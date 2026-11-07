"use client";

import { useRef, useSyncExternalStore, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Filter = "all" | "web" | "mobile";

const options: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
];

const EVENT = "work-filter-change";

function readFilter(): Filter {
  const type = new URLSearchParams(window.location.search).get("type");
  return type === "web" || type === "mobile" ? type : "all";
}

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

type ProjectFilterProps = {
  counts: Record<Filter, number>;
  children: ReactNode;
};

/**
 * Filter chips for the Work page, synced to ?type= so a filtered view can be
 * shared and survives back/forward. Reads the URL through
 * useSyncExternalStore (server snapshot "all"), which keeps the page fully
 * static without a Suspense boundary.
 */
export function ProjectFilter({ counts, children }: ProjectFilterProps) {
  const filter = useSyncExternalStore(subscribe, readFilter, () => "all" as Filter);
  const gridRef = useRef<HTMLDivElement>(null);

  function select(value: Filter) {
    const url = new URL(window.location.href);
    if (value === "all") url.searchParams.delete("type");
    else url.searchParams.set("type", value);
    window.history.replaceState(null, "", url);
    gridRef.current?.setAttribute("data-interacted", "");
    window.dispatchEvent(new Event(EVENT));
  }

  const shown = counts[filter];
  const noun = filter === "all" ? "projects" : `${filter} projects`;

  return (
    <>
      <div role="group" aria-label="Filter projects by type" className="mb-12 flex flex-wrap gap-2">
        {options.map(({ value, label }) => {
          const active = filter === value;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={active}
              onClick={() => select(value)}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 rounded-full border px-5 text-label font-medium",
                "transition-[background-color,border-color,color,transform] duration-(--duration-ui) ease-out active:scale-[0.97]",
                active
                  ? "border-bone bg-bone text-ink"
                  : "border-current/50 text-bone hover:border-bone",
              )}
            >
              {label}
              <span className={cn("tabular-nums", active ? "text-ink/70" : "text-stone")}>
                {counts[value]}
              </span>
            </button>
          );
        })}
      </div>
      <p role="status" aria-live="polite" className="sr-only">
        Showing {shown} {shown === 1 ? noun.replace(/s$/, "") : noun}
      </p>
      <div ref={gridRef} data-filter={filter} className="filter-grid grid gap-x-8 gap-y-16 md:grid-cols-2">
        {children}
      </div>
    </>
  );
}
