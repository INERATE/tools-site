import { zipImages } from "./zip-images";

/** A single result downloads directly; more than one gets bundled into a .zip. Shared by every image batch tool. */
export async function packageResults(
  results: { name: string; url: string; size: number }[],
  zipName: string,
): Promise<{ url: string; fileName: string; outSize: number }> {
  const outSize = results.reduce((n, r) => n + r.size, 0);
  if (results.length === 1) return { url: results[0].url, fileName: results[0].name, outSize };
  const zip = await zipImages(results);
  return { url: URL.createObjectURL(zip), fileName: `${zipName}.zip`, outSize };
}
