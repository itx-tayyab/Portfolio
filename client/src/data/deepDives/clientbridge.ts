import type { ProjectDeepDive } from "@/data/deepDiveTypes";

export const clientBridgeDeepDive: ProjectDeepDive = {
  metrics: [
    { value: "Live", label: "Real-time project messaging" },
    { value: "JWT", label: "Token-scoped route protection" },
    { value: "2 portals", label: "Freelancer and client views" },
    { value: "1 place", label: "Files, milestones and feedback" },
  ],

  walkthrough: [
    {
      id: "dashboard",
      label: "Freelancer Dashboard",
      summary: "A single view of active clients, project health and recent work.",
      icon: "dashboard",
      image: {
        src: "/images/projects/clientbridge/dashboard.png",
        alt: "ClientBridge freelancer dashboard with client and project counts and a recent projects table",
        width: 1365,
        height: 634,
      },
      bullets: [
        "JWT-protected routes resolve the current freelancer before loading data.",
        "Prisma aggregates project and client counts in a single query path.",
        "The responsive layout keeps the most important activity above the fold.",
      ],
    },
    {
      id: "projects",
      label: "Project Tracking",
      summary: "Milestones, deadlines and progress tracked in shared project workspaces.",
      icon: "projects",
      image: {
        src: "/images/projects/clientbridge/projects.png",
        alt: "ClientBridge projects page with status, due dates and progress for each project",
        width: 1364,
        height: 633,
      },
      bullets: [
        "Milestones and progress are modelled as related records in PostgreSQL.",
        "Project status changes are validated before they reach Prisma.",
        "Clients see only the projects they have been invited to.",
      ],
    },
    {
      id: "clients",
      label: "Client Portal",
      summary: "Invited clients get a focused portal instead of a shared inbox.",
      icon: "clients",
      image: {
        src: "/images/projects/clientbridge/clients.png",
        alt: "ClientBridge clients page showing invited clients and invitation status",
        width: 1365,
        height: 632,
      },
      bullets: [
        "Invites connect a client to a freelancer and the projects they can access.",
        "Access checks run on the API, so hiding a link is not the security model.",
        "Role-aware views keep freelancer and client actions separate.",
      ],
    },
    {
      id: "files",
      label: "File Sharing",
      summary: "Project files with upload history and access scoped to the project.",
      icon: "files",
      image: {
        src: "/images/projects/clientbridge/project-files.png",
        alt: "ClientBridge project files tab with an upload area and a list of shared files",
        width: 1347,
        height: 635,
      },
      bullets: [
        "Uploads are restricted to members of the project.",
        "File metadata and history are persisted alongside the stored object.",
        "Secure storage keeps large files out of the application database.",
      ],
    },
  ],

  architecture: {
    nodes: [
      {
        id: "frontend",
        title: "Next.js Client",
        subtitle: "React & Tailwind CSS",
        description: "Freelancer and client portals share an App Router shell with role-aware navigation.",
        icon: "monitor",
      },
      {
        id: "api",
        title: "Express API",
        subtitle: "REST & JWT",
        description: "Express routes handle projects, invitations, messages and file metadata behind JWT auth.",
        icon: "server",
      },
      {
        id: "realtime",
        title: "Socket.io Layer",
        subtitle: "Project rooms",
        description: "Authenticated sockets join project rooms for live messages and project updates.",
        icon: "radio",
      },
      {
        id: "database",
        title: "PostgreSQL + Prisma",
        subtitle: "Relational source of truth",
        description: "Users, invites, projects, milestones, messages and files are related through Prisma.",
        icon: "database",
      },
    ],
    tabs: [
      {
        id: "overview",
        label: "Full System Overview",
        summary:
          "The Next.js portals talk to an Express API. JWT middleware resolves the user, Prisma scopes every query, and Socket.io keeps project rooms live.",
        links: ["HTTPS / App Router", "Project rooms", "JWT-scoped queries"],
      },
      {
        id: "realtime",
        label: "Real-Time Messaging Flow",
        summary:
          "Each project has a room. A message is validated, stored through Prisma, and emitted to the freelancer and invited clients in that room.",
        links: ["Project room", "Message fan-out", "Persist / replay"],
      },
      {
        id: "access",
        label: "Client Portal & Access Rules",
        summary:
          "Clients only see projects they were invited to. Invites and project membership are checked on every API route, not only in the interface.",
        links: ["Invite acceptance", "JWT + role check", "Scoped project data"],
      },
    ],
  },

  challenges: [
    {
      id: "multi-party-access",
      title: "Modelling Multi-Party Access",
      summary:
        "Freelancers and clients share projects without exposing one client's work to another.",
      points: [
        "Invites connect a client to a freelancer and a specific set of projects.",
        "Project membership is checked independently from authentication.",
        "The portal shape changes by role while keeping one relational model.",
      ],
      tradeoff:
        "Trade-off: more relational joins and access checks, but it makes client isolation explicit.",
    },
    {
      id: "jwt-scoping",
      title: "Scoping JWT-Protected Data",
      summary:
        "A valid token is not enough; every query must prove the user belongs to the requested project.",
      points: [
        "JWT middleware attaches the authenticated user to the request.",
        "Route handlers verify project membership before reading or writing data.",
        "Responses are shaped around the caller's role instead of filtered in the browser.",
      ],
      tradeoff:
        "Trade-off: every endpoint needs an authorization step, but the API cannot leak another client's data by accident.",
    },
    {
      id: "realtime-and-files",
      title: "Real-Time Messaging + File Uploads",
      summary:
        "Live messages and file uploads fail differently, so they use separate delivery paths.",
      points: [
        "Socket.io rooms keep project conversations live for both roles.",
        "Uploads use secure storage and project-scoped metadata.",
        "Message and file history are persisted so a refresh does not lose context.",
      ],
      tradeoff:
        "Trade-off: two delivery mechanisms add operational surface, but each can fail and retry independently.",
    },
  ],
};
