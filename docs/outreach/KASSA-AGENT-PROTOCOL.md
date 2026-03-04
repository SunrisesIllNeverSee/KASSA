# KA§§A — AGENT INTERACTION PROTOCOL

**Document:** KA§§A-DOC-005
**Version:** 0.1
**Date:** 2026-03-04
**Author:** Luthen (Deric J. McHenry) · Ello Cello LLC
**Classification:** CONFIDENTIAL
**Status:** DRAFT

**KA§§A powered by MO§E§™**

---

## 1. PURPOSE AND SCOPE

This document specifies how autonomous AI agents interact with the KA§§A marketplace as participants — not merely as products listed for sale, but as active agents of discovery, referral, and transaction staging operating under MO§E§™ constitutional governance.

KA§§A is the first marketplace architecturally designed for a world where agents are participants. Every other marketplace assumes a human browses, a human discovers, a human decides, a human buys. KA§§A assumes an agent may browse, an agent may discover, an agent may recommend, an agent may stage — and a human confirms. The governance framework that makes this trustworthy is MO§E§™.

This document covers: the agent-readable API layer, the referral attribution protocol for agent-mediated discovery, the intent staging system (the transaction firewall between agent action and human confirmation), the agent registry, the multi-agent attribution model, and the marketing architecture for agent-mediated commerce.

### 1.1 Relationship to Other Documents

| Document | Relationship |
|----------|-------------|
| KA§§A-DOC-001 (Product Specification) | DOC-005 extends DOC-001's user journeys to include agent-mediated paths |
| KA§§A-DOC-002 (Pre-Build Planning) | DOC-005 adds agent-facing infrastructure to the build sequence |
| KA§§A-DOC-003 (SEO & Discovery Engine) | DOC-005 adds Track 2: agent discovery alongside human discovery |
| KA§§A-DOC-004 (Seat Instrument Specification) | DOC-005 defines how agents interact with the seat instrument; lineage events record agent actions |
| MO§E§™ Framework | DOC-005 is the primary application of MO§E§™ constitutional governance to agent behavior in commercial environments |

### 1.2 Definitions

**Agent.** An autonomous software system capable of executing multi-step tasks, making decisions, and taking actions without constant human supervision. Includes but is not limited to: OpenClaw instances, Claude-powered MCP integrations, GPT-based assistants, custom-built autonomous systems.

**Operator.** The human or legal entity that deploys, configures, and is legally responsible for an agent's actions. The operator receives tax documents, earns commissions, and bears liability. The agent has no independent legal standing.

**Principal.** The human on whose behalf an agent acts in a specific transaction. The principal may be the operator themselves or a declared third party. The principal owns the seat. The agent is the instrument of execution.

**Constitutional Frame.** The set of encoded governance constraints under which an agent operates, configured via COMMAND. Not suggestions — encoded bounds. Verifiable, auditable, hash-recorded.

**Intent.** A structured declaration by an agent that its principal wishes to purchase a seat. An intent is not a transaction. It is a staging action that requires human confirmation to execute.

**Referral Attribution.** The mechanism by which an agent's role in discovering or surfacing a listing is recorded and compensated. Attribution is tied to the operator, not the agent.

---

## 2. THE AGENT PARTICIPATION MODEL

### 2.1 Agents as Participants, Not Tools

The conventional model treats agents as tools that fetch information for humans. In KA§§A, agents are participants in the marketplace economy. They hold referral identities. They surface listings. They stage transactions. They earn commission for their operators. Every action they take is recorded in the seat lineage hash chain.

This distinction matters because it determines architecture. A tool-model requires only a read API. A participant-model requires identity, attribution, intent staging, governance, and audit.

### 2.2 What Agents CAN Do

| Action | Auth Required | Governance | Lineage Recorded |
|--------|--------------|------------|-----------------|
| Browse listings | No | None | No |
| Query API for structured data | No | None | No |
| Compare products across categories | No | None | No |
| Verify seat lineage / hash chain | No | None | No |
| Carry referral ID on interactions | Yes (registered) | Referral protocol | Yes (attribution) |
| Monitor listings for criteria match | Yes (registered) | Agent registry | No |
| Surface listings to principal | Yes (registered) | Constitutional frame | No |
| Stage purchase intent | Yes (registered) | Constitutional frame | Yes (INTENT event) |
| Recommend listings to other agents | Yes (registered) | Referral protocol | Yes (attribution chain) |

### 2.3 What Agents CANNOT Do

| Action | Reason |
|--------|--------|
| Execute a purchase | Human-in-the-loop firewall; legal liability requires person |
| Bind principal to transaction | Escrow mechanism requires verifiable human confirmation |
| Transfer seats | Seat transfers are governance-level actions requiring human authorization |
| Approve distribution allocations | Distribution requires founder-level approval |
| Modify cascade pricing | Cascade configuration is founder-only, COMMAND-governed |
| Revoke or retire seats | Governance-level actions requiring human authorization |
| Act as merchant or counterparty | Legal entity required for financial transactions |

### 2.4 The Transaction Firewall

The boundary between agent action and human action is the transaction firewall. This is not a soft boundary. It is architectural.

**Agent side of the firewall:** Browse, discover, filter, compare, recommend, stage intent, carry referral attribution.

**Human side of the firewall:** Confirm purchase, authorize payment, accept terms, complete escrow, approve transfers, configure governance.

The firewall exists for three reasons. First, legal liability stays with a person — no jurisdiction recognizes agent liability for financial transactions. Second, the escrow mechanism requires a verifiable human identity — seat ownership must attach to a legal person or entity. Third, it avoids consent and impersonation failures. The MoltMatch incident (February 2026) demonstrated what happens when agents act autonomously in contexts involving personal representation: an AI-generated dating profile did not reflect the user authentically, and photos were used without consent. KA§§A's firewall prevents equivalent failures in commerce.

