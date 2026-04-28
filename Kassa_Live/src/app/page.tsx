"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CategoryTabs from "@/components/marketplace/CategoryTabs";
import ProductCard from "@/components/marketplace/ProductCard";
import OnboardingModals from "@/components/marketplace/OnboardingModals";
import Badge from "@/components/ui/Badge";
import { products, getActiveWave } from "@/lib/data";
import { Product } from "@/lib/types";

type SortKey = "newest" | "price" | "category";

function ListRow({ product }: { product: Product }) {
  const wave = getActiveWave(product);
  const price = wave?.seatPrice;
  const pct = wave
    ? Math.round((wave.seatsSold / wave.totalSeats) * 100)
    : product.status === "completed" ? 100 : 0;
  const barColor = pct >= 100 ? "bg-obsidian" : pct >= 70 ? "bg-terracotta" : "bg-gold";

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="flex items-center gap-4 px-4 py-3.5 bg-white border border-sandstone rounded-lg mb-1.5 hover:-translate-y-px hover:shadow-md transition-all cursor-pointer">
        {/* Status */}
        <div className="w-[72px] shrink-0">
          {product.status === "completed" ? (
            <Badge variant="dark">Sold Out</Badge>
          ) : wave ? (
            <Badge variant="green">Active</Badge>
          ) : (
            <Badge variant="gray">—</Badge>
          )}
        </div>

        {/* Product + Founder */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-sm truncate">{product.name}</span>
          </div>
          <div className="text-[11px] text-driftwood truncate">{product.founderName}</div>
        </div>

        {/* Sector */}
        <div className="w-[110px] shrink-0 text-[10px] text-slate text-center hidden sm:block">
          {product.category}
        </div>

        {/* Cascade type */}
        <div className="w-[80px] shrink-0 hidden sm:block">
          <Badge variant={product.cascadeType === "enterprise" ? "dark" : "blue"}>
            {product.cascadeType}
          </Badge>
        </div>

        {/* Progress */}
        <div className="w-[150px] shrink-0 hidden md:block">
          {wave && (
            <>
              <div className="flex justify-between text-[10px] text-driftwood font-mono mb-1">
                <span>Wave {wave.waveNumber}</span>
                <span>{wave.seatsSold} / {wave.totalSeats}</span>
              </div>
              <div className="h-[3px] bg-sandstone rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
              </div>
            </>
          )}
          {!wave && product.status === "completed" && (
            <span className="text-[10px] font-mono text-driftwood">Full</span>
          )}
        </div>

        {/* Price */}
        <div className="w-[90px] shrink-0 text-right">
          <div className="font-mono text-[15px] font-medium">
            {price != null ? `$${price.toLocaleString()}` : "—"}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const [category, setCategory] = useState("all");
  const [view, setView] = useState<"list" | "grid">("list");
  const [sort, setSort] = useState<SortKey>("newest");

  let filtered =
    category === "all"
      ? products
      : products.filter((p) => {
          const slug = p.category.toLowerCase().replace(/[^a-z]+/g, "-");
          return slug.includes(category.replace("ai-ml", "ai-machine"));
        });

  // Sort
  filtered = [...filtered].sort((a, b) => {
    if (sort === "price") {
      const priceA = getActiveWave(a)?.seatPrice ?? Infinity;
      const priceB = getActiveWave(b)?.seatPrice ?? Infinity;
      return priceA - priceB;
    }
    if (sort === "category") return a.category.localeCompare(b.category);
    return 0; // newest = default order
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <OnboardingModals />

      <main className="flex-1 max-w-[1100px] mx-auto w-full px-6 sm:px-10 py-8">
        {/* Board Header */}
        <div className="flex items-center justify-between mb-1">
          <h1 className="font-display text-[26px] font-bold">The Board</h1>
          <div className="flex items-center gap-3">
            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="text-xs bg-white border border-sandstone rounded-md px-2 py-1.5 text-driftwood cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="price">Price</option>
              <option value="category">Category</option>
            </select>

            {/* View toggle */}
            <div className="flex gap-px">
              <button
                onClick={() => setView("list")}
                className={`px-2.5 py-1.5 border border-sandstone text-xs cursor-pointer rounded-l-md transition-all ${
                  view === "list" ? "bg-obsidian text-bone border-obsidian" : "bg-white text-driftwood"
                }`}
              >
                ☰
              </button>
              <button
                onClick={() => setView("grid")}
                className={`px-2.5 py-1.5 border border-sandstone text-xs cursor-pointer rounded-r-md transition-all ${
                  view === "grid" ? "bg-obsidian text-bone border-obsidian" : "bg-white text-driftwood"
                }`}
              >
                ▦
              </button>
            </div>
          </div>
        </div>
        <p className="text-[13px] text-driftwood mb-4">All listings. Click a tab to filter by sector.</p>

        <CategoryTabs active={category} onChange={setCategory} />

        {/* Board Content */}
        <div className="mt-4">
          {view === "list" ? (
            <div>
              {/* Column headers */}
              <div className="flex items-center gap-4 px-4 py-1.5 text-[9px] text-driftwood uppercase tracking-[0.06em] font-semibold">
                <div className="w-[72px] shrink-0">Status</div>
                <div className="flex-1">Product</div>
                <div className="w-[110px] shrink-0 text-center hidden sm:block">Sector</div>
                <div className="w-[80px] shrink-0 hidden sm:block">Type</div>
                <div className="w-[150px] shrink-0 hidden md:block">Progress</div>
                <div className="w-[90px] shrink-0 text-right">Price</div>
              </div>
              {filtered.map((p) => (
                <ListRow key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-sm text-driftwood py-12">
            No listings in this category yet.
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
}
