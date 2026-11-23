/**
 * Content for the sections added in the frontend-v3 rearrangement.
 * Each section's heading and intro live here with its items, so content
 * changes never need a component edit.
 *
 * Still placeholder (search "Placeholder"): the Testing step in workingProcess.
 */

/** Home: Engineering Focus */
export const engineeringFocus = {
  eyebrow: "Engineering focus",
  heading: "Engineering Focus",
  intro: "I build web products end to end, with a backend-first approach.",
  items: [
    {
      id: "backend",
      icon: "backend" as const,
      title: "Backend Development",
      text: "I build APIs and services with NestJS, PostgreSQL and Redis, including multi-tenant SaaS and real-time features.",
    },
    {
      id: "full-stack",
      icon: "fullstack" as const,
      title: "Full-Stack Product Development",
      text: "I take products from schema to shipped interface, including Harmoni, an all-in-one collaboration platform, and DeepKhata, a multi-tenant retail POS and inventory SaaS.",
    },
    {
      id: "frontend",
      icon: "web" as const,
      title: "Frontend Engineering",
      text: "I build interfaces in Next.js, React and TypeScript with Tailwind and shadcn/ui, for my own products and for client sites.",
    },
  ],
};

/** Home: Technical Approach */
export const technicalApproach = {
  eyebrow: "Technical approach",
  heading: "How I Approach The Work",
  intro: "I build software that stays easy to change as the product and its users grow.",
  items: [
    { id: "architecture", icon: "architecture" as const, title: "Architecture & Maintainability", text: "I structure backends into clear modules and design multi-tenant systems with role-based access from the start." },
    { id: "api-db", icon: "database" as const, title: "API & Database Design", text: "I design clean REST APIs and relational schemas with Prisma and PostgreSQL, keeping data consistent and easy to query." },
    { id: "performance", icon: "performance" as const, title: "Performance & Scalability", text: "I design for speed and scale early, using caching and efficient queries where they matter." },
    { id: "ux", icon: "ux" as const, title: "User Experience", text: "I build interfaces around how people actually work, with clear states, quick feedback and responsive layouts." },
    { id: "clean-code", icon: "code" as const, title: "Clean, Reusable Code", text: "I write typed, modular code with reusable components so the codebase stays consistent and easy to hand over." },
  ],
};

/** Home: Currently Exploring */
export const currentlyExploring = {
  eyebrow: "Currently exploring",
  heading: "Areas I’m Strengthening",
  intro: "I’m strengthening the fundamentals that help me build faster, more reliable systems.",
  items: [
    { title: "Linux Fundamentals", text: "I’m deepening my Linux skills so I can set up, manage and troubleshoot the servers my applications run on." },
    { title: "System Design", text: "I’m studying how to design systems that scale, including service boundaries, data flow and trade-offs." },
    { title: "Database Indexing", text: "I’m learning how indexes work in PostgreSQL so queries stay fast as data grows." },
  ],
};

/** About: My Journey (oldest first) */
export const journey = {
  eyebrow: "My journey",
  heading: "How I Got Into Software",
  intro: "I moved from client web work into product engineering, one step at a time.",
  items: [
    {
      id: "deal-ai",
      period: "Jan to Jul 2025",
      title: "Deal.ai",
      text: "In my first role, as a freelance web developer, I built sales funnels for clients on Deal.ai, extended them with custom HTML, CSS and JavaScript, and joined client meetings to gather requirements.",
    },
    {
      id: "cubic",
      period: "Aug 2025 to Feb 2026",
      title: "Cubic Solutions Internship",
      text: "I worked with the engineering team on rebuilding an ERP/CRM platform as a modular, multi-tenant system.",
    },
    {
      id: "harmoni",
      period: "Mar to Jun 2026",
      title: "Harmoni",
      text: "I built my final year project, an all-in-one collaboration platform with chat, tasks, files and AI meeting transcription.",
    },
    {
      id: "deep-dev",
      period: "Jul 2026 onward",
      title: "Deep Dev Solutions",
      text: "I design and build SaaS products, including DeepKhata and DeepDev ERP, and build frontends for client sites.",
    },
  ],
};

