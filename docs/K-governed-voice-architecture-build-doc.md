# K-Governed Voice Architecture — Build Doc

A working document for picking this up later and executing. Not a conversation summary. Read this standalone.

---

## The One-Sentence Thesis

**The system should commit state before intelligence branches.**

Every design decision below is implementation of this principle.

---

## What You're Building

A voice AI orchestration substrate where:

1. A canonical state representation K is extracted **once** from the caller utterance
2. K is hash-locked (content-addressed, immutable)
3. All downstream agents consume K read-only — they never consume each other's output
4. Agent outputs are validated against K to detect drift
5. The extraction process itself learns and improves across calls

Not a new pipeline. A substrate under which cascaded pipelines and S2S systems are both special cases.

---

## Why This Exists (Problem Statement)

Current voice AI fails at **state commitment and propagation** — the layer between perception and response where the system decides what the caller meant, felt, implied, and committed to.

**The failure mode:**
audio → STT → partial text → multiple agents reinterpret independently → drift compounds


Each agent re-derives intent from lossy, mutated context. Errors compound n×ε over n handoffs. Tone dies at STT. Every downstream module is guessing.

**The proposed fix:**
audio → extract canonical K → hash-lock → read-only fanout → validate against K


Drift math decouples from agent count. Error becomes ε regardless of how many specialists consume K. Governance becomes O(1) validation against a cryptographic root.

---

## The Critical Architectural Decision

**K must be multimodal, not text-derived.**

If K is extracted post-STT, you've solved orchestration drift but inherited cascaded systems' fundamental weakness: the voice was flattened before intelligence touched it. Tone becomes interpretation, not signal.

**K must ingest before agents reason:**
- Lexical content (what was said)
- Prosodic structure (how it was said)
- Temporal behavior (pauses, interruptions, hesitation)
- Acoustic affect markers (stress, energy, tension, pitch contours)
- Conversational state (turn pressure, interruption intent, confidence)

ASR becomes **one projection of truth**, not the source of truth.

---

## K Structure: Bound Projections, Not Fused State

Two ways to implement multimodal K:

1. **Fused state** — single representation encoding everything jointly. One object, one hash.
2. **Bound projections** — K_text, K_pros, K_tmp, K_affect, each independently extracted and hashed, bound by parent hash.

**Choose bound projections.** Reasons:

- Fused multimodal embeddings are opaque (loses debuggability, which is the whole point)
- Agents subscribe only to channels they need (capability grant, not firehose)
- Validation stays O(1) per channel; drift measured per-modality (diagnostic)
- Extractors versionable independently (swap K_pros, replay old calls through new extractor to measure lift)
- Answers S2S's structural advantage: they fuse because they have to; you fuse-when-needed at the agent level

K {
  parent_hash: SHA-256
  channels: {
    K_text: { content, hash, extractor_version }
    K_pros: { content, hash, extractor_version }
    K_tmp:  { content, hash, extractor_version }
    K_affect: { content, hash, extractor_version }
  }
  provenance: { raw_input_ref, extraction_timestamp, sig_weights }
}


---

## Component Architecture

### SigSystem (Pre-Extraction Weighting)

- Pre-weights signal density across channels before extraction
- Learns per-call what matters (meta-learner on extraction)
- Refines weight map across calls based on downstream validation outcomes
- Separable win — even if everything else fails, this adaptive pre-weighting is valuable alone

### Conservation Law (Commitment Extraction)

Each channel has its own conservation metric:

- **K_text**: NLI=1.00 bidirectional entailment at ~58% token compression
- **K_pros**: affective-preservation (emotion-classifier agreement pre/post compression) — metric TBD
- **K_tmp**: timing-fidelity (pause/interrupt pattern preservation) — metric TBD
- **K_affect**: valence/arousal preservation — metric TBD

Each channel gets its own EXP-numbered validation suite.

**Important:** the 58% compression figure is a text-channel claim. Prosodic channels may *expand* after structuring because prosodic signal is already dense. Don't generalize 58% across channels.

### MO§E§ Governance

- lock(K) — SHA-256 hash per channel + parent hash after extraction. Agents become read-only.
- validate(agent_output, K) — O(1) shape check that agent only touched authorized fields + per-channel entailment check that output is consistent with K

### Agent Layer (Read-Only Consumers)