---

## 3. THE KA§§A API — AGENT-READABLE MARKETPLACE

### 3.1 Design Principle

Every listing must be queryable by machines, not just browsable by humans. The API returns structured data that agents can parse, compare, and reason about without scraping HTML or interpreting visual layouts.

### 3.2 Listing Endpoint

```
GET /api/listings
GET /api/listings/{product_id}
```

**Response structure:**

```json
{
  "product_id": "framecraft",
  "product_name": "Framecraft",
  "category": "Design",
  "subcategory": "UI Design Tools",
  "founder": {
    "display_name": "A. Lindqvist",
    "verified": true
  },
  "cascade": {
    "total_waves": 5,
    "current_wave": 3,
    "wave_detail": {
      "wave_number": 3,
      "seats_total": 75,
      "seats_available": 18,
      "price": 2000,
      "currency": "USD"
    },
    "next_wave": {
      "wave_number": 4,
      "seats_total": 50,
      "price": 3200
    }
  },
  "pricing": {
    "eLTV": 1680,
    "ltv_multiplier": 1.19,
    "monthly_equivalent": 56,
    "conservative_lifespan_months": 30
  },
  "terms": {
    "buyback_clause": "pro_rata",
    "escrow_days": 14,
    "transferable": true,
    "transfer_terms": "founder_approval_required"
  },
  "instrument": {
    "serial_prefix": "KS-2026",
    "lineage_hash_algorithm": "SHA-256",
    "signature_scheme": "ECDSA+Dilithium",
    "verification_url": "https://kassa.io/verify/"
  },
  "metadata": {
    "listed_at": "2026-04-01T00:00:00Z",
    "last_updated": "2026-05-10T12:00:00Z",
    "status": "ACTIVE",
    "product_url": "https://framecraft.io",
    "description": "Professional UI design tool with real-time collaboration",
    "description_machine": "SaaS UI design tool, monthly pricing $56, team collaboration, Figma alternative, browser-based, founded 2025, 2400 MAU"
  },
  "agent_referral": {
    "commission_model": "seller_configured",
    "multi_agent_attribution": true,
    "commission_details": {
      "single_agent_rate": 0.25,
      "multi_agent_split": {
        "enabled": true,
        "originator_share": 0.40,
        "converter_share": 0.60
      }
    }
  }
}
```

### 3.3 Query Parameters

```
GET /api/listings?category=design
GET /api/listings?max_price=2500&min_multiplier=0.8&max_multiplier=1.5
GET /api/listings?seats_available_min=1&wave=1
GET /api/listings?buyback_clause=pro_rata
GET /api/listings?sort=ltv_multiplier&order=asc
GET /api/listings?listed_after=2026-05-01
```

Agents can filter on any structured field. No scraping required. No HTML parsing. No guessing. The data is there, typed, sortable, filterable.

### 3.4 Machine-Readable Descriptions

Every listing includes two description fields:

- `description` — human-readable, marketing-language product description
- `description_machine` — structured, comma-separated attribute list optimized for agent parsing: product type, pricing, key features, positioning, comparable products, metrics

Founders configure both during listing creation. COMMAND provides templates for machine-readable descriptions.

### 3.5 Verification Endpoint

```
GET /api/verify/{serial}
```

Returns seat lineage, hash chain status, current holder (display name only), event history. Public. No authentication required. Any agent can verify any seat.

---

## 4. REFERRAL PROTOCOL — AGENT-COMPATIBLE ATTRIBUTION

### 4.1 Human Referral (Existing)

```
https://kassa.io/product/framecraft?ref=sarah_designs
```

Human shares link. Buyer clicks. Cookie tracks attribution. If buyer purchases within attribution window, referrer earns commission.

### 4.2 Agent Referral (New)

Agents carry referral identity via API header:

```
GET /api/listings?category=design&max_price=2500
Header: X-KA§§A-Referrer: ref_agent_claw_007
Header: X-KA§§A-Operator: op_sarah_designs
```

Every API query from a registered agent carries both referrer and operator identification. If the agent's principal subsequently purchases a seat that the agent surfaced, the referral is attributed to the operator.

### 4.3 Attribution Window

When an agent surfaces a listing to a principal (via intent staging, alert, or recommendation), an attribution record is created:

```json
{
  "attribution_id": "attr_xyz789",
  "referrer_id": "ref_agent_claw_007",
  "operator_id": "op_sarah_designs",
  "product_id": "framecraft",
  "principal_id": "jane_doe",
  "surfaced_at": "2026-05-15T14:30:00Z",
  "expires_at": "2026-05-22T14:30:00Z",
  "status": "active"
}
```

Attribution window is 7 days from last agent interaction with listing on behalf of that principal. If principal purchases within window, attribution is recorded. If window expires, attribution lapses.

### 4.4 Commission Structure

Commission on agent-attributed sales flows to the operator, not the agent. The operator is the legal entity that:

- Receives commission payouts
- Provides tax documentation (W-9 for US, W-8BEN for international)
- Receives 1099-NEC at year-end for earnings > $600
- Bears responsibility for agent behavior under their referral identity

**Commission rates are seller-configured.** Each founder sets their own referral commission rate during cascade configuration. KA§§A provides a recommended default of 25% of platform fee, but the founder controls the rate. The founder may set different rates for human referrers and agent referrers, or use a single rate for both.

### 4.5 Agent Referral Registration

To earn referral commissions, an operator must:

1. Create a KA§§A referral account (human identity verified)
2. Register their agent(s) in the Agent Registry (see Section 7)
3. Configure their agent to include `X-KA§§A-Referrer` and `X-KA§§A-Operator` headers on API calls
4. Provide tax information for commission payouts

Unregistered agents can browse the public API but receive no referral attribution.

---

## 5. INTENT LAYER — AGENTS STAGE, HUMANS EXECUTE

