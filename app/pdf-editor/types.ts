export type EditorMode =
  | "select"
  | "edit-text"
  | "add-text"
  | "watermark"
  | "esign"
  | "image"
  | "draw"
  | "shapes"
  | "redact"
  | "console";

export type ShapeType = "rect" | "circle" | "line" | "arrow" | "highlight" | "note";

export interface TextBlock {
  id: string;
  pageIndex: number;
  // Normalized coordinates in PDF point space (72 DPI)
  pdfX: number;
  pdfY: number;
  pdfWidth: number;
  pdfHeight: number;
  // Visual relative coordinates (0 to 1 percentage of page)
  relX: number;
  relY: number;
  relWidth: number;
  relHeight: number;
  text: string;
  originalText: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: "normal" | "bold" | "600" | "700";
  fontStyle: "normal" | "italic";
  color: string;
  align: "left" | "center" | "right" | "justify";
  lineHeight: number;
  letterSpacing: number;
  isEdited: boolean;
  isNew: boolean;
  isDeleted: boolean;
  matchedFontName?: string;
  fontMatchConfidence?: number;
}

export interface WatermarkConfig {
  enabled: boolean;
  text: string;
  type: "text" | "image";
  imageDataUrl?: string;
  opacity: number; // 0.0 - 1.0
  rotation: number; // -90 to +90 deg
  fontSize: number; // pt
  fontFamily: string;
  color: string;
  layout: "diagonal" | "grid" | "horizontal" | "footer";
  layer: "above" | "below";
  pages: "all" | "first" | "custom";
  customPages?: string; // e.g. "1, 3-5"
}

export interface SignatureElement {
  id: string;
  pageIndex: number;
  relX: number;
  relY: number;
  relWidth: number;
  relHeight: number;
  dataUrl: string;
  type: "drawn" | "typed" | "stamp";
  signerName: string;
  timestamp: string;
  certificateHash?: string;
  includeAuditSeal: boolean;
}

export interface ImageElement {
  id: string;
  pageIndex: number;
  relX: number;
  relY: number;
  relWidth: number;
  relHeight: number;
  dataUrl: string;
  opacity: number;
  rotation: number;
  name: string;
}

export interface ShapeElement {
  id: string;
  pageIndex: number;
  type: ShapeType;
  relX: number;
  relY: number;
  relWidth: number;
  relHeight: number;
  strokeColor: string;
  fillColor: string;
  strokeWidth: number;
  opacity: number;
  text?: string;
}

export interface DrawStroke {
  id: string;
  pageIndex: number;
  points: { x: number; y: number }[]; // relative 0-1
  color: string;
  size: number;
  isHighlighter: boolean;
}

export interface PageInfo {
  pageIndex: number;
  width: number;
  height: number;
  ratio: number;
  thumbnailUrl?: string;
  textBlocks: TextBlock[];
}

export interface ConsoleLogEntry {
  id: string;
  timestamp: string;
  type: "info" | "warn" | "error" | "success" | "ast";
  message: string;
  data?: unknown;
}

export interface PDFDocumentMetadata {
  title?: string;
  author?: string;
  subject?: string;
  creator?: string;
  producer?: string;
  creationDate?: Date;
  modificationDate?: Date;
  pageCount: number;
  fileSizeBytes: number;
  fileName: string;
}
