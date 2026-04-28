# KA§§A — App Build Notes

## What This Is

Founding seat marketplace. Products sell limited, numbered "seats" in waves with escalating prices. Built on the MO§E§™ constitutional governance framework.

## Stack

- **Framework:** Next.js 15.2.4 (App Router, TypeScript, `src/` directory)
- **Styling:** Tailwind CSS v4 with brand tokens as CSS variables
- **Fonts:** Playfair Display (display), DM Sans (body), DM Mono (mono) via `next/font`
- **Data:** Mock/static — no backend, no database, no auth

## Running

```bash
cd kassa-app
npm run dev    # http://localhost:3000
npm run build  # production build (passes clean)
```

## Project Structure

```
kassa-app/src/
├── app/
│   ├── layout.tsx                    # Root layout (fonts, metadata)
│   ├── page.tsx                      # Landing page (hero + supporters + tiles + agents)
│   ├── globals.css                   # Tailwind + CSS tokens + deep proto effects
│   ├── login/page.tsx                # Magic link login stub
│   ├── listings/
│   │   ├── page.tsx                  # The Board — list/grid toggle, sector tabs
│   │   └── [slug]/page.tsx           # Product detail + cascade panel
│   ├── verify/[serial]/page.tsx      # Seat verification emblem card
│   ├── dashboard/page.tsx            # Buyer seat portfolio
│   └── founder/dashboard/page.tsx    # Founder listing overview
├── components/
│   ├── layout/
│   │   ├── Header.tsx                # Frosted glass nav, mono wordmark
│   │   └── Footer.tsx                # Two-column footer with link groups
│   ├── ui/
│   │   ├── Button.tsx                # primary/secondary/ghost, sm/md/lg
│   │   └── Badge.tsx                 # gold/green/red/blue/gray/dark variants
│   ├── marketplace/
│   │   ├── ProductCard.tsx           # Card: status, price, trend, progress
│   │   ├── ShelfRow.tsx              # Horizontal scrollable card shelf
│   │   ├── StatusBadge.tsx           # Wave Zero / Open / Sold Out etc.
│   │   ├── WaveProgressBar.tsx       # Fill bar with seats remaining
│   │   ├── CascadePanel.tsx          # Dark panel: all waves, progress, claim CTA
│   │   ├── TrendIndicator.tsx        # ↗ Rising / → Steady / ↘ Cooling
│   │   └── CategoryTabs.tsx          # Sector filter tabs with counts
│   └── dashboard/
│       ├── SeatCard.tsx              # Owned seat with serial, escrow status
│       └── FounderListingCard.tsx    # Listing overview with wave stats
├── lib/
│   ├── types.ts                      # Wave, Product, Seat, enums
│   └── data.ts                       # 7 mock products, 2 mock seats, helpers
```

## Design Decisions (Prototype Review)

13 prototypes were reviewed and numbered in `prototypes/numbered/`. Components categorized:

### Keep Now (in current build)
- **Hero** from `03-mockup-v1` — "Own your founding seat." with gradient headline
- **"Committed supporters"** section from `04-mockup-v2` — standalone full-width
- **Three-tile 2-column grid** merged from `04` — Founders/CTA, Buyers/Emblem, Agents/Earn
- **Agents full-width section** from `04` — dark bg, Browse/Recommend/Earn cards
- **The Board** from `02-marketplace` — list/grid toggle, sector tabs, column layout
- **Gradient text effect** from `deep_proto header` — `linear-gradient(135deg, obsidian→gold)` on headlines
- **Frosted glass nav** from `deep_proto header` — backdrop-filter blur
- **Card hover lift** from `deep_proto header` — translateY + shadow on hover
- **Button glow** from `deep_proto header` — gold box-shadow on hover

### Add Later
- `01-listings-board` — alternate board layout
- Floating Moat Calculator — interactive seat value calculator (has working prototype code)
- Curated shelves (Featured/Hot/New) — horizontal scroll rows
- How It Works section
- Mobile hamburger nav
- Search

### Reference Only (not product UI)
- `05` brand guide — color/type/voice rules
- `06-12` — financial models, revenue models, use cases, product maps (internal reports)

## CSS Effects (globals.css)

```css
.gradient-text      /* obsidian → gold gradient on text */
.gradient-text-light /* white → gold (for dark backgrounds) */
.glass-nav          /* frosted glass with backdrop-filter */
.grid-texture       /* dot grid background pattern */
.progress-glow      /* gold glow on progress bars */
.hover-lift         /* translateY(-6px) + shadow on hover */
.btn-glow           /* translateY(-2px) + gold shadow on hover */
.fade-up            /* fadeUp animation with delay variants */
```

## Brand Tokens (CSS Variables — swappable)

```css
--color-gold: #C4923A        /* Primary accent */
--color-bone: #F2EDE4        /* Background */
--color-obsidian: #1A1A18    /* Text / dark surfaces */
--color-driftwood: #6B6558   /* Secondary text */
--color-sandstone: #DDD5C8   /* Borders / subtle bg */
--color-verdigris: #4A7C59   /* Success / verified */
--color-terracotta: #B44A3F  /* Hot / warning */
--color-slate: #3A6B8C       /* Info / SaaS badge */
--color-charcoal: #2A2A25    /* Dark surface borders */
```

To retheme: edit `src/app/globals.css` `@theme` block.

## What's Working

- [x] All 7 routes render, build passes clean
- [x] Landing: hero (gradient headline), supporters section, 3-tile grid, agents section, footer
- [x] Board: The Board with list/grid toggle, sector tabs, proper column layout matching prototype 02
- [x] Product detail: founder card, description, stats, cascade panel
- [x] Verification: dark emblem card
- [x] Dashboard stubs (buyer + founder)
- [x] Login stub
- [x] Deep proto effects: gradient text, glass nav, hover lifts, button glow

## What's NOT Working / Not Built Yet

- [ ] **No authentication** — login form is visual only
- [ ] **No database** — all data hardcoded in `lib/data.ts`
- [ ] **No Supabase / Stripe** — no backend, no payments
- [ ] **No seat purchase flow** — "Claim Seat" does nothing
- [ ] **No cascade engine** — display-only
- [ ] **No escrow / hash chaining** — mock verification
- [ ] **Category filtering** — approximate slug matching
- [ ] **No mobile nav** — links hidden on small screens