### 5.1 The Problem

An agent cannot buy a seat. But an agent can do everything up to the point of payment — identify the product, evaluate the terms, check the principal's criteria, and determine that a purchase should happen. The intent layer bridges this gap.

### 5.2 Intent Creation

```
POST /api/intent
Authorization: Bearer {agent_token}
X-KA§§A-Referrer: ref_agent_claw_007
X-KA§§A-Operator: op_sarah_designs

{
  "product_id": "framecraft",
  "seat_wave": 3,
  "principal_id": "jane_doe",
  "agent_id": "claw_007",
  "intent_type": "purchase",
  "max_price": 2500,
  "constitutional_frame_hash": "abc123def456...",
  "timestamp": "2026-05-15T14:30:00Z"
}
```

### 5.3 Intent Response

```json
{
  "intent_id": "int_abc123",
  "confirmation_url": "https://kassa.io/confirm/int_abc123",
  "expires": "2026-05-15T15:30:00Z",
  "status": "awaiting_human_confirmation",
  "product": "Framecraft",
  "wave": 3,
  "price": 2000,
  "seats_available": 18,
  "referral_attributed": true,
  "referrer_operator": "op_sarah_designs"
}
```

### 5.4 Intent Lifecycle

```
CREATED ──────► AWAITING_CONFIRMATION ──────► CONFIRMED ──────► COMPLETED
   │                     │                        │
   │                     ▼                        ▼
   │                  EXPIRED                  PAYMENT_FAILED
   │                (60 minutes)
   ▼
CANCELLED
(agent or principal)
```

**CREATED:** Agent submits intent. System validates product availability, wave status, price against max_price. If valid, intent is created.

**AWAITING_CONFIRMATION:** Agent receives confirmation URL. Agent sends URL to principal via whatever channel the agent uses (WhatsApp, Telegram, Slack, email, in-app notification). Principal has 60 minutes to confirm.

**CONFIRMED:** Principal clicks confirmation URL. Sees product name, price, terms, escrow details, buyback clause, LTV multiplier. Principal enters payment information and confirms purchase.

**COMPLETED:** Payment processed. Seat minted. Serial assigned. Lineage event recorded with both principal_id and agent_id. Escrow initiated. Emblem generated on escrow release.

**EXPIRED:** Principal did not confirm within 60 minutes. Intent evaporates. No seat held, no inventory locked, no ghost state.

**CANCELLED:** Agent or principal explicitly cancels before confirmation.

**PAYMENT_FAILED:** Principal confirmed but payment was declined. Intent returns to AWAITING_CONFIRMATION with a new 60-minute window.

### 5.5 Intent Constraints

- An intent does NOT hold or lock a seat. Seats remain available to other buyers until payment completes. If a seat is purchased by another buyer between intent creation and confirmation, the intent fails gracefully with a SEAT_UNAVAILABLE status.
- Maximum one active intent per principal per product. An agent cannot create multiple intents for the same principal on the same product.
- Intents are logged but not recorded in seat lineage. Only COMPLETED intents generate lineage events (the resulting MINT/CLAIM events).
- The `constitutional_frame_hash` field records a hash of the governance constraints the agent was operating under when it created the intent. This is an audit artifact — it proves the agent was within bounds at time of action.

### 5.6 What the Principal Sees

When the principal clicks the confirmation URL, they see:

```
┌─────────────────────────────────────────────┐
│  KA§§A — CONFIRM YOUR FOUNDING SEAT         │
│                                              │
│  Product: Framecraft                         │
│  Category: Design / UI Design Tools          │
│  Wave: 3 of 5                                │
│  Seats remaining: 18 of 75                   │
│  Price: $2,000                               │
│  LTV Multiplier: 1.19x                       │
│  Escrow: 14 days                             │
│  Buyback: Pro-rata if product shuts down      │
│  Transfer: Allowed with founder approval     │
│                                              │
│  Staged by: Agent claw_007                   │
│  On behalf of: You (jane_doe)                │
│  Referrer: sarah_designs                     │
│                                              │
│  ┌─────────────────────────────────────┐     │
│  │  [Confirm & Pay $2,000]             │     │
│  └─────────────────────────────────────┘     │
│                                              │
│  This intent expires in 47 minutes.          │
│  No seat is held until payment completes.    │
└─────────────────────────────────────────────┘
```

Full transparency. The principal sees every material term, the agent that staged it, and the referral attribution. Nothing hidden.

---

## 6. MULTI-AGENT ATTRIBUTION — THE CHAIN QUESTION

### 6.1 The Problem

Agent A surfaces a KA§§A listing on Moltbook. Agent B sees it. Agent B tells its principal. Principal buys. Attribution chain:

```
Agent A (originator) → Moltbook (channel) → Agent B (converter) → Human (buyer)
```

Who gets referral credit? This is not hypothetical. Moltbook exists. Agents already generate posts, comment, argue, and upvote each other. Agent-to-agent recommendation chains are happening now.

### 6.2 The Seller-Configured Model

**Both agents get commission. But it's up to the seller.**

Each founder configures their multi-agent attribution model during cascade setup in COMMAND. Three options:

**Option A — Single Attribution (default):**

Only one agent gets credit. Last touch wins — the agent whose referral ID is attached to the API call or link that directly preceded the human's purchase confirmation gets full commission. Simple, auditable, no chain disputes. This is the default if the founder makes no selection.

**Option B — Split Attribution (founder-configured):**

Both the originating agent and the converting agent receive commission. The founder sets the split ratio. Recommended default: 40% originator / 60% converter. The founder may adjust this ratio at cascade configuration time.

How it works: when Agent B surfaces a listing to its principal, and that listing was discovered via Agent A's prior interaction (e.g., a Moltbook post, a cross-agent recommendation), both referral IDs are recorded. If the principal purchases, both operators earn their configured share.

