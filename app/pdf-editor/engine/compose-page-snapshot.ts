import type { Annotation, BoxLike } from "../annotation-types";
import type { LoadedPage } from "./load-document";
import type { TextBlock } from "../types";

/**
 * Creates a high-fidelity visual composite snapshot of the current page,
 * including the base PDF render, all edited text blocks, and all annotations/signatures/shapes.
 */
export async function composePageSnapshot(
  page: LoadedPage,
  blocks: TextBlock[],
  annotations: Annotation[],
): Promise<string> {
  const canvas = document.createElement("canvas");
  const scale = 2; // high-DPI scale for crispness
  canvas.width = (page.width || 612) * scale;
  canvas.height = (page.height || 792) * scale;
  const ctx = canvas.getContext("2d");
  if (!ctx) return page.url;

  const w = canvas.width;
  const h = canvas.height;

  // 1. Draw Base Page Image
  if (page.url) {
    await new Promise<void>((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        ctx.drawImage(img, 0, 0, w, h);
        resolve();
      };
      img.onerror = () => resolve();
      img.src = page.url;
    });
  }

  // 2. Draw Edited Text Blocks
  const pageBlocks = blocks.filter((b) => b.pageIndex === page.index);
  for (const b of pageBlocks) {
    const bx = b.relX * w;
    const by = b.relY * h;
    const bw = b.relWidth * w;
    const bh = b.relHeight * h;

    // Cover original PDF text with matching clean background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(bx, by, bw, bh);

    // Draw updated text
    ctx.fillStyle = b.color || "#000000";
    const fontSize = (b.fontSize || 12) * scale * 1.25;
    const fontFam = b.fontFamily || "Inter, system-ui, sans-serif";
    const weight = b.fontWeight || "normal";
    const style = b.fontStyle || "normal";
    ctx.font = `${style} ${weight} ${fontSize}px ${fontFam}`;
    ctx.textBaseline = "top";
    ctx.fillText(b.text, bx + 2, by + 2);
  }

  // 3. Draw Annotations, Shapes, Signatures, Images, Redactions
  const pageAnnos = annotations.filter((a) => a.pageIndex === page.index);
  for (const a of pageAnnos) {
    if (a.kind === "draw") {
      ctx.save();
      ctx.strokeStyle = a.color || "#4f46e5";
      ctx.lineWidth = (a.size || 2) * scale;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      a.points.forEach((p, idx) => {
        const px = p.x * w;
        const py = p.y * h;
        if (idx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
      ctx.restore();
      continue;
    }

    const b = a as BoxLike;
    const ax = b.relX * w;
    const ay = b.relY * h;
    const aw = b.relWidth * w;
    const ah = b.relHeight * h;

    if (b.kind === "redact") {
      if (b.redactStyle === "blackout") {
        ctx.fillStyle = "#000000";
        ctx.fillRect(ax, ay, aw, ah);
      } else {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(ax, ay, aw, ah);
      }
    } else if (b.kind === "highlight") {
      ctx.save();
      ctx.fillStyle = b.color || "#fef08a";
      ctx.globalAlpha = 0.45;
      ctx.fillRect(ax, ay, aw, ah);
      ctx.restore();
    } else if (b.kind === "rect") {
      ctx.save();
      ctx.strokeStyle = b.color || "#4f46e5";
      ctx.lineWidth = 2 * scale;
      ctx.strokeRect(ax, ay, aw, ah);
      ctx.restore();
    } else if (b.kind === "circle") {
      ctx.save();
      ctx.strokeStyle = b.color || "#4f46e5";
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.ellipse(ax + aw / 2, ay + ah / 2, aw / 2, ah / 2, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    } else if ((b.kind === "signature" || b.kind === "image") && b.dataUrl) {
      await new Promise<void>((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          ctx.drawImage(img, ax, ay, aw, ah);
          resolve();
        };
        img.onerror = () => resolve();
        img.src = b.dataUrl!;
      });
    }
  }

  return canvas.toDataURL("image/png");
}
