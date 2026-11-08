import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { CopyButton } from "@/components/ui/CopyButton";
import { Logo } from "./Logo";
import { navItems } from "./nav";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-h4 font-semibold">{title}</h2>
      <div className="mt-5">{children}</div>
    </div>
  );
}

/** Dark footer in the reference template's style: brand, links, contact. */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark mt-20 bg-ink text-white md:mt-28">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-[36ch] text-muted-dark">
              Full-stack developer building NestJS and Node.js backends, Next.js interfaces and
              Flutter apps.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="grid size-11 place-items-center rounded-full bg-ink-2 font-display text-label font-semibold transition-colors duration-(--duration-ui) ease-out hover:bg-brand-strong"
              >
                <Github aria-hidden="true" size={18} />
                <span className="sr-only">GitHub (opens in a new tab)</span>
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="grid size-11 place-items-center rounded-full bg-ink-2 font-display text-label font-semibold transition-colors duration-(--duration-ui) ease-out hover:bg-brand-strong"
              >
                <Linkedin aria-hidden="true" size={18} />
                <span className="sr-only">LinkedIn (opens in a new tab)</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <Column title="Quick links">
              <ul>
                {navItems.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="group/f inline-flex min-h-11 items-center gap-2 text-muted-dark transition-colors duration-(--duration-ui) ease-out hover:text-brand">
                      <ArrowRight aria-hidden="true" size={14} className="text-brand" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Column>
          </div>

          <div className="lg:col-span-3">
            <Column title="Services">
              <ul>
                {services.map((s) => (
                  <li key={s.id}>
                    <Link href={`/#${s.id}`} className="inline-flex min-h-11 items-center gap-2 text-muted-dark transition-colors duration-(--duration-ui) ease-out hover:text-brand">
                      <ArrowRight aria-hidden="true" size={14} className="text-brand" />
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Column>
          </div>

          <div className="lg:col-span-3">
            <Column title="Get in touch">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <Mail size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-label font-semibold">Email</span>
                    <a href={`mailto:${profile.email}`} className="inline-flex min-h-11 items-center break-all text-muted-dark underline-offset-4 hover:text-brand hover:underline">
                      {profile.email}
                    </a>
                    <CopyButton value={profile.email} label="email address" className="mt-2 border-white/30" />
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <MapPin size={18} />
                  </span>
                  <span>
                    <span className="block font-display text-label font-semibold">Location</span>
                    <span className="text-muted-dark">
                      {profile.location}
                      {profile.remote ? ", open to remote work" : ""}
                    </span>
                  </span>
                </li>
              </ul>
            </Column>
          </div>
        </div>
      </Container>
      <div className="border-t border-line-dark">
        <Container className="flex flex-wrap items-center justify-between gap-3 py-6 text-label text-muted-dark">
          <p>© {year} {profile.name}. All rights reserved.</p>
          <p>Built with Next.js and Tailwind CSS.</p>
        </Container>
      </div>
    </footer>
  );
}
