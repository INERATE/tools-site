import { Download, FileText, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a PDF", detail: "Needs a real text layer, not a scan" },
  { icon: FileText, label: "Text is extracted", detail: "Reading order and page breaks kept" },
  { icon: Download, label: "Save as .docx", detail: "Opens in Word, Google Docs, anywhere" },
];
