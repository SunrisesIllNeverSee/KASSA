import { Product } from "@/lib/types";
import WaveProgressBar from "./WaveProgressBar";
import Button from "@/components/ui/Button";

export default function CascadePanel({ product }: { product: Product }) {
  const activeWave = product.waves.find((w) => w.status === "active");

  return (
    <div className="bg-charcoal rounded-lg p-6 text-bone">
      <h3 className="font-display text-base font-semibold mb-1">
        Wave Cascade
      </h3>
      <p className="text-xs text-driftwood mb-5">
        Each wave must sell out before the next opens. Price escalates 1.5× per wave.
      </p>

      <div className="space-y-4">
        {product.waves.map((wave) => {
          const isActive = wave.status === "active";
          const isSoldOut = wave.status === "sold_out";

          return (
            <div
              key={wave.id}
              className={`p-3 rounded-md border ${
                isActive
                  ? "border-gold/50 bg-obsidian"
                  : isSoldOut
                    ? "border-charcoal bg-obsidian/50 opacity-60"
                    : "border-charcoal bg-obsidian/30 opacity-40"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-driftwood">
                    WAVE {wave.waveNumber}
                  </span>
                  {isActive && (
                    <span className="text-[10px] font-mono text-gold px-1.5 py-0.5 bg-gold/10 rounded">
                      ACTIVE
                    </span>
                  )}
                  {isSoldOut && (
                    <span className="text-[10px] font-mono text-driftwood px-1.5 py-0.5 bg-driftwood/10 rounded">
                      FILLED
                    </span>
                  )}
                  {wave.status === "upcoming" && (
                    <span className="text-[10px] font-mono text-driftwood/50 px-1.5 py-0.5">
                      LOCKED
                    </span>
                  )}
                </div>
                <span className="font-mono text-sm font-semibold">
                  ${wave.seatPrice.toLocaleString()}
                </span>
              </div>

              <WaveProgressBar
                seatsSold={wave.seatsSold}
                totalSeats={wave.totalSeats}
              />
            </div>
          );
        })}
      </div>

      {activeWave && (
        <div className="mt-6">
          <Button size="lg" className="w-full">
            Claim Seat — ${activeWave.seatPrice.toLocaleString()}
          </Button>
          <p className="text-[10px] text-driftwood text-center mt-2">
            {activeWave.totalSeats - activeWave.seatsSold} of{" "}
            {activeWave.totalSeats} seats remaining in Wave{" "}
            {activeWave.waveNumber}
          </p>
        </div>
      )}

      {!activeWave && product.status === "completed" && (
        <div className="mt-6 text-center">
          <p className="font-mono text-sm text-driftwood">
            All waves complete — fully subscribed
          </p>
        </div>
      )}
    </div>
  );
}
