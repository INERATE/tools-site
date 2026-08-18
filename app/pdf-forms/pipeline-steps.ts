import { Download, ListChecks, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a fillable PDF", detail: "Text, checkbox, radio and dropdown fields" },
  { icon: ListChecks, label: "Fill it in", detail: "Every field, right in the tab" },
  { icon: Download, label: "Save the result", detail: "Flattened by default, or keep it editable" },
];
