import { DocxIcon } from "./icons/docx-icon";
import { ToImageIcon } from "./icons/to-image-icon";
import { JpgToPdfIcon } from "./icons/jpg-to-pdf-icon";

/**
 * SEO-templated landing pages that reuse an existing engine under a
 * different search-query name (e.g. "word to pdf" vs "docx to pdf") — see
 * PLAN.md "format-pair landing-page multiplication". Split out so growing
 * this list never trips the file-size cap on tool-list-convert.ts.
 */
export const TOOLS_FORMAT_PAIRS = [
  {
    href: "/word-to-pdf",
    icon: DocxIcon,
    title: "Word to PDF",
    description: "Convert a Word document to a clean A4 PDF, with a preview before you download.",
    category: "Convert & Export",
    live: true,
  },
  {
    href: "/pdf-to-jpg",
    icon: ToImageIcon,
    title: "PDF to JPG",
    description: "Choose your pages, then export them as JPG at any quality.",
    category: "Convert & Export",
    live: true,
  },
  {
    href: "/png-to-pdf",
    icon: JpgToPdfIcon,
    title: "PNG to PDF",
    description: "Turn PNG images into one PDF — one page per image, in the order you set.",
    category: "Convert & Export",
    live: true,
  },
];
