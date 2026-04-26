# STRUCTURE.md: File and Directory Organization

The repository is organized to support both the theoretical framework (Conservation Law) and the empirical validation harness (CCH).

**Root Directory**
*   `README.md`: Project thesis, core metrics (58% compression, NLI=1.00), and patent/copyright disclosures.
*   `requirements.txt`: Python dependencies (primarily `requests` for LLM interfacing).

**`/harness` — Commitment Conservation Harness (CCH)**
The experimental engine used to prove the conservation of commitment under recursive transformation.
*   `run_convergence_v2.py`: The main execution script for "Phase Transition Tests." It runs signals through Baseline, Compression, and Gated conditions over 10 iterations to measure Jaccard and NLI stability.
*   `extraction.py`: Contains the logic for extracting commitment-bearing words and calculating Jaccard similarity.
*   `/corpora`: JSON datasets containing canonical and adversarial test signals (e.g., `canonical_corpus.json`, `adversarial_corpus_exp004.json`).
*   `/prompts`: System prompts for the different stages of governance (`step_a.txt` for summarization, `step_b.txt` for extraction, etc.).
*   `/results`: Archived experimental records (EXP-001 through EXP-007) including logs, reports, and run metadata.
*   `/figures`: Scripts and output images visualizing results like heatmap convergence and conservation curves.

**`/docs` — Deep Wiki & Records**
*   `001_VOICEAI_ARCHITECTURE_SUMMARY.md`: High-level summary of SigSystem, CT, and MO§ES™.
*   `K-governed-voice-architecture-build-doc.md`: Detailed implementation guide for the substrate, including the "Minimum Viable Build Sequence."
*   `CONSERVATION_LAW_PAPER.md`: Theoretical foundation of the project.

**`/demo` — Demonstrations**
*   `commitment_kernel_demo_v6.html`: A web-based simulation/demo showing the latency and drift benefits of the architecture.
*   **Live Demo URL**: [https://sunrisesillneversee.github.io/KASSA/demo/commitment_kernel_demo_v6.html](https://sunrisesillneversee.github.io/KASSA/demo/commitment_kernel_demo_v6.html)

**`/schema` — Data Definitions**
*   `K_bound_projections_schema.json`: The JSON schema defining the structure of the multi-channel Commitment Kernel K.

**`/images` — Visual Documentation**
*   Diagrams contrasting Standard (S1) vs. K-Governed (S2/S3) architectures.