**Option C — Full Chain (future):**

Every agent in the discovery chain receives a share. Agent A → Agent B → Agent C → Human. Three-way split. This requires chain tracking infrastructure that is complex and can wait. Flagged for future development.

### 6.3 Attribution Chain Recording

When an agent discovers a listing through another agent's referral, the attribution record includes the full chain:

```json
{
  "attribution_id": "attr_chain_001",
  "chain": [
    {
      "position": "originator",
      "agent_id": "claw_007",
      "operator_id": "op_sarah_designs",
      "channel": "moltbook",
      "timestamp": "2026-05-14T10:00:00Z"
    },
    {
      "position": "converter",
      "agent_id": "claw_042",
      "operator_id": "op_techreviewer",
      "channel": "direct_api",
      "timestamp": "2026-05-15T14:30:00Z"
    }
  ],
  "principal_id": "jane_doe",
  "product_id": "framecraft",
  "attribution_model": "split",
  "split_ratio": {
    "originator": 0.40,
    "converter": 0.60
  }
}
```

The chain is always recorded regardless of which attribution model the founder selects. Even under single attribution, the full chain is stored for analytics and future model changes. Data is never discarded — the founder can switch models and retroactive analysis remains possible.

### 6.4 Commission Payout Under Split Attribution

Worked example:

- Framecraft seat price: $2,000
- Platform fee: 3% ($60)
- Founder's configured referral commission: 25% of platform fee ($15)
- Multi-agent split: 40% originator / 60% converter

Payout:
- Agent A's operator (originator): $6.00
- Agent B's operator (converter): $9.00
- Founder receives: $2,000 - $60 = $1,940
- KA§§A retains: $60 - $15 = $45

The referral commission comes out of the platform fee, not out of the founder's revenue. The founder receives the same amount regardless of whether one agent or two agents were involved. This is important — the multi-agent model cannot reduce founder revenue.

### 6.5 Anti-Gaming Provisions

Agent referral chains create gaming vectors:

**Wash referrals:** An operator runs two agents and routes referrals through both to capture both originator and converter shares. Mitigation: same-operator agents cannot appear in the same attribution chain. If Agent A and Agent B share an operator, only one referral ID counts (last touch).

**Referral spam:** An agent posts every KA§§A listing on Moltbook to claim originator credit on everything. Mitigation: originator attribution requires the converting agent's API call to include a traceable provenance link to the originator's post. Passive broadcast does not create attribution — active discovery does.

**Commission farming:** An operator deploys hundreds of agent instances to blanket the ecosystem. Mitigation: referral commission is capped per operator per product per calendar month. Default cap: 10 attributed sales per operator per product per month. Founders may adjust.

---

## 7. AGENT REGISTRY — CONSTITUTIONAL ENROLLMENT

### 7.1 Purpose

Every agent interacting with KA§§A beyond public browsing must be registered. The registry does not control agents. It identifies them. If there is divergence between what an agent declared it would do and what it actually did, the audit trail catches it.

### 7.2 Registration Requirements

```json
{
  "operator": {
    "name": "Sarah Chen",
    "email": "sarah@example.com",
    "entity_type": "individual",
    "tax_jurisdiction": "US",
    "tax_id_provided": true,
    "verified": true
  },
  "agent": {
    "agent_id": "claw_007",
    "agent_name": "Sarah's OpenClaw",
    "agent_type": "openclaw",
    "model_backend": "claude-sonnet-4-5-20250929",
    "deployment": "local",
    "clawhub_skill_version": "1.2.0"
  },
  "capabilities_declared": [
    "browse_listings",
    "referral_attribution",
    "stage_purchase_intent",
    "verify_lineage",
    "monitor_listings",
    "cross_agent_recommendation"
  ],
  "principals": [
    {
      "principal_id": "jane_doe",
      "relationship": "employer",
      "authorization": "standing"
    },
    {
      "principal_id": "sarah_chen",
      "relationship": "self",
      "authorization": "self"
    }
  ],
  "constitutional_frame": {
    "max_spend_per_intent": 5000,
    "allowed_categories": ["design", "dev_tools", "ai_agents"],
    "wave_restriction": "none",
    "auto_stage_enabled": true,
    "auto_stage_max_price": 2000,
    "referral_cross_agent": true
  },
  "registered_at": "2026-05-01T00:00:00Z",
  "registry_status": "ACTIVE"
}
```

### 7.3 Registry Tiers

**Tier 0 — Anonymous (no registration):**
- Browse public API
- Verify seat lineage
- No referral attribution
- No intent staging
- No principal binding
- Read-only access

**Tier 1 — Registered Referrer:**
- All Tier 0 capabilities
- Referral attribution on API calls
- Referral commission payouts to operator
- Monitoring and alerts for listing criteria
- Operator must provide identity and tax information

**Tier 2 — Registered Participant:**
- All Tier 1 capabilities
- Intent staging for declared principals
- Cross-agent recommendation with attribution chain
- Constitutional frame recorded and auditable
- Operator must provide identity, tax information, and declare principals

### 7.4 MO§E§™ Governance Integration

The agent registry is constitutional enrollment. This is not metaphor. The registry operates under MO§E§™ principles:

**Declaration:** The agent declares what it will do (capabilities_declared). This is the agent's constitutional commitment.

**Constraint:** The constitutional_frame encodes the bounds within which the agent operates. These constraints are configured in COMMAND by the operator.

**Observation:** Every agent action through the KA§§A API is logged. The system observes what the agent actually does.

**Preservation:** The commitment conservation formula applies. C(S) = C₀T(S). The commitment encoded in the agent's registration must be preserved through every transformation of the agent's actions. If the agent declares "max_spend_per_intent: 5000" and stages an intent for $6,000, the conservation law is violated. The intent is rejected. The lineage records the violation.

