/** Overlay elements the user adds on top of a page — everything that is not body text. */

export type ShapeType = "rect" | "circle" | "line" | "arrow" | "highlight" | "note";

interface Placed {
  id: string;
  pageIndex: number;
  relX: number;
  relY: number;
  relWidth: number;
  relHeight: number;
}

export interface WatermarkConfig {
  enabled: boolean;
  text: string;
  type: "text" | "image";
  imageDataUrl?: string;
  opacity: number;
  rotation: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  layout: "diagonal" | "grid" | "horizontal" | "footer";
  layer: "above" | "below";
  pages: "all" | "first" | "custom";
  customPages?: string;
}

export interface SignatureElement extends Placed {
  dataUrl: string;
  type: "drawn" | "typed" | "stamp";
  signerName: string;
  timestamp: string;
  includeAuditSeal: boolean;
}

export interface ImageElement extends Placed {
  dataUrl: string;
  opacity: number;
  rotation: number;
  name: string;
}

export interface ShapeElement extends Placed {
  type: ShapeType;
  strokeColor: string;
  fillColor: string;
  strokeWidth: number;
  opacity: number;
  text?: string;
}

export interface DrawStroke {
  id: string;
  pageIndex: number;
  points: { x: number; y: number }[];
  color: string;
  size: number;
  isHighlighter: boolean;
}
