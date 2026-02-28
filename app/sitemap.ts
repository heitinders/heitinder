import type { MetadataRoute } from "next";

import { PROJECTS } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://heitindersingh.dev";

  const projectPages = PROJECTS.map((project) => ({
    url: `${base}/projects/${project.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectPages,
  ];
}
