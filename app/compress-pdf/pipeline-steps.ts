import { Download, FileArchive, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a PDF", detail: "Best for scanned or image-heavy files" },
  { icon: FileArchive, label: "Pick a level", detail: "Light, balanced or smallest file" },
  { icon: Download, label: "Save the result", detail: "Smaller file, ready to download" },
];
