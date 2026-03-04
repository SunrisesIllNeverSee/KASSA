import { useState } from "react";

const BRAND_DATA = {
  architecture: {
    title: "Brand Architecture",
    subtitle: "Three layers, one thesis",
    layers: [
      {
        name: "burnmydays",
        role: "Origin Brand",
        tagline: "Where the signal was found",
        description:
          "The independent research identity. burnmydays is the credibility layer — the founder's story of collapse, reconstruction, and empirical discovery. It signals authenticity, intellectual seriousness, and outsider conviction.",
        tone: "Personal · Defiant · Earned",
        color: "#E8553A",
      },
      {
        name: "MO§ES™",
        role: "Theoretical Framework",
        tagline: "The constitutional law of AI commitment",
        description:
          "The intellectual property core. MO§ES™ is the system — a governance framework grounded in a conservation law for semantic commitment under compression. It extends Shannon into meaning. It's the thing that makes everything else defensible.",
        tone: "Authoritative · Foundational · Rigorous",
        color: "#C9A84C",
      },
      {
        name: "COMMAND",
        role: "Product Interface",
        tagline: "Govern your AI. Don't just prompt it.",
        description:
          "The commercial surface. COMMAND is the console where the theory becomes operational — constitutional controls, compression settings, epistemic governance. First product. First revenue. First seat.",
        tone: "Operational · Premium · Decisive",
        color: "#4A9EE5",
      },
    ],
  },
  positioning: {
    title: "Core Positioning",
    statement: {
      for: "Organizations and individuals deploying AI at the frontier of decision-making",
      who: "need assurance that meaning survives when language is compressed, delegated, or scaled",
      product: "MO§ES™ (via COMMAND)",
      is: "the first constitutional governance framework for AI semantic integrity",
      that: "mathematically guarantees commitment preservation under recursive compression",
      unlike:
        "prompt engineering tools, alignment research, or enterprise AI platforms that treat governance as a feature checkbox",
      because:
        "MO§ES™ is built on a provable conservation law — C(S) = C₀T(S) — not heuristics, not guardrails, not hope.",
    },
  },
  firstSeat: {
    title: "First Seat Strategy",
    subtitle: "The positioning that converts",
    hooks: [
      {
        label: "The Problem",
        text: "Every AI governance solution on the market is a guardrail bolted onto a system that doesn't understand what it's guarding. They filter outputs. They don't preserve meaning.",
      },
      {
        label: "The Insight",
        text: "Shannon excluded semantics from information theory in 1948 — not because meaning can't be quantified, but because the math didn't exist yet. Transformers changed that. MO§ES™ finishes what Shannon started.",
      },
      {
        label: "The Proof",
        text: "C(S) = C₀T(S) is not a metaphor. It's a conservation law for commitment — empirically derived, mathematically formalized, independently corroborated. The ABBA paper from Imperial College validated the underlying structure months after publication.",
      },
      {
        label: "The Product",
        text: "COMMAND is where you operationalize it. Constitutional controls. Compression fidelity settings. Epistemic governance. Not a chatbot wrapper — a governance console.",
      },
      {
        label: "The Bet",
        text: "Wave 1 pricing. Transferable notes. The first seat isn't a purchase — it's a position. The price doubles at each wave. The question isn't whether this is real. It's whether you see it before the market does.",
      },
    ],
  },
  messaging: {
    title: "Messaging Hierarchy",
    subtitle: "Calibrated by audience",
    audiences: [
      {
        name: "First Seat Buyer",
        icon: "◆",
        primary: "You're not buying software. You're buying a position in the governance layer of AI.",
        secondary:
          "COMMAND operationalizes the first conservation law for semantic commitment. Wave 1 pricing. Transferable notes. This is the ground floor.",
        proof: "Patent-pending. Preprint published. Independent corroboration. Working product at mos2es.io.",
      },
      {
        name: "Enterprise / Institutional",
        icon: "■",
        primary: "Your AI governance stack has no physics. MO§ES™ gives it one.",
        secondary:
          "Constitutional controls for AI semantic integrity — mathematically grounded, not heuristic. Compression fidelity you can measure, not hope for.",
        proof: "Conservation law formalism. Falsification instrument (Commitment Conservation Harness). Audit-ready architecture.",
      },
      {
        name: "Research Community",
        icon: "▲",
        primary: "Shannon left semantics on the table. We picked it up.",
        secondary:
          "MO§ES™ extends information theory into semantic domains via transformer-native mathematical structures. C(S) = C₀T(S) — a conservation law for commitment under recursive compression.",
        proof: "Published preprint. Four provisional patents. Independent structural validation (ABBA, Imperial College).",
      },
      {
        name: "Investors / Partners",
        icon: "●",
        primary:
          "The governance layer for AI doesn't exist yet. We're building it — with the math to back it up.",
        secondary:
          "Deep IP moat: conservation law, patent portfolio, working product. Wave cascade pricing creates built-in demand acceleration. Transferable notes function as investment vehicles.",
        proof: "USPTO filings. Revenue architecture. First-mover in constitutional AI governance.",
      },
    ],
  },
  competitive: {
    title: "Competitive Frame",
    subtitle: "Why nothing else is this",
    columns: [
      {
        header: "Category",
        rows: [
          "Prompt Engineering",
          "AI Safety / Alignment",
          "Enterprise AI Platforms",
          "MO§ES™ / COMMAND",
        ],
      },
      {
        header: "Approach",
        rows: [
          "Optimize input language",
          "Constrain model behavior",
          "Orchestrate AI workflows",
          "Govern semantic commitment",
        ],
      },
      {
        header: "Foundation",
        rows: [
          "Best practices / heuristics",
          "RLHF / constitutional AI training",
          "Enterprise middleware",
          "Conservation law (C(S) = C₀T(S))",
        ],
      },
      {
        header: "Limitation",
        rows: [
          "No formal guarantees",
          "Training-time only, no runtime governance",
          "No semantic theory",
          "—",
        ],
      },
    ],
  },
  essence: {
    title: "Brand Essence",
    core: "Commitment has physics.",
    expansion:
      "When AI compresses, delegates, or scales language — meaning either survives or it doesn't. MO§ES™ is the first framework that treats this as a measurable, governable, conservable quantity. Not a philosophy. Not a feature. A law.",
    principles: [
      {
        name: "Empirical First",
        desc: "The theory was derived from observed effects, not invented in a lab. The math follows the phenomena.",
      },
      {
        name: "Constitutional, Not Cosmetic",
        desc: "Governance at the structural level. Not filters. Not guardrails. Operating principles.",
      },
      {
        name: "Compression-Native",
        desc: "Built for how AI actually works — recursive compression of high-dimensional semantic spaces.",
      },
      {
        name: "Transferable Value",
        desc: "Every seat, every note, every wave carries forward. Early conviction is rewarded structurally.",
      },
    ],
  },
};

