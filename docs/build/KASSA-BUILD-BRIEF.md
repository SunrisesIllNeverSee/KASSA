# KA§§A BUILD BRIEF

**Hand this to any AI coding tool to scaffold the application.**

---

## WHAT IS KA§§A

KA§§A (pronounced "Kassa") is a founding seat marketplace. Founders of live SaaS/AI products list "founding seat cascades" — serialized, one-time-purchase positions that give buyers permanent access to the product. Each cascade has multiple waves, each priced higher than the last. Early buyers get the best price. Founders get non-dilutive capital. Every seat has a serial number, hash-verified lineage, and is transferable.

Think of it as: what if AppSumo's lifetime deals were financial instruments — serialized, priced to LTV, escrowed, and discoverable by AI agents.

---

## STACK

- **Framework:** Next.js 14+ (App Router)
- **Deployment:** Vercel
- **Database:** Supabase (Postgres + Auth + Realtime)
- **Payments:** Stripe (Checkout Sessions + Webhooks)
- **Styling:** Tailwind CSS with custom brand tokens
- **Fonts:** Playfair Display (serif headlines), DM Sans (body), DM Mono (data/numbers)

---

## BRAND TOKENS

```css
/* Colors */
--gold: #C4923A;        /* Primary brand, § symbol, CTAs */
--bone: #F2EDE4;        /* Background */
--obsidian: #1A1A18;    /* Primary text */
--drift: #6B6558;       /* Secondary text */
--sand: #DDD5C8;        /* Borders */
--verdigris: #4A7C59;   /* Success/positive */
--terra: #B44A3F;       /* Warning/negative */
--slate: #3A6B8C;       /* Info/links */
--charcoal: #2A2A25;    /* Dark surfaces */
```

```
/* Typography */
Display/Headlines: Playfair Display 700
Body/UI:           DM Sans 400/500/600
Data/Numbers:      DM Mono 400/500
```

