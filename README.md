# KASSA — K-Governed Voice Architecture

[![Demo](https://img.shields.io/badge/demo-GitHub%20Pages-22c55e?style=for-the-badge)](https://sunrisesillneversee.github.io/KASSA/demo/commitment_kernel_demo_v7.html)
[![Python](https://img.shields.io/badge/python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](requirements.txt)
[![Schema](https://img.shields.io/badge/schema-K%20bound%20projections-C4923A?style=for-the-badge)](schema/K_bound_projections_schema.json)
[![License](https://img.shields.io/badge/license-BSL%201.1-ef4444?style=for-the-badge)](LICENSE)
[![Patent](https://img.shields.io/badge/patent-pending-94a3b8?style=for-the-badge)](#license-and-ip-boundary)

> A substrate-level architecture for voice AI: commit state once, hash-lock it, and let downstream agents consume K read-only.

KASSA explores the **K-Governed Voice Architecture**, a commitment-kernel approach to voice AI orchestration. The core thesis is simple:

> **Commit state before intelligence branches.**

Instead of passing caller intent through a sequence of agents that reinterpret each other's lossy outputs, KASSA extracts a canonical state representation **K**, binds its projections with hashes, and validates downstream work against that fixed root.

## Live Demo

Open the browser demo:

**[Commitment Kernel Demo v7](https://sunrisesillneversee.github.io/KASSA/demo/commitment_kernel_demo_v7.html)**

The demo compares:

- **S1:** standard sequential cascade
- **S2:** coordinated intermediate state
- **S3:** K-governed parallel fanout

The page runs without credentials using cached demo data. To execute live model calls, paste an Anthropic API key into the demo panel; it is stored in `sessionStorage` only. The earlier [v6 demo](https://sunrisesillneversee.github.io/KASSA/demo/commitment_kernel_demo_v6.html) remains archived.

## Repo Map

| Path | Purpose |
| --- | --- |
| [`demo/`](demo/) | Self-contained HTML/JS visual demos for latency and drift |
| [`harness/`](harness/) | Commitment Conservation Harness for recursive stability experiments |
| [`schema/`](schema/) | K-bound projection schema and state contract |
| [`docs/`](docs/) | Architecture notes, reviewer response, conservation paper, deep wiki |
| [`images/`](images/) | Diagrams for S1/S2/S3 and architecture visuals |
| [`.planning/codebase/`](.planning/codebase/) | Technical handoff notes and codebase map |

## Technical Principle

Current voice AI often behaves like this:

```text
audio -> STT -> partial text -> agent A -> agent B -> agent C -> response
```

Each stage reinterprets a degraded signal. Drift compounds with the number of handoffs.

KASSA proposes:

```text
audio -> extract K -> hash-lock K -> read-only fanout -> validate against K
```

That changes the failure mode:

- Drift becomes bounded against a shared root instead of compounding through a chain.
- Agents can run in parallel because they do not depend on each other's prose.
- Governance can validate outputs against a fixed commitment state.
- Multimodal channels can be preserved independently: text, prosody, temporal behavior, affect.

## K-Bound Projections

The public schema models K as independently hashed channels bound by a parent hash:

```text
K_text      lexical content
K_pros      prosodic structure
K_tmp       temporal behavior
K_affect    acoustic affect markers
```

See [`schema/K_bound_projections_schema.json`](schema/K_bound_projections_schema.json) and [`schema/README.md`](schema/README.md).

## Run The Harness

Install:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Run a quick single-signal comparison:

```bash
export OPENAI_API_KEY=...
python harness/quick_demo.py "The user must provide a valid email address before proceeding."
```

Run the convergence harness:

```bash
export OPENAI_API_KEY=...
python harness/run_convergence_v2.py
```

The harness is a public reproducibility scaffold. It does not disclose protected production-layer MO§ES™ internals. See [`harness/ip_boundary.md`](harness/ip_boundary.md) and [`harness/README.md`](harness/README.md).

## What This Does Not Claim

KASSA is not a generic chatbot wrapper, and the public harness is not the full production enforcement substrate.

The public layer demonstrates:

- recursive transformation stress testing
- public proxy commitment extraction
- comparison of baseline, compression, and gated conditions
- measurable drift/stability behavior over loops

The protected layer remains outside this repo:

- internal production MO§ES™ implementation
- canonical enforcement substrate
- non-public commitment algebra and deployment machinery

## Engineering Context

Latency numbers in single-turn model demos can be compressed by provider-side KV caching. The observed S1/S3 gap in the demo should be treated as a **floor**, not a production ceiling. In multi-turn production calls, sequential context bloat should widen the gap.

## Related Work

- Conservation Law paper: [`docs/CONSERVATION_LAW_PAPER.md`](docs/CONSERVATION_LAW_PAPER.md)
- Deep wiki: [`docs/DEEP_WIKI.md`](docs/DEEP_WIKI.md)
- Build doc: [`docs/K-governed-voice-architecture-build-doc.md`](docs/K-governed-voice-architecture-build-doc.md)
- Public IP boundary: [`harness/ip_boundary.md`](harness/ip_boundary.md)

## License And IP Boundary

Business Source License 1.1. Source-available for non-production use. Commercial use requires a separate license from Ello Cello LLC.

Patent pending:

- U.S. Serial No. 63/877,177 (Provisional)
- U.S. Serial No. 19/426,028 (Utility)

MO§ES™ is a trademark of Ello Cello LLC (USPTO IC 042).

See [LICENSE](LICENSE) for the full license, including the Lineage Custody Clause.

© 2026 Ello Cello LLC. All Rights Reserved.
