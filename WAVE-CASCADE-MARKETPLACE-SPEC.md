# WAVE CASCADE MARKETPLACE — PRODUCT SPECIFICATION

**Ello Cello LLC · MO§ES™ · CONFIDENTIAL**
**Version 0.1 · March 2026**

---

## 1. PRODUCT OVERVIEW

### What It Is

An open marketplace for startup products with an embedded transaction instrument.

Three layers operating as one platform:

1. **The List** — A free, open directory of startup products. Anyone can list. AI-assisted profiles. Community-curated. The traffic layer.

2. **The Cascade** — A configurable transaction instrument for scarce positions within products. Fixed supply, sequential wave pricing, transferable seats. The enforcement gate: if you want to transact on the platform, you use this structure.

3. **The Referral Network** — An affiliate layer where anyone earns commission by connecting buyers to products. No contracts, no exclusivity. Share a link, buyer converts, referrer gets paid.

### One-Line Pitch

The marketplace where startup products are listed, discovered, and capitalized — with a built-in instrument that lets any product sell scarce founding positions and any person earn money distributing them.

### What It Replaces

- Product Hunt → for discovery (but with a transaction layer)
- Republic/Wefunder → for capital formation (but without equity, SEC, or dilution)
- Crunchbase → for startup data (but with live economic activity instead of static profiles)
- Franchise brokers → for distribution (but automated through structure)
- Cold outreach / sales teams → for founder-carried distribution (eliminated by the instrument)

### What It Does NOT Do

- It does not sell equity or securities
- It does not guarantee product quality or delivery
- It does not replace the product itself — it distributes it
- It is not a blockchain or crypto instrument
- It is not exclusive — products can sell through other channels simultaneously

---

## 2. COMPONENT MAP

### 2.1 The List (Open Marketplace)

**Function:** Free directory of startup products. Top of funnel. Traffic generator.

**What a listing contains:**
- Product name, description, category, stage
- Founder / team info
- Links (website, demo, repo, socials)
- Media (screenshots, video, logo)
- Status indicators (active, pre-launch, funded, cascade-active)
- AI-generated summary (optional, auto-populated)
- Community signals (views, saves, referral activity)

**Who can list:** Anyone. Free. Self-service. No approval gate for basic listing.

**How it differs from Product Hunt:**
- No launch days, no upvote mechanics, no gamification
- Persistent listings (not time-decayed)
- Economic activity IS the engagement — no manufactured interaction needed
- Transaction layer built in (the cascade)
- Referral economics built in (affiliate links)

**Content sources:**
- Self-submitted by founders
- AI-generated from public data (Crunchbase, GitHub, ProductHunt, press)
- Community submissions (anyone can suggest a product for listing)
- Imported from existing databases (with founder claim/verify flow)

### 2.2 The Cascade (Transaction Instrument)

**Function:** Configurable instrument for selling scarce positions within a product.

**Two modes:**

**Mode A — Full Product Cascade (5-10% of products)**
For capacity-constrained products. The cascade IS the sales channel.
- Enterprise tools, API access, governance platforms, franchise rights
- Seats convey product access, licensing, or usage rights
- Price escalation across waves reflects real capacity scarcity
- Example: COMMAND — 17 seats across 5 waves, $65K–$390K

**Mode B — Lifetime Seat Cascade (available to 100% of products)**
For any product with a subscription model. A scarce tranche layered on top.
- 50–200 lifetime transferable seats alongside the existing pricing model
- One-time purchase replaces monthly subscription for that seat
- Seat is transferable — holder can sell the position if they leave
- Product keeps its free tier, its subscriptions, its existing distribution
- Example: A $29/mo SaaS with 100 lifetime founding seats at $500–$1,500

**Cascade configuration (per product):**
- Number of waves (2–10)
- Seats per wave
- Price per wave (manual or auto-escalation multiplier)
- Transfer rules (open, approval-required, locked for N days)
- Unlock conditions (wave opens when previous fills, or on date, or manual)
- Seat details (what the seat conveys — access, license, rights, perks)

