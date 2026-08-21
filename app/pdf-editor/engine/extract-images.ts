import type { PDFPageProxy } from "pdfjs-dist";
import type { BoxLike } from "../annotation-types";

export interface ExtractedImage {
  id: string;
  pageIndex: number;
  relX: number;
  relY: number;
  relWidth: number;
  relHeight: number;
  dataUrl?: string;
}

/**
 * Scans a PDF page operator list to detect embedded image positions and dimensions.
 */
export async function pageImages(
  page: PDFPageProxy,
  pageIndex: number,
  pw: number,
  ph: number,
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
): Promise<BoxLike[]> {
  try {
    const ops = await page.getOperatorList();
    const pdfjs = await import("pdfjs-dist");
    const OPS = pdfjs.OPS;
    const images: BoxLike[] = [];

    let currentTransform = [1, 0, 0, 1, 0, 0];
    const transformStack: number[][] = [];

    for (let i = 0; i < ops.fnArray.length; i++) {
      const fn = ops.fnArray[i];
      const args = ops.argsArray[i];

      if (fn === OPS.save) {
        transformStack.push([...currentTransform]);
      } else if (fn === OPS.restore) {
        if (transformStack.length > 0) {
          currentTransform = transformStack.pop()!;
        }
      } else if (fn === OPS.transform) {
        // Multiply transform matrix [a, b, c, d, e, f]
        const [a, b, c, d, e, f] = args;
        const [a0, b0, c0, d0, e0, f0] = currentTransform;
        currentTransform = [
          a0 * a + c0 * b,
          b0 * a + d0 * b,
          a0 * c + c0 * d,
          b0 * c + d0 * d,
          a0 * e + c0 * f + e0,
          b0 * e + d0 * f + f0,
        ];
      } else if (
        fn === OPS.paintImageXObject ||
        fn === OPS.paintInlineImageXObject ||
        fn === OPS.paintImageMaskXObject
      ) {
        const [scaleX, , , scaleY, transX, transY] = currentTransform;
        const width = Math.abs(scaleX);
        const height = Math.abs(scaleY);
        const x = scaleX < 0 ? transX - width : transX;
        const y = scaleY < 0 ? transY - height : transY;

        // Convert PDF coordinates to fractional coordinates (0-1 from top-left)
        const relX = Math.max(0, Math.min(1, x / pw));
        const relY = Math.max(0, Math.min(1, (ph - y - height) / ph));
        const relWidth = Math.max(0.02, Math.min(1 - relX, width / pw));
        const relHeight = Math.max(0.02, Math.min(1 - relY, height / ph));

        // Only include images that are noticeable (> 15x15 pt)
        if (width > 15 && height > 15 && relWidth > 0.03 && relHeight > 0.03) {
          // Crop image data from the rendered canvas
          const cx = Math.round(relX * canvas.width);
          const cy = Math.round(relY * canvas.height);
          const cw = Math.round(relWidth * canvas.width);
          const ch = Math.round(relHeight * canvas.height);

          let dataUrl: string | undefined = undefined;
          if (cw > 0 && ch > 0) {
            const cropCanvas = document.createElement("canvas");
            cropCanvas.width = cw;
            cropCanvas.height = ch;
            const cropCtx = cropCanvas.getContext("2d");
            if (cropCtx) {
              cropCtx.drawImage(canvas, cx, cy, cw, ch, 0, 0, cw, ch);
              dataUrl = cropCanvas.toDataURL("image/png");
            }
          }

          images.push({
            id: `img-${pageIndex}-${images.length}`,
            pageIndex,
            kind: "image",
            relX,
            relY,
            relWidth,
            relHeight,
            dataUrl,
          });
        }
      }
    }

    return images;
  } catch {
    return [];
  }
}
