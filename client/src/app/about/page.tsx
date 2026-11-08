import type { Metadata } from "next";
import { AboutIntro } from "@/components/home/AboutIntro";
import { WhyChoose } from "@/components/home/WhyChoose";
import { Timeline } from "@/components/about/Timeline";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tayyab Tariq is a full-stack developer in Lahore who designs backends in NestJS and PostgreSQL and builds the Next.js and Flutter apps on top of them.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Tayyab Tariq",
    description:
      "Tayyab Tariq is a full-stack developer in Lahore who designs backends in NestJS and PostgreSQL and builds the Next.js and Flutter apps on top of them.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutIntro headingLevel="h1" />
      <Timeline />
      <WhyChoose />
    </>
  );
}
