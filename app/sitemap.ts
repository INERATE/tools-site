import type { MetadataRoute } from "next";
import { TOOLS } from "./components/tool-list";

const BASE_URL = "https://tools.inerate.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/all-tools`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/about`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Deduplicate tool paths
  const uniqueToolPaths = Array.from(new Set(TOOLS.filter((t) => t.live).map((t) => t.href)));

  const toolPages: MetadataRoute.Sitemap = uniqueToolPaths.map((href) => ({
    url: `${BASE_URL}${href}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...toolPages];
}
