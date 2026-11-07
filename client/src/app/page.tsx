import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { Hero } from "@/components/sections/Hero";
import { StackMarquee } from "@/components/sections/StackMarquee";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { StackList } from "@/components/sections/StackList";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: `${profile.name}, ${profile.role}`,
    description: profile.summary,
    url: "/",
  },
};

/**
 * Home. A server component: the only client code is the marquee's pause
 * button. The footer (in the layout) is the closing call to action, so the
 * page doesn't repeat one.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <StackMarquee />
      <SelectedWork />
      <StackList />
      <div className="h-20 md:h-28" aria-hidden="true" />
    </>
  );
}