const Tab = ({ label, active, onClick, color }) => (
  <button
    onClick={onClick}
    style={{
      padding: "10px 20px",
      background: active ? color || "#C9A84C" : "transparent",
      color: active ? "#0A0A0F" : "#8A8A9A",
      border: active ? "none" : "1px solid #2A2A35",
      borderRadius: "4px",
      cursor: "pointer",
      fontFamily: "'DM Mono', monospace",
      fontSize: "12px",
      fontWeight: active ? 700 : 400,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      transition: "all 0.25s ease",
      whiteSpace: "nowrap",
    }}
  >
    {label}
  </button>
);

const SectionHeader = ({ title, subtitle }) => (
  <div style={{ marginBottom: "32px" }}>
    <h2
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "28px",
        fontWeight: 700,
        color: "#E8E8EC",
        margin: 0,
        letterSpacing: "-0.01em",
      }}
    >
      {title}
    </h2>
    {subtitle && (
      <p
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "13px",
          color: "#6A6A7A",
          margin: "6px 0 0 0",
          letterSpacing: "0.04em",
        }}
      >
        {subtitle}
      </p>
    )}
  </div>
);

const ArchitectureView = () => (
  <div>
    <SectionHeader {...BRAND_DATA.architecture} />
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {BRAND_DATA.architecture.layers.map((layer, i) => (
        <div
          key={i}
          style={{
            background: "#12121A",
            border: `1px solid ${layer.color}33`,
            borderLeft: `3px solid ${layer.color}`,
            borderRadius: "6px",
            padding: "24px 28px",
            transition: "border-color 0.3s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "12px",
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: layer.color,
                }}
              >
                {layer.name}
              </span>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "11px",
                  color: "#6A6A7A",
                  marginLeft: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {layer.role}
              </span>
            </div>
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                color: "#5A5A6A",
                letterSpacing: "0.06em",
              }}
            >
              {layer.tone}
            </span>
          </div>
          <p
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "14px",
              color: "#B0B0BC",
              lineHeight: 1.65,
              margin: "0 0 10px 0",
            }}
          >
            {layer.description}
          </p>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "15px",
              fontStyle: "italic",
              color: `${layer.color}CC`,
            }}
          >
            "{layer.tagline}"
          </div>
        </div>
      ))}
    </div>
    <div
      style={{
        marginTop: "28px",
        padding: "16px 20px",
        background: "#0E0E16",
        border: "1px solid #2A2A35",
        borderRadius: "4px",
      }}
    >
      <p
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "12px",
          color: "#6A6A7A",
          margin: 0,
          lineHeight: 1.7,
        }}
      >
        <span style={{ color: "#C9A84C" }}>NARRATIVE FLOW:</span>{" "}
        burnmydays discovered it. MO§ES™ formalized it. COMMAND operationalizes it.
        The brand architecture mirrors the intellectual journey: empirical observation, mathematical
        theory, commercial product.
      </p>
    </div>
  </div>
);

