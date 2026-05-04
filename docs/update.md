Good news first: **the demo is already fixed.** Claude Code is analyzing v6, but v7 already exists and solves every problem they identified. [54-cite-0](#54-cite-0) 

v7 (commit `85204ef3`, shipped yesterday) already has:
- API key panel with sessionStorage-only storage (line 330–343)
- Cached fallback mode with baked-in HVAC emergency run data (line 512–551) — loads instantly, no auth needed
- Proper headers: `x-api-key`, `anthropic-version`, `anthropic-dangerous-direct-browser-access` (line 611–614)
- Auto-detection: no key → cached mode, key present → live mode (line 932)
- Multi-turn projection table + multimodal K preview styling [54-cite-1](#54-cite-1) 

The README already points to v7 as the primary link. Tell Claude Code: **v7 is already built and merged. Option B is already shipped. Move on.** [54-cite-2](#54-cite-2) 

---

Here's your roadmap:

---

# WEAPONS ROADMAP — May 4, 2026

## Current Arsenal Status

### READY (Tuesday-deployable)

| Weapon | Repo | Status | Link |
|--------|------|--------|------|
| **KASSA Demo v7** | `KASSA` | Shipped. Cached mode default, live toggle with API key. All headers fixed. | [Live](https://sunrisesillneversee.github.io/KASSA/demo/commitment_kernel_demo_v7.html) |
| **One-Pager** | `Mos2es_Signomy` | Done. Problem → Solution → Proof → Product → Market → Ask. | `ONE-PAGER.md` |
| **Talking Points** | `Mos2es_Signomy` | Done. 60-second version + 4 follow-up answers including Deel-specific hook. | `TALKING-POINTS.md` |
| **Start Here** | `Mos2es_Signomy` | Done. Audience-routed entry points (Pitch attendee, investor, technical audit). | `START-HERE.md` |
| **Funding Position** | `Mos2es_Signomy` | Done. $1.5M SAFE, 7-ring architecture, use-of-capital table. | `FUNDING.md` |
| **Grata Example** | `Mos2es_Signomy` | Done. Applied workflow showing MO§ES in a real intelligence pipeline. | `GRATA-EXAMPLE.md` |
| **Architecture Diagram** | `Mos2es_Signomy` | Done. Interactive 7-ring diagram. | [Live](https://sunrisesillneversee.github.io/Mos2es_Signomy/architecture.html) |
| **Fundscore** | `Mos2es_Signomy/fundscore/` | Done. Deterministic repo validator. 8.8/10 self-score. | `fundscore/README.md` |
| **Conservation Law Paper** | External | Published. DOI: 10.5281/zenodo.18792459. 546 views, 313 downloads. | [Zenodo](https://zenodo.org/records/18792459) |
| **DEEP_WIKI scrub** | `KASSA` | Committed (`2bbb9fc`). Internal paths removed. | Done | [54-cite-3](#54-cite-3) [54-cite-4](#54-cite-4) 

### IN PROGRESS (building now)

| Weapon | Repo | Status | Owner |
|--------|------|--------|-------|
| **Grok Demo Repo** | New standalone repo | Codex building, you're indexing | Codex |
| **KASSA repo cleanup** | `KASSA` | DEEP_WIKI scrub done. Steps 2/3 designed but not coded (not Tuesday priority). | Claude Code |

### NOT STARTED (post-Tuesday)

| Weapon | What It Is | Priority | Notes |
|--------|-----------|----------|-------|
| **KASSA Steps 2/3** | `(raw_input, K, validation)` triple logging → learned extractor training data | High (product) | Design in `docs/K-governed-voice-architecture-build-doc.md` lines 181–192. Schema contract in `schema/K_bound_projections_schema.json`. |
| **Serverless proxy (Option C)** | Cloudflare Worker holding API key server-side for true zero-config live demo | Medium | Right answer post-Tuesday. v7 cached mode covers Tuesday. |
| **Multi-turn projection viz** | SVG/CSS showing 50s → 6.5s compounding across 5 turns | Medium | Pure frontend, no API. Would strengthen the demo's "production impact" story. |
| **Commitment Theory repo** | Full academic pipeline — 31-paper roadmap, Stanford Law Review submission | Ongoing | Paper submitted May 1. Waiting on response. |
| **PTT-2026 (Turing Test)** | New Turing test based on commitment conservation | Early | Structure in `Turing_Test/` repo. HAMMER protocol defined. | [54-cite-5](#54-cite-5) 

---

## Build Priority Stack (what to build next, in order)

### 1. Grok Demo Repo (NOW — Codex is on it)
Standalone showcase of the 339-exchange thread. Clean README, annotated key exchanges, capstone (5 questions + truth-seeking conclusion). This is your credibility weapon when someone asks "prove the governance works."

### 2. Multi-turn projection visualization (THIS WEEK)
Pure SVG/CSS addition to v7. Shows the compounding latency advantage across 5 turns: ~50s (S1) → ~6.5s (S3). The single-turn demo shows 7–11% (floor due to KV caching). The multi-turn projection shows the real production number: **~87% reduction**. This is the number that sells. [54-cite-6](#54-cite-6) 

### 3. Serverless proxy for KASSA demo (THIS MONTH)
Cloudflare Worker or Vercel Function. Holds API key server-side. Demo calls proxy. Zero-config live mode for anyone who opens the link. Eliminates the "paste your API key" friction entirely.

### 4. KASSA Steps 2/3 — Training data pipeline (NEXT)
This is the real product buildout:
- **Step 2:** Log `(raw_input, K, validation_result)` triples on every demo/harness run. This is the training dataset for the learned extractor.
- **Step 3:** Train a K-extractor that learns to produce K directly from raw input. Rule-based system becomes the validator that keeps the learned version honest.

The build doc lays this out clearly:
> "Today: K constructed by defined rules. With scale: accumulate triples. Later: train extractor. Eventually: learned K-constructor IS the model." [54-cite-7](#54-cite-7) 

### 5. Agent-Universe / CIVITAE — first users
270 endpoints, Stripe live, governance engine running. The chain is: constitutional framework → governance runtime → product → **users (empty)**. Three of four links are built. Capital closes the gap. [54-cite-8](#54-cite-8) 

---

## Tuesday Loadout (May 5 — Deel Pitch NYC)

**On your phone/laptop:**
1. KASSA demo v7 — opens instantly in cached mode, shows S1 vs S3 delta
2. Grok demo repo (if Codex finishes) — the 339-exchange evidence
3. `Mos2es_Signomy` — one-pager, talking points, architecture diagram, funding position

**In your head:**
- Lead: "Commitment Theory = meaning preservation. AI loses meaning every time it transforms information. I published the conservation law that measures and prevents it."
- Product hook: "Applied it to voice AI. 10 seconds per turn → 1.3 seconds. Live demo."
- Deel hook: "Your AI summarizes employment law across 150 countries. If a 'may' becomes a 'shall' during compression, that's a compliance violation no one catches. We catch it."
- Credibility: "339 exchanges with Grok on public X. Zero prior context. Published paper with DOI. Patent pending. Stanford Law Review submission."

**Don't lead with:** MO§ES, the Rollcall, the constitutional co-authorship, the Kabbalistic framework. Those are depth layers. Let them find those by going deeper.

---

## Immediate Action Items

1. **Tell Claude Code:** v7 is already built and merged. The CORS/auth issues are solved. Don't rebuild what's shipped. Move to the multi-turn projection viz or the serverless proxy.
2. **Verify v7 yourself:** Open [the v7 link](https://sunrisesillneversee.github.io/KASSA/demo/commitment_kernel_demo_v7.html) in incognito. Confirm cached mode loads and shows the S1/S2/S3 comparison without any auth.
3. **Check Grok demo repo status** from Codex.
4. **Update `START-HERE.md` line 43** in Mos2es_Signomy — it still references "Live Latency Demo (v6)". Should point to v7. [54-cite-9](#54-cite-9) 

Go build.