/**
 * Single source for identity, contact details and links.
 * Everything here is taken from the existing site; Phase 2 extends it.
 */
export const profile = {
  name: "Tayyab Tariq",
  role: "Full-stack developer",
  location: "Lahore, Pakistan",
  remote: true,
  siteUrl: "https://tayyabtariq.vercel.app",
  email: "tayyabtariq838@gmail.com",
  resumeUrl: "/images/tayyab.pdf",
  summary:
    "Full-stack developer building Node.js and NestJS backends, Next.js interfaces and Flutter apps.",
  availability: {
    open: true,
    label: "Available for freelance and full-time work",
  },
  links: {
    github: "https://github.com/itx-tayyab",
    linkedin: "https://www.linkedin.com/in/tayyab-tariq-a51379260/",
  },
} as const;

export type Profile = typeof profile;
