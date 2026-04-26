# ARCHITECTURE.md: High-Level Design

**Overview**
KASSA implements the **K-Governed Voice Architecture**, which operates on the core principle: **"Commit state before intelligence branches."** It moves away from traditional sequential agent chains (which suffer from compounding error $n \times \epsilon$) toward a substrate where a canonical state **K** is extracted once and governed across all downstream reasoners.

**Core Concepts**
*   **K (Commitment Kernel):** A canonical, hash-locked state representation extracted from the first caller utterance. It is content-addressed and immutable. All downstream agents consume K in a read-only fashion.
*   **S1/S2/S3 Execution Scenarios:**
    *   **S1 (Standard):** Sequential cascaded agents passing text. Drift compounds at each handoff.
    *   **S2 (K-Governed Sequential):** Agents run sequentially but read from the locked K. Drift is bounded, but serial latency remains.
    *   **S3 (K-Governed Parallel):** Target architecture where agents access K simultaneously in a parallel fan-out. A synthesis layer merges outputs. This collapses latency and bounds drift.
*   **MO§ES™ Governance Substrate:**
    *   The **Modus Operandi System for Signal Encoding and Scaling Expansion**.
    *   Enforces the commitment kernel across every agent at the moment of execution.
    *   Performs $O(1)$ validation of agent outputs against the cryptographic root K to ensure no "drift" or hallucination relative to the original commitment.
*   **Bound Projections:** Instead of a single opaque embedding, K is composed of independent, hashed channels:
    *   **K_text:** Lexical content (NLI-validated).
    *   **K_pros:** Prosodic structure (tone, stress).
    *   **K_tmp:** Temporal behavior (pauses, interruptions).
    *   **K_affect:** Acoustic affect/emotion.
*   **SigSystem:** A pre-extraction weighting layer that maps signal density in real-time, allowing the system to ignore noise and focus on "commitment-bearing" tokens before extraction fires.
