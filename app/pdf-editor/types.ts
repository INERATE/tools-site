import type { FontFamily } from "./engine/font-match";

export type { ShapeType } from "./element-types";
export type { FontFamily };

export type EditorMode =
  | "select"
  | "pan"
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
  matchedFamily?: FontFamily;
  fontMatchConfidence?: number;
  /** Symbol/math face detected (cmmi/cmsy/cmex etc) — edits may not render as a valid equation. */
  isMath?: boolean;
  /** Background sampled from the rendered page, 0-1 per channel. */
  bgColor?: { r: number; g: number; b: number };
  /** False when the sampled background isn't a single solid colour — the cover rect will show a seam. */
  bgFlat?: boolean;
  /** The current text measures wider than the space it has to fit. */
  isOverflowing?: boolean;
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
