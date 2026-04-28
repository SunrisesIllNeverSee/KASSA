import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

interface ShelfRowProps {
  title: string;
  subtitle?: string;
  products: Product[];
}

export default function ShelfRow({ title, subtitle, products }: ShelfRowProps) {
  if (products.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="flex items-baseline gap-3 mb-4">
        <h2 className="font-display text-lg font-semibold text-obsidian">
          {title}
        </h2>
        {subtitle && (
          <span className="text-xs text-driftwood">{subtitle}</span>
        )}
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {products.map((p) => (
          <div key={p.id} className="flex-shrink-0 w-[280px]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
