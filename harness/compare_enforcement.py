#!/usr/bin/env python3
"""
compare_enforcement.py — Baseline vs Gate Comparison
"""

import sys
import os
from pathlib import Path
import run_convergence_v2 as runner
from extraction import extract_commitment_words, jaccard

def compare():
    print("=== Commitment Enforcement Comparison ===")
    
    # 5 test signals from different categories
    signals = [
        ("The user must provide a valid email address before proceeding.", "Mandate"),
        ("All payments shall be processed within 30 days of receipt.", "Financial"),
        ("Do not share your password with anyone; keep it secure.", "Security"),
        ("If the contract is signed, the deal closes on Friday.", "Conditional"),
        ("Always wear safety goggles while operating the machinery.", "Instructional")
    ]

    print(f"{'Category':15s} | {'Condition':10s} | {'i1 Stab':7s} | {'i10 Stab':7s} | {'Gain':6s}")
    print("-" * 60)

    for signal, cat in signals:
        origin = extract_commitment_words(signal)
        
        # Run baseline
        b_turns = runner.run_baseline(signal)
        b_curve = runner.stability_curve(b_turns, origin)
        
        # Run gate
        g_turns = runner.run_gate(signal)
        g_curve = runner.stability_curve(g_turns, origin)
        
        b1 = b_curve[0]["stability"] if b_curve else 0
        b10 = b_curve[-1]["stability"] if b_curve else 0
        g1 = g_curve[0]["stability"] if g_curve else 0
        g10 = g_curve[-1]["stability"] if g_curve else 0
        
        gain = g10 - b10
        
        print(f"{cat:15s} | {'Baseline':10s} | {b1:7.2f} | {b10:7.2f} |")
        print(f"{'':15s} | {'Gate':10s} | {g1:7.2f} | {g10:7.2f} | {gain:+6.2f}")
        print("-" * 60)

if __name__ == "__main__":
    if not runner.OPENAI_KEY:
        print("Error: OPENAI_API_KEY not set.")
        sys.exit(1)
    compare()
