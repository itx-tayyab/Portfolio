import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

/** Public pages only; the dev-only /kitchen route is excluded. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = profile.siteUrl;
  const pages = ["", "/projects", "/about", "/contact"].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const caseStudies = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));
  return [...pages, ...caseStudies];
}
