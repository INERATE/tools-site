import { Crop, Download, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a PDF", detail: "See the crop live on page 1" },
  { icon: Crop, label: "Set the margins", detail: "Top, bottom, left, right" },
  { icon: Download, label: "Save the result", detail: "Applied to every page" },
];
