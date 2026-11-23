/**
 * Single source of truth for projects. Replaces the two drifted copies that
 * lived in app/projects/page.tsx and app/projects/[projectId]/page.tsx.
 *
 * Content rules:
 * - Only claims the owner can back up. Metrics removed pending confirmation
 *   are listed in a comment on each project.
 * - Every image has real dimensions (layout stability) and alt text that
 *   describes what is shown. `kind` separates real app screenshots from
 *   illustrative artwork, so the UI never presents artwork as the product.
 */

export type ProjectType = "web" | "mobile";
export type ProjectStatus = "in-progress" | "completed";

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** "screenshot" = the real product UI. "illustration" = artwork, not the product. */
  kind: "screenshot" | "illustration";
};

export type Project = {
  slug: string;
  title: string;
  /** One line: what it is. */
  summary: string;
  type: ProjectType;
  /** Optional: leave out for a project without a fixed end, and no status is shown. */
  status?: ProjectStatus;
  /** Display string, e.g. "Dec 2024". */
  period: string;
  role: string;
  stack: string[];
  /** Feature on the home page. */
  featured: boolean;
  /** Optional: without one, cards show a plain panel with the project name. */
  cover?: ProjectImage;
  gallery: ProjectImage[];
  links: { repo?: string; live?: string };
  problem: string;
  approach: string;
  features: string[];
  learnings: string[];
};

const IMG = "/images/projects";