const PositioningView = () => {
  const s = BRAND_DATA.positioning.statement;
  const fields = [
    { label: "FOR", value: s.for },
    { label: "WHO", value: s.who },
    { label: "THE PRODUCT", value: s.product },
    { label: "IS THE", value: s.is },
    { label: "THAT", value: s.that },
    { label: "UNLIKE", value: s.unlike },
    { label: "BECAUSE", value: s.because },
  ];
  return (
    <div>
      <SectionHeader {...BRAND_DATA.positioning} />
      <div
        style={{
          background: "#12121A",
          border: "1px solid #C9A84C33",
          borderRadius: "6px",
          padding: "32px",
        }}
      >
        {fields.map((f, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "baseline",
              padding: "14px 0",
              borderBottom: i < fields.length - 1 ? "1px solid #1A1A25" : "none",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
                color: "#C9A84C",
                letterSpacing: "0.12em",
                minWidth: "100px",
                textAlign: "right",
                flexShrink: 0,
              }}
            >
              {f.label}
            </span>
            <span
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: "15px",
                color: "#D0D0DC",
                lineHeight: 1.6,
              }}
            >
              {f.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const FirstSeatView = () => (
  <div>
    <SectionHeader {...BRAND_DATA.firstSeat} />
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      {BRAND_DATA.firstSeat.hooks.map((hook, i) => (
        <div
          key={i}
          style={{
            background: "#12121A",
            padding: "22px 28px",
            borderLeft: "2px solid",
            borderImage: `linear-gradient(to bottom, ${
              i === 4 ? "#C9A84C" : "#4A9EE5"
            }, transparent) 1`,
            position: "relative",
          }}
        >
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              color: i === 4 ? "#C9A84C" : "#4A9EE5",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            {String(i + 1).padStart(2, "0")} — {hook.label}
          </div>
          <p
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "14px",
              color: "#B8B8C8",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {hook.text}
          </p>
        </div>
      ))}
    </div>
    <div
      style={{
        marginTop: "24px",
        padding: "16px 20px",
        background: "#C9A84C11",
        border: "1px solid #C9A84C33",
        borderRadius: "4px",
      }}
    >
      <p
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "12px",
          color: "#C9A84C",
          margin: 0,
          lineHeight: 1.7,
        }}
      >
        This sequence moves from intellectual credibility to commercial urgency.
        The first seat buyer needs to feel both that this is real AND that timing matters.
      </p>
    </div>
  </div>
);

const MessagingView = () => {
  const [activeAudience, setActiveAudience] = useState(0);
  const aud = BRAND_DATA.messaging.audiences[activeAudience];
  return (
    <div>
      <SectionHeader {...BRAND_DATA.messaging} />
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        {BRAND_DATA.messaging.audiences.map((a, i) => (
          <button
            key={i}
            onClick={() => setActiveAudience(i)}
            style={{
              padding: "8px 16px",
              background: i === activeAudience ? "#1E1E2A" : "transparent",
              color: i === activeAudience ? "#E8E8EC" : "#5A5A6A",
              border: `1px solid ${i === activeAudience ? "#4A9EE5" : "#2A2A35"}`,
              borderRadius: "4px",
              cursor: "pointer",
              fontFamily: "'DM Mono', monospace",
              fontSize: "12px",
              transition: "all 0.2s ease",
            }}
          >
            <span style={{ marginRight: "6px" }}>{a.icon}</span>
            {a.name}
          </button>
        ))}
      </div>
      <div
        style={{
          background: "#12121A",
          border: "1px solid #2A2A35",
          borderRadius: "6px",
          padding: "28px",
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "10px",
              color: "#4A9EE5",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            PRIMARY MESSAGE
          </div>
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "20px",
              color: "#E8E8EC",
              lineHeight: 1.5,
              margin: 0,
              fontWeight: 600,
            }}
          >
            {aud.primary}
          </p>
        </div>
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "10px",
              color: "#6A6A7A",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            SUPPORTING MESSAGE
          </div>
          <p
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "14px",
              color: "#9A9AAA",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {aud.secondary}
          </p>
        </div>
        <div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "10px",
              color: "#6A6A7A",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            PROOF POINTS
          </div>
          <p
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "13px",
              color: "#7A7A8A",
              lineHeight: 1.7,
              margin: 0,
              fontStyle: "italic",
            }}
          >
            {aud.proof}
          </p>
        </div>
      </div>
    </div>
  );
};

