import Link from "next/link";
import { Seat } from "@/lib/types";
import Badge from "@/components/ui/Badge";

const escrowVariant: Record<string, "gold" | "green" | "red" | "gray"> = {
  held: "gold",
  pending: "gold",
  released: "green",
  refunded: "red",
};

export default function SeatCard({ seat }: { seat: Seat }) {
  return (
    <div className="bg-white rounded-lg border border-sandstone p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-display text-base font-semibold text-obsidian">
            {seat.productName}
          </h3>
          <p className="font-mono text-xs text-driftwood mt-0.5">
            Wave {seat.waveNumber}
          </p>
        </div>
        <Badge variant={escrowVariant[seat.escrowStatus] || "gray"}>
          {seat.escrowStatus}
        </Badge>
      </div>

      <div className="bg-bone rounded-md p-3 border border-sandstone/60">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-driftwood uppercase tracking-wider">
            Serial
          </span>
          <Link
            href={`/verify/${seat.serialNumber}`}
            className="font-mono text-sm text-obsidian hover:text-gold transition-colors"
          >
            {seat.serialNumber}
          </Link>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] text-driftwood uppercase tracking-wider">
            Price Paid
          </span>
          <span className="font-mono text-sm text-obsidian">
            ${seat.purchasePrice.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] text-driftwood uppercase tracking-wider">
            Purchased
          </span>
          <span className="font-mono text-xs text-driftwood">
            {seat.purchasedAt}
          </span>
        </div>
      </div>
    </div>
  );
}
