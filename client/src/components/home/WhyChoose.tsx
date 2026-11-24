"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Compass, MessagesSquare, Wrench } from "lucide-react";
import { projects } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";

const reasons = [
  {
    icon: Compass,
    title: "Architecture Before Screens",
    text: "I plan the data model and API first, so features don’t fight the structure later.",
  },
  {
    icon: MessagesSquare,
    title: "Clear Communication",
    text: "Plain updates on what’s done, what’s next and what needs your decision.",
  },
  {
    icon: Wrench,
    title: "Code You Can Maintain",
    text: "Typed, documented code with sensible structure that the next developer can pick up.",
  },
];

const list: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.1, staggerChildren: 0.15 } },
};

const listItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/**
 * Dark rounded band with thick orange arcs at its edges, after reference
 * image 4: image card with an orange gradient and a big stat, then
 * eyebrow, heading, intro and three reasons separated by hairlines.
 *
 * The band fades in first, then the image scales up and the reasons stagger
 * in from the bottom.
 */
export function WhyChoose() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section aria-labelledby="why-title" className="mt-20 px-3 sm:px-5 md:mt-28 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="on-dark relative mx-auto max-w-[96rem] overflow-hidden rounded-band bg-ink py-20 text-white md:py-28"
      >
        <Container className="relative">
          {/* Orange arcs bleeding off the band's edges */}
          <span aria-hidden="true" className="pointer-events-none absolute -left-[26rem] -top-16 size-[34rem] rounded-full border-[2.75rem] border-brand max-lg:hidden" style={{ marginLeft: "calc(-1 * max(0px, (100vw - 77.5rem) / 2))" }} />
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-[27rem] -right-[24rem] size-[34rem] rounded-full border-[2.75rem] border-brand max-lg:hidden" style={{ marginRight: "calc(-1 * max(0px, (100vw - 77.5rem) / 2))" }} />

          <div className="relative grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="group/image relative aspect-[4/3.6] overflow-hidden rounded-media lg:col-span-5"
            >
              <Image
                src="/images/projects/harmoni/illustration-workspace.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 30rem, 100vw"
                className="object-cover transition-transform duration-500 ease-out group-hover/image:scale-105"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand via-brand/55 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-5 p-8">
                <span className="font-display text-[5.5rem] font-semibold leading-none">
                  {String(projects.length).padStart(2, "0")}
                </span>
                <span className="max-w-[12ch] font-display text-label font-medium leading-snug">
                  Projects built end to end
                </span>
              </div>
            </motion.div>

            <div className="lg:col-span-7">
              <Eyebrow tone="dark">Engineering philosophy</Eyebrow>
              <h2 id="why-title" className="mt-3 font-display text-h2 font-semibold">
                How I Approach Engineering
              </h2>
              <p className="mt-5 max-w-[56ch] text-muted-dark">
                I care about the parts users never see as much as the parts they do. That’s what keeps a
                product fast, secure and easy to change.
              </p>
              <motion.ul
                variants={list}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                onMouseLeave={() => setHoveredIndex(null)}
                className="mt-8"
              >
                {reasons.map(({ icon: Icon, title, text }, index) => {
                  const isHovered = hoveredIndex === index;
                  const isDimmed = hoveredIndex !== null && !isHovered;

                  return (
                    <motion.li key={title} variants={listItem} className="relative">
                      <div
                        onMouseEnter={() => setHoveredIndex(index)}
                        className={cn(
                          "group/reason relative -mx-3 grid items-center gap-4 rounded-media border-b border-line-dark px-3 py-6 transition-all duration-300 sm:grid-cols-[auto_1fr_1fr] sm:gap-6",
                          index === 0 && "pt-0",
                          index === reasons.length - 1 && "border-b-0",
                          isDimmed ? "opacity-50" : "opacity-100",
                          isHovered && "bg-white/[0.045]",
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute left-0 top-1/2 h-10 w-0.5 -translate-y-1/2 rounded-full bg-brand transition-all duration-300",
                            isHovered ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0",
                          )}
                        />
                        <span
                          aria-hidden="true"
                          className={cn(
                            "grid size-14 place-items-center rounded-full border border-line-dark bg-ink-2 text-brand transition-colors duration-300",
                            isHovered && "border-brand/40 bg-brand/10",
                          )}
                        >
                          <span className="inline-flex transition-transform duration-500 group-hover/reason:rotate-[360deg]">
                            <Icon size={24} />
                          </span>
                        </span>
                        <h3 className="font-display text-h4 font-semibold">{title}</h3>
                        <p className="text-label text-muted-dark">{text}</p>
                      </div>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
