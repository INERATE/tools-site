"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import { readStoredTheme, resolve, serverTheme, subscribeTheme } from "../lib/theme";

// Public site key — Turnstile site keys are meant to ship in client code,
// unlike the secret key, which only ever lives server-side as a Worker secret.
const SITE_KEY = "0x4AAAAAAEYkD7pAg3qkyjCh";

/**
 * Drop inside any <form>. Cloudflare's script scans the DOM on load and
 * renders the widget in place, then injects a hidden `cf-turnstile-response`
 * input into the enclosing form once solved — no ref or render() call needed.
 */
export function TurnstileWidget() {
  // Every theme but daylight renders on a near-black background (see
  // app/themes.css) — Turnstile only offers a light/dark binary, so daylight
  // maps to light and the other four all map to dark.
  const choice = useSyncExternalStore(subscribeTheme, readStoredTheme, serverTheme);
  const theme = resolve(choice) === "daylight" ? "light" : "dark";

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" async defer />
      <div className="cf-turnstile" data-sitekey={SITE_KEY} data-theme={theme} />
    </>
  );
}
