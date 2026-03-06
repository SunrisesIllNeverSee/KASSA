import Badge from "@/components/ui/Badge";
import { ProductStatus } from "@/lib/types";

const statusConfig: Record<
  ProductStatus,
  { label: string; variant: "gold" | "green" | "red" | "blue" | "gray" | "dark" }
> = {
  active: { label: "Active", variant: "green" },
  completed: { label: "Sold Out", variant: "dark" },
};

export default function StatusBadge({ status }: { status: ProductStatus }) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
