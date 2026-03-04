# KA§§A BUILD BRIEF v2

**Hand this document + the mockup HTML to any AI coding tool to scaffold the application.**
**Last updated: 2026-03-04**

---

## WHAT IS KA§§A

KA§§A (pronounced "Kassa") is a founding seat marketplace. Founders of live products list a limited number of founding seats — one-time purchases that give buyers permanent access. Seats are sold in waves, each priced higher than the last. Early buyers get the best price. Founders get capital without giving up equity.

Every listing is reviewed by the KA§§A team before going live. Every founder is verified. Every seat is serialized and transferable. This is not a discount marketplace — it's a curated platform for products that earn their place.

---

## TONE & FEEL

**Open and inviting.** KA§§A should feel like a door being held open for you, not a velvet rope. Warm, clear, approachable. Someone landing here for the first time should immediately understand what's being offered and feel welcome to explore.

**Not financial jargon on the surface.** LTV, moat scores, and cascade mechanics exist in the backend and in founder-facing tools. Buyer-facing copy stays plain: "Buy once, keep forever. Earlier buyers pay less."

**Not urgent.** No "HURRY!" energy. The scarcity is real — limited seats, rising prices. State the facts. "3 seats remaining. Next wave: $6,144." That's enough.

**Not claiming.** Don't say "the first marketplace for agents" or "the only platform that..." Just be welcoming. "Agents welcome" is the energy.

Voice rules for all UI copy:
- "Claim your seat" not "Buy now"
- "Founding round" not "Pricing tiers"
- "Wave 2 · 3 remaining" not "Only 3 left!"
- "Seat KS-2026-00003" not "Order #3"
- Numbers always in DM Mono font. Always.
- No emojis anywhere in the UI.

---

## STACK

- **Framework:** Next.js 14+ (App Router)
- **Deployment:** Vercel
- **Database:** Supabase (Postgres + Auth + Realtime + Row Level Security)
- **Payments:** Stripe (Checkout Sessions + Webhooks)
- **Styling:** Tailwind CSS with the custom brand tokens below
- **Fonts:** Google Fonts — Playfair Display, DM Sans, DM Mono

---

## DESIGN DIRECTION — CREATIVE BRIEF

**We are NOT dictating specific colors, layouts, or page structure.** Use your own creative judgment. What follows is mood, feel, and brand personality — not a style guide.

### Brand Mood

KA§§A should feel: **open, inviting, warm, trustworthy, and grounded.**

Think: a well-lit shop where valuable things are sold with care. Not a bank. Not a nightclub. Not a generic SaaS landing page. A place where someone walks in, immediately understands what's offered, and feels welcome to look around.

**Reference moods (for inspiration, not imitation):**
- The warmth of a Japanese ceramics studio
- The clarity of a Swiss design annual
- The confidence of a bespoke jeweler's display case
- The information density of a Bloomberg terminal, but made human

### What to Avoid
- Generic "AI startup" aesthetics (purple gradients, neon accents, dark mode everything)
- Discount marketplace energy (countdown timers, "🔥 HURRY!", starburst badges)
- Crowdfunding campaign vibes (progress thermometers, backer counts, stretch goals)
- Stock photography of any kind
- Emojis anywhere in the UI

### Brand Anchors (non-negotiable)
- The name is **KA§§A** — the § symbol (section sign) appears twice and is the visual identity
- "powered by MO§E§™" appears somewhere on every page (small, subtle, footer is fine)
- The § symbol should always be visually distinguished from surrounding text (different color, weight, or treatment — your call how)
- Font for numbers/prices/data should be monospace (any monospace — your choice)
- Headlines should feel substantial (serif recommended but not required)

### Tone for All Copy
- Open and inviting, not exclusive or gatekeepy
- Precise — numbers have units, claims have specifics
- Confident without being arrogant
- "Agents welcome" energy — inclusive, not claiming to be first or only
- No jargon on buyer-facing pages. Terms like LTV, escrow mechanics, lineage hashing belong in founder tools and backend, not in the hero section.

