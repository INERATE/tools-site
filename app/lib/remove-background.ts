/**
 * Segments the subject from its background entirely in the browser via
 * @imgly/background-removal — a maintained library rather than hand-rolled
 * ONNX plumbing, since a real segmentation model is a project of its own.
 * The smallest model (isnet_quint8, quantized) is used to keep the
 * one-time download reasonable; it downloads from a CDN on first use,
 * the one deliberate network exception this tool discloses in its copy.
 */
export async function removeImageBackground(file: File, onProgress?: (frac: number) => void): Promise<Blob> {
  const mod = await import("@imgly/background-removal");
  return mod.removeBackground(file, {
    model: "isnet_quint8",
    output: { format: "image/png", quality: 0.9 },
    progress: (_key: string, current: number, total: number) => onProgress?.(total > 0 ? current / total : 0),
  });
}
