import { Code2, Copy, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add an image", detail: "Encoded the moment it's dropped" },
  { icon: Code2, label: "Encode to Base64", detail: "A data: URI, ready to embed" },
  { icon: Copy, label: "Copy or download", detail: "Paste straight into CSS or HTML" },
];
