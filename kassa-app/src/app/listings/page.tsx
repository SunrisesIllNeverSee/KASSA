"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CategoryTabs from "@/components/marketplace/CategoryTabs";
import ProductCard from "@/components/marketplace/ProductCard";
import { products, getActiveWave } from "@/lib/data";
import { Product } from "@/lib/types";

function getStatusBadge(product: Product) {
  const wave = getActiveWave(product);
  if (product.status === "completed") return { label: "Sold Out", cls: "bg-obsidian text-bone" };
  if (wave?.isWaveZero) {
    const pct = wave.seatsSold / wave.totalSeats;
    if (pct >= 0.7) return { label: "Hot", cls: "bg-terracotta text-white" };
    if (product.totalSeatsSold < 10) return { label: "New", cls: "bg-slate text-white" };
    return { label: "Wave 0", cls: "bg-sandstone text-driftwood" };
  }
  if (wave) return { label: `Wave ${wave.waveNumber}`, cls: "bg-gold text-obsidian" };
  return { label: "—", cls: "bg-sandstone text-driftwood" };
}

function getTrendDisplay(trend: string) {
  if (trend === "rising") return { icon: "↗", cls: "text-verdigris" };
  if (trend === "cooling") return { icon: "↘", cls: "text-terracotta" };
  return { icon: "→", cls: "text-driftwood" };
}

function ListRow({ product }: { product: Product }) {
  const wave = getActiveWave(product);
  const badge = getStatusBadge(product);
  const trend = getTrendDisplay(product.trend);
  const price = wave?.seatPrice;
  const pct = wave
    ? Math.round((wave.seatsSold / wave.totalSeats) * 100)
    : product.status === "completed" ? 100 : 0;
  const barColor = wave?.isWaveZero ? "bg-verdigris" : pct >= 100 ? "bg-obsidian" : "bg-gold";
  const waveLabel = wave?.isWaveZero ? "Wave Zero" : wave ? `Wave ${wave.waveNumber}` : "—";
  const waveFill = wave ? `${wave.seatsSold} / ${wave.totalSeats}` : product.status === "completed" ? "Full" : "—";

  return (
    <Link href={`/listings/${product.slug}`}>
      <div className="flex items-center gap-4 px-4 py-3.5 bg-white border border-sandstone rounded-lg mb-1.5 hover:-translate-y-px hover:shadow-md transition-all cursor-pointer">
        {/* Status badge */}
        <div className="w-[72px] shrink-0">
          <span className={`text-[9px] font-semibold uppercase tracking-[0.04em] px-2 py-0.5 rounded ${badge.cls} whitespace-nowrap`}>
            {badge.label}
          </span>
        </div>

        {/* Product + Founder */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-sm truncate">{product.name}</span>
            {product.founderVerified && <span className="text-verdigris text-[10px]">✓</span>}
          </div>
          <div className="text-[11px] text-driftwood truncate">{product.founderCompany}</div>
        </div>

        {/* Sector */}
        <div className="w-[110px] shrink-0 text-[10px] text-slate text-center hidden sm:block">
          {product.category}
        </div>

        {/* Progress */}
        <div className="w-[150px] shrink-0 hidden md:block">
          <div className="flex justify-between text-[10px] text-driftwood font-mono mb-1">
            <span>{waveLabel}</span>
            <span>{waveFill}</span>
          </div>
          <div className="h-[3px] bg-sandstone rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* Price */}
        <div className="w-[90px] shrink-0 text-right">
          <div className="font-mono text-[15px] font-medium">
            {price != null ? `$${price.toLocaleString()}` : "—"}
          </div>
        </div>

        {/* Score */}
        <div className="w-[50px] shrink-0 text-right font-mono text-sm text-gold">
          {product.productScore ? product.productScore.toFixed(1) : "—"}
        </div>

        {/* Trend */}
        <div className={`w-[40px] shrink-0 text-right font-mono text-[11px] ${trend.cls} hidden sm:block`}>
          {trend.icon}
        </div>
      </div>
    </Link>
  );
}

export default function ListingsPage() {
  const [category, setCategory] = useState("all");
  const [view, setView] = useState<"list" | "grid">("list");

  const filtered =
    category === "all"
      ? products
      : products.filter((p) => {
          const slug = p.category.toLowerCase().replace(/[^a-z]+/g, "-");
          return slug.includes(category.replace("ai-ml", "ai-machine"));
        });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-[1100px] mx-auto w-full px-6 sm:px-10 py-8">
        {/* Board Header */}
        <div className="flex items-center justify-between mb-1">
          <h1 className="font-display text-[26px] font-bold">The Board</h1>
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
                <div className="w-[150px] shrink-0 hidden md:block">Progress</div>
                <div className="w-[90px] shrink-0 text-right">Price</div>
                <div className="w-[50px] shrink-0 text-right">Score</div>
                <div className="w-[40px] shrink-0 text-right hidden sm:block">Trend</div>
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
