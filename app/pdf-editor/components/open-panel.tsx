"use client";

import { Dropzone } from "../../components/dropzone";

/** The floating open-a-PDF card shown until a real document is loaded. */
export function OpenPanel({ onFiles, error }: { onFiles: (f: File[]) => void; error: string | null }) {
  return (
    <div className="absolute inset-x-0 bottom-20 z-30 mx-auto w-[min(520px,90%)]">
      <div className="liquid-card p-4">
        <Dropzone
          id="pdf-editor-input"
          onFiles={onFiles}
          label="Drop a PDF here to edit it for real"
          hint="Opens in this tab only — nothing is uploaded"
        />
        {error && (
          <p role="alert" className="text-[13px] font-medium text-[#ff8fa3]">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
