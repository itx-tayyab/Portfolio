import type { ProjectImage } from "./projects";

/**
 * Services shown as numbered cards on the home page (reference: "What we
 * are offering"). Images are the owner's own project artwork, used
 * decoratively (empty alt); `link` points at the work that shows the service.
 */
export type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: "web" | "mobile" | "backend" | "fullstack";
  image: Pick<ProjectImage, "src" | "alt" | "width" | "height">;
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
    link: { href: "/projects?type=web", label: "See web projects" },
  },
  {
    id: "mobile-apps",
    number: "02",
    title: "Mobile Apps",
    description: "Cross-platform Flutter apps for Android and iOS, from one codebase.",
    icon: "mobile",
    image: {
      src: "/images/projects/weather-app/illustration-cover.jpg",
      alt: "",
      width: 1408,
      height: 768,
    },
    link: { href: "/projects?type=mobile", label: "See mobile projects" },
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
];
