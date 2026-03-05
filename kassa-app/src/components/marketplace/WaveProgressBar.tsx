interface WaveProgressBarProps {
  seatsSold: number;
  totalSeats: number;
  variant?: "default" | "compact";
}

export default function WaveProgressBar({
  seatsSold,
  totalSeats,
  variant = "default",
}: WaveProgressBarProps) {
  const pct = Math.min((seatsSold / totalSeats) * 100, 100);
  const remaining = totalSeats - seatsSold;
  const isHot = pct >= 70;

  return (
    <div className={variant === "compact" ? "w-full" : "w-full"}>
      <div className="flex justify-between items-center mb-1">
        <span className="text-[11px] font-mono text-driftwood">
          {seatsSold}/{totalSeats} claimed
        </span>
        {remaining > 0 && (
          <span
            className={`text-[11px] font-mono ${isHot ? "text-terracotta font-semibold" : "text-driftwood"}`}
          >
            {remaining} left
          </span>
        )}
      </div>
      <div className="w-full h-1.5 bg-sandstone rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            pct >= 100
              ? "bg-obsidian"
              : isHot
                ? "bg-terracotta"
                : "bg-gold"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
