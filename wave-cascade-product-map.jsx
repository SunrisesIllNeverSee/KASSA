import { useState } from "react";

const SECTIONS = [
  {
    id: "core",
    label: "Core Instrument",
    color: "#C9A84C",
    content: {
      title: "The Registry Instrument",
      subtitle: "What sellers get when they create a registry",
      blocks: [
        {
          heading: "What It Is",
          text: "An embeddable wave cascade registry that any business can configure and deploy on their own site. They define their seats, waves, pricing, tier structure, and transfer rules. The registry handles gating logic, status tracking, lineage, inquiry capture, and the visual board — all branded to their business.",
        },
        {
          heading: "Seller Setup Flow",
          steps: [
            "Create account → Name your registry",
            "Define products (e.g., 1 product or 2 linked products like COMMAND/DEPLOY)",
            "Define waves — how many, how they gate (sequential, parallel, hybrid)",
            "Define seats per wave — quantity, tier (Internal/Embedded/Custom), base price",
            "Set unlock rules — 'Wave 2 opens when Wave 1 fills' or custom triggers",
            "Set transfer rules — transferable yes/no, max transfers, royalty on transfer",
            "Set inquiry capture — form fields, delivery method (email, webhook, Slack)",
            "Brand it — colors, logo, fonts, domain/subdomain",
            "Deploy — embed code, hosted page, or API",
          ],
        },
        {
          heading: "What the Buyer Sees",
          steps: [
            "Visual board showing all waves, seats, availability, and pricing",
            "Click seat → detail view with tier, wave, price, transfer history",
            "Click inquire → form submission → confirmation with reference number",
            "Real-time scarcity — seats visually fill as they're claimed",
            "Transfer lineage — superscript notation showing ownership chain",
          ],
        },
      ],
    },
  },
  {
    id: "revenue",
    label: "Revenue Model",
    color: "#4A9EE5",
    content: {
      title: "How You Make Money",
      subtitle: "Three revenue streams from one platform",
      blocks: [
        {
          heading: "1. Transaction Fee (Primary Sales)",
          text: "You take a percentage of every seat sold through the registry. The seller sets their price. You take your cut when payment clears. This is the Stripe model — you're the infrastructure, you earn on throughput.",
          detail: "Suggested: 3–5% on primary sales. Low enough to be invisible next to a $65K seat. High enough to compound fast across many registries.",
        },
        {
          heading: "2. Transfer Fee (Secondary Market)",
          text: "Every time a seat transfers between parties, you take a cut of the transfer price. This is the royalty layer. Seats that appreciate in value generate revenue for both the original seller AND for you on every subsequent transfer.",
          detail: "Suggested: 1–2% platform fee on transfers (on top of whatever royalty the seller set for themselves). This is passive, recurring, and scales with market activity.",
        },
        {
          heading: "3. Platform Subscription (SaaS Layer)",
          text: "The registry instrument itself is the product. Free tier for basic registries (limited seats, limited waves). Paid tiers for advanced features: custom domains, API access, webhook integrations, analytics, white-label removal, multiple products per registry.",
          detail: "Free: 1 product, 10 seats, 2 waves, platform branding. Pro ($49/mo): 3 products, 50 seats, unlimited waves, custom domain, webhooks. Enterprise ($199/mo): Unlimited everything, API, white-label, priority support.",
        },
        {
          heading: "Revenue Math (Illustrative)",
          text: "100 active registries × average 10 seats × average $10K seat price = $10M in primary GMV. At 4% take rate = $400K primary revenue. Add transfers, add SaaS subscriptions, add marketplace fees. The model compounds because every seat sold is a future transfer opportunity.",
        },
      ],
    },
  },
  {
    id: "marketplace",
    label: "Marketplace",
    color: "#E8553A",
    content: {
      title: "The Distribution Marketplace",
      subtitle: "Where registries become discoverable and seats become tradeable",
      blocks: [
        {
          heading: "What It Is",
          text: "A centralized marketplace where all public registries are listed, browsable, and searchable. Buyers can discover new registries, compare wave structures, and acquire seats across multiple sellers — all from one place. Think of it as a marketplace for scarce licensed positions.",
        },
        {
          heading: "Primary Market (New Seats)",
          steps: [
            "Browse registries by category (AI, SaaS, Creator, Real Estate, etc.)",
            "See wave status, availability, pricing, and fill rate across all listed registries",
            "Acquire seats directly — payment flows through the platform",
            "Verified seller badges, registry ratings, and transaction history",
          ],
        },
        {
          heading: "Secondary Market (Transfers)",
          steps: [
            "Seat holders list their positions for transfer at asking price",
            "Buyers browse available transfers across all registries",
            "Platform facilitates the transfer — escrow, verification, lineage update",
            "Transfer history is public — price appreciation is visible",
            "Platform takes fee on both sides (seller + buyer) or just seller side",
          ],
        },
        {
          heading: "Why This Gets Interesting",
          text: "The marketplace creates price discovery. When buyers can see that Seat CI in Registry X sold at $65K and transferred at $120K six months later, it creates a public proof of appreciation. That attracts more sellers to create registries AND more buyers to acquire seats early. It's a flywheel: more registries → more seats → more transfers → more visible appreciation → more registries.",
        },
        {
          heading: "Marketplace Categories (Starting)",
          steps: [
            "AI & Model Access — licensed seats for AI products, APIs, governance tools",
            "SaaS Founding Access — early access seats for pre-launch or limited SaaS",
            "Creator & Community — founding memberships, patron seats, exclusive access",
            "Enterprise Licensing — limited distribution rights, reseller positions",
            "Custom / Other — anything with scarce, transferable, gated positions",
          ],
        },
      ],
    },
  },
  {
    id: "architecture",
    label: "Technical Architecture",
    color: "#7EC86E",
    content: {
      title: "How to Build It",
      subtitle: "Platform architecture — what exists vs. what's needed",
      blocks: [
        {
          heading: "What You Already Have",
          steps: [
            "Complete registry UI — board view, detail view, inquiry form, confirmation",
            "Wave cascade logic — sequential gating, fill detection, unlock triggers",
            "Seat data model — ID, wave, tier, price, owner, status, transfer count, lineage",
            "Transfer notation — Roman numeral IDs with superscript depth",
            "Multi-product support — COMMAND + DEPLOY already proves two linked registries",
            "Explainer/info system — the '?' page that explains the entire structure",
            "Visual design language — the entire dark, gold, mono-spaced aesthetic",
          ],
        },
        {
          heading: "What Needs to Be Built",
          steps: [
            "Backend — user accounts, registry CRUD, seat state management, API",
            "Database — registries, seats, waves, users, inquiries, transfers, payments",
            "Payment processing — Stripe Connect (marketplace model, split payments)",
            "Embed system — JS snippet sellers drop on their site (like Stripe Checkout)",
            "Hosted registry pages — for sellers who don't have their own site",
            "Admin dashboard — seller view to manage seats, approve transfers, see inquiries",
            "Marketplace frontend — browse, search, filter registries and available seats",
            "Transfer escrow — hold funds during transfer verification",
            "Notification system — email/webhook on inquiry, sale, transfer",
            "Analytics — fill rates, revenue, transfer velocity, wave progression",
          ],
        },
        {
          heading: "Recommended Stack",
          steps: [
            "Frontend: React or vanilla JS (you already write clean vanilla — your call)",
            "Backend: Node.js + Express or Next.js API routes",
            "Database: PostgreSQL (relational data — seats, waves, transfers need joins)",
            "Payments: Stripe Connect (built for marketplaces — handles split payments)",
            "Auth: Clerk or Auth0 (don't build your own)",
            "Hosting: Vercel or Railway (simple, scales, cheap to start)",
            "Email: Resend or Postmark (transactional emails for inquiries + confirmations)",
          ],
        },
        {
          heading: "MVP Scope (Ship First)",
          text: "Don't build the marketplace first. Build the instrument first. One seller (you) can create a registry, configure waves and seats, embed it, and process inquiries that actually deliver. That's the MVP. You're already 70% there with the current index.html. The marketplace is Phase 2 — it only works when there are multiple registries to browse.",
        },
      ],
    },
  },
  {
    id: "moat",
    label: "Moat & IP",
    color: "#9E6EC8",
    content: {
      title: "Defensibility",
      subtitle: "Why this isn't easily copied",
      blocks: [
        {
          heading: "IP Position",
          text: "You already have provisional patents covering the wave cascade structure and the commercial mechanics. If the registry instrument uses the same underlying logic — sequential gating, commitment conservation under commercial compression, transferable notes with lineage — it may fall under existing IP coverage. Worth confirming with your patent attorney, but the foundation is likely already protected.",
        },
        {
          heading: "Network Effects",
          text: "The marketplace creates a two-sided network effect. More sellers → more seats → more buyers. More buyers → more demand → more sellers. More transfers → more visible appreciation → more early buyers. This is the same flywheel that makes eBay, StockX, and Stripe hard to displace. First mover with critical mass wins.",
        },
        {
          heading: "Data Moat",
          text: "Every transaction generates pricing data. Over time, the platform accumulates the only dataset on wave cascade pricing dynamics — fill rates, transfer velocity, price appreciation by category, optimal wave structures. That data is proprietary and informs both sellers (how to structure their registry) and buyers (which seats are likely to appreciate).",
        },
        {
          heading: "Brand Position",
          text: "MO§ES™ as the governance framework. The registry instrument as the commercial engine. burnmydays as the origin story. If the platform is 'powered by MO§ES™' — every registry on the marketplace reinforces the MO§ES™ brand. Every seller becomes a distribution channel for the framework's credibility.",
        },
        {
          heading: "The Meta Play",
          text: "The COMMAND seat registry IS the proof of concept for the platform. You're not pitching a hypothetical — you're pointing at a working registry with 34 seats, wave gating, transfer logic, and real pricing. 'We built this for ourselves. Now anyone can have one.' That's the strongest possible go-to-market story.",
        },
      ],
    },
  },
  {
    id: "phases",
    label: "Phases",
    color: "#C87E6E",
    content: {
      title: "Build Sequence",
      subtitle: "What to ship and when",
      blocks: [
        {
          heading: "Phase 0 — NOW (You're here)",
          steps: [
            "Wire up the MO§ES™ registry inquiry form (the fix we just built)",
            "Close the first COMMAND seat — proves the mechanism works with real money",
            "Document everything — the registry is the product demo",
          ],
        },
        {
          heading: "Phase 1 — Registry Instrument (MVP)",
          steps: [
            "Extract the registry logic into a configurable, embeddable component",
            "Build a simple seller dashboard — create registry, define waves/seats, get embed code",
            "Integrate Stripe Connect for payment processing",
            "Hosted registry pages for sellers without their own site",
            "Ship to 5–10 beta sellers (hand-picked, high-signal use cases)",
          ],
        },
        {
          heading: "Phase 2 — Platform + Payments",
          steps: [
            "Buyer accounts — track owned seats across registries",
            "Transfer flow — list seat, escrow, verify, update lineage",
            "Notification system — email + webhook on all state changes",
            "Analytics dashboard — fill rates, revenue, transfer velocity",
            "Public API — for sellers who want programmatic control",
          ],
        },
        {
          heading: "Phase 3 — Marketplace",
          steps: [
            "Marketplace frontend — browse, search, filter registries",
            "Category system — AI, SaaS, Creator, Enterprise, Custom",
            "Secondary market — browse and acquire transfer listings",
            "Seller verification and rating system",
            "Price discovery — public transfer history and appreciation data",
          ],
        },
        {
          heading: "Phase 4 — Ecosystem",
          steps: [
            "API marketplace — third-party integrations (CRM, Slack, Discord)",
            "Registry templates — pre-built wave structures for common use cases",
            "Advisory layer — data-driven recommendations on wave/seat configuration",
            "'Powered by MO§ES™' becomes a recognized commercial infrastructure mark",
          ],
        },
      ],
    },
  },
];

