import type { ProjectDeepDive } from "@/data/deepDiveTypes";

export const deepDevErpDeepDive: ProjectDeepDive = {
  metrics: [
    { value: "3 modules", label: "Student, staff and test management" },
    { value: "Role-based", label: "Staff and teacher access control" },
    { value: "Question bank", label: "Board, class and subject weighted papers" },
    { value: "Modular", label: "Feature-by-feature frontend rollout" },
  ],

  challenge:
    "Schools often manage students, staff and exams across disconnected spreadsheets and tools. Records are duplicated, and staff have no single view of a class or a test cycle.",

  capabilities: [
    "Student management with attendance, test records and fees.",
    "Staff and teacher management with role-controlled access.",
    "Question-paper generation by board, class, subject and chapter.",
    "Modular Next.js frontend built with Redux, Tailwind and shadcn/ui.",
  ],

  takeaways: [
    "Module boundaries keep school workflows independently changeable.",
    "Exam generation is a data problem before it is an interface problem.",
    "Role-aware navigation is part of the architecture, not a last-minute filter.",
  ],

  architecture: {
    nodes: [
      {
        id: "frontend",
        title: "Next.js Modules",
        subtitle: "App Router & shadcn/ui",
        description: "Student, staff and test screens are organised as separate frontend modules with shared design primitives.",
        icon: "monitor",
      },
      {
        id: "app",
        title: "Modular App Layer",
        subtitle: "Redux & shared contracts",
        description: "Module-level state and typed contracts keep school workflows from turning into one monolith.",
        icon: "layers",
      },
      {
        id: "access",
        title: "Role & Access",
        subtitle: "Staff and teacher permissions",
        description: "Role checks gate navigation and the actions available inside each school module.",
        icon: "shield",
      },
      {
        id: "records",
        title: "School Records",
        subtitle: "Students, classes & exams",
        description: "Student, staff, class and exam data stay connected across the module boundaries that use them.",
        icon: "database",
      },
    ],
    tabs: [
      {
        id: "overview",
        label: "Full System Overview",
        summary:
          "The ERP is split into student, staff and test modules. Redux-backed screens share typed module contracts and role-aware navigation.",
        links: ["Module routes", "Shared contracts", "Scoped records"],
      },
      {
        id: "academics",
        label: "Academic Workflows",
        summary:
          "Student records, attendance, fees and staff allocation stay connected without turning every screen into one monolith.",
        links: ["Student + staff data", "Class allocation", "Exam metadata"],
      },
      {
        id: "access",
        label: "Role-Based Access",
        summary:
          "Teachers and administrators see overlapping but different modules. Role checks gate navigation and the actions inside each module.",
        links: ["Staff login", "Role guard", "Module visibility"],
      },
    ],
  },

  challenges: [
    {
      id: "modular-schools",
      title: "Modular School Operations",
      summary:
        "Student, staff and exam workflows change independently, so the interface cannot be built as one large screen.",
      points: [
        "Each school workflow lives in a focused module with its own screens.",
        "Shared primitives keep navigation, tables and forms consistent.",
        "A module can evolve without forcing a rewrite of the whole ERP.",
      ],
      tradeoff:
        "Trade-off: module boundaries require shared contracts, but they make the product easier to extend.",
    },
    {
      id: "question-papers",
      title: "Question Paper Generation",
      summary:
        "Papers must follow board, class, subject and chapter rules without becoming a manual assembly job.",
      points: [
        "Questions are tagged with board, class, subject and chapter metadata.",
        "Selection can be weighted toward questions that repeat in past papers.",
        "Staff review and export the generated paper instead of assembling it by hand.",
      ],
      tradeoff:
        "Trade-off: good generation depends on disciplined question metadata, but it turns a repetitive task into a reusable workflow.",
    },
    {
      id: "staff-permissions",
      title: "Role-Scoped Staff Access",
      summary:
        "Teachers and administrators need overlapping but not identical permissions across modules.",
      points: [
        "Navigation is generated around the signed-in role.",
        "Sensitive actions are checked again inside the module.",
        "Staff and teacher records share one access model.",
      ],
      tradeoff:
        "Trade-off: explicit role rules take more setup, but they keep school data visible only to the right staff.",
    },
  ],
};
