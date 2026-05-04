# Commitment Conservation Harness

This directory contains the public reproducibility harness for KASSA's commitment-conservation experiments. It is designed to test how obligation-bearing language survives recursive transformation under different prompt conditions.

The harness is intentionally public-layer only. It demonstrates the measurement approach without exposing protected production MO§ES™ internals.

## What It Tests

The convergence runner compares three conditions over repeated transformations:

| Condition | Description |
| --- | --- |
| Baseline | Paraphrase loop with no enforcement |
| Compression | Summarization loop with no commitment gate |
| Gate | Extract commitment words, reconstruct the minimal obligation, then feed that forward |

Primary surface metric:

```text
Jaccard stability = |C(S_n) intersection C(S_0)| / |C(S_0)|
```

The runner also includes optional bidirectional NLI checks for semantic equivalence.

## Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export OPENAI_API_KEY=...
```

The scripts also look for `~/.config/openai/api_key` or a local `.openai_api_key` file for development. Do not commit local key files.

## Quick Demo

Run one signal through the three public conditions:

```bash
python harness/quick_demo.py "The user must provide a valid email address before proceeding."
```

If no signal is provided, `quick_demo.py` uses the default email-address obligation.

## Full Harness

Run the canonical corpus:

```bash
python harness/run_convergence_v2.py
```

Results are written under `harness/results/EXP-###/` when generated locally. Those result folders are experiment artifacts, not source requirements.

## Corpus And Prompts

| Path | Purpose |
| --- | --- |
| `corpora/canonical_corpus.json` | Main public signal set |
| `corpora/adversarial_corpus_exp004.json` | Adversarial stress cases |
| `corpora/adversarial_corpus_exp005.json` | Anchor/escalation-control cases |
| `corpora/exp006_paper_recursion_corpus.json` | Paper recursion corpus |
| `corpora/exp007_np_negation_corpus.json` | Negation and noun-phrase stress cases |
| `prompts/` | Baseline, compression, extraction, anchor, and gate prompts |

## Local Validation

These checks do not call any model API:

```bash
python3 -m compileall harness
python3 -m json.tool harness/corpora/canonical_corpus.json > /dev/null
python3 -m json.tool schema/K_bound_projections_schema.json > /dev/null
```

## IP Boundary

See [`ip_boundary.md`](ip_boundary.md). The harness is a proxy/scaffold for public reproducibility and does not disclose the protected enforcement substrate, canonical production kernel, or non-public deployment machinery.
