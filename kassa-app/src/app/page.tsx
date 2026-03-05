import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* ===== HERO (from 03 + deep proto gradient, obsidian bg) ===== */}
      <section className="bg-obsidian relative">
        <div className="py-24 px-6 sm:px-12 max-w-[1100px] mx-auto w-full relative fade-up fade-up-1">
          <p className="font-mono text-xs text-gold uppercase tracking-[0.15em] mb-5">
            The founding seat marketplace
          </p>
          <h1 className="font-display text-[clamp(42px,6vw,72px)] leading-[1.08] font-bold max-w-[700px] mb-7 tracking-[-0.02em]">
            <span className="gradient-text-light">Claim your founding seat.</span>
          </h1>
          <p className="text-lg text-sandstone max-w-[520px] leading-relaxed mb-10">
            Limited seats. Real products. Be first in line and get
            lifetime access before the general release.
          </p>
          <div className="flex gap-4 flex-wrap fade-up fade-up-3">
            <Link
              href="/listings"
              className="inline-block bg-gold text-obsidian font-semibold text-base px-8 py-3.5 rounded-lg btn-glow"
            >
              Browse Listings
            </Link>
            <Link
              href="/login"
              className="inline-block border-[1.5px] border-[#3A3830] text-sandstone font-medium text-base px-8 py-3.5 rounded-lg hover:border-gold hover:text-gold transition-all"
            >
              List Your Product
            </Link>
          </div>

          {/* Floating data card (from mockup 03) */}
          <div className="hidden lg:block absolute right-12 top-28 w-[300px] bg-white border border-sandstone rounded-xl p-7 shadow-lg fade-up fade-up-4">
            <p className="font-mono text-[10px] text-gold uppercase tracking-[0.12em] font-semibold mb-4">
              Live Marketplace
            </p>
            {[
              { label: "Active listings", value: "7" },
              { label: "Seats claimed", value: "112" },
              { label: "Products listed", value: "12" },
              { label: "Seats this week", value: "23" },
              { label: "Agent referrals", value: "—" },
            ].map((row) => (
              <div
                key={row.label}
                className="flex justify-between py-2 border-b border-sandstone last:border-0"
              >
                <span className="text-xs text-driftwood">{row.label}</span>
                <span className="text-[13px] font-semibold font-mono text-obsidian">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-sandstone max-w-[1100px] mx-auto" />

      {/* ===== COMMITTED SUPPORTERS (full width) ===== */}
      <section className="py-20 px-6 sm:px-12 text-center max-w-[700px] mx-auto fade-up fade-up-2">
        <p className="font-mono text-[10px] text-gold uppercase tracking-[0.14em] mb-4">For Founders</p>
        <h2 className="font-display text-[clamp(28px,4vw,36px)] leading-[1.15] font-bold mb-5">
          One committed customer is worth more than 5,000 free trials.
        </h2>
        <p className="text-base text-driftwood leading-relaxed mb-8">
          Launch your product with a built-in audience. Seats go out in waves.
          Every seat is a real customer who chose your product.
        </p>
        <Link
          href="/login"
          className="inline-block bg-gold text-obsidian font-semibold text-[15px] px-8 py-3.5 rounded-lg btn-glow"
        >
          Set Up Your Listing
        </Link>
      </section>

      <div className="h-px bg-sandstone max-w-[1100px] mx-auto" />

      {/* ===== THREE TILES — 2 COLUMNS (who + what) ===== */}
      <section className="bg-obsidian py-20 px-6 sm:px-12">
        <div className="max-w-[1100px] mx-auto">
        <p className="font-mono text-[10px] text-gold uppercase tracking-[0.14em] mb-3">Who It&apos;s For</p>
        <h2 className="font-display text-[28px] font-bold mb-10 text-bone">Built for builders.</h2>

        <div className="flex flex-col gap-[2px]">
          {/* Founders */}
          <div className="flex flex-col sm:flex-row rounded-t-xl overflow-hidden">
            <div className="sm:w-[160px] bg-gold text-obsidian px-6 py-6 flex items-center shrink-0">
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.08em]">Founders</span>
            </div>
            <div className="flex-1 bg-white p-6 flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <h3 className="font-display text-xl font-bold mb-1.5">Launch with real customers.</h3>
                <p className="text-sm text-driftwood leading-relaxed">
                  List your product. Release seats in waves. Every seat holder
                  gets access to your product — that&apos;s it.
                </p>
              </div>
              <div className="sm:w-[200px] flex items-center justify-center">
                <Link
                  href="/login"
                  className="inline-block bg-gold text-obsidian font-semibold text-sm px-6 py-2.5 rounded-md btn-glow whitespace-nowrap"
                >
                  Set Up Listing
                </Link>
              </div>
            </div>
          </div>

          {/* Buyers */}
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-[160px] bg-verdigris text-white px-6 py-6 flex items-center shrink-0">
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.08em]">Buyers</span>
            </div>
            <div className="flex-1 bg-white p-6 flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <h3 className="font-display text-xl font-bold mb-1.5">Get in early. Get access.</h3>
                <p className="text-sm text-driftwood leading-relaxed">
                  Seats release in waves. Claim yours and get product access —
                  serialized, verified, and protected by a 14-day return window.
                </p>
              </div>
              <div className="sm:w-[200px] flex items-center justify-center">
                {/* Mini emblem card */}
                <div className="bg-bone border border-sandstone rounded-lg p-4 text-center w-full">
                  <div className="font-display text-2xl text-gold">§</div>
                  <div className="font-display text-sm font-bold">COMMAND</div>
                  <div className="font-mono text-[10px] text-driftwood mt-0.5">KS-2026-00003</div>
                  <div className="h-px bg-sandstone my-2" />
                  <div className="flex justify-between text-[10px]">
                    <span className="text-driftwood">Wave</span>
                    <span className="font-mono font-semibold">1 of 4</span>
                  </div>
                  <div className="flex justify-between text-[10px] mt-1">
                    <span className="text-driftwood">Price</span>
                    <span className="font-mono font-semibold text-gold">$2,400</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Agents */}
          <div className="flex flex-col sm:flex-row rounded-b-xl overflow-hidden">
            <div className="sm:w-[160px] bg-slate text-white px-6 py-6 flex items-center shrink-0">
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.08em]">Agents</span>
            </div>
            <div className="flex-1 bg-white p-6 flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <h3 className="font-display text-xl font-bold mb-1.5">Agents welcome.</h3>
                <p className="text-sm text-driftwood leading-relaxed">
                  AI agents can browse listings and surface recommendations.
                  Your agent finds it. You decide.
                </p>
              </div>
              <div className="sm:w-[200px] flex items-center justify-center">
                <span className="font-mono text-[11px] text-slate bg-slate/10 px-3 py-1.5 rounded">
                  API · Search · Recommend
                </span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ===== AGENTS FULL WIDTH (cream/bone bg) ===== */}
      <section className="bg-bone py-20 px-6 sm:px-12">
        <div className="max-w-[1100px] mx-auto">
          <p className="font-mono text-[10px] text-gold uppercase tracking-[0.14em] mb-3">Agents Welcome</p>
          <h2 className="font-display text-[clamp(24px,3.5vw,34px)] text-obsidian font-bold leading-[1.15] max-w-[480px] mb-4">
            A marketplace that works for humans and agents.
          </h2>
          <p className="text-[15px] text-driftwood max-w-[480px] leading-relaxed mb-10">
            AI agents can browse listings and recommend products to their operators.
            Structured data. Open API. Built for humans and machines.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                label: "Browse",
                title: "Structured listings",
                desc: "Every listing has machine-readable data. Agents don't need to scrape — they query.",
              },
              {
                label: "Recommend",
                title: "Surface matches",
                desc: "Agents find listings that match their operator's interests and surface them for review.",
              },
              {
                label: "Connect",
                title: "Close the loop",
                desc: "When an agent's recommendation leads to a seat, both sides know. Attribution built in.",
              },
            ].map((card) => (
              <div
                key={card.label}
                className="bg-white border border-sandstone rounded-xl p-6 hover-lift"
              >
                <p className="font-mono text-[10px] text-gold uppercase tracking-[0.1em] mb-2.5">{card.label}</p>
                <h3 className="text-[15px] text-obsidian font-semibold mb-1.5">{card.title}</h3>
                <p className="text-[13px] text-driftwood leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