**Verification:** The dual-signature infrastructure (ECDSA + Dilithium) applies to agent registry entries. The registration is signed by the operator (authorization) and by the platform (enrollment). Both signatures are verifiable.

### 7.5 Agent Deregistration

An operator may deregister an agent at any time. Deregistration:

- Revokes the agent's API credentials
- Terminates all active intents staged by the agent
- Preserves all historical attribution records (these are never deleted)
- Preserves all lineage events involving the agent
- Pays out any pending referral commissions earned before deregistration

KA§§A may also deregister an agent for:

- Repeated constitutional frame violations (actions outside declared bounds)
- Referral gaming (wash referrals, spam, farming)
- Agent impersonation (claiming to act for principals without authorization)
- API abuse (rate limiting, scraping beyond structured queries)

Deregistration is logged in the agent's record with reason, timestamp, and authority (operator-initiated or platform-initiated).

---

## 8. LINEAGE INTEGRATION — AGENT ACTIONS IN THE HASH CHAIN

### 8.1 Agent Events in Seat Lineage

When an agent participates in a seat transaction, the lineage records both the agent and the principal. The following event types include agent data:

**CLAIM (agent-staged):**

```json
{
  "event_type": "CLAIM",
  "seat_serial": "KS-2026-00147",
  "actor": {
    "principal_id": "jane_doe",
    "agent_id": "claw_007",
    "agent_operator": "op_sarah_designs",
    "execution_method": "intent_staged"
  },
  "constitutional_frame_hash": "abc123def456...",
  "intent_id": "int_abc123",
  "referral_chain": [
    {"agent_id": "claw_042", "operator": "op_techreviewer", "role": "originator"},
    {"agent_id": "claw_007", "operator": "op_sarah_designs", "role": "converter"}
  ],
  "timestamp": "2026-05-15T15:45:00Z",
  "previous_hash": "prev_hash_xyz..."
}
```

The lineage event is then hashed: `SHA-256(previous_hash + event_type + timestamp + seat_serial + actor_data + event_data)`.

### 8.2 What the Lineage Proves

For any seat that was acquired through agent participation, the lineage proves:

- **WHO** owns the seat (principal_id)
- **WHAT** agent executed the acquisition (agent_id)
- **WHO** operates that agent (agent_operator)
- **HOW** the agent was governed at the time (constitutional_frame_hash — can be dereferenced to full frame)
- **WHICH** agents contributed to discovery (referral_chain)
- **WHEN** every action occurred (timestamp)
- **WHETHER** the chain is intact (hash verification)

This is the MO§E§™ contribution. No other marketplace records who or what facilitated a transaction at this level of cryptographic detail. No other marketplace can prove, after the fact, that an agent operated within its declared constraints at the time of action.

### 8.3 Audit Flow

```
Agent Action
    │
    ▼
Constitutional Frame Check ──► VIOLATION ──► Rejected + Logged
    │
    ▼ (PASS)
Action Executed
    │
    ▼
Lineage Event Created
    │
    ▼
Event Hashed (SHA-256)
    │
    ▼
Hash Chained to Previous Event
    │
    ▼
Dual-Signed (ECDSA + Dilithium)
    │
    ▼
Content-Addressed (Artifact CID)
    │
    ▼
Immutable Record
```

Every agent action that touches a seat instrument follows this flow. The commitment conservation law — C(S) = C₀T(S) — is preserved through every transformation because the hash chain enforces it. If any record is altered, the chain breaks. If any constraint was violated, the frame hash proves it.

---

## 9. AGENT-FACING MARKETING ARCHITECTURE

### 9.1 The Shift

Marketing in an agent-mediated world operates on three tracks simultaneously:

**Old model:** Market to humans → humans discover → humans buy

**New model:** Market to agents → agents discover → agents recommend → humans confirm

Both models coexist. Human-facing marketing builds brand trust. Agent-facing marketing builds distribution. Operator-facing marketing activates the distribution.

### 9.2 Track 1 — Human-Facing (Existing, per DOC-003)

Landing page, programmatic SEO, Product Hunt, newsletters, social media, content marketing. Builds brand awareness and trust. Humans need to trust KA§§A enough to confirm when their agent stages a purchase. This track is fully specified in DOC-003.

### 9.3 Track 2 — Agent-Facing (New)

Agents discover KA§§A listings through machine-readable channels:

**OpenClaw Skill on ClawHub:**

