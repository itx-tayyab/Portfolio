"use client";

import { motion } from "framer-motion";
import type { DeepDiveMetric } from "@/data/deepDiveTypes";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";

/** Standalone impact/metrics section for a project case study. */
export function KeyMetrics({ metrics }: { metrics: DeepDiveMetric[] }) {
  if (metrics.length === 0) return null;

  return (
    <Section spacing="none" aria-labelledby="metrics-title">
      <SectionHead
        id="metrics-title"
        eyebrow="Impact & metrics"
        title="Key Performance Indicators"
        intro="The constraints, guarantees and capabilities this product was built around."
        compact
      />

      <div data-motion-root className="rounded-card border border-line bg-surface p-4 md:p-8">
        <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.07 }}
              className="rounded-media border border-line bg-page p-5 transition-all duration-300 hover:-translate-y-2 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/10 md:p-6"
            >
              <dt className="font-display text-h2 font-semibold text-ink">{metric.value}</dt>
              <dd className="mt-2 text-label text-muted">{metric.label}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
