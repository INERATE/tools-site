import { WatermarkPdfIcon } from "./icons/watermark-pdf-icon";
import { SplitIcon } from "./icons/split-icon";
import { PdfMetadataIcon } from "./icons/pdf-metadata-icon";

/** Phase 18 — organize-PDF trio. Split out to stay under the file-size cap. */
export const TOOLS_ORGANIZE = [
  {
    href: "/pdf-editor",
    icon: PdfMetadataIcon,
    title: "PDF Editor",
    description: "Edit the text already in a PDF, then sign, redact or watermark it.",
    category: "PDF Suite",
    live: true,
  },
  {
    href: "/watermark-pdf",
    icon: WatermarkPdfIcon,
    title: "Watermark PDF",
    description: "Stamp a text watermark across every page, tiled or placed once.",
    category: "Organize PDF",
    live: true,
  },
  {
    href: "/extract-pdf-pages",
    icon: SplitIcon,
    title: "Extract PDF Pages",
    description: "Pull specific pages out into their own PDF, reordered if you like.",
    category: "Organize PDF",
    live: true,
  },
  {
    href: "/delete-pdf-pages",
    icon: SplitIcon,
    title: "Delete PDF Pages",
    description: "Drop the pages you don't need, keep everything else in order.",
    category: "Organize PDF",
    live: true,
  },
];
