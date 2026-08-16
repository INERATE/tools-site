import { ToolCard } from "./tool-card";
import { MergeIcon } from "./icons/merge-icon";
import { SplitIcon } from "./icons/split-icon";
import { WatermarkIcon } from "./icons/watermark-icon";
import { ToImageIcon } from "./icons/to-image-icon";
import { DocxIcon } from "./icons/docx-icon";
import { ResumeIcon } from "./icons/resume-icon";

/** Icons are passed as components, not elements — the card owns hover state. */
const TOOLS = [
  {
    href: "/pdf-merger",
    icon: MergeIcon,
    title: "PDF Merger",
    description: "Combine multiple PDFs into one, in your browser.",
    live: true,
  },
  {
    href: "/pdf-split",
    icon: SplitIcon,
    title: "PDF Splitter",
    description: "Pull pages out of a PDF or split it apart.",
  },
  {
    href: "/watermark-remover",
    icon: WatermarkIcon,
    title: "Watermark Remover",
    description: "Strip watermarks from PDF pages.",
  },
  {
    href: "/pdf-to-image",
    icon: ToImageIcon,
    title: "PDF to Image",
    description: "Export PDF pages as PNG or JPG.",
  },
  {
    href: "/docx-to-pdf",
    icon: DocxIcon,
    title: "DOCX to PDF",
    description: "Convert Word documents to PDF.",
  },
  {
    href: "/resume-builder",
    icon: ResumeIcon,
    title: "Resume Builder",
    description: "Build and export a clean resume PDF.",
  },
];

export function ToolGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {TOOLS.map((tool, i) => (
        <ToolCard key={tool.href} {...tool} index={i} />
      ))}
    </div>
  );
}
