import { Download, PenLine, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a PDF", detail: "Existing metadata loads automatically" },
  { icon: PenLine, label: "Edit title, author, subject", detail: "Or add search keywords" },
  { icon: Download, label: "Save the updated PDF", detail: "Same content, new metadata" },
];
