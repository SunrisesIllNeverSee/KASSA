import Link from "next/link";
import { Product } from "@/lib/types";
import { getActiveWave } from "@/lib/data";
import StatusBadge from "./StatusBadge";
import WaveProgressBar from "./WaveProgressBar";
import Badge from "@/components/ui/Badge";

export default function ProductCard({ product }: { product: Product }) {
  const activeWave = getActiveWave(product);
  const price = activeWave?.seatPrice;

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="bg-white rounded-lg border border-sandstone p-5 hover:border-gold/50 hover:shadow-md transition-all duration-200 flex flex-col gap-3 min-w-[260px]">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-base font-semibold text-obsidian">
              {product.name}
            </h3>
            <p className="text-xs text-driftwood mt-0.5">{product.founderName}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <Badge variant={product.cascadeType === "enterprise" ? "dark" : "blue"}>
              {product.cascadeType}
            </Badge>
            <StatusBadge status={product.status} />
          </div>
        </div>

        <p className="text-xs text-driftwood">{product.category}</p>

        <p className="text-sm text-driftwood leading-relaxed line-clamp-2">
          {product.descriptionShort}
        </p>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-sandstone/60">
          <div className="flex items-center gap-3">
            {price != null && (
              <span className="font-mono text-sm font-semibold text-obsidian">
                ${price.toLocaleString()}
              </span>
            )}
            {activeWave && (
              <span className="text-[10px] font-mono text-driftwood">
                Wave {activeWave.waveNumber} · {activeWave.totalSeats - activeWave.seatsSold} seats left
              </span>
            )}
            {!activeWave && product.status === "completed" && (
              <span className="text-xs font-mono text-driftwood">Sold Out</span>
            )}
          </div>
        </div>

        {activeWave && (
          <WaveProgressBar
            seatsSold={activeWave.seatsSold}
            totalSeats={activeWave.totalSeats}
          />
        )}
      </div>
    </Link>
  );
}
