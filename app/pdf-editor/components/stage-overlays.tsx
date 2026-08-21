"use client";

import type { usePdfEditor } from "../hooks/use-pdf-editor";
import type { EditorMode } from "../types";
import { ESignModal } from "./esign-modal";
import { LoadingSkeleton } from "./loading-skeleton";
import { OpenPanel } from "./open-panel";
import { RestoreBanner } from "./restore-banner";
import { ToolHint } from "./tool-hint";

/** Everything that floats over the page stage: open prompt, progress, hints, modals. */
export function StageOverlays({
  e, live, tool, onTool, signing, onCloseSign,
}: {
  e: ReturnType<typeof usePdfEditor>;
  live: boolean;
  tool: EditorMode;
  onTool: (t: EditorMode) => void;
  signing: boolean;
  onCloseSign: () => void;
}) {
  const page = e.pages[e.page];
  const idle = !live && !e.busy;

  return (
    <>
      {idle && <OpenPanel onFiles={e.open} error={e.error} />}
      {e.busy && <LoadingSkeleton done={e.progress.done} total={e.progress.total} />}
      {live && !e.busy && <ToolHint tool={tool} onDone={() => onTool("select")} />}
      {idle && e.restorable && (
        <RestoreBanner savedAt={e.restorable.savedAt} onRestore={e.restore} onDiscard={e.discardSaved} />
      )}
      {signing && page && (
        <ESignModal
          onClose={onCloseSign}
          onPlace={(dataUrl, ratio) => e.anno.placeSignature(e.page, dataUrl, ratio, page.width / page.height)}
        />
      )}
    </>
  );
}