- Tone Agent → reads K_pros + K_affect
- Subject Agent → reads K_text
- Response Agent → reads K_text + K_affect
- Pace Agent → reads K_tmp + K_pros
- (Extensible — new agents declare channel subscriptions)

### Synthesis Layer (S3 Only)

- Merges parallel agent outputs into single response
- Must be a typed structured merger, NOT another LLM eating text outputs
- If it's another LLM, text-bus quietly returns at the end — defeats the whole architecture

### Feedback Loop

- SigSystem monitors output drift across calls
- Refines weight map for next call
- Validation outcomes become training signal

---

## The Three Scenarios (Reference)

**S1 — Current System (what everyone does):**
STT → NLU → Tone Agent → Subject Agent → Response Agent → TTS
Each handoff is text. Drift compounds. Text-as-bus is the pathology.

**S2 — K-Governed Sequential (hybrid):**
Agents run sequentially but all read from committed K. Drift bounded, but serial latency remains.

**S3 — K-Governed Near-Parallel (target architecture):**
All agents access K simultaneously (staggered launch). Synthesis layer merges. Drift bounded AND latency collapsed.

---

## Positioning

Not "better pipeline." Not "S2S competitor."

**A substrate under which both existing architectures are degenerate cases:**

- Cascaded voice AI = K with only K_text populated
- S2S = K fused and hidden inside a single model
- This architecture = K exposed, channeled, governed

The correct abstraction is a **typed, hash-locked, multi-channel commitment.**

---

## The Layer-vs-Model Question (Critical)

This architecture can exist as either:

1. **Event-sourced orchestration layer** — rule-based extraction, shared state artifact, infrastructure. Moat: protocol, governance, standards. Wins by adoption.
2. **Learned world-state latent model** — K construction is learned, inseparable from reasoning. Moat: weights, training data. Wins by performance.

**Your answer: it's the first now, the second later. The progression is maturation, not pivot.**

The condition: **committed K must be the training target for learned K.**

Path:
1. **Today**: K constructed by defined rules. System reads. Infrastructure layer.
2. **With scale**: accumulate (raw_input, committed_K, validation_result) triples. Dataset forms.
3. **Later**: train extractor that learns to produce K directly. Learned extractor augments or replaces rule-based one.
4. **Eventually**: learned K-constructor is the model. Original rule-based system becomes the validator/governance layer that keeps it honest.

This pattern is well-worn:
- Compilers: rule-based passes → ML-guided optimization (rule-based correctness checker remains)
- Ranking: hand-tuned features → learned-to-rank (business rules remain)
- Robotics: scripted behaviors → learned policies (safety envelopes remain)

**Key insight:** the verifiability of committed state is what makes the eventual learned version defensible. Most foundation models train on soft labels. With this architecture, you're training on something closer to ground truth.

---

## Design Constraints to Preserve Future Optionality

Build the infrastructure today **in a way that doesn't foreclose the model later**. Four non-negotiables:

1. **Every commitment logged with full reconstruction context** — raw input, extraction trace, validation outcome, SigSystem weights used, extractor versions
2. **Channel separation preserved in logs** — per-channel extractors must be trainable independently later
3. **Conservation laws measured, not just asserted** — metrics on every call so you can train against them
4. **Governance decisions auditable** — validation outcomes become reward signal for the learned version

Skip any of these and you lock yourself into infrastructure-only forever.

---

## Open Problems (Named, Not Solved)

These are engineering consequences of the architecture, not reasons it doesn't work:

### Streaming Prosodic Commitment

