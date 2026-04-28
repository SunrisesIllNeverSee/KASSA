import Badge from "@/components/ui/Badge";
import { ProductStatus } from "@/lib/types";

const statusConfig: Record<
  ProductStatus,
  { label: string; variant: "gold" | "green" | "red" | "blue" | "gray" | "dark" }
> = {
  draft: { label: "Draft", variant: "gray" },
  in_review: { label: "In Review", variant: "blue" },
  wave_zero: { label: "Wave Zero", variant: "gold" },
  active: { label: "Open", variant: "green" },
  paused: { label: "Paused", variant: "gray" },
  completed: { label: "Sold Out", variant: "dark" },
};

export default function StatusBadge({ status }: { status: ProductStatus }) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
