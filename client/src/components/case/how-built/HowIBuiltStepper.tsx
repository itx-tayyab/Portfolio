"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  CapabilitiesContent,
  ChallengeContent,
  SolutionContent,
  TakeawaysContent,
} from "./blocks";

const phases = ["The Challenge", "Solution", "Core Capabilities", "Key Takeaways"];

type Props = {
  challengeText: string;
  solutionText: string;
  capabilitiesList: string[];
  takeawaysList: string[];
};

export function HowIBuiltStepper({
  challengeText,
  solutionText,
  capabilitiesList,
  takeawaysList,
}: Props) {
  const [step, setStep] = useState(0);

  return (
    <div className="rounded-card border border-line bg-surface p-4 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-display text-label font-semibold" aria-live="polite">
          Phase {step + 1} of 4: {phases[step]}
        </p>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {phases.map((label, index) => (
            <span
              key={label}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === step ? "w-8 bg-brand" : "w-4 bg-line",
              )}
            />
          ))}
        </div>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-brand transition-[width] duration-500 ease-out"
          style={{ width: `${((step + 1) / phases.length) * 100}%` }}
        />
      </div>

      <div className="mt-6 min-h-[16rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {step === 0 ? (
              <div className="rounded-card bg-ink p-6 text-white md:p-8">
                <ChallengeContent text={challengeText} />
              </div>
            ) : null}
            {step === 1 ? (
              <div className="rounded-card border-l-4 border-brand bg-page p-6 md:p-8">
                <SolutionContent text={solutionText} />
              </div>
            ) : null}
            {step === 2 ? (
              <div className="rounded-card border border-line bg-page p-6 md:p-8">
                <CapabilitiesContent items={capabilitiesList} />
              </div>
            ) : null}
            {step === 3 ? (
              <div className="rounded-card border-l-4 border-brand bg-brand/[0.04] p-6 md:p-8">
                <TakeawaysContent items={takeawaysList} />
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setStep((current) => (current - 1 + phases.length) % phases.length)}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-page px-4 text-label font-medium transition-colors duration-300 hover:border-brand hover:bg-brand-strong hover:text-white"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          Previous Phase
        </button>
        <button
          type="button"
          onClick={() => setStep((current) => (current + 1) % phases.length)}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-page px-4 text-label font-medium transition-colors duration-300 hover:border-brand hover:bg-brand-strong hover:text-white"
        >
          Next Phase
          <ArrowRight aria-hidden="true" size={16} />
        </button>
      </div>
    </div>
  );
}
