import { Download, ImageIcon, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a PDF", detail: "JPEG images embedded in the pages" },
  { icon: ImageIcon, label: "Images are pulled out", detail: "At their original quality" },
  { icon: Download, label: "Save as a .zip", detail: "Every image, one download" },
];
