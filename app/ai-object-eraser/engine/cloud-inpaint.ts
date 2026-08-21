/**
 * BYOK (Bring Your Own Key) Cloud Generative Inpainting Engine
 * Supports:
 * - OpenAI (DALL-E Inpainting)
 * - Stability AI (Stable Image Inpaint)
 * - Replicate (FLUX.1 / SDXL Inpaint)
 */

export interface CloudInpaintOptions {
  provider: "openai" | "stability" | "replicate";
  apiKey: string;
  prompt?: string;
  imageCanvas: HTMLCanvasElement;
  maskCanvas: HTMLCanvasElement;
}

/**
 * Dispatches generative inpainting with optional text prompt conditioning
 */
export async function runCloudInpainting(options: CloudInpaintOptions): Promise<string> {
  const { provider, apiKey, prompt = "", imageCanvas, maskCanvas } = options;

  if (!apiKey) {
    throw new Error("Please provide your API key in Settings.");
  }

  // 1. OpenAI DALL-E Inpainting
  if (provider === "openai") {
    // Convert canvases to Blob
    const imageBlob = await new Promise<Blob | null>((resolve) => imageCanvas.toBlob(resolve, "image/png"));
    const maskBlob = await new Promise<Blob | null>((resolve) => maskCanvas.toBlob(resolve, "image/png"));

    if (!imageBlob || !maskBlob) throw new Error("Failed to process image canvases.");

    const formData = new FormData();
    formData.append("image", imageBlob, "image.png");
    formData.append("mask", maskBlob, "mask.png");
    formData.append("prompt", prompt.trim() || "seamless natural background fill, matching surrounding textures and lighting, high resolution photorealistic");
    formData.append("n", "1");
    formData.append("size", "1024x1024");
    formData.append("response_format", "b64_json");

    const res = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || "OpenAI Inpainting API call failed.");
    }

    const data = await res.json();
    return `data:image/png;base64,${data.data[0].b64_json}`;
  }

  // 2. Stability AI Inpainting
  if (provider === "stability") {
    const imageBlob = await new Promise<Blob | null>((resolve) => imageCanvas.toBlob(resolve, "image/png"));
    const maskBlob = await new Promise<Blob | null>((resolve) => maskCanvas.toBlob(resolve, "image/png"));

    if (!imageBlob || !maskBlob) throw new Error("Failed to process image canvases.");

    const formData = new FormData();
    formData.append("image", imageBlob);
    formData.append("mask", maskBlob);
    formData.append("prompt", prompt.trim() || "clean background, natural lighting, seamless continuation");
    formData.append("output_format", "png");

    const res = await fetch("https://api.stability.ai/v2beta/stable-image/edit/inpaint", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "image/*",
      },
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.errors?.[0] || "Stability AI Inpainting call failed.");
    }

    const blob = await res.blob();
    return URL.createObjectURL(blob);
  }

  // 3. Replicate FLUX / SDXL Inpaint
  if (provider === "replicate") {
    const imageBase64 = imageCanvas.toDataURL("image/png");
    const maskBase64 = maskCanvas.toDataURL("image/png");

    const res = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "cbf02652157a911762e5b7b92f7535b91b5b5a2bf4ec8f05e3f421ccb2e46b3f", // FLUX.1 Fill
        input: {
          image: imageBase64,
          mask: maskBase64,
          prompt: prompt.trim() || "seamless background fill",
        },
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Replicate API call failed.");
    }

    const data = await res.json();
    return data.output?.[0] || imageBase64;
  }

  throw new Error("Unsupported provider.");
}
