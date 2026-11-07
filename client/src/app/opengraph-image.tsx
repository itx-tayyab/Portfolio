import { profile } from "@/data/profile";
import { defaultKicker, ogContentType, ogSize, renderOgImage } from "./_og/render";

export const alt = `${profile.name}, ${profile.role}`;
export const size = ogSize;
export const contentType = ogContentType;

/** Default social preview for every page without its own. */
export default function Image() {
  return renderOgImage({
    kicker: defaultKicker,
    title: "I build the backend and the interface it deserves.",
    band: ["NestJS", "Next.js", "PostgreSQL", "Flutter"],
  });
}