**Visual rules:**
- The § symbol is ALWAYS colored gold (#C4923A), never inherits text color
- No photography. Data IS the design. Generous whitespace.
- Aesthetic = "warm institutional" — not startup, not corporate. A trading floor with taste.
- No emojis in UI. No "🔥 HURRY!" energy. Confident, precise, grounded.
- Comparison table renders "KA§§A" not "Kassa" — the § symbols are the brand identity

---

## DATABASE SCHEMA (Supabase)

### profiles
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  display_name TEXT,
  role TEXT CHECK (role IN ('buyer', 'founder', 'admin')) DEFAULT 'buyer',
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### products (listings)
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  founder_id UUID REFERENCES profiles(id),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  description_machine TEXT,            -- agent-readable structured description
  category TEXT,
  monthly_price NUMERIC NOT NULL,      -- the subscription price this replaces
  expected_lifespan_months INTEGER,    -- used for LTV calculation
  ltv_multiplier NUMERIC,             -- seat_price / (monthly_price * lifespan)
  escrow_days INTEGER DEFAULT 14,
  buyback_policy TEXT DEFAULT 'pro_rata',
  status TEXT CHECK (status IN ('draft', 'active', 'paused', 'completed')) DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### waves
```sql
CREATE TABLE waves (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  wave_number INTEGER NOT NULL,
  seat_price NUMERIC NOT NULL,
  total_seats INTEGER NOT NULL,
  seats_sold INTEGER DEFAULT 0,
  status TEXT CHECK (status IN ('upcoming', 'active', 'sold_out')) DEFAULT 'upcoming',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(product_id, wave_number)
);
```

### seats (the instrument)
```sql
CREATE TABLE seats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  serial_number TEXT UNIQUE NOT NULL,  -- format: KS-YYYY-NNNNN
  product_id UUID REFERENCES products(id),
  wave_id UUID REFERENCES waves(id),
  owner_id UUID REFERENCES profiles(id),
  purchase_price NUMERIC NOT NULL,
  purchased_at TIMESTAMPTZ,
  escrow_status TEXT CHECK (escrow_status IN ('pending', 'released', 'refunded')) DEFAULT 'pending',
  escrow_release_at TIMESTAMPTZ,
  lineage_hash TEXT,                   -- SHA-256 chain
  previous_hash TEXT,                  -- link to previous seat's hash
  transfer_count INTEGER DEFAULT 0,
  stripe_payment_intent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### referrals
```sql
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seat_id UUID REFERENCES seats(id),
  referrer_type TEXT CHECK (referrer_type IN ('human', 'agent')),
  referrer_id TEXT,                    -- user ID or agent registry ID
  operator_id TEXT,                    -- for agents: the human operator
  commission_amount NUMERIC,
  commission_status TEXT DEFAULT 'pending',
  attributed_at TIMESTAMPTZ DEFAULT now()
);
```

---

## ROUTES / PAGES

### Public Pages
```
/                    Landing page (hero, how it works, audience strips, featured listing, comparison, CTA)
/listings            Browse all active listings
/listings/[slug]     Individual listing page (product info + cascade visualization + buy button)
/verify/[serial]     Seat verification page (public — shows lineage, hash, LTV math)
```

### Auth Pages
```
/login               Supabase Auth (email magic link or OAuth)
/signup              Registration with role selection (buyer or founder)
```

### Buyer Pages
```
/dashboard           My seats (list of owned seats with status)
/dashboard/[serial]  Individual seat detail (emblem, transfer option)
```

### Founder Pages
```
/founder/dashboard      My listings overview
/founder/new            Create new listing (product details → cascade setup → review → publish)
/founder/[slug]/manage  Manage listing (view sales, wave status, escrow releases)
```

### API Routes
```
/api/listings           GET: browse listings (JSON, agent-compatible)
/api/listings/[slug]    GET: single listing detail
/api/checkout           POST: create Stripe checkout session
/api/webhooks/stripe    POST: handle payment success → mint seat → start escrow
/api/verify/[serial]    GET: public seat verification data
```

---

## KEY FLOWS

### 1. Founder Creates Listing
1. Founder enters: product name, description, monthly_price, expected_lifespan
2. System calculates suggested Wave 1 price: `monthly_price × expected_lifespan × ltv_multiplier`
3. Founder sets: number of waves, seats per wave, wave multiplier (default 1.6x)
4. System generates cascade preview showing all wave prices
5. Founder reviews, confirms, listing goes live

### 2. Buyer Purchases Seat
1. Buyer lands on listing page, sees cascade visualization
2. Clicks "Claim Seat · $[price]" → Stripe Checkout
3. On payment success (webhook):
   a. Generate serial number (KS-YYYY-NNNNN, sequential)
   b. Calculate lineage hash: SHA-256(serial + product_id + wave + price + previous_hash)
   c. Create seat record with escrow_status = 'pending'
   d. Set escrow_release_at = now() + escrow_days
   e. Increment wave seats_sold
   f. If wave is full, advance to next wave
4. After escrow period: release funds to founder, change escrow_status to 'released'
5. Generate seat emblem (visual certificate with serial, hash, wave, product)

### 3. Cascade Progression
- Each wave has a fixed seat count and price
- When all seats in Wave N sell, Wave N+1 becomes active
- Price increases by wave_multiplier each wave (e.g., 1.6x: $800 → $1,280 → $2,048 → $3,277)
- Listing page shows all waves: sold out / active (with progress bar) / upcoming

---

## PHASE 1 SCOPE (MVP — what to build first)

1. Landing page with brand identity
2. Single listing page for COMMAND (hardcoded if needed, dynamic later)
3. Stripe checkout flow
4. Seat minting on payment (serial number, hash)
5. Buyer dashboard showing owned seats
6. Public verification page per seat
7. Supabase auth (magic link)
8. Basic founder dashboard showing sales

**NOT in Phase 1:**
- Agent API / referral system
- Transfer mechanism
- Multi-founder onboarding flow
- Agent registry
- OpenClaw skill / MCP server

---

## COMPONENT PATTERNS

### Listing Card
```
┌─────────────────────────────────────────────────┐
│  [BADGE: Founding Cascade · Live]               │
│                                                  │
│  Product Name                    (Playfair 28px) │
│  by Founder Name · Category      (DM Sans 13px)  │
│                                                  │
│  Description text...             (DM Sans 14px)  │
│                                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │ LTV Mult │ │ Escrow   │ │ Seats    │        │
│  │ 1.19x    │ │ 14 days  │ │ 200      │        │
│  │ (Mono)   │ │ (Mono)   │ │ (Mono)   │        │
│  └──────────┘ └──────────┘ └──────────┘        │
│                                                  │
│  [=======░░░] Wave 2 · 19 of 50 remaining       │
│                                                  │
│  ┌────────────────────────────────┐              │
│  │   Claim Seat · $1,280          │  (Gold bg)   │
│  └────────────────────────────────┘              │
│  14-day escrow · Instant access on release       │
└─────────────────────────────────────────────────┘
```

### Cascade Visualization (dark bg panel)
```
Wave 1  $800    ░░░░░░░░░░  SOLD OUT  (dimmed)
Wave 2  $1,280  ████████░░  ● LIVE    (gold border, bright)
Wave 3  $2,048  ░░░░░░░░░░  UPCOMING  (dimmed)
Wave 4  $3,277  ░░░░░░░░░░  UPCOMING  (dimmed)
```

### Seat Emblem (certificate-style card)
```
┌─────────────────────────────┐
│            §                │  (Gold, 48px)
│         COMMAND             │  (Playfair)
│      KS-2026-00031          │  (Mono, drift)
│  ─────────────────────────  │
│  Wave        2 of 4         │
│  Price       $1,280         │  (Gold)
│  LTV Mult    1.19x          │
│  Escrow      Released       │  (Verdigris)
│  Owner       d.mchenry      │
│  ─────────────────────────  │
│  sha256: a7f3...4d2b        │  (10px, light)
│  lineage: e8b1...9c7e       │
│                              │
│  [ Verify on Chain → ]       │  (Gold outline btn)
└─────────────────────────────┘
```

---

## VOICE REMINDERS FOR UI COPY

- "Claim your seat" not "Buy now"
- "Founding cascade" not "Pricing tiers"
- "Wave 2 · 19 remaining" not "Only 19 left! Hurry!"
- "Seat KS-2026-00031" not "Order #31"
- "Escrow releases in 12 days" not "Your money is safe"
- "Verification page" not "Receipt"
- "Non-dilutive capital" not "Revenue"
- Numbers always in DM Mono. Always.

---

## REFERENCE DOCUMENTS

These are the full specifications (separate files):
- DOC-001: Product Specification
- DOC-002: Pre-Build Planning
- DOC-003: SEO & Discovery Strategy
- DOC-004: Seat Instrument Specification
- DOC-005: Agent Interaction Protocol
- DOC-006: Outreach Target List
- DOC-007: Brand Identity & Positioning

This build brief is the condensed version. When in doubt, refer to DOC-004 for seat mechanics and DOC-007 for brand rules.

---

*KA§§A Build Brief · v0.1 · 2026-03-04 · Ello Cello LLC*
