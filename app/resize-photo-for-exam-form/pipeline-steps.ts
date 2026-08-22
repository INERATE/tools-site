import { Download, IdCard, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add your photo", detail: "JPG, PNG or WEBP" },
  { icon: IdCard, label: "Pick the form", detail: "Exact pixels and KB are preset" },
  { icon: Download, label: "Save the JPG", detail: "Ready to upload to the portal" },
];
