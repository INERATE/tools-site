"use client";

import { Send, Loader2, CheckCircle, ShieldCheck } from "lucide-react";
import { TurnstileWidget } from "./turnstile-widget";
import { useContactSubmit } from "./use-contact-submit";

const FIELD =
  "w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2 text-[14px] " +
  "text-[var(--text)] outline-none transition-colors focus:border-[var(--accent)] disabled:opacity-50";
const LABEL = "mb-1 block text-[12.5px] font-medium text-[var(--text-dim)]";

export function ContactForm() {
  const { status, error, submit } = useContactSubmit();
  const sending = status === "sending";

  if (status === "sent") {
    return (
      <div className="glass mt-6 flex flex-col items-center rounded-2xl px-6 py-10 text-center">
        <CheckCircle className="mb-3 size-10 text-emerald-500" />
        <p className="text-[15px] font-semibold text-[var(--text)]">Message sent</p>
        <p className="mt-1 text-[13.5px] text-[var(--text-dim)]">
          We reply to everything, usually within two working days.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit(e.currentTarget);
      }}
      className="glass mt-6 flex flex-col gap-4 rounded-2xl px-6 py-6"
    >
      <div>
        <label className={LABEL} htmlFor="name">Your name</label>
        <input className={FIELD} id="name" name="name" required maxLength={100} disabled={sending} />
      </div>
      <div>
        <label className={LABEL} htmlFor="email">Your email</label>
        <input className={FIELD} id="email" name="email" type="email" required maxLength={254} disabled={sending} />
      </div>
      <div>
        <label className={LABEL} htmlFor="message">Message</label>
        <textarea
          className={`${FIELD} resize-y`}
          id="message"
          name="message"
          rows={5}
          required
          maxLength={5000}
          disabled={sending}
          placeholder="Which tool, what happened, and what you expected instead."
        />
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <TurnstileWidget />

      {error && (
        <p role="alert" className="text-[13.5px] font-medium text-[#ff8fa3]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="clay flex h-12 cursor-pointer items-center justify-center gap-2 text-[15px] font-semibold disabled:cursor-default disabled:opacity-60"
      >
        {sending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
        {sending ? "Sending…" : "Send message"}
      </button>

      <p className="flex items-center gap-1.5 text-[12px] text-[var(--text-dim)]">
        <ShieldCheck className="size-3.5 shrink-0" />
        Protected by Cloudflare Turnstile — no data sold, ever.
      </p>

      <p className="text-[12px] text-[var(--text-dim)]">
        Please don&apos;t attach the document you were working on — we never receive your files and would rather keep
        it that way.
      </p>
    </form>
  );
}
