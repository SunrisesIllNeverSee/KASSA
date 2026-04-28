import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-obsidian border-t border-charcoal mt-auto">
      <div className="max-w-[1300px] mx-auto px-6 sm:px-12 py-12 flex flex-col sm:flex-row justify-between gap-10">
        <div>
          <Link href="/" className="font-mono text-[22px] font-bold text-bone tracking-tight">
            <span className="text-gold">§</span>KA<span className="text-gold">§§</span>A
          </Link>
          <p className="font-mono text-[10px] text-driftwood mt-2 uppercase tracking-widest">
            MO<span className="text-gold">§</span>E<span className="text-gold">§</span>™ Protocol Compliant
          </p>
          <p className="text-xs text-driftwood/60 mt-8">© 2026 Ello Cello LLC</p>
        </div>
        <div className="flex gap-16">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] text-gold uppercase tracking-widest font-bold mb-1">Marketplace</span>
            <Link href="/listings" className="text-sm text-driftwood hover:text-bone transition-colors">Browse Listings</Link>
            <Link href="/listings" className="text-sm text-driftwood hover:text-bone transition-colors">How It Works</Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] text-gold uppercase tracking-widest font-bold mb-1">Founders</span>
            <Link href="/login" className="text-sm text-driftwood hover:text-bone transition-colors">List Your Product</Link>
            <Link href="/login" className="text-sm text-driftwood hover:text-bone transition-colors">Documentation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