### Let the Data Be the Design
KA§§A's visual interest should come from the product itself: cascade visualizations, wave progress bars, seat counts, scoring displays, trend indicators. These ARE the design elements. Don't add decoration — let the structure of the marketplace create the visual.

---

## SITE STRUCTURE — FLEXIBLE

The following pages are needed. How you structure, lay out, and connect them is up to you. Surprise us.

### Required Pages

1. **Landing page** ( / ) — explains what KA§§A is, who it's for (founders, buyers, agents), and shows at least one listing. Should communicate the core concept in under 10 seconds of reading.

2. **Browse listings** ( /listings ) — grid or list of active listings with key info visible: product name, current wave price, seats remaining, trend/score indicator. Filterable and sortable.

3. **Product listing page** ( /listings/[slug] ) — the most important page. Must include:
   - Founder profile (name, company, verified status, founder score)
   - Product description and category
   - Cascade visualization showing Wave Zero status and all waves
   - Product scorecard with metrics and trend
   - Similar/comparable products in same category
   - Offer submission (if founder has offers enabled)
   - Clear CTA to claim a seat

4. **Seat verification** ( /verify/[serial] ) — public page showing a seat's details: serial number, product, wave, price paid, status. Shareable proof of position.

5. **Buyer dashboard** ( /dashboard ) — list of owned seats with status, serial numbers, verification links

6. **Founder dashboard** ( /founder/dashboard ) — sales overview, Wave Zero progress, wave status, offers, analytics

7. **Create listing** ( /founder/new ) — multi-step flow: product details → pricing (LTV-suggested or custom) → seat/wave config → cascade preview → submit for review

8. **Footer on every page** — KA§§A branding, "powered by MO§E§™", navigation links

---

## SCORING SYSTEM

### Founder Score
Measures the person/entity behind the listing.

| Factor | Weight | How it's measured |
|--------|--------|-------------------|
| Identity verification | Required | KYC check passed (binary — must pass to list) |
| Entity verification | High | Registered business entity confirmed |
| Product demo | Required | Working product demonstrated to KA§§A review team |
| Listing history | Medium | Past listings on KA§§A, sell-through rates |
| Responsiveness | Low | Time to respond to offers, support queries |

Display: numerical score (e.g., 4.2/5) or letter grade (A/B/C) — pick one approach and be consistent. Shown on founder profile card.

### Product Score
Measures the listing itself.

| Factor | Weight | How it's measured |
|--------|--------|-------------------|
| Sell-through velocity | High | How fast seats are selling relative to time listed |
| Demand trend | High | Is interest rising, flat, or cooling? (page views, saves, offer count) |
| Value position | High | How the seat price compares to equivalent ongoing cost (LTV ratio) |
| Category rank | Medium | How this product scores vs others in same category |
| Completion rate | Medium | What % of cascade has sold through |

Display: overall score (e.g., 8.2/10 or letter grade) with sparkline trend chart showing direction over last 30 days.

### Trend Indicators
Every listing gets a trend tag visible in both browse view and detail view:

- **Rising** (Verdigris/green) — demand increasing
- **Steady** (Driftwood/neutral) — stable interest
- **Cooling** (Terracotta/red) — declining interest

Trends are calculated from page views, saves/watchlist adds, offer volume, and seat purchase velocity.

### Recommendation Context
On the product listing page, show a section like:

```
Similar products in [Category]:
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ Product A        │  │ Product B        │  │ Product C        │
│ Score: 7.8       │  │ Score: 8.5       │  │ Score: 6.9       │
│ Wave 2 · $X      │  │ Wave 1 · $Y      │  │ Wave 3 · $Z      │
│ ↗ Rising         │  │ → Steady         │  │ ↘ Cooling        │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

This helps buyers evaluate a listing in context. "Is this a good deal compared to similar products?"

---

## CASCADE MECHANICS

### Wave Zero — The Proving Ground

Every listing on KA§§A starts the same way, no exceptions:

**Wave Zero is a standardized, all-or-nothing escrow round.**

```
Seats:    25 (platform-wide constant, same for every listing)
Price:    $20-50 per seat (low fixed price, TBD — likely $30)
Escrow:   ALL-OR-NOTHING. Money is held until all 25 seats fill.
          If filled → founder gets paid, buyers get product access, real cascade opens.
          If never filled → all buyers are refunded. No one loses money.
