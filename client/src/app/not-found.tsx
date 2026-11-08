import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Container className="py-24 text-center md:py-32">
      <p aria-hidden="true" className="font-display text-[clamp(6rem,4rem+10vw,12rem)] font-semibold leading-none text-[#ececf0]">
        404<span className="text-brand">.</span>
      </p>
      <Eyebrow className="mt-6">Page not found</Eyebrow>
      <h1 className="mx-auto mt-3 max-w-[22ch] font-display text-h2 font-semibold">This Page Doesn’t Exist</h1>
      <p className="mx-auto mt-5 max-w-[50ch] text-muted">
        The link may be out of date, or the address may have a typo. The project you were looking
        for is probably on the work page.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button href="/projects" icon={<ArrowRight size={16} />}>
          See all work
        </Button>
        <Button href="/" variant="secondary">
          Go home
        </Button>
      </div>
    </Container>
  );
}
