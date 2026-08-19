---
type: Reference
title: K-Governed Voice Architecture — Deep Wiki
description: K-Governed Voice Architecture — Deep Wiki — documentation in docs/.
tags: [documentation, docs]
timestamp: 2026-08-19
---

# K-Governed Voice Architecture — Deep Wiki

**Project:** voice-ai · **Status:** BUILD · **Last Updated:** 2026-04-25

---

## Executive Summary

This is a **substrate-level architecture** for voice AI that solves the state commitment and propagation problem that cripples current cascaded multi-agent systems. The thesis: **the system should commit state before intelligence branches.**

Instead of passing text through a chain of agents (where errors compound n×ε), we extract a canonical state representation K once from the caller utterance, hash-lock it, and have all downstream agents consume K read-only. Drift becomes ε regardless of agent count. Governance becomes O(1) validation against a cryptographic root.

**This is not a pipeline optimization. It is a rebuild.** Cascaded systems and S2S systems are degenerate cases of this substrate.

---

## The Problem — Why Current Voice AI Fails

### The Failure Mode

```
audio → STT → partial text → multiple agents reinterpret independently → drift compounds
```

Each agent re-derives intent from lossy, mutated context. Errors compound n×ε over n handoffs. Tone dies at STT. Every downstream module is guessing.

### Symptoms Observed in Legacy Architecture

- **Buggy behavior** — AI starts correctly and wanders by turn three (commitment violation)
- **Latency** — 2-second pauses feel broken; 4-second pauses and callers think the line dropped
- **Interruption handling** — when callers talk over the AI mid-sentence, the state machine fails to recover
- **High-stakes callers** — homeowners with broken HVAC or flooded basements. Low patience, real stakes. Not the demographic that forgives laggy AI

### The Root Cause

**Dependency structure, not implementation.** Chaining LLM inference calls sequentially, each waiting on the last, in a medium (live phone call) with zero tolerance for perceptible delay. The latency isn't a bug in code — it's the physics of the architecture.

---

## The Solution — K-Governed Substrate

### The Architecture

```
audio → extract canonical K → hash-lock → read-only fanout → validate against K
```

**K is the canonical state representation** — the minimal, identity-preserving kernel that must survive the entire interaction for the call to resolve correctly.

### K Structure — Bound Projections

K is **multimodal, not text-derived**. If K is extracted post-STT, you've solved orchestration drift but inherited cascaded systems' fundamental weakness: the voice was flattened before intelligence touched it.

```json
K {
  parent_hash: SHA-256,
  channels: {
    K_text:   { content, hash, extractor_version },
    K_pros:   { content, hash, extractor_version },
    K_tmp:    { content, hash, extractor_version },
    K_affect: { content, hash, extractor_version }
  },
  provenance: { raw_input_ref, extraction_timestamp, sig_weights }
}
```

**Why bound projections, not fused state:**
- Fused multimodal embeddings are opaque (loses debuggability)
- Agents subscribe only to channels they need (capability grant, not firehose)
- Validation stays O(1) per channel; drift measured per-modality
- Extractors versionable independently
- S2S fuses because they have to; you fuse-when-needed at agent level

### The Three Scenarios

**S1 — Current Cascaded (what everyone does):**
STT → NLU → Tone Agent → Subject Agent → Response Agent → TTS
- Each handoff is text. Drift compounds. Text-as-bus is the pathology.
- Measured latency: ~10.12s per turn (Full-Duplex-Bench v3, Apr 2026)

**S2 — K-Governed Sequential:**
Agents run sequentially but all read from committed K. Drift bounded, but serial latency remains.
- Projected latency: ~2.5–3s per turn
- **5–8× improvement over S1, no parallel execution required**

**S3 — K-Governed Near-Parallel (target):**
Agents fan out simultaneously from locked K, synthesis layer merges outputs.
- Projected latency: ~1.3s per turn
- **~87% reduction vs S1. Compounds to ~44s saved over 5-turn call**

