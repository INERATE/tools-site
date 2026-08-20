import { Download, Trash2, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a PDF", detail: "Any page count" },
  { icon: Trash2, label: "Pick pages to remove", detail: "Type a range or click thumbnails" },
  { icon: Download, label: "Save the result", detail: "Everything else, kept in order" },
];
