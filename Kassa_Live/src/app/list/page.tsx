"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { CascadeType } from "@/lib/types";

const sectors = [
  "AI Governance",
  "Developer Tools",
  "AI Agents",
  "AI & Machine Learning",
  "Infrastructure & DevOps",
  "Design & Creative",
  "Other",
];

export default function ListProductPage() {
  const [cascadeType, setCascadeType] = useState<CascadeType>("saas");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-[600px] mx-auto w-full px-6 py-12">
        <h1 className="font-display text-[28px] font-bold mb-2">List Your Product</h1>
        <p className="text-sm text-driftwood mb-8">
          Set up your listing. Pick a cascade type and set your Wave 1 price — the system handles the rest.
        </p>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-semibold text-obsidian uppercase tracking-wider mb-1.5">
              Product Name
            </label>
            <input
              type="text"
              className="w-full border border-sandstone rounded-md px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-gold"
              placeholder="e.g. COMMAND"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-obsidian uppercase tracking-wider mb-1.5">
              Short Description
            </label>
            <textarea
              className="w-full border border-sandstone rounded-md px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-gold h-20 resize-none"
              placeholder="One or two sentences about your product"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-obsidian uppercase tracking-wider mb-1.5">
              Sector
            </label>
            <select className="w-full border border-sandstone rounded-md px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-gold cursor-pointer">
              {sectors.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-obsidian uppercase tracking-wider mb-1.5">
              Product URL
            </label>
            <input
              type="url"
              className="w-full border border-sandstone rounded-md px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-gold"
              placeholder="https://yourproduct.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-obsidian uppercase tracking-wider mb-3">
              Cascade Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCascadeType("saas")}
                className={`p-4 rounded-lg border text-left cursor-pointer transition-all ${
                  cascadeType === "saas"
                    ? "border-gold bg-gold/5"
                    : "border-sandstone bg-white hover:border-gold/30"
                }`}
              >
                <span className="font-mono text-[10px] text-slate uppercase tracking-wider font-semibold">SaaS</span>
                <p className="text-xs text-driftwood mt-1">More seats, lower price, broader distribution</p>
              </button>
              <button
                type="button"
                onClick={() => setCascadeType("enterprise")}
                className={`p-4 rounded-lg border text-left cursor-pointer transition-all ${
                  cascadeType === "enterprise"
                    ? "border-gold bg-gold/5"
                    : "border-sandstone bg-white hover:border-gold/30"
                }`}
              >
                <span className="font-mono text-[10px] text-obsidian uppercase tracking-wider font-semibold">Enterprise</span>
                <p className="text-xs text-driftwood mt-1">Fewer seats, higher price, exclusive positioning</p>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-obsidian uppercase tracking-wider mb-1.5">
              Wave 1 Price ($)
            </label>
            <input
              type="number"
              className="w-full border border-sandstone rounded-md px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-gold"
              placeholder="e.g. 2400"
            />
            <p className="text-[11px] text-driftwood mt-1.5">
              Each subsequent wave multiplies by 1.5×. Wave 2 = price × 1.5, Wave 3 = price × 2.25, etc.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-obsidian uppercase tracking-wider mb-1.5">
                Founder Name
              </label>
              <input
                type="text"
                className="w-full border border-sandstone rounded-md px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-gold"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-obsidian uppercase tracking-wider mb-1.5">
                Contact Email
              </label>
              <input
                type="email"
                className="w-full border border-sandstone rounded-md px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-gold"
                placeholder="you@company.com"
              />
            </div>
          </div>

          <div className="pt-4">
            <Button size="lg" className="w-full">
              Submit Listing
            </Button>
            <p className="text-[11px] text-driftwood text-center mt-2">
              Listings are reviewed before going live on the board.
            </p>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
