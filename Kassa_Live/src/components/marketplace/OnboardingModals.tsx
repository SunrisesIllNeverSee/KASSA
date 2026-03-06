"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const ONBOARDING_KEY = "kassa_onboarding_seen";

export default function OnboardingModals() {
  const [step, setStep] = useState<number | null>(null);

  useEffect(() => {
    const seen = localStorage.getItem(ONBOARDING_KEY);
    if (!seen) {
      setStep(1);
    }
  }, []);

  function next() {
    if (step === 4) {
      localStorage.setItem(ONBOARDING_KEY, "true");
      setStep(null);
    } else if (step) {
      setStep(step + 1);
    }
  }

  function skip() {
    localStorage.setItem(ONBOARDING_KEY, "true");
    setStep(null);
  }

  if (step === null) return null;

  return (
    <div className="fixed inset-0 z-40 modal-overlay flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-[560px] w-full p-8 shadow-2xl relative fade-up">
        {/* Skip button */}
        <button
          onClick={skip}
          className="absolute top-4 right-4 text-xs text-driftwood hover:text-obsidian cursor-pointer"
        >
          Skip
        </button>

        {/* Step indicator */}
        <div className="flex gap-1.5 mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1 rounded-full flex-1 ${
                s === step ? "bg-gold" : s < step ? "bg-gold/40" : "bg-sandstone"
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <>
            <p className="font-mono text-[10px] text-gold uppercase tracking-[0.14em] mb-4">
              The founding seat marketplace
            </p>
            <h2 className="font-display text-[clamp(28px,4vw,38px)] leading-[1.1] font-bold mb-4">
              <span className="gradient-text">Claim your founding seat.</span>
            </h2>
            <p className="text-base text-driftwood leading-relaxed mb-8">
              Limited seats. Real products. Be first in line and get
              lifetime access before the general release.
            </p>
            <div className="flex gap-3">
              <button
                onClick={next}
                className="bg-gold text-obsidian font-semibold text-sm px-6 py-3 rounded-lg btn-glow cursor-pointer"
              >
                Browse Listings
              </button>
              <Link
                href="/list"
                className="border border-sandstone text-driftwood font-medium text-sm px-6 py-3 rounded-lg hover:border-gold hover:text-gold transition-all"
              >
                List Your Product
              </Link>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <p className="font-mono text-[10px] text-gold uppercase tracking-[0.14em] mb-4">
              For Founders
            </p>
            <h2 className="font-display text-[clamp(24px,3.5vw,32px)] leading-[1.15] font-bold mb-4">
              One committed customer is worth more than 5,000 free trials.
            </h2>
            <p className="text-base text-driftwood leading-relaxed mb-8">
              Launch your product with a built-in audience. Seats go out in waves.
              Every seat is a real customer who chose your product.
            </p>
            <button
              onClick={next}
              className="bg-gold text-obsidian font-semibold text-sm px-6 py-3 rounded-lg btn-glow cursor-pointer"
            >
              Continue
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <p className="font-mono text-[10px] text-gold uppercase tracking-[0.14em] mb-4">
              Who It&apos;s For
            </p>
            <h2 className="font-display text-[24px] font-bold mb-6">
              Built for builders.
            </h2>
            <div className="space-y-3 mb-8">
              <div className="flex gap-3 items-start">
                <div className="w-[80px] shrink-0 bg-gold text-obsidian px-3 py-1.5 rounded text-center">
                  <span className="font-mono text-[10px] font-medium uppercase">Founders</span>
                </div>
                <p className="text-sm text-driftwood">List your product. Release seats in waves. Every seat holder gets access.</p>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-[80px] shrink-0 bg-verdigris text-white px-3 py-1.5 rounded text-center">
                  <span className="font-mono text-[10px] font-medium uppercase">Buyers</span>
                </div>
                <p className="text-sm text-driftwood">Claim your seat early. Get product access — serialized and verified.</p>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-[80px] shrink-0 bg-slate text-white px-3 py-1.5 rounded text-center">
                  <span className="font-mono text-[10px] font-medium uppercase">Agents</span>
                </div>
                <p className="text-sm text-driftwood">AI agents can browse and recommend. Your agent finds it. You decide.</p>
              </div>
            </div>
            <button
              onClick={next}
              className="bg-gold text-obsidian font-semibold text-sm px-6 py-3 rounded-lg btn-glow cursor-pointer"
            >
              Continue
            </button>
          </>
        )}

        {step === 4 && (
          <>
            <p className="font-mono text-[10px] text-gold uppercase tracking-[0.14em] mb-4">
              You&apos;re In
            </p>
            <h2 className="font-display text-[24px] font-bold mb-4">
              Everything you need is in the nav.
            </h2>
            <p className="text-base text-driftwood leading-relaxed mb-6">
              Browse listings on The Board. List your own product. Agents can discover and recommend — humans confirm and pay.
            </p>
            <div className="bg-bone rounded-lg p-4 mb-8 flex items-center gap-6 text-sm">
              <span className="font-mono text-gold font-bold">§KA§§A</span>
              <span className="text-driftwood">The Board</span>
              <span className="text-driftwood">List a Product</span>
              <span className="bg-gold text-obsidian px-3 py-1 rounded text-xs font-bold">Browse Seats</span>
            </div>
            <button
              onClick={next}
              className="bg-gold text-obsidian font-semibold text-sm px-6 py-3 rounded-lg btn-glow cursor-pointer"
            >
              Start Browsing
            </button>
          </>
        )}
      </div>
    </div>
  );
}
