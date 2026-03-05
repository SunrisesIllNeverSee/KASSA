import { useState } from "react";

const USE_CASES = [
  {
    id: "core-function",
    label: "What It Replaces",
    color: "#C9A84C",
    items: [
      {
        title: "The Sales Motion",
        fit: "replaces",
        description:
          "Cold outreach, demos, proposals, follow-ups, negotiation, closing. The registry replaces all of it. Scarcity sells. Price escalation creates deadlines. The visual board creates social proof. The founder never picks up the phone.",
        founder_gets: "Never sell again",
      },
      {
        title: "The Funding Round",
        fit: "replaces",
        description:
          "Pre-seed, seed, even Series A for some products. First-wave buyers are investors who also use the product. $325K from five seats at $65K = a pre-seed with zero dilution, zero cap table complexity, zero board seats.",
        founder_gets: "Never pitch a VC",
      },
      {
        title: "Price Discovery",
        fit: "replaces",
        description:
          "Instead of guessing what to charge or hiring a pricing consultant, the wave cascade discovers price through market behavior. If Wave 1 fills instantly, you underpriced. If it stalls, you adjust. Transfers reveal true market value.",
        founder_gets: "Never guess pricing again",
      },
      {
        title: "Customer Qualification",
        fit: "replaces",
        description:
          "The price IS the filter. At $65K, tire-kickers self-select out. Every inquiry represents genuine commitment. No lead scoring, no MQL/SQL nonsense, no discovery calls to figure out if someone's serious.",
        founder_gets: "Never qualify a lead",
      },
      {
        title: "Distribution Strategy",
        fit: "replaces",
        description:
          "Transferability turns every buyer into a potential distribution channel. They can resell their position to someone in their network. The founder doesn't build a sales team — the holders ARE the network.",
        founder_gets: "Never build a sales team",
      },
    ],
  },
  {
    id: "high-fit",
    label: "High Fit",
    color: "#7EC86E",
    items: [
      {
        title: "Enterprise Software / Governance Tools",
        fit: "high",
        description:
          "Your COMMAND model. High-value, limited-seat licenses for software that governs, controls, or orchestrates. The buyer needs exclusivity because the tool's value comes from being one of few who have it.",
        seats: "5–50 seats across 3–5 waves",
        price_range: "$25K–$500K per seat",
        transfer: "High — positions appreciate as product matures",
        example: "AI governance console, compliance platform, proprietary analytics suite",
      },
      {
        title: "API / Model Access",
        fit: "high",
        description:
          "AI companies licensing access to proprietary models, datasets, or APIs. Fixed number of integration partners. Each seat = right to embed or call the API. Wave gating controls rollout speed and partner quality.",
        seats: "10–100 seats across 3–8 waves",
        price_range: "$5K–$200K per seat",
        transfer: "Medium-High — transfer = selling your API allocation to another company",
        example: "Proprietary LLM access, specialized training data license, vertical AI model",
      },
      {
        title: "Franchise / Territory Rights",
        fit: "high",
        description:
          "Geographic or vertical territories for a service business. Each seat = exclusive right to operate in a defined territory. Naturally scarce. Price escalates as best territories fill.",
        seats: "10–200 seats (one per territory)",
        price_range: "$10K–$150K per territory",
        transfer: "High — territory rights have clear resale value",
        example: "Cleaning franchise, consulting territory, delivery zone license",
      },
      {
        title: "Creator / Community Founding Positions",
        fit: "high",
        description:
          "Founding member seats for communities, DAOs, creator collectives, private networks. The seat represents status and access, not just a subscription. Limited supply is the point — it's a private club.",
        seats: "25–500 seats across 5–10 waves",
        price_range: "$500–$25K per seat",
        transfer: "High — founding positions appreciate as community grows",
        example: "Private research collective, investment club, creator guild, mastermind group",
      },
      {
        title: "Physical Product Pre-Launch (Limited Edition)",
        fit: "high",
        description:
          "Limited-run physical products where scarcity is real, not manufactured. Custom watches, small-batch hardware, artisan goods. Each seat = claim on a unit in the production run. Wave gating matches production batches.",
        seats: "10–1000 seats matching production capacity",
        price_range: "$200–$50K per unit",
        transfer: "Medium — transfers before delivery = position trading",
        example: "Custom mechanical watch, boutique hardware device, limited-edition instrument",
      },
    ],
  },
  {
    id: "medium-fit",
    label: "Medium Fit",
    color: "#C9A84C",
    items: [
      {
        title: "SaaS Early Access (Pre-Launch)",
        fit: "medium",
        description:
          "Works as a launch mechanism — founding seats for a SaaS product before it goes to general availability. But only if the founder is willing to cap access permanently or convert founding seats to special tiers. Doesn't work if the plan is to open to everyone eventually at the same price.",
        seats: "25–200 founding seats across 3–5 waves",
        price_range: "$500–$10K per seat (lifetime or annual)",
        transfer: "Medium — depends on whether seat conveys ongoing benefits",
        condition: "Founder must commit to permanent differentiation between founding and general tiers",
        example: "Dev tools, analytics platform, niche vertical SaaS",
      },
      {
        title: "Course / Program Enrollment",
        fit: "medium",
        description:
          "Cohort-based courses or accelerator programs with limited enrollment. Each wave = a cohort. Price escalates as the program builds reputation. Works if the program is genuinely capacity-limited.",
        seats: "10–50 per cohort, multiple cohorts",
        price_range: "$1K–$25K per seat",
        transfer: "Low-Medium — seat could transfer to another enrollee before start date",
        condition: "Must be genuinely exclusive, not artificially scarce",
        example: "AI engineering bootcamp, executive coaching cohort, specialized certification",
      },
      {
        title: "Real Estate / Development Phases",
        fit: "medium",
        description:
          "Phased property releases where each wave = a development phase. Early buyers get lower prices. Works well structurally but real estate has its own heavy regulatory framework that may conflict.",
        seats: "Varies by development",
        price_range: "Varies",
        transfer: "High — property rights are inherently transferable",
        condition: "Must navigate real estate securities law in applicable jurisdiction",
        example: "Condo pre-sales, coworking memberships, marina slip leases",
      },
    ],
  },
  {
    id: "low-fit",
    label: "Low / No Fit",
    color: "#E8553A",
    items: [
      {
        title: "Consumer Apps (Mass Market)",
        fit: "low",
        description:
          "If you're building an app that wants millions of users, the registry doesn't help. The entire model is built on scarcity. Mass-market apps need the opposite — frictionless onboarding, zero barriers, growth at all costs. You can't wave-gate TikTok.",
        why_not: "Infinite supply model. No natural seat limit. Users expect free tier.",
      },
      {
        title: "Commodity SaaS (Compete on Price)",
        fit: "low",
        description:
          "If your product competes in a crowded market on price (email marketing, basic CRM, project management), artificial scarcity won't work because alternatives are abundant. The buyer has no reason to commit at a premium for a founding position in a commodity tool.",
        why_not: "No differentiation to justify premium positioning. Buyers have infinite alternatives.",
      },
      {
        title: "Open Source / Freemium Products",
        fit: "low",
        description:
          "The core value proposition of open source is access. The core value proposition of the registry is restriction. These are fundamentally incompatible. You can't wave-gate something the community expects to fork.",
        why_not: "Philosophical conflict with open access. Community backlash risk.",
      },
      {
        title: "Subscription Media / Content",
        fit: "low",
        description:
          "Newsletters, podcasts, streaming — content scales to infinite consumption. There's no natural seat limit unless you're running a private intelligence service. Even Substack's 'founding member' tier is just a higher price point, not a scarce position.",
        why_not: "Content consumption doesn't benefit from artificial scarcity. No transfer logic.",
      },
      {
        title: "Anything Where the Founder Wants Volume",
        fit: "low",
        description:
          "If your business model depends on maximizing the number of customers, the registry is the wrong instrument. It's designed for founders who want fewer, higher-conviction buyers. Volume and scarcity are structurally opposed.",
        why_not: "The registry optimizes for conviction density, not customer count.",
      },
    ],
  },
  {
    id: "decision",
    label: "Founder Decision Tree",
    color: "#9E6EC8",
    items: [
      {
        title: "Question 1: Is your supply genuinely limited?",
        fit: "question",
        description:
          "Not 'could you limit it' but 'does the product or service have a natural capacity constraint?' If you're hand-building something, licensing something proprietary, or serving a market where exclusivity creates value — yes. If you could serve 10,000 customers as easily as 10 — probably no.",
      },
      {
        title: "Question 2: Do early buyers deserve a better price?",
        fit: "question",
        description:
          "If the product is riskier, less proven, or less featured at launch, then early buyers ARE taking on more risk and SHOULD pay less. The wave cascade formalizes this — it's not a discount, it's risk-adjusted pricing. If your product is equally good on day 1 and day 1000, the cascade doesn't apply.",
      },
      {
        title: "Question 3: Would your buyers benefit from transferability?",
        fit: "question",
        description:
          "If a buyer's circumstances change (pivots, gets acquired, changes strategy), can they sell their position to someone else? If the seat has standalone value that persists beyond the original buyer's use case, transferability creates a secondary market. If value is purely personal (like a course completion), transfer doesn't make sense.",
      },
      {
        title: "Question 4: Do you want to sell, or let the structure sell?",
        fit: "question",
        description:
          "This is the real question. If you enjoy sales, negotiation, relationship-based closing — you don't need this. If you'd rather build the product and let the commercial structure do the work of converting interest into commitment — this is what it's for.",
      },
      {
        title: "Question 5: Are you comfortable leaving money on the table?",
        fit: "question",
        description:
          "Wave 1 is always the cheapest. You will sell your first seats below what the market would eventually bear. That's the design — early believers get rewarded for risk. If you can't stomach selling a $65K seat that might be worth $200K in a year, the cascade will feel wrong. If you understand that the early discount IS the mechanism that creates the later appreciation, it'll feel right.",
      },
    ],
  },
];