### The Drift Math

- **Cascaded chain:** n agents, n×ε error (errors compound)
- **K-governed hub:** n agents, ε error (errors isolated)

This separates "number of agents" from "semantic drift" as independent variables. Architecturally novel.

---

## The Three Core Systems

### 1. Conservation Law of Commitment

**Extracts the caller's intent at first utterance, locks it as a governing kernel, and ensures that kernel survives every downstream transformation without drift.**

**Empirical Evidence (DOI: 10.5281/zenodo.19105225, EXP-001 to EXP-007):**

| Metric | Result | Source |
|--------|--------|--------|
| Token compression under Gate | 58% | EXP-001: 20→8 tokens, core obligations intact |
| NLI=1.00 under Gate | 65% of signals | EXP-003: 13/20 canonical signals, Regime A |
| Fixpoint iteration | i=1 | EXP-005: surface fixpoint from iteration 1, stable through i10 |
| Drift across 10 iterations | 0.00 | EXP-007: NLI=1.00 held even when Jaccard=0.00 |

**Why Regime A matters for this signal class:**
The 35% failure cases in CCH experiments are legal qualifiers, multi-condition formal statements, and NP-negation edge cases. Standard voice AI callers are almost entirely **Regime A signals** — modal-anchored, temporally grounded, quantitatively clear. "I need to book a repair for Friday," "my heat is out," "I need to reschedule my appointment."

### 2. SigSystem

**Weights every word in the incoming signal for signal-to-noise value in real time.**

**Two functions simultaneously:**

1. **Support** — Signal-dense words surface fast. The commitment is continuously verified against weighted signal from the caller across every turn. If word weights start shifting register, the system catches commitment modification before any agent misroutes it.

2. **Learning** — Call volume is enormous. Every call is a corpus. SigSystem builds a weighted vocabulary specific to vertical-specific callers — what words carry signal in an emergency vs routine booking vs billing dispute. Commitment extraction gets faster because the system already knows what signal-dense language looks like.

**Distinction from TF-IDF:**
- TF-IDF optimizes for retrieval
- SigSystem optimizes for semantic conservation under compression
- SigSystem retains both signal and noise forms of every word (context token reduction)

### 3. MO§E§™ Governance

**Ensures structure and coordination between the systems and enforces the commitment kernel across every agent at the moment of execution — not before, not after.**

**The critical positioning:**
> "MO§ES Governance lives at the execution level not before not after. At the exact moment the words hit the threshold each one being gated and directed immediately."

**Two primitives:**
- `lock(K)` — SHA-256 hash per channel + parent hash after extraction. Agents become read-only.
- `validate(agent_output, K)` — O(1) shape check that agent only touched authorized fields + per-channel entailment check that output is consistent with K

**The hash isn't a checksum — it's an authorization mechanism.**
- Verification *after* vs gate *before*
- Same primitive, different position in the stack, different function
- Dissolves "we already have hashing" rebuttal

---

## Where Each System Plugs Into the Stack

```
CALLER SPEAKS
     |
[ STT ]  <————————————————  SIGSYSTEM enters here
     |                       Weights words as text arrives.
     |                       Pre-maps signal density before
     |                       extraction fires.
     |
[ COMMITMENT EXTRACTION ]  <— CONSERVATION LAW / CCH
     |                         Replaces full NLU inference.
     |                         Kernel locked. Hashed.
     |                         Fixpoint established at turn 1.
     |
[ MO§E§™ GOVERNANCE WRAPS FROM HERE DOWN ]
     |
[ ORCHESTRATOR / ROUTING ]  <— receives kernel, not full context
     |
[ TONE AGENT ]         ^
[ SUBJECT AGENT ]      |  All operating under governance.
[ RESPONSE AGENT ]     |  58% token load. No wait-for-completion
[ PACE AGENT ]         |  handoff. Directed at execution.
     |
[ FAIL-CHECK ]  <————————— comparative against locked kernel
     |                      near-zero cost. Drift architecturally
     |                      prevented, not caught reactively.
     |
[ TTS ]
     |
CALLER HEARS
```

