import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CalendarCheck, Mail, MapPin, UserRound } from "lucide-react";
import { profile } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactActions } from "@/components/contact/ContactActions";
import { ContactForm } from "@/components/contact/ContactForm";
import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/reveal";
import { contactConfig } from "./config";

const description =
  "Get in touch with Tayyab Tariq about a web, backend or automation project, or a full-time role.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact | Tayyab Tariq", description, url: "/contact" },
};

function InfoCard({
  icon: Icon,
  title,
  iconClassName,
  children,
}: {
  icon: typeof Mail;
  title: string;
  iconClassName?: string;
  children: ReactNode;
}) {
  return (
    <li
      className="group/card flex flex-col items-center rounded-card border border-transparent bg-page px-6 py-9 text-center shadow-[0_10px_40px_-18px_rgb(20_20_20/0.25)] transition-all duration-300 ease-out will-change-transform hover:-translate-y-2 hover:border-brand/50 hover:shadow-xl"
      data-reveal=""
    >
      <Icon
        aria-hidden="true"
        size={46}
        strokeWidth={1.3}
        className={cn("text-brand transition-transform duration-300", iconClassName)}
      />
      <h2 className="mt-5 font-display text-h4 font-semibold">{title}</h2>
      <div className="mt-2 text-label text-muted">{children}</div>
    </li>
  );
}

/** Shown when delivery isn't configured: no form, so nothing can fake a send. */
function EmailFallback() {
  return (
    <p className="max-w-[46ch] text-muted">
      Tell me what you’re building, roughly when, and anything I should know. Email is the
      fastest way to reach me.
    </p>
  );
}

export default function ContactPage() {
  const formEnabled = contactConfig() !== null;

  return (
    <div>
      <Container className="pt-14 text-center md:pt-20" data-reveal="">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="mx-auto mt-3 max-w-[20ch] font-display text-h1 font-semibold">
          Let’s Talk About Your Project
        </h1>
      </Container>

      <Container className="mt-12">
        <div className="grid gap-10 rounded-band bg-page p-5 shadow-[0_10px_40px_-18px_rgb(20_20_20/0.25)] sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-10">
          <div className="relative min-h-72 overflow-hidden rounded-card bg-surface lg:col-span-5" data-reveal="">
            <iframe
              title="Map of Lahore, Pakistan"
              src="https://www.openstreetmap.org/export/embed.html?bbox=74.2287%2C31.4204%2C74.4887%2C31.6204&layer=mapnik"
              loading="lazy"
              referrerPolicy="no-referrer"
              className="absolute inset-0 size-full border-0"
            />
            {/* The embed can't animate its own marker, so this pin sits over the city centre. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-full"
            >
              <span className="absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-success-ink/25 motion-safe:animate-ping motion-reduce:animate-none" />
              <span className="relative block motion-safe:animate-pin-bounce motion-reduce:animate-none">
                <MapPin
                  className="size-10 text-success-ink drop-shadow-[0_6px_14px_rgb(0_0_0/0.4)]"
                  fill="currentColor"
                  strokeWidth={1.2}
                />
                <span className="absolute left-1/2 top-[40%] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
              </span>
            </div>
            <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-white/95 px-3 py-1 font-display text-label font-semibold text-ink shadow-sm">
              Lahore, Pakistan
            </span>
          </div>
          <div className="lg:col-span-7 lg:py-4" data-reveal="" style={revealDelay(90)}>
            <Eyebrow>Get in touch</Eyebrow>
            <h2 className="mb-8 mt-3 font-display text-h2 font-semibold">Send Me A Message</h2>
            {formEnabled ? <ContactForm /> : <EmailFallback />}
            <ContactActions className="mt-8" />
          </div>
        </div>
      </Container>

      <Container className="mt-16 md:mt-20">
        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <InfoCard
            icon={Mail}
            title="Email Address"
            iconClassName="group-hover/card:-rotate-12"
          >
            <a href={`mailto:${profile.email}`} className="inline-flex min-h-11 items-center underline-offset-4 hover:text-brand-text hover:underline">
              {profile.email}
            </a>
            <p>I reply by email</p>
          </InfoCard>
          <InfoCard
            icon={UserRound}
            title="Profiles"
            iconClassName="group-hover/card:scale-110"
          >
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex min-h-11 items-center font-medium text-ink transition-colors duration-300 hover:text-brand-text"
            >
              <span className="relative">
                LinkedIn
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-brand transition-transform duration-300 ease-out group-hover/link:scale-x-100"
                />
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <span aria-hidden="true"> · </span>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex min-h-11 items-center font-medium text-ink transition-colors duration-300 hover:text-brand-text"
            >
              <span className="relative">
                GitHub
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-brand transition-transform duration-300 ease-out group-hover/link:scale-x-100"
                />
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </InfoCard>
          {profile.availability.open ? (
            <InfoCard
              icon={CalendarCheck}
              title="Availability"
              iconClassName="group-hover/card:rotate-6"
            >
              <p>{profile.availability.label}</p>
            </InfoCard>
          ) : null}
          <InfoCard
            icon={MapPin}
            title="Location"
            iconClassName="group-hover/card:animate-pulse motion-reduce:animate-none"
          >
            <p>Lahore, Pakistan</p>
            <p>{profile.remote ? "Open to remote work" : null}</p>
          </InfoCard>
        </ul>
      </Container>
    </div>
  );
}