const CompetitiveView = () => (
  <div>
    <SectionHeader {...BRAND_DATA.competitive} />
    <div
      style={{
        overflowX: "auto",
        borderRadius: "6px",
        border: "1px solid #2A2A35",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: "13px",
          minWidth: "500px",
        }}
      >
        <thead>
          <tr>
            {BRAND_DATA.competitive.columns.map((col, i) => (
              <th
                key={i}
                style={{
                  padding: "14px 18px",
                  background: "#0E0E16",
                  color: "#C9A84C",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textAlign: "left",
                  borderBottom: "1px solid #2A2A35",
                  fontWeight: 600,
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {BRAND_DATA.competitive.columns[0].rows.map((_, rowIdx) => (
            <tr
              key={rowIdx}
              style={{
                background:
                  rowIdx === 3 ? "#C9A84C0A" : rowIdx % 2 === 0 ? "#12121A" : "#0E0E16",
              }}
            >
              {BRAND_DATA.competitive.columns.map((col, colIdx) => (
                <td
                  key={colIdx}
                  style={{
                    padding: "12px 18px",
                    color: rowIdx === 3 ? "#E8E8EC" : "#8A8A9A",
                    borderBottom: "1px solid #1A1A25",
                    fontWeight: rowIdx === 3 && colIdx === 0 ? 700 : 400,
                  }}
                >
                  {col.rows[rowIdx]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const EssenceView = () => (
  <div>
    <SectionHeader {...BRAND_DATA.essence} />
    <div
      style={{
        background: "#12121A",
        border: "1px solid #C9A84C44",
        borderRadius: "6px",
        padding: "40px 36px",
        textAlign: "center",
        marginBottom: "28px",
      }}
    >
      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "36px",
          fontWeight: 700,
          color: "#C9A84C",
          marginBottom: "16px",
          letterSpacing: "-0.01em",
        }}
      >
        {BRAND_DATA.essence.core}
      </div>
      <p
        style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: "15px",
          color: "#8A8A9A",
          lineHeight: 1.8,
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        {BRAND_DATA.essence.expansion}
      </p>
    </div>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px",
      }}
    >
      {BRAND_DATA.essence.principles.map((p, i) => (
        <div
          key={i}
          style={{
            background: "#0E0E16",
            border: "1px solid #2A2A35",
            borderRadius: "4px",
            padding: "20px",
          }}
        >
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "12px",
              color: "#C9A84C",
              letterSpacing: "0.06em",
              marginBottom: "8px",
              fontWeight: 600,
            }}
          >
            {p.name}
          </div>
          <p
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: "13px",
              color: "#7A7A8A",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {p.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const TABS = [
  { label: "Architecture", color: "#C9A84C" },
  { label: "Positioning", color: "#C9A84C" },
  { label: "First Seat", color: "#4A9EE5" },
  { label: "Messaging", color: "#4A9EE5" },
  { label: "Competitive", color: "#E8553A" },
  { label: "Essence", color: "#C9A84C" },
];

const VIEWS = [
  ArchitectureView,
  PositioningView,
  FirstSeatView,
  MessagingView,
  CompetitiveView,
  EssenceView,
];

export default function BrandPositioning() {
  const [activeTab, setActiveTab] = useState(0);
  const ActiveView = VIEWS[activeTab];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0A0A0F",
        color: "#E8E8EC",
        fontFamily: "'IBM Plex Sans', sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          borderBottom: "1px solid #1A1A25",
          padding: "28px 32px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "14px",
            marginBottom: "4px",
            flexWrap: "wrap",
          }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "24px",
              fontWeight: 700,
              color: "#C9A84C",
              margin: 0,
            }}
          >
            MO§ES™
          </h1>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              color: "#5A5A6A",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Brand Positioning Framework
          </span>
        </div>
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "12px",
            color: "#4A4A5A",
            margin: "6px 0 0 0",
          }}
        >
          Ello Cello LLC · burnmydays · v1.0 — DRAFT
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "6px",
          padding: "16px 32px",
          borderBottom: "1px solid #1A1A25",
          overflowX: "auto",
          flexWrap: "wrap",
        }}
      >
        {TABS.map((tab, i) => (
          <Tab
            key={i}
            label={tab.label}
            active={i === activeTab}
            onClick={() => setActiveTab(i)}
            color={tab.color}
          />
        ))}
      </div>

      <div style={{ padding: "32px", maxWidth: "860px" }}>
        <ActiveView />
      </div>

      <div
        style={{
          padding: "20px 32px",
          borderTop: "1px solid #1A1A25",
          marginTop: "40px",
        }}
      >
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "11px",
            color: "#3A3A4A",
            margin: 0,
          }}
        >
          CONFIDENTIAL · Ello Cello LLC · MO§ES™ is a pending trademark of Ello Cello LLC
        </p>
      </div>
    </div>
  );
}
