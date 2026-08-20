import { AmbientBlob } from "./components/ambient-blob";
import { Nav } from "./components/nav";
import { Dock } from "./components/dock";

export default function Loading() {
  return (
    <div className="min-h-screen">
      <AmbientBlob />
      <Nav />
      <Dock />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        {/* Tool Header Skeleton */}
        <div className="mb-8 max-w-2xl space-y-3">
          <div className="flex items-center gap-3">
            <div className="size-9 animate-pulse rounded-xl bg-[var(--border)]/60" />
            <div className="h-8 w-48 animate-pulse rounded-lg bg-[var(--border)]/70" />
          </div>
          <div className="h-4 w-full max-w-md animate-pulse rounded bg-[var(--border)]/40" />
        </div>

        {/* Tool Window Skeleton */}
        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
          <div className="overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--bg-raised)]/92 p-6 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.22)] backdrop-blur-[36px]">
            <div className="flex items-center gap-2 border-b border-[var(--border)]/60 pb-4">
              <span className="size-3 rounded-full bg-[#FF5F56]/60" />
              <span className="size-3 rounded-full bg-[#FFBD2E]/60" />
              <span className="size-3 rounded-full bg-[#27C93F]/60" />
              <div className="ml-3 h-3 w-32 animate-pulse rounded bg-[var(--border)]/50" />
            </div>

            {/* Dropzone Skeleton */}
            <div className="mt-6 flex h-64 animate-pulse flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--border)]/80 bg-[var(--bg)]/40 p-8">
              <div className="size-12 rounded-full bg-[var(--border)]/60 mb-3" />
              <div className="h-4 w-44 rounded bg-[var(--border)]/50 mb-2" />
              <div className="h-3 w-28 rounded bg-[var(--border)]/30" />
            </div>
          </div>

          {/* Sidebar Panel Skeleton */}
          <div className="hidden lg:block space-y-4">
            <div className="h-44 animate-pulse rounded-2xl border border-[var(--border)] bg-[var(--bg-raised)]/80 p-4" />
            <div className="h-28 animate-pulse rounded-2xl border border-[var(--border)] bg-[var(--bg-raised)]/80 p-4" />
          </div>
        </div>
      </main>
    </div>
  );
}