export const projects: Project[] = [
  {
    slug: "harmoni",
    title: "Harmoni",
    summary: "A workspace that combines team chat, task boards and file sharing.",
    type: "web",
    status: "in-progress",
    period: "Dec 2024",
    role: "Full-stack developer",
    stack: ["NestJS", "Next.js", "PostgreSQL", "Prisma", "Socket.io", "Redis", "Redux", "Docker", "shadcn/ui"],
    featured: true,
    cover: {
      src: `${IMG}/harmoni/dashboard.png`,
      alt: "Harmoni dashboard with assigned tasks, an overview of task counts and a recent activity feed",
      width: 1361,
      height: 642,
      kind: "screenshot",
    },
    gallery: [
      {
        src: `${IMG}/harmoni/dashboard.png`,
        alt: "Dashboard with assigned tasks, task counts and recent activity",
        width: 1361,
        height: 642,
        kind: "screenshot",
      },
      {
        src: `${IMG}/harmoni/teams.png`,
        alt: "Teams list showing each team's lead, member count and status",
        width: 1365,
        height: 642,
        kind: "screenshot",
      },
      {
        src: `${IMG}/harmoni/team-detail.png`,
        alt: "Team detail page with member, project and activity counts and the team's role distribution",
        width: 1365,
        height: 640,
        kind: "screenshot",
      },
      {
        src: `${IMG}/harmoni/members.png`,
        alt: "Workspace members table with roles, status and invitations",
        width: 1365,
        height: 640,
        kind: "screenshot",
      },
    ],
    links: {},
    problem:
      "Remote teams split their work across a chat app, a task board and a file drive. Switching between them breaks focus, and context gets lost between tools.",
    approach:
      "Harmoni puts messaging, tasks and files in one workspace. The NestJS backend handles real-time WebSocket connections for chat while PostgreSQL stores the relational data for teams, tasks and permissions.",
    features: [
      "Real-time messaging with Socket.io",
      "Drag-and-drop task board",
      "File sharing with previews",
      "AI meeting assistant that summarizes meetings and drafts tasks",
      "Role-based access control for workspaces and teams",
    ],
    learnings: [
      "Communication patterns between services over TCP and Redis",
      "Keeping real-time state consistent across clients",
      "Designing permissions that work at both workspace and team level",
    ],
    // Removed pending confirmation: "1000+ concurrent users",
    // "reduced context-switching by 40% in beta", "deployed on AWS with
    // Docker Swarm". Repo link was a placeholder (github.com/yourusername).
  },
  {
    slug: "deepkhata",
    title: "DeepKhata",
    summary:
      "Multi-branch point of sale, inventory and ledger platform for retail shops, with offline selling that syncs once the connection returns.",
    type: "web",
    status: "completed",
    // Needs your input: no date given.
    period: "",
    role: "Product development lead at Deep Dev Solutions",
    stack: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Prisma", "Docker", "Vitest", "Supertest", "Playwright"],
    featured: false,
    // No screenshots yet: add a cover and gallery once they exist.
    gallery: [],
    links: { live: "https://deepkhata.vercel.app" },
    problem:
      "DeepKhata is a business management platform for retail shops. It brings point of sale, inventory, customer and supplier ledgers, payments, and multi-branch stock into one system, so an owner can see what is in stock at each branch and who owes what.",
    approach:
      "Shop owners get a POS, branch-aware inventory, a cash register with daily reports, and credit tracking. Selling keeps working offline and syncs when the connection returns. An agency admin console handles shop onboarding, plans and limits, deals and billing, and signups, with role-based access across both apps. One codebase serves many shops. It is built with Next.js, NestJS, TypeScript, PostgreSQL with Prisma, and Docker, and tested with Vitest, Supertest, and Playwright. It was built for retail shops in Pakistan.",
    features: [
      "Multi-branch inventory with per-branch stock visibility",
      "Offline selling with sync",
      "Role-based admin console for onboarding and billing",
      "End-to-end test coverage with Playwright",
    ],
    // Needs your input: no learnings given; the section is hidden while empty.
    learnings: [],
  },
  {
    slug: "deepdev-erp",
    title: "DeepDev ERP for Schools and Academies",
    summary: "Modular management system for schools and academies.",
    type: "web",
    // No status: the project runs to the present, so none is shown.
    // Needs your input: start date not provided.
    period: "",
    role: "Lead Developer at Deep Dev Solutions",
    stack: ["Next.js", "React", "Tailwind CSS", "Redux", "shadcn/ui", "EdTech"],
    featured: false,
    // No screenshots yet: add a cover and gallery once they exist.
    gallery: [],
    links: {},
    // Not provided; the section is hidden while empty.
    problem: "",
    approach:
      "DeepDev ERP is a modular management platform for schools and academies. It covers student management, including attendance, test records and fees; staff and teacher management with access controlled by role; and a test system that generates question papers by board, class, subject and chapter, weighted toward questions that repeat in past papers. The frontend is built with Next.js, Tailwind CSS, shadcn/ui and Redux, organised module by module.",
    // Not provided; these sections are hidden while empty.
    features: [],
    learnings: [],
  },
  // Gallery omits messages.png, project-chat.png and project-milestones.png:
  // they show placeholder test data ("ffffff", "hi", "ok bye"). Re-shoot them
  // with realistic sample data to add them back.
  {
    slug: "clientbridge",
    title: "ClientBridge",
    summary: "A shared workspace where freelancers and their clients manage projects together.",
    type: "web",
    status: "completed",
    period: "Jan 2026",
    role: "Full-stack developer",
    stack: ["Next.js", "React", "Express.js", "Prisma", "PostgreSQL", "Socket.io", "Tailwind CSS", "JWT"],
    featured: true,
    cover: {
      src: `${IMG}/clientbridge/landing.png`,
      alt: "ClientBridge landing page headed “Where Freelancers & Clients Collaborate”",
      width: 1352,
      height: 580,
      kind: "screenshot",
    },
    gallery: [
      {
        src: `${IMG}/clientbridge/landing.png`,
        alt: "Landing page headed “Where Freelancers & Clients Collaborate”",
        width: 1352,
        height: 580,
        kind: "screenshot",
      },
      {
        src: `${IMG}/clientbridge/features.png`,
        alt: "Feature overview: project management, real-time chat and a client portal",
        width: 1351,
        height: 630,
        kind: "screenshot",
      },
      {
        src: `${IMG}/clientbridge/register.png`,
        alt: "Sign-up form where new users choose between a freelancer and a client account",
        width: 593,
        height: 630,
        kind: "screenshot",
      },
      {
        src: `${IMG}/clientbridge/dashboard.png`,
        alt: "Freelancer dashboard with client, active and completed project counts and a recent projects table",
        width: 1365,
        height: 634,
        kind: "screenshot",
      },
      {
        src: `${IMG}/clientbridge/projects.png`,
        alt: "Projects page with a card for each project showing status, due date and progress",
        width: 1364,
        height: 633,
        kind: "screenshot",
      },
      {
        src: `${IMG}/clientbridge/clients.png`,
        alt: "Clients page with invited clients and their invitation status",
        width: 1365,
        height: 632,
        kind: "screenshot",
      },
      {
        src: `${IMG}/clientbridge/project-files.png`,
        alt: "Project files tab with an upload area and a list of shared files",
        width: 1347,
        height: 635,
        kind: "screenshot",
      },
    ],
    links: { repo: "https://github.com/itx-tayyab/ClientBridge" },
    problem:
      "Freelancers and clients lose track of work when updates, files and feedback are spread across email and chat apps.",
    approach:
      "ClientBridge gives each project one place for milestones, files and conversation. Freelancers invite clients into a portal, and access rules make sure clients only see the projects they were invited to.",
    features: [
      "Client invitations and onboarding",
      "Projects with milestones and progress tracking",
      "Real-time messaging per project",
      "File sharing with upload history",
    ],
    learnings: [
      "Modelling one-to-many and many-to-many relations between freelancers, clients, projects and invites with Prisma",
      "JWT authentication with protected routes so clients only see their own data",
      "Real-time messaging with Socket.io",
      "Secure file uploads and storage",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

/** Previous and next projects for the case-study pager (wraps around). */
export function getAdjacentProjects(slug: string): { prev: Project; next: Project } | undefined {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return undefined;
  const n = projects.length;
  return { prev: projects[(i - 1 + n) % n], next: projects[(i + 1) % n] };
}
