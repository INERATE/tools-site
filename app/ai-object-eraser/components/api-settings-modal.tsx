"use client";

import { useState, useEffect } from "react";
import { X, Key, ShieldCheck, ExternalLink, Check } from "lucide-react";

export function ApiSettingsModal({
  isOpen,
  onClose,
  activeProvider,
  onSelectProvider,
}: {
  isOpen: boolean;
  onClose: () => void;
  activeProvider: "local" | "openai" | "stability" | "replicate";
  onSelectProvider: (p: "local" | "openai" | "stability" | "replicate") => void;
}) {
  const [provider, setProvider] = useState<"local" | "openai" | "stability" | "replicate">(activeProvider);
  const [openaiKey, setOpenaiKey] = useState("");
  const [stabilityKey, setStabilityKey] = useState("");
  const [replicateKey, setReplicateKey] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setOpenaiKey(localStorage.getItem("inerate_byok_openai") || "");
    setStabilityKey(localStorage.getItem("inerate_byok_stability") || "");
    setReplicateKey(localStorage.getItem("inerate_byok_replicate") || "");
  }, []);

  const handleSave = () => {
    localStorage.setItem("inerate_byok_openai", openaiKey.trim());
    localStorage.setItem("inerate_byok_stability", stabilityKey.trim());
    localStorage.setItem("inerate_byok_replicate", replicateKey.trim());
    onSelectProvider(provider);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
      <div className="relative flex max-h-[90vh] w-full max-w-lg flex-col rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Key className="size-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">AI Engine & API Settings</h3>
              <p className="text-xs text-slate-400">Bring Your Own Key (BYOK) for studio models</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Engine Selection */}
        <div className="my-5 flex flex-col gap-3">
          <label className="text-xs font-bold text-slate-300">Select AI Engine:</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setProvider("local")}
              className={`flex flex-col items-start gap-1 rounded-2xl border p-3 text-left transition-all ${
                provider === "local"
                  ? "border-indigo-500 bg-indigo-500/10 text-white shadow-sm"
                  : "border-slate-800 bg-slate-900/80 text-slate-400 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-bold text-white">⚡ Fast Client AI</span>
                {provider === "local" && <Check className="size-3.5 text-indigo-400" />}
              </div>
              <span className="text-[10px] text-slate-400">Free, instant, 0-latency (Default)</span>
            </button>

            <button
              onClick={() => setProvider("openai")}
              className={`flex flex-col items-start gap-1 rounded-2xl border p-3 text-left transition-all ${
                provider === "openai"
                  ? "border-indigo-500 bg-indigo-500/10 text-white shadow-sm"
                  : "border-slate-800 bg-slate-900/80 text-slate-400 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-bold text-white">🌟 OpenAI DALL-E</span>
                {provider === "openai" && <Check className="size-3.5 text-indigo-400" />}
              </div>
              <span className="text-[10px] text-slate-400">Custom object prompt generation</span>
            </button>

            <button
              onClick={() => setProvider("stability")}
              className={`flex flex-col items-start gap-1 rounded-2xl border p-3 text-left transition-all ${
                provider === "stability"
                  ? "border-indigo-500 bg-indigo-500/10 text-white shadow-sm"
                  : "border-slate-800 bg-slate-900/80 text-slate-400 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-bold text-white">🎨 Stability AI</span>
                {provider === "stability" && <Check className="size-3.5 text-indigo-400" />}
              </div>
              <span className="text-[10px] text-slate-400">Stable Diffusion 3.5 Inpaint</span>
            </button>

            <button
              onClick={() => setProvider("replicate")}
              className={`flex flex-col items-start gap-1 rounded-2xl border p-3 text-left transition-all ${
                provider === "replicate"
                  ? "border-indigo-500 bg-indigo-500/10 text-white shadow-sm"
                  : "border-slate-800 bg-slate-900/80 text-slate-400 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-bold text-white">🚀 Replicate (FLUX)</span>
                {provider === "replicate" && <Check className="size-3.5 text-indigo-400" />}
              </div>
              <span className="text-[10px] text-slate-400">FLUX.1 Fill & SDXL</span>
            </button>
          </div>

          {/* API Key Inputs */}
          {provider === "openai" && (
            <div className="mt-2 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">OpenAI API Key:</span>
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[11px] text-indigo-400 hover:underline"
                >
                  Get Key <ExternalLink className="size-3" />
                </a>
              </div>
              <input
                type="password"
                placeholder="sk-..."
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white outline-none focus:border-indigo-500"
              />
            </div>
          )}

          {provider === "stability" && (
            <div className="mt-2 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Stability AI API Key:</span>
                <a
                  href="https://platform.stability.ai/account/keys"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[11px] text-indigo-400 hover:underline"
                >
                  Get Key <ExternalLink className="size-3" />
                </a>
              </div>
              <input
                type="password"
                placeholder="sk-..."
                value={stabilityKey}
                onChange={(e) => setStabilityKey(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white outline-none focus:border-indigo-500"
              />
            </div>
          )}

          {provider === "replicate" && (
            <div className="mt-2 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Replicate API Token:</span>
                <a
                  href="https://replicate.com/account/api-tokens"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[11px] text-indigo-400 hover:underline"
                >
                  Get Token <ExternalLink className="size-3" />
                </a>
              </div>
              <input
                type="password"
                placeholder="r8_..."
                value={replicateKey}
                onChange={(e) => setReplicateKey(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white outline-none focus:border-indigo-500"
              />
            </div>
          )}

          {/* Privacy Note */}
          <div className="mt-3 flex items-start gap-2 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-3 text-[11px] text-indigo-200">
            <ShieldCheck className="size-4 shrink-0 text-indigo-400 mt-0.5" />
            <span>
              <strong>100% Client-Side Privacy:</strong> Your API keys are saved only in your browser’s localStorage. They are never sent to our servers or stored in any database.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-slate-800 pt-4">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-indigo-500 transition-all"
          >
            {saved ? <Check className="size-3.5" /> : null}
            {saved ? "Saved!" : "Save & Use"}
          </button>
        </div>
      </div>
    </div>
  );
}
