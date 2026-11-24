import type { ProjectDeepDive } from "@/data/deepDiveTypes";

export const deepKhataDeepDive: ProjectDeepDive = {
  metrics: [
    { value: "Offline", label: "Sales continue without a connection" },
    { value: "Multi-branch", label: "Per-branch stock and ledgers" },
    { value: "POS + Ledger", label: "Sales and credit in one system" },
    { value: "Role-based", label: "Shop and agency admin access" },
  ],

  architecture: {
    nodes: [
      {
        id: "frontend",
        title: "Next.js POS & Admin",
        subtitle: "App Router & offline UI",
        description: "Shop staff use an offline-aware POS while owners and agency admins use the same Next.js codebase.",
        icon: "monitor",
      },
      {
        id: "api",
        title: "NestJS API",
        subtitle: "REST, guards & validation",
        description: "NestJS owns business rules, role checks and the contracts that keep shop data consistent.",
        icon: "server",
      },
      {
        id: "sync",
        title: "Offline Sync Queue",
        subtitle: "Queued sales & retries",
        description: "Sales made without connectivity wait in a queue and replay with idempotency and status tracking.",
        icon: "radio",
      },
      {
        id: "database",
        title: "PostgreSQL + Prisma",
        subtitle: "Branches, stock & ledgers",
        description: "PostgreSQL stores branch-aware inventory, customer ledgers, payments and sync results through Prisma.",
        icon: "database",
      },
    ],
    tabs: [
      {
        id: "overview",
        label: "Full System Overview",
        summary:
          "The POS and admin console share a Next.js app. NestJS owns the business rules and Prisma scopes records by business and branch, while offline writes wait in a sync queue.",
        links: ["HTTPS / App Router", "Queued sync", "Branch-scoped writes"],
      },
      {
        id: "offline",
        label: "Offline Selling & Sync",
        summary:
          "A sale is written locally first. The sync queue replays it when connectivity returns, with idempotency keys and visible status so staff know what still needs to sync.",
        links: ["Local sale", "Sync queue", "Replay + reconciliation"],
      },
      {
        id: "branches",
        label: "Multi-Branch Inventory",
        summary:
          "Owners see every branch, but each record still belongs to one branch. Stock movements, payments and ledgers stay isolated while rolling up to the business.",
        links: ["Branch context", "Stock movement", "Per-branch ledger"],
      },
    ],
  },

  challenges: [
    {
      id: "offline-first",
      title: "Offline-First Selling",
      summary:
        "A shop cannot stop selling when the internet drops, so the POS cannot wait for an API response.",
      points: [
        "Sales are written to a local queue first and shown as pending.",
        "Queued records replay with idempotency keys so retries do not duplicate sales.",
        "Sync status is visible to staff instead of silently failing.",
      ],
      tradeoff:
        "Trade-off: local-first flows need reconciliation and conflict handling, but they keep the shop operating.",
    },
    {
      id: "branch-scope",
      title: "Multi-Branch Inventory Scope",
      summary:
        "Owners need shared oversight without mixing stock, payments or ledgers between branches.",
      points: [
        "A business owns branches, and every operational record carries its branch context.",
        "Stock movements and ledgers are queried through the branch scope.",
        "Roll-ups aggregate across branches without flattening the source records.",
      ],
      tradeoff:
        "Trade-off: branch-aware indexes and joins add complexity, but they prevent corrupted stock counts.",
    },
    {
      id: "admin-roles",
      title: "Role-Based Admin Boundaries",
      summary:
        "Shop staff, owners and agency admins need different views of the same system.",
      points: [
        "Roles gate both navigation and backend actions.",
        "The agency console manages onboarding, plans and limits separately from shop operations.",
        "One codebase serves many shops without sharing tenant state.",
      ],
      tradeoff:
        "Trade-off: explicit permissions take more setup, but they make multi-tenant operations auditable.",
    },
  ],

  takeaways: [
    "Offline writes need idempotency before they need dashboards.",
    "Branch ownership belongs in the schema, not only in a filter.",
    "One codebase can serve many shops when roles and limits are explicit.",
  ],
};
