"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

const bio =
  "I’m Tayyab, a developer in Lahore. I started programming to solve real problems, and I still care most about how things work under the hood: the schema, the API and the interface people actually use.";

const strengths = ["Scalable APIs", "Real-time features", "Responsive UI", "Workflow automation"];

function PortraitFrame() {
  const about = profile.portrait.about;

  return (
    <div className="relative mx-auto w-full max-w-[30rem]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-brand/40 bg-ink-2 ring-2 ring-brand/50 shadow-[0_28px_70px_-28px_rgb(244_91_22/0.4)]">
        <Image
          src={about.src}
          alt={profile.portrait.alt}
          fill
          priority
          sizes="(min-width: 1024px) 30rem, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

function CapabilityPills({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="group/badge inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-label text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/50 hover:bg-white/[0.1] hover:shadow-[0_8px_20px_-14px_rgb(244_91_22/0.6)]"
        >
          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand text-white shadow-[0_0_14px_rgb(244_91_22/0.55)] transition-transform duration-300 group-hover/badge:scale-110">
            <Check size={11} strokeWidth={3} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function ResumeButton() {
  return (
    <a
      href={profile.resumeUrl}
      download
      className="group/resume inline-flex min-h-12 items-center gap-3 rounded-full border border-white/40 px-6 font-display text-[0.8125rem] font-semibold uppercase tracking-[0.04em] text-white transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:text-brand hover:shadow-[0_16px_32px_-12px_rgb(244_91_22/0.35)] active:scale-[0.97]"
    >
      Download résumé
      <span className="grid size-9 place-items-center rounded-full bg-white/10 transition-colors duration-300 group-hover/resume:bg-brand group-hover/resume:text-white">
        <Download
          size={16}
          className="transition-transform duration-300 ease-out group-hover/resume:translate-y-1"
        />
      </span>
    </a>
  );
}

/**
 * Permanent "Who I am" section: the premium dark showcase with the new
 * About portrait and shared profile copy.
 */
export function AboutIntro() {
  return (
    <section aria-labelledby="about-title" className="pt-14 md:pt-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="rounded-card bg-ink p-6 text-white shadow-2xl md:p-10">
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="order-2 lg:order-1 lg:col-span-5">
                <PortraitFrame />
              </div>

              <div className="order-1 lg:order-2 lg:col-span-7">
                <Eyebrow tone="dark">Who I am</Eyebrow>
                <h1
                  id="about-title"
                  className="mt-3 font-display text-h2 font-semibold text-white"
                >
                  A Full-Stack Developer Focused On Real Results
                </h1>
                <p className="mt-5 max-w-[56ch] text-body leading-relaxed text-muted-dark">
                  {bio}
                </p>

                <CapabilityPills items={strengths} />

                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <ResumeButton />
                  <div className="leading-tight">
                    <p className="font-display text-h4 font-semibold text-white">
                      {profile.name}
                    </p>
                    <p className="text-label text-muted-dark">{profile.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
