import { Download, ScanSearch, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a PDF", detail: "Scanned or exported, any source" },
  { icon: ScanSearch, label: "Blank pages are found", detail: "Rasterized and checked on-device" },
  { icon: Download, label: "Save the trimmed PDF", detail: "Everything else kept in order" },
];
