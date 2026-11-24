"use client";

import { motion, type Variants } from "framer-motion";
import { stack } from "@/data/stack";
import { toolkitSection } from "@/data/sections";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { Tag } from "@/components/ui/Tag";

const cards: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delayChildren: 0.15, staggerChildren: 0.05 },
  },
};

const pills: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const pill: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: "easeOut" } },
};

/** The existing technology groups from data/stack.ts, unchanged. */
export function Toolkit() {
  return (
    <Section aria-labelledby="toolkit-title">
      <SectionHead
        id="toolkit-title"
        eyebrow={toolkitSection.eyebrow}
        title={toolkitSection.heading}
        intro={toolkitSection.intro}
      />
      <motion.ul
        variants={cards}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-6 sm:grid-cols-2"
      >
        {stack.map((group) => (
          <motion.li
            key={group.id}
            variants={card}
            className="group/toolkit flex flex-col rounded-card border border-transparent bg-surface p-7 transition-all duration-300 ease-out hover:border-brand/50 hover:shadow-[0_0_30px_-10px_rgb(244_91_22/0.45)] md:p-9"
          >
            <h3 className="font-display text-h3 font-semibold">{group.title}</h3>
            <p className="mt-3 text-label text-muted">{group.statement}</p>
            <motion.ul variants={pills} className="mt-6 flex flex-wrap gap-2">
              {group.tools.map((tool) => (
                <motion.li key={tool} variants={pill}>
                  <Tag className="cursor-default transition-all duration-200 hover:scale-110 hover:border-brand-strong hover:bg-brand-strong hover:text-white hover:shadow-md hover:shadow-brand/30">
                    {tool}
                  </Tag>
                </motion.li>
              ))}
            </motion.ul>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
