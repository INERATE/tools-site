import { Download, Lock, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a PDF", detail: "Any unprotected PDF" },
  { icon: Lock, label: "Set a password", detail: "AES-256, real ISO 32000 encryption" },
  { icon: Download, label: "Save the locked PDF", detail: "Every viewer will ask for the password" },
];
