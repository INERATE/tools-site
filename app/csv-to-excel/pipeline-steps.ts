import { Download, Table, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a .csv", detail: "Converted the moment it's dropped" },
  { icon: Table, label: "Building the sheet", detail: "Rows and columns carry over" },
  { icon: Download, label: "Save the .xlsx", detail: "Opens in Excel, Sheets, or any app" },
];
