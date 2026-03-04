# KA§§A KERNEL — CORE COMPONENTS

Two components. Everything else depends on these being bulletproof.

---

## COMPONENT 1: THE CASCADE WAVE SYSTEM

### Wave Zero (The Gate)

Every listing enters the marketplace the same way.

- **25 seats** — platform-wide constant, same for every listing
- **Fixed price** — platform-standard price per seat, same for every listing (TBD)
- **All-or-nothing escrow** — buyer money is held, not released, until all 25 seats fill
- **If all 25 fill:** funds release to founder, buyers get product access, real cascade opens
- **If founder pulls the listing:** all buyers refunded, no one loses money
- **No time limit** — sits until it fills or founder withdraws
- **No offers** — fixed price, no negotiation during Wave Zero
- **Wave Zero buyers receive the product** — this is a real purchase, not a deposit

Wave Zero is a demand test with a safety net. Can't clear 25 seats at the gate price? You're not ready for a real cascade.

### Real Cascade (Waves 1, 2, 3...)

Once Wave Zero clears, the founder's custom cascade opens. Founders choose one of two cascade types:

**SaaS Cascade** — higher seat quantities per wave, broader distribution
**Enterprise Cascade** — limited seat quantities per wave, exclusive positioning

**What the founder sets:**
- Cascade type (SaaS or Enterprise)
- Wave 1 price (either LTV-suggested by system or custom)
- Seats per wave (informed by cascade type — SaaS runs larger, Enterprise runs smaller)
- Wave multiplier (default 1.6× — each wave is 1.6× the previous price)
- Number of waves (or leave open-ended)
- Offers toggle: on/off (can buyers submit a price below the wave price?)

**How waves progress:**
- Each wave must sell through completely before the next wave opens
- You don't pre-allocate — you earn the next wave by clearing the current one
- When a wave sells out, the next wave activates automatically
- Price increases by the multiplier each wave

**Escrow on Waves 1+:**
- Standard per-seat escrow (14 days per purchase)
- Funds release to founder after escrow clears
- Not all-or-nothing like Wave Zero — each seat's escrow is independent

**Offers (if enabled by founder):**
- Buyer submits a price below the current wave price
- Founder accepts, rejects, or counters
- Accepted offer = seat sold at offer price, counts against wave inventory
- Not available during Wave Zero

### Example: Enterprise Cascade
```
Wave Zero:  25 seats × gate price (standard)
Wave 1:     small seat count × founder-set price
Wave 2:     small seat count × multiplied price  (opens only if Wave 1 clears)
Wave 3:     small seat count × multiplied price  (opens only if Wave 2 clears)
```

### Example: SaaS Cascade
```
Wave Zero:  25 seats × gate price (standard)
Wave 1:     larger seat count × founder-set price
Wave 2:     larger seat count × multiplied price  (opens only if Wave 1 clears)
Wave 3:     larger seat count × multiplied price  (opens only if Wave 2 clears)
Wave 4:     larger seat count × multiplied price  (opens only if Wave 3 clears)
```

### Seat Properties
Every seat sold (including Wave Zero) has:
- Serial number (KS-YYYY-NNNNN, sequential)
- Product it belongs to
- Wave number (0, 1, 2, 3...)
- Price paid (may differ from wave price if offer was accepted)
- Escrow status (held / pending / released / refunded)
- Transferable (owner can transfer to another person)

### Open Questions for Kernel Session
- Wave Zero price: TBD
- SaaS vs Enterprise cascade: what are the default seat-per-wave ranges for each type?
- Can a founder switch cascade type after Wave Zero clears?
- When Wave Zero clears, does the founder set up their cascade then, or did they pre-configure it during listing creation?
- Can a founder add more waves after their initial cascade is running?
- What happens when ALL waves complete? Listing shows as "Sold Out" — can founder open a new cascade?
- Seat transfer: peer-to-peer, or through KA§§A with a fee?
- Buyback: if founder shuts down product, what's the refund obligation?

---

## COMPONENT 2: THE BOARD

The board is the marketplace floor. Every listing lives here.

### Structure

**Top section — curated shelves (editorial, horizontal scroll):**
- **Featured** — hand-picked by KA§§A team
- **Hot Right Now** — high sell-through velocity, Wave Zeros close to clearing
- **New Listings** — recently approved, just entered Wave Zero
- **Trending** — rising interest/score over last 7-14 days
- **Suggested** — personalized (future: based on buyer history, agent recommendations)

Each shelf shows compact cards with: product name, founder (verified ✓), sector tag, current wave status, price, seats remaining, score, trend arrow.

**Bottom section — The Board (full list, tabbed by sector):**
- Default view: list (dense, scannable, one row per listing)
- Alternate view: grid (card layout, toggle button)
- Sector tabs across the top: All | AI Governance | Developer Tools | Commerce | Productivity | AI Agents | etc.
- Tab shows count of listings per sector

### List View — What Each Row Shows

```
[Status Badge] | Product Name (✓) | Sector | Wave Progress Bar | Price | Score | Trend
                 Founder name                 Wave N — X / Y seats
```

- **Status badge:** Wave 0 (muted), Wave 1/2/3 Open (gold), Hot (red), New (blue), Sold Out (dark)
- **Product name + founder:** name is bold, founder is secondary text, verified checkmark
- **Sector:** category tag
- **Wave progress:** which wave, how many seats remain, mini progress bar
- **Price:** current wave price in monospace
- **Score:** product score (number) or dash if too new
- **Trend:** ↗ rising (green), → steady (gray), ↘ cooling (red)

### Board States to Handle
1. **Wave Zero — just listed** (1-5 of 25 filled, no score yet)
2. **Wave Zero — building momentum** (10-20 of 25 filled)
3. **Wave Zero — almost there** (22-24 of 25 filled, "Hot" badge)
4. **Wave 1+ — active cascade** (real pricing, score visible)
5. **Selling fast** (high velocity, "Hot" badge regardless of wave)
6. **Steady** (active but not accelerating)
7. **Stalled** (Wave Zero or active wave with no sales in X days — no special badge, just low trend)
8. **Sold out** (all waves complete, dimmed, still visible for reference)

### Grid View (toggle)
Same information as list view but in card format (like the shelf cards). 3 columns on desktop, 1 on mobile.

### Sorting
- Trending (default — combination of velocity + score + recency)
- Newest
- Price low → high
- Price high → low
- Score

### Open Questions for Kernel Session
- Does the board show listings that failed Wave Zero (pulled by founder)? Or do they disappear?
- Is there a "Watchlist" or "Save" feature for buyers?
- Do Wave Zero listings and post-Wave-Zero listings look different enough on the board? Should they be visually separated?
- How does the board handle 100+ listings? Pagination, infinite scroll, or load-more?
- Sector categories: fixed list or dynamic (created as products are listed)?

---

## WHAT'S NOT IN THIS DOCUMENT

Everything else — brand, colors, typography, agent protocol, outreach, financial model, SEO, positioning. Those are done and documented elsewhere (DOC-001 through DOC-008). This is just the engine.

---

*KA§§A Kernel · Board + Cascade Wave · Carry to clean thread*
