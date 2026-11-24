"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  FolderKanban,
  FolderOpen,
  LayoutDashboard,
  ListChecks,
  MessageSquare,
  Sparkles,
  Users,
} from "lucide-react";
import type { FeaturePreview } from "@/data/deepDiveTypes";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/cn";

const featureIcons = {
  chat: MessageSquare,
  tasks: ListChecks,
  files: FolderOpen,
  ai: Sparkles,
  dashboard: LayoutDashboard,
  projects: FolderKanban,
  clients: Users,
};

export function FeatureShowcase({ features }: { features: FeaturePreview[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (features.length === 0) return null;
  const active = features[Math.min(activeIndex, features.length - 1)];

  return (
    <Section spacing="none" aria-labelledby="feature-showcase-title">
      <SectionHead
        id="feature-showcase-title"
        eyebrow="Feature showcase"
        title="Product Walkthrough"
        intro="A closer look at the product surfaces and the systems behind them."
        compact
      />

      <div className="overflow-hidden rounded-card border border-line bg-page">
        <div className="grid lg:grid-cols-[18rem_minmax(0,1fr)]">
          <div
            role="group"
            aria-label="Select a feature preview"
            className="flex gap-2 overflow-x-auto border-b border-line bg-surface p-3 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r lg:p-4"
          >
            {features.map((feature, index) => {
              const Icon = featureIcons[feature.icon];
              const isActive = index === activeIndex;

              return (
                <button
                  key={feature.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "flex min-w-max items-center gap-3 rounded-media border px-3.5 py-3 text-left transition-all duration-300 lg:w-full",
                    isActive
                      ? "border-brand bg-brand-strong text-white shadow-[0_12px_24px_-18px_rgb(244_91_22/0.8)]"
                      : "border-transparent bg-page text-ink hover:border-brand/30 hover:bg-white",
                  )}
                >
                  <Icon
                    aria-hidden="true"
                    size={19}
                    className={cn("shrink-0", isActive ? "text-white" : "text-brand")}
                  />
                  <span className="font-display text-label font-semibold">{feature.label}</span>
                  <ChevronRight
                    aria-hidden="true"
                    size={15}
                    className={cn(
                      "ml-auto hidden shrink-0 lg:block",
                      isActive ? "text-white" : "text-muted",
                    )}
                  />
                </button>
              );
            })}
          </div>

          <div className="p-4 md:p-6">
            <div className="relative aspect-[1.8] overflow-hidden rounded-media border border-line bg-surface">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={active.image.src}
                    alt={active.image.alt}
                    fill
                    sizes="(min-width: 1024px) 58rem, 100vw"
                    className="object-cover object-top"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="mt-4 max-w-[62ch] text-label text-muted">{active.summary}</p>

            <div className="mt-4 rounded-media border border-line bg-surface p-4 md:p-5">
              <p className="font-display text-eyebrow font-semibold uppercase text-brand-text">
                Under the hood
              </p>
              <ul className="mt-3 space-y-2.5">
                {active.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-label text-muted">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
