import type { ComponentType } from "react";
import {
  SiDocker,
  SiExpress,
  SiJsonwebtokens,
  SiNestjs,
  SiNextdotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRedis,
  SiRedux,
  SiShadcnui,
  SiSocketdotio,
  SiTailwindcss,
  SiTypescript,
  SiVitest,
} from "react-icons/si";
import { Code2, FlaskConical, GraduationCap, MonitorPlay } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";

type TechIcon = ComponentType<{ className?: string }>;

const techIcons: Record<string, TechIcon> = {
  "Next.js": SiNextdotjs,
  NestJS: SiNestjs,
  PostgreSQL: SiPostgresql,
  Prisma: SiPrisma,
  "Socket.io": SiSocketdotio,
  Redis: SiRedis,
  Redux: SiRedux,
  Docker: SiDocker,
  "shadcn/ui": SiShadcnui,
  TypeScript: SiTypescript,
  React: SiReact,
  "Tailwind CSS": SiTailwindcss,
  "Express.js": SiExpress,
  Vitest: SiVitest,
  JWT: SiJsonwebtokens,
  Supertest: FlaskConical,
  Playwright: MonitorPlay,
  EdTech: GraduationCap,
};

const techUsage: Record<string, string> = {
  "Next.js": "App Router pages, server content and the client UI.",
  NestJS: "REST APIs, guards, validation and WebSocket gateways.",
  PostgreSQL: "Relational data, tenant scoping and transactions.",
  Prisma: "Typed schema, migrations and relation queries.",
  "Socket.io": "Real-time rooms and live project updates.",
  Redis: "Cache and cross-instance event fan-out.",
  Redux: "Client state for data-heavy workflows.",
  Docker: "Reproducible environments and deployment.",
  "shadcn/ui": "Accessible primitives styled with Tailwind.",
  TypeScript: "End-to-end types across the API and UI.",
  React: "Interactive components and stateful screens.",
  "Tailwind CSS": "Responsive layouts from shared design tokens.",
  "Express.js": "REST routes, middleware and JWT handling.",
  Vitest: "Unit and integration tests for app logic.",
  JWT: "Token auth and protected route access.",
  Supertest: "HTTP-level tests against real routes.",
  Playwright: "End-to-end tests for critical journeys.",
  EdTech: "School workflows, records and exams.",
};

export function TechStack({ stack, projectTitle }: { stack: string[]; projectTitle: string }) {
  return (
    <Section spacing="none" aria-labelledby="tech-stack-title">
      <SectionHead
        id="tech-stack-title"
        eyebrow="Built with"
        title="Tech Stack & Tools"
        intro={`The tools and platforms behind ${projectTitle}.`}
        compact
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {stack.map((tech, index) => {
          const Icon = techIcons[tech] ?? Code2;
          const usage = techUsage[tech] ?? `Used in ${projectTitle} as part of the implementation.`;
          const tooltipId = `tech-stack-tip-${index}`;

          return (
            <div
              key={tech}
              tabIndex={0}
              aria-describedby={tooltipId}
              className="group relative"
            >
              <div className="flex flex-col items-center justify-center gap-2 rounded-media border border-line bg-surface/60 p-4 transition-all duration-300 group-hover:z-10 group-hover:scale-110 group-hover:border-brand/60 group-hover:bg-page group-hover:shadow-md group-focus-within:z-10 group-focus-within:scale-110 group-focus-within:border-brand/60 group-focus-within:bg-page group-focus-within:shadow-md">
                <span
                  aria-hidden="true"
                  className="text-ink transition-colors duration-300 group-hover:text-brand group-focus-within:text-brand"
                >
                  <Icon className="size-7" />
                </span>
                <span className="text-center font-display text-[0.75rem] font-semibold leading-tight">
                  {tech}
                </span>
              </div>

              <div
                id={tooltipId}
                role="tooltip"
                className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 hidden w-56 -translate-x-1/2 rounded-media border border-line-dark bg-ink p-3 text-label text-white opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 sm:block"
              >
                <p className="font-display font-semibold">{tech}</p>
                <p className="mt-1 text-[0.75rem] leading-snug text-muted-dark">{usage}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
