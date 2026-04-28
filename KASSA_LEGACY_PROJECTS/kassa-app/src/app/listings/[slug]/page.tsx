import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CascadePanel from "@/components/marketplace/CascadePanel";
import StatusBadge from "@/components/marketplace/StatusBadge";
import TrendIndicator from "@/components/marketplace/TrendIndicator";
import Badge from "@/components/ui/Badge";
import { getProduct, products } from "@/lib/data";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        <Link
          href="/listings"
          className="text-xs text-driftwood hover:text-obsidian transition-colors mb-6 inline-block"
        >
          ← Back to Board
        </Link>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          {/* Left: Product Info */}
          <div>
            <div className="flex items-start gap-3 mb-4">
              <h1 className="font-display text-3xl font-bold text-obsidian">
                {product.name}
              </h1>
              <StatusBadge status={product.status} />
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm text-driftwood">{product.category}</span>
              <TrendIndicator trend={product.trend} />
              {product.productScore && (
                <Badge variant="gold">
                  Score: {product.productScore.toFixed(1)}
                </Badge>
              )}
              <Badge variant={product.cascadeType === "enterprise" ? "dark" : "blue"}>
                {product.cascadeType}
              </Badge>
            </div>

            {/* Founder */}
            <div className="bg-white rounded-lg border border-sandstone p-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-obsidian">
                  {product.founderName}
                </span>
                {product.founderVerified && (
                  <span className="text-[10px] font-mono text-verdigris bg-verdigris/10 px-1.5 py-0.5 rounded">
                    VERIFIED
                  </span>
                )}
              </div>
              <p className="text-xs text-driftwood">{product.founderCompany}</p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="font-display text-base font-semibold mb-2">
                About
              </h2>
              <p className="text-sm text-driftwood leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg border border-sandstone p-4 text-center">
                <p className="font-mono text-2xl font-semibold text-obsidian">
                  {product.totalSeatsSold}
                </p>
                <p className="text-[10px] text-driftwood uppercase tracking-wider mt-1">
                  Seats Sold
                </p>
              </div>
              <div className="bg-white rounded-lg border border-sandstone p-4 text-center">
                <p className="font-mono text-2xl font-semibold text-obsidian">
                  {product.totalSeats}
                </p>
                <p className="text-[10px] text-driftwood uppercase tracking-wider mt-1">
                  Total Seats
                </p>
              </div>
              <div className="bg-white rounded-lg border border-sandstone p-4 text-center">
                <p className="font-mono text-2xl font-semibold text-obsidian">
                  {product.waves.length}
                </p>
                <p className="text-[10px] text-driftwood uppercase tracking-wider mt-1">
                  Waves
                </p>
              </div>
            </div>
          </div>

          {/* Right: Cascade Panel */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <CascadePanel product={product} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