---

## Latency Impact — Empirical Projections

| System | Per-Turn Latency | Source |
|--------|-----------------|--------|
| Human conversation | 300–500ms | Cognitive baseline |
| Optimized single-LLM | <1s | 30+ stack benchmarks, DEV Community 2025 |
| Commitment Theory (projected) | ~1.3s | CCH EXP-001–007, empirically grounded |
| Typical production agent | ~800ms–2s | Introl, Dec 2025 |
| GPT-4o Realtime API | 4.25s | Full-Duplex-Bench v3, Apr 2026 — measured |
| Cascaded multi-agent baseline | 10.12s | Full-Duplex-Bench v3, Apr 2026 — measured |

**Five-turn call delta:** ~50s (current cascaded) → ~6.5s (CT-governed). ~43.5s removed per call.

**The key insight:**
> "Latency reduction is achieved by eliminating inter-agent dependency — not by improving model speed. Same agents. Same task. Different dependency structure → different wall-clock."

---

## The Build Sequence — 8 Steps

### Step 1: K_text Extraction + Hash Lock
- Implement rule-based commitment extraction using CCH modal sieve
- SHA-256 hash the output
- Replace full NLU inference call (~375ms) with embedding-speed extraction (~75ms)

### Step 2: Per-Call Logging Infrastructure
- Log `(raw_input, committed_K, validation_result)` triples
- This is the Phase 2 training dataset
- Ships early — it's the optionality

### Step 3: Two Agents Consuming K Read-Only
- Implement tone and subject agents as illustrative consumers
- Demonstrate drift decoupling (ε vs n×ε)
- **Stop-and-measure:** if this doesn't beat cascaded baseline on drift, architecture isn't load-bearing

### Step 4: Governance Layer (O(1) Validation)
- Implement `lock()` and `validate()` primitives
- Per-channel entailment checks
- Near-zero marginal cost

### Step 5: K_pros Channel
- Implement prosodic extraction
- Define conservation metric (emotion-classifier agreement pre/post)
- Independent EXP-numbered validation suite

### Step 6: SigSystem Feedback Loop
- Monitor output drift across calls
- Refine weight map for next call
- Validation outcomes become training signal

### Step 7: S3 Parallel Fan-Out + Synthesis Layer
- Implement staggered launch (200ms) for near-parallel execution
- **Synthesis layer must be typed structured merger** — NOT another LLM eating text outputs
- EXP-008 needed: conflict resolution rules, priority encoding

### Step 8: K_tmp, K_affect
- Temporal behavior extraction (pause/interrupt patterns)
- Acoustic affect markers (stress, energy, tension)
- Per-channel conservation metrics

---

## Key Design Decisions

### Streaming Commitment = Option A
- Commit at utterance boundary, accept the latency
- Realm-tunable
- System reveals correct tuning empirically via hash trail + SigSystem + failure logs
- Stated as design decision, not deferred

### Synthesis Layer Must Be Typed Structured Merger
- NOT another LLM eating text outputs
- That reintroduces the text bus
- Deterministic priority encoding
- EXP-008 needed

### Logging Is Non-Negotiable from Day One
- `(raw_input, committed_K, validation_result)` triples
- This is the Phase 2 training dataset
- Ships at step 2, not late

### Framing: State Authority Before Branching
- Agents are illustrative consumers
- Not "better tone handling"
- Lead with this in all materials

### Phase 2 Training = Validation-Conditioned
- Not imitation learning against rule-based K
- RLHF-shaped, not supervised
- Trains on something closer to ground truth (most foundation models train on soft labels)

---

## Four Non-Negotiable Design Constraints

1. **Every commitment logged with full reconstruction context**
2. **Channel separation preserved in logs**
3. **Conservation laws measured, not asserted**
4. **Governance decisions auditable**

Skip any of these and you lock yourself into infrastructure-only forever.

