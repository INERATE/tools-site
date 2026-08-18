import type { ImageItem } from "./image-item";
import { transformImage, type ImageFormat, EXT } from "./transform-image";
import { packageResults } from "./package-results";

/**
 * Transforms every image in a batch with the SAME options and packages the
 * result — used by Resize/Convert Image, where every image gets one shared
 * setting. Compress Image varies the format per image, so it calls
 * transformImage + packageResults directly instead of this.
 */
export async function runImageBatch(
  images: ImageItem[],
  opts: { scale?: number; quality?: number; format: ImageFormat },
  zipName: string,
): Promise<{ url: string; fileName: string; inSize: number; outSize: number }> {
  const inSize = images.reduce((n, i) => n + i.file.size, 0);
  const ext = EXT[opts.format];

  const results = await Promise.all(
    images.map(async (img) => {
      const blob = await transformImage(img, opts);
      return { name: `${img.file.name.replace(/\.[^.]+$/, "")}.${ext}`, url: URL.createObjectURL(blob), size: blob.size };
    }),
  );
  const packaged = await packageResults(results, zipName);
  return { ...packaged, inSize };
}
