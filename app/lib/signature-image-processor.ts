/**
 * Intelligent Signature Extraction and Paper Background Removal.
 * Converts photos of handwritten signatures on notebooks/notepads into crisp,
 * transparent, auto-cropped PNG signatures.
 */

export async function processSignatureImage(
  source: File | string,
  inkColor: "original" | "black" | "blue" = "black"
): Promise<{ url: string; w: number; h: number } | null> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        // Create working canvas
        const canvas = document.createElement("canvas");
        const maxDim = 1200;
        let scale = 1;
        if (img.width > maxDim || img.height > maxDim) {
          scale = Math.min(maxDim / img.width, maxDim / img.height);
        }
        const width = Math.round(img.width * scale);
        const height = Math.round(img.height * scale);

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return resolve(null);

        ctx.drawImage(img, 0, 0, width, height);
        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;

        // Step 1: Sample average paper background brightness from perimeter
        let bgLumSum = 0;
        let bgSamples = 0;
        const sampleCorner = (sx: number, sy: number) => {
          const idx = (sy * width + sx) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          bgLumSum += 0.299 * r + 0.587 * g + 0.114 * b;
          bgSamples++;
        };

        // Sample corners and borders to estimate paper background tone
        for (let x = 0; x < width; x += Math.max(1, Math.floor(width / 20))) {
          sampleCorner(x, 0);
          sampleCorner(x, height - 1);
        }
        for (let y = 0; y < height; y += Math.max(1, Math.floor(height / 20))) {
          sampleCorner(0, y);
          sampleCorner(width - 1, y);
        }

        const bgLum = bgSamples > 0 ? bgLumSum / bgSamples : 230;
        const threshold = Math.max(120, bgLum - 28);

        // Step 2: Extract ink and remove paper background
        let minX = width;
        let minY = height;
        let maxX = 0;
        let maxY = 0;
        let inkFound = false;

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const lum = 0.299 * r + 0.587 * g + 0.114 * b;

            if (lum < threshold) {
              // Ink pixel: calculate alpha based on how dark it is relative to the threshold
              const delta = threshold - lum;
              const alpha = Math.min(255, Math.round((delta / 70) * 255));

              if (alpha > 15) {
                inkFound = true;
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;

                if (inkColor === "black") {
                  data[idx] = 18;
                  data[idx + 1] = 24;
                  data[idx + 2] = 38;
                } else if (inkColor === "blue") {
                  data[idx] = 20;
                  data[idx + 1] = 60;
                  data[idx + 2] = 160;
                }
                data[idx + 3] = alpha;
              } else {
                data[idx + 3] = 0;
              }
            } else {
              // Paper background: 100% transparent
              data[idx + 3] = 0;
            }
          }
        }

        if (!inkFound) {
          return resolve(null);
        }

        // Step 3: Auto-crop to the bounding box with comfortable padding
        const pad = 12;
        minX = Math.max(0, minX - pad);
        minY = Math.max(0, minY - pad);
        maxX = Math.min(width - 1, maxX + pad);
        maxY = Math.min(height - 1, maxY + pad);
        const cropW = maxX - minX + 1;
        const cropH = maxY - minY + 1;

        ctx.putImageData(imgData, 0, 0);

        const cropCanvas = document.createElement("canvas");
        cropCanvas.width = cropW;
        cropCanvas.height = cropH;
        const cropCtx = cropCanvas.getContext("2d");
        if (!cropCtx) return resolve(null);

        cropCtx.drawImage(canvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH);
        resolve({
          url: cropCanvas.toDataURL("image/png"),
          w: cropW,
          h: cropH,
        });
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = () => reject(new Error("Could not load signature image."));

    if (typeof source === "string") {
      img.src = source;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          img.src = e.target.result;
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(source);
    }
  });
}
