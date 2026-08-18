import { Download, FileText, Hash } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: Hash, label: "Paste your markdown", detail: "Headings, paragraphs and lists" },
  { icon: FileText, label: "Convert & preview", detail: "See the real pages before you save" },
  { icon: Download, label: "Save the PDF", detail: "Clean A4 pages, ready to share" },
];
