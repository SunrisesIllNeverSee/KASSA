# CLAUDE.MD -- KA$$A BUILD DIRECTION

**Last Updated:** 2026-03-05
**Author:** Luthen via Claude session
**Status:** DIRECTIONAL -- Review changes with Luthen before executing. This reflects decisions made on 2026-03-04/05 and there may be updates. Ask before assuming.

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
- Cascade type badge (Enterprise / SaaS / Component)
- Current wave + seats remaining
- Current seat price
- Status badge (Pending, Active, New, Sold Out)

**Board features:**
- Sector tabs for filtering (AI Governance, Developer Tools, AI Agents, etc.)
- List view by default, grid toggle optional
- Sort by: Newest, Price, Category
- Pending listings visible but grayed out / unclickable (shows pipeline)
- No scoring system. No trend indicators. Not yet.
- Fill velocity IS the implicit score -- wave progress bar tells the story.

### 2. THE CASCADE (Tetractys engine at launch)

Founder picks a listing type, provides a base price. System generates the entire cascade using the Tetractys structure.

**The launch engine (Tetractys):**

```
Seat pattern:    5 - 4 - 3 - 2 - 1  (15 seats)
Multiplier:      Founder picks (default 1.5x)
Natural scarcity: more seats cheap, fewer seats expensive
```

**Example at $5,000 base, 1.5x:**

```
W1: 5 seats x $5,000  =  $25,000
W2: 4 seats x $7,500  =  $30,000
W3: 3 seats x $11,250 =  $33,750
W4: 2 seats x $16,875 =  $33,750
W5: 1 seat  x $25,313 =  $25,313
------------------------------------------------
15 seats                   $147,813
```

**Why Tetractys for launch:**
- Smooth 50% steps (at 1.5x) -- less friction, more momentum
- Natural seat scarcity (5 down to 1) -- built into the math
- Accessible entry points -- people can actually buy W1
- Every layer earns roughly equal weight
- Gets people moving instead of slamming a wall after W1

**Multiplier options:**

```
1.5x (default):  +50% per wave -- smooth, recommended for launch
2.0x (steep):    +100% per wave -- aggressive, strong trigger
1.25x (gentle):  +25% per wave -- slow crawl, low risk
```

**Two entry points, same output:**

```
ENTRY A: "My starting seat price is $5,000" --> system generates 5 waves
ENTRY B: "I want to raise $147,813" --> system back-calculates base price
```

**LATER OPTION: CASCADE WAVE (not at launch)**

The 5-3-5-3 cascade with Internal/Embedded ladders and 1-2-3-4 multiplier (divisor 38) is documented in CASCADE-ENGINE-DECISIONS.md. It becomes available as a premium/enterprise option when the market is ready. For now, everything runs on Tetractys.

**Listing types on the board:**
- Enterprise (full product, high ticket)
- SaaS (full product, lower price)
- Component (plugs into other products)

All three use the same Tetractys engine at launch. Different base prices, same structure.

**Also displayed on listing (not built yet):**
- Distribution rights: show as "available" on product page
- White-label: show as "available" on product page
- Both priced relative to cascade-proven market value

### 3. LISTING FORM (founder input)

Founder provides:
- Product name
- Description (short)
- Sector (select from preset list)
- Product URL
- Listing type (Enterprise / SaaS / Component)
- Base seat price (W1 price)
- Multiplier: 1.5x (default) / 2.0x / 1.25x
- Founder name + contact

System generates the 5-wave Tetractys from that. Founder confirms. Done.

Submitted listings appear on the board as PENDING (grayed out, not clickable). Luthen reviews and approves manually. Approved listings go ACTIVE.

### 4. PRODUCT PAGE

When someone clicks a listing card, they see:
- Full product description
- Founder info
- Cascade visualization (wave table showing all waves, prices, seat counts)
- Current wave highlighted with seats remaining
- Seat price + "Request This Seat" CTA --> triggers contact/inquiry flow

### 4.5 TRANSACTION MODEL (manual at launch)

