import { Download, UploadCloud, Wrench } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a damaged PDF", detail: "Won't open, or opens wrong" },
  { icon: Wrench, label: "Rebuild the structure", detail: "Broken references and xrefs cleaned up" },
  { icon: Download, label: "Save the result", detail: "A clean file that opens normally" },
];
