import { Download, RotateCw, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a PDF", detail: "Every page loads at its current angle" },
  { icon: RotateCw, label: "Rotate what you need", detail: "All pages at once, or one at a time" },
  { icon: Download, label: "Save the result", detail: "Same pages, new orientation" },
];
