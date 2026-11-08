import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Globe, Layers, Plus, Server, Smartphone } from "lucide-react";
import { services, type Service } from "@/data/services";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";

const icons: Record<Service["icon"], typeof Globe> = {
  web: Globe,
  mobile: Smartphone,
  backend: Server,
  fullstack: Layers,
};

/**
 * Numbered service cards on a rounded grey band, after reference image 3:
 * line icon, big faint number with an orange dot, title, text, image, a
 * "Read more" link and a notched corner holding a black "+" button.
 */
export function Services() {
  return (
    <Section id="services" tone="surface" shape="band" aria-labelledby="services-title" className="scroll-mt-24">
      <SectionHead
        id="services-title"
        eyebrow="My services"
        title="What I Offer To Teams And Founders"
        intro="From a single API to a complete product, I build the backend and the interface together so they fit."
      />
      <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {services.map((s) => {
          const Icon = icons[s.icon];
          return (
            <li key={s.id} id={s.id} className="scroll-mt-28">
              <Link
                href={s.link.href}
                className="group/card relative flex h-full flex-col rounded-card bg-page px-6 pt-7 [--notch-bg:var(--color-surface)]"
              >
                <div className="flex items-start justify-between">
                  <Icon aria-hidden="true" size={44} strokeWidth={1.3} className="text-brand" />
                  {/* Decorative ghost number (reference). Drawn with generated
                      content so it isn't treated as low-contrast text. */}
                  <span
                    aria-hidden="true"
                    data-n={s.number}
                    className="font-display text-[3.25rem] font-semibold leading-none text-brand before:text-[#e4e4e8] before:content-[attr(data-n)]"
                  >
                    .
                  </span>
                </div>
                <h3 className="mt-6 font-display text-h4 font-semibold">{s.title}</h3>
                <p className="mt-3 text-label text-muted">{s.description}</p>
                <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-media bg-surface">
                  <Image
                    src={s.image.src}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 16rem, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-(--duration-media) ease-out group-hover/card:scale-[1.04]"
                  />
                </div>
                <div className="flex h-20 items-center">
                  <span className="inline-flex items-center gap-1.5 font-display text-label font-semibold uppercase underline underline-offset-4">
                    Read more
                    <ArrowUpRight aria-hidden="true" size={16} className="text-brand" />
                    <span className="sr-only">: {s.link.label}</span>
                  </span>
                </div>
                <div className="notch">
                  <span aria-hidden="true" className="grid size-14 place-items-center rounded-full bg-ink text-white transition-[background-color,transform] duration-(--duration-ui) ease-out group-hover/card:rotate-90 group-hover/card:bg-brand-strong">
                    <Plus size={22} />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
