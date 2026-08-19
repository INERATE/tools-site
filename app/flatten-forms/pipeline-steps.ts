import { Download, Layers, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a filled PDF form", detail: "Text, checkbox or dropdown fields" },
  { icon: Layers, label: "Fields are flattened", detail: "Values become permanent page content" },
  { icon: Download, label: "Save the flattened PDF", detail: "No longer editable, looks identical" },
];