**The Enforcement Gate:**
Any product can be listed for free (Layer 1). To activate the transaction layer — to let buyers commit capital — the product MUST use the cascade structure. The cascade is the only way to transact on the platform. This is not a restriction — it's the quality gate. The structure forces clarity: how many seats, what they cost, what they convey, what the waves look like.

### 2.3 The Referral Network (Distribution Layer)

**Function:** Anyone earns commission by connecting buyers to products.

**How it works:**
- Every product listing and every cascade has a shareable referral link
- Anyone can generate a referral link (account required)
- If a buyer transacts through that link, the referrer earns a cut
- Commission is a split of the platform's take (not an additional fee)
- Example: Platform takes 4% on a $5K seat = $200. Referrer gets 25% of platform take = $50.

**Who can be a referrer:**
- Anyone with an account
- No contracts, no exclusivity, no minimum activity
- Influencers, founders, random users, existing buyers
- A buyer who holds a seat can refer others — the holder IS the distribution channel

**What it is NOT:**
- Not an MLM or multi-level structure — one level only, direct referral
- Not exclusive — product can have unlimited referrers
- Not required — products function without any referral activity

### 2.4 Platform Infrastructure

**The website:**
- Public-facing marketplace (browse, search, filter, discover)
- Founder dashboard (manage listing, configure cascade, track activity)
- Buyer dashboard (view held seats, transfer history, saved products)
- Referrer dashboard (track links, conversions, earnings)
- Admin console (moderation, analytics, platform management)

**The cascade engine:**
- Registry configuration tool
- Visual seat board (real-time availability display)
- Wave management (open, close, pricing)
- Transfer processing
- Inquiry capture and routing

---

## 3. DATA MODEL

### 3.1 Core Objects

**Product**
```
product_id          unique identifier
name                product name
slug                URL-friendly name
description         short description (280 char)
long_description    full description (markdown)
category            enum (ai, saas, hardware, creator, enterprise, other)
stage               enum (concept, pre-launch, live, scaling)
website_url         external link
demo_url            optional
media               array of images/video
founder_id          link to founder account
status              enum (draft, listed, verified, cascade-active, suspended)
created_at          timestamp
updated_at          timestamp
```

**Founder**
```
founder_id          unique identifier
name                display name
email               contact email (private)
company_name        optional
bio                 short bio
website             optional
products            array of product_ids
verified            boolean
created_at          timestamp
```

**Cascade**
```
cascade_id          unique identifier
product_id          link to product
mode                enum (full_product, lifetime_seat)
total_seats         integer
waves               array of Wave objects
transfer_rules      TransferRules object
seat_description    what the seat conveys (text)
status              enum (draft, active, paused, completed)
created_at          timestamp
```

**Wave**
```
wave_id             unique identifier
cascade_id          link to cascade
wave_number         integer (sequential)
seats_available     integer
seats_claimed       integer
price               decimal (USD)
unlock_condition    enum (previous_filled, date, manual)
unlock_date         optional timestamp
status              enum (locked, active, filled)
```

**Seat**
```
seat_id             unique identifier
cascade_id          link to cascade
wave_id             link to wave
seat_number         integer (display position)
status              enum (available, inquiry, claimed, transferred)
holder_id           link to buyer account (null if available)
purchase_price      decimal
purchased_at        timestamp
transfer_count      integer (how many times transferred)
lineage             array of previous holder_ids
```

**Transfer**
```
transfer_id         unique identifier
seat_id             link to seat
from_holder_id      seller
to_holder_id        buyer
transfer_price      decimal
platform_fee        decimal
status              enum (initiated, pending, completed, disputed, cancelled)
initiated_at        timestamp
completed_at        timestamp
```

**Referral**
```
referral_id         unique identifier
referrer_id         link to user account
product_id          link to product
referral_code       unique string
clicks              integer
conversions         integer
earnings            decimal (total)
created_at          timestamp
```

**User** (unified account — can be founder, buyer, referrer, or all three)
```
user_id             unique identifier
email               unique
display_name        string
role_flags          array (founder, buyer, referrer)
payment_info        Stripe Connect ID or payout method
products_founded    array of product_ids
seats_held          array of seat_ids
referrals           array of referral_ids
created_at          timestamp
```

### 3.2 Object Relationships

