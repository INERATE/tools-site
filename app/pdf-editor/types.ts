export type { ShapeType } from "./element-types";

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
  | "link";

/**
 * One editable run of body text. Geometry is kept twice on purpose: PDF point
 * space (origin bottom-left) is what the exporter writes back, `rel*` is the
 * 0-1 fraction of the page the overlay positions itself with, so the two never
 * have to agree about zoom.
 */
export interface TextBlock {
  id: string;
  pageIndex: number;
  pdfX: number;
  pdfY: number;
  pdfWidth: number;
  pdfHeight: number;
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

export interface PageInfo {
  pageIndex: number;
  width: number;
  height: number;
  ratio: number;
  thumbnailUrl?: string;
  textBlocks: TextBlock[];
}

export interface PDFDocumentMetadata {
  title?: string;
  author?: string;
  subject?: string;
  creator?: string;
  producer?: string;
  pageCount: number;
  fileSizeBytes: number;
  fileName: string;
}