---

## Proprietary Stack Dependencies

The K-governed architecture depends on proprietary components not included in this repository — signal weighting (SigSystem), conservation measurement (the canonical CCH implementation), and governance enforcement (MO§ES™ `lock(K)` / `validate()` primitives). These are maintained separately under Ello Cello LLC. The public harness in `/harness` is a falsification proxy that exercises the conservation-law mechanics those components depend on; see [harness/ip_boundary.md](../harness/ip_boundary.md) for the boundary statement.

---

## Critical Signal Gems (Weight 9–10)

> "MO§ES Governance lives at the execution level not before not after. At the exact moment the words hit the threshold each one being gated and directed immediately." — User

> "Latency reduction is achieved by eliminating inter-agent dependency — not by improving model speed. Same agents. Same task. Different dependency structure → different wall-clock." — Assistant

> "In a chain, errors compound. In a hub, errors are isolated." — Assistant

> "The hash isn't a verification step at the end. It's the authorization mechanism at the beginning." — Assistant

> "The system should commit state before intelligence branches." — SciSpace

> "S1 passes meaning through language. S2/S3 extracts it once and holds it as state. That's not an optimization. That's a rebuild." — Assistant

> "Falsifiability is what separates science from marketing. Most AI claims can't be falsified — they're just assertions. The CCH was specifically designed to find the failure modes." — Assistant

> "Floorboards, not patches. You were trying to solve one practical failure — but the failure source lived below the product layer. So instead of finding a patch, you found the floorboards." — SciSpace

> "Three things are where the architecture is genuinely load-bearing: O(1) governance primitives, per-channel conservation metrics, a clean training target. Everything else is arguable." — Reviewer

---

## Demo Limitations — Honest Assessment

The commitment kernel demo (v6) shows a **7–21% latency improvement** for S2 over S1. This gap is **muted by measurement constraints**:

### Why the demo underestimates the real gap:

1. **API KV caching** — Anthropic's API caches tokens to avoid re-processing. In single-turn demo loops, context doesn't grow between runs. In production at turn 3–5 of a real call, S1's context window IS growing — each agent adds tokens, and the next agent receives the accumulated context. KV caching collapses this advantage in the demo.

2. **Single-turn limits** — The demo simulates one turn. S1's handoff penalty (500ms–1.5s per transition) compounds across turns. In a 5-turn call, that's 2–6 seconds of pure coordination overhead the demo can't show.

3. **Different stack** — The demo runs against Claude's API on small prompts, not the target's actual cascaded architecture with their real models, context windows, and handoff overhead.

4. **Run-nonce workarounds** — Later versions added a run-nonce parameter to defeat caching. This is an honest workaround, but it's fighting the measurement environment rather than measuring real production scenarios.

### The honest admission is a strength:
- Documented the KV caching problem explicitly
- Added run-nonce as a transparent workaround
- Provided multi-turn projection charts showing compounding effects
- Stated demo scope: "illustrates architecture, not proof itself"

**The 7–21% is a lower bound, not the true production delta.** The architecture difference is real; the demo just can't fully demonstrate it under single-turn API constraints.

---

## Open Items

### High Priority
1. **Streaming commitment spec** — tuning surface, discovery mechanism, cold-start defaults. Upstream blocker.
2. **EXP-008 (synthesis layer)** — typed merge, conflict resolution, priority encoding. Biggest execution risk.
3. **K_pros conservation metric** — emotion-classifier agreement pre/post compression. Concrete proposal TBD.

### Medium Priority
4. **Non-text conservation metrics** — behavioral preservation > representational. Second paper family.
5. **Bias inheritance** — validation-conditioned training formulation written; implementation waits for dataset.
6. **Adversarial robustness for NLI=1.00** — sarcasm, code-switching, emotional contradiction, interruptions.

### Lower Priority
7. **What's the actual S1↔S2 gap on the target stack?** Requires instrumentation against the actual architecture.
8. **Will the stakeholder engage with the harness?** Decision is theirs alone; not yet tested in follow-up conversation.

