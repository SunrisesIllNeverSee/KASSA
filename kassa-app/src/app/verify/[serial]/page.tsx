import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Badge from "@/components/ui/Badge";
import { mySeats } from "@/lib/data";

export function generateStaticParams() {
  return mySeats.map((s) => ({ serial: s.serialNumber }));
}

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ serial: string }>;
}) {
  const { serial } = await params;
  const seat = mySeats.find((s) => s.serialNumber === serial);

  if (!seat) {
    notFound();
  }

  const escrowColor =
    seat.escrowStatus === "released"
      ? "green"
      : seat.escrowStatus === "refunded"
        ? "red"
        : "gold";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Emblem Card */}
          <div className="bg-obsidian rounded-xl p-8 text-bone shadow-xl">
            <div className="text-center mb-6">
              <p className="font-mono text-[10px] text-driftwood uppercase tracking-widest mb-2">
                KA§§A Seat Verification
              </p>
              <h1 className="font-display text-2xl font-bold">
                {seat.productName}
              </h1>
            </div>

            <div className="border border-charcoal rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-driftwood uppercase tracking-wider">
                  Serial
                </span>
                <span className="font-mono text-sm text-gold">
                  {seat.serialNumber}
                </span>
              </div>
              <div className="border-t border-charcoal" />
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-driftwood uppercase tracking-wider">
                  Wave
                </span>
                <span className="font-mono text-sm">{seat.waveNumber}</span>
              </div>
              <div className="border-t border-charcoal" />
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-driftwood uppercase tracking-wider">
                  Price
                </span>
                <span className="font-mono text-sm">
                  ${seat.purchasePrice.toLocaleString()}
                </span>
              </div>
              <div className="border-t border-charcoal" />
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-driftwood uppercase tracking-wider">
                  Escrow
                </span>
                <Badge variant={escrowColor}>{seat.escrowStatus}</Badge>
              </div>
              <div className="border-t border-charcoal" />
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-driftwood uppercase tracking-wider">
                  Purchased
                </span>
                <span className="font-mono text-xs text-driftwood">
                  {seat.purchasedAt}
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-1.5 text-verdigris text-xs font-mono">
                <span>●</span> Verified Authentic
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link
              href="/listings"
              className="text-xs text-driftwood hover:text-obsidian transition-colors"
            >
              ← Back to Board
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