Payments go through Luthen's Stripe. Negotiations and terms approved manually. This is the launch model -- everything else layers on later.

**The flow:**
1. Buyer browses the board, finds a product, clicks "Request This Seat"
2. Inquiry goes to Luthen (or founder if direct contact is listed)
3. Founder and buyer negotiate terms
4. Luthen reviews and approves the deal
5. Payment processed through KA$$A Stripe
6. Luthen pays founder (fee on founder side, rate TBD -- may launch at 0%)
7. Seat marked as sold, wave state updates on the board

**Why both parties record:** The buyer's seat instrument only has value if it's recorded on the board (serial, wave provenance, transfer rights). The founder's next wave only opens when the current wave shows as filled. Neither side benefits from hiding a transaction.

**Fee structure:** Fee is on the founder, not the buyer. Buyer sees one clean price. Founder pays KA$$A for distribution. Same model as every marketplace -- seller pays the platform for access to buyers.

**Terms / agreements -- NEEDS RESOLUTION:**
- [ ] Founder listing agreement: terms of listing, fee structure (even if 0% at launch), future fee clause, cascade reset rules, payout terms
- [ ] Buyer seat agreement: what the seat represents, transfer rights, refund conditions, escrow terms (if any)
- [ ] Both need to be signed before a transaction processes
- [ ] Template needed -- either custom-drafted or adapted from a standard marketplace seller/buyer agreement
- [ ] Consult with legal counsel recommended before first transaction

**What NOT to build yet:**
- Stripe Connect / automatic splits
- Automated checkout on the product page
- Escrow holding mechanics
- MoR tax infrastructure
- Automated payout system

### 5. HOMEPAGE = THE BOARD (with modal onboarding)

**The board IS the homepage.** There is no separate landing page that links to a separate marketplace. When you load the site, you're looking at the board.

**First-time visitors get a modal walkthrough:**

The existing landing page sections (hero, founders pitch, built-for-builders tiles, agents section) become a sequence of popups layered OVER the board. The board is visible underneath, dimmed. Each modal closes to reveal the next. The last one shows where everything lives in the header nav.

**The flow:**

1. Page loads --> Board renders underneath, dimmed/blurred
2. **Modal 1:** Hero content -- "Claim your founding seat" pitch, Browse + List CTAs
3. User closes --> **Modal 2:** Founders pitch -- "One committed customer is worth more than 5,000 free trials"
4. User closes --> **Modal 3:** Built for builders tiles -- Founders / Buyers / Agents
5. User closes --> **Modal 4:** Agents section + pointer to header nav -- "Find all of this here" with links to relevant header items
6. User closes last modal --> Board fully revealed, interactive, no overlay

**Returning visitors skip modals entirely.** Use a cookie or localStorage flag. They land straight on the board.

**Why this works:** No navigation friction. No "click here to browse." The onboarding IS the door. When you close the last modal you're already inside the marketplace. The content from the current landing page is preserved -- it just plays as an intro sequence instead of a scroll page.

**Current landing page sections to convert to modals (see src/app/page.tsx in the app bundle):**
- Hero section (obsidian bg, gradient text, Browse/List CTAs, floating data card)
- "For Founders" committed supporters section
- "Built for builders" three-tile section (Founders/Buyers/Agents)
- "Agents Welcome" full section with three cards

**Header nav should contain links to:** whatever the modals pointed to (list a product, how it works, agents info). So the modal content isn't lost -- it's always accessible from the header. The modals just front-load it for new visitors.

**Do NOT wire the homepage to the engine.** The board reads cascade state from stored data. The listing form feeds the engine. The homepage just displays.

---

## WHAT IS DEFERRED (do not build)

