/**
 * One list of capabilities, replacing the four overlapping lists on the old
 * site (home badges, home services, about values, about expertise).
 * Each group pairs a plain statement of what I do with the tools I use.
 */
export type StackGroup = {
  id: string;
  title: string;
  statement: string;
  tools: string[];
};

export const stack: StackGroup[] = [
  {
    id: "backend",
    title: "Backend",
    statement: "APIs and real-time services that stay fast and secure under load.",
    tools: ["Node.js", "NestJS", "Express.js", "Socket.io", "REST APIs", "JWT auth"],
  },
  {
    id: "frontend",
    title: "Frontend",
    statement: "Responsive, accessible interfaces that match the system behind them.",
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion"],
  },
  {
    id: "mobile",
    title: "Mobile",
    statement: "Cross-platform apps for Android and iOS from one codebase.",
    tools: ["Flutter", "Dart", "Provider", "MVVM"],
  },
  {
    id: "data",
    title: "Data",
    statement: "Schemas and queries designed for how the product actually reads and writes.",
    tools: ["PostgreSQL", "MySQL", "MongoDB", "Prisma", "Redis"],
  },
  {
    id: "tooling",
    title: "Tooling",
    statement: "A clean path from commit to deployment.",
    tools: ["Git", "GitHub", "Docker", "Postman", "CI/CD"],
  },
];

/** Short list for the home-page marquee. */
export const marqueeStack = [
  "Next.js",
  "NestJS",
  "Node.js",
  "PostgreSQL",
  "Flutter",
  "Socket.io",
  "TypeScript",
  "Prisma",
  "Redis",
];
