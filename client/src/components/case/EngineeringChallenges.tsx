"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import type { EngineeringChallenge } from "@/data/deepDiveTypes";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/cn";

export function EngineeringChallenges({ challenges }: { challenges: EngineeringChallenge[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (challenges.length === 0) return null;

  return (
    <Section spacing="none" aria-labelledby="challenges-title">
      <SectionHead
        id="challenges-title"
        eyebrow="Trade-offs"
        title="Core Engineering Challenges & Technical Trade-offs"
        intro="The decisions that mattered once the product moved past the prototype stage."
        compact
      />

      <div className="space-y-3 rounded-card border border-line bg-surface p-3 md:p-5">
        {challenges.map((challenge, index) => {
          const open = openIndex === index;
          const questionId = `challenge-question-${challenge.id}`;
          const answerId = `challenge-answer-${challenge.id}`;

          return (
            <div
              key={challenge.id}
              className={cn(
                "group/accordion overflow-hidden rounded-media border bg-page transition-all duration-300",
                open
                  ? "border-brand/30 shadow-[0_8px_24px_-20px_rgb(244_91_22/0.55)]"
                  : "border-line hover:border-brand/30 hover:shadow-[0_8px_24px_-20px_rgb(244_91_22/0.35)]",
              )}
            >
              <button
                id={questionId}
                type="button"
                aria-expanded={open}
                aria-controls={answerId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
              >
                <span className="flex min-w-0 items-baseline gap-3">
                  <span className="font-display text-label font-semibold text-brand-text">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-h4 font-semibold">{challenge.title}</span>
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full text-white transition-all duration-300",
                    open
                      ? "rotate-45 bg-brand-strong"
                      : "bg-ink group-hover/accordion:bg-brand-strong",
                  )}
                >
                  <Plus size={18} />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open ? (
                  <motion.div
                    id={answerId}
                    role="region"
                    aria-labelledby={questionId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 md:px-6">
                      <p className="max-w-[68ch] text-muted">{challenge.summary}</p>
                      <ul className="mt-4 space-y-2.5">
                        {challenge.points.map((point) => (
                          <li key={point} className="flex gap-3 text-label text-ink">
                            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                              <Check size={12} strokeWidth={3} />
                            </span>
                            {point}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 rounded-media border border-line bg-surface px-4 py-3 text-label text-muted">
                        {challenge.tradeoff}
                      </p>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
