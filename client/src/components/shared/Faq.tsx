"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export type FaqItem = { id: string; question: string; answer: string };

/**
 * Reusable FAQ accordion. Each row is a real button with an animated answer
 * panel, so it stays keyboard accessible while expanding smoothly.
 */
export function Faq({ items }: { items: FaqItem[] }) {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set());

  function toggle(id: string) {
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => {
        const open = openIds.has(item.id);
        const questionId = `faq-question-${item.id}`;
        const answerId = `faq-answer-${item.id}`;

        return (
          <li
            key={item.id}
            className={cn(
              "group/faq overflow-hidden rounded-card border-l-4 border-l-transparent bg-surface transition-colors duration-300",
              "hover:border-l-brand hover:bg-[#efeff2] focus-within:border-l-brand focus-within:bg-[#efeff2]",
              open && "border-l-brand bg-[#efeff2]",
            )}
          >
            <h3>
              <button
                id={questionId}
                type="button"
                aria-expanded={open}
                aria-controls={answerId}
                onClick={() => toggle(item.id)}
                className="flex w-full cursor-pointer items-center justify-between gap-6 px-6 py-5 text-left md:px-8"
              >
                <span className="font-display text-h4 font-semibold">{item.question}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-full bg-ink text-white transition-all duration-300",
                    open ? "rotate-45 bg-brand-strong" : "group-hover/faq:bg-brand-strong",
                  )}
                >
                  <Plus size={20} />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  key="content"
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[64ch] px-6 pb-6 text-muted md:px-8">{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
