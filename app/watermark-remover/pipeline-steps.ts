import { Download, Eraser, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a PDF", detail: "Marks are found automatically" },
  { icon: Eraser, label: "Cover what's left", detail: "Drag a box over anything printed in" },
  { icon: Download, label: "Save the cleaned copy", detail: "Marks removed, links kept" },
];
