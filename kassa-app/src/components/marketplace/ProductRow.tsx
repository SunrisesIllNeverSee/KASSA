import Link from "next/link";
import { Product } from "@/lib/types";
import { getActiveWave } from "@/lib/data";
import StatusBadge from "./StatusBadge";
import TrendIndicator from "./TrendIndicator";

export default function ProductRow({ product }: { product: Product }) {
  const activeWave = getActiveWave(product);
  const price = activeWave?.seatPrice;
  const pct = activeWave
    ? Math.round((activeWave.seatsSold / activeWave.totalSeats) * 100)
    : product.status === "completed"
      ? 100
      : 0;

  return (
    <Link href={`/listings/${product.slug}`}>
      <div className="grid grid-cols-[1fr_120px_100px_80px_80px] gap-4 items-center px-4 py-3 border-b border-sandstone/40 hover:bg-sandstone/20 transition-colors">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm font-semibold text-obsidian truncate">
              {product.name}
            </span>
            <StatusBadge status={product.status} />
          </div>
          <p className="text-xs text-driftwood truncate mt-0.5">
            {product.category}
          </p>
        </div>

        <div className="text-right font-mono text-sm text-obsidian">
          {price != null ? `$${price.toLocaleString()}` : "—"}
        </div>

        <div className="text-right">
          <div className="w-full h-1.5 bg-sandstone rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${pct >= 100 ? "bg-obsidian" : pct >= 70 ? "bg-terracotta" : "bg-gold"}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-driftwood">
            {product.totalSeatsSold}/{product.totalSeats}
          </span>
        </div>

        <div className="text-right">
          <TrendIndicator trend={product.trend} />
        </div>

        <div className="text-right font-mono text-xs text-driftwood">
          {product.productScore ? product.productScore.toFixed(1) : "—"}
        </div>
      </div>
    </Link>
  );
}
