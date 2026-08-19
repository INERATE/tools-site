import { Download, Table, UploadCloud } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: UploadCloud, label: "Add a CSV", detail: "Comma-separated values, any size" },
  { icon: Table, label: "Rows become a table", detail: "First row rendered as a bold header" },
  { icon: Download, label: "Save the PDF", detail: "Paginated automatically" },
];
