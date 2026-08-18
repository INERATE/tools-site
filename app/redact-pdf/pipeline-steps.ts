import { Download, EyeOff, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a PDF", detail: "Page through to find sensitive text" },
  { icon: EyeOff, label: "Draw boxes over it", detail: "Click and drag on the page" },
  { icon: Download, label: "Save the result", detail: "Redacted pages have no underlying text" },
];
