import { Download, ImageIcon, RefreshCw } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: ImageIcon, label: "Add your PNGs", detail: "As many as you need" },
  { icon: RefreshCw, label: "Converting to WEBP", detail: "Smaller files, same quality" },
  { icon: Download, label: "Save the result", detail: "One file, or a .zip for a batch" },
];
