# CONVENTIONS.md: Project Philosophy & Implementation Rules

## Core Philosophy
- **Conservation Law of Commitment**: "Commit state before intelligence branches."
- **Immutable State**: The Commitment Kernel (K) is extracted once and hash-locked.
- **Read-Only Downstream**: Agents consume K read-only; they do not re-infer intent from each other's text output.
- **O(1) Validation**: Governance is enforced at the moment of execution, not post-hoc.

## Terminology
- **K (Commitment Kernel)**: The multi-modal canonical state.
- **MO§ES™**: Modus Operandi System for Signal Encoding and Scaling Expansion.
- **SigSystem**: Real-time signal-to-noise weighting.
- **S1, S2, S3**: Sequential Cascaded, K-Governed Sequential, and K-Governed Parallel (Target).

## Naming Rules
- Follow the brand voice: Use "sovereign," "lineage," "invariants," "entropy cost." Avoid "magic," "intelligent," "revolutionary."

## Coding Standards
- **Python**: Use `pathlib` for paths. Follow PEP 8 where possible, but prioritize clarity of the research logic.
- **Schema**: All K-projections must validate against `schema/K_bound_projections_schema.json`.
- **Governance**: Every agent turn must be gated by the commitment kernel.
