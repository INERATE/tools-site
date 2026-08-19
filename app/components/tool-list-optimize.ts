import { OcrPdfIcon } from "./icons/ocr-pdf-icon";
import { CompressPdfIcon } from "./icons/compress-pdf-icon";
import { RepairPdfIcon } from "./icons/repair-pdf-icon";
import { CropPdfIcon } from "./icons/crop-pdf-icon";
import { RedactPdfIcon } from "./icons/redact-pdf-icon";
import { PdfFormsIcon } from "./icons/pdf-forms-icon";
import { ComparePdfIcon } from "./icons/compare-pdf-icon";

/** Optimize & Secure category tools — split out of tool-list.ts to stay under the file-size cap. */
export const TOOLS_OPTIMIZE = [
  {
    href: "/ocr-pdf",
    icon: OcrPdfIcon,
    title: "OCR PDF",
    description: "Makes a scanned PDF searchable and selectable, on-device.",
    category: "Optimize & Secure",
    live: true,
  },
  {
    href: "/compress-pdf",
    icon: CompressPdfIcon,
    title: "Compress PDF",
    description: "Shrink a scanned or image-heavy PDF by re-encoding its pages.",
    category: "Optimize & Secure",
    live: true,
  },
  {
    href: "/repair-pdf",
    icon: RepairPdfIcon,
    title: "Repair PDF",
    description: "Rebuilds a damaged PDF's internal structure so it opens again.",
    category: "Optimize & Secure",
    live: true,
  },
  {
    href: "/crop-pdf",
    icon: CropPdfIcon,
    title: "Crop PDF",
    description: "Trim the same margin off every page, set live on a preview.",
    category: "Optimize & Secure",
    live: true,
  },
  {
    href: "/redact-pdf",
    icon: RedactPdfIcon,
    title: "Redact PDF",
    description: "Draw a box over sensitive text — it's gone, not just covered.",
    category: "Optimize & Secure",
    live: true,
  },
  {
    href: "/pdf-forms",
    icon: PdfFormsIcon,
    title: "PDF Forms",
    description: "Fill in a PDF's text, checkbox, radio and dropdown fields.",
    category: "Optimize & Secure",
    live: true,
  },
  {
    href: "/compare-pdf",
    icon: ComparePdfIcon,
    title: "Compare PDF",
    description: "Extracts text from two PDFs and shows exactly what changed.",
    category: "Optimize & Secure",
    live: true,
  },
];