Time:     No time limit. Listing sits in Wave Zero until it fills or founder pulls it.
```

Wave Zero buyers receive the product — this is a real purchase, not a deposit. But their payment only releases when the full 25 seats clear. This makes Wave Zero a demand test with a safety net for buyers and a quality gate that requires zero editorial judgment.

**What Wave Zero solves:**
- Quality: if 25 people won't spend $30 on your product, it's not ready for a full cascade
- Fairness: every founder enters the marketplace the same way, whether they want 8 enterprise licenses or 200 SaaS seats
- Buyer trust: zero risk at Wave Zero (refund if it doesn't fill)
- Scoring: Wave Zero sell-through velocity becomes the first hard data point for product scores and trends
- Platform economics: 25 seats × $30 = $750 per listing through the gate. Small but real.

**Wave Zero is the only standardized wave.** After clearing Wave Zero, the founder's real cascade opens — and that's where customization begins.

### Post-Wave-Zero Cascade (Waves 1, 2, 3...)

Once Wave Zero clears, the founder sets up their real cascade:

- **Wave 1 pricing:** founder chooses LTV-suggested or custom pricing
  - LTV-suggested: founder inputs monthly price + expected lifespan → system suggests Wave 1 price
  - Custom: founder sets Wave 1 price directly
- **Seats per wave:** founder sets this based on their goals (8 enterprise licenses, 50 SaaS seats, etc.)
- **Wave multiplier:** default 1.6× (each wave is 1.6× the previous), founder can adjust
- **Number of waves:** founder decides, or can leave it open-ended
- **Earning the next wave:** each wave must sell through before the next one opens. You don't pre-plan 4 waves — you earn them by selling.

This means a founder who wants 8 total enterprise licenses might set:
- Wave 1: 4 seats at $2,400
- Wave 2: 4 seats at $3,840
- (Only opens if Wave 1 clears)

And a founder who wants broad SaaS adoption might set:
- Wave 1: 30 seats at $200
- Wave 2: 30 seats at $320
- Wave 3: 40 seats at $512
- (Each wave opens only when the previous clears)

Both started with the same Wave Zero. After that, their cascades reflect their actual product and goals.

### Offers (Optional per listing)
- Founder can toggle "Accept offers" when creating a listing
- If enabled: buyers can submit an offer below the current wave price
- Founder sees offers in their dashboard and can accept or reject
- Accepted offer = seat sold at offer price, still counts against wave inventory
- Rejected offers can optionally receive a counter-offer from the founder
- Offers are NOT available during Wave Zero (fixed price, no negotiation)

### Wave Progression
- Wave Zero must fill completely (all 25 seats) before cascade opens
- After Wave Zero: each wave must sell through before the next one opens
- Listing page shows: Wave Zero status → completed waves → active wave (with progress bar) → upcoming waves
- Founders earn their shelf space through demand, not by requesting it

---

## QUALITY GATES — LISTING REQUIREMENTS

Two layers of quality control:

### Layer 1: Verification (before listing goes live)

1. **Founder Verification** (required)
   - Identity verification (KYC)
   - Business entity verification (LLC/Corp/equivalent)
   - Product demo to KA§§A review team (working product, not a prototype)

2. **Editorial Review** (required)
   - KA§§A team reviews listing description, pricing, category fit
   - Can request changes before approval
   - Final approval required before listing enters Wave Zero

3. **Product Must Be Live** (required)
   - No pre-launch products
   - No "coming soon" listings
   - Must have a working product accessible to buyers on escrow release

### Layer 2: Wave Zero (the market decides)

Once verified and approved, the listing enters Wave Zero. This is the real quality gate — 25 people need to put money down. No editorial board can replicate what 25 paying customers tell you about product-market fit.

If the product can't clear Wave Zero, KA§§A works with the founder (no time limit, no penalty) but the full cascade doesn't open. The marketplace curates itself through demand.

---

## FIRST LISTING: COMMAND

```
Product:        COMMAND
Type:           Enterprise perpetual license
Founder:        Ello Cello LLC (Deric J. McHenry)
Total seats:    17 (across real cascade — Wave Zero is separate)
Description:    The operations console for AI governance. Configure agent
                behavior, set operational boundaries, manage compression
                protocols, and maintain full audit trails. Built on MO§E§™.
