import { Download, Presentation, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a PDF", detail: "Any page count" },
  { icon: Presentation, label: "Pages become slides", detail: "One image per slide, full quality" },
  { icon: Download, label: "Save as .pptx", detail: "Opens in PowerPoint, Google Slides" },
];
