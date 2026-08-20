import type { Metadata } from "next";

// Work in progress: the shell is public so the design can be reviewed on a real
// device, but the engine is not wired yet — keep it out of the index until it is.
export const metadata: Metadata = {
  title: "PDF Editor (preview) | Inerate Tools",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
