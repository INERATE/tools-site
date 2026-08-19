/** Read-only monospace preview of the extracted text, capped for render cost on very long PDFs. */
export function TextPreview({ lines }: { lines: string[] }) {
  const shown = lines.slice(0, 500);
  return (
    <div className="glass max-h-[420px] overflow-y-auto rounded-2xl p-5">
      <pre className="font-mono text-[13px] leading-relaxed whitespace-pre-wrap text-[var(--text)]">
        {shown.join("\n")}
      </pre>
      {lines.length > shown.length && (
        <p className="mt-3 text-[12px] text-[var(--text-dim)]">
          Showing the first {shown.length} of {lines.length} lines — the full text is in the download.
        </p>
      )}
    </div>
  );
}
