import type { Rendered } from "../lib/pdf-to-image";
import type { Thumb } from "../components/page-board/types";

/** The rail shows a rendered result page once one exists, else the board's own thumbnail. */
export function railThumb(rendered: Rendered | undefined, boardThumb: Thumb | undefined) {
  if (rendered) return { url: rendered.url, ratio: rendered.width / rendered.height };
  if (boardThumb) return { url: boardThumb.url, ratio: boardThumb.w / boardThumb.h };
  return { url: undefined, ratio: undefined };
}
