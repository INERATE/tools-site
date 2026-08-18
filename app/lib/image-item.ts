/** One loaded image, shared by every tool that works on a batch of them. */
export type ImageItem = { id: string; file: File; url: string; w: number; h: number };

export function readImage(file: File): Promise<ImageItem> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve({ id: crypto.randomUUID(), file, url, w: img.naturalWidth, h: img.naturalHeight });
    img.src = url;
  });
}
