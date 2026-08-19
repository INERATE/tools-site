import { Download, ImageIcon, LayoutGrid } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: ImageIcon, label: "Add your images", detail: "PNG, as many as you need" },
  { icon: LayoutGrid, label: "Arrange the order", detail: "Drag to set the page order" },
  { icon: Download, label: "Save the PDF", detail: "One page per image, full quality" },
];
