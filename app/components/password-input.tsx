"use client";

export function PasswordInput({
  value,
  onChange,
  label = "Password",
}: {
  value: string;
  onChange: (v: string) => void;
  label?: string;
}) {
  return (
    <label className="mb-4 flex items-center gap-2 text-[12.5px] text-[var(--text-dim)]">
      {label}
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter password"
        autoComplete="off"
        className="w-48 rounded-lg border border-[var(--border)] bg-transparent px-2 py-1 text-[var(--text)] outline-none focus:border-[var(--accent)]"
      />
    </label>
  );
}
