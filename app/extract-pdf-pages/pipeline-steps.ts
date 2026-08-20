import { Download, ListChecks, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a PDF", detail: "Any page count" },
  { icon: ListChecks, label: "Pick the pages", detail: "Type a range or click thumbnails" },
  { icon: Download, label: "Save the result", detail: "A new PDF with just those pages" },
];
