export type AiTask = "summarize" | "qa" | "rewrite";

/**
 * One prompt definition shared by the free server route and the
 * bring-your-own-key client path, so switching provider changes who answers,
 * never what was asked.
 */
export function buildPrompt(task: AiTask, text: string, question = "") {
  if (task === "qa") {
    return {
      system:
        "Answer strictly from the document provided. If the answer is not in it, " +
        "say so plainly instead of guessing. Be concise.",
      user: `Document:\n${text}\n\nQuestion: ${question}`,
    };
  }

  if (task === "rewrite") {
    return {
      system:
        "Rewrite the text to be clear and professional. Preserve the meaning and " +
        "every fact exactly. Return only the rewritten text, with no preamble.",
      user: text,
    };
  }

  return {
    system:
      "Summarise the document. Return a two-sentence overview, then key points as " +
      "a short bullet list, then any action items. Use only what the document says.",
    user: text,
  };
}