/** About: Technical Toolkit heading (the groups themselves are in data/stack.ts) */
export const toolkitSection = {
  eyebrow: "Technical toolkit",
  heading: "Tools I Work With",
  intro: "These are the tools I use to design, build and ship web products.",
};

/** Work: Technical Highlights */
export const technicalHighlights = {
  eyebrow: "Technical highlights",
  heading: "Problems Worth Explaining",
  intro: "Three problems from my projects, and how I approached each one.",
  items: [
    {
      id: "harmoni-ai",
      project: "Harmoni",
      title: "Running AI Within Limited Resources",
      text: "Transcription models need serious compute, and not every machine has a GPU. The model is set per environment, with a lighter fallback where resources are limited, so the pipeline keeps running instead of crashing.",
    },
    {
      id: "deepkhata-branches",
      project: "DeepKhata",
      title: "Modelling Businesses and Their Branches",
      text: "Shops with several branches need shared oversight without mixed-up records. I designed a hierarchy where branches belong to a business and every record links to its own branch.",
    },
    {
      id: "deepdev-allocation",
      project: "DeepDev ERP",
      title: "Teacher, Subject and Class Allocation",
      text: "In schools, one teacher covers several subjects across several classes. The ERP models this as a many-to-many allocation.",
    },
  ],
};

/** Services: offerings per service, keyed by the id in data/services.ts */
export const serviceOfferings: Record<string, string[]> = {
  "backend-apis": [
    "REST API development",
    "Authentication and access control",
    "Backend integrations",
    "Server-side business logic",
  ],
  "full-stack": [
    "Complete web applications",
    "Admin dashboards",
    "SaaS applications",
    "Database and API integration",
    "End-to-end application development",
  ],
  "web-development": [
    "Responsive interfaces",
    "Next.js application development",
    "Performance and accessibility",
  ],
  automation: [
    "n8n workflow automation",
    "Dental clinic automation (missed-call recovery, booking, reminders)",
    "WhatsApp and SMS messaging flows",
    "AI agents for intent detection and booking",
  ],
};

/** Services: Working Process (a real sequence, so it is numbered) */
export const workingProcess = {
  eyebrow: "Working process",
  heading: "How A Project Runs",
  intro: "Every project moves through the same five stages, from understanding the problem to delivery.",
  items: [
    { id: "discovery", title: "Discovery", text: "I start by understanding the business, its users and the workflows the software needs to support." },
    { id: "planning", title: "Planning", text: "I write the requirements first, then settle the stack, data model and system design before building." },
    { id: "development", title: "Development", text: "I build module by module, so each part of the product works before the next one starts." },
    { id: "testing", title: "Testing", text: "Placeholder: what happens in this step." },
    { id: "delivery", title: "Delivery", text: "I deploy the product, then use feedback from early users to guide improvements." },
  ],
};

/** Services: FAQ */
export const servicesFaq = {
  eyebrow: "FAQ",
  heading: "Questions",
  intro: "Quick answers to what people usually ask before we start working together.",
  items: [
    { id: "scope", question: "What size of project do you take?", answer: "I take projects of any size, from small websites to full SaaS products." },
    { id: "communication", question: "How do we communicate?", answer: "I work over whatever channel suits you, whether WhatsApp, email or calls, and keep you updated as the work moves." },
    { id: "process", question: "What does your development process look like?", answer: "I start with discovery and planning, build module by module, and deliver with feedback from early users guiding improvements." },
    { id: "availability", question: "Are you available for work?", answer: "Yes. I’m open to both full-time roles and freelance projects." },
    { id: "timezone", question: "What time zone are you in?", answer: "I’m currently in Pakistan, on PKT (UTC+5)." },
  ],
};

/** Home hero: the floating card beside the portrait. */
export const heroCard = {
  label: "Currently building",
  name: "DeepDev ERP",
};
