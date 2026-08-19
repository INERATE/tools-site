"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useTilt } from "../lib/use-tilt";
import { ActivityPanel } from "./demo/activity-panel";
import { WindowTitlebar } from "./demo/window-titlebar";
import { WorkspacePanel } from "./demo/workspace-panel";
import type { ToolMode } from "./demo/types";

export function MacOSWindow() {
  const tilt = useTilt(5);
  const [activeTab, setActiveTab] = useState<ToolMode>("merge");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [preserveBookmarks, setPreserveBookmarks] = useState(true);
  const [compressionMode, setCompressionMode] = useState<"lossless" | "fast">("lossless");

  // Illustrative demo of the real flow. It deliberately reports no timing:
  // an earlier version rendered a random 0.024-0.040s as if measured.
  const runDemo = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setIsDone(false);
    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(true);
    }, 420);
  };

  return (
    <div id="demo-stage" className="mx-auto mt-12 w-full max-w-5xl scroll-mt-28">
      <motion.div
        onPointerMove={tilt.move}
        onPointerEnter={tilt.enter}
        onPointerDown={tilt.down}
        onPointerUp={tilt.enter}
        onPointerLeave={tilt.leave}
        style={{ rotateX: tilt.rx, rotateY: tilt.ry, y: tilt.lift, transformPerspective: 1000 }}
        className="relative overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--bg-raised)]/92 shadow-[0_36px_90px_-20px_rgba(0,0,0,0.55),0_12px_32px_-10px_var(--glow),inset_0_1.5px_1px_var(--glass-hi)] backdrop-blur-[36px] transition-shadow duration-300"
      >
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
          style={{ backgroundImage: tilt.glare, opacity: tilt.glow }}
        />

        <WindowTitlebar
          active={activeTab}
          onChange={(t) => {
            setActiveTab(t);
            setIsDone(false);
          }}
        />

        <div className="relative z-10 grid grid-cols-1 divide-y divide-[var(--border)] lg:grid-cols-12 lg:divide-x lg:divide-y-0">
          <WorkspacePanel
            mode={activeTab}
            preserveBookmarks={preserveBookmarks}
            onPreserveBookmarks={setPreserveBookmarks}
            compressionMode={compressionMode}
            onCompressionMode={setCompressionMode}
            processing={isProcessing}
            onRun={runDemo}
          />
          <ActivityPanel mode={activeTab} processing={isProcessing} done={isDone} onRun={runDemo} />
        </div>
      </motion.div>
    </div>
  );
}
