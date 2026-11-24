import type { ProjectDeepDive } from "@/data/deepDiveTypes";

export const harmoniDeepDive: ProjectDeepDive = {
  metrics: [
    { value: "< 50ms", label: "Real-time WebSocket latency" },
    { value: "100%", label: "Type-safe: TypeScript, Prisma and NestJS DTOs" },
    { value: "Multi-Tenant", label: "Isolated workspace architecture" },
    { value: "RBAC", label: "Role-based permission system" },
  ],

  walkthrough: [
    {
      id: "chat",
      label: "Team Chat & Channels",
      summary: "Workspace channels, direct messages and presence backed by a real-time event layer.",
      icon: "chat",
      image: {
        src: "/images/projects/harmoni/teams.png",
        alt: "Harmoni teams list showing each team's lead, member count and status",
        width: 1365,
        height: 642,
      },
      bullets: [
        "Socket.io gateways fan out channel events through Redis Pub/Sub.",
        "JWT-authenticated sockets join only their own workspace rooms.",
        "Messages are persisted through Prisma before they are broadcast.",
      ],
    },
    {
      id: "tasks",
      label: "Kanban Task Boards",
      summary: "Drag-and-drop task boards with optimistic updates and transactional ordering.",
      icon: "tasks",
      image: {
        src: "/images/projects/harmoni/dashboard.png",
        alt: "Harmoni dashboard with assigned tasks, task counts and a recent activity feed",
        width: 1361,
        height: 642,
      },
      bullets: [
        "Optimistic board updates keep drag interactions responsive in React.",
        "Task moves are validated by NestJS DTOs and workspace role guards.",
        "Column ordering and task state are written in one Prisma transaction.",
      ],
    },
    {
      id: "files",
      label: "File Sharing",
      summary: "Project files with workspace-scoped access, previews and upload history.",
      icon: "files",
      image: {
        src: "/images/projects/harmoni/team-detail.png",
        alt: "Harmoni team detail page with member, project and activity counts",
        width: 1365,
        height: 640,
      },
      bullets: [
        "Presigned uploads keep large files off the API request process.",
        "Workspace-scoped object keys prevent cross-tenant file access.",
        "File metadata and activity entries are saved in one transaction.",
      ],
    },
    {
      id: "ai",
      label: "AI Assistant",
      summary: "Meeting transcription that becomes a summary, decisions and follow-up tasks.",
      icon: "ai",
      image: {
        src: "/images/projects/harmoni/members.png",
        alt: "Harmoni workspace members table with roles, status and invitations",
        width: 1365,
        height: 640,
      },
      bullets: [
        "Transcription jobs run in a worker queue, not on the request thread.",
        "Long audio is chunked with retries and timeout handling.",
        "The model writes structured summaries and action items back to PostgreSQL.",
      ],
    },
  ],

  architecture: {
    nodes: [
      {
        id: "frontend",
        title: "Frontend Client",
        subtitle: "Next.js & React",
        description: "The App Router and React client render the workspace, optimistic updates and real-time UI state.",
        icon: "monitor",
      },
      {
        id: "api",
        title: "API Gateway",
        subtitle: "NestJS",
        description: "NestJS guards, controllers and gateways handle authentication, REST requests and socket events.",
        icon: "server",
      },
      {
        id: "redis",
        title: "Pub/Sub Layer",
        subtitle: "Redis caching & sockets",
        description: "Redis caches hot reads and carries Socket.io events between every running API instance.",
        icon: "radio",
      },
      {
        id: "database",
        title: "Database",
        subtitle: "PostgreSQL + Prisma ORM",
        description: "PostgreSQL is the source of truth for workspaces, members, messages, tasks and transcripts.",
        icon: "database",
      },
    ],
    tabs: [
      {
        id: "overview",
        label: "Full System Overview",
        summary:
          "The browser talks to NestJS over HTTPS. Redis handles cache and cross-instance events, while PostgreSQL remains the source of truth behind Prisma.",
        links: ["HTTPS / App Router", "Cache & events", "Durable records"],
      },
      {
        id: "realtime",
        label: "Real-Time WebSocket Flow (Socket.io + Redis)",
        summary:
          "An authenticated socket joins a workspace room. A message is persisted, published through Redis, and fanned out by every API instance.",
        links: ["WSS handshake", "Pub/Sub fan-out", "Persist / replay"],
      },
      {
        id: "ai",
        label: "AI Meeting Summarization Pipeline",
        summary:
          "Meeting audio is accepted by the API, queued through Redis to a worker, transcribed, then saved as structured notes and action items.",
        links: ["Audio upload", "Background job queue", "Summaries / action items"],
      },
    ],
  },

  challenges: [
    {
      id: "tenant-isolation",
      title: "Multi-Tenant Schema Isolation",
      summary:
        "Every workspace query is scoped before it reaches Prisma, so one tenant can never read another tenant's rows.",
      points: [
        "JWT claims resolve to a workspace membership, and guards reject mismatched workspace IDs.",
        "Every relation carries workspaceId, and compound unique indexes include it.",
        "Service helpers inject the tenant scope into reads, writes and nested includes.",
      ],
      tradeoff:
        "Trade-off: stricter scoping adds joins and composite indexes, but it removes an entire class of cross-tenant leaks.",
    },
    {
      id: "socket-consistency",
      title: "WebSocket State Consistency",
      summary:
        "Multiple NestJS instances stay in sync through Redis Pub/Sub instead of holding socket state in memory.",
      points: [
        "Sockets join room names scoped by workspace and channel.",
        "The Redis adapter broadcasts an event to every instance, which then fans out to its local sockets.",
        "Messages are persisted before broadcast so reconnects can replay the source of truth.",
      ],
      tradeoff:
        "Trade-off: Pub/Sub adds a network hop, but it keeps horizontal scaling predictable.",
    },
    {
      id: "job-queue",
      title: "Background Job Queue",
      summary:
        "AI transcription runs in a worker process, so long jobs never block the Node.js event loop.",
      points: [
        "Uploads enqueue a job with retry, timeout and progress metadata.",
        "Workers chunk audio, call the transcription provider and persist the structured result.",
        "The UI receives a socket event when the job reaches a terminal state.",
      ],
      tradeoff:
        "Trade-off: more moving parts to operate, but request latency stays flat under heavy AI workloads.",
    },
  ],
};
