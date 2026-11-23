import type { ProjectImage } from "./projects";

/**
 * Services, each shown as its own section on /services. Images are the owner's own project artwork, used
 * decoratively (empty alt); `link` points at the work that shows the service.
 */
export type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: "web" | "mobile" | "backend" | "fullstack" | "automation";
  /** Optional: without one, the section shows the service icon in the same frame. */
  image?: Pick<ProjectImage, "src" | "alt" | "width" | "height">;
  link: { href: string; label: string };
};

export const services: Service[] = [
  {
    id: "web-development",
    number: "01",
    title: "Web Development",
    description: "Fast, responsive web apps in Next.js and React, built for real users and for search.",
    icon: "web",
    image: {
      src: "/images/projects/clientbridge/illustration-cover.jpg",
      alt: "",
      width: 1536,
      height: 1024,
    },
    link: { href: "/work?type=web", label: "See web projects" },
  },
  {
    id: "backend-apis",
    number: "03",
    title: "Backend & APIs",
    description: "Secure APIs and real-time services with NestJS, Node.js and PostgreSQL.",
    icon: "backend",
    image: {
      src: "/images/projects/harmoni/illustration-workspace.jpg",
      alt: "",
      width: 1408,
      height: 768,
    },
    link: { href: "/projects/harmoni", label: "See Harmoni" },
  },
  {
    id: "full-stack",
    number: "04",
    title: "Full-Stack Products",
    description: "Complete products, from the database schema to the last screen.",
    icon: "fullstack",
    image: {
      src: "/images/projects/harmoni/illustration-cover.jpg",
      alt: "",
      width: 1408,
      height: 768,
    },
    link: { href: "/projects/clientbridge", label: "See ClientBridge" },
  },
  {
    id: "automation",
    number: "05",
    title: "Automation",
    // Description and link written from your offerings list; replace if you prefer.
    description: "Workflow automation with n8n, messaging flows and AI agents that handle bookings and follow-ups.",
    icon: "automation",
    link: { href: "/contact", label: "Discuss an automation" },
  },
];
