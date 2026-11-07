import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Tag } from "@/components/ui/Tag";
import { StatusDot } from "@/components/ui/StatusDot";
import { CopyButton } from "@/components/ui/CopyButton";
import { MediaFrame, NotchButton } from "@/components/ui/MediaFrame";
import { profile } from "@/data/profile";

/**
 * Design-system kitchen sink. Development only: every primitive in every
 * state, on both ink and bone surfaces. Returns 404 in production builds.
 */
export const metadata: Metadata = {
  title: "Kitchen sink",
  robots: { index: false, follow: false },
};

const swatches = [
  { name: "ink", hex: "#151311", className: "bg-ink" },
  { name: "ink-raised", hex: "#1F1C19", className: "bg-ink-raised" },
  { name: "line", hex: "#34302B", className: "bg-line" },
  { name: "stone", hex: "#A69D92", className: "bg-stone" },
  { name: "bone", hex: "#F1ECE4", className: "bg-bone" },
  { name: "signal", hex: "#FF5B1F", className: "bg-signal" },
];

const typeScale = [
  { token: "text-display", sample: "I build the backend" },
  { token: "text-h1", sample: "Selected work" },
  { token: "text-h2", sample: "How I work on a project" },
  { token: "text-h3", sample: "Harmoni" },
  { token: "text-h4", sample: "Real-time messaging" },
  { token: "text-lead", sample: "A lead paragraph sets up a section in one or two sentences." },
  { token: "text-body", sample: "Body copy stays at 16px with 1.6 leading and a measure under 70 characters." },
  { token: "text-label", sample: "Labels are sentence case at 14px" },
];

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-4 border-t border-current/15 py-6 md:grid-cols-12">
      <p className="text-label opacity-70 md:col-span-3">{label}</p>
      <div className="flex flex-wrap items-center gap-4 md:col-span-9">{children}</div>
    </div>
  );
}

function Primitives() {
  return (
    <>
      <Row label="Button / primary">
        <Button href="/projects" icon={<ArrowRight size={18} />}>See the work</Button>
        <Button>Primary</Button>
        <Button size="sm" icon={<ArrowRight size={16} />}>Small with knob</Button>
        <Button disabled>Disabled</Button>
      </Row>
      <Row label="Button / secondary & ghost">
        <Button variant="secondary" href={profile.resumeUrl} download icon={<Download size={18} />}>
          Download résumé
        </Button>
        <Button variant="secondary" size="sm">Secondary small</Button>
        <Button variant="ghost">Ghost</Button>
      </Row>
      <Row label="ArrowLink">
        <ArrowLink href="/projects">All projects</ArrowLink>
        <ArrowLink href={profile.links.github} external>GitHub</ArrowLink>
      </Row>
      <Row label="Tag">
        {["NestJS", "Next.js", "PostgreSQL", "Socket.io"].map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </Row>
      <Row label="StatusDot">
        <StatusDot>{profile.availability.label}</StatusDot>
        <StatusDot state="idle">Not taking new work</StatusDot>
      </Row>
      <Row label="CopyButton">
        <span className="font-medium">{profile.email}</span>
        <CopyButton value={profile.email} label="email address" />
      </Row>
    </>
  );
}

export default function KitchenPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className="pt-8">
      <Section spacing="compact">
        <SectionHead
          as="h1"
          title="Kitchen sink"
          intro="Every primitive and token in the Signal system. Development only."
        />

        <h2 className="mb-6 font-display text-h3">Color</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {swatches.map((s) => (
            <div key={s.name} className="overflow-hidden rounded-card border border-line">
              <div className={`h-20 ${s.className}`} />
              <div className="p-3 text-label">
                <p className="font-medium">{s.name}</p>
                <p className="text-stone">{s.hex}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mb-6 mt-16 font-display text-h3">Type</h2>
        <div>
          {typeScale.map(({ token, sample }) => (
            <div key={token} className="grid gap-2 border-t border-line py-5 md:grid-cols-12 md:items-baseline">
              <p className="text-label text-stone md:col-span-2">{token}</p>
              <p
                className={`md:col-span-10 ${token} ${
                  token.startsWith("text-h") || token === "text-display" ? "font-display" : ""
                }`}
              >
                {sample}
              </p>
            </div>
          ))}
        </div>

        <h2 className="mb-2 mt-16 font-display text-h3">Primitives on ink</h2>
        <Primitives />
      </Section>

      <Section tone="bone" shape="band" spacing="compact">
        <SectionHead
          title="Primitives on bone"
          intro="The bone surface is used for case-study reading panels and the contact container."
        />
        <Primitives />
      </Section>

      <Section spacing="compact">
        <SectionHead
          title="Media frame and notch"
          intro="The notch is reserved for project tiles. Hover the tile to see the knob respond."
        />
        <div className="grid gap-8 md:grid-cols-2">
          {[
            { surface: "ink" as const, wrap: "" },
            { surface: "ink-raised" as const, wrap: "rounded-band bg-ink-raised p-4" },
          ].map(({ surface, wrap }) => (
            <div key={surface} className={wrap}>
              <a href="#" className="group/tile block">
                <MediaFrame
                  surface={surface}
                  notch={
                    <NotchButton>
                      <ArrowUpRight size={22} />
                    </NotchButton>
                  }
                >
                  <Image
                    src="/images/projects/harmoni/illustration-workspace.jpg"
                    alt="Harmoni dashboard"
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-(--duration-media) ease-out group-hover/tile:scale-[1.02]"
                  />
                </MediaFrame>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-h4">Harmoni</h3>
                  <p className="text-label text-stone">on {surface}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="raised" shape="band">
        <SectionHead title="Raised band" intro="Rounded inset band, used for one emphasized section per page." />
        <Primitives />
      </Section>
    </div>
  );
}
