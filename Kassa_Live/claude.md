# CLAUDE.MD — KA§§A LIVE (Standalone Launch Build)

**Last Updated:** 2026-03-05
**Author:** Luthen via Claude session
**Status:** DIRECTIONAL — Review changes with Luthen before executing. This reflects decisions made on 2026-03-04/05 and there may be updates. Ask before assuming.

---

## WHAT CHANGED

We stripped the build down to what actually ships. The full engine, voucher system, agent layer, scoring, and multi-persona landing page flows are all deferred. What launches is a board with cascade presets.

**Key UX change:** The board IS the homepage. The current landing page content (hero, founders pitch, builder tiles, agents section) becomes a modal walkthrough that plays over the board on first visit. Returning visitors skip straight to the board. There is no separate landing page.

---

## THE BUILD (in priority order)

### 1. THE BOARD (marketplace)

This is the product. Craigslist energy. A page of listing cards.

**Each card shows:**
- Product name
- Founder name
- Sector/category
- Cascade type badge (SaaS or Enterprise)
- Current wave + seats remaining
- Current seat price
- Status badge (Active, New, Sold Out)

**Board features:**
- Sector tabs for filtering (AI Governance, Developer Tools, AI Agents, etc.)
- List view by default, grid toggle optional
- Sort by: Newest, Price, Category
- No scoring system. No trend indicators. Not yet.

### 2. THE CASCADE (seat presets)

Two preset cascade templates. Founder picks one, sets their starting price. The system generates the wave structure automatically.

**How it works:**
- Founder selects: SaaS or Enterprise
- Founder sets: Wave 1 price
- System applies: preset seat counts per wave, 1.6× multiplier between waves
- System generates: the full wave table (wave number, seats, price per seat)
- Board displays: current wave state from this table

**SaaS Cascade** — More seats, lower price, broader distribution
- Preset seat counts: TBD (being finalized with Luthen)
- More waves, more seats per wave

**Enterprise Cascade** — Fewer seats, higher price, exclusive positioning  
- Preset seat counts: TBD (being finalized with Luthen)
- Fewer waves, fewer seats per wave
- Think COMMAND: small seat count, high ticket

**Both types use:**
- 1.6× default multiplier (price of wave N+1 = price of wave N × 1.6)
- Each wave must sell through before the next opens
- No offers/negotiation system yet
- No Wave Zero / voucher gate for now — listings go straight to Wave 1

**The math is just:** `wave_price = base_price × 1.6^(wave_number - 1)`

### 3. LISTING FORM (founder input)

Minimal. Founder provides:
- Product name
- Description (short)
- Sector (select from preset list)
- Product URL
- Cascade type (SaaS or Enterprise)
- Wave 1 price
- Founder name + contact

That's the entire form. The cascade preset handles the rest.

**Listing options to display (but not build yet):**
- Distribution rights: show as "available" on product page
- White label: show as "available" on product page  
- These signal deal structure variety without requiring any backend

### 4. PRODUCT PAGE

When someone clicks a listing card, they see:
- Full product description
- Founder info
- Cascade visualization (wave table showing all waves, prices, seat counts)
- Current wave highlighted with seats remaining
- Seat price + buy/contact CTA (wire to whatever is simplest — Stripe link, contact form, or manual for now)

### 5. HOMEPAGE = THE BOARD (with modal onboarding)

**The board IS the homepage.** There is no separate landing page that links to a separate marketplace. When you load the site, you're looking at the board.

**First-time visitors get a modal walkthrough:**

The existing landing page sections (hero, founders pitch, built-for-builders tiles, agents section) become a sequence of popups layered OVER the board. The board is visible underneath, dimmed. Each modal closes to reveal the next. The last one shows where everything lives in the header nav.

**The flow:**

1. Page loads → Board renders underneath, dimmed/blurred
2. **Modal 1:** Hero content — "Claim your founding seat" pitch, Browse + List CTAs
3. User closes → **Modal 2:** Founders pitch — "One committed customer is worth more than 5,000 free trials"
4. User closes → **Modal 3:** Built for builders tiles — Founders / Buyers / Agents
5. User closes → **Modal 4:** Agents section + pointer to header nav — "Find all of this here" with links to relevant header items
6. User closes last modal → Board fully revealed, interactive, no overlay

**Returning visitors skip modals entirely.** Use a cookie or localStorage flag. They land straight on the board.

**Why this works:** No navigation friction. No "click here to browse." The onboarding IS the door. When you close the last modal you're already inside the marketplace. The content from the current landing page is preserved — it just plays as an intro sequence instead of a scroll page.

**Current landing page sections to convert to modals (see src/app/page.tsx in the app bundle):**
- Hero section (obsidian bg, gradient text, Browse/List CTAs, floating data card)
- "For Founders" committed supporters section
- "Built for builders" three-tile section (Founders/Buyers/Agents)
- "Agents Welcome" full section with three cards

**Header nav should contain links to:** whatever the modals pointed to (list a product, how it works, agents info). So the modal content isn't lost — it's always accessible from the header. The modals just front-load it for new visitors.

**Do NOT wire the homepage to the engine.** The board reads cascade state from stored data. The listing form feeds the engine. The homepage just displays.

---

## WHAT IS DEFERRED (do not build)