Category:       AI Governance
Offers:         TBD (founder decision)
Wave Zero:      Grandfathered — COMMAND is KA§§A's first listing and an
                internal Ello Cello product. Skips Wave Zero. Enters
                directly into its real cascade.
```

Note: All subsequent third-party listings must clear Wave Zero before their real cascade opens.

---

## DATABASE SCHEMA (Supabase)

### profiles
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  display_name TEXT,
  company_name TEXT,
  entity_type TEXT,                     -- LLC, Corp, Sole Prop, etc.
  bio TEXT,
  role TEXT CHECK (role IN ('buyer', 'founder', 'admin')) DEFAULT 'buyer',
  verified BOOLEAN DEFAULT FALSE,       -- passed KYC + entity verification
  founder_score NUMERIC,                -- calculated score
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### products
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  founder_id UUID REFERENCES profiles(id),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,                     -- full description (human-readable)
  description_short TEXT,               -- one-line summary
  description_machine TEXT,             -- agent-readable (JSON structured)
  category TEXT,
  license_type TEXT DEFAULT 'perpetual',-- perpetual, subscription, enterprise
  monthly_price NUMERIC,                -- reference price (for LTV calc)
  expected_lifespan_months INTEGER,     -- for LTV calc
  ltv_ratio NUMERIC,                    -- calculated: seat_price / (monthly × lifespan)
  pricing_mode TEXT CHECK (pricing_mode IN ('ltv_suggested', 'custom')) DEFAULT 'custom',
  offers_enabled BOOLEAN DEFAULT FALSE, -- can buyers submit offers? (not in Wave Zero)
  escrow_days INTEGER DEFAULT 14,
  wave_zero_cleared BOOLEAN DEFAULT FALSE, -- has Wave Zero sold through?
  wave_zero_price NUMERIC DEFAULT 30,   -- platform-standard Wave Zero price
  product_score NUMERIC,                -- calculated composite score
  trend TEXT CHECK (trend IN ('rising', 'steady', 'cooling')),
  review_status TEXT CHECK (review_status IN ('pending', 'approved', 'rejected', 'changes_requested')) DEFAULT 'pending',
  status TEXT CHECK (status IN ('draft', 'in_review', 'wave_zero', 'active', 'paused', 'completed')) DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### waves
```sql
CREATE TABLE waves (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  wave_number INTEGER NOT NULL,         -- 0 = Wave Zero, 1+ = real cascade
  seat_price NUMERIC NOT NULL,
  total_seats INTEGER NOT NULL,         -- 25 for Wave Zero (platform constant)
  seats_sold INTEGER DEFAULT 0,
  escrow_type TEXT CHECK (escrow_type IN ('all_or_nothing', 'per_seat')) DEFAULT 'per_seat',
    -- Wave Zero = all_or_nothing (funds held until all seats fill)
    -- Waves 1+ = per_seat (standard 14-day escrow per purchase)
  status TEXT CHECK (status IN ('upcoming', 'active', 'sold_out', 'refunded')) DEFAULT 'upcoming',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(product_id, wave_number)
);
```

### seats
```sql
CREATE TABLE seats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  serial_number TEXT UNIQUE NOT NULL,   -- format: KS-YYYY-NNNNN
  product_id UUID REFERENCES products(id),
  wave_id UUID REFERENCES waves(id),
  owner_id UUID REFERENCES profiles(id),
  purchase_price NUMERIC NOT NULL,      -- actual price paid (may differ from wave if offer)
  wave_price NUMERIC NOT NULL,          -- listed wave price at time of purchase
  was_offer BOOLEAN DEFAULT FALSE,      -- purchased via offer vs listed price
  purchased_at TIMESTAMPTZ,
  escrow_status TEXT CHECK (escrow_status IN ('pending', 'released', 'refunded')) DEFAULT 'pending',
  escrow_release_at TIMESTAMPTZ,
  lineage_hash TEXT,
  previous_hash TEXT,
  transfer_count INTEGER DEFAULT 0,
  stripe_payment_intent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### offers
