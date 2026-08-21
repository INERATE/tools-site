import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Watermark Remover Online Free — Remove Watermarks from Photos | Inerate Tools",
  description:
    "Remove watermarks, stamps, date tags, and logos from photos with AI generative fill. 100% free, private, and runs directly in your browser with zero server uploads.",
  keywords: [
    "watermark remover",
    "remove watermark from photo",
    "watermark remover online free",
    "erase watermark ai",
    "logo remover online",
    "clean image watermark",
    "photo watermark remover no blur",
  ],
  openGraph: {
    title: "AI Watermark Remover Online Free — Inerate Tools",
    description: "Brush over watermarks, logos, or stamps to magically erase them with AI generative fill.",
    url: "https://tools.inerate.com/watermark-remover",
    siteName: "Inerate Tools",
    type: "website",
  },
};

export default function WatermarkRemoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
