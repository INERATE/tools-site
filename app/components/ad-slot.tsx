"use client";

import Script from "next/script";
import { AD_CLIENT, adsConfigured } from "../lib/ads-config";
import { useIsPro } from "../lib/use-is-pro";

/**
 * A single ad unit. Renders nothing until an AdSense client ID is
 * configured (no empty placeholder box) and nothing for Pro users — ads
 * fund the free tier, Pro removes them. Every placement in this app sits
 * below the primary action (upload → result → download), never inside it.
 */
export function AdSlot({ slot }: { slot: string }) {
  const isPro = useIsPro();
  if (!adsConfigured || isPro) return null;

  return (
    <div className="glass overflow-hidden rounded-2xl p-2">
      <ins
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <Script id={`adsbygoogle-push-${slot}`} strategy="afterInteractive">
        {`(window.adsbygoogle = window.adsbygoogle || []).push({});`}
      </Script>
    </div>
  );
}
