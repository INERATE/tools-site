"use client";

import { useState } from "react";

const KEY = "pro";

/**
 * Entitlement stub — always false until a real payment gateway exists.
 * Ad slots and any future paywall check this, so wiring up billing later
 * is a one-line change here, not a search-and-replace across the site.
 */
export function useIsPro() {
  const [isPro] = useState(() => typeof window !== "undefined" && localStorage.getItem(KEY) === "true");
  return isPro;
}
