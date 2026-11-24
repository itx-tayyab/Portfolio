import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Globe, Layers, Plus, Server, Smartphone, Workflow } from "lucide-react";
import type { Service } from "@/data/services";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { revealDelay } from "@/lib/reveal";

const icons: Record<Service["icon"], typeof Globe> = {
  web: Globe,
  mobile: Smartphone,
  backend: Server,
  fullstack: Layers,
  automation: Workflow,
};

/**
 * One service as its own section: the service card's icon, ghost number,
 * image and notched "+" link, given room for a list of what's included.
 * Alternates image side and background so consecutive services read apart.
 */
export function ServiceSection({
  service,
  category,
  offerings,
  index,
}: {
  service: Service;
  /** The service category this section represents, e.g. "Backend development". */
  category: string;
  offerings: string[];
  index: number;
}) {
  const Icon = icons[service.icon];
  const flipped = index % 2 === 1;
  const headingId = `${service.id}-title`;
  return (
    <Section
      id={service.id}
      tone={flipped ? "surface" : "page"}
      shape={flipped ? "band" : "bleed"}
      aria-labelledby={headingId}
      className="scroll-mt-24"
    >
      <div className="group/service grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div
          className={flipped ? "lg:order-last lg:col-span-6 lg:col-start-7" : "lg:col-span-6"}
          data-reveal=""
        >
          <Link href={service.link.href} className="group/card block">
            <MediaFrame ratio="4 / 3" surface={flipped ? "surface" : "page"} notch={
              <span aria-hidden="true" className="grid size-14 place-items-center rounded-full bg-ink text-white transition-[background-color,transform] duration-300 ease-out group-hover/card:rotate-90 group-hover/card:scale-105 group-hover/card:bg-brand-strong">
                <Plus size={22} />
              </span>
            }>
              {service.image ? (
                <Image
                  src={service.image.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 36rem, 100vw"
                  className="object-cover transition-transform duration-300 ease-out group-hover/card:scale-105"
                />
              ) : (
                <div className="grid size-full place-items-center bg-ink">
                  <Icon aria-hidden="true" size={120} strokeWidth={1} className="text-brand transition-transform duration-300 ease-out group-hover/card:scale-105" />
                </div>
              )}
            </MediaFrame>
            <span className="sr-only">{service.link.label}</span>
          </Link>
        </div>

        <div className="lg:col-span-6" data-reveal="" style={revealDelay(90)}>
          <div className="flex items-start justify-between gap-4">
            <Icon aria-hidden="true" size={44} strokeWidth={1.3} className="text-brand" />
            <span
              aria-hidden="true"
              data-n={String(index + 1).padStart(2, "0")}
              className="font-display text-[3.25rem] font-semibold leading-none text-brand transition-[filter] duration-300 before:text-[#e4e4e8] before:transition-colors before:duration-300 before:content-[attr(data-n)] group-hover/service:drop-shadow-[0_0_12px_rgb(244_91_22/0.45)] group-hover/service:before:text-brand"
            >
              .
            </span>
          </div>
          <Eyebrow className="mt-6">{category}</Eyebrow>
          <h2 id={headingId} className="mt-3 font-display text-h2 font-semibold">
            {service.title}
          </h2>
          <p className="mt-5 max-w-[48ch] text-muted">{service.description}</p>
          <ul className="mt-8 space-y-3">
            {offerings.map((item) => (
              <li
                key={item}
                className="group/bullet -mx-2 flex gap-3 rounded-md px-2 py-1 text-ink transition-colors duration-300 hover:bg-brand/[0.04] hover:text-brand-text"
              >
                <span
                  aria-hidden="true"
                  className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-brand text-white transition-transform duration-300 group-hover/bullet:scale-110"
                >
                  <Check size={12} strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <Link
            href={service.link.href}
            className="group/link mt-8 inline-flex min-h-11 items-center gap-1.5 font-display text-label font-semibold uppercase"
          >
            <span className="relative">
              {service.link.label}
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-brand transition-transform duration-300 ease-out group-hover/link:scale-x-100"
              />
            </span>
            <ArrowUpRight
              aria-hidden="true"
              size={16}
              className="text-brand transition-transform duration-300 ease-out group-hover/link:-translate-y-1 group-hover/link:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </Section>
  );
}