---

## High-Speed Extraction vs. Cascade Latency

A common rebuttal from engineers stuck in S1 (cascaded) architecture is: *"But what if the kernel extraction is wrong? A cascaded system can self-correct."*

**The "Cold Start" Reality:**
This system is built for **resilience under cold starts**. The commitment kernel isn't just a "best guess"—it's an anchored projection. Because the extraction happens at **embedding speeds (~75ms)**, the system can actually extract and compare **ten candidate kernels** before a standard cascaded NLU even finishes processing a simple "hello." 

**The Deterministic Nature of Calls:**
In high-stakes domains (like home services, HVAC, legal intake), there are only a finite number of call types. The idea that a governed system will "misinterpret" a request after 3 to 4 triple-checks and bypasses is mathematically improbable compared to the **guaranteed drift** of an ungoverned chain.

- **Isolation vs. Hallucination:** In a chain, if Agent 1 is wrong, Agent 2 and 3 *must* hallucinate a path forward from that error. In a hub, the Fail-Check agent is **comparative**, not reactive. It compares the output to the locked hash.
- **Auditable Truth:** If K is genuinely ambiguous, the system triggers a clarification branch immediately. In S1, the system wanders for turns before the user (or the line drop) corrects it.

---

## Failure Mode Taxonomy (from CCH)

The Falsifiability Harness was specifically designed to find where commitment conservation fails. These are not bugs; they are **boundary conditions**:

| Mode | Description |
|---|---|
| **Step A Boundary** | Summarizer strips qualifying content *before* extraction. |
| **Obligation Escalation** | Step B upgrades "should" → "must" (over-commitment). |
| **Formal Collapse** | Multi-condition formal statements merged into structurally incorrect chains. |
| **NP-negation Blindness** | Noun-phrase negation ("No firearms allowed") leads to empty extraction; Jaccard=0.00 despite NLI=1.00. |
| **Lexical Scope Widening** | Taxonomic broadening at noun level ("firearms" → "weapons"). |

By leading with these failures, you prove a **scientific posture** rather than a marketing one. The system is designed to handle these through **lineage control** and **governance axioms**.

---

## Density Theory — Materials Engineering for AI (Identified Research Note)

*Note: This section identifies a known technical boundary for future research. While the current Demo (v6) focuses on Latency and Drift, Density Theory provides the quantitative "math" for why governed systems stay stable while cascaded systems fracture.*

**The "Yap" Risk:** 
In legacy cascaded systems, agents often "yap" their way out of intent. This isn't just a mistake; it's a structural failure under load. 

- **Commitment Density ($\rho = M / V$):** Mass (irreducible anchors) over Volume (tokens). High-density prompts (MO§ES™ kernels) provide the gravitational pull to keep a model from drifting.
- **Ontological Strain ($\epsilon = E / \rho$):** Expansion Velocity (E) over Density. Every model has a **McHenry Limit (k)**. If $\epsilon > k$, the lattice fractures, and the model hallucinates.

### **The Defense: Function-Specific Receiving Kernels**

The architecture solves the "yap" risk by ensuring that agents never receive a "firehose" of information. Instead, the system produces a **Receiving Kernel** for each agent:

1.  **$K_{tone}$** → A high-density projection containing *only* the affect/stress markers.
2.  **$K_{subject}$** → A high-density projection containing *only* the lexical obligations.
3.  **$K_{pace}$** → A high-density projection containing *only* the temporal pauses.

**Why this makes drift "impossible":**
Because the agent's input context is so small and high-density (pre-engineered), its "degrees of freedom" are naturally throttled. You aren't asking the Tone Agent to "be polite"; you are feeding it a 5-token kernel that acts as its **Constitutional Boundary**. It has no "mass" to convert into a rogue narrative.

---

## Positioning vs Competitors

### Not "Better Pipeline"
This is a substrate. Cascaded pipelines and S2S systems are special cases of this architecture.

