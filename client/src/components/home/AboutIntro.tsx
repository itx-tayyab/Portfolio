import Image from "next/image";
import { ArrowRight, Check, Download, LayoutTemplate, Server } from "lucide-react";
import { profile } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow, Sparkle } from "@/components/ui/Eyebrow";

const features = [
  {
    icon: Server,
    title: "Backend Architecture",
    text: "Database schemas and APIs designed for how the product reads and writes.",
  },
  {
    icon: LayoutTemplate,
    title: "Clean Interfaces",
    text: "Responsive, accessible screens that match the system behind them.",
  },
];

const strengths = ["Scalable APIs", "Real-time features", "Responsive UI", "Cross-platform apps"];

/**
 * "Who I am" block after reference image 2: a three-image collage in
 * organic shapes with an orange sparkle, then eyebrow, heading, two
 * features, a dark strip of checks and a CTA beside the name.
 */
export function AboutIntro({ headingLevel: H = "h2" }: { headingLevel?: "h1" | "h2" }) {
  // On the About page itself the CTA offers the resume instead of linking to itself.
  const onAboutPage = H === "h1";
  // Feature titles sit one level below the section heading.
  const FeatureHeading = H === "h1" ? "h2" : "h3";
  return (
    <section aria-labelledby="about-title" className="py-20 md:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Collage */}
        <div className="relative mx-auto grid w-full max-w-[34rem] grid-cols-2 gap-3 lg:col-span-6">
          <div className="grid gap-3">
            <div className="relative aspect-square overflow-hidden rounded-[50%_50%_45%_55%/55%_50%_50%_45%] bg-surface">
              <Image
                src="/images/projects/covid19-tracker/illustration-cover.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 17rem, 45vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[45%_55%_0_0/40%_40%_0_0] bg-surface">
              <Image
                src="/images/projects/clientbridge/illustration-cover.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 17rem, 45vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="relative overflow-hidden rounded-full bg-surface">
            <Image
              src={profile.portrait.cutout.src}
              alt={profile.portrait.alt}
              fill
              sizes="(min-width: 1024px) 17rem, 45vw"
              className="object-cover object-[50%_30%]"
            />
          </div>
          <Sparkle className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 text-brand drop-shadow-[0_0_0_white]" />
        </div>

        {/* Text */}
        <div className="lg:col-span-6">
          <Eyebrow>Who I am</Eyebrow>
          <H id="about-title" className="mt-3 font-display text-h2 font-semibold">
            A Full-Stack Developer Focused On Real Results
          </H>
          <p className="mt-5 max-w-[56ch] text-muted">
            I’m Tayyab, a developer in Lahore. I started programming to solve real problems, and I
            still care most about how things work under the hood: the schema, the API and the
            interface people actually use.
          </p>
          <hr className="my-8 border-line" />
          <ul className="grid gap-8 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <Icon aria-hidden="true" size={40} strokeWidth={1.4} className="shrink-0 text-brand" />
                <div>
                  <FeatureHeading className="font-display text-h4 font-semibold">{title}</FeatureHeading>
                  <p className="mt-1 text-label text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="relative mt-8 rounded-media border-b-2 border-brand bg-ink px-6 py-5 text-white">
            <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
              {strengths.map((s) => (
                <li key={s} className="flex items-center gap-3 text-label">
                  <span aria-hidden="true" className="grid size-5 place-items-center rounded-full bg-brand">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
            <Sparkle className="absolute left-1/2 top-1/2 hidden size-6 -translate-x-1/2 -translate-y-1/2 text-white/80 sm:block" />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            {onAboutPage ? (
              <Button href={profile.resumeUrl} download icon={<Download size={16} />}>
                Download résumé
              </Button>
            ) : (
              <Button href="/about" icon={<ArrowRight size={16} />}>
                More about me
              </Button>
            )}
            <div className="leading-tight">
              <p className="font-display text-h4 font-semibold">{profile.name}</p>
              <p className="text-label text-muted">{profile.role}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
