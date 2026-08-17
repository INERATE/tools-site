/** Draws an image onto a canvas at "cover" sizing — filling the frame, cropping overflow. */
export function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, cvs: HTMLCanvasElement) {
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  const imgAspect = img.naturalWidth / img.naturalHeight;
  const screenAspect = cvs.width / cvs.height;
  let drawW: number, drawH: number, drawX: number, drawY: number;

  if (screenAspect > imgAspect) {
    drawW = cvs.width;
    drawH = cvs.width / imgAspect;
    drawX = 0;
    drawY = (cvs.height - drawH) / 2;
  } else {
    drawH = cvs.height;
    drawW = cvs.height * imgAspect;
    drawX = (cvs.width - drawW) / 2;
    drawY = 0;
  }

  ctx.drawImage(img, drawX, drawY, drawW, drawH);
}

/** Resizes the canvas backing store to the viewport, capped at 2x DPR. */
export function sizeToViewport(cvs: HTMLCanvasElement) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth * dpr;
  const h = window.innerHeight * dpr;
  if (cvs.width !== w || cvs.height !== h) {
    cvs.width = w;
    cvs.height = h;
  }
}