```
User (1) -----> (many) Products      [as founder]
User (1) -----> (many) Seats         [as holder]
User (1) -----> (many) Referrals     [as referrer]
Product (1) --> (0-1)  Cascade       [optional transaction layer]
Cascade (1) --> (many) Waves         [sequential pricing tiers]
Wave (1) ----> (many)  Seats         [individual positions]
Seat (1) ----> (many)  Transfers     [ownership history / lineage]
```

### 3.3 State Machines

**Product Lifecycle:**
```
draft → listed → verified → cascade-active → [ongoing]
                                            → suspended (moderation)
```

**Seat Lifecycle:**
```
available → inquiry → claimed → [held]
                              → transferred → [held by new owner]
                              → transferred → transferred → ... (indefinite)
```

**Cascade Lifecycle:**
```
draft → active → [wave 1 active]
              → [wave 1 filled → wave 2 active]
              → [all waves filled → completed]
              → paused (founder choice)
```

---

## 4. USER JOURNEYS

### 4.1 Founder Journey

**Step 1: Sign Up**
- Create account (email + password or OAuth)
- Basic profile (name, company, bio)
- No payment info required to list

**Step 2: Create Product Listing**
- Fill in product details (name, description, category, links, media)
- AI assists: auto-generates description from website URL if provided
- Listing goes live immediately in draft or listed status
- FREE — no cost to list, no commitment

**Step 3: Optional — Activate Cascade**
- Choose mode: Full Product Cascade OR Lifetime Seats
- Configure: number of seats, waves, pricing, transfer rules
- Define what the seat conveys (access, license, perks — in plain language)
- Preview the visual board
- Activate — cascade goes live on the product listing

**Step 4: Receive Inquiries / Sales**
- Buyers submit inquiries or purchase directly (depending on configuration)
- Founder receives notification
- **Phase 1 (MVP): Bespoke — all transactions routed through platform admin (you)**
- **Phase 2: Self-service — Stripe Connect handles payment, founder receives funds minus platform fee**

**Step 5: Ongoing**
- Monitor cascade activity (which seats sold, which wave is active)
- Manage transfers (approve/deny if approval-required)
- Update product listing
- View referral activity on their product

**Decision Tree for Founders:**
```
Is your product capacity-constrained?
├── YES → Full Product Cascade (Mode A)
│         Configure waves to match real capacity
│         Price to reflect genuine scarcity
│
└── NO → Does your product have a subscription model?
         ├── YES → Lifetime Seat Cascade (Mode B)
         │         Keep subscriptions as-is
         │         Add 50-200 founding lifetime seats
         │         Price at 2-5x annual subscription cost
         │
         └── NO → Free listing only
                   Still discoverable, still referable
                   Cascade available when ready
```

### 4.2 Buyer Journey

**Step 1: Discover**
- Browse marketplace (no account required)
- Search by category, stage, price range
- See cascade boards on products that have them
- See real-time availability (seats remaining, current wave, pricing)

**Step 2: Evaluate**
- View product details, founder info, media
- View cascade details (what the seat conveys, wave pricing, transfer rules)
- See social signals (referral activity, views, other buyer activity)

**Step 3: Express Interest**
- **Phase 1 (MVP): Submit inquiry form (name, email, message)**
  - Routed to platform admin for bespoke handling
  - Admin coordinates terms, handles payment manually
  - Seat marked as "inquiry" then "claimed" upon completion
- **Phase 2: Create account → Purchase directly**
  - Account required to transact (email + payment method)
  - Stripe checkout for seat purchase
  - Seat immediately assigned to buyer account
  - Confirmation with seat details, certificate, and transfer rights

**Step 4: Hold**
- Seat appears in buyer dashboard
- Buyer receives whatever the seat conveys (access, license, perks)
- Buyer can generate referral links for the product they hold
- Buyer sees transfer value (what similar seats have transferred for)

**Step 5: Transfer (optional)**
- Buyer initiates transfer
- Sets transfer price (or negotiates with recipient)
- **Phase 1: Bespoke — admin coordinates transfer**
- **Phase 2: Platform handles escrow, fee collection, ownership update**
- Lineage updates — seat tracks all previous holders

