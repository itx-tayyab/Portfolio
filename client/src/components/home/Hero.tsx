import Image from "next/image";
import { Send } from "lucide-react";
import { profile } from "@/data/profile";
import { heroCard } from "@/data/sections";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { DottedSphere, GhostWord, PaperPlaneDoodle, WavyLines } from "./HeroDecor";

/** Decorative mini bar chart for the floating card (no data, aria-hidden). */
const bars = [72, 58, 40, 64, 34, 22];

/**
 * Home hero, after reference image 1: dark band, eyebrow, three-line
 * title-case headline, orange pill CTA with a dark knob beside a short
 * paragraph, portrait on the right with a doodle and a floating card,
 * wavy lines, a dotted sphere, an orange glow and a vertical ghost word.
 */
export function Hero() {
  return (
    // On desktop the page wraps this and the marquee in a one-screen column;
    // flex-1 lets the hero take whatever height the marquee leaves.
    <section
      aria-labelledby="hero-title"
      className="on-dark relative isolate flex flex-col overflow-hidden bg-ink text-white lg:flex-1"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-[70%]"
        style={{
          background:
            "radial-gradient(60% 75% at 62% 100%, rgb(244 91 22 / 0.55), transparent 70%), radial-gradient(45% 60% at 10% 100%, rgb(244 91 22 / 0.28), transparent 70%)",
        }}
      />
      <WavyLines className="absolute -top-6 right-0 -z-10 h-[60%] w-[70%]" />
      <DottedSphere className="absolute -bottom-24 -left-24 -z-10 hidden size-[30rem] opacity-80 md:block" />
      <GhostWord
        word="TAYYAB"
        className="pointer-events-none absolute -right-6 top-1/2 -z-10 hidden -translate-y-1/2 select-none font-display text-[11rem] font-bold leading-none text-white/[0.05] xl:block"
      />

      <Container className="grid items-end gap-8 pt-12 lg:flex-1 lg:grid-cols-12 lg:pt-8">
        <div className="pb-12 lg:col-span-7 lg:self-center lg:pb-10">
          <p className="inline-flex items-center gap-2 font-display text-eyebrow font-semibold uppercase text-brand">
            <span aria-hidden="true" className="size-1.5 rounded-[1px] bg-brand" />
            Full-stack developer helping teams ship
          </p>
          <h1
            id="hero-title"
            className="mt-5 max-w-[11ch] font-display text-display font-semibold lg:text-[length:clamp(2.5rem,min(1rem+3.6vw,8svh),4rem)]"
          >
            I Build Web Products That Scale
          </h1>
          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
            <Button href="/work" icon={<Send size={16} />}>
              See my work
            </Button>
            <p className="max-w-[34ch] text-label text-muted-dark">
              I design APIs and data models in NestJS and PostgreSQL, then build the Next.js
              apps on top of them.
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[26rem] self-end lg:col-span-5 lg:mr-0 lg:max-w-none">
          <PaperPlaneDoodle className="absolute -left-10 top-6 hidden w-44 lg:block" />
          <div className="relative mx-auto aspect-square w-full max-w-[27rem] lg:max-w-[min(27rem,calc(100svh-17rem))]">
            <Image
              src={profile.portrait.cutout.src}
              alt={profile.portrait.alt}
              fill
              priority
              sizes="(min-width: 1024px) 30rem, 26rem"
              className="object-contain object-bottom"
            />
          </div>
          {/* Static until the project it names has its own page to link to. */}
          <div className="absolute bottom-16 left-0 w-48 rounded-media bg-white p-4 text-ink shadow-[0_24px_48px_-20px_rgb(0_0_0/0.6)] sm:-left-6">
              <span className="block font-display text-label font-semibold">{heroCard.label}</span>
              <span className="mt-0.5 block text-[0.8125rem] text-muted">{heroCard.name}</span>
              <span aria-hidden="true" className="mt-3 flex h-16 items-end gap-1.5">
                {bars.map((h, i) => (
                  <span
                    key={i}
                    className={i % 2 ? "w-full rounded-sm bg-brand" : "w-full rounded-sm bg-ink"}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
