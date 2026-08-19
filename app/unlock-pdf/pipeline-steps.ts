import { Download, Unlock, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a locked PDF", detail: "AES-256 or RC4 protected" },
  { icon: Unlock, label: "Enter the password", detail: "Validated before anything is decrypted" },
  { icon: Download, label: "Save the unlocked PDF", detail: "Opens without a password" },
];
