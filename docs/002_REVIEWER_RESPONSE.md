---
type: Reference
title: DOC 002 | REVIEWER RESPONSE — SIX OPEN QUESTIONS
description: DOC 002 | REVIEWER RESPONSE — SIX OPEN QUESTIONS — documentation in docs/.
tags: [documentation, docs]
timestamp: 2026-08-19
---

# DOC 002 | REVIEWER RESPONSE — SIX OPEN QUESTIONS
---
**Timestamp:** 2026-04-24
**Thread:** Architecture review response — proprietary context restored
**Status:** Working document

---

## Framing Note

The review was written against public-facing materials only. Four of the six concerns survive even with the proprietary stack visible. Two dissolve once the internal measurement protocol is in view. This document addresses all six in order, separates what the proprietary layer resolves from what it doesn't, and states the remaining open questions plainly.

---

## 1. NLI=1.00 at 58% Compression — Underspecified

**What the reviewer caught:**
"NLI=1.00" sounds like a claim of guaranteed semantic equivalence. The model used, the dataset, and inter-model disagreement are not named. The first sharp reviewer will press on all three.

**What the proprietary layer resolves:**
The measurement protocol is documented internally. Model: `cross-encoder/nli-deberta-v3-small` (HuggingFace). Dataset: CCH canonical corpus — 20 signals across six signal categories, designed to stress-test extraction under compression. The NLI score is bidirectional entailment against the canonical commitment kernel at each of 10 recursive iterations. EXP-007 specifically probes the boundary: NLI=1.00 with Jaccard=0.00, confirming semantic conservation without surface extraction. Inter-model disagreement was not tested across multiple NLI models — that is a genuine gap.

**What it doesn't resolve:**
The corpus is not a held-out benchmark — it was designed by the same researcher who designed the harness. Independent replication on a third-party corpus has not been run. "NLI model X reports 1.00 on corpus Y designed by the same team" is the honest statement. That is still meaningful, but it is not the same as "semantic equivalence guaranteed."

**The fix:**
Every public-facing instance of "NLI=1.00" gets a footnote: model name, corpus provenance, and honest scope. The phrase "semantic conservation" replaces "semantic equivalence" wherever the distinction matters. Inter-model disagreement becomes a target for the second paper family.

**Why it matters:**
This claim is load-bearing in investor and partner conversations. It needs to survive the first PhD-level reviewer, not just the first engineer.

---

## 2. Synthesis Layer — Under-Engineered

**What the reviewer caught:**
If synthesis becomes another LLM eating text outputs, the architecture collapses. "Deterministic conflict resolution" is one sentence doing too much work. When Tone Agent outputs `{affect: urgent}` and Response Agent outputs `{strategy: de-escalate}`, what resolves this? Whatever encodes that resolution is policy — and policy is a new governance surface.

**What the proprietary layer resolves:**
Nothing. The reviewer is correct and this is downstream of K entirely. MO§E§™ Governance locks K before agents fire. It does not resolve conflicts between agents operating on the same K. That is a synthesis-layer problem the architecture has not formally addressed.

**What the open question actually is:**
There are three resolution approaches:
- **Priority encoding** — a typed structured merger with explicit priority rules (e.g., urgency always overrides register). Auditable, testable, deterministic. The rules become their own governance surface but that surface is visible and changeable.
- **Conflict-flagging** — synthesis detects disagreement, flags for human review or escalation. Does not resolve autonomously. Preserves correctness at the cost of handling overhead.
- **K-constrained synthesis** — synthesis is permitted only to combine outputs in ways that remain entailed by K. Any combination that would violate K is rejected. This is the architecturally cleanest option and the one most consistent with the rest of the system.

**The fix:**
EXP-008. Design a conflict corpus — deliberately contradictory agent outputs — and test each resolution approach against K fidelity. Document the failure modes. The synthesis layer needs the same experimental treatment the extraction layer received.

**Why it matters:**
The synthesis layer is the last point where drift can enter before TTS. It is also the most invisible — reviewers focus on extraction and agents, not on what assembles the outputs. If synthesis is an unconstrained LLM call, the architecture's correctness guarantees end at validation, not at output.

---

## 3. "Extract Once" Is False Under Streaming

