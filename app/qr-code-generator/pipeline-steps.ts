import { Download, QrCode, Type } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: Type, label: "Type or paste anything", detail: "A URL, Wi-Fi password, plain text" },
  { icon: QrCode, label: "Live QR preview", detail: "Redraws as you type" },
  { icon: Download, label: "Save PNG or SVG", detail: "Print-ready, any size" },
];
