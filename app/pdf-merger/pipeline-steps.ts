import { Download, LayoutGrid, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add your PDFs", detail: "Drop in as many as you need" },
  { icon: LayoutGrid, label: "Arrange the pages", detail: "Drag, rotate, duplicate or drop any page" },
  { icon: Download, label: "Save the merged file", detail: "One PDF, in your order" },
];
