import type { Metadata } from "next";
import { ArrowRight, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Portrait } from "@/components/about/Portrait";
import { Timeline } from "@/components/about/Timeline";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tayyab Tariq is a full-stack developer in Lahore who designs backends in NestJS and PostgreSQL and builds the Next.js and Flutter apps on top of them.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Container className="grid items-center gap-12 pt-12 md:pt-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 className="font-display text-h1 font-semibold">Hi, I’m Tayyab.</h1>
          <div className="mt-8 max-w-[58ch] space-y-5">
            <p className="text-lead">
              I’m a full-stack developer in Lahore. I started programming to solve real
              problems, and I still care most about how things work under the hood.
            </p>
            <p className="text-lead text-stone">
              Backend architecture is where I’m happiest: designing database schemas, building
              APIs in NestJS and Node.js, and keeping them fast and secure. I put the same care
              into the interface on top, in Next.js for the web and Flutter for mobile, because
              a solid system only matters if people can use it.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button href={profile.resumeUrl} download icon={<Download size={18} />}>
              Download résumé
            </Button>
            <ArrowLink href={profile.links.linkedin} external>
              LinkedIn
            </ArrowLink>
            <ArrowLink href={profile.links.github} external>
              GitHub
            </ArrowLink>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[22rem] lg:col-span-4 lg:col-start-9 lg:mr-0 lg:max-w-[24rem]">
          <Portrait />
        </div>
      </Container>

      <Timeline />

      <Container className="pb-20 md:pb-28">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-band bg-ink-raised p-8 md:p-12">
          <p className="max-w-[30ch] font-display text-h3 font-semibold">
            See how this plays out in real projects.
          </p>
          <Button href="/projects" variant="secondary" icon={<ArrowRight size={18} />}>
            See the work
          </Button>
        </div>
      </Container>
    </>
  );
}
