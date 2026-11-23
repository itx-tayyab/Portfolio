import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * The project list moved from /projects to /work. Case studies stay at
   * /projects/[projectId], so only the exact list URL redirects; the query
   * string (?type=web|mobile) is passed through.
   */
  async redirects() {
    return [
      { source: "/projects", destination: "/work", permanent: true },
      // Removed Flutter projects: send old links to the work page instead of a 404.
      { source: "/projects/covid19-tracker-app", destination: "/work", permanent: true },
      { source: "/projects/weather-app", destination: "/work", permanent: true },
    ];
  },
};

export default nextConfig;
