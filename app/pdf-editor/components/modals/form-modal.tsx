"use client";

import { CheckSquare, Edit3, Plus, Sparkles, X } from "lucide-react";

export function FormModal({
  isOpen,
  onClose,
  onAddTextField,
  onAddCheckbox,
  onAddSignature,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddTextField?: () => void;
  onAddCheckbox?: () => void;
  onAddSignature?: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 grid size-8 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <X className="size-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="grid size-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
            <CheckSquare className="size-5" />
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-slate-900">Interactive Form Controls</h3>
            <p className="text-[12px] text-slate-500">Insert fillable form inputs directly onto this page.</p>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 mb-5">
          <button
            onClick={() => {
              onAddTextField?.();
              onClose();
            }}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 text-[12.5px] font-medium text-slate-700 hover:border-indigo-400 hover:bg-indigo-50/40 transition-all shadow-2xs group"
          >
            <span className="flex items-center gap-2.5">
              <Edit3 className="size-4 text-indigo-600 group-hover:scale-110 transition-transform" />
              <span>Fillable Text Field</span>
            </span>
            <span className="text-[11px] font-bold text-indigo-600">Insert +</span>
          </button>

          <button
            onClick={() => {
              onAddCheckbox?.();
              onClose();
            }}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 text-[12.5px] font-medium text-slate-700 hover:border-indigo-400 hover:bg-indigo-50/40 transition-all shadow-2xs group"
          >
            <span className="flex items-center gap-2.5">
              <CheckSquare className="size-4 text-indigo-600 group-hover:scale-110 transition-transform" />
              <span>Interactive Checkbox</span>
            </span>
            <span className="text-[11px] font-bold text-indigo-600">Insert +</span>
          </button>

          <button
            onClick={() => {
              onAddSignature?.();
              onClose();
            }}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 text-[12.5px] font-medium text-slate-700 hover:border-indigo-400 hover:bg-indigo-50/40 transition-all shadow-2xs group"
          >
            <span className="flex items-center gap-2.5">
              <Sparkles className="size-4 text-indigo-600 group-hover:scale-110 transition-transform" />
              <span>Signature & Date Stamp</span>
            </span>
            <span className="text-[11px] font-bold text-indigo-600">Insert +</span>
          </button>
        </div>

        <div className="flex items-center justify-end">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-[12.5px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