- Wave Zero / voucher system (deferred until agent traffic exists)
- Tetractys vouch pricing (future Wave Zero evolution -- proven, documented, not launch)
- Agent participation layer (API, registry, intent staging, attribution)
- Offer/negotiation system (FTO risk -- may be replaced permanently by cascade truth-telling)
- Product scoring / founder scoring
- Trend indicators (Rising/Steady/Cooling)
- Similar products comparison
- Floating Moat Calculator / eLTV display
- Emblem generation
- Seat serialization with lineage hashing
- Dual-signature verification
- Public verification endpoint
- Buyer registration / accounts
- Full Merchant of Record transaction processing
- Referral attribution system
- Distribution allocations
- Buyback clause configuration
- Cascade reset mechanics (documented in CASCADE-ENGINE-DECISIONS.md, build when needed)

All of this is spec'd and patented (PPA5 v2). It layers on later. None of it blocks launch.

---

## DATA FLOW

```
HOMEPAGE (IS the board)
  |
  |-- First visit: modal sequence plays over dimmed board
  |   \-- Last modal --> points to header nav --> closes --> board revealed
  |
  |-- Return visit: straight to board, no modals
  |
  \-- Board reads wave state from stored product/cascade data

LISTING FORM --> founder submits --> TETRACTYS FORMULA (base x 1.5^wave) --> stored
                                              |
BOARD <-- reads wave state <-- PRODUCT DATA + WAVE TABLE
                                              |
BOARD CARD click --> PRODUCT PAGE (shows cascade, CTA)
                                              |
"Request This Seat" --> manual negotiation --> Stripe payment --> seat marked sold
```

The homepage has NO direct connection to the engine. The listing form feeds the cascade formula which feeds the board. One pipe.

---

## FIRST LISTINGS

Three listings on the board at launch:

**KA$$A (the platform itself)** -- SaaS/Component listing. Tetractys at accessible pricing. This fills first and proves the engine.

**COMMAND** -- Enterprise flagship. Higher pricing. Anchor listing that shows the range of the board. May use the cascade wave structure (5-3-5-3) documented in CASCADE-ENGINE-DECISIONS.md or Tetractys at enterprise pricing. TBD.

**DEPLOY** -- When ready. Second enterprise listing alongside COMMAND.

---

## DESIGN DIRECTION

- Clean, warm, minimal. Not a dashboard. Not analytics-heavy.
- KA$$A Gold: #C4923A
- Background: warm whites (Benjamin Moore Bone White territory)
- Typography: Playfair Display (headings), DM Sans (body), DM Mono (data)
- The board should feel like browsing, not like operating software

---

## COMPANION DOCUMENTS

- **CASCADE-ENGINE-DECISIONS.md** -- Full session capture: Tetractys proof, multiplier presets, reset mechanics, kill switches, truth-telling, Internal/Embedded ladders
- **FTO-QUICK-REFERENCE.md** -- Legal/IP guardrails: what to enhance, what to avoid, patent numbers
- **AGENT-READY-DATA-MODEL.md** -- Nullable fields to add to seat/lineage types for future agent layer
- **PPA5-CASCADE-REGISTER-v2.md** -- Full patent filing with FTO-informed updates

---

## TO DO (unresolved from this session)

- [ ] KA$$A's own listing: what exactly is being sold? Component (cascade engine)? SaaS (platform access)? Base price?
- [ ] COMMAND listing: stay on Tetractys at enterprise pricing or use cascade wave (5-3-5-3)?
- [ ] The one number: clarify Entry A vs Entry B UX (total target vs base price)
- [ ] Component listing type: any structural differences from Enterprise/SaaS or just a label?
- [ ] Paperwork: founder listing agreement, buyer seat agreement, terms templates, legal review
- [ ] Transfer rights: how do transfers work at launch? Manual through Luthen?

---

## QUESTIONS TO ASK LUTHEN BEFORE PROCEEDING

- [ ] KA$$A listing: what's the base price and what does a seat confer?
- [ ] COMMAND: Tetractys or cascade wave? What base price on the board?
- [ ] Fee percentage: starting number even if waived at launch?
- [ ] Terms template: does Luthen have a lawyer or should we draft a starting template?
- [ ] Any design/layout updates since this doc was written?

---

*This document is a directional brief from working sessions 2026-03-04/05. It is not the full spec. The full spec lives in DOC-001 through DOC-008 and PPA5 v2. This is what we're building FIRST.*
