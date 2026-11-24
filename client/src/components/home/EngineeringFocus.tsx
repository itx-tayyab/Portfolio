import { Globe, Layers, Server } from "lucide-react";
import { engineeringFocus } from "@/data/sections";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { revealDelay } from "@/lib/reveal";

const icons = { backend: Server, fullstack: Layers, web: Globe };

/** Short overview of the main development areas. Details live on /services. */
export function EngineeringFocus() {
  return (
    <Section tone="surface" shape="band" aria-labelledby="focus-title">
      <SectionHead
        id="focus-title"
        eyebrow={engineeringFocus.eyebrow}
        title={engineeringFocus.heading}
        intro={engineeringFocus.intro}
      />
      <ul className="grid gap-6 md:grid-cols-3">
        {engineeringFocus.items.map((area, i) => {
          const Icon = icons[area.icon];
          return (
            <li
              key={area.id}
              data-reveal=""
              style={revealDelay(i * 90)}
              className="group/focus relative flex flex-col rounded-card bg-page p-7 transition-all duration-300 ease-out will-change-transform hover:-translate-y-2 hover:shadow-[0_24px_48px_-24px_rgb(244_91_22/0.4)] md:p-9"
            >
              <Icon
                aria-hidden="true"
                size={44}
                strokeWidth={1.3}
                className="text-brand transition-transform duration-300 ease-out group-hover/focus:-rotate-3 group-hover/focus:scale-110"
              />
              <h3 className="mt-6 font-display text-h4 font-semibold">{area.title}</h3>
              <p className="mt-3 text-label text-muted">{area.text}</p>
            </li>
          );
        })}
      </ul>
      <div className="mt-10 flex justify-center">
        <ArrowLink href="/services">
          See all services<span className="sr-only"> on the services page</span>
        </ArrowLink>
      </div>
    </Section>
  );
}
