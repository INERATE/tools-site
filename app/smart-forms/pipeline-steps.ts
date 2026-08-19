import { Download, ScanSearch, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a PDF", detail: "With blank lines (___) or [ ] checkboxes" },
  { icon: ScanSearch, label: "Fields are detected", detail: "On-device, no AI call needed" },
  { icon: Download, label: "Save the fillable PDF", detail: "Real form fields, ready to fill" },
];
