# Integrations and Component Interaction: KASSA

This document details external services and how the different components of the KASSA project interact.

## External APIs & Services
- **OpenAI API (`chat/completions`):**
  - **Role:** Performs the heavy lifting for state extraction (Step B), minimal statement reconstruction (Step C), and semantic stability judging (NLI).
  - **Auth:** Managed via `OPENAI_API_KEY` environment variable or a local `~/.config/openai/api_key` file.
- **Zenodo:** Used for permanent archival of experimental records and the formal "Conservation Law" paper.

## Component Interaction

### 1. The Harness (`/harness`) → LLM
The Commitment Conservation Harness (CCH) acts as the research controller:
- **`analyze.py` / `run_convergence_v2.py`:** Orchestrates recursive loops where an utterance is transformed (paraphrased/compressed) across multiple iterations.
- **`extraction.py`:** A hybrid integration using local regex "sieves" to identify hard modals (must, shall, etc.) and LLM calls to verify semantic preservation.

### 2. The Demo (`/demo`)
A standalone visualization tool that simulates the architecture's benefits:
- **Scenario 1 (Cascaded):** Simulates the legacy "Text Relay" method where agents pass strings sequentially, incurring cumulative latency (handoff overhead) and token-load penalties.
- **Scenario 2/3 (K-Governed):** Demonstrates the "Commitment Kernel" approach where state is extracted once and shared.
- **Interaction:** The demo is currently a client-side simulation (`v6`) used to illustrate the latency reduction (up to 87%) and drift decoupling theories.

### 3. Schema & Governance (`/schema`)
- **JSON Schema Integration:** Provides the formal definition for the `K` object. All agents in a K-governed system are "bound" to this schema, ensuring that output validation remains $O(1)$ against the cryptographic root.

### 4. Documentation & Research (`/docs`)
- Integrates the mathematical theory (Conservation Law) with empirical results from the harness. 
- Serves as the "Deep Wiki" for the project, referencing the Patent (Serial No. 63/877,177) and peer-review responses.

## Interaction Flow (K-Governed Turn)
1. **Input:** Caller Utterance received.
2. **Step A (Summarization):** LLM reduces input to essential meaning.
3. **Step B (Extraction):** Extractor agent identifies "Binding Obligations" (Modals, Temporal, Quantitative).
4. **Step C (Reconstruction):** Minimal statement generated to form the **Commitment Kernel (K)**.
5. **Downstream:** All agents (NLU, Scheduling, Billing) consume **K** read-only.
6. **Validation:** Agent outputs are checked against **K** to prevent drift/hallucination.
