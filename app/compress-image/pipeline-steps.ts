import { Download, ImageIcon, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add photos", detail: "JPG or PNG, one or many" },
  { icon: ImageIcon, label: "Pick a quality", detail: "PNG stays lossless either way" },
  { icon: Download, label: "Save the result", detail: "One file, or a .zip for many" },
];
