/**
 * Chronological entries for the About timeline, oldest first.
 * Add work and freelance entries here as type "work".
 */
export type TimelineEntry = {
  id: string;
  type: "education" | "work";
  period: string;
  title: string;
  org: string;
  location: string;
  description: string;
};

export const timeline: TimelineEntry[] = [
  {
    id: "intermediate",
    type: "education",
    period: "2020 – 2022",
    title: "Intermediate in Computer Science",
    org: "Govt Islamia College, Civil Lines",
    location: "Lahore",
    description:
      "Foundations of computer science: logic, algorithms, databases and structured programming.",
  },
  {
    id: "bscs",
    type: "education",
    period: "2022 – 2026",
    title: "BS Computer Science",
    org: "Superior University",
    location: "Lahore",
    description:
      "Database systems, data structures and algorithms, networking and full-stack software development.",
  },
];