### Not S2S Competitor
- Cascaded = K with only K_text populated
- S2S = K fused and hidden
- This = K exposed, channeled, governed

### The Abstraction
**A typed, hash-locked, multi-channel commitment.** This is the correct abstraction — not "better orchestration," not "S2S competitor."

---

## Falsifiability — The Unlock for Skeptics

**Lead with the harness, let the demo be illustration.**

The CCH (DOI: 10.5281/zenodo.19105225) includes:
- Documented failure modes (EXP-007 NP-negation blindness, EXP-006 self-referential collapse, EXP-004 obligation escalation)
- 57 signals, 181 condition-signal runs
- Measured results, not assertions

The public harness workflow is archived separately: [10.5281/zenodo.19109397](https://doi.org/10.5281/zenodo.19109397)

A skeptical engineer can't dismiss this as "AI generated." The demo illustrates the architecture; the harness proves the principle.

---

## The Tone Agent Diagnosis

> "Absurd by construction — STT already discarded the tone." — SciSpace

The Tone Agent in cascaded systems is inferring pitch, pace, affect from a string that no longer contains any of it. Guessing from lexical cues or hallucinating emotion. **One line that completely indicts the current architecture.**

This is why K must be multimodal, not text-derived.

---

## Layer vs Model — The Maturation Path

**Architecture now → learned model later.**

Path:
1. Rule-based K today
2. Accumulate `(raw_input, committed_K, validation_result)` triples
3. Train extractor
4. Learned K-constructor becomes the model
5. Original rule-based system becomes the validator/governance layer

**Verifiability of committed state is what makes the eventual learned version defensible.** Most foundation models train on soft labels; this trains on something closer to ground truth.

---

## For Technical Stakeholders

### The Posture
Peer working on a hard problem, not pitcher. "Struggling to find ways to prove the system; started playing around with things when the issues were mentioned."

### The Offer
**Test the principle, no commitment required.** The harness gives a way to test against actual signal types before committing to anything.

### The Diagnostic Question
> "When the voice AI gets to turn 3 or 4 of a call, does the context window start affecting performance? Does it get slower? Does it start making errors it didn't make on turn 1? If yes — that's the cascaded context problem."

Converts theory into something already being measured.

### The Business Question
**S1 cannot become S3.** Once you extract intent, lock K, remove text dependencies, and schedule simultaneously — you've left S1 entirely.

**It's not an optimization. It's a rebuild.** That framing changes the question from "can we patch this" to "should we rebuild this."

---

## Patent Status

**Serial No. 63/877,177 (Provisional)**

Owner: Ello Cello LLC

---

## Reading Order for Newcomers

1. This file (you are here)
2. `docs/K-governed-voice-architecture-build-doc.md`
3. `docs/001_VOICEAI_ARCHITECTURE_SUMMARY.md`
4. `docs/002_REVIEWER_RESPONSE.md`
5. `docs/CONSERVATION_LAW_PAPER.md`

Diagrams for visual reference: `images/`
- `diag0_standard.png` — Standard SIP→STT→LLM→TTS pipeline (baseline)
- `diag1_s1.png` — S1 cascaded text relay (current architecture — chain dependency)
- `diag2_s2.png` — S2 K-governed sequential (hub-and-spoke from K, sequential execution)
- `diag3_s3.png` — S3 K-governed near-parallel (hub-and-spoke from K, simultaneous execution)

All four diagrams label the three core components at their firing points:
- **Conservation Law (gold)** — extraction step where K is created
- **SigSystem (purple)** — pre-weights signal before extraction, monitors drift after validation
- **MO§E§™ Governance (gold)** — locks K with SHA-256, validates agent outputs at execution

---

*Generated with Devin for Terminal*
*Mode: BUILD*
*Owner: DJM*
*Copyright: © 2026 Ello Cello LLC. All rights reserved.*
*Trademark: MO§ES™ (Modus Operandi System for Signal Encoding and Scaling Expansion)*