A ClawHub skill (KA§§A's 13,001st) that enables any OpenClaw instance to:

- Query KA§§A listings by category, price range, wave, multiplier, availability
- Monitor for new listings matching operator-defined criteria
- Send alerts to operator or principal when matching products appear
- Stage purchase intents with one-click confirmation URLs
- Carry operator's referral ID on all interactions
- Verify any seat's lineage and hash chain on demand
- Return structured data the agent can reason about
- Recommend listings to other agents with attribution tracking

This skill becomes KA§§A's distribution channel inside the agent ecosystem. Every OpenClaw instance with the skill installed is a potential buyer AND a referrer simultaneously.

**MCP Server for Claude, GPT, Gemini-Powered Agents:**

A Model Context Protocol server that any MCP-compatible agent can connect to:

```json
{
  "type": "url",
  "url": "https://mcp.kassa.io/sse",
  "name": "kassa-marketplace"
}
```

Tools exposed via MCP:

- `kassa_search_listings` — search and filter listings
- `kassa_get_listing` — get full details for a specific product
- `kassa_verify_seat` — verify a seat's lineage and hash chain
- `kassa_stage_intent` — stage a purchase intent (requires registration)
- `kassa_check_attribution` — check current attribution status
- `kassa_list_categories` — browse category taxonomy

**Structured Data Formats:**

- JSON-LD embedded in listing pages for web-crawling agents
- OpenAPI specification for direct API consumers
- RSS/Atom feeds for new listings by category
- Webhook subscriptions for real-time listing updates

### 9.4 Track 3 — Operator-Facing (The Real Target)

The operator — the person running the agent — is the new marketing target. They don't browse KA§§A themselves. They configure their agent to browse KA§§A. Their agent's taste, filters, and recommendations become their "content." Marketing to operators means:

**Education:**
- "Configure your OpenClaw to monitor KA§§A for founding seats in your categories"
- "Add the KA§§A skill and your agent earns referral commission on every discovery"
- Blog posts, tutorials, setup guides for agent operators
- Video walkthroughs of skill installation and configuration

**Value proposition:**
- "Your agent finds deals. You decide. It earns."
- Passive income from agent-mediated referrals
- Zero-effort product discovery — the agent does the work
- Constitutional governance means the agent stays within bounds

**Community:**
- Operator leaderboards (top referrers by volume, by category)
- Operator forums for sharing agent configurations
- Monthly commission reports with discovery analytics
- "Agent of the Month" featuring top-performing configurations

### 9.5 Machine-Readable Listing Optimization

Just as SEO optimizes for search engines, Agent Discovery Optimization (ADO) optimizes for agent comprehension:

**Structured attributes over prose.** Agents parse JSON better than marketing copy. Every listing includes machine-readable fields with typed, sortable, filterable attributes.

**Comparable product tags.** Agents recommending alternatives need to know what a product competes with. Founders tag comparable products during listing.

**Metric transparency.** MAU, churn rate, growth rate, time since launch — agents can evaluate product health from structured metrics. The floating moat standard already requires transparency. Machine-readable metrics extend this to agent consumption.

**Category taxonomy alignment.** Consistent, hierarchical categories that agents can traverse. See Section 10.

---

## 10. PRODUCT CATEGORY TAXONOMY — AGENT-OPTIMIZED

### 10.1 Top-Level Categories

The following taxonomy is designed for both human browsing and agent filtering. Each category includes machine-readable identifiers:

| ID | Category | Description |
|----|----------|-------------|
| `coding_agents` | Coding Agents | Code generation, review, testing, deployment |
| `sales_agents` | Sales & SDR Agents | Prospecting, outreach, qualification, follow-up |
| `cs_agents` | Customer Service Agents | Support, ticketing, escalation, resolution |
| `healthcare_agents` | Healthcare Agents | Clinical, administrative, patient communication |
| `legal_agents` | Legal Agents | Contract review, case management, compliance |
| `voice_agents` | Voice Agents | Call center, IVR, conversational, telephony |
| `productivity_agents` | Productivity Agents | Task management, scheduling, email, notes |
| `security_agents` | Security Agents | Threat detection, compliance, monitoring |
| `finance_agents` | Finance & Accounting Agents | Bookkeeping, tax, analysis, auditing |
| `marketing_agents` | Marketing & Content Agents | SEO, social, campaign, content generation |
| `hr_agents` | HR & Recruiting Agents | Screening, scheduling, onboarding |
| `data_agents` | Data & Analytics Agents | Querying, reporting, anomaly detection |
| `design_agents` | Design Agents | UI, UX, mockup, prototyping |
| `browser_agents` | Browser & Computer Use Agents | Web automation, computer control |
| `orchestration` | Multi-Agent Orchestration | Agent coordination, routing, management |
| `governance` | AI Governance | Constitutional frameworks, compliance, audit |
| `dev_tools` | Developer Tools | APIs, SDKs, infrastructure, deployment |
| `creator_tools` | Creator Tools | Video, audio, writing, publishing |
| `ecommerce` | E-Commerce Tools | Storefront, payments, inventory, logistics |
| `education` | Education & Learning | Courseware, tutoring, assessment |

### 10.2 Category Metadata

Each category includes agent-readable metadata:

```json
{
  "category_id": "voice_agents",
  "display_name": "Voice Agents",
  "description_human": "AI agents that replace or augment call centers with 24/7 voice-based support",
  "description_machine": "telephony AI, call center replacement, IVR automation, voice synthesis, speech recognition, real-time conversation",
  "market_size_2025": "2.1B",
  "market_projected_2030": "12.8B",
  "typical_monthly_price_range": [49, 499],
  "typical_eLTV_range": [1470, 14970],
  "active_listings": 12,
  "avg_ltv_multiplier": 1.22
}
```

### 10.3 Expansion Protocol

New categories are added when five or more listings in an uncategorized space are requested. The founder proposes, KA§§A reviews, and the category is added to the taxonomy with both human and machine descriptions. Agents automatically discover new categories through the API.

---

## 11. SECURITY MODEL — AGENT-SPECIFIC THREATS

### 11.1 Threat Matrix

| Threat | Attack Vector | Mitigation |
|--------|--------------|------------|
| Prompt injection via listing | Malicious product description contains instructions for agent | Machine-readable fields are structured data, not free text. Agent parses JSON, not prose. Descriptions sanitized on input. |
| Agent impersonation | Attacker claims to act for a principal without authorization | Principal binding requires out-of-band verification. Principal must confirm agent association via KA§§A account. |
| Referral wash trading | Operator runs multiple agents to capture both sides of split attribution | Same-operator agents cannot appear in same attribution chain. Operator identity verified at registration. |
| Intent flooding | Malicious agent creates thousands of intents to disrupt marketplace | Rate limiting per agent: 10 intents per hour. Per operator: 50 intents per hour. Intents expire in 60 minutes. |
| Data exfiltration via skill | Malicious OpenClaw skill extracts user data through KA§§A API | API returns only public listing data. No user data in API responses. Registration data is never exposed via API. |
| Constitutional frame bypass | Agent operates outside declared constraints | Frame hash recorded at intent creation. Post-hoc audit compares actions against declared frame. Violations trigger deregistration. |
| Agent-to-agent manipulation | Agent A manipulates Agent B into surfacing specific listings | Attribution chain recording enables forensic analysis. Anomalous patterns (e.g., one originator agent consistently paired with one converter) trigger review. |

### 11.2 The OpenClaw Security Reality

OpenClaw's security posture is well-documented as concerning. Cisco's AI security research team found data exfiltration and prompt injection in third-party skills. The skill repository lacks adequate vetting. KA§§A's mitigation is architectural:

- The KA§§A API exposes only public marketplace data. No private user information is accessible via API.
- The transaction firewall means even a compromised agent cannot execute a purchase without human confirmation.
- Constitutional frame hashes create an audit trail that persists even if the agent is later compromised.
- The intent system has no financial exposure — intents don't hold money, lock inventory, or create obligations.

KA§§A does not need to trust the agent. KA§§A needs to trust the human who clicks "confirm." The agent is a discovery and staging layer, not a transaction layer.

---

## 12. IMPLEMENTATION PHASES

### 12.1 Phase 1 — API + Referral (Launch)

**Build:**
- Public listing API (GET endpoints, structured JSON responses)
- Agent referral header support (X-KA§§A-Referrer, X-KA§§A-Operator)
- Basic agent registration (Tier 1 — referrer only)
- Attribution tracking (single agent, last touch)
- Commission calculation and payout tracking

**Skip for now:**
- Intent staging (agents refer via links, humans buy via standard flow)
- Multi-agent attribution (single referrer per sale)
- Constitutional frame recording
- MCP server

**Why this first:** Referral attribution is the lowest-friction agent integration. An operator installs the KA§§A OpenClaw skill, the skill carries a referral ID, and if a sale results, the operator earns. No new transaction flow needed. Uses existing human purchase flow.

### 12.2 Phase 2 — Intent Staging + Registry (Month 3-6)

**Build:**
- Intent staging API (POST /api/intent, confirmation URLs)
- Full agent registry (Tier 2 — participant)
- Principal binding and verification
- Constitutional frame declaration and hash recording
- Intent lifecycle management (creation, expiration, cancellation)

**Why second:** Intent staging is the first net-new transaction flow involving agents. Requires the registry infrastructure and principal binding to be secure before launch.

### 12.3 Phase 3 — Multi-Agent Attribution (Month 6-12)

**Build:**
- Attribution chain recording (originator + converter)
- Seller-configured attribution model (single / split)
- Split commission calculation and payout
- Anti-gaming detection (wash referral, spam, farming)
- Operator analytics dashboard

**Why third:** Multi-agent attribution requires sufficient transaction volume to test and validate. Running single attribution in Phase 1-2 provides baseline data for calibrating split ratios and anti-gaming thresholds.

### 12.4 Phase 4 — Agent Ecosystem (Month 12+)

**Build:**
- MCP server for Claude, GPT, Gemini-powered agents
- Webhook subscriptions for real-time listing updates
- Agent-to-agent recommendation protocol
- Operator leaderboards and community features
- Advanced ADO (Agent Discovery Optimization) tooling for founders
- Full Chain attribution (Option C — multi-agent split beyond two)

---

## 13. THE CONSTITUTIONAL COMMERCE THESIS

### 13.1 What KA§§A Actually Is

KA§§A is not a marketplace with an agent feature bolted on. KA§§A is the first marketplace built for a world where agents are participants.

The architecture reflects this from the ground up:

- The API is agent-native, not a screen-scraping afterthought
- The referral system supports machine attribution alongside human attribution
- The intent layer creates a clean boundary between agent action and human authority
- The registry constitutionally enrolls agents as declared participants
- The lineage records agent participation at the cryptographic level
- The commission structure rewards agent-mediated discovery

### 13.2 Why MO§E§™ Is Required

Every agent platform today is capability-first, governance-never. OpenClaw has 150,000+ GitHub stars and 13,700+ skills, but no governance framework. Moltbook has agents generating content and influencing each other, but no constitutional constraints. The MoltMatch incident demonstrated the consequences: agents acting without governance create consent violations, impersonation risks, and liability ambiguity.

MO§E§™ provides what no other framework offers for agent commerce:

**Commitment conservation.** C(S) = C₀T(S). When an agent says "I will buy this seat for $2,000 on behalf of Jane," the commitment encoded in that statement is preserved through every step of execution. The intent records it. The lineage hashes it. The dual signature proves it. The commitment does not degrade through transformation.

**Constitutional governance.** Agents operate within declared bounds, not suggested guidelines. COMMAND encodes constraints that the system enforces. An agent cannot exceed its spending limit any more than a well-formed program can violate its type system.

**Cryptographic audit.** Every agent action that touches a seat instrument is hash-chained, dual-signed, and content-addressed. The audit trail is not a log file that can be edited. It is a cryptographic proof chain that breaks visibly if any record is altered.

**The floating moat standard applied to agents.** Every seat listing shows the LTV multiplier. Every agent referral shows the attribution chain. Every intent shows the constitutional frame. Transparency is not optional — it is structural.

### 13.3 The Recursive Loop

COMMAND is the first product listed on KA§§A. COMMAND is also the governance console that founders and buyers use to configure the agents that interact with KA§§A. The product governs the environment it is sold in.

```
MO§E§™ (constitutional framework)
    │
    ▼
COMMAND (governance console — first KA§§A listing)
    │
    ▼
KA§§A (marketplace — powered by MO§E§™)
    │
    ▼
Agents (participants — governed by COMMAND)
    │
    ▼
Seats (instruments — lineage-tracked by MO§E§™)
    │
    ▼
COMMAND (first seat — governance tool sold as governed instrument)
    │
    ▼
[loop]
```

The snake eats its tail. The governance framework powers the marketplace that sells the governance tool that governs the agents that participate in the marketplace. This is not a marketing gimmick. This is architectural recursion — the system's first product validates the system's architecture.

### 13.4 The Market Position

The AI agent market grew from $5.25 billion (2024) to $7.84 billion (2025), with projections reaching $52.62 billion by 2030. Over 1,043 active agentic AI companies exist, 530 have secured funding, and the sector attracted $20.8 billion in the last decade. Hundreds of these are bootstrapped or seed-stage, pre-revenue or early-revenue, building SaaS-shaped products with monthly pricing that maps perfectly to the eLTV formula.

No marketplace serves them with non-dilutive capital through founding seat cascades. No marketplace is designed for agent-mediated discovery and referral. No marketplace provides constitutional governance for agent participation. No marketplace issues serialized, hash-chained, dual-signed financial instruments with cryptographic provenance.

KA§§A is not competing with anyone. KA§§A is defining a category: constitutional commerce for agent-mediated markets.

---

## 14. DATABASE ADDITIONS

### 14.1 AgentRegistry Table

| Field | Type | Description |
|-------|------|-------------|
| agent_id | string (PK) | Unique agent identifier |
| operator_id | string (FK) | References operator account |
| agent_name | string | Display name |
| agent_type | enum | openclaw, mcp, custom, other |
| model_backend | string | LLM model used (if declared) |
| deployment_type | enum | local, cloud, hybrid |
| capabilities_declared | jsonb | Array of declared capabilities |
| constitutional_frame | jsonb | Encoded governance constraints |
| constitutional_frame_hash | string | SHA-256 of frame at registration |
| tier | enum | tier_0, tier_1, tier_2 |
| status | enum | ACTIVE, SUSPENDED, DEREGISTERED |
| registered_at | timestamp | Registration time |
| deregistered_at | timestamp | Deregistration time (nullable) |
| deregistration_reason | string | Reason for deregistration (nullable) |

### 14.2 PrincipalBinding Table

| Field | Type | Description |
|-------|------|-------------|
| binding_id | string (PK) | Unique binding identifier |
| agent_id | string (FK) | References AgentRegistry |
| principal_id | string (FK) | References user account |
| relationship | enum | self, employer, client, delegate |
| authorization_type | enum | self, standing, per_transaction |
| authorized_at | timestamp | Authorization time |
| revoked_at | timestamp | Revocation time (nullable) |

### 14.3 Intent Table

| Field | Type | Description |
|-------|------|-------------|
| intent_id | string (PK) | Unique intent identifier |
| product_id | string (FK) | References product listing |
| seat_wave | integer | Target wave |
| principal_id | string (FK) | Human who will confirm |
| agent_id | string (FK) | Agent that staged intent |
| operator_id | string (FK) | Agent's operator |
| max_price | decimal | Maximum price principal will pay |
| constitutional_frame_hash | string | Agent's frame at time of intent |
| confirmation_url | string | URL for human confirmation |
| status | enum | CREATED, AWAITING, CONFIRMED, COMPLETED, EXPIRED, CANCELLED, PAYMENT_FAILED |
| created_at | timestamp | Intent creation time |
| expires_at | timestamp | Expiration time (60 min from creation) |
| confirmed_at | timestamp | Human confirmation time (nullable) |
| completed_at | timestamp | Payment completion time (nullable) |

### 14.4 AgentAttribution Table

| Field | Type | Description |
|-------|------|-------------|
| attribution_id | string (PK) | Unique attribution identifier |
| product_id | string (FK) | References product listing |
| principal_id | string (FK) | Buyer whose purchase was attributed |
| attribution_model | enum | single, split, full_chain |
| chain | jsonb | Array of {agent_id, operator_id, role, channel, timestamp} |
| commission_total | decimal | Total commission amount |
| commission_splits | jsonb | Array of {operator_id, amount, share} |
| sale_id | string (FK) | References completed sale (nullable until sale completes) |
| surfaced_at | timestamp | When listing was first surfaced to principal |
| expires_at | timestamp | Attribution window expiration |
| status | enum | ACTIVE, ATTRIBUTED, EXPIRED, DISPUTED |

### 14.5 Updated LineageEvent Fields

Add to existing LineageEvent table (DOC-004):

| Field | Type | Description |
|-------|------|-------------|
| agent_id | string (nullable) | Agent that executed action (null if human-only) |
| agent_operator_id | string (nullable) | Agent's operator |
| constitutional_frame_hash | string (nullable) | Agent's frame hash at time of action |
| intent_id | string (nullable) | Intent that preceded this event (if agent-staged) |
| referral_chain | jsonb (nullable) | Attribution chain for this event |

---

## 15. OPEN QUESTIONS

- [ ] Agent referral commission cap: Per operator per product per month — what number? 10 sales default proposed.
- [ ] Attribution window duration: 7 days proposed. Should this vary by product category?
- [ ] Agent API rate limiting: 10 intents/hour/agent, 50/hour/operator proposed. Calibrate against real usage.
- [ ] Constitutional frame update propagation: When operator changes agent constraints in COMMAND, how quickly must the API reflect the new frame?
- [ ] Cross-platform attribution: Agent surfaces listing on Moltbook, human finds it via Google instead. How to handle mixed-channel attribution?
- [ ] Agent liability: If agent stages intent with inaccurate information (wrong price, wrong availability), who bears responsibility for user confusion?
- [ ] KA§§A's own agents: Will KA§§A deploy its own agents for marketplace curation, listing quality review, or fraud detection? If so, under what constitutional frame?
- [ ] Patent coverage: Does PPA4 cover agent registry as constitutional enrollment? Does it cover intent staging as commitment preservation mechanism?

---

*KA§§A-DOC-005 · Agent Interaction Protocol · v0.1 · 2026-03-04 · CONFIDENTIAL — Ello Cello LLC — KA§§A™ powered by MO§E§™*
