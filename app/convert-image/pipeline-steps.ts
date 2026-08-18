import { Download, Repeat, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add photos", detail: "JPG or PNG, one or many" },
  { icon: Repeat, label: "Pick a format", detail: "JPG, PNG or WEBP" },
  { icon: Download, label: "Save the result", detail: "One file, or a .zip for many" },
];
