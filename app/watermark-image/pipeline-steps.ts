import { Download, Stamp, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add photos", detail: "JPG or PNG, one or many" },
  { icon: Stamp, label: "Set your mark", detail: "Text, position and opacity" },
  { icon: Download, label: "Save the result", detail: "One file, or a .zip for many" },
];
