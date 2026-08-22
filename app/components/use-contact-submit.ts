"use client";

import { useState } from "react";

export function useContactSubmit() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(form: HTMLFormElement) {
    setStatus("sending");
    setError(null);

    const data = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Cloudflare's script injects a hidden `cf-turnstile-response` input
        // into this form once the widget solves — Object.fromEntries picks it
        // up like any other field, so the route reads it under that key.
        body: JSON.stringify({ ...Object.fromEntries(data), turnstileToken: data.get("cf-turnstile-response") }),
      });
      const body = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(body.error);
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "Could not send your message.");
      setStatus("idle");
    }
  }

  return { status, error, submit };
}
