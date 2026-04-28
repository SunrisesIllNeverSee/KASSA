import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FounderListingCard from "@/components/dashboard/FounderListingCard";
import { products } from "@/lib/data";

export default function FounderDashboardPage() {
  // Mock: show first 2 products as if this founder owns them
  const myListings = products.slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8">
        <h1 className="font-display text-2xl font-bold text-obsidian mb-1">
          Founder Dashboard
        </h1>
        <p className="text-sm text-driftwood mb-8">
          Manage your listings and track wave progress
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {myListings.map((product) => (
            <FounderListingCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
