import { Section } from "../legal/legal-section";

/** First half of the privacy policy body — processing, AI exception, analytics. */
export function PrivacyContentPartOne() {
  return (
    <>
      <Section title="The short version">
        <p>
          Every tool on tools.inerate.com runs entirely in your browser. When you open a PDF, image, or document to
          merge, convert, compress, sign, or edit it, that file is processed on your own device using JavaScript and
          WebAssembly — it is never uploaded to our servers. We don&apos;t see it, store it, or have any way to access
          it. Closing the tab or navigating away discards everything.
        </p>
      </Section>

      <Section title="The one exception: AI-powered tools">
        <p>
          A small number of tools (AI Summarizer, Translate PDF) work differently by necessity: there is no
          on-device AI model capable of summarizing or translating text. For those tools only, the text extracted
          from your document — never the original file — is sent to a backend for processing, and the result is
          returned to your browser. No other tool on this site sends any data anywhere.
        </p>
      </Section>

      <Section title="Analytics">
        <p>
          We use Google Analytics to understand aggregate traffic — which pages are visited, which tools are
          popular, and general usage patterns. Google Analytics uses cookies and collects standard technical data
          (browser type, approximate location, pages viewed). This data is not tied to the files you process, since
          those never leave your device. You can opt out using the{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] underline underline-offset-2"
          >
            Google Analytics Opt-out Browser Add-on
          </a>
          .
        </p>
      </Section>
    </>
  );
}