### 4.3 Referrer Journey

**Step 1: Sign Up**
- Create account (same unified account)
- No special onboarding — any user is a potential referrer

**Step 2: Generate Links**
- Browse marketplace, find products worth sharing
- Generate unique referral link for any product
- Share via any channel (social, email, DM, blog, video)

**Step 3: Earn**
- Buyer clicks link, eventually transacts
- Attribution tracked (cookie/link-based)
- Commission calculated as % of platform's take
- Payout via Stripe Connect or platform balance
- **Phase 1: Manual payout tracking**
- **Phase 2: Automated payout on transaction completion**

**Step 4: Track**
- Referrer dashboard: clicks, conversions, earnings per product
- No minimum threshold initially (revisit as volume scales)

### 4.4 Platform Admin Journey (You, Phase 1)

**Bespoke Operations (until self-service is funded):**
- Review and approve listings (moderation)
- Handle all cascade inquiries manually
- Coordinate payment for seat purchases
- Process transfers between holders
- Track referral attributions and payouts
- Manage the list (remove dead products, flag suspicious listings)
- Generate AI-assisted product profiles for bulk onboarding

**What This Looks Like Day-to-Day:**
- Email notifications for new listings and inquiries
- Spreadsheet or simple admin panel for tracking seats and payments
- Manual Stripe invoicing for seat purchases
- Manual email coordination for transfers
- Weekly review of new listings for quality/fraud

---

## 5. SITE ARCHITECTURE

### 5.1 Public Pages

```
/                       Homepage — featured products, categories, live cascades
/browse                 Full marketplace directory with search/filter
/browse/:category       Category view (ai, saas, hardware, creator, etc.)
/product/:slug          Product detail page
/product/:slug/cascade  Cascade board (if active) — visual seat display
/about                  Platform explanation
/for-founders           Landing page for founders (why list, how cascade works)
/for-buyers             Landing page for buyers (what seats are, how transfers work)
```

### 5.2 Authenticated Pages

```
/dashboard              Unified dashboard (context-sensitive to user's roles)
/dashboard/products     Founder: manage listings
/dashboard/products/:id Founder: edit product, manage cascade
/dashboard/seats        Buyer: view held seats, transfer options
/dashboard/referrals    Referrer: links, clicks, conversions, earnings
/dashboard/settings     Account settings, payment info, profile
```

### 5.3 Admin Pages

```
/admin                  Platform overview (listings, transactions, revenue)
/admin/listings         Review queue, moderation actions
/admin/cascades         Active cascades, seat status across platform
/admin/transfers        Transfer activity, dispute queue
/admin/referrals        Referral tracking, payout queue
/admin/users            User management
```

### 5.4 Security Requirements

- **Authentication:** Email/password + OAuth (Google, GitHub). JWT or session-based.
- **Authorization:** Role-based (founder, buyer, referrer, admin). Users can hold multiple roles.
- **Payment data:** Never stored on platform. Stripe handles all payment processing.
- **Personal data:** Email addresses private by default. Display names public.
- **Rate limiting:** On inquiry forms, account creation, referral link generation.
- **HTTPS:** Mandatory. No exceptions.
- **Input validation:** All user-submitted content sanitized. Markdown rendered safely.

---

## 6. THE CASCADE — DETAILED MECHANICS

### 6.1 Configuration

When a founder activates a cascade, they configure:

| Parameter | Options | Default |
|-----------|---------|---------|
| Mode | full_product / lifetime_seat | — (required) |
| Total seats | 5–1000 | — (required) |
| Number of waves | 2–10 | 3 |
| Seats per wave | Manual allocation | Equal distribution |
| Price per wave | Manual per wave | — (required) |
| Auto-escalation | None / 1.5x / 2x / custom | None |
| Transfer allowed | Yes / No | Yes |
| Transfer approval | Open / Founder-approved | Open |
| Transfer lockup | None / 30 days / 90 days / custom | None |
| Wave unlock | When previous fills / On date / Manual | Previous fills |
| Seat description | Free text | — (required) |

### 6.2 Visual Board

The cascade displays as a visual board on the product page:

