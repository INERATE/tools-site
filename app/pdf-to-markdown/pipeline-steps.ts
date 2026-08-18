import { Download, Hash, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a PDF", detail: "Needs a real text layer" },
  { icon: Hash, label: "Headings are guessed", detail: "By font size — a best-effort heuristic" },
  { icon: Download, label: "Save as .md", detail: "Plain markdown, ready to edit" },
];
