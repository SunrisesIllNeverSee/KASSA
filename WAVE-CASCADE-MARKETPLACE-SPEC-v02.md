# KA§§A — PRODUCT SPECIFICATION

**Ello Cello LLC · KA§§A powered by MO§E§™ · CONFIDENTIAL**
**Version 0.3 · March 2026**
**Updated: Red flag resolution + KA§§A brand lock**

---

## 1. PRODUCT OVERVIEW

### What It Is

An open marketplace for startup products with an embedded transaction instrument.

Three layers operating as one platform:

1. **The List** — A free, open directory of startup products. Anyone can list. AI-assisted profiles. Founder-interviewed. The traffic layer.

2. **The Cascade** — A configurable transaction instrument for scarce positions within products. Fixed supply, sequential wave pricing, transferable seats. The enforcement gate: if you want to transact on the platform, you use this structure. Platform only facilitates the initial sale — all post-sale terms (transfer, return, resale) are set and managed by the founder.

3. **The Referral Network** — An affiliate layer where anyone earns commission by connecting buyers to products. No contracts, no exclusivity. Share a link, buyer converts, referrer gets paid. Commission comes from the platform's cut, not the founder's.

### One-Line Pitch

KA§§A is the marketplace where startup products are listed, discovered, and capitalized — with a built-in instrument that lets any product sell scarce founding positions and any person earn money distributing them. Powered by MO§E§™.

### What It Replaces

- Product Hunt → for discovery (but with a transaction layer)
- Republic/Wefunder → for capital formation (but without equity, SEC, or dilution)
- Crunchbase → for startup data (but with live economic activity instead of static profiles)
- Franchise brokers → for distribution (but automated through structure)
- Cold outreach / sales teams → for founder-carried distribution (eliminated by the instrument)

### What It Does NOT Do

- It does not sell equity or securities — seats are product licenses with optional resale rights
- It does not guarantee product quality or delivery — buyers do their own diligence
- It does not process secondary/transfer transactions — founder manages post-sale terms
- It does not replace the product itself — it distributes it
- It is not a blockchain or crypto instrument
- It is not exclusive — products can sell through other channels simultaneously
- It does not facilitate or encourage speculation — it sells product access

### Brand Stack

**MO§E§™** — The constitutional AI governance framework. The manifesto. The rules engine.
**KA§§A** — The marketplace. The operative. The forward-facing product.
**COMMAND** — The first product listed on KA§§A. The proof of concept.

The § symbol is the visual throughline connecting the framework to the marketplace.

### Core Design Principles

1. **KA§§A is a list.** The most basic data structure. Easy to build, easy to maintain, never needs gimmicks.
2. **The cascade is the cash register.** The list is free. The instrument is how money moves.
3. **Price is the quality gate.** At $500+ per seat, buyers self-moderate. No one impulse-buys a product license.
4. **One seat per person.** Structural firewall against speculation and accumulation.
5. **Platform owns the first sale only.** Everything after — transfer, return, resale — is the founder's domain.
6. **Zero risk to deploy.** Founders list free. Cascade costs nothing to configure. Platform earns only when money moves.

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

**Who can list:** Any founder who passes the interview/evaluation process.

**How it differs from Product Hunt:**
- No launch days, no upvote mechanics, no gamification
- Persistent listings (not time-decayed)
- Economic activity IS the engagement — no manufactured interaction needed
- Transaction layer built in (the cascade)
- Referral economics built in (affiliate links)
- Never needs to be gimmicky because the economic activity sustains itself

**Content sources:**
- Self-submitted by founders (after interview/eval)
- AI-generated from public data (Crunchbase, GitHub, ProductHunt, press) — founder claims and verifies
- Community submissions (anyone can suggest a product for listing — founder must claim)

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
- Post-sale terms (transfer, return, resale) set entirely by founder
- Product keeps its free tier, its subscriptions, its existing distribution
- Example: A $29/mo SaaS with 100 lifetime founding seats at $500–$1,500

