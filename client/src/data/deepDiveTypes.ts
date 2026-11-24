/** Shared types for the per-project case-study deep dive. */

export type DeepDiveMetric = {
  value: string;
  label: string;
};

export type FeatureIcon =
  | "chat"
  | "tasks"
  | "files"
  | "ai"
  | "dashboard"
  | "projects"
  | "clients";

export type FeaturePreview = {
  id: string;
  label: string;
  summary: string;
  icon: FeatureIcon;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  bullets: string[];
};

export type ArchitectureIcon =
  | "monitor"
  | "server"
  | "radio"
  | "database"
  | "shield"
  | "layers";

export type ArchitectureNode = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: ArchitectureIcon;
};

export type ArchitectureTab = {
  id: string;
  label: string;
  summary: string;
  /** Labels for the three links between the four nodes, left to right. */
  links: [string, string, string];
};

export type Architecture = {
  nodes: ArchitectureNode[];
  tabs: ArchitectureTab[];
};

export type EngineeringChallenge = {
  id: string;
  title: string;
  summary: string;
  points: string[];
  tradeoff: string;
};

export type ProjectDeepDive = {
  metrics: DeepDiveMetric[];
  walkthrough?: FeaturePreview[];
  architecture?: Architecture;
  challenges?: EngineeringChallenge[];
  /** Optional overrides when the main project record has no problem/capability text. */
  challenge?: string;
  capabilities?: string[];
  takeaways?: string[];
};