- Grid of seats organized by wave
- Color-coded: available (open), claimed (filled), current wave (highlighted)
- Price displayed per wave
- Real-time updates (no page refresh needed)
- Scarcity visible — buyers see exactly how many remain

### 6.3 Transfer Mechanics

**When a seat transfers:**
1. Holder initiates transfer from dashboard
2. Holder sets asking price (or transfers at fixed price / gift)
3. If approval-required: founder reviews and approves/denies
4. Buyer (transferee) pays transfer price
5. Platform collects transfer fee (1-2% of transfer price)
6. Referrer gets cut if applicable
7. Remaining funds go to seller (previous holder)
8. Seat ownership updates in database
9. Lineage array appends new holder
10. Transfer record created

### 6.4 Fee Structure

| Transaction Type | Platform Fee | Referrer Cut | Founder Cut |
|-----------------|-------------|-------------|-------------|
| Primary sale (seat purchase) | 3-5% | 0.5-1% (of platform take) | Remainder to founder |
| Transfer (secondary sale) | 1-2% | 0.5% (of platform take) | 0% (goes to seller/holder) |
| Listing | Free | — | — |
| Referral link generation | Free | — | — |

---

## 7. RED FLAGS — ITEMS FOR DISCUSSION

These are not blockers. They are decisions that need to be made before code is written.

### 🔴 7.1 Moderation / Anti-Fraud ("Regulating Bullshit")

**The problem:** An open marketplace attracts garbage. Fake products, vaporware, scam listings, founders who disappear after seats sell.

**Questions to resolve:**

1. **Listing approval:** Is every listing auto-published, or does it go through review?
   - Option A: Auto-publish, flag via community reports → Lower friction, higher garbage
   - Option B: Manual review before publish → Higher quality, doesn't scale
   - Option C: Auto-publish for basic listing, manual review to activate cascade → Best of both: the list is open, the transaction layer is gated
   - **Recommended: Option C** — anyone can list, but money only moves through reviewed products

