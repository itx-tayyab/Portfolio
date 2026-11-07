import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { CopyButton } from "@/components/ui/CopyButton";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { StatusDot } from "@/components/ui/StatusDot";
import { ContactForm } from "@/components/contact/ContactForm";
import { contactConfig } from "./config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Tayyab Tariq about a web, mobile or backend project, or a full-time role.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Tayyab Tariq",
    description: "Get in touch with Tayyab Tariq about a web, mobile or backend project, or a full-time role.",
    url: "/contact",
  },
};

function Details() {
  return (
    <div className="space-y-10">
      <StatusDot state={profile.availability.open ? "live" : "idle"} className="text-ink">
        {profile.availability.label}
      </StatusDot>

      <div>
        <h2 className="text-label text-stone-dark">Email</h2>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="inline-block break-all py-2 font-display text-h4 font-semibold underline decoration-ink/30 decoration-2 underline-offset-[0.25em] transition-[text-decoration-color] duration-(--duration-ui) ease-out hover:decoration-ink"
          >
            {profile.email}
          </a>
          <CopyButton value={profile.email} label="email address" />
        </div>
      </div>

      <div>
        <h2 className="text-label text-stone-dark">Elsewhere</h2>
        <ul className="mt-2 space-y-1">
          <li className="flex min-h-11 items-center">
            <ArrowLink href={profile.links.linkedin} external>LinkedIn</ArrowLink>
          </li>
          <li className="flex min-h-11 items-center">
            <ArrowLink href={profile.links.github} external>GitHub</ArrowLink>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-label text-stone-dark">Based in</h2>
        <p className="mt-2">
          {profile.location}
          {profile.remote ? ". Open to remote work." : "."}
        </p>
      </div>
    </div>
  );
}

/** Shown when delivery isn't configured: no form, so nothing can fake a send. */
function EmailFallback() {
  return (
    <div className="flex h-full flex-col justify-center rounded-media border border-ink/15 p-8">
      <p className="font-display text-h3 font-semibold">Email is the fastest way to reach me.</p>
      <p className="mt-3 max-w-[44ch] text-stone-dark">
        Tell me what you’re building, roughly when, and anything I should know.
      </p>
      <a
        href={`mailto:${profile.email}`}
        className="mt-8 inline-flex min-h-12 w-fit items-center rounded-full bg-ink px-6 font-medium text-bone transition-colors duration-(--duration-ui) ease-out hover:bg-ink-raised"
      >
        Write an email
      </a>
    </div>
  );
}

export default function ContactPage() {
  const formEnabled = contactConfig() !== null;

  return (
    <>
      <Container className="pt-12 md:pt-20">
        <h1 className="max-w-[16ch] font-display text-h1 font-semibold">
          Let’s talk about what you’re building.
        </h1>
        <p className="mt-6 max-w-[52ch] text-lead text-stone">
          Freelance projects, full-time roles or a question about my work: send a message and I’ll
          get back to you by email.
        </p>
      </Container>

      <section aria-label="Contact details and form" className="px-2 py-14 sm:px-4 md:py-20">
        <div className="mx-auto max-w-[calc(var(--container-page)+4rem)] rounded-band bg-bone text-ink [--focus-ring:var(--color-ink)]">
          <Container className="grid gap-12 py-12 md:py-16 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Details />
            </div>
            <div className="lg:col-span-7">
              {formEnabled ? (
                <>
                  <h2 className="sr-only">Send a message</h2>
                  <ContactForm />
                </>
              ) : (
                <EmailFallback />
              )}
            </div>
          </Container>
        </div>
      </section>
    </>
  );
}
