"use client";

import { useEffect } from "react";
import { useConvertImage } from "../convert-image/use-convert-image";
import type { ImageFormat } from "./transform-image";

/** Same engine as /convert-image, locked to one output format — for single-purpose format-pair landing pages. */
export function useLockedImageFormat(format: ImageFormat) {
  const c = useConvertImage();
  useEffect(() => {
    c.setFormat(format);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return c;
}
