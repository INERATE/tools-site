import { Download, Maximize2, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add photos", detail: "JPG or PNG, one or many" },
  { icon: Maximize2, label: "Pick a scale", detail: "Same percentage for every photo" },
  { icon: Download, label: "Save the result", detail: "One file, or a .zip for many" },
];
