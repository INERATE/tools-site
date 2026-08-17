/* Glass material without .glass's gradient ring — a dashed edge and a luminous
   hairline on the same 1px read as noise. Same pattern the nav bar uses. */
const ZONE =
  "mb-6 block cursor-pointer rounded-[20px] border-2 border-dashed border-[var(--border)] " +
  "bg-[var(--glass-bg)] px-6 py-12 text-center backdrop-blur-[24px] backdrop-saturate-[180%] " +
  "transition-[border-color,transform,box-shadow] duration-300 will-change-transform " +
  "hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[0_20px_50px_-22px_var(--glow)] " +
  "has-[:focus-visible]:border-[var(--accent)] motion-reduce:transition-colors motion-reduce:hover:translate-y-0";

export function Dropzone({
  onFiles,
  multiple = false,
  label,
  hint = "PDFs only — they never leave this tab",
  accept = "application/pdf",
}: {
  onFiles: (files: File[]) => void;
  multiple?: boolean;
  label: string;
  hint?: string;
  accept?: string;
}) {
  return (
    <label className={ZONE}>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={(e) => {
          onFiles(Array.from(e.target.files ?? []));
          e.target.value = ""; // re-picking the same file must still fire change
        }}
      />
      <span className="block text-[15px] font-medium">{label}</span>
      <span className="mt-1.5 block text-[13px] text-[var(--text-dim)]">{hint}</span>
    </label>
  );
}