**Cascade configuration (per product):**
- Number of waves (2–10)
- Seats per wave
- Price per wave (manual or auto-escalation multiplier)
- Seat limit per buyer: ONE (hardcoded, not configurable)
- Unlock conditions (wave opens when previous fills, or on date, or manual)
- Seat description: what the seat conveys (access, license, rights, perks — plain language)
- Post-sale terms: what happens after purchase (founder-defined text describing transfer/return/resale policy)

**The Enforcement Gate:**
Any product can be listed for free (Layer 1). To activate the transaction layer — to let buyers commit capital — the product MUST use the cascade structure. The cascade is the only way to transact on the platform. This is not a restriction — it's the quality gate. The structure forces clarity: how many seats, what they cost, what they convey, what the waves look like.

**Platform's role ends at first sale:**
- Platform processes the initial purchase
- Platform collects its fee
- Platform releases funds to founder after escrow hold
- Everything after that — transfers, returns, resale terms — is between the founder and the seat holder
- Platform does NOT track secondary transactions, does NOT process resale payments, does NOT arbitrate post-sale disputes

### 2.3 The Referral Network (Distribution Layer)

**Function:** Anyone earns commission by connecting buyers to products.

**How it works:**
- Every product listing and every cascade has a shareable referral link
- Anyone can generate a referral link (account required)
- If a buyer transacts through that link, the referrer earns a cut
- Commission is a split of the platform's take (not an additional fee to buyer or founder)
- Example: Platform takes 4% on a $5K seat = $200. Referrer gets 25% of platform take = $50. Founder receives full $4,800.

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
- Founder dashboard (manage listing, configure cascade, track sales)
- Buyer dashboard (view held seats, saved products)
- Referrer dashboard (track links, conversions, earnings)
- Admin console (moderation, founder eval queue, analytics)

**The cascade engine:**
- Registry configuration tool
- Visual seat board (real-time availability display)
- Wave management (open, close, pricing)
- Inquiry capture and routing
- Escrow management (hold period tracking)

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
stage               enum (pre-launch, live, scaling)
website_url         external link (REQUIRED — must be live)
demo_url            optional
media               array of images/video
founder_id          link to founder account
eval_status         enum (pending, interviewed, approved, rejected)
listing_status      enum (draft, listed, cascade-active, suspended)
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
eval_date           timestamp of interview/evaluation
eval_notes          admin notes (private)
verified            boolean
created_at          timestamp
```

**Cascade**
```
cascade_id          unique identifier
product_id          link to product
mode                enum (full_product, lifetime_seat)
total_seats         integer
seat_limit_per_user 1 (hardcoded)
waves               array of Wave objects
seat_description    what the seat conveys (text)
post_sale_terms     founder-defined text (transfer/return/resale policy)
escrow_days         integer (14-30, platform-set)
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
status              enum (available, inquiry, claimed)
holder_id           link to buyer account (null if available)
purchase_price      decimal
purchased_at        timestamp
escrow_status       enum (held, released)
escrow_release_date timestamp
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

**Transaction**
```
transaction_id      unique identifier
seat_id             link to seat
buyer_id            link to user
founder_id          link to user
amount              decimal (total paid by buyer)
platform_fee        decimal
referrer_fee        decimal (from platform's cut)
founder_payout      decimal
escrow_status       enum (held, released, refunded)
stripe_payment_id   Stripe reference
created_at          timestamp
released_at         timestamp
```

**User** (unified account — can be founder, buyer, referrer, or all three)
```
user_id             unique identifier
email               unique
display_name        string
role_flags          array (founder, buyer, referrer)
stripe_connect_id   for receiving payouts (founders, referrers)
stripe_customer_id  for making payments (buyers)
products_founded    array of product_ids
seats_held          array of seat_ids
referrals           array of referral_ids
created_at          timestamp
```

### 3.2 Object Relationships

```
User (1) -----> (many) Products        [as founder]
User (1) -----> (many) Seats           [as holder, max 1 per cascade]
User (1) -----> (many) Referrals       [as referrer]
Product (1) --> (0-1)  Cascade         [optional transaction layer]
Cascade (1) --> (many) Waves           [sequential pricing tiers]
Wave (1) ----> (many)  Seats           [individual positions]
Seat (1) ----> (1)     Transaction     [purchase record]
Transaction --> (0-1)  Referral        [if referred]
```

### 3.3 State Machines

