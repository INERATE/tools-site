import { Download, FileText, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a PDF", detail: "Extracted the moment it's dropped" },
  { icon: FileText, label: "Read the text", detail: "Every line, in page order" },
  { icon: Download, label: "Save as .txt", detail: "Plain text, no formatting" },
];
