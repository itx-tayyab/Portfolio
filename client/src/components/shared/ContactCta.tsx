import { Mail, Send } from "lucide-react";
import { profile } from "@/data/profile";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

/**
 * Closing call to action, shared by Home, Work and Services. Built from the
 * existing dark band, eyebrow and buttons; the copy reuses lines already on
 * the site (contact page heading and header button).
 */
export function ContactCta() {
  return (
    <Section tone="dark" shape="band" aria-labelledby="cta-title" className="mt-20 md:mt-28">
      <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Eyebrow tone="dark">Get in touch</Eyebrow>
          <h2 id="cta-title" className="mt-3 font-display text-h2 font-semibold">
            Let’s Talk About Your Project
          </h2>
          <p className="mt-5 max-w-[50ch] text-muted-dark">
            Tell me what you’re building, roughly when, and anything I should know.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
          <Button href="/contact" icon={<Send size={16} />}>
            Let’s talk
          </Button>
          <Button href={`mailto:${profile.email}`} variant="secondary" icon={<Mail size={16} />}>
            Email me
          </Button>
        </div>
      </div>
    </Section>
  );
}
