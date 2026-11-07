import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Container className="py-24 md:py-36">
      <p className="text-label text-stone">404</p>
      <h1 className="mt-4 max-w-[18ch] font-display text-h1">This page doesn’t exist.</h1>
      <p className="mt-6 max-w-[52ch] text-lead text-stone">
        The link may be out of date, or the address may have a typo. The project you were
        looking for is probably on the work page.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-6">
        <Button href="/projects" icon={<ArrowRight size={18} />}>
          See all work
        </Button>
        <ArrowLink href="/">Go to the home page</ArrowLink>
      </div>
    </Container>
  );
}
