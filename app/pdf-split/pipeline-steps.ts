import { Download, ListFilter, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a PDF", detail: "One document at a time" },
  { icon: ListFilter, label: "Pick your pages", detail: "Type a range, or edit the board directly" },
  { icon: Download, label: "Save the result", detail: "Just the pages you kept" },
];
