import { useState } from "react";

const SECTIONS = [
  {
    id: "tam",
    label: "Total Market",
    color: "#C9A84C",
  },
  {
    id: "layers",
    label: "Revenue Layers",
    color: "#7EC86E",
  },
  {
    id: "math",
    label: "The Math",
    color: "#5A8FD4",
  },
  {
    id: "comps",
    label: "Comparables",
    color: "#9E6EC8",
  },
  {
    id: "realestate",
    label: "Real Estate",
    color: "#E8553A",
  },
];

function StatBlock({ label, value, sub, color = "#C9A84C" }) {
  return (
    <div style={{ background: "#0E0E16", border: "1px solid #1E1E28", borderRadius: "4px", padding: "16px 20px" }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#4A4A5A", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "6px" }}>{label}</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700, color }}>{value}</div>
      {sub && <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "12px", color: "#5A5A6A", marginTop: "4px", lineHeight: 1.5 }}>{sub}</div>}
    </div>
  );
}

function Row({ children }) {
  return <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px", marginBottom: "12px" }}>{children}</div>;
}

function Callout({ text, color = "#C9A84C" }) {
  return (
    <div style={{ background: `${color}08`, border: `1px solid ${color}25`, borderLeft: `3px solid ${color}`, borderRadius: "0 4px 4px 0", padding: "14px 18px", margin: "16px 0", fontSize: "14px", color: "#9A9AAA", lineHeight: 1.7, fontStyle: "italic" }}>
      {text}
    </div>
  );
}

function Section({ title, children, color = "#C9A84C" }) {
  return (
    <div style={{ marginBottom: "32px" }}>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 600, color, margin: "0 0 16px", borderBottom: `1px solid ${color}25`, paddingBottom: "8px" }}>{title}</h3>
      {children}
    </div>
  );
}

function P({ children }) {
  return <p style={{ fontSize: "13px", color: "#8A8A9A", lineHeight: 1.8, margin: "0 0 12px", maxWidth: "720px" }}>{children}</p>;
}

