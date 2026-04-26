# TESTING.md: Commitment Conservation Harness (CCH)

## Overview
The CCH is the research infrastructure used to validate the Conservation Law. It simulates recursive information transformation and measures semantic decay.

## Test Conditions
1. **Baseline**: Paraphrase loop (Control). No compression.
2. **Compression**: Summary loop. No governance gate.
3. **Gate**: Summarize → Extract Kernel (K) → Reconstruct → Feedback.

## Primary Metrics
- **NLI (Natural Language Inference)**: Measure of bidirectional entailment between original and iteration $n$.
  - 1.00: Perfect conservation.
  - 0.50: One-direction entailment (weaker or stronger).
  - 0.00: Failure.
- **Jaccard Similarity**: Token-level overlap of commitment sets. Note: Known to be blind to certain semantic inversions (confirmed in EXP-007).

## Running Experiments
```bash
python3 harness/run_convergence_v2.py
```
- Configure `CORPUS_PATH` in the script to point to the desired JSON corpus.
- Set `EXP005 = True` to enable isolation variants (ANCH/ESCL).

## Experimental Record
Archived in `harness/results/EXP-001` through `EXP-007`. Each folder contains:
- `log.md`: Narrative of the run.
- `report.md`: Tabular metric results.
- `run.json`: Machine-readable traces.
- `harness_snapshot.py`: The exact code state for that experiment.
