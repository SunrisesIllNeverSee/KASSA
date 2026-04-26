# CONCERNS.md: Technical Debt, Risks & Constraints

## 1. Latency Measurement Artifacts
- **KV Caching**: In single-turn demos, LLM APIs cache previous turns, masking the token-load penalty of cascaded (S1) systems. This makes the S1 vs S2 gap appear smaller (7-11%) than it is in production (>80%).
- **Mitigation**: Disclosed in README and Deep Wiki. `run-nonce` used as a workaround but is not a perfect simulation.

## 2. Extraction Bottlenecks
- **Step A Boundary**: Summarizers may strip vital qualifying content ("unless," "only if") before the extractor can see it.
- **Structural Blindness**: Modal-pattern extractors struggle with non-modal commitments like ordering constraints ("A before B").

## 3. Governance Failures
- **Obligation Escalation**: Step B often upgrades "should" to "must."
- **Modal Frame Inversion**: Anchor preservation (keeping "must") without frame preservation can invert polarity (e.g., prohibition becomes positive obligation).

## 4. IP Boundaries
- **Proprietary vs. Public**: The **MO§ES™ core** (SCS, S³, Mediator) is proprietary and should not be exposed. Only the **Harness** (proxy tool) and the **Conservation Law** (theory) are public.
- **Naming**: Use objective academic posture. Focus on the project's internal lineage and branding (Conservation Law, MO§ES™).

## 5. Development Risks
- **S3 Complexity**: The Synthesis layer for merging parallel agent outputs is the most complex component and requires robust "Formal Collapse" prevention.
- **NLI Sensitivity**: LLM-as-a-judge for NLI can occasionally mask "qualifier loss" if both sides of the comparison are equally impoverished (Co-degraded Invariance).
