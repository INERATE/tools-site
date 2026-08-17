import { Download, LayoutGrid, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a PDF", detail: "One document at a time" },
  { icon: LayoutGrid, label: "Choose your pages", detail: "Drop what you don't need, rotate the rest" },
  { icon: Download, label: "Export images", detail: "PNG or JPG, at your chosen quality" },
];
