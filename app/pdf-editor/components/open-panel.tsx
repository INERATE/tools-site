"use client";

import { Dropzone } from "../../components/dropzone";

/** The floating open-a-PDF card shown until a real document is loaded. */
export function OpenPanel({ onFiles, error }: { onFiles: (f: File[]) => void; error: string | null }) {
  return (
    <div className="absolute inset-x-0 bottom-24 z-30 mx-auto w-[min(520px,90%)]">
      <div className="rounded-2xl border border-slate-200/90 bg-white/95 p-4 shadow-xl backdrop-blur-md">
        <Dropzone
          id="pdf-editor-input"
          onFiles={onFiles}
          label="Drop a PDF here to edit it for real"
          hint="Opens in your browser only — completely private and secure"
        />
        {error && (
          <p role="alert" className="mt-2 text-[13px] font-medium text-rose-500">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