- Wave Zero / voucher system (kills cold start traction)
- Agent participation layer (API, registry, intent staging, attribution)
- Offer/negotiation system
- Product scoring / founder scoring
- Trend indicators (Rising/Steady/Cooling)
- Similar products comparison
- Floating Moat Calculator / eLTV display
- Emblem generation
- Seat serialization with lineage hashing
- Dual-signature verification
- Public verification endpoint
- Buyer registration / accounts
- Merchant of Record transaction processing
- Referral attribution system
- Distribution allocations
- Buyback clause configuration

All of this is spec'd and patented (PPA5). It layers on later. None of it blocks launch.

---

## DATA FLOW

```
HOMEPAGE (IS the board)
  │
  ├── First visit: modal sequence plays over dimmed board
  │   └── Last modal → points to header nav → closes → board revealed
  │
  ├── Return visit: straight to board, no modals
  │
  └── Board reads wave state from stored product/cascade data

LISTING FORM ——→ founder submits ——→ CASCADE PRESET computes waves ——→ stored
                                              |
BOARD ←—— reads wave state ←—— PRODUCT DATA + WAVE TABLE
                                              |
BOARD CARD click ——→ PRODUCT PAGE (shows cascade, CTA)
```

The homepage has NO direct connection to the engine. The listing form feeds the cascade preset which feeds the board. One pipe.

---

## FIRST LISTING

COMMAND is the first listing on the board. It's an Enterprise cascade. Use it as the proof that the pipe works. If COMMAND shows up on the board with wave state and a buy CTA, the system works.

---

## DESIGN DIRECTION

- Clean, warm, minimal. Not a dashboard. Not analytics-heavy.
- KA§§A Gold: #C4923A
- Background: warm whites (Benjamin Moore Bone White territory)
- Typography: Playfair Display (headings), DM Sans (body), DM Mono (data)
- The board should feel like browsing, not like operating software

---

## FTO GUARDRAILS — LEGAL/IP CONSTRAINTS (PERMANENT)

Source: FTO research report on PPA5 Cascade Register. These are legal constraints, not preferences.

### WHITE SPACE — Build these well (when the time comes)

Most of these are deferred for launch, but when built they are our strongest differentiators:

1. **Seat lineage as append-only hash chain** — Every seat event (mint, escrow, transfer) gets SHA-256 hashed and chained. Core provenance system. *(Deferred)*
2. **Dual-signature verification** — ECDSA (classical) + ML-DSA/FIPS 204 (post-quantum) on every seat instrument. *(Deferred)*
3. **Server-side signed verification receipts** — `/verify/{serial}` returns a platform-signed receipt with full lineage. NOT a blockchain lookup. *(Deferred)*
4. **Agent constitutional frame hashing** — Agent governance constraints hashed and recorded as auditable proof. *(Deferred)*
5. **Transaction firewall** — Agents discover and stage. Humans confirm and pay. No code path allows an agent to execute a financial transaction. *(Architectural — respect now even in mock code)*
6. **Sell-through gate as deterministic state machine** — Wave N+1 cannot activate until Wave N seats_sold == seats_total. No override. No admin bypass. No exception. *(ACTIVE — enforce in cascade preset logic)*
7. **Fixed-price waves with deterministic multiplier** — Price is `base × 1.6^(wave-1)`. Non-negotiable per wave. *(ACTIVE — enforce in cascade preset logic)*

### AVOID — Do NOT build these (ever)

These create collision with active patents. Not negotiable.

- **NO BLOCKCHAIN / NO SMART CONTRACTS / NO ON-CHAIN TOKENS** — Seats are database records, not tokens. No NFTs, no ERC-721, no smart-contract escrow. *(US11907916B2, active through 2037)*
- **NO BID/PROPOSAL-BASED SEAT ALLOCATION** — Primary sales are fixed price per wave. Offers (later) are secondary bilateral only — they do NOT rank, queue, or determine allocation. *(US12148026B2, active through 2042)*
- **NO TIME-WINDOW REFUND/REDEMPTION MECHANICS** — Waves do NOT have time limits that trigger refunds. No "if wave doesn't fill in X days, refund everyone." *(US11861637B2, active through 2040)*
- **NO PUBLIC LEDGER AS VERIFICATION SUBSTRATE** — Verification is via our API returning signed receipts. Not blockchain state queries. *(US10931457B2)*
- **NO ON-CHAIN/OFF-CHAIN BRIDGE FOR SEATS** — Seats live on our platform. No bridge to any blockchain. *(US11341466B2)*

### Quick Test (before implementing any seat feature)

1. Does this put seat data on a blockchain? → **Stop.**
2. Does this let offers determine who gets a seat? → **Stop.**
3. Does this add a time window that triggers refunds? → **Stop.**
4. Does this require a distributed ledger for verification? → **Stop.**
5. Does this embed transfer policy in the instrument itself? → **Stop. Server enforces policy, not the instrument.**

If all five are no, build it.

---

## QUESTIONS TO ASK LUTHEN BEFORE PROCEEDING

- [ ] SaaS preset: how many waves, how many seats per wave?
- [ ] Enterprise preset: how many waves, how many seats per wave?
- [ ] CTA on product page: Stripe checkout, contact form, or manual process?
- [ ] Any design/layout updates since this doc was written?
- [ ] Confirm: COMMAND cascade specifics (17 seats across how many waves?)

---

*This document is a directional brief from a working session. It is not the full spec. The full spec lives in DOC-001 through DOC-008 and PPA5. This is what we're building FIRST.*