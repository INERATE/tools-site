import { Download, UploadCloud, Wand2 } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a photo", detail: "One clear subject works best" },
  { icon: Wand2, label: "Subject is segmented", detail: "On-device, after a one-time model download" },
  { icon: Download, label: "Save the PNG", detail: "Transparent background, ready to use" },
];