**What the reviewer caught:**
In real voice AI, there is no clean single utterance. There are partial transcripts, provisional prosodic state, endpoint uncertainty. If agents act on provisional K and final K differs, either agents are re-run (serial rework, eliminates the parallel win) or the system accepts occasional wrongness (preserves latency, violates the core premise). There is no free option.

**What the proprietary layer resolves:**
Nothing. This is a temporal architecture question. No extractor quality fixes it. It is a protocol decision about when K is allowed to lock.

**The three options stated explicitly:**

**Option A — Utterance boundary commitment.**
K locks at detected utterance end. Agents wait for clean endpoint. Latency cost: whatever the endpoint detection delay is (typically 200–400ms added to STT). Correctness guarantee: strong. This is what the demo does. This is a real design choice, not a problem deferred.

**Option B — Provisional/final with agent replay.**
K locks provisionally at partial transcript threshold. Agents fire. If final K differs from provisional K, agents that acted on provisional K are re-run. Latency: comparable to current cascaded system in worst case. Correctness: strong. Complexity: high — requires agent state checkpointing and replay protocol.

**Option C — Provisional only, accept occasional wrongness.**
K locks early. Agents fire. No replay. Mismatch between provisional and final K means occasional incorrect outputs. Latency: optimal. Correctness: probabilistic. This is what most production streaming voice AI actually does, implicitly, without acknowledging it.

**The recommendation:**
Option A for the current implementation. State it as a design decision with known tradeoffs. Option B is the research target for streaming production. Option C is the baseline that the architecture is explicitly improving on — it should be named as such in competitive positioning.

**Why it matters:**
The demo assumes Option A without naming it. A reviewer who knows production voice AI will immediately ask "what happens mid-utterance" and the current materials have no clean answer. This is a Step 0 decision that determines what Step 1 measures.

---

## 4. Non-Text Conservation Metrics — Noise Floor Problem

**What the reviewer caught:**
For prosodic commitment (K_pros), emotion classifier agreement pre/post compression is the proposed metric. Emotion classifiers are unreliable. Human inter-annotator agreement on emotion is already poor. Using a noisy oracle as ground truth means the conservation metric has a noise floor that cannot be escaped.

**What the proprietary layer may resolve:**
If non-text conservation metrics have been developed and measured internally, this dissolves. If they have not, the reviewer is correct.

**Current state:**
The CCH experiments cover text commitment only. Prosodic and paralinguistic conservation metrics are mapped as product concepts but not yet experimentally validated. The reviewer identified a real gap.

**The reviewer's inversion is correct:**
Measure *behavioral* preservation rather than *representational* preservation. Do downstream agents act the same given K_pros vs. raw prosodic signal? This shifts conservation from "did the representation survive" to "did the decisions it drives survive." That is closer to what the system actually cares about and avoids the noisy oracle problem.

**The fix:**
The non-text conservation track is a second paper, not a current claim. Remove any implication that per-channel conservation is solved. State it as the research direction for the second paper family alongside: Semantic Entropy Rate, Semantic Compression-Fidelity Theorem, Governance Density Optimization.

**Why it matters:**
If non-text conservation is presented as solved when it isn't, the first reviewer who tests it breaks the credibility of the entire claims stack. Better to scope the current claim precisely and let the second paper family extend it.

---

## 5. Bias Inheritance — Phase 1 → Phase 2 Training

**What the reviewer caught:**
Training the learned model against rule-based K trains the model to replicate the extractor's biases. Rule-based K is imperfect by construction. The build doc hints at "validation outcomes as reward signal" but does not connect it to bias inheritance. The fix is: train against K conditioned on positive validation outcomes, with validation failures as negative signal. That is RLHF-style, not imitation learning, and the distinction matters for what the learned model becomes.

**What the proprietary layer resolves:**
Nothing. This is structural. Even a high-quality rule-based extractor has systematic biases — the CCH experiments document exactly what they are (obligation escalation, Step A boundary failures, NP-negation blindness). Training against those outputs trains those failure modes in.

**The correct formulation:**
```
Training target = K | validation(K) = PASS
Negative signal = K | validation(K) = FAIL
```

