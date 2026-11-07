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
  /** Kept at its original path: external sites may link to it. */
  resumeUrl: "/images/tayyab.pdf",
  portrait: {
    photo: { src: "/images/profile/portrait.jpg", width: 400, height: 400 },
    cutout: { src: "/images/profile/portrait-cutout.png", width: 400, height: 400 },
    alt: "Portrait of Tayyab Tariq",
  },
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
