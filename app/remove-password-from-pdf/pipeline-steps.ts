import { Download, Lock, Unlock } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: Lock, label: "Add a locked PDF", detail: "And its current password" },
  { icon: Unlock, label: "Removing the password", detail: "AES-256 and RC4 both supported" },
  { icon: Download, label: "Save the PDF", detail: "Opens in any viewer, no password" },
];