This is closer to outcome-supervised RLHF than behavioral cloning. The CCH validation framework already produces the signal needed — every EXP run generates labeled pass/fail pairs against the canonical commitment kernel. The training infrastructure exists in the experimental record. It needs to be connected to the Phase 2 spec explicitly.

**The additional constraint:**
The learned model should be trained on *diverse* K sources — not just the CCH canonical corpus. The 20-signal canonical corpus represents one researcher's signal taxonomy. Production call logs represent actual caller behavior. The bias inherited from a homogeneous training corpus is a second-order problem worth naming.

**Why it matters:**
Phase 1 (rule-based) is the infrastructure moat. Phase 2 (learned) is the product moat. If Phase 2 inherits Phase 1's biases uncorrected, the learned model is a worse version of the rule-based extractor with more compute cost. The validation-conditioned training formulation is what makes Phase 2 better than Phase 1, not just faster.

---

## 6. The Steelman — Answer Written Now

**What the reviewer caught:**
"Can you get the same guarantees through shared context, better prompting, structured outputs, discipline?" The build doc defers this to empirical question. The conceptual answer is already available.

**The answer:**

You can get *some* of it with discipline. You cannot get three specific things:

**A. O(1) governance primitives.**
Shared context gives you no cryptographic commitment. An agent operating in a shared context can drift from the intent without any mechanism detecting the drift until a validation pass runs. K-governance makes violation structurally impossible — agents cannot receive a different input than K. The enforcement is in the interface, not the evaluation. Shared context cannot replicate this without becoming K-governance by another name.

**B. Per-channel conservation metrics.**
You cannot measure drift on what was never formally represented. If prosodic state is not extracted into a structured object, there is no reference point against which to measure its preservation. Drift in unstructured shared context is unobservable by definition. K-governance creates the observation surface.

**C. A validated training target.**
Shared context + discipline produces outputs. It does not produce labeled commitment kernels with pass/fail validation records. The CCH experimental series produces exactly those records — 181 condition-signal runs with NLI-scored conservation at each iteration. That is the training dataset for the Phase 2 learned extractor. No equivalent exists for unstructured shared context approaches.

**The one thing discipline can get you:**
Structured output schemas (e.g., forcing agents to emit JSON) can reduce surface-level drift. This is real and worth acknowledging. The architectural difference is that structured outputs are a convention — they can be violated, ignored, or misinterpreted. K-governance is a constraint — violation is architecturally excluded. The distinction is: convention vs. enforcement.

---

## Summary — What Remains Open vs. What Is Resolved

| Issue | Status |
|---|---|
| NLI=1.00 specificity | Resolved internally — needs documentation update for public framing |
| Synthesis conflict resolution | Genuine open question — EXP-008 required |
| Streaming commitment discipline | Design decision needed — Option A recommended, others documented |
| Non-text conservation metrics | Genuine gap — scoped to second paper family, removed from current claims |
| Phase 2 bias inheritance | Structural issue — validation-conditioned training formulation is the fix |
| Steelman answer | Written above — ready for inclusion in public materials |

---

## On the Tone Agent Framing

The reviewer is correct. Every diagram, every demo, every explanation centers tone/subject/response/pace. That frames the work as "better tone handling."

The actual claim is **state authority before branching.**

The four agents are illustrative consumers of K. They could be any four agents — scheduling, billing, dispatch, compliance. The agents are not the architecture. K is the architecture. The agents demonstrate that K-governance is scheduler-agnostic.

Corrective action: demote tone/subject/response/pace to "illustrative agent consumers" in all public-facing materials. Lead with the state-commitment framing. The agents follow from the architecture — the architecture does not follow from the agents.

---

## Before Step 1 — The One Decision

Streaming commitment discipline (Issue 3) is not a Step 5 problem. It is a Step 0 problem because it determines what Step 1 measures.

**Decision required:** Which option?

- Option A: Utterance boundary commitment. State it. Build to it.
- Option B: Provisional/final with replay. Spec the replay protocol now.
- Option C: Provisional only. Own the tradeoff.

Everything downstream of Step 1 assumes one of these. The choice should be explicit before the first experiment is run against a live stack.

---

*Ello Cello LLC § MO§E§™ § 2026-04-24 § DOC 002*
