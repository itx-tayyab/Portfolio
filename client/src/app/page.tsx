import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { RecentWork } from "@/components/home/RecentWork";
import { EngineeringFocus } from "@/components/home/EngineeringFocus";
import { TechnicalApproach } from "@/components/home/TechnicalApproach";
import { CurrentlyExploring } from "@/components/home/CurrentlyExploring";
import { ContactCta } from "@/components/shared/ContactCta";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: `${profile.name}, ${profile.role}`,
    description: profile.summary,
    url: "/",
  },
};

/**
 * Home: a short overview that points to the other pages. The marquee band
 * stays with the hero as part of its composition.
 */
export default function Home() {
  return (
    <>
      {/* Hero + marquee fill the first screen below the sticky header
          (5.25rem from lg). svh keeps mobile browser toolbars from cutting
          the band. Below lg the hero takes its natural height. */}
      <div className="flex flex-col lg:min-h-[calc(100svh-5.25rem)]">
        <Hero />
        <Marquee />
      </div>
      <RecentWork />
      <EngineeringFocus />
      <TechnicalApproach />
      <CurrentlyExploring />
      <ContactCta />
    </>
  );
}
