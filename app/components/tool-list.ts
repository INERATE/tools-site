import { MergeIcon } from "./icons/merge-icon";
import { SplitIcon } from "./icons/split-icon";
import { WatermarkIcon } from "./icons/watermark-icon";
import { RotatePdfIcon } from "./icons/rotate-pdf-icon";
import { PageNumbersIcon } from "./icons/page-numbers-icon";
import { SignPdfIcon } from "./icons/sign-pdf-icon";
import { TOOLS_CONVERT } from "./tool-list-convert";
import { TOOLS_OPTIMIZE } from "./tool-list-optimize";
import { TOOLS_MORE } from "./tool-list-more";
import { TOOLS_INTELLIGENCE } from "./tool-list-intelligence";
import { TOOLS_SECURITY } from "./tool-list-security";
import { TOOLS_UTILITY } from "./tool-list-utility";
import { TOOLS_TEXT } from "./tool-list-text";
import { TOOLS_FORMAT_PAIRS } from "./tool-list-format-pairs";
import { TOOLS_FORMAT_PAIRS_2 } from "./tool-list-format-pairs-2";
import { TOOLS_ORGANIZE } from "./tool-list-organize";

export const TOOLS = [
  {
    href: "/pdf-merger",
    icon: MergeIcon,
    title: "PDF Merger",
    description: "Combine PDFs, then reorder, rotate or drop any page before you save.",
    live: true,
    category: "PDF Suite",
  },
  {
    href: "/pdf-split",
    icon: SplitIcon,
    title: "PDF Splitter",
    description: "Pick pages visually or by range, and rearrange what is left.",
    category: "PDF Suite",
    live: true,
  },
  {
    href: "/rotate-pdf",
    icon: RotatePdfIcon,
    title: "Rotate PDF",
    description: "Fix sideways or upside-down pages, one at a time or all at once.",
    category: "Organize PDF",
    live: true,
  },
  {
    href: "/sign-pdf",
    icon: SignPdfIcon,
    title: "Sign PDF",
    description: "Draw your signature, drag it onto the page, and save.",
    category: "Organize PDF",
    live: true,
  },
  {
    href: "/page-numbers",
    icon: PageNumbersIcon,
    title: "Page Numbers",
    description: "Stamp a running page number onto every page, styled your way.",
    category: "Organize PDF",
    live: true,
  },
  {
    href: "/ai-object-eraser",
    icon: WatermarkIcon,
    title: "AI Object & Watermark Eraser",
    description: "Erase watermarks, logos, text, stamps, and photobombers with AI Generative Fill.",
    category: "AI & Image Tools",
    live: true,
    keywords: "watermark remover erase object photo clean up inpainting generative fill magic eraser remove logo stamp",
  },
  {
    href: "/watermark-remover",
    icon: WatermarkIcon,
    title: "AI Watermark Remover",
    description: "Remove watermarks, logos, and stamps seamlessly with AI Generative Fill.",
    category: "AI & Image Tools",
    live: true,
    keywords: "watermark remover erase watermark logo stamp remove pdf photo generative inpainting",
  },
  ...TOOLS_OPTIMIZE,
  ...TOOLS_CONVERT,
  ...TOOLS_MORE,
  ...TOOLS_INTELLIGENCE,
  ...TOOLS_SECURITY,
  ...TOOLS_UTILITY,
  ...TOOLS_TEXT,
  ...TOOLS_FORMAT_PAIRS,
  ...TOOLS_FORMAT_PAIRS_2,
  ...TOOLS_ORGANIZE,
];

/** The homepage's curated 6, ordered by real-world search volume — see PLAN.md §7. Everything else lives at /all-tools. */
const RECOMMENDED_HREFS = ["/pdf-merger", "/pdf-split", "/compress-pdf", "/pdf-to-word", "/jpg-to-pdf", "/sign-pdf"];
export const RECOMMENDED_TOOLS = RECOMMENDED_HREFS.map((href) => TOOLS.find((t) => t.href === href)!);
