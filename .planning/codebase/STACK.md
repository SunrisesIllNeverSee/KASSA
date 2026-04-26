# Technology Stack: KASSA (K-Governed Voice Architecture)

This document details the languages, frameworks, libraries, and infrastructure used in the KASSA project.

## Core Languages
- **Python (3.x):** The primary language for the research harness (`/harness`), experimental scripts, and data analysis.
- **HTML5 / CSS3 / JavaScript (ES6+):** Used for the interactive browser-based demonstration (`/demo/commitment_kernel_demo_v6.html`).

## AI & Machine Learning
- **LLM Providers:**
  - **OpenAI API:** Primary engine for inference (`gpt-4o-mini`). Used for text generation, commitment extraction, and Natural Language Inference (NLI) judging.
  - **Anthropic API:** Referenced in project goals for cross-model validation and potential future integration.
- **NLI (Natural Language Inference):** Implemented via LLM-as-a-judge to measure semantic equivalence (bidirectional entailment) rather than just surface-level string matching.

## Frameworks & Libraries
- **Python Libraries:**
  - `openai`: Client for interacting with OpenAI models.
  - `requests`: Used for manual HTTP calls to API endpoints (e.g., in `run_convergence_v2.py`).
  - `pathlib`: For robust cross-platform file path management.
  - `json` & `re`: Core modules for schema validation, data serialization, and regex-based "modal-pattern sieves."
  - `datetime`: For logging and experimental record timestamps.
- **Frontend (Demo):**
  - No external JS frameworks (Vanilla JS).
  - **Google Fonts:** `JetBrains Mono` and `Syne` for the UI/UX.
  - **CSS Variables:** Used for theme management and state-based styling (S1/S2/S3 scenarios).

## Data & Schema
- **JSON Schema:** Defines the "Commitment Kernel (K)" structure (`/schema/K_bound_projections_schema.json`).
- **Corpora:** JSON-based datasets used for benchmarking (`/harness/corpora/*.json`).

## Infrastructure & Tools
- **Versioning:** Git (hosted on GitHub).
- **Research Publishing:** Zenodo (DOIs assigned for datasets and paper versions).
- **Logging:** Structured logs in Markdown and JSON format within `harness/results/EXP-NNN/`.
