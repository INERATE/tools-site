import { Gauge, Type } from "lucide-react";
import type { PipelineStep } from "../components/tool-pipeline";

export const STEPS: PipelineStep[] = [
  { icon: Type, label: "Paste or type", detail: "Any length of text" },
  { icon: Gauge, label: "Stats update live", detail: "Words, characters, reading time" },
];
