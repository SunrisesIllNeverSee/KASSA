# K-Governed Voice Architecture

A substrate-level architecture for voice AI that solves the state commitment and propagation problem in multi-agent systems.

## 🚀 Quick Starts

### 1. The Demo (Latency & Drift Visualization)
View the interactive S1/S2/S3 simulation directly in your browser:
**[Live Commitment Kernel Demo (v6)](https://sunrisesillneversee.github.io/KASSA/demo/commitment_kernel_demo_v6.html)**

### 2. The Harness (Falsifiability Testing)
Run the Commitment Conservation Harness (CCH) to measure semantic stability over recursive loops:
```bash
cd harness
# Ensure OPENAI_API_KEY is set in your environment
python3 run_convergence_v2.py
```
*Experimental data for EXP-001 through EXP-007 is archived in `harness/results/`.*

---

## 🗺 Codebase Map & Directional Guidance

- **`/harness`** — **The Engine.** Core logic for the CCH, including the recursive transformation loops and NLI/Jaccard metric implementations.
- **`/demo`** — **The Visualization.** HTML/JS simulation of the S3 parallel governance model.
- **`/schema`** — **The Contract.** Formal JSON schema for the multi-channel Commitment Kernel (K).
- **`/docs`** — **The Theory.** Deep Wiki and the formal "Conservation Law" paper.
- **`.planning/codebase/`** — **Technical Handoff Docs.** Structured summaries of the stack, architecture, and current technical concerns.

---

## 🛠 Technical Foundation

### The Principle: "Commit state before intelligence branches."
Instead of passing text through a chain of agents (where errors compound), this architecture extracts a canonical state representation **K** once from the caller utterance, hash-locks it, and has all downstream agents consume K read-only.

### Core Features
- **Drift Decoupling:** Error becomes ε regardless of agent count, instead of n×ε.
- **Bound Projections:** Multimodal K (Text, Prosody, Temporal, Affect) with independent hashes.
- **Governance at Execution:** O(1) validation of agent outputs against the cryptographic root K.
- **Latency Collapse:** Eliminates inter-agent dependency, allowing for near-parallel execution (S3) and ~87% latency reduction.

---

## 🔍 Engineering Context & Disclosures

### Latency Measurement & KV Caching
In single-turn demo loops, LLM APIs utilize **KV Caching**, which artificially masks the token-load penalty of sequential (S1) architectures. The **7–11%** gap observed in the demo is a **floor** caused by the measurement environment. In multi-turn production calls, S1 context bloat significantly widens the performance gap relative to the O(1) K-governed architecture.

### Differentiation from standard LLM/S2S Models
- **State vs. Context:** Replaces linear context growth ($O(N)$) with a fixed-size Commitment Kernel ($O(1)$).
- **Governance vs. Probability:** Replaces probabilistic "next-token" guessing with deterministic execution gating.
- **Parallel vs. Sequential:** Enables simultaneous agent launch (S3) by removing inter-agent text dependencies.

---

## License

Business Source License 1.1 — source‑available for non‑production use.
Commercial use requires a separate license from Ello Cello LLC.

Patent Pending: U.S. Serial No. 63/877,177 (Provisional), 19/426,028 (Utility)
MO§ES™ is a trademark of Ello Cello LLC (USPTO IC 042).
© 2026 Ello Cello LLC. All Rights Reserved.
See [LICENSE](LICENSE) for full terms, including the Lineage Custody Clause.