**Product Lifecycle:**
```
[founder applies] → pending eval → interviewed → approved → listed → cascade-active
                                                          → listed (no cascade)
                                 → rejected (with feedback)

[moderation action] → any state → suspended
```

**Seat Lifecycle:**
```
available → inquiry → claimed (escrow held) → claimed (escrow released) → [DONE - platform's role ends]
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

**Step 1: Apply**
- Create account (email + password or OAuth)
- Basic profile (name, company, bio)
- Submit product for evaluation (name, URL, description, what seats would convey)

**Step 2: Interview/Evaluation**
- Platform admin (Luthen) reviews submission
- Short interview — async or live (15 min)
- Verify: product is real (live URL), founder is real (identity check), seat description makes sense
- Approved → product listed. Rejected → feedback provided, can reapply.

**Step 3: Product Goes Live**
- Listing appears in marketplace directory
- Discoverable via browse, search, category
- Free — no cost, no commitment

**Step 4: Optional — Activate Cascade**
- Choose mode: Full Product Cascade OR Lifetime Seats
- Configure: number of seats, waves, pricing
- Define seat description (what buyer gets)
- Define post-sale terms (what happens with transfer/return/resale — founder's rules)
- Preview the visual board
- Activate — cascade goes live on the product listing

**Step 5: Receive Sales**
- Buyers submit inquiries or purchase through cascade
- **Phase 1 (MVP): All transactions bespoke — admin coordinates payment**
- **Phase 2: Stripe Connect — buyer pays, platform holds escrow, founder receives after hold**
- Founder receives funds minus platform fee after escrow period

**Step 6: Post-Sale (Founder's Domain)**
- Founder delivers what the seat conveys (product access, license, perks)
- Founder manages any seat-related activity per their own post-sale terms
- Platform has no further involvement in the seat

**Decision Tree for Founders:**
```
Does your product exist and function?
├── NO → Not eligible. Build it first. Come back.
│
└── YES → Apply for evaluation
          │
          ├── Approved → Listed on marketplace (free)
          │              │
          │              ├── Want to sell seats? → Configure cascade
          │              │   ├── Capacity-constrained? → Mode A (Full Product)
          │              │   └── Subscription model?   → Mode B (Lifetime Seats)
          │              │
          │              └── Just want visibility? → Free listing only
          │
          └── Not approved → Feedback provided, reapply when ready
```

### 4.2 Buyer Journey

**Step 1: Discover**
- Browse marketplace (no account required)
- Search by category, stage, price range
- See cascade boards on products that have them
- See real-time availability (seats remaining, current wave, pricing)

**Step 2: Evaluate**
- View product details, founder info, media
- Visit the actual product (live URL provided)
- Read seat description (what you get) and post-sale terms (what happens after)
- The product is right there — click it, try it, form your own opinion

**Step 3: Purchase**
- **Phase 1 (MVP): Submit inquiry form → admin coordinates bespoke transaction**
- **Phase 2: Create account → Stripe checkout → seat assigned**
- One seat per person per cascade (enforced)
- Funds enter escrow (14-30 days)

**Step 4: Receive**
- Seat confirmed in buyer dashboard
- Founder delivers what the seat conveys
- Escrow releases to founder after hold period (unless dispute raised during hold)

**Step 5: Hold**
- Seat is yours
- What you do with it after purchase is governed by the founder's post-sale terms
- Platform's involvement is complete

### 4.3 Referrer Journey

**Step 1: Sign Up**
- Create account (same unified account)
- No special onboarding — any user is a potential referrer

**Step 2: Generate Links**
- Browse marketplace, find products worth sharing
- Generate unique referral link for any product
- Share via any channel (social, email, DM, blog, video)

**Step 3: Earn**
- Buyer clicks link and eventually purchases a seat
- Attribution tracked (cookie/link-based)
- Commission calculated as percentage of platform's take
- **Phase 1: Manual payout tracking**
- **Phase 2: Automated payout on escrow release**

**Step 4: Track**
- Referrer dashboard: clicks, conversions, earnings per product

### 4.4 Platform Admin Journey (Luthen, Phase 1)

**Daily operations:**
- Review founder applications (evaluate, interview, approve/reject)
- Process seat purchase inquiries (coordinate payment, assign seat)
- Maintain the list (remove dead products, flag broken URLs, respond to reports)
- Track referral attributions manually
- Monitor escrow holds and releases

**Weekly operations:**
- Review platform analytics (listings, traffic, conversions)
- Process referrer payouts
- AI-assisted product profile generation for bulk onboarding

**What this looks like practically:**
- Email notifications for new applications and inquiries
- Simple admin panel or spreadsheet for tracking
- Stripe invoicing for seat purchases
- 2-5 hours/week in Phase 1 at low volume

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
/for-founders           Landing page: why list, how cascade works, apply
/for-buyers             Landing page: what seats are, how purchasing works
```

