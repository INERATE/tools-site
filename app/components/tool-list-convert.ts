import { ToImageIcon } from "./icons/to-image-icon";
import { DocxIcon } from "./icons/docx-icon";
import { PdfToWordIcon } from "./icons/pdf-to-word-icon";
import { JpgToPdfIcon } from "./icons/jpg-to-pdf-icon";
import { ResumeIcon } from "./icons/resume-icon";
import { HtmlToPdfIcon } from "./icons/html-to-pdf-icon";
import { PdfToPptxIcon } from "./icons/pdf-to-pptx-icon";
import { ExcelToPdfIcon } from "./icons/excel-to-pdf-icon";

/** Convert/export and studio tools — split out of tool-list.ts to stay under the file-size cap. */
export const TOOLS_CONVERT = [
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
    href: "/jpg-to-pdf",
    icon: JpgToPdfIcon,
    title: "JPG to PDF",
    description: "Turn photos into one PDF — one page per image, in the order you set.",
    category: "Convert & Export",
    live: true,
  },
  {
    href: "/excel-to-pdf",
    icon: ExcelToPdfIcon,
    title: "Excel to PDF",
    description: "Reads the first sheet of an .xlsx workbook and lays it out as a PDF grid.",
    category: "Convert & Export",
    live: true,
  },
  {
    href: "/pdf-to-powerpoint",
    icon: PdfToPptxIcon,
    title: "PDF to PowerPoint",
    description: "Turns each page into a full-bleed slide image, pixel-exact.",
    category: "Convert & Export",
    live: true,
  },
  {
    href: "/html-to-pdf",
    icon: HtmlToPdfIcon,
    title: "HTML to PDF",
    description: "Paste HTML markup and convert it to a clean A4 PDF, with a preview.",
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
