import { Download, PenLine, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a PDF", detail: "Pick the page to sign" },
  { icon: PenLine, label: "Draw & place it", detail: "Drag your signature into position" },
  { icon: Download, label: "Save the result", detail: "Baked into the page, ready to send" },
];