const FIT_BADGES = {
  high: { label: "HIGH FIT", bg: "rgba(126,200,110,0.15)", color: "#7EC86E" },
  medium: { label: "MEDIUM FIT", bg: "rgba(201,168,76,0.15)", color: "#C9A84C" },
  low: { label: "LOW / NO FIT", bg: "rgba(232,85,58,0.15)", color: "#E8553A" },
  replaces: { label: "REPLACES", bg: "rgba(201,168,76,0.15)", color: "#C9A84C" },
  question: { label: "ASK", bg: "rgba(158,110,200,0.15)", color: "#9E6EC8" },
};

function Card({ item, accentColor }) {
  const [expanded, setExpanded] = useState(false);
  const badge = FIT_BADGES[item.fit];

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        background: "#0E0E16",
        border: "1px solid #1E1E28",
        borderLeft: `3px solid ${accentColor}`,
        borderRadius: "0 4px 4px 0",
        padding: "20px 24px",
        marginBottom: "10px",
        cursor: "pointer",
        transition: "border-color 0.2s",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "17px",
              fontWeight: 600,
              color: "#E0E0E8",
              margin: "0 0 6px",
            }}
          >
            {item.title}
          </h3>
          {badge && (
            <span
              style={{
                display: "inline-block",
                fontFamily: "'DM Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.12em",
                padding: "3px 10px",
                borderRadius: "2px",
                background: badge.bg,
                color: badge.color,
              }}
            >
              {badge.label}
            </span>
          )}
        </div>
        <span
          style={{
            color: "#4A4A5A",
            fontSize: "14px",
            transform: expanded ? "rotate(180deg)" : "none",
            transition: "transform 0.2s",
            flexShrink: 0,
            marginTop: "4px",
          }}
        >
          ▾
        </span>
      </div>

      {expanded && (
        <div style={{ marginTop: "16px" }}>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 300,
              color: "#9A9AAA",
              lineHeight: 1.75,
              margin: "0 0 14px",
            }}
          >
            {item.description}
          </p>

          {item.founder_gets && (
            <div
              style={{
                background: "rgba(201,168,76,0.08)",
                border: "1px solid rgba(201,168,76,0.2)",
                borderRadius: "3px",
                padding: "10px 14px",
                fontFamily: "'DM Mono', monospace",
                fontSize: "13px",
                color: "#C9A84C",
              }}
            >
              → {item.founder_gets}
            </div>
          )}

          {item.seats && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
                marginTop: "6px",
              }}
            >
              {[
                ["Seats", item.seats],
                ["Price Range", item.price_range],
                ["Transfer Value", item.transfer],
                ...(item.condition ? [["Condition", item.condition]] : []),
                ...(item.example ? [["Examples", item.example]] : []),
              ].map(([label, val], i) => (
                <div
                  key={i}
                  style={{
                    background: "#0A0A12",
                    padding: "10px 12px",
                    borderRadius: "3px",
                    gridColumn: i >= 3 ? "1 / -1" : "auto",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "10px",
                      color: "#5A5A6A",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 300,
                      color: "#9A9AAA",
                      lineHeight: 1.5,
                    }}
                  >
                    {val}
                  </div>
                </div>
              ))}
            </div>
          )}

          {item.why_not && (
            <div
              style={{
                background: "rgba(232,85,58,0.08)",
                border: "1px solid rgba(232,85,58,0.2)",
                borderRadius: "3px",
                padding: "10px 14px",
                fontFamily: "'DM Mono', monospace",
                fontSize: "12px",
                color: "#E8553A",
                marginTop: "6px",
              }}
            >
              ✗ {item.why_not}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function UseCaseMap() {
  const [activeTab, setActiveTab] = useState("core-function");
  const section = USE_CASES.find((s) => s.id === activeTab);

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
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Mono:wght@300;400;500&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div style={{ padding: "28px 24px 18px", borderBottom: "1px solid #1E1E28" }}>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "22px",
            fontWeight: 700,
            color: "#C9A84C",
            margin: "0 0 4px",
          }}
        >
          Wave Cascade Registry — Use Case Map
        </h1>
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "12px",
            color: "#3A3A4A",
            margin: 0,
          }}
        >
          Where it works · Where it doesn't · What the founder stops doing
        </p>
      </div>

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
        {USE_CASES.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveTab(s.id)}
            style={{
              padding: "8px 16px",
              background: activeTab === s.id ? s.color : "transparent",
              color: activeTab === s.id ? "#08080D" : "#6A6A7A",
              border: activeTab === s.id ? "none" : "1px solid #1E1E28",
              borderRadius: "3px",
              cursor: "pointer",
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              fontWeight: activeTab === s.id ? 700 : 400,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {section && (
        <div style={{ padding: "24px", maxWidth: "880px" }}>
          {section.items.map((item, i) => (
            <Card key={i} item={item} accentColor={section.color} />
          ))}
        </div>
      )}

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
