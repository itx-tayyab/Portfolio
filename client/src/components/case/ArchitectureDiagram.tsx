"use client";

import { Fragment, useState } from "react";
import { ChevronDown, ChevronRight, Database, Layers, Monitor, Radio, Server, ShieldCheck } from "lucide-react";
import type {
  ArchitectureIcon,
  ArchitectureNode,
  ArchitectureTab,
} from "@/data/deepDiveTypes";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/cn";

const nodeIcons: Record<ArchitectureIcon, typeof Monitor> = {
  monitor: Monitor,
  server: Server,
  radio: Radio,
  database: Database,
  shield: ShieldCheck,
  layers: Layers,
};

function NodeCard({
  node,
  active,
  onActivate,
  onDeactivate,
}: {
  node: ArchitectureNode;
  active: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const Icon = nodeIcons[node.icon];
  const tooltipId = `architecture-tooltip-${node.id}`;

  return (
    <div
      tabIndex={0}
      aria-describedby={active ? tooltipId : undefined}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      className={cn(
        "relative flex h-full min-w-0 flex-1 flex-col justify-center rounded-media border bg-page p-4 transition-all duration-300",
        active
          ? "border-brand/60 shadow-[0_16px_34px_-24px_rgb(244_91_22/0.7)]"
          : "border-line",
      )}
    >
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface text-brand">
          <Icon aria-hidden="true" size={19} />
        </span>
        <div className="min-w-0">
          <p className="font-display text-label font-semibold">{node.title}</p>
          <p className="mt-0.5 text-[0.75rem] leading-snug text-muted">{node.subtitle}</p>
        </div>
      </div>

      {active ? (
        <div
          id={tooltipId}
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 w-64 -translate-x-1/2 rounded-media border border-line-dark bg-ink p-3 text-label leading-snug text-white shadow-xl"
        >
          {node.description}
        </div>
      ) : null}
    </div>
  );
}

function Connector({ label, active }: { label: string; active: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 md:w-28 md:shrink-0">
      <span
        className={cn(
          "max-w-[9rem] text-center text-[0.625rem] font-semibold uppercase leading-tight tracking-[0.05em] transition-colors duration-300",
          active ? "text-brand-text" : "text-muted",
        )}
      >
        {label}
      </span>
      <div className="relative h-6 w-px md:h-px md:w-full">
        <span
          className={cn(
            "absolute inset-0 transition-all duration-300",
            active ? "bg-brand shadow-[0_0_12px_rgb(244_91_22/0.6)]" : "bg-line",
          )}
        />
        <ChevronDown
          aria-hidden="true"
          size={14}
          className={cn(
            "absolute left-1/2 top-full -translate-x-1/2 md:hidden",
            active ? "text-brand" : "text-muted",
          )}
        />
        <ChevronRight
          aria-hidden="true"
          size={14}
          className={cn(
            "absolute right-0 top-1/2 hidden -translate-y-1/2 md:block",
            active ? "text-brand" : "text-muted",
          )}
        />
      </div>
    </div>
  );
}

export function ArchitectureDiagram({
  nodes,
  tabs,
}: {
  nodes: ArchitectureNode[];
  tabs: ArchitectureTab[];
}) {
  const [activeTab, setActiveTab] = useState(0);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  if (nodes.length === 0 || tabs.length === 0) return null;
  const tab = tabs[Math.min(activeTab, tabs.length - 1)];

  return (
    <Section spacing="none" aria-labelledby="architecture-title">
      <SectionHead
        id="architecture-title"
        eyebrow="System design"
        title="System Architecture & Data Flow"
        intro="How requests, real-time events and background work move through this project."
        compact
      />

      <div className="rounded-card border border-line bg-surface p-4 md:p-8">
        <div role="group" aria-label="Architecture views" className="flex flex-wrap gap-2">
          {tabs.map((item, index) => {
            const isActive = index === activeTab;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveTab(index)}
                className={cn(
                  "max-w-full rounded-full border px-4 py-2.5 text-left text-label font-medium transition-all duration-300",
                  isActive
                    ? "border-brand bg-brand-strong text-white"
                    : "border-line bg-page text-ink hover:border-brand/40",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <p className="mt-5 max-w-[72ch] text-label text-muted">{tab.summary}</p>

        <div className="mt-8 flex flex-col items-stretch gap-3 md:flex-row md:items-stretch">
          {nodes.map((node, index) => {
            const isActive = activeNode === node.id;
            const link = index < 3 ? tab.links[index] : undefined;
            const linkIsActive =
              activeNode !== null &&
              (node.id === activeNode || nodes[index + 1]?.id === activeNode);

            return (
              <Fragment key={node.id}>
                <NodeCard
                  node={node}
                  active={isActive}
                  onActivate={() => setActiveNode(node.id)}
                  onDeactivate={() => setActiveNode(null)}
                />
                {link ? <Connector label={link} active={linkIsActive} /> : null}
              </Fragment>
            );
          })}
        </div>

        <p className="mt-4 text-[0.75rem] text-muted">
          Hover or focus a node to trace its connections. The application layer can also read and
          write the data store directly; the diagram highlights the shared data path.
        </p>
      </div>
    </Section>
  );
}
