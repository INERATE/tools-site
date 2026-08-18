import { Download, Table2, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add an .xlsx", detail: "The first sheet is used" },
  { icon: Table2, label: "Rows become a grid", detail: "Content and column order carry over" },
  { icon: Download, label: "Save the PDF", detail: "Landscape pages, ready to share" },
];
