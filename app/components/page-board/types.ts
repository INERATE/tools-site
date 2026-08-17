/** One tile on the board: a page taken from one of the loaded files. */
export type Slot = {
  /** Stable across reorders — index keys would misdirect the layout springs. */
  id: string;
  /** Index into the board's `files`. */
  src: number;
  /** Zero-based page within that file. */
  page: number;
  /** Extra quarter-turns, degrees clockwise. */
  rotate: number;
};

export type Thumb = { url: string; w: number; h: number };

/** Thumbnails are keyed by source page, so duplicated slots share one image. */
export const thumbKey = (src: number, page: number) => `${src}:${page}`;
