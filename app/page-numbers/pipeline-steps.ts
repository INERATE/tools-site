import { Download, Hash, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a PDF", detail: "Any page count" },
  { icon: Hash, label: "Pick a style", detail: "Position, format, starting number" },
  { icon: Download, label: "Save the result", detail: "Every page numbered" },
];
