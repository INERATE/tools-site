import { Download, ScanLine, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a scanned PDF", detail: "Photos or scans with no text layer" },
  { icon: ScanLine, label: "Text is recognized", detail: "On-device, page by page" },
  { icon: Download, label: "Save the result", detail: "Same look, now selectable and searchable" },
];
