import { Download, ScanText, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a photo", detail: "Screenshot, scan, or a photo of text" },
  { icon: ScanText, label: "OCR reads every glyph", detail: "On-device, no upload" },
  { icon: Download, label: "Copy or save as .txt", detail: "Plain text, ready to paste" },
];
