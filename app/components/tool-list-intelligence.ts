import { AiSummarizerIcon } from "./icons/ai-summarizer-icon";
import { SmartFormsIcon } from "./icons/smart-forms-icon";
import { TranslatePdfIcon } from "./icons/translate-pdf-icon";

/** PDF Intelligence category — split out of tool-list-optimize.ts to stay under the file-size cap. */
export const TOOLS_INTELLIGENCE = [
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
