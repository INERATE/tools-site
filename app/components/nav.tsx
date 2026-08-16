import Link from "next/link";

export function Nav() {
  return (
    <header className="glass sticky top-0 z-10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-sm font-semibold tracking-[0.2em] uppercase">
          Inerate <span className="text-[#25be74]">Tools</span>
        </Link>
        <nav className="flex gap-5 text-sm text-[#9b9b98]">
          <a href="https://forge.inerate.com" className="hover:text-[#f5f5f3] transition-colors">
            Forge
          </a>
          <a
            href="https://github.com/inerate"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#f5f5f3] transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
