#!/usr/bin/env python3
"""
Commitment Conservation Harness CLI

Runs the operational harness via a single command. 
Updated to use local extraction logic and convergence runner.
"""

import os
import json
import argparse
from datetime import datetime
from extraction import extract_commitment_words

def _now_iso() -> str:
    return datetime.utcnow().replace(microsecond=0).isoformat() + "Z"

def simple_extraction(text: str, quiet: bool = False, as_json: bool = False) -> int:
    """Simple commitment extraction using regex sieve."""
    commitments = extract_commitment_words(text)
    
    if as_json:
        print(json.dumps({"input": text, "commitments": sorted(list(commitments))}, indent=2))
    elif quiet:
        for c in sorted(commitments):
            print(c)
    else:
        print(f"Extracted {len(commitments)} commitment word(s) from: \"{text[:60]}{'...' if len(text) > 60 else ''}\"")
        if commitments:
            for i, c in enumerate(sorted(commitments), 1):
                print(f"  {i}. {c}")
        else:
            print("  (none)")
    
    return 0

def main() -> int:
    import sys
    
    # Check if this is a 'run' subcommand or simple extraction
    if len(sys.argv) > 1 and sys.argv[1] == "run":
        return run_experiment()
    else:
        return run_simple_extraction()

def run_simple_extraction() -> int:
    """Simple extraction CLI."""
    p = argparse.ArgumentParser(
        prog="commitment-harness",
        description="Extract commitment words from text.",
        epilog="For full experiments, use: python analyze.py run {baseline|compression|gate|full}"
    )
    p.add_argument("text", help="Text to analyze")
    p.add_argument("--quiet", "-q", action="store_true", help="Output only commitment words (no headers)")
    p.add_argument("--json", action="store_true", help="Output as JSON")
    
    args = p.parse_args()
    return simple_extraction(args.text, quiet=args.quiet, as_json=args.json)

def run_experiment() -> int:
    """Experimental harness CLI."""
    import sys
    import run_convergence_v2 as runner

    p = argparse.ArgumentParser(
        prog="commitment-harness run",
        description="Run commitment conservation experiments and export receipts."
    )

    sub = p.add_subparsers(dest="experiment", required=True)

    # baseline
    pb = sub.add_parser("baseline", help="Run baseline paraphrase recursion.")
    pb.add_argument("--signal", required=True, help="Input signal text.")
    pb.add_argument("--out", default="results/baseline_receipt.json", help="Output path.")

    # compression experiment
    pc = sub.add_parser("compression", help="Run compression recursion.")
    pc.add_argument("--signal", required=True, help="Input signal text.")
    pc.add_argument("--out", default="results/compression_receipt.json", help="Output path.")

    # gate experiment
    pg = sub.add_parser("gate", help="Run gated commitment recursion.")
    pg.add_argument("--signal", required=True, help="Input signal text.")
    pg.add_argument("--out", default="results/gate_receipt.json", help="Output path.")

    # full pipeline
    pf = sub.add_parser("full", help="Run the full convergence test on canonical corpus.")
    pf.add_argument("--smoke", action="store_true", help="Run only the first signal.")

    # Remove 'run' from argv so argparse sees the subcommand correctly
    sys.argv.pop(1)
    args = p.parse_args()

    os.makedirs("results", exist_ok=True)

    receipt = {
        "timestamp_utc": _now_iso(),
        "experiment": args.experiment,
    }

    if args.experiment == "baseline":
        turns = runner.run_baseline(args.signal)
        receipt.update({"input": args.signal, "turns": turns})
    elif args.experiment == "compression":
        turns = runner.run_compression(args.signal)
        receipt.update({"input": args.signal, "turns": turns})
    elif args.experiment == "gate":
        turns = runner.run_gate(args.signal)
        receipt.update({"input": args.signal, "turns": turns})
    elif args.experiment == "full":
        runner.SMOKE = args.smoke
        runner.run()
        print("✓ Full experiment complete. Check results/ directory.")
        return 0

    if "turns" in receipt:
        with open(args.out, "w", encoding="utf-8") as f:
            json.dump(receipt, f, indent=2, ensure_ascii=False)
        print(f"✓ Wrote receipt: {args.out}")

    return 0

if __name__ == "__main__":
    main()
