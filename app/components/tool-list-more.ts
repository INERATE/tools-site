import { PdfToMarkdownIcon } from "./icons/pdf-to-markdown-icon";
import { MarkdownToPdfIcon } from "./icons/markdown-to-pdf-icon";
import { ExtractImagesIcon } from "./icons/extract-images-icon";
import { CompressImageIcon } from "./icons/compress-image-icon";
import { ResizeImageIcon } from "./icons/resize-image-icon";
import { ConvertImageIcon } from "./icons/convert-image-icon";

/** Later-phase tools — split out of tool-list.ts to stay under the file-size cap. */
export const TOOLS_MORE = [
  {
    href: "/pdf-to-markdown",
    icon: PdfToMarkdownIcon,
    title: "PDF to Markdown",
    description: "Extracts a PDF's text and guesses at headings by font size.",
    category: "Convert & Export",
    live: true,
  },
  {
    href: "/markdown-to-pdf",
    icon: MarkdownToPdfIcon,
    title: "Markdown to PDF",
    description: "Paste markdown and convert it to a clean A4 PDF, with a preview.",
    category: "Convert & Export",
    live: true,
  },
  {
    href: "/extract-images",
    icon: ExtractImagesIcon,
    title: "Extract Images from PDF",
    description: "Pulls every embedded JPEG out at full quality, as a .zip.",
    category: "Organize PDF",
    live: true,
  },
  {
    href: "/compress-image",
    icon: CompressImageIcon,
    title: "Compress Image",
    description: "Shrink JPGs and PNGs down for the web, one or many at once.",
    category: "Image Tools",
    live: true,
  },
  {
    href: "/resize-image",
    icon: ResizeImageIcon,
    title: "Resize Image",
    description: "Scale photos down by the same percentage, batch or single.",
    category: "Image Tools",
    live: true,
  },
  {
    href: "/convert-image",
    icon: ConvertImageIcon,
    title: "Convert Image",
    description: "Switch photos between JPG, PNG and WEBP.",
    category: "Image Tools",
    live: true,
  },
];
