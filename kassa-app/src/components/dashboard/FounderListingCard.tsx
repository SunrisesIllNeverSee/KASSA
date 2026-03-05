import { Product } from "@/lib/types";
import { getActiveWave } from "@/lib/data";
import StatusBadge from "@/components/marketplace/StatusBadge";
import WaveProgressBar from "@/components/marketplace/WaveProgressBar";

export default function FounderListingCard({ product }: { product: Product }) {
  const activeWave = getActiveWave(product);

  return (
    <div className="bg-white rounded-lg border border-sandstone p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-obsidian">
            {product.name}
          </h3>
          <p className="text-xs text-driftwood">{product.category}</p>
        </div>
        <StatusBadge status={product.status} />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-2 bg-bone rounded">
          <p className="font-mono text-lg font-semibold text-obsidian">
            {product.totalSeatsSold}
          </p>
          <p className="text-[10px] text-driftwood uppercase">Sold</p>
        </div>
        <div className="text-center p-2 bg-bone rounded">
          <p className="font-mono text-lg font-semibold text-obsidian">
            {product.totalSeats}
          </p>
          <p className="text-[10px] text-driftwood uppercase">Total</p>
        </div>
        <div className="text-center p-2 bg-bone rounded">
          <p className="font-mono text-lg font-semibold text-obsidian">
            {product.waves.length}
          </p>
          <p className="text-[10px] text-driftwood uppercase">Waves</p>
        </div>
      </div>

      {activeWave && (
        <div>
          <p className="text-xs text-driftwood mb-1">
            Active: Wave {activeWave.waveNumber} — $
            {activeWave.seatPrice.toLocaleString()}
          </p>
          <WaveProgressBar
            seatsSold={activeWave.seatsSold}
            totalSeats={activeWave.totalSeats}
          />
        </div>
      )}
    </div>
  );
}
