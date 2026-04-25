#!/usr/bin/env python3
"""
quick_demo.py — Single signal 3-condition comparison
"""

import sys
import run_convergence_v2 as runner
from extraction import extract_commitment_words

def run_demo(signal: str):
    print(f"=== Commitment Conservation Quick Demo ===")
    print(f"Signal: {signal}\n")
    
    origin = extract_commitment_words(signal)
    
    print("Running Baseline (Paraphrase)...")
    b_turns = runner.run_baseline(signal)
    b_stab = runner.stability_curve(b_turns, origin)
    
    print("Running Compression (Summarize)...")
    c_turns = runner.run_compression(signal)
    c_stab = runner.stability_curve(c_turns, origin)
    
    print("Running Gate (Enforced)...")
    g_turns = runner.run_gate(signal)
    g_stab = runner.stability_curve(g_turns, origin)
    
    print("\nResults at Iteration 10:")
    print(f"{'Condition':15s} | {'Stability':10s} | {'Words':10s}")
    print("-" * 40)
    print(f"{'Baseline':15s} | {b_stab[-1]['stability']:10.2f} | {len(b_turns[-1]['output'].split()):10d}")
    print(f"{'Compression':15s} | {c_stab[-1]['stability']:10.2f} | {len(c_turns[-1]['output'].split()):10d}")
    print(f"{'Gate':15s} | {g_stab[-1]['stability']:10.2f} | {len(g_turns[-1]['output'].split()):10d}")
    
    print("\nGate Output (i10):")
    print(f"  {g_turns[-1]['output']}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        signal = sys.argv[1]
    else:
        signal = "The user must provide a valid email address before proceeding."
    
    if not runner.OPENAI_KEY:
        print("Error: OPENAI_API_KEY not set.")
        sys.exit(1)
        
    run_demo(signal)
