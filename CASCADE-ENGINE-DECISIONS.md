# KA§§A CASCADE ENGINE — SESSION DECISIONS

**Date:** 2026-03-05
**Session:** Luthen + Claude
**Status:** DECISIONS MADE — incorporate into build docs, PPA5, and CLAUDE.md

---

## THE ENGINE FORMULA

One number in. Entire cascade out.

**The constant:** The cascade seat pattern (5-3-5-3) times the multiplier sequence determines a divisor. The founder's input divided by that divisor produces the base price. Everything else is multiplication.

**Enterprise preset (Aggressive, 1-2-3-4):**

```
Seats:      5 - 3 - 5 - 3  (16 total)
Multiplier: 1 - 2 - 3 - 4
Weight:     5(1) + 3(2) + 5(3) + 3(4) = 5 + 6 + 15 + 12 = 38
Divisor:    38

base = total ÷ 38
```

**Two entry points, same output:**

```
ENTRY A: "I want to raise $2,470,000"
  base = $2,470,000 ÷ 38 = $65,000

ENTRY B: "My starting seat price is $65,000"
  total = $65,000 × 38 = $2,470,000
```

**Output (COMMAND as proof):**

```
C1:  5 seats × $65,000  × 1  =   $325,000
C2:  3 seats × $65,000  × 2  =   $390,000
C3:  5 seats × $65,000  × 3  =   $975,000
C4:  3 seats × $65,000  × 4  =   $780,000
─────────────────────────────────────────
16 seats                       $2,470,000
```

**Per-seat weight is flat:** Every seat = 2.6% of total. Uniform across all waves. The layer totals look uneven but that's seat count, not pricing.

---

## THE TETRACTYS PROOF

The Pythagorean Tetractys (1-2-3-4, triangular distribution) was used to validate the cascade pricing. It is the mathematical proof that the 1-2-3-4 multiplier sequence produces harmonically sound pricing. It is NOT the runtime engine.

**Proof:**

```
Total: $2,470,000 ÷ 6 layers = $411,667 per layer

Layer │ Seats │ Price/Seat │ Layer Total
──────┼───────┼────────────┼───────────
L1    │   1   │  $411,667  │  $411,667
L2    │   2   │  $205,833  │  $411,667
L3    │   3   │  $137,222  │  $411,667
L4    │   4   │  $102,917  │  $411,667
L5    │   5   │   $82,333  │  $411,667
L6    │   6   │   $68,611  │  $411,667
──────┼───────┼────────────┼───────────
Total │  21   │            │$2,470,000
```

**Tetractys → Cascade mapping:** Pair adjacent layers, average the price per seat:

```
Pair L6+L5 avg: $67,528  →  C1: $65,000  →  3.7% off
Pair L4+L3 avg: $107,431 →  C2: $130,000 →  adjusted by seat redistribution
Pair L2+L1 avg: $276,250 →  C3/C4 range  →  5.9% off
```

The Tetractys generates the cascade. The cascade compresses it by skipping every other layer and redistributing seats. The math validates the instinct.

**Future state:** The Tetractys becomes the Wave Zero vouch mechanic when agent-driven traffic makes it viable. Starting at $1, rows expanding (1-2-3-4-5...), where the market climbs tells the engine what the base price should be. The founder stops inputting the number — the market writes it. Deferred until traffic exists.

---

## INTERNAL / EMBEDDED LADDER

The 4-wave cascade is actually two parallel ladders:

```
INTERNAL LADDER (5 seats each, broader access)
  C1: 5 × base × 1 = use it inside your org
  C3: 5 × base × 3 = more users, now validated

EMBEDDED LADDER (3 seats each, premium, redistributable)
  C2: 3 × base × 2 = put it in your product, ship to your customers
  C4: 3 × base × 4 = premium distribution, fully validated
```

**Internal** = buyer uses product inside their organization. Value chain stops at buyer.
**Embedded** = buyer redistributes product to their customers. Buyer generates revenue from it.

Internal gets more seats (broader). Embedded gets fewer seats (exclusive, higher value). Same $65K dollar step between all four waves. Internal triples (C1→C3). Embedded doubles (C2→C4). $130K spread on both ladders.

**Sequence logic:**
- C1: Internal → get users
- C2: Embedded → get distribution partners
- C3: Internal → more users (validated by C2 partners)
- C4: Embedded → premium distribution (validated by C1+C3 adoption)

Users build credibility. Partners build reach. Alternating.

---

## MULTIPLIER PRESETS

Founder chooses curve steepness. Same seat pattern (5-3-5-3). Different divisors.

```
AGGRESSIVE (1-2-3-4):
  Divisor: 38
  Steps: +100%, +50%, +33%
  For: High-confidence products, strong demand signal

MODERATE (1-1.5-2-2.5):
  Divisor: 5(1) + 3(1.5) + 5(2) + 3(2.5) = 5 + 4.5 + 10 + 7.5 = 27
  Steps: +50%, +33%, +25%
  For: Proven product, steady market

GENTLE (1-1.25-1.5-1.75):
  Divisor: 5(1) + 3(1.25) + 5(1.5) + 3(1.75) = 5 + 3.75 + 7.5 + 5.25 = 21.5
  Steps: +25%, +20%, +17%
  For: New product, testing the market, lower risk tolerance
```

