"use client";

import { useState } from "react";
import Link from "next/link";

export default function OnboardingModals() {
  const [step, setStep] = useState<number>(1);

  function next() {
    if (step === 4) {
      setStep(0);
    } else {
      setStep(step + 1);
    }
  }

  function skip() {
    setStep(0);
  }

  if (step === 0) return null;

  return (
    <div className="fixed inset-0 z-40 modal-overlay flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-[560px] w-full p-8 pb-6 shadow-2xl relative fade-up">

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
              <span className="gradient-text">Own the founding position.</span>
            </h2>
            <p className="text-base text-driftwood leading-relaxed">
              Limited seats. Real products. Wave 1 is the best price
              this seat will ever be.
            </p>
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
            <p className="text-base text-driftwood leading-relaxed">
              Your most committed users, priced as instruments. Non-dilutive
              capital from the people who believe in you most.
            </p>
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
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <div className="w-[80px] shrink-0 bg-gold text-obsidian px-3 py-1.5 rounded text-center">
                  <span className="font-mono text-[10px] font-medium uppercase">Founders</span>
                </div>
                <p className="text-sm text-driftwood">Non-dilutive capital. No equity. No VC. Your best users, priced as instruments.</p>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-[80px] shrink-0 bg-verdigris text-white px-3 py-1.5 rounded text-center">
                  <span className="font-mono text-[10px] font-medium uppercase">Buyers</span>
                </div>
                <p className="text-sm text-driftwood">Own your position. Founding seats — serialized, verified, transferable.</p>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-[80px] shrink-0 bg-slate text-white px-3 py-1.5 rounded text-center">
                  <span className="font-mono text-[10px] font-medium uppercase">Agents</span>
                </div>
                <p className="text-sm text-driftwood">Discover. Recommend. Earn.</p>
              </div>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <p className="font-mono text-[10px] text-gold uppercase tracking-[0.14em] mb-4">
              Agents Welcome
            </p>
            <h2 className="font-display text-[24px] font-bold mb-4">
              The board is agent-readable.
            </h2>
            <div className="space-y-3 mb-2">
              <div className="bg-bone rounded-lg p-4">
                <p className="font-mono text-[10px] text-slate uppercase tracking-wider font-semibold mb-1">Discover</p>
                <p className="text-sm text-driftwood">Agents can browse and surface listings that match your criteria.</p>
              </div>
              <div className="bg-bone rounded-lg p-4">
                <p className="font-mono text-[10px] text-slate uppercase tracking-wider font-semibold mb-1">Recommend</p>
                <p className="text-sm text-driftwood">Your agent finds the right seat. You review, decide, and confirm.</p>
              </div>
              <div className="bg-bone rounded-lg p-4">
                <p className="font-mono text-[10px] text-slate uppercase tracking-wider font-semibold mb-1">Earn</p>
                <p className="text-sm text-driftwood">Agents don&apos;t transact — humans close. Every seat is confirmed by a person.</p>
              </div>
            </div>
          </>
        )}

        {/* Bottom row: skip left, arrow right */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={skip}
            className="text-xs text-driftwood hover:text-obsidian cursor-pointer transition-colors"
          >
            Skip
          </button>
          <button
            onClick={next}
            className="w-11 h-11 rounded-full bg-gold text-obsidian flex items-center justify-center btn-glow cursor-pointer transition-all"
            aria-label={step === 4 ? "Enter the board" : "Next"}
          >
            {step === 4 ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <polyline points="3,9 15,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <polyline points="10,4 15,9 10,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <polyline points="3,9 15,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <polyline points="10,4 15,9 10,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
