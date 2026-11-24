"use client";

import { motion, type Variants } from "framer-motion";
import { journey } from "@/data/sections";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

/** Development journey, oldest first, numbered because it is a sequence. */
export function Journey() {
  return (
    <Section aria-labelledby="journey-title">
      <SectionHead
        id="journey-title"
        eyebrow={journey.eyebrow}
        title={journey.heading}
        intro={journey.intro}
      />
      <motion.ol
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-6 md:grid-cols-2"
      >
        {journey.items.map((step, i) => (
          <motion.li
            key={step.id}
            variants={card}
            className="group/journey flex flex-col rounded-card bg-surface p-7 transition-all duration-300 ease-out will-change-transform hover:-translate-y-2 hover:scale-[1.01] hover:shadow-xl md:p-9"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="rounded-full bg-page px-4 py-1.5 font-display text-label font-semibold tabular-nums transition-all duration-300 group-hover/journey:scale-105 group-hover/journey:bg-brand-strong group-hover/journey:text-white group-hover/journey:shadow-md">
                {step.period}
              </span>
              <span
                aria-hidden="true"
                data-n={String(i + 1).padStart(2, "0")}
                className="font-display text-[2.75rem] font-semibold leading-none text-brand transition-[filter] duration-300 before:text-[#e4e4e8] before:transition-colors before:duration-300 before:content-[attr(data-n)] group-hover/journey:drop-shadow-[0_0_10px_rgb(244_91_22/0.45)] group-hover/journey:before:text-brand"
              >
                .
              </span>
            </div>
            <h3 className="mt-6 font-display text-h3 font-semibold">{step.title}</h3>
            <p className="mt-4 text-muted">{step.text}</p>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  );
}
