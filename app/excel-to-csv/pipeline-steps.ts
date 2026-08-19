import { Download, Table, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a .xlsx", detail: "Converted the moment it's dropped" },
  { icon: Table, label: "Reading the first sheet", detail: "Rows and columns carry over" },
  { icon: Download, label: "Save the .csv", detail: "Plain text, opens anywhere" },
];
