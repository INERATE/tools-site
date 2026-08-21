"use client";

import { forwardRef } from "react";

/** Hidden file input the Image tool triggers; hands back a data: URI. */
export const ImagePicker = forwardRef<HTMLInputElement, { onPick: (dataUrl: string) => void }>(
  function ImagePicker({ onPick }, ref) {
    return (
      <input
        ref={ref}
        type="file"
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={async (ev) => {
          const f = ev.target.files?.[0];
          ev.target.value = "";
          if (!f) return;
          const reader = new FileReader();
          reader.onload = () => onPick(String(reader.result));
          reader.readAsDataURL(f);
        }}
      />
    );
  },
);