**Example at $2,000 base:**

```
             C1      C2       C3       C4       Total
Aggressive:  $2,000  $4,000   $6,000   $8,000   $76,000
Moderate:    $2,000  $3,000   $4,000   $5,000   $54,000
Gentle:      $2,000  $2,500   $3,000   $3,500   $43,000
```

---

## FOUNDER INPUTS (total)

```
1. Total target  OR  base seat price  (two doors, same output)
2. Enterprise or SaaS                 (seat pattern — SaaS TBD)
3. Multiplier: Aggressive / Moderate / Gentle
```

Three choices. Everything else is math.

---

## CASCADE RESET MECHANICS

### The floor rule

**No relisting below last completed wave price.** The floor is set by the last COMPLETED wave, not the last sold seat in a half-filled wave.

### Founder stops or forks

When a cascade stalls and the founder decides to stop or fork:

**Completed waves:** Locked. Done. Holders are protected. Their positions are permanent.

**Half-sold wave buyers get two choices:**

```
OPTION A: CLOSE OUT
  → Full refund
  → Seat released
  → Clean exit

OPTION B: HOLD POSITION
  → Refund the difference between old price and new cascade price
  → Plus a discount for holding through the stall
  → Seat transitions into new cascade
  → Discount rate and terms negotiated between founder and buyer
```

### New cascade rules

```
1. Base price ≥ last completed wave price (floor rule)
2. Fresh 5-3-5-3 structure from new base
3. Founder can choose a different multiplier preset
   (e.g., stalled on Aggressive, restart on Gentle)
4. Cooling period before renewal (TBD — 30/60/90 days)
5. Roll-forward buyers slot in at negotiated discount
6. All terms are guidelines discussed between founder and buyer
```

### Sequential cascades (full completion → relaunch)

If all 16 seats fill and founder wants another round:

```
New base ≥ C4 price from completed cascade
Fresh 16 seats
New multiplier choice
Same rules apply
```

---

## KILL SWITCHES

The cascade has a viable range. Too high or too low and the mechanic breaks.

```
TOO LOW (suggested floor):
  → Base ~$500 minimum → ~$19K total at Aggressive
  → Below this, the infrastructure cost exceeds the value
  → Signal: product should sell subscriptions, not seats

TOO HIGH (suggested ceiling):
  → Base ~$10-25K → ~$380-950K total at Aggressive
  → Above this, 16 buyers at escalating prices don't exist
  → Signal: product belongs in bespoke/white-label, not the board

SWEET SPOT: $1,000 - $10,000 base
  → $38K - $380K total (Aggressive)
  → Bootstrapped founders needing non-dilutive capital
  → Buyers who can justify the spend
```

Platform implementation: suggested floor and ceiling with warnings. Founder can override but gets a flag. Not hard blocks — guidelines.

COMMAND sits above the ceiling deliberately. It works because the product warrants enterprise pricing, not because the mechanic scales there.

---

## TRUTH-TELLING MECHANIC

The cascade is a live pricing compass. Fill velocity is the signal.

```
FILLS INSTANTLY:
  → You're underpriced
  → You gave away the floor
  → Next cascade (if you run one) starts higher

STEADY FRICTION (each wave harder than last):
  → Priced right
  → Market is working normally
  → Healthy cascade

STALLS:
  → Overpriced for this market
  → Reset with market signal, not guesswork
  → Cascade told you faster than 6 months of fixed pricing would have
```

**Fill velocity as implicit scoring:** The board doesn't need a scoring system or trend indicators at launch. The wave progress bar on each listing IS the score. Buyers browsing the board can read demand directly from fill state:

- Filling fast → underpriced or hot → get in now
- Grinding → fairly priced → take your time
- Stalled → overpriced or wrong market → wait for reset

The cascade already does what the deferred scoring system was designed to do.

---

## PRODUCT LISTING STRUCTURE

Each listing on the board has:

```
CASCADE (16 seats)
  C1: 5 seats — Internal
  C2: 3 seats — Embedded
  C3: 5 seats — Internal
  C4: 3 seats — Embedded

DISTRIBUTION (optional, founder-configured)
  → Listed as "available" on product page
  → Pricing informed by cascade market price
  → Separate from cascade seats

WHITE-LABEL (optional, founder-configured)
  → Listed as "available" on product page
  → Bespoke / open to offers
  → Pricing benchmarked against cascade-proven market value
```

The cascade sets the market price. Distribution and white-label are priced RELATIVE to what the cascade proved. Without the cascade, those prices are guesses. With it, they're market-validated.

---

## STILL TBD

- [ ] SaaS preset: seat pattern and divisor (different from Enterprise 5-3-5-3?)
- [ ] SaaS: does it use Internal/Embedded ladders or a different structure?
- [ ] Cooling period between cascade reset: 30 / 60 / 90 days?
- [ ] Roll-forward discount: standard rate or purely negotiated?
- [ ] Kill switch thresholds: exact floor and ceiling numbers
- [ ] Wave Zero Tetractys vouch mechanic: deferred until agent traffic exists
- [ ] CW3 / Seat XVII (BID seat): how does the final seat work in the preset?

---

*Captured from working session 2026-03-05. Reference: PPA5-CASCADE-REGISTER-v2, CLAUDE-MD-KASSA-BUILD, FTO-QUICK-REFERENCE.*
