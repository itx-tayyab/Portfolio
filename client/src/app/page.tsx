import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { AboutIntro } from "@/components/home/AboutIntro";
import { Services } from "@/components/home/Services";
import { WhyChoose } from "@/components/home/WhyChoose";
import { RecentWork } from "@/components/home/RecentWork";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: `${profile.name}, ${profile.role}`,
    description: profile.summary,
    url: "/",
  },
};

/** Home, in the order of the reference designs. */
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <AboutIntro />
      <Services />
      <WhyChoose />
      <RecentWork />
    </>
  );
}
