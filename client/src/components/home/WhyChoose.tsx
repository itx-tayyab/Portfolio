import Image from "next/image";
import { Compass, MessagesSquare, Wrench } from "lucide-react";
import { projects } from "@/data/projects";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";

const reasons = [
  {
    icon: Compass,
    title: "Architecture Before Screens",
    text: "I plan the data model and API first, so features don’t fight the structure later.",
  },
  {
    icon: MessagesSquare,
    title: "Clear Communication",
    text: "Plain updates on what’s done, what’s next and what needs your decision.",
  },
  {
    icon: Wrench,
    title: "Code You Can Maintain",
    text: "Typed, documented code with sensible structure that the next developer can pick up.",
  },
];

/**
 * Dark rounded band with thick orange arcs at its edges, after reference
 * image 4: image card with an orange gradient and a big stat, then
 * eyebrow, heading, intro and three reasons separated by hairlines.
 */
export function WhyChoose() {
  return (
    <Section tone="dark" shape="band" aria-labelledby="why-title" className="mt-20 md:mt-28">
      {/* Orange arcs bleeding off the band's edges */}
      <span aria-hidden="true" className="pointer-events-none absolute -left-[26rem] -top-16 size-[34rem] rounded-full border-[2.75rem] border-brand max-lg:hidden" style={{ marginLeft: "calc(-1 * max(0px, (100vw - 77.5rem) / 2))" }} />
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-[27rem] -right-[24rem] size-[34rem] rounded-full border-[2.75rem] border-brand max-lg:hidden" style={{ marginRight: "calc(-1 * max(0px, (100vw - 77.5rem) / 2))" }} />

      <div className="relative grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative aspect-[4/3.6] overflow-hidden rounded-media lg:col-span-5">
          <Image
            src="/images/projects/harmoni/illustration-workspace.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 30rem, 100vw"
            className="object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand via-brand/55 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-5 p-8">
            <span className="font-display text-[5.5rem] font-semibold leading-none">
              {String(projects.length).padStart(2, "0")}
            </span>
            <span className="max-w-[12ch] font-display text-label font-medium leading-snug">
              Projects built end to end
            </span>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Eyebrow tone="dark">Why work with me</Eyebrow>
          <h2 id="why-title" className="mt-3 font-display text-h2 font-semibold">
            Why Teams Choose Me To Build Their Products
          </h2>
          <p className="mt-5 max-w-[56ch] text-muted-dark">
            I care about the parts users never see as much as the parts they do. That’s what keeps a
            product fast, secure and easy to change.
          </p>
          <ul className="mt-8">
            {reasons.map(({ icon: Icon, title, text }) => (
              <li key={title} className="grid items-center gap-4 border-b border-line-dark py-6 first:pt-0 last:border-b-0 sm:grid-cols-[auto_1fr_1fr] sm:gap-6">
                <span aria-hidden="true" className="grid size-14 place-items-center rounded-full border border-line-dark bg-ink-2 text-brand">
                  <Icon size={24} />
                </span>
                <h3 className="font-display text-h4 font-semibold">{title}</h3>
                <p className="text-label text-muted-dark">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
