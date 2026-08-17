import { Download, FileText, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a .docx", detail: "Converted the moment it's dropped" },
  { icon: FileText, label: "Check the preview", detail: "Every output page, before you download" },
  { icon: Download, label: "Save the PDF", detail: "A clean A4 document" },
];
