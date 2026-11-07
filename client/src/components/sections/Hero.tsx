import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { getProject } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { StatusDot } from "@/components/ui/StatusDot";
import { cn } from "@/lib/cn";

/** Headline, one entry per visual line. Each line reveals in turn on load. */
const headline = ["I build the backend", "and the interface", "it deserves."];

/**
 * Load sequence timing (ms). Lines start at 80, 150, 220 and each takes 600;
 * the intro fades in at 360 and the card at 440 (500 each). Everything has
 * landed by ~940ms.
 */
const LINE_START = 80;
const LINE_STAGGER = 70;

function Headline({ id, className }: { id?: string; className?: string }) {
  return (
    <h1 id={id} className={cn("font-display text-display font-semibold", className)}>
      {headline.map((line, i) => (
        // Each line clips its own overflow so the text slides up from a mask.
        // pb/-mb keep the mask edge from clipping glyphs.
        <span key={line} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <span
            className="block animate-line-up"
            style={{ animationDelay: `${LINE_START + i * LINE_STAGGER}ms` }}
          >
            {line}
          </span>
        </span>
      ))}
    </h1>
  );
}

/** Intro paragraph, CTAs. Fades in after the headline settles. */
function Supporting({ className }: { className?: string }) {
  return (
    <div className={cn("animate-rise [animation-delay:360ms]", className)}>
      <p className="max-w-[46ch] text-lead text-stone">
        I’m Tayyab, a full-stack developer. I design APIs and data models in NestJS and
        PostgreSQL, then build the Next.js and Flutter apps that sit on top of them.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button href="/projects" icon={<ArrowRight size={18} />}>
          See the work
        </Button>
        <Button
          href={profile.resumeUrl}
          download
          variant="secondary"
          icon={<Download size={18} />}
        >
          Download résumé
        </Button>
      </div>
    </div>
  );
}

/**
 * "Currently building" card: the one live status in the hero, so it carries
 * the signal dot. Points at the in-progress project.
 */
function NowCard({ className }: { className?: string }) {
  const current = getProject("harmoni");
  if (!current) return null;
  return (
    <Link
      href={`/projects/${current.slug}`}
      className={cn(
        "group/now block rounded-card border border-line bg-ink-raised p-4 pr-5",
        "transition-[border-color] duration-(--duration-ui) ease-out hover:border-line-strong",
        className,
      )}
    >
      <StatusDot className="text-stone">Currently building</StatusDot>
      <p className="mt-2 font-display text-h4 font-semibold">{current.title}</p>
      <p className="mt-1 max-w-[30ch] text-label text-stone">{current.summary}</p>
    </Link>
  );
}

function Availability() {
  return (
    <p className="animate-rise text-label text-stone">
      {profile.role} in {profile.location.split(",")[0]}
      {profile.availability.open ? (
        <>
          <span aria-hidden="true" className="mx-3 inline-block h-3 w-px translate-y-0.5 bg-line-strong" />
          <StatusDot className="text-bone">{profile.availability.label}</StatusDot>
        </>
      ) : null}
    </p>
  );
}

/**
 * Type-led hero: the headline is the visual. The only motion on the page
 * that runs without user input (besides the marquee) is this one load
 * sequence: headline lines slide up in turn, then the rest fades in.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pb-16 pt-12 md:pb-24 md:pt-20">
      <Container>
        <Availability />
        <Headline id="hero-title" className="mt-8" />
        <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-end">
          <Supporting className="md:col-span-7" />
          <NowCard className="animate-rise [animation-delay:440ms] md:col-span-4 md:col-start-9" />
        </div>
      </Container>
    </section>
  );
}
