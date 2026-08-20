import { Download, Stamp, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a PDF", detail: "Any page count" },
  { icon: Stamp, label: "Pick a style", detail: "Text, position, opacity" },
  { icon: Download, label: "Save the result", detail: "Every page stamped" },
];
