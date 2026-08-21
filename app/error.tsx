"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Auto-reload on chunk load error after deployment
    if (
      error.message?.includes("Loading chunk") ||
      error.message?.includes("ChunkLoadError") ||
      error.name === "ChunkLoadError"
    ) {
      const key = "last_chunk_reload";
      const last = sessionStorage.getItem(key);
      const now = Date.now();
      if (!last || now - Number(last) > 8000) {
        sessionStorage.setItem(key, String(now));
        window.location.reload();
      }
    }
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center text-slate-100">
      <div className="max-w-md space-y-4">
        <h2 className="text-lg font-bold text-white">Page Updated</h2>
        <p className="text-xs text-slate-400">
          A newer version of the tool was just deployed. Click below to refresh.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-indigo-500 transition-all cursor-pointer"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}
