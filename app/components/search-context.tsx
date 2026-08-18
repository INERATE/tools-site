"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useSearchShortcut } from "../lib/use-search-shortcut";

type SearchContextValue = { open: boolean; setOpen: (v: boolean) => void; openSearch: () => void };

const SearchContext = createContext<SearchContextValue | null>(null);

/**
 * One shared open/closed state for the search overlay, so any trigger
 * (the nav pill, the homepage's large search bar) opens the same instance
 * instead of each mounting its own overlay + its own Cmd/Ctrl+K listener.
 */
export function SearchProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  useSearchShortcut(setOpen, () => setOpen(false));

  return (
    <SearchContext.Provider value={{ open, setOpen, openSearch: () => setOpen(true) }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearchContext must be used within a SearchProvider");
  return ctx;
}
