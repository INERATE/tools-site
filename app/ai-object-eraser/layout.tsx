import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Object Eraser & Watermark Remover Online Free | Inerate Tools",
  description:
    "Erase watermarks, logos, text, stamps, and photobombers from photos with AI generative fill. 100% free, private, and runs directly in your browser with zero upload.",
  keywords: [
    "ai object eraser",
    "watermark remover online free",
    "remove watermark from image",
    "magic eraser online",
    "photo cleanup ai",
    "remove unwanted objects from photo",
    "erase text from image",
    "generative fill photo eraser",
  ],
  openGraph: {
    title: "AI Object Eraser & Watermark Remover — Free Generative Fill",
    description:
      "Brush over any watermark, logo, or object to magically erase it with seamless background generative fill. Runs 100% client-side in your browser.",
    url: "https://tools.inerate.com/ai-object-eraser",
    siteName: "Inerate Tools",
    type: "website",
  },
};

export default function AiObjectEraserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
