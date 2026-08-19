"use client";

import { useMemo, useState } from "react";
import { textStats } from "../lib/text-stats";

export function useWordCounter() {
  const [text, setText] = useState("");
  const stats = useMemo(() => textStats(text), [text]);
  return { text, setText, stats };
}
