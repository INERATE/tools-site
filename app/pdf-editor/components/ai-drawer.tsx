"use client";

import { useState } from "react";
import { Loader2, Sparkles, X } from "lucide-react";
import type { AiTask } from "../../lib/ai-prompts";
import type { ProviderId } from "../../lib/ai-providers";
import { useAi } from "../hooks/use-ai";
import { AiAnswer } from "./ai-answer";
import { AiSettings } from "./ai-settings";

const TASKS: { id: AiTask; label: string }[] = [
  { id: "summarize", label: "Summarise" },
  { id: "qa", label: "Ask a question" },
];

export function AiDrawer({ text, onClose }: { text: string; onClose: () => void }) {
  const ai = useAi();
  const [task, setTask] = useState<AiTask>("summarize");
  const [question, setQuestion] = useState("");
  const empty = text.trim().length === 0;

  return (
    <aside className="flex w-[320px] shrink-0 flex-col overflow-y-auto border-l border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
        <h2 className="flex items-center gap-1.5 text-[13px] font-bold text-slate-900">
          <Sparkles aria-hidden className="size-3.5 text-indigo-600" />
          AI Assistant
        </h2>
        <button onClick={onClose} aria-label="Close" className="grid size-6 place-items-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700">
          <X aria-hidden className="size-3.5" />
        </button>
      </div>

      <AiSettings
        provider={ai.settings.provider}
        keys={ai.settings.keys}
        onProvider={(p: ProviderId) => ai.save({ ...ai.settings, provider: p })}
        onKey={(p, v) => ai.save({ ...ai.settings, keys: { ...ai.settings.keys, [p]: v } })}
      />

      <div className="mt-4 flex gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
        {TASKS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTask(t.id)}
            className={`flex-1 rounded-md py-1.5 text-[12px] font-semibold transition-colors ${
              task === t.id ? "bg-white text-indigo-700 shadow-2xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {task === "qa" && (
        <input
          className="mt-2 w-full rounded-lg border border-slate-200 px-2.5 py-2 text-[12px] outline-none focus:border-indigo-500"
          placeholder="What does clause 4 say?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !empty && ai.run(task, text, question)}
        />
      )}

      <button
        disabled={ai.busy || empty || (task === "qa" && !question.trim())}
        onClick={() => ai.run(task, text, question)}
        className="mt-3 flex h-9 items-center justify-center gap-1.5 rounded-lg bg-indigo-600 text-[12.5px] font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {ai.busy && <Loader2 aria-hidden className="size-3.5 animate-spin" />}
        {ai.busy ? "Thinking…" : task === "qa" ? "Ask" : "Summarise document"}
      </button>

      {empty && <p className="mt-2 text-[11px] text-slate-500">Open a PDF with selectable text first.</p>}
      {ai.error && <p role="alert" className="mt-3 rounded-lg bg-rose-50 px-2.5 py-2 text-[11.5px] text-rose-700">{ai.error}</p>}

      {ai.answer && <AiAnswer text={ai.answer} />}
    </aside>
  );
}