function SectionNav({ sections, active, onSelect }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "4px",
        padding: "16px 24px",
        borderBottom: "1px solid #1E1E28",
        overflowX: "auto",
        flexWrap: "wrap",
      }}
    >
      {sections.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          style={{
            padding: "8px 18px",
            background: active === s.id ? s.color : "transparent",
            color: active === s.id ? "#08080D" : "#6A6A7A",
            border: active === s.id ? "none" : "1px solid #1E1E28",
            borderRadius: "3px",
            cursor: "pointer",
            fontFamily: "'DM Mono', monospace",
            fontSize: "11px",
            fontWeight: active === s.id ? 700 : 400,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            transition: "all 0.2s ease",
            whiteSpace: "nowrap",
          }}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}

function ContentBlock({ block, accentColor }) {
  return (
    <div
      style={{
        background: "#0E0E16",
        border: "1px solid #1E1E28",
        borderLeft: `3px solid ${accentColor}`,
        borderRadius: "0 4px 4px 0",
        padding: "24px 28px",
        marginBottom: "16px",
      }}
    >
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "18px",
          fontWeight: 600,
          color: "#E0E0E8",
          marginBottom: block.text || block.detail ? 12 : block.steps ? 14 : 0,
        }}
      >
        {block.heading}
      </h3>
      {block.text && (
        <p
          style={{
            fontSize: "14px",
            fontWeight: 300,
            color: "#9A9AAA",
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          {block.text}
        </p>
      )}
      {block.detail && (
        <p
          style={{
            fontSize: "13px",
            fontWeight: 400,
            color: accentColor,
            lineHeight: 1.65,
            marginTop: 10,
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.02em",
          }}
        >
          {block.detail}
        </p>
      )}
      {block.steps && (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {block.steps.map((step, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "11px",
                  color: accentColor,
                  marginTop: "3px",
                  flexShrink: 0,
                  opacity: 0.7,
                  minWidth: "18px",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 300,
                  color: "#9A9AAA",
                  lineHeight: 1.65,
                }}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductMap() {
  const [activeSection, setActiveSection] = useState("core");
  const section = SECTIONS.find((s) => s.id === activeSection);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#08080D",
        color: "#E0E0E8",
        fontFamily: "'IBM Plex Sans', sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <div style={{ padding: "28px 24px 18px", borderBottom: "1px solid #1E1E28" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "22px",
              fontWeight: 700,
              color: "#C9A84C",
              margin: 0,
            }}
          >
            Wave Cascade Registry
          </h1>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              color: "#4A4A5A",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Product Map
          </span>
        </div>
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "12px",
            color: "#3A3A4A",
            margin: "6px 0 0",
          }}
        >
          Powered by MO§ES™ · Ello Cello LLC
        </p>
      </div>

      <SectionNav
        sections={SECTIONS}
        active={activeSection}
        onSelect={setActiveSection}
      />

      {/* Content */}
      {section && (
        <div style={{ padding: "28px 24px", maxWidth: "880px" }}>
          <div style={{ marginBottom: "28px" }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "28px",
                fontWeight: 700,
                color: "#E0E0E8",
                margin: "0 0 6px",
              }}
            >
              {section.content.title}
            </h2>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "13px",
                color: "#5A5A6A",
                margin: 0,
                letterSpacing: "0.04em",
              }}
            >
              {section.content.subtitle}
            </p>
          </div>

          {section.content.blocks.map((block, i) => (
            <ContentBlock key={i} block={block} accentColor={section.color} />
          ))}
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          padding: "20px 24px",
          borderTop: "1px solid #1E1E28",
          marginTop: "40px",
        }}
      >
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "11px",
            color: "#2A2A3A",
            margin: 0,
          }}
        >
          CONFIDENTIAL · Ello Cello LLC · MO§ES™ pending trademark
        </p>
      </div>
    </div>
  );
}