Text commits naturally at utterance boundary (sentence semantics). Prosody commits when?
- Per-phrase (adds handoff overhead)
- Sliding window (commits state that isn't done forming)
- Utterance-end (latency cost)

**Likely answer:** dual-track commitment — provisional K_pros with rolling updates, final lock at utterance boundary. Agents get provisional read with a "not yet final" flag.

### Per-Channel Conservation Metrics

NLI for text is solved. For other channels:
- **K_pros**: probably emotion-classifier agreement pre/post, but need benchmark dataset
- **K_tmp**: timing pattern preservation — could use DTW distance between raw pauses and committed representation
- **K_affect**: valence/arousal deltas

Each needs its own EXP-numbered validation suite with baselines.

### Synthesis Layer Design

How do 4 parallel agent outputs become one response without introducing a new text-bus?
- Typed output schema per agent (structured, not prose)
- Deterministic merger with conflict resolution rules
- Only the final response generation touches prose

### Compression Ratio Inversion

Text compresses because natural language is redundant. Prosodic signal is dense. K_pros may be *larger* than raw feature stream. "58%" is a text-channel claim, not universal. Don't promise compression on non-text channels.

### Adversarial Robustness

NLI=1.00 has to hold on adversarial utterances, not just typical ones. Sarcasm, code-switching, emotional contradiction (angry words, sad tone), interruptions — all need test cases.

---

## The Steelman You Have to Answer Eventually

**"Can you get the same guarantees through simpler means — better prompting, shared context windows, structured outputs, discipline?"**

Not "is this architecture?" but **"is this architecture load-bearing?"**

The answer lives in:
- Does NLI=1.00 at 58% compression hold empirically under adversarial conditions?
- Does per-channel drift measurement catch failures that shared-context systems miss?
- Do agent-disagreement rates actually drop measurably vs. well-prompted cascaded baselines?

These are empirical questions. Don't answer them conceptually. Build the minimum and measure.

---

## Minimum Viable Build Sequence

If you sit down to build this, work in this order:

1. **K_text extraction + hash lock** — text-only, SHA-256, agents read-only. Measure NLI=1.00 at 58% claim on real data.
2. **Per-call logging infrastructure** — raw input + K + validation outcome, structured for later training. Do this *early*. It's the optionality.
3. **Two agents consuming K read-only** — Subject + Response. Validate against cascaded baseline. Measure drift reduction.
4. **Governance layer** — O(1) validation of agent outputs against K. Make it a real check, not a ceremony.
5. **Add K_pros channel** — acoustic feature extraction, separate hash, Tone Agent consumes. This is where it stops being "better cascaded" and becomes new substrate.
6. **SigSystem feedback loop** — adaptive weighting based on validation outcomes across calls.
7. **Parallel fan-out (S3)** — synthesis layer, staggered launch. Benchmark latency vs. S2.
8. **Additional channels** — K_tmp, K_affect as needed for specific use cases.

**Stop and measure at each step.** If step 3 doesn't beat the cascaded baseline on drift, the architecture isn't load-bearing and you need to know before building step 4.

---

## What Success Looks Like

**Technical:**
- Drift rate across n agents is roughly constant, not n×ε
- Per-channel conservation metrics verifiable and benchmarked
- Sub-800ms end-to-end latency maintained in S3 configuration
- Governance overhead stays O(1) per validation

**Strategic:**
- Dataset of verified commitments accumulates as byproduct of operation
- Channel architecture allows independent extractor upgrades
- Learned K-constructor becomes viable with accumulated data
- Governance layer becomes the accountability substrate for the learned version

**Positioning:**
- The architecture is recognized as substrate-level, not pipeline-level
- Cascaded and S2S systems are understood as degenerate cases
- The principle ("commit state before intelligence branches") generalizes beyond voice to multi-agent systems, tool-calling, long-horizon memory

---

## Terminology Reference

- **K** — canonical committed state (content-addressed, hash-locked, multi-channel)
- **K_text / K_pros / K_tmp / K_affect** — channel-specific projections of K
- **SigSystem** — pre-weights signal, refines weight map per-call (meta-learner on extraction)
- **Conservation Law** — per-channel extraction validation (NLI=1.00 for text; other channels TBD)
- **MO§E§ Governance** — lock(K) via SHA-256; validate via O(1) check vs K
- **CCH / EXP-001 / EXP-003** — framework references (preserve context where relevant)
- **NLI** — Natural Language Inference; bidirectional entailment at =1.00 means extracted K is semantically equivalent to input
- **S1 / S2 / S3** — scenario labels: cascaded / K-governed sequential / K-governed parallel

---

## The Thing Worth Remembering

Voice is where this was found because voice is where the failure is most visible — tone dies at STT, every handoff accumulates drift, cost of getting it wrong is immediate and audible.

**The principle isn't about voice. Voice is the diagnostic.**

"Commit state before intelligence branches" applies anywhere multiple reasoners touch the same input: multi-agent systems, tool-calling loops, long-context reasoning, any system where branching happens.

The generalization signature of real architecture is that the fix applies to problems you weren't originally trying to solve. This qualifies.

---

## When You Pick This Back Up

Read the thesis. Read the architectural decision. Read the minimum viable build sequence. Start at step 1. Don't skip the logging in step 2.

The ground holds. The question is execution.