2. **Cascade verification:** Before a founder can sell seats, what do they prove?
   - Product exists (live URL, demo, or proof of concept)
   - Founder identity verified (linked accounts, ID check, or just email verify?)
   - Seat description is honest (what they're selling is what exists)
   - How deep does this go? KYC-level? Or lightweight?

3. **Post-sale accountability:** What happens when a founder sells seats and then the product dies?
   - The seat conveyed what it conveyed at time of sale — caveat emptor?
   - Platform offers dispute process?
   - Escrow period where funds are held before release?
   - This is the biggest reputational risk — one bad outcome early kills trust

4. **Community policing:** Do users flag listings? Downvote? Report?
   - Minimal: report button → admin queue
   - Medium: community ratings/reviews on products and founders
   - Heavy: trust scores, reputation systems, verified badges
   - **Recommended: Start minimal. Report button + admin review. Add layers as needed.**

5. **What gets removed:**
   - Obvious scams, fake products, impossible claims
   - Products with no evidence of existence
   - Founders who don't respond to buyer inquiries
   - Anything that looks like a security (investment return promises)
   - Hate speech, illegal content (obvious)

### 🔴 7.2 Transfer Mechanics

**The problem:** Transfers involve money changing hands between two parties. Things go wrong. Disputes happen. This is where the platform's liability surface gets real.

**Questions to resolve:**

1. **Escrow:** Should the platform hold funds during transfer?
   - Without escrow: buyer pays seller directly, platform takes fee, high fraud risk
   - With escrow: platform holds funds until both parties confirm → much safer, much more complex
   - Stripe Connect supports escrow-like flows (connected accounts + delayed payouts)
   - **Recommended: Escrow from Day 1 of self-service. Phase 1 bespoke handles this naturally (you are the escrow).**

2. **Disputes:** What happens when a transfer goes wrong?
   - Buyer claims seller misrepresented the seat
   - Seller claims buyer didn't pay (handled if escrow exists)
   - Founder revokes access after transfer (breach of seat terms)
   - **Need: Clear terms of transfer, dispute resolution process, and a decision on who bears the risk**

3. **Transfer pricing:** Who sets the price?
   - Seller sets asking price (open market)
   - Platform suggests price based on wave history
   - Maximum markup allowed? (anti-speculation measure)
   - No cap? (let market decide)
   - **This is where the "not securities" distinction matters — if seats routinely appreciate 10x and people buy to flip, it starts to look like an investment contract**

4. **Founder consent:** Can founders block transfers?
   - Yes: founder-approved transfers protect product quality but add friction
   - No: open transfers maximize liquidity but founder loses control
   - Configurable per cascade (already in the data model)

### 🔴 7.3 Legal Surface Area

**The problem:** The platform facilitates financial transactions between parties. This creates legal obligations regardless of whether the product is "regulated."

**Questions to resolve:**

1. **Platform vs. marketplace distinction:**
   - Marketplace (eBay model): platform facilitates, doesn't guarantee. Seller and buyer assume risk.
   - Platform (Amazon model): platform takes more responsibility for quality, fulfillment, disputes.
   - **Recommended: Marketplace model. Platform provides the venue and the instrument. Founder delivers the product. Buyer accepts the terms. Platform is not a party to the transaction — it processes it.**
   - This needs to be crystal clear in the Terms of Service.

2. **"Not a security" language:**
   - Seats must convey utility (product access, license, perks), not investment return
   - Marketing cannot reference appreciation, return on investment, or financial upside
   - Transfer feature is for convenience (life changes, pivots), not for speculation
   - **Need: Legal review of ToS language before cascade goes live to general public**
   - **Current COMMAND registry is bespoke and private — lower risk. Public marketplace is higher risk.**

3. **Terms of Service requirements:**
   - What the platform is and isn't
   - Platform's role as marketplace, not seller
   - Founder's obligations when selling seats
   - Buyer's rights and limitations
   - Transfer terms and dispute process
   - Fee disclosures
   - Limitation of liability
   - **Need: Actual legal counsel for ToS drafting. Template is not sufficient for a platform handling real money.**

4. **International considerations:**
   - If a founder in Germany sells a seat to a buyer in Japan, whose law governs?
   - **Recommended: Start US-only. Expand jurisdiction when revenue justifies legal overhead.**

### 🔴 7.4 Payment Infrastructure

**The problem:** Money moves in multiple directions — from buyers to founders, from buyers to previous holders (transfers), from platform to referrers. This needs robust payment rails.

**Questions to resolve:**

1. **Stripe Connect:**
   - Standard for marketplace payments — handles multi-party transactions
   - Platform collects, splits, and distributes in one flow
   - Founders and referrers connect their Stripe accounts for payouts
   - Handles international payouts (when ready)
   - **This is the recommended solution, but requires Stripe approval for the platform model**

2. **Phase 1 (bespoke) payment flow:**
   - Buyer inquires → admin coordinates → manual Stripe invoice or wire
   - Funds received by Ello Cello LLC → founder paid manually minus platform fee
   - This works for 1-50 transactions but does not scale
   - **Acceptable for MVP. Must automate before volume exceeds manageable threshold.**

3. **Fee splitting:**
   - Primary sale: Buyer pays $5,000 → Platform takes 4% ($200) → Referrer gets 25% of platform take ($50) → Founder receives $4,800
   - Transfer: Buyer pays $6,000 → Platform takes 1.5% ($90) → Referrer gets $22.50 → Seller receives $5,910
   - All of this needs to be calculated, disclosed, and processed correctly
   - **Stripe Connect handles the math, but the fee structure must be defined and displayed clearly**

4. **Payout timing:**
   - Immediate payout? (risky for disputes)
   - 7-day hold? 14-day hold?
   - Escrow until buyer confirms receipt of seat benefits?
   - **Recommended: 7-day hold on primary sales. Immediate release on transfers if escrow was used.**

---

## 8. PHASED BUILD PLAN

### Phase 0 — NOW (No Code Required)

**What exists:**
- COMMAND cascade registry (built, functional UI)
- MO§ES™ landing page
- Brand assets (logo, identity system)

**What to do:**
- Wire up COMMAND inquiry form (SEAT-REGISTRY-FIX.md — already delivered)
- Close first COMMAND seat manually
- Validate cascade mechanics with real money on a real product
- Document learnings before building marketplace

### Phase 1 — MVP Marketplace (Weeks 1-6)

**Build:**
- Public marketplace with product listings
- Founder sign-up and product creation flow
- Basic search/browse/filter
- Cascade configuration tool (extract from COMMAND)
- Visual seat board on product pages
- Inquiry form on cascade-active products
- Admin dashboard for managing listings and inquiries
- Referral link generation and tracking (basic)

**DO NOT build yet:**
- Self-service payments (you are the payment processor in Phase 1)
- Automated transfers
- Referral payouts
- Advanced moderation tools

**Revenue in Phase 1:** Manual. You coordinate every transaction. You are the escrow, the payment processor, and the moderator. This is the advantage — you learn every friction point firsthand.

### Phase 2 — Self-Service (Weeks 7-16)

**Build:**
- Stripe Connect integration
- Automated seat purchase flow
- Buyer accounts and dashboard
- Transfer initiation and processing
- Escrow for transfers
- Automated referral tracking and payouts
- Notification system (email — seat sold, transfer initiated, wave opened)
- Moderation tools (report, flag, review queue)

**Revenue in Phase 2:** Automated. Platform fee collected on every transaction. Referrer payouts processed. Your operational overhead drops to moderation and growth.

### Phase 3 — Scale (Weeks 17-30)

**Build:**
- Marketplace discovery features (trending, new, closing soon)
- Secondary market view (seats available for transfer across all products)
- API for external integrations
- Advanced analytics for founders (conversion, referral performance)
- Community features (reviews, ratings, founder verification badges)
- Embed system (cascade widget for founder's own website)

### Phase 4 — Expansion

**Build:**
- Category expansion (real estate model for agent distribution — if validated)
- White-label cascade for enterprise clients
- Public API marketplace
- Advisory/intelligence layer (pricing insights, market data)
- Template library (pre-configured cascade templates by industry)

---

## 9. TECHNICAL REQUIREMENTS (Pre-Code)

### Recommended Stack

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| Frontend | Next.js (React) | SSR for SEO, React ecosystem, existing cascade UI is React |
| Database | PostgreSQL | Relational data model, ACID for financial transactions |
| Auth | Clerk or Auth0 | OAuth + email, role management, minimal build |
| Payments | Stripe Connect | Multi-party marketplace payments, escrow capability |
| Hosting | Vercel or Railway | Quick deploy, scales with traffic |
| Search | Algolia or Meilisearch | Fast product search/filter |
| Email | Resend or Postmark | Transactional email (notifications, confirmations) |
| File storage | S3 / Cloudflare R2 | Product media (images, logos) |
| Analytics | PostHog or Mixpanel | User behavior, funnel tracking |

### What Already Exists (Reusable)

- Cascade UI (COMMAND registry — React, visual board, seat data model)
- Landing page design system (mos2es.io — design language, components)
- Brand assets (logo, typography, color system)
- Inquiry form logic (with Formspree fix delivered)

### What Must Be Built From Scratch

- Marketplace listing system (product CRUD, search, browse)
- User accounts and authentication
- Founder dashboard
- Buyer dashboard
- Referral link system and tracking
- Admin dashboard
- Stripe Connect integration
- Transfer processing
- Notification system

---

## 10. SUCCESS METRICS

### Phase 1 Targets (First 90 Days)

- 100 product listings (open marketplace)
- 5 cascade-active products (including COMMAND)
- 1 completed seat sale (COMMAND or other)
- 10 active referral links generated
- 500 monthly unique visitors

### Phase 2 Targets (6 Months)

- 1,000 product listings
- 50 cascade-active products
- 25 completed seat sales
- $100K in GMV flowing through platform
- $4K in platform revenue
- 100 active referrers

### Year 1 Target

- 5,000 listings
- 200 cascade-active products
- $500K in GMV
- $25K in platform revenue
- Proof that the flywheel works: listings attract buyers, buyers attract founders, referrers accelerate both

---

*This document is Version 0.1. Red flags in Section 7 require resolution before Phase 2 build. Phase 1 MVP can proceed with bespoke operations covering the gaps.*

*CONFIDENTIAL — Ello Cello LLC — MO§ES™ pending trademark — Wave Cascade patent pending*
