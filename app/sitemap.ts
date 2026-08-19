import type { MetadataRoute } from "next";
import { TOOLS } from "./components/tool-list";

const BASE_URL = "https://tools.inerate.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/all-tools`, changeFrequency: "weekly", priority: 0.9 },
  ];

  const toolPages: MetadataRoute.Sitemap = TOOLS.filter((t) => t.live).map((t) => ({
    url: `${BASE_URL}${t.href}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...toolPages];
}
