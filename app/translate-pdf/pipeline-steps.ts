import { Download, Languages, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a PDF", detail: "Pick the language you want" },
  { icon: Languages, label: "AI translates it", detail: "Only the extracted text is sent" },
  { icon: Download, label: "Save the result", detail: "A new PDF, translated" },
];