```sql
CREATE TABLE offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  wave_id UUID REFERENCES waves(id),
  buyer_id UUID REFERENCES profiles(id),
  offer_price NUMERIC NOT NULL,
  wave_price NUMERIC NOT NULL,          -- listed price at time of offer
  status TEXT CHECK (status IN ('pending', 'accepted', 'rejected', 'expired', 'countered')) DEFAULT 'pending',
  counter_price NUMERIC,                -- if founder counters
  founder_response_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,               -- offers expire after X hours
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### referrals
```sql
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seat_id UUID REFERENCES seats(id),
  referrer_type TEXT CHECK (referrer_type IN ('human', 'agent')),
  referrer_id TEXT,
  operator_id TEXT,
  commission_amount NUMERIC,
  commission_status TEXT DEFAULT 'pending',
  attributed_at TIMESTAMPTZ DEFAULT now()
);
```

### product_views (for scoring/trends)
```sql
CREATE TABLE product_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  viewer_type TEXT CHECK (viewer_type IN ('human', 'agent')) DEFAULT 'human',
  referrer_source TEXT,
  viewed_at TIMESTAMPTZ DEFAULT now()
);
```

### editorial_reviews
```sql
CREATE TABLE editorial_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  reviewer_id UUID REFERENCES profiles(id),  -- admin user
  status TEXT CHECK (status IN ('approved', 'rejected', 'changes_requested')),
  notes TEXT,
  reviewed_at TIMESTAMPTZ DEFAULT now()
);
```

---

## API ROUTES

### Public
```
GET  /api/listings              Browse listings (JSON, agent-compatible)
GET  /api/listings/[slug]       Single listing detail with scores
GET  /api/categories            List categories with listing counts
GET  /api/verify/[serial]       Public seat verification
```

### Authenticated (buyer)
```
POST /api/checkout              Create Stripe checkout session
POST /api/offers                Submit an offer on a listing
GET  /api/my/seats              List buyer's owned seats
```

### Authenticated (founder)
```
POST /api/listings/create       Submit new listing for review
GET  /api/founder/dashboard     Sales data, offers, analytics
PUT  /api/offers/[id]/respond   Accept/reject/counter an offer
```

### Webhooks
```
POST /api/webhooks/stripe       Handle payment → mint seat → start escrow
```

---

## KEY FLOWS

### Flow 1: Founder Creates Listing
1. Founder signs up, submits verification (identity + entity + product demo)
2. Verification approved by KA§§A team, founder status = verified
3. Founder creates listing: name, description, category, license type
4. Pricing step: choose "LTV-Suggested" or "Custom" for their real cascade (Wave 1+)
   - LTV: enter monthly price + lifespan, system suggests Wave 1 price
   - Custom: enter Wave 1 price directly
5. Seats per wave and wave count: founder sets based on their goals
6. Toggle: "Accept offers from buyers" (yes/no) — applies to Waves 1+ only
7. System generates full cascade preview (Wave Zero at fixed price, then Wave 1+ at founder pricing)
8. Founder submits, enters editorial review
9. On approval: listing goes live in Wave Zero (25 seats at platform-standard price)
10. Wave Zero fills completely, all-or-nothing escrow releases, real cascade (Wave 1) opens

### Flow 2: Buyer Purchases Wave Zero Seat
1. Buyer finds listing on browse page (listing shows "Wave Zero - Founding Round")
2. Clicks "Claim Seat" at Wave Zero price, goes to Stripe Checkout
3. On payment success:
   a. Generate serial: KS-YYYY-NNNNN
   b. Calculate lineage hash
   c. Create seat record, escrow_status = 'held' (all-or-nothing)
   d. Increment wave seats_sold
   e. If this was seat 25 of 25:
      - Release ALL Wave Zero funds to founder
      - Set wave_zero_cleared = true on product
      - Activate Wave 1 of real cascade
      - Notify all Wave Zero buyers: product access unlocked
4. Buyer gets product access immediately on Wave Zero completion

### Flow 3: Buyer Claims Seat (Waves 1+)
1. Buyer sees listing with active wave (post Wave Zero)
2. Clicks "Claim Seat" at listed price, goes to Stripe Checkout
3. On payment success:
   a. Generate serial, calculate lineage hash
   b. Create seat record, escrow_status = 'pending' (standard per-seat escrow)
   c. Set escrow_release_at = now() + escrow_days
   d. Increment wave seats_sold
   e. If wave is full, next wave becomes active
4. After escrow period: release funds to founder, status = 'released'

### Flow 4: Buyer Makes Offer (Waves 1+ only, if enabled)
1. On listing page with offers enabled, buyer clicks "Make an Offer"
2. Buyer enters offer price (below current wave price)
3. Offer saved with expiration timer (e.g., 48 hours)
4. Founder gets notification in dashboard
5. Founder can: Accept (triggers checkout at offer price), Reject, or Counter
6. If accepted: same minting flow as regular purchase but at offer price
7. Seat record tracks: was_offer = true, purchase_price vs wave_price

### Flow 5: Wave Zero Fails to Fill (founder pulls listing)
1. Founder decides to pull listing while Wave Zero is still open
2. All held payments are refunded to Wave Zero buyers
3. Seats are voided, listing moves to 'paused' or 'draft'
4. Founder can re-submit with changes and try again
## PHASE 1 SCOPE (MVP — build this first)

**Build:**
1. Landing page with full brand identity
2. Browse listings page with cards, filters, sort
3. Product listing page with founder profile, description, cascade, scores placeholder
4. Wave Zero checkout flow (all-or-nothing escrow)
5. Post-Wave-Zero cascade checkout (standard per-seat escrow)
6. Seat minting on payment (serial number, hash)
7. Public seat verification page
8. Buyer dashboard (my seats)
9. Founder dashboard (sales overview, Wave Zero progress)
10. Supabase auth (magic link)
11. Basic listing creation flow (skip editorial review — manually approve for launch)
12. COMMAND as first listing (grandfathered past Wave Zero)

**Phase 2 (after launch):**
- Offer system (submit/accept/reject/counter)
- Full scoring system with live trend calculation
- Similar product comparisons
- Agent API + referral attribution
- Floating Moat Calculator (pending spec from founder)
- Editorial review queue UI
- Transfer mechanism
- Agent registry

**Not in scope at all yet:**
- Secondary market for seat transfers
- OpenClaw skill / MCP server
- Multi-agent attribution chains

---

## REFERENCE DOCUMENTS

Full specifications exist in separate documents:
- DOC-001: Product Specification
- DOC-002: Pre-Build Planning (stack decision, infrastructure)
- DOC-003: SEO & Discovery Strategy
- DOC-004: Seat Instrument Specification (cascade mechanics, escrow, hashing, lineage)
- DOC-005: Agent Interaction Protocol (agent registry, referral, intent staging)
- DOC-006: Outreach Target List (25 targets across 3 tiers)
- DOC-007: Brand Identity & Positioning (full color/type/voice system)
- DOC-008: Build Brief (this document)

When in doubt on seat mechanics → DOC-004.
When in doubt on brand → DOC-007.
When in doubt on tone → this document, "Tone & Feel" section.

---

*KA§§A Build Brief · DOC-008 · v2 · 2026-03-04 · Ello Cello LLC*
*KA§§A™ powered by MO§E§™*