### 5.2 Authenticated Pages

```
/dashboard              Unified dashboard (context-sensitive to user's roles)
/dashboard/products     Founder: manage listings
/dashboard/products/:id Founder: edit product, configure/manage cascade
/dashboard/seats        Buyer: view held seats
/dashboard/referrals    Referrer: links, clicks, conversions, earnings
/dashboard/settings     Account settings, payment info, profile
```

### 5.3 Admin Pages

```
/admin                  Platform overview (listings, transactions, revenue)
/admin/applications     Founder eval queue (pending interviews)
/admin/listings         Active listings, moderation actions
/admin/cascades         Active cascades, seat status, escrow tracking
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
- **One-seat-per-person enforcement:** Checked at purchase time against user_id + cascade_id. Cannot be bypassed without multiple accounts (address via ToS, not code — eBay has the same constraint and manages it fine).

---

## 6. THE CASCADE — DETAILED MECHANICS

### 6.1 Configuration

When a founder activates a cascade, they configure:

| Parameter | Options | Default |
|-----------|---------|---------|
| Mode | full_product / lifetime_seat | — (required) |
| Total seats | 5–1000 | — (required) |
| Seat limit per buyer | 1 | 1 (hardcoded, not configurable) |
| Number of waves | 2–10 | 3 |
| Seats per wave | Manual allocation | Equal distribution |
| Price per wave | Manual per wave | — (required) |
| Auto-escalation | None / 1.5x / 2x / custom | None |
| Wave unlock | When previous fills / On date / Manual | Previous fills |
| Seat description | Free text: what buyer receives | — (required) |
| Post-sale terms | Free text: founder's rules for after purchase | — (required) |

### 6.2 Visual Board

The cascade displays as a visual board on the product page:

- Grid of seats organized by wave
- Color-coded: available (open), claimed (filled), current wave (highlighted)
- Price displayed per wave
- Real-time updates (no page refresh needed)
- Scarcity visible — buyers see exactly how many remain

### 6.3 Fee Structure

| Item | Fee | Who Pays | Who Receives |
|------|-----|----------|-------------|
| Listing | Free | — | — |
| Cascade activation | Free | — | — |
| Referral link generation | Free | — | — |
| Seat purchase | 3-5% of purchase price | Deducted from payment | Platform |
| Referrer commission | 25% of platform's fee | From platform's cut | Referrer |
| Founder payout | Purchase price minus platform fee | — | Founder (after escrow) |

**Example on a $1,000 seat with referral:**
- Buyer pays: $1,000
- Platform fee (4%): $40
- Referrer commission (25% of $40): $10
- Platform net: $30
- Founder receives: $960 (after escrow hold)

### 6.4 Escrow

- All seat purchases enter escrow for 14-30 days (platform-configured)
- During escrow: funds held by platform (Stripe delayed payout)
- After escrow period: funds automatically released to founder
- Dispute during escrow: admin reviews, can refund buyer if product verified as non-existent or fundamentally misrepresented
- After escrow release: transaction is final, platform's involvement ends

---

## 7. RESOLVED FLAGS — DECISION LOG

### ✅ 7.1 Securities / Howey Test — RESOLVED: NOT A SECURITY

**Discussion summary:**

The cascade was initially flagged as a potential securities risk under the Howey test (investment of money, in a common enterprise, with expectation of profits, from efforts of others). Analysis concluded the instrument fails multiple prongs:

**Prong 2 (common enterprise) — broken by product verification.** Seats convey access to a product that exists NOW. No product, no seat. This is a purchase, not an investment in a future venture. The product is verified live before cascade activation.

**Prong 3 (expectation of profits) — broken by one-seat-per-person limit.** Buyers cannot accumulate positions to speculate. One seat per person is a structural firewall. At this constraint, the buyer is a user, not a trader. The price point ($500+) further self-selects for genuine product interest, not speculation.

**Prong 4 (efforts of others) — weakened by utility framing.** The seat conveys product access, not a share of future enterprise value. The product exists independently. Value is in the utility, not in the founder's future work.

**The platform is a list with a purchase mechanism.** It is structurally equivalent to eBay, Facebook Marketplace, or Craigslist. Products are listed. Buyers buy. What buyers do with their purchase afterward is their own business — the platform does not facilitate, track, or encourage resale.

**Language controls:** Listing guidelines prohibit investment-return language ("buy now, sell later for profit"). Automated keyword flagging for terms like "return," "investment," "appreciation." Founders who market seats as investments are removed from the platform. The platform's own marketing and UI never reference financial upside.

**If buyers treat seats as investments, that is their choice and their risk.** The platform sells product access. Period.

**Status: CLOSED. No dealbreaker. No legal counsel required before Phase 1 (bespoke). Legal review recommended before Phase 2 (self-service) for ToS language.**

---

### ✅ 7.2 Moderation / Anti-Fraud — RESOLVED: FOUNDER INTERVIEW + PRICE GATE

**Discussion summary:**

Initial concern was that an open marketplace would attract garbage — fake products, vaporware, scam listings.

**Resolution: The price IS the moderation.** At $500+ per seat, nobody impulse-buys. Buyers do their own diligence. They check the website, try the product, research the founder. The purchase threshold self-selects for serious buyers evaluating real products.

**Founder interview/evaluation is the quality gate.** Every founder goes through a review before their product is listed. In Phase 1 this is a personal interview with Luthen. The product must be live (functioning URL). The founder must be real. The seat description must be honest. This doesn't scale to 10,000 founders — it doesn't need to. By that volume, revenue funds scaling the eval process.

**Post-evaluation moderation is list hygiene.** Remove spam. Flag dead URLs. Boot founders who submitted fake products. Community report button sends issues to admin queue. No trust scores, no reputation systems, no complex moderation tooling. Basic list maintenance.

**If a founder sells seats and the product later dies:** Seats convey what they conveyed at time of sale. The escrow window (14-30 days) catches immediate fraud. Beyond that, the buyer accepted the risk. This is a product purchase — products sometimes fail. The platform is not an insurance policy.

**Status: CLOSED. Founder eval + price gate + escrow window. No heavy moderation infrastructure needed.**

---

### ✅ 7.3 Transfer Mechanics — RESOLVED: NOT THE PLATFORM'S PROBLEM

**Discussion summary:**

Transfer/secondary market was initially flagged as requiring escrow, dispute resolution, pricing controls, and founder consent mechanisms — adding massive complexity.

**Resolution: Platform only owns the first sale.** After the initial purchase, the seat is in the founder's ecosystem. Founder sets post-sale terms (transfer allowed? return policy? resale rules?) in the cascade configuration. Whatever happens after purchase is between the founder and the seat holder.

The platform does NOT:
- Process secondary transactions
- Track transfer pricing or history
- Build a secondary marketplace
- Arbitrate post-sale disputes
- Take fees on transfers

This eliminates ~60% of the originally specced complexity. No transfer escrow. No dispute resolution for resales. No secondary market payment rails. No price tracking or appreciation signals.

If the transfer/secondary market becomes valuable later, it can be built as a separate layer — or left to a third party. The core platform works without it.

**Status: CLOSED. Entire transfer section removed from platform scope. Founder manages post-sale terms.**

---

### ✅ 7.4 Payment Infrastructure — RESOLVED: SINGLE-DIRECTION STRIPE FLOW

**Discussion summary:**

With transfer mechanics removed from platform scope, payment infrastructure simplifies to a single transaction flow.

**The flow:**
1. Buyer pays for seat → Stripe processes payment
2. Platform holds funds in escrow (Stripe delayed payout, 14-30 days)
3. Platform fee (3-5%) deducted
4. Referrer commission (if applicable) deducted from platform's cut
5. Remaining funds released to founder after escrow period

**Phase 1 (bespoke):** Manual Stripe invoicing. Admin coordinates. Works for 1-50 transactions.

**Phase 2 (self-service):** Stripe Connect standard accounts for founders. Automated checkout, escrow, and payout. Referrer payouts automated on escrow release.

No multi-party splits beyond the basic three-way (platform, referrer, founder). No secondary market payment rails. No dispute processing beyond escrow-window refunds.

**Payout timing:** 14-30 day escrow hold on all purchases. After release, transaction is final. Referrer payout triggers on escrow release.

**Status: CLOSED. Stripe Connect handles everything. Phase 1 is manual invoicing.**

---

## 8. NEWLY IDENTIFIED FLAGS

### 🟡 8.1 Cold Start — First 100 Listings

**The issue:** An empty marketplace has no traffic. No traffic means no founders want to list. Classic chicken-and-egg.

**Possible approaches:**
- AI-generate profiles from public data (Crunchbase, GitHub, Product Hunt) and invite founders to claim/verify
- Personally onboard 20-30 products from your network before public launch
- COMMAND is listing #1 — the platform's own product demonstrates the cascade
- Cross-post launch to Product Hunt, Hacker News, relevant communities

**Risk level: LOW.** The list is free. The eval process is lightweight. The harder part is traffic, not inventory. But 100 good listings with no visitors is worse than 10 listings with 1,000 visitors.

**Needs decision: Launch strategy. How do the first 50 products get on the list?**

### ✅ 8.2 Branding — RESOLVED: KA§§A

**Resolution:** The marketplace is KA§§A — powered by MO§E§™. The § symbol appears twice in the name, creating visual continuity with the MO§E§™ framework. The name reads as "Kassa," which means cash register in Italian, Swedish, German, Dutch, Russian, and Hungarian. It's also Cassian Andor's birth name — the operative who ran the ground operation while Luthen designed the network. The reference is invisible to anyone outside the fandom; to everyone else it's a clean five-letter brand with cash connotation.

**Brand stack:**
- MO§E§™ — the constitutional AI governance framework (the manifesto)
- KA§§A — the marketplace (the operative)
- COMMAND — the first product listed on KA§§A (the proof of concept)

**Domain candidates:** kassa.market, kassa.io, getkassa.com, kassa.co (final domain selection pending availability check)

**Status: CLOSED.**

### 🟡 8.3 Referral Attribution Window

**The issue:** Someone clicks a referral link today and buys 60 days later. Does the referrer get paid?

**Options:**
- 7-day cookie (tight, misses slow decisions)
- 30-day cookie (standard for affiliate programs)
- 90-day cookie (generous, more referrer-friendly)
- First-touch forever (whoever sent them first, regardless of time)

**Needs decision: Attribution window length. Recommend 30 days as industry standard.**

### 🟡 8.4 Data Ownership — Who Owns the Listing?

**The issue:** Founders submit product data. If a founder wants to leave the platform, do they take their listing? Can they demand removal? What about AI-generated profiles for products that haven't opted in?

**Recommended position:**
- Founder owns their product data and can request removal at any time
- AI-generated profiles are clearly marked as "unclaimed" and removable by the rightful founder
- Platform retains anonymized transaction data (for analytics) even after listing removal
- Seat records persist even if listing is removed (buyers still hold their seats — the purchase happened)

**Needs decision: Confirm data ownership position for ToS.**

### 🟡 8.5 Platform Fee Sustainability

**The issue:** At 3-5% on first sale only (no secondary market fees), is the revenue sufficient?

**Quick math at Phase 1 scale:**
- 50 seat sales/month × $800 avg × 4% = $1,600/mo platform revenue
- Minus referrer payouts (25% of platform take): $400/mo
- Net: $1,200/mo

That's tight. Workable for a bootstrapped operation with near-zero overhead, but leaves no margin for growth spending.

**Counterargument:** The volume play. At 500 seats/month the math is $12,000/mo net. At 5,000 seats/month it's $120,000/mo. The question is how fast volume scales.

**Alternative revenue streams (future, not Phase 1):**
- Featured listings (founders pay for premium placement)
- Verified badges (founders pay for enhanced credibility signals)
- Analytics tier (founders pay for conversion/traffic data)
- API access (third parties pay for marketplace data)

**Needs decision: Is 3-5% on first sale sufficient for launch, or should additional revenue streams be specced for Phase 2?**

---

## 9. PHASED BUILD PLAN

### Phase 0 — NOW (No Code Required)

**What exists:**
- COMMAND cascade registry (built, functional UI)
- MO§ES™ landing page
- Brand assets (logo, identity system)

**What to do:**
- Wire up COMMAND inquiry form (SEAT-REGISTRY-FIX.md — already delivered)
- Close first COMMAND seat manually — validate cascade with real money
- Resolve yellow flags (branding, launch strategy)
- Document learnings before building marketplace

### Phase 1 — MVP Marketplace (Weeks 1-6)

**Build:**
- Public marketplace with product listings
- Founder application and onboarding flow
- Basic search/browse/filter
- Cascade configuration tool (extract and generalize from COMMAND)
- Visual seat board on product pages
- Inquiry form on cascade-active products
- Referral link generation and basic tracking
- Admin dashboard for managing applications, listings, and inquiries

**DO NOT build yet:**
- Self-service payments (bespoke via admin in Phase 1)
- Automated escrow
- Automated referral payouts
- Advanced moderation tools
- Analytics dashboards

**Revenue in Phase 1:** Manual. Admin coordinates every transaction. This is the advantage — learn every friction point firsthand.

### Phase 2 — Self-Service (Weeks 7-16)

**Build:**
- Stripe Connect integration (founder onboarding, buyer checkout)
- Automated seat purchase flow
- Escrow system (delayed payouts)
- Buyer accounts and dashboard
- Automated referral tracking and payouts
- Notification system (email — seat sold, escrow released, wave opened)
- ToS and legal language (get legal review before this phase launches)

### Phase 3 — Scale (Weeks 17-30)

**Build:**
- Marketplace discovery features (trending, new, closing soon)
- API for external integrations
- Advanced analytics for founders (conversion, referral performance)
- Community features (reviews, founder verification badges)
- Embed system (cascade widget for founder's own website)
- Additional revenue streams (featured listings, verified badges)

### Phase 4 — Expansion

**Build:**
- Category expansion
- White-label cascade for enterprise clients
- Public API marketplace
- Advisory/intelligence layer (pricing insights, market data)
- Template library (pre-configured cascade templates by industry)
- Referral network enhancements (if volume justifies)

---

## 10. TECHNICAL REQUIREMENTS (Pre-Code)

### Recommended Stack

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| Frontend | Next.js (React) | SSR for SEO, React ecosystem, existing cascade UI is React |
| Database | PostgreSQL | Relational data model, ACID for financial transactions |
| Auth | Clerk or Auth0 | OAuth + email, role management, minimal build |
| Payments | Stripe Connect | Marketplace payments, delayed payouts for escrow |
| Hosting | Vercel or Railway | Quick deploy, scales with traffic |
| Search | Algolia or Meilisearch | Fast product search/filter |
| Email | Resend or Postmark | Transactional notifications |
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
- Founder application/eval flow
- Founder dashboard
- Buyer dashboard
- Referral link system and tracking
- Admin dashboard
- Stripe Connect integration (Phase 2)
- Escrow management (Phase 2)
- Notification system (Phase 2)

---

## 11. SUCCESS METRICS

### Phase 1 Targets (First 90 Days)

- 100 product listings
- 5 cascade-active products (including COMMAND)
- 1 completed seat sale
- 10 active referral links generated
- 500 monthly unique visitors

### Phase 2 Targets (6 Months)

- 1,000 product listings
- 50 cascade-active products
- 25 completed seat sales
- $100K in GMV
- $4K in platform revenue
- 100 active referrers

### Year 1 Target

- 5,000 listings
- 200 cascade-active products
- $500K in GMV
- $25K in platform revenue
- Proof of flywheel: listings attract buyers, buyers attract founders, referrers accelerate both

---

## APPENDIX A — DISCUSSION LOG

**Date:** March 3, 2026
**Participants:** Luthen (founder), Claude (AI collaborator)
**Session type:** Strategic product development and red flag resolution

### Session Arc

1. **Started with:** Registry audit on COMMAND — identified non-functional inquiry form
2. **Delivered:** SEAT-REGISTRY-FIX.md technical specification
3. **Strategic pivot:** Should the wave cascade registry become a standalone platform?
4. **Market gap analysis:** Searched SaaS pricing platforms, NFT ticketing, secondary software markets — nothing like the cascade exists
5. **Product concept developed:** Embeddable platform where sellers create gated, scarce-position registries
6. **Deliverables created:** Product map (6-tab artifact), use case analysis (5-tab artifact), product fit map (named products), revenue model (5-tab artifact)
7. **Key insight — lifetime seats:** The 80-90% of products that can't cascade their distribution CAN cascade a scarce tranche of lifetime seats. This expands TAM from ~8,000 products to every product with a payment page.
8. **Key insight — open marketplace:** The marketplace is the traffic layer. Free to list. The cascade is the enforcement gate — the only way to transact. The list generates traffic; the cascade generates revenue.
9. **Key insight — referral network:** The "real estate model" applied to startups. Anyone can earn commission by distributing products. Not a separate model — a feature. An affiliate link with a pulse.
10. **Key insight — zero-risk deployment:** The cascade is built. Founders deploy for free. Platform charges only when money moves. The Stripe model applied to distribution.
11. **Key insight — self-sustaining list:** Unlike Product Hunt, no gimmicks needed. Economic activity IS the engagement. The list maintains itself because money moves through it.
12. **Red flag resolution:** Four flags identified and resolved (securities, moderation, transfers, payments). All closed. See Section 7 for full decision log.
13. **Newly identified flags:** Five yellow flags raised for pre-build resolution (cold start, branding, referral attribution, data ownership, fee sustainability). See Section 8.

### Key Design Decisions

| Decision | Resolution | Rationale |
|----------|-----------|-----------|
| Platform name | KA§§A — powered by MO§E§™ | Five letters. § symbol creates visual family with MO§E§™. "Kassa" = cash register in 6+ languages. Cassian Andor's birth name — the ground operative to Luthen's network architect. |
| Platform scope | First sale only | Eliminates 60% of complexity. Founder manages post-sale. |
| Securities risk | Not a security | One-per-person limit, verified products, utility-first design. Product license with resale rights. |
| Moderation | Founder interview + price gate | Price self-moderates buyers. Interview verifies product is real. No heavy tooling. |
| Transfers | Founder's domain | Platform doesn't process, track, or arbitrate secondary transactions. |
| Payments | Stripe Connect + escrow | Single-direction flow. 14-30 day hold. Release to founder after period. |
| Referrer commission source | From platform's cut | Founders receive full amount minus platform fee. Referrer doesn't cost the founder anything extra. |

### Numbers Referenced

| Metric | Value | Source |
|--------|-------|--------|
| SaaS companies worldwide | ~42,000 | Statista/Backlinko |
| Startups worldwide | 150M+ | DemandSage |
| New startups per year | 50M | DemandSage |
| Startup failure rate | 90% | Multiple sources |
| SaaS spend on sales/marketing | 40-60% of revenue | Industry benchmarks |
| Pump.fun tokens launched | 11.9M | CoinMarketCap/Wikipedia |
| Pump.fun revenue | $800M+ lifetime | Messari/CoinDesk |
| Pump.fun graduation rate | 1.4% | Messari |
| US home sales (2024) | 4.06M existing + 679K new | NAR/Census |
| Total realtor commission pool | ~$100B+/year | Calculated from NAR data |
| Average realtor commission | 5.57% (2025) | Clever Real Estate |
| Product Hunt monthly visits | ~5-10M (est) | Industry estimates |

---

*This document is Version 0.3. Yellow flags in Section 8 require resolution before build begins. Phase 0 actions (COMMAND inquiry fix, first seat sale) can proceed immediately.*

*CONFIDENTIAL — Ello Cello LLC — KA§§A™ powered by MO§E§™ — Wave Cascade patent pending*
