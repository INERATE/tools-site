import { MergeIcon } from "./icons/merge-icon";
import { SplitIcon } from "./icons/split-icon";
import { WatermarkIcon } from "./icons/watermark-icon";
import { ToImageIcon } from "./icons/to-image-icon";
import { DocxIcon } from "./icons/docx-icon";
import { ResumeIcon } from "./icons/resume-icon";
import { JpgToPdfIcon } from "./icons/jpg-to-pdf-icon";
import { CompressPdfIcon } from "./icons/compress-pdf-icon";
import { PdfToWordIcon } from "./icons/pdf-to-word-icon";

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
    href: "/watermark-remover",
    icon: WatermarkIcon,
    title: "Watermark Remover",
    description: "Delete watermark and stamp annotations, and cover marks printed into the page.",
    category: "Clean & Polish",
    live: true,
  },
  {
    href: "/pdf-to-image",
    icon: ToImageIcon,
    title: "PDF to Image",
    description: "Choose your pages, then export them as PNG or JPG at any quality.",
    category: "Convert & Export",
    live: true,
  },
  {
    href: "/docx-to-pdf",
    icon: DocxIcon,
    title: "DOCX to PDF",
    description: "Convert a Word document to a clean A4 PDF, with a preview before you download.",
    category: "Convert & Export",
    live: true,
  },
  {
    href: "/pdf-to-word",
    icon: PdfToWordIcon,
    title: "PDF to Word",
    description: "Pulls the text out of a PDF and rebuilds it as an editable .docx.",
    category: "Convert & Export",
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
    href: "/jpg-to-pdf",
    icon: JpgToPdfIcon,
    title: "JPG to PDF",
    description: "Turn photos into one PDF — one page per image, in the order you set.",
    category: "Convert & Export",
    live: true,
  },
  {
    href: "/resume-builder",
    icon: ResumeIcon,
    title: "Résumé Builder",
    description: "Fill in a form and export a clean PDF résumé — updates as you type.",
    category: "Document Studio",
    live: true,
  },
];
