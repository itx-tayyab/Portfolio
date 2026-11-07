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
  status: ProjectStatus;
  /** Display string, e.g. "Dec 2024". */
  period: string;
  role: string;
  stack: string[];
  /** Feature on the home page. */
  featured: boolean;
  cover: ProjectImage;
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
  {
    slug: "covid19-tracker-app",
    title: "Covid-19 Tracker",
    summary: "A mobile app for checking Covid-19 case numbers by country.",
    type: "mobile",
    status: "completed",
    period: "Jul 2025",
    role: "Mobile developer",
    stack: ["Flutter", "Dart", "Provider", "MVVM", "REST API"],
    featured: false,
    cover: {
      src: `${IMG}/covid19-tracker/illustration-cover.jpg`,
      alt: "Illustration of a phone showing pandemic statistics",
      width: 1408,
      height: 768,
      kind: "illustration",
    },
    gallery: [],
    links: { repo: "https://github.com/itx-tayyab/covid19_tracker_app_with_api" },
    problem:
      "During the pandemic, up-to-date case numbers for a specific country were hard to find in one simple view.",
    approach:
      "The app pulls data from a public Covid-19 API and presents it as a dashboard with global totals, per-country figures and search.",
    features: [
      "Global and per-country statistics",
      "Charts for active and recovered cases",
      "Search by country",
      "Offline caching of the last fetched data",
    ],
    learnings: [
      "Parsing nested JSON in Dart",
      "Separating UI and data with MVVM",
      "Handling API errors and network timeouts",
    ],
    // Removed pending confirmation: "99.9% crash-free sessions".
  },
  {
    slug: "weather-app",
    title: "Weather App",
    summary: "A mobile weather app with location-based forecasts.",
    type: "mobile",
    status: "completed",
    period: "Aug 2025",
    role: "Mobile developer",
    stack: ["Flutter", "Dart", "Provider", "MVVM", "OpenWeather API"],
    featured: false,
    cover: {
      src: `${IMG}/weather-app/illustration-cover.jpg`,
      alt: "Illustration of two phones showing a weather forecast",
      width: 1408,
      height: 768,
      kind: "illustration",
    },
    gallery: [],
    links: { repo: "https://github.com/itx-tayyab/weather_app" },
    problem: "Checking the weather often means wading through cluttered apps and ads.",
    approach:
      "A cross-platform Flutter app on the OpenWeather API that shows current conditions and the week ahead for your location or any city you search.",
    features: [
      "Weather for your current location",
      "7-day forecast",
      "Backgrounds that change with the conditions",
      "Search any city",
    ],
    learnings: [
      "Requesting and handling location permissions",
      "Managing asynchronous data streams in Flutter",
      "Caching responses locally to cut repeat API calls",
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
