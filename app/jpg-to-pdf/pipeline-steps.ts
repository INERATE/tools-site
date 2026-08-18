import { Download, ImageIcon, LayoutGrid } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: ImageIcon, label: "Add your photos", detail: "JPG or PNG, as many as you need" },
  { icon: LayoutGrid, label: "Arrange the order", detail: "Drag to set the page order" },
  { icon: Download, label: "Save the PDF", detail: "One page per photo, full quality" },
];
