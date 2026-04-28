import Link from "next/link";

export default function Header() {
  return (
    <header className="glass-nav sticky top-0 z-50 border-b border-charcoal">
      <div className="max-w-[1300px] mx-auto px-6 sm:px-12 h-16 flex items-center justify-between">
        <Link href="/" className="font-mono text-[22px] font-bold text-bone tracking-tight">
          <span className="text-gold">§</span>KA<span className="text-gold">§§</span>A
        </Link>
        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className="hidden sm:block text-sm font-bold text-sandstone hover:text-gold transition-colors"
          >
            The Board
          </Link>
          <Link
            href="/list"
            className="hidden sm:block text-sm text-sandstone hover:text-gold transition-colors"
          >
            List a Product
          </Link>
          <Link
            href="/"
            className="inline-block bg-gold text-obsidian font-bold text-sm px-5 py-2.5 rounded-md btn-glow"
          >
            Browse Seats
          </Link>
        </nav>
      </div>
    </header>
  );
}
