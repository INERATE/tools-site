import type { Metadata } from "next";
import { buildToolMetadata, buildToolJsonLd } from "../lib/tool-seo";
import { TOOL_SEO } from "../lib/tool-seo-data";

const seo = { slug: "compare-pdf", ...TOOL_SEO["compare-pdf"] };

export const metadata: Metadata = buildToolMetadata(seo);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolJsonLd(seo)) }}
      />
      {children}
    </>
  );
}
