import { Trend } from "@/lib/types";

const trendConfig: Record<Trend, { icon: string; label: string; color: string }> = {
  rising: { icon: "↗", label: "Rising", color: "text-verdigris" },
  steady: { icon: "→", label: "Steady", color: "text-driftwood" },
  cooling: { icon: "↘", label: "Cooling", color: "text-terracotta" },
};

export default function TrendIndicator({ trend }: { trend: Trend }) {
  const config = trendConfig[trend];
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-mono ${config.color}`}>
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
}
