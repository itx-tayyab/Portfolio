import Link from "next/link";
import { profile } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { CopyButton } from "@/components/ui/CopyButton";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { navItems } from "./nav";

/**
 * Compact footer: one direct way to get in touch, then navigation and
 * profiles. The email itself is the call to action.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="font-display text-h3">Have something to build?</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-block break-all py-2 font-display text-h4 underline decoration-signal decoration-2 underline-offset-[0.25em] transition-colors duration-(--duration-ui) ease-out hover:text-signal"
              >
                {profile.email}
              </a>
              <CopyButton value={profile.email} label="email address" />
            </div>
          </div>

          <nav aria-label="Footer" className="md:col-span-2 md:col-start-9">
            <ul className="space-y-1">
              {navItems.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex min-h-11 items-center text-stone transition-colors duration-(--duration-ui) ease-out hover:text-bone"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="space-y-1 md:col-span-2">
            <li className="flex min-h-11 items-center">
              <ArrowLink href={profile.links.github} external>GitHub</ArrowLink>
            </li>
            <li className="flex min-h-11 items-center">
              <ArrowLink href={profile.links.linkedin} external>LinkedIn</ArrowLink>
            </li>
          </ul>
        </div>

        <p className="mt-16 text-label text-stone">
          © {year} {profile.name}. {profile.location}
          {profile.remote ? ". Open to remote work." : "."}
        </p>
      </Container>
    </footer>
  );
}
