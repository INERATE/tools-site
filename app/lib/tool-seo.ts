import type { Metadata } from "next";

export type ToolSeo = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  faq: { q: string; a: string }[];
};

const SITE_URL = "https://tools.inerate.com";

/** Builds a tool page's <head> metadata from its SEO copy — one call per tool layout.tsx. */
export function buildToolMetadata(seo: ToolSeo): Metadata {
  const url = `${SITE_URL}/${seo.slug}`;
  return {
    title: { absolute: seo.metaTitle },
    description: seo.metaDescription,
    keywords: seo.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      url,
      images: [{ url: "/icon.png", width: 512, height: 512, alt: seo.metaTitle }],
    },
    twitter: {
      card: "summary",
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: ["/icon.png"],
    },
  };
}

/** SoftwareApplication + FAQPage JSON-LD for a tool page — improves rich-result eligibility. */
export function buildToolJsonLd(seo: ToolSeo) {
  const url = `${SITE_URL}/${seo.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: seo.h1,
        url,
        applicationCategory: "BrowserApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: seo.metaDescription,
      },
      {
        "@type": "FAQPage",
        mainEntity: seo.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
