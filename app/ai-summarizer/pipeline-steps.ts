import { Download, Sparkles, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a PDF", detail: "Only the extracted text is sent, never the file" },
  { icon: Sparkles, label: "AI summarizes it", detail: "A few sentences, the key points only" },
  { icon: Download, label: "Read the summary", detail: "Right here, nothing to download" },
];
