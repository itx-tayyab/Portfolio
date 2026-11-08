import type { Metadata } from "next";
import { Mail, MapPin, Send, UserRound } from "lucide-react";
import { profile } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { ContactForm } from "@/components/contact/ContactForm";
import { contactConfig } from "./config";

const description =
  "Get in touch with Tayyab Tariq about a web, mobile or backend project, or a full-time role.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact | Tayyab Tariq", description, url: "/contact" },
};

function InfoCard({ icon: Icon, title, children }: { icon: typeof Mail; title: string; children: React.ReactNode }) {
  return (
    <li className="flex flex-col items-center rounded-card bg-page px-6 py-9 text-center shadow-[0_10px_40px_-18px_rgb(20_20_20/0.25)]">
      <Icon aria-hidden="true" size={46} strokeWidth={1.3} className="text-brand" />
      <h2 className="mt-5 font-display text-h4 font-semibold">{title}</h2>
      <div className="mt-2 text-label text-muted">{children}</div>
    </li>
  );
}

/** Shown when delivery isn't configured: no form, so nothing can fake a send. */
function EmailFallback() {
  return (
    <div>
      <p className="max-w-[46ch] text-muted">
        Tell me what you’re building, roughly when, and anything I should know. Email is the
        fastest way to reach me.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button href={`mailto:${profile.email}`} variant="dark" icon={<Send size={16} />}>
          Write an email
        </Button>
        <CopyButton value={profile.email} label="email address" />
      </div>
    </div>
  );
}

export default function ContactPage() {
  const formEnabled = contactConfig() !== null;

  return (
    <div>
      <Container className="pt-14 text-center md:pt-20">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="mx-auto mt-3 max-w-[20ch] font-display text-h1 font-semibold">
          Let’s Talk About Your Project
        </h1>
      </Container>

      <Container className="mt-12">
        <ul className="grid gap-6 md:grid-cols-3">
          <InfoCard icon={MapPin} title="Location">
            <p>{profile.location}</p>
            <p>{profile.remote ? "Open to remote work" : null}</p>
          </InfoCard>
          <InfoCard icon={Mail} title="Email Address">
            <a href={`mailto:${profile.email}`} className="inline-flex min-h-11 items-center underline-offset-4 hover:text-brand-text hover:underline">
              {profile.email}
            </a>
            <p>I reply by email</p>
          </InfoCard>
          <InfoCard icon={UserRound} title="Profiles">
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline-offset-4 hover:text-brand-text hover:underline">
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <span aria-hidden="true"> · </span>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline-offset-4 hover:text-brand-text hover:underline">
              GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </InfoCard>
        </ul>
      </Container>

      <Container className="mt-16 md:mt-20">
        <div className="grid gap-10 rounded-band bg-page p-5 shadow-[0_10px_40px_-18px_rgb(20_20_20/0.25)] sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-10">
          <div className="relative min-h-72 overflow-hidden rounded-card bg-surface lg:col-span-5">
            <iframe
              title="Map of Lahore, Pakistan"
              src="https://www.openstreetmap.org/export/embed.html?bbox=74.20%2C31.42%2C74.46%2C31.62&layer=mapnik&marker=31.5204%2C74.3587"
              loading="lazy"
              referrerPolicy="no-referrer"
              className="absolute inset-0 size-full border-0"
            />
          </div>
          <div className="lg:col-span-7 lg:py-4">
            <Eyebrow>Get in touch</Eyebrow>
            <h2 className="mb-8 mt-3 font-display text-h2 font-semibold">Send Me A Message</h2>
            {formEnabled ? <ContactForm /> : <EmailFallback />}
          </div>
        </div>
      </Container>
    </div>
  );
}
