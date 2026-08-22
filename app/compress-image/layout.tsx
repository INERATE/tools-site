import type { Metadata } from "next";
import { buildToolMetadata, buildToolJsonLd } from "../lib/tool-seo";
import { TOOL_SEO } from "../lib/tool-seo-data";
import { ToolFaq } from "../components/tool-faq";

const seo = { slug: "compress-image", ...TOOL_SEO["compress-image"] };

export const metadata: Metadata = buildToolMetadata(seo);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolJsonLd(seo)) }}
      />
      {children}
      <ToolFaq slug={seo.slug} />
    </>
  );
}
