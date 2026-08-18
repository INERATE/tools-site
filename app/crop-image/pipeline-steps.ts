import { Crop, Download, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add photos", detail: "JPG or PNG, one or many" },
  { icon: Crop, label: "Set the margins", detail: "Applied to every photo, live preview" },
  { icon: Download, label: "Save the result", detail: "One file, or a .zip for many" },
];
