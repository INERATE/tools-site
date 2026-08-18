import { Diff, Download, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add two PDFs", detail: "The before and the after" },
  { icon: Diff, label: "See what changed", detail: "Added, removed and unchanged lines" },
  { icon: Download, label: "Save the report", detail: "Plain-text diff, ready to share" },
];