function TotalMarket() {
  return (
    <>
      <Section title="The Supply of Products That Need Distribution" color="#C9A84C">
        <Row>
          <StatBlock label="Startups Worldwide" value="150M+" sub="50 million new ones per year. 137,000 per day." />
          <StatBlock label="SaaS Companies" value="42,000" sub="30,800 subscription-based. 12,400 in the US alone." />
          <StatBlock label="New US Businesses / Year" value="5.2M" sub="2024 business applications filed." />
        </Row>
        <Row>
          <StatBlock label="Global Startup Economy" value="$3.8T" sub="Total value of the startup ecosystem." />
          <StatBlock label="VC Funding Q2 2025" value="$91B" sub="AI startups alone captured $19B (28%)." />
          <StatBlock label="Startup Failure Rate" value="90%" sub="First-time founders succeed 18% of the time." />
        </Row>
        <Callout text="Every one of these products needs to be found. They all need distribution. The marketplace serves 100% of them as a listing. The cascade serves them as a transaction instrument — either for their product or for themselves." />
      </Section>

      <Section title="Three Addressable Segments" color="#C9A84C">
        <div style={{ background: "#0E0E16", border: "1px solid #1E1E28", borderRadius: "4px", padding: "20px", marginBottom: "12px" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#7EC86E", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>Segment A — Cascade the Product (5–10%)</div>
          <P>Enterprise tools, API access, governance platforms, franchise rights, limited hardware, boutique products. These have natural capacity constraints. The cascade replaces their sales motion. ~2,000–4,200 SaaS companies + ~3,000–5,000 non-SaaS (hardware, franchises, creator programs, cohort courses). Total: 5,000–9,000 products globally.</P>
        </div>
        <div style={{ background: "#0E0E16", border: "1px solid #1E1E28", borderRadius: "4px", padding: "20px", marginBottom: "12px" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#5A8FD4", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>Segment B — Cascade Lifetime Seats (80–90%)</div>
          <P>Every freemium app, every subscription SaaS, every volume product. They keep their existing model. They ALSO offer a scarce tranche of lifetime transferable seats through the cascade. 50 founding seats. 100 premium positions. One-time purchase, transferable, appreciating. This serves the ~35,000+ SaaS companies that can't cascade their distribution but CAN cascade a premium layer. Plus every app, every creator tool, every platform.</P>
        </div>
        <div style={{ background: "#0E0E16", border: "1px solid #1E1E28", borderRadius: "4px", padding: "20px" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#C9A84C", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>Segment C — Open Marketplace Listing (100%)</div>
          <P>Every product. Free listing. Product Hunt without the upvote theater. Crunchbase without the paywall. AI-generated profiles. Community curation. This is the traffic layer. The top of funnel. Every list of startups that TechCrunch, Product Hunt, or any AI agent produces is free marketing material for a marketplace that doesn't exist yet. You aggregate what's already being produced.</P>
        </div>
      </Section>
    </>
  );
}

function RevenueLayers() {
  return (
    <>
      <Section title="Layer 1 — Open Marketplace (Free)" color="#7EC86E">
        <Row>
          <StatBlock label="Cost to List" value="$0" sub="Zero friction. Self-service. AI-assisted profiles." color="#7EC86E" />
          <StatBlock label="Revenue Model" value="Traffic" sub="The crowd. Eyeballs. Discovery. Top of funnel for everything below." color="#7EC86E" />
          <StatBlock label="Comparable" value="Product Hunt" sub="~5-10M monthly visits. Monetizes promoted launches. Leaves all transaction revenue on the table." color="#7EC86E" />
        </Row>
        <P>The marketplace doesn't need to be better than Product Hunt. It needs to exist where Product Hunt doesn't — at the transaction layer. Product Hunt shows you products. This shows you products AND lets you buy positions in them.</P>
      </Section>

      <Section title="Layer 2 — Lifetime Seat Cascade (The Discovery)" color="#7EC86E">
        <Row>
          <StatBlock label="What It Is" value="Scarce Tranche" sub="50–200 lifetime transferable seats per product, layered on top of existing pricing model." color="#7EC86E" />
          <StatBlock label="Platform Take" value="3–5%" sub="On primary sale. Plus 1–2% on every transfer." color="#7EC86E" />
          <StatBlock label="Seller Cost to Deploy" value="$0" sub="Already built. Zero risk. Works or it doesn't. No contract, no subscription, no commitment." color="#7EC86E" />
        </Row>
        <Callout text="This is the breakthrough. Every SaaS product with a monthly subscription has users who would pay once to own it forever. Every founder would rather have $200K in upfront capital than bleed through monthly MRR. The lifetime seat doesn't replace the subscription — it capitalizes it. The founder gets a mini funding round from customers. The buyer gets an asset that transfers." color="#7EC86E" />

        <div style={{ background: "#0E0E16", border: "1px solid #1E1E28", borderRadius: "4px", padding: "20px" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#C9A84C", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>Example: A $29/mo SaaS Tool with 5,000 Users</div>
          <P>Subscription revenue: $145K/mo = $1.74M/year. Healthy. But growing slowly.</P>
          <P>Now add: 100 lifetime founding seats across 4 waves. Wave 1 (25 seats): $500. Wave 2 (25): $750. Wave 3 (25): $1,000. Wave 4 (25): $1,500.</P>
          <P>Total primary revenue: $93,750. Non-dilutive. Immediate. From users who are now permanent stakeholders with transferable positions.</P>
          <P>Platform take at 4%: $3,750 per product.</P>
          <P>When a lifetime seat holder churns, they don't cancel — they sell the seat. Transfer at $1,200 (Wave 1 appreciation). Platform takes 1.5%: $18 per transfer. But the seat never dies. It just changes hands. Recurring revenue on a non-recurring instrument.</P>
        </div>
      </Section>

      <Section title="Layer 3 — Full Product Cascade (Original Model)" color="#7EC86E">
        <Row>
          <StatBlock label="What It Is" value="Distribution Instrument" sub="The cascade replaces sales, funding, price discovery, and customer qualification for capacity-constrained products." color="#7EC86E" />
          <StatBlock label="Avg Seat Value" value="$5K–$500K" sub="Enterprise governance, API access, franchise rights, hardware pre-orders." color="#7EC86E" />
          <StatBlock label="Platform Take" value="3–5% Primary" sub="Plus 1–2% on transfers. Higher absolute fees on higher-value instruments." color="#7EC86E" />
        </Row>
      </Section>

      <Section title="Layer 4 — Marketplace Cascade (Meta Layer)" color="#7EC86E">
        <P>The marketplace itself can cascade premium positions. Featured listings. Category sponsorships. Verified badges. Limited partner slots. The platform eats its own cooking — using the cascade to distribute access to the marketplace's own premium features.</P>
      </Section>
    </>
  );
}

function TheMath() {
  const scenarios = [
    {
      name: "Year 1 — Seed",
      listings: "500",
      cascadeProducts: "25",
      lifetimeSeats: "50",
      primaryGMV: "$2.8M",
      platformRev: "$140K",
      transferRev: "$12K",
      saasRev: "$30K",
      total: "$182K",
      notes: "500 open listings drive traffic. 25 capacity-constrained products deploy full cascades (avg 20 seats × $5K = $2.5M). 50 SaaS/apps deploy lifetime seat tranches (avg 50 seats × $600 = $1.5M total, but many don't sell through — 20% sell-through = $300K). Conservative. Building the flywheel.",
    },
    {
      name: "Year 2 — Traction",
      listings: "5,000",
      cascadeProducts: "150",
      lifetimeSeats: "800",
      primaryGMV: "$28M",
      platformRev: "$1.12M",
      transferRev: "$180K",
      saasRev: "$240K",
      total: "$1.54M",
      notes: "Network effects kick in. Marketplace traffic attracts founders who deploy cascades. 5% of lifetime seats transfer annually — generating recurring fee revenue on instruments that cost zero to maintain. Pro/Enterprise SaaS subscriptions for dashboard and analytics.",
    },
    {
      name: "Year 3 — Flywheel",
      listings: "20,000",
      cascadeProducts: "500",
      lifetimeSeats: "5,000",
      primaryGMV: "$180M",
      platformRev: "$7.2M",
      transferRev: "$2.4M",
      saasRev: "$1.2M",
      total: "$10.8M",
      notes: "Secondary market becomes meaningful. Transfer volume exceeds new issuance on mature registries. Marketplace becomes the go-to discovery platform for startup products. Category becomes recognized. First institutional interest.",
    },
    {
      name: "Year 5 — Scale",
      listings: "100,000+",
      cascadeProducts: "2,000",
      lifetimeSeats: "25,000",
      primaryGMV: "$800M+",
      platformRev: "$32M",
      transferRev: "$18M",
      saasRev: "$8M",
      total: "$58M+",
      notes: "At scale, the secondary market generates more revenue than primary issuance. Every seat ever sold continues to produce transfer fees indefinitely. The instrument creates its own perpetual revenue stream. Comparable to mid-stage marketplace platforms.",
    },
  ];

  return (
    <>
      <Section title="Revenue Projections by Year" color="#5A8FD4">
        {scenarios.map((s, i) => (
          <div key={i} style={{ background: "#0E0E16", border: "1px solid #1E1E28", borderRadius: "4px", padding: "20px", marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "12px" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 600, color: "#E0E0E8" }}>{s.name}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 700, color: "#C9A84C" }}>{s.total}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "8px", marginBottom: "12px" }}>
              {[
                ["Listings", s.listings],
                ["Cascade Products", s.cascadeProducts],
                ["Lifetime Seat Products", s.lifetimeSeats],
                ["Primary GMV", s.primaryGMV],
                ["Platform Fees", s.platformRev],
                ["Transfer Fees", s.transferRev],
                ["SaaS Revenue", s.saasRev],
              ].map(([l, v], j) => (
                <div key={j} style={{ background: "#08080D", borderRadius: "3px", padding: "8px 10px" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", color: "#3A3A4A", letterSpacing: "0.1em", textTransform: "uppercase" }}>{l}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#7A7A8A", marginTop: "2px" }}>{v}</div>
                </div>
              ))}
            </div>
            <P>{s.notes}</P>
          </div>
        ))}
      </Section>

      <Section title="The Compounding Transfer Effect" color="#5A8FD4">
        <Callout text="Here's what makes the economics unusual: every seat ever sold through the cascade is a permanent revenue-generating instrument. Subscriptions churn. One-time sales are one-time. But a transferable seat produces a fee every time it changes hands — forever. A seat sold in Year 1 that transfers once per year at 1.5% generates platform revenue in Year 1, Year 2, Year 3... indefinitely. The installed base of seats is a perpetual annuity of transfer fees." color="#5A8FD4" />
        <Row>
          <StatBlock label="Year 3 Installed Base" value="~85K seats" sub="All seats ever sold across all registries. Each one a potential transfer fee." color="#5A8FD4" />
          <StatBlock label="5% Annual Transfer Rate" value="4,250 transfers" sub="At avg $2K seat value and 1.5% fee = $127K/year from seats that cost nothing to maintain." color="#5A8FD4" />
          <StatBlock label="Year 5 Installed Base" value="~350K+ seats" sub="Transfer revenue begins to exceed primary issuance revenue. The flywheel compounds." color="#5A8FD4" />
        </Row>
      </Section>
    </>
  );
}

function Comparables() {
  const comps = [
    { name: "Product Hunt", metric: "5-10M monthly visits", revenue: "~$20-30M (est)", model: "Promoted launches, Ship subscriptions", gap: "Zero transaction layer. Shows you products but can't sell you a position in them. All GMV flows elsewhere." },
    { name: "Pump.fun", metric: "11.9M tokens launched", revenue: "$800M+ lifetime", model: "1% swap fee + graduation fee", gap: "Zero quality gate. 98.6% rug-pull rate. 1.4% graduation rate. $800M revenue proves the mechanism. The failure rate proves it needs structure." },
    { name: "Republic / Wefunder", metric: "~$2B+ raised for startups", revenue: "Platform fees on raises", model: "Equity crowdfunding + transaction fees", gap: "SEC overhead. 18-month timelines. Dilution. Cap table complexity. The cascade offers the capital raise without the equity giveaway." },
    { name: "Stripe", metric: "$1T+ payment volume", revenue: "~$16B (2024)", model: "2.9% + 30¢ per transaction", gap: "Processes transactions but doesn't create distribution. Stripe doesn't help you get found. It helps you get paid after you're found." },
    { name: "AngelList", metric: "Connects investors + startups", revenue: "Fund admin fees + carry", model: "Fund management + rolling funds", gap: "Serves accredited investors and VC-backed startups. The cascade serves customers as investors. Different buyer, different instrument." },
    { name: "Crunchbase", metric: "70M+ annual visitors", revenue: "~$40M+ (est)", model: "Data subscriptions", gap: "Database of startups you can look at. No transaction. No position. No stake. Pure information." },
  ];

  return (
    <Section title="Platform Comparables" color="#9E6EC8">
      <P>None of these are direct competitors. Each one owns a piece of what the marketplace combines. The gap is in the seams between them.</P>
      {comps.map((c, i) => (
        <div key={i} style={{ background: "#0E0E16", border: "1px solid #1E1E28", borderRadius: "4px", padding: "16px 20px", marginBottom: "8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px", fontWeight: 600, color: "#E0E0E8" }}>{c.name}</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#9E6EC8" }}>{c.revenue}</span>
          </div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#4A4A5A", margin: "4px 0 8px" }}>{c.metric} · {c.model}</div>
          <P>{c.gap}</P>
        </div>
      ))}
      <Callout text="Pump.fun: $800M revenue from zero-quality token launches. Republic: ~$2B raised through SEC-regulated equity crowdfunding. Product Hunt: millions of eyeballs with no transaction layer. The marketplace combines Product Hunt's traffic, Republic's capital formation, and Pump.fun's launch mechanics — with the cascade as the quality gate that Pump.fun doesn't have and the transaction instrument that Product Hunt doesn't have." color="#9E6EC8" />
    </Section>
  );
}

function RealEstate() {
  return (
    <>
      <Section title="The Market Nobody's Talking About Yet" color="#E8553A">
        <Row>
          <StatBlock label="US Home Sales (2024)" value="4.06M" sub="Existing homes. Lowest since 1995. Plus 679K new homes." color="#E8553A" />
          <StatBlock label="Median Home Price" value="$407,500" sub="Record high. 18 months of consecutive increases." color="#E8553A" />
          <StatBlock label="Total Realtor Commissions" value="~$5.57%" sub="Average total commission in 2025. On $407K median = ~$22,700 per transaction." color="#E8553A" />
        </Row>
        <Row>
          <StatBlock label="Annual Commission Pool" value="~$100B+" sub="4.7M transactions × ~$22K avg commission. Over $100 billion flowing to realtors annually." color="#E8553A" />
          <StatBlock label="NAR Settlement" value="$418M" sub="Paid to settle antitrust lawsuit. Rules changed Aug 2024. Commissions barely budged." color="#E8553A" />
          <StatBlock label="Active Realtors" value="~1.5M" sub="NAR members. Half may leave industry as commissions compress. The distribution layer is fracturing." color="#E8553A" />
        </Row>
      </Section>

      <Section title="The Structural Fit" color="#E8553A">
        <P>A house is a seat. A neighborhood is a registry. A new development already has wave pricing — Phase 1, Phase 2, Phase 3 with escalating prices as the development proves out. The MLS is a marketplace with no transaction instrument built in. And the 5.5% commission is the fee that proves the market will pay for distribution.</P>

        <div style={{ background: "#0E0E16", border: "1px solid #1E1E28", borderRadius: "4px", padding: "20px", marginBottom: "12px" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#E8553A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>New Development — Wave Cascade</div>
          <P>A 200-unit development in 4 phases. Phase 1 (50 units) at $380K. Phase 2 (50) at $410K. Phase 3 (50) at $440K. Phase 4 (50) at $475K. This already happens — developers call it "phase pricing." They just don't have an instrument for it.</P>
          <P>With the cascade: each unit is a seat. The board shows what's available, what's claimed, what wave is active. Transferable — if a Phase 1 buyer's circumstances change before closing, they transfer the position rather than breaking contract. The developer captures the appreciation on later phases. The buyer captures appreciation on early phases via transfer.</P>
          <P>At 2% platform fee instead of 5.5% agent commission: developer saves $16,800 per unit on a $420K average. On 200 units = $3.36M saved. Platform earns $1.68M on one development.</P>
        </div>

        <div style={{ background: "#0E0E16", border: "1px solid #1E1E28", borderRadius: "4px", padding: "20px" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#E8553A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>Existing Home Sales — Transfer Layer</div>
          <P>4 million existing home sales per year. Each one is a position transfer. The NAR settlement fractured the commission structure but didn't replace it with anything. The market is looking for a new distribution instrument.</P>
          <P>Even capturing 0.1% of existing home transactions at 1% platform fee on median price: 4,000 transactions × $407K × 1% = $16.3M in platform revenue. From 0.1% market penetration.</P>
          <P>At 1% penetration: $163M.</P>
        </div>

        <Callout text="$100B+ flows to realtors annually for one service: distributing a scarce position from seller to buyer. The NAR settlement broke the fee structure but created no alternative. The cascade IS the alternative. Not a cheaper realtor — a structural replacement for the distribution function realtors perform." color="#E8553A" />
      </Section>

      <Section title="Combined Platform — Full Picture" color="#E8553A">
        <div style={{ background: "#0E0E16", border: "1px solid #1E1E28", borderRadius: "4px", padding: "20px" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#C9A84C", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>Revenue Stack at Scale (Year 5+)</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "4px 20px", fontFamily: "'DM Mono', monospace", fontSize: "13px" }}>
            {[
              ["Startup marketplace + cascades", "$58M"],
              ["Transfer fees (compounding)", "$18M"],
              ["SaaS subscriptions", "$8M"],
              ["New development cascades (10 devs)", "$16.8M"],
              ["Existing home transfers (0.1%)", "$16.3M"],
              ["───────────────────────────", "───────"],
              ["Total platform revenue", "$117M+"],
            ].map(([l, v], i) => (
              <div key={i} style={{ display: "contents" }}>
                <span style={{ color: i === 6 ? "#C9A84C" : "#6A6A7A", fontWeight: i === 6 ? 700 : 400, padding: "4px 0" }}>{l}</span>
                <span style={{ color: i === 6 ? "#C9A84C" : "#8A8A9A", fontWeight: i === 6 ? 700 : 400, textAlign: "right", padding: "4px 0" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <Callout text="The real estate numbers alone dwarf everything else. And they're conservative — 0.1% of existing home sales, 10 new developments. The startup marketplace is the wedge. The lifetime seat cascade is the engine. Real estate is the rocket fuel. And you didn't have to build any of it — the cascade already exists, the marketplace is aggregated content, and the real estate market just had its distribution layer broken by an antitrust settlement." color="#C9A84C" />

        <div style={{ background: "#0E0E16", border: "1px solid #1E1E28", borderRadius: "4px", padding: "20px", marginTop: "16px" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#4A4A5A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>Zero-Risk Deployment Advantage</div>
          <P>Traditional platform cold-start: build product → raise capital → subsidize one side → pray for network effects.</P>
          <P>This platform: cascade is already built → marketplace aggregates free content → founders deploy for free → buyers discover through traffic → platform takes fee only when money moves.</P>
          <P>Total capital required to start: hosting costs. Total risk to sellers: zero. Total risk to platform if a registry fails: zero — you took no fee on inventory that didn't sell.</P>
          <P>The Stripe model applied to a marketplace: we don't charge you to exist. We charge you when value flows.</P>
        </div>
      </Section>
    </>
  );
}

export default function MarketplaceNumbers() {
  const [activeTab, setActiveTab] = useState(0);
  const section = SECTIONS[activeTab];

  const renderContent = () => {
    switch (section.id) {
      case "tam": return <TotalMarket />;
      case "layers": return <RevenueLayers />;
      case "math": return <TheMath />;
      case "comps": return <Comparables />;
      case "realestate": return <RealEstate />;
      default: return null;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#08080D", color: "#E0E0E8", fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Mono:wght@300;400;500&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      <div style={{ padding: "28px 24px 18px", borderBottom: "1px solid #1E1E28" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: "#C9A84C", margin: "0 0 4px" }}>
          Wave Cascade Marketplace — Full Revenue Model
        </h1>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#3A3A4A", margin: 0 }}>
          Real numbers · Real products · Three transaction layers · One instrument
        </p>
      </div>

      <div style={{ display: "flex", gap: "4px", padding: "16px 24px", borderBottom: "1px solid #1E1E28", overflowX: "auto", flexWrap: "wrap" }}>
        {SECTIONS.map((s, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            style={{
              padding: "8px 16px",
              background: activeTab === i ? s.color : "transparent",
              color: activeTab === i ? "#08080D" : "#6A6A7A",
              border: activeTab === i ? "none" : "1px solid #1E1E28",
              borderRadius: "3px",
              cursor: "pointer",
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              fontWeight: activeTab === i ? 700 : 400,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "24px", maxWidth: "900px" }}>
        {renderContent()}
      </div>

      <div style={{ padding: "16px 24px", borderTop: "1px solid #1E1E28" }}>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#2A2A3A", margin: 0 }}>
          CONFIDENTIAL · Ello Cello LLC · MO§ES™ pending trademark · Wave Cascade Registry patent pending
        </p>
      </div>
    </div>
  );
}
