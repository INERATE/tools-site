export function Dropzone({ onFiles }: { onFiles: (list: FileList | null) => void }) {
  return (
    <label className="mb-6 block cursor-pointer rounded-xl glass border-dashed! px-6 py-10 text-center transition-colors hover:border-white/40">
      <input
        type="file"
        accept="application/pdf"
        multiple
        onChange={(e) => onFiles(e.target.files)}
        className="hidden"
      />
      <span className="text-sm text-[var(--text-dim)]">Click to add PDF files</span>
    </label>
  );
}
