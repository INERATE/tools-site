/**
 * Everything the user places ON TOP of a page, as one union.
 */

export type AnnotationKind = "draw" | "rect" | "circle" | "line" | "highlight" | "signature" | "image" | "redact";

interface Base {
  id: string;
  pageIndex: number;
  kind: AnnotationKind;
}

/** Fractional box, 0-1 of the page, top-left origin. */
export interface BoxLike extends Base {
  kind: "rect" | "circle" | "line" | "highlight" | "signature" | "image" | "redact";
  relX: number;
  relY: number;
  relWidth: number;
  relHeight: number;
  /** Stroke/fill for shapes; ignored for signature/image. */
  color?: string;
  /** data: URI for signature and image. */
  dataUrl?: string;
  /** Style for redaction */
  redactStyle?: "blackout" | "blur" | "whiteout";
}

export interface Stroke extends Base {
  kind: "draw";
  /** Fractional points, 0-1 of the page. */
  points: { x: number; y: number }[];
  color: string;
  size: number;
}

export type Annotation = BoxLike | Stroke;

/** Omit over a union collapses to its shared keys; this distributes instead. */
export type NewAnnotation = Annotation extends infer A
  ? A extends Annotation
    ? Omit<A, "id">
    : never
  : never;

export const isStroke = (a: Annotation): a is Stroke => a.kind === "draw";
export const isBox = (a: Annotation): a is BoxLike => a.kind !== "draw";
