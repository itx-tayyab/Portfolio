import type { Metadata } from "next";
import { services } from "@/data/services";
import { serviceOfferings, servicesFaq } from "@/data/sections";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { ServiceSection } from "@/components/services/ServiceSection";
import { WorkingProcess } from "@/components/services/WorkingProcess";
import { Faq } from "@/components/shared/Faq";
import { ContactCta } from "@/components/shared/ContactCta";

const description =
  "Backend, full-stack and web development and workflow automation by Tayyab Tariq. From a single API to a complete product.";

export const metadata: Metadata = {
  title: "Services",
  description,
  alternates: { canonical: "/services" },
  openGraph: { title: "Services | Tayyab Tariq", description, url: "/services" },
};

/** Order on the page. Ids are from data/services.ts. */
const order: { id: string; category: string }[] = [
  { id: "backend-apis", category: "Backend development" },
  { id: "full-stack", category: "Full-stack development" },
  { id: "web-development", category: "Frontend development" },
  { id: "automation", category: "Automation" },
];

export default function ServicesPage() {
  const sections = order.flatMap(({ id, category }) => {
    const service = services.find((s) => s.id === id);
    return service ? [{ service, category }] : [];
  });

  return (
    <>
      <Section spacing="compact" className="pt-14 md:pt-20">
        <SectionHead
          as="h1"
          eyebrow="My services"
          title="What I Offer To Teams And Founders"
          intro="From a single API to a complete product, I build the backend and the interface together so they fit."
          className="mb-0 md:mb-0"
        />
      </Section>

      {sections.map(({ service, category }, i) => (
        <ServiceSection
          key={service.id}
          service={service}
          category={category}
          offerings={serviceOfferings[service.id] ?? []}
          index={i}
        />
      ))}

      <WorkingProcess />

      <Section aria-labelledby="faq-title">
        <SectionHead
          id="faq-title"
          eyebrow={servicesFaq.eyebrow}
          title={servicesFaq.heading}
          intro={servicesFaq.intro}
        />
        <Faq items={servicesFaq.items} />
      </Section>

      <ContactCta />
    </>
  );
}
