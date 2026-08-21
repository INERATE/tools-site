import { AiObjectEraserIcon } from "./icons/ai-object-eraser-icon";
import { AiSummarizerIcon } from "./icons/ai-summarizer-icon";
import { SmartFormsIcon } from "./icons/smart-forms-icon";
import { TranslatePdfIcon } from "./icons/translate-pdf-icon";
import { WatermarkPdfIcon } from "./icons/watermark-pdf-icon";

/** PDF & AI Intelligence category — split out of tool-list-optimize.ts to stay under the file-size cap. */
export const TOOLS_INTELLIGENCE = [
  {
    href: "/ai-object-eraser",
    icon: AiObjectEraserIcon,
    title: "AI Object & Watermark Eraser",
    description: "Erase watermarks, text, photobombers, and logos with AI generative fill.",
    category: "AI & Image Tools",
    live: true,
  },
  {
    href: "/watermark-remover",
    icon: WatermarkPdfIcon,
    title: "AI Watermark Remover",
    description: "Remove image watermarks, stamps, and logos seamlessly with zero blurry seams.",
    category: "AI & Image Tools",
    live: true,
  },
  {
    href: "/ai-summarizer",
    icon: AiSummarizerIcon,
    title: "AI Summarizer",
    description: "Sends a PDF's extracted text to a summarization backend.",
    category: "PDF Intelligence",
    live: true,
  },
  {
    href: "/smart-forms",
    icon: SmartFormsIcon,
    title: "Smart PDF Forms",
    description: "Detects blank lines and checkboxes, turns them into real fillable fields.",
    category: "PDF Intelligence",
    live: true,
  },
  {
    href: "/translate-pdf",
    icon: TranslatePdfIcon,
    title: "Translate PDF",
    description: "Sends extracted text to a translation backend, rebuilds it as a PDF.",
    category: "PDF Intelligence",
    live: true,
  },
];
