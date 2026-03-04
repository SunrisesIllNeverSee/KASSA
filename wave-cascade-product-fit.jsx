import { useState } from "react";

const PRODUCTS = [
  {
    category: "Could Have Used It",
    color: "#7EC86E",
    description: "Real products that launched with scarcity mechanics but no distribution instrument. The cascade would have carried the lift.",
    items: [
      {
        name: "Superhuman",
        type: "Premium email client · $30/mo",
        what_happened: "180K waitlist. Founder personally onboarded every user via 30-min calls. Raised $51M in VC (Andreessen Horowitz) to fund the slow rollout. Invite-only for years. Every user was hand-carried.",
        with_cascade: "100 founding lifetime seats across 5 waves. Wave 1 at $1,500 (lifetime). Wave 5 at $5,000. That's $150K–$500K in non-dilutive capital from users who are also your best evangelists. No VC needed for the first 2 years. Seats transfer — if a founder leaves their startup, their Superhuman founding seat has resale value. The instrument does the distribution Rahul was doing manually.",
        why_it_works: "The product was genuinely capacity-constrained (server load per inbox sync). The scarcity was real. The audience (VCs, founders, execs) has both the capital and the network to fill waves. The 'Sent via Superhuman' signature already proved holders become distribution channels.",
        distribution_lift: "Eliminates: VC fundraising, personal onboarding-as-sales, waitlist management. The cascade IS the waitlist, but with economic commitment instead of just an email address.",
      },
      {
        name: "Clubhouse",
        type: "Audio social network · Free (invite-only)",
        what_happened: "Exploded via invite-only scarcity in 2020–2021. People were selling invites on eBay. Raised $300M+ in VC. Opened to everyone. Died within a year of opening.",
        with_cascade: "This is the cautionary tale. The scarcity WAS the product's distribution. The moment they removed it, the product had no differentiation. A cascade would have formalized what they accidentally discovered: the restriction was the value. But Clubhouse's problem was deeper — it was a network-effect product pretending to be a scarce one. You can't wave-gate a network.",
        why_it_works: "It doesn't. This is a structural failure case. The product needed mass adoption to function (more rooms, more speakers, more listeners = more value). Scarcity worked for hype. It didn't work for the product. The cascade would have made this failure more expensive, not less.",
        distribution_lift: "None. Network-effect products need the opposite of gated distribution. They need frictionless spread.",
      },
      {
        name: "Figma (2016 launch)",
        type: "Collaborative design tool · Free beta → paid tiers",
        what_happened: "Launched with a free beta, then moved to per-seat pricing. Built massive adoption through free access, then monetized. Sold to Adobe for $20B (deal later collapsed).",
        with_cascade: "Wouldn't work for the main product — Figma needed network density (designers + developers collaborating). But it WOULD work for Figma's enterprise tier or a Figma Partner program. 50 founding enterprise seats with early pricing and transfer rights. The enterprise buyer who got in at Wave 1 pricing holds a position that appreciates as the product matures.",
        why_it_works: "Partially. The core product needs volume. The enterprise tier is naturally capacity-constrained (support, onboarding, custom features). The cascade works at the top of the market, not the bottom.",
        distribution_lift: "For enterprise only. The cascade distributes premium tier access without a sales team. The free tier still does the volume work.",
      },
      {
        name: "Tesla Cybertruck",
        type: "Electric vehicle · $250 refundable deposit",
        what_happened: "1.9 million reservations at $250 each — $475M in deposits. No structure. No wave pricing. No transferability. Flat deposit, years of waiting, many cancellations. The deposit captured demand but distributed nothing.",
        with_cascade: "Production-matched waves. Wave 1: 5,000 units at $65K (Foundation Edition). Wave 2: 10,000 units at $72K. Wave 3: 20,000 at $79K. Non-refundable. Transferable. First-wave holders who don't want to wait can sell their position to someone who does. Tesla captures real capital, not $250 placeholders. The cascade matches production batches to committed buyers.",
        why_it_works: "Supply is genuinely constrained by factory capacity. Price escalation across production runs is natural (early production is more expensive per unit). Transferability solves the 'I reserved in 2019 and my life has changed' problem. The wave structure self-selects for buyers who actually want the truck.",
        distribution_lift: "Eliminates: Reservation limbo, cancellation management, demand uncertainty. Non-refundable wave pricing filters to real buyers. Transfers handle life changes without cancellations.",
      },
    ],
  },
  {
    category: "Perfect Fit — Untapped",
    color: "#C9A84C",
    description: "Product categories that currently have no distribution instrument and are using duct tape (waitlists, Typeform applications, Calendly links for sales calls).",
    items: [
      {
        name: "AI API / Model Access Companies",
        type: "Anthropic, OpenAI, Mistral, Cohere enterprise tiers",
        what_happened: "Enterprise API access is currently distributed through sales teams. Months-long cycles. Custom pricing. NDAs. Every deal is hand-negotiated. Massive overhead.",
        with_cascade: "50 founding integration partner seats across 4 waves. Wave 1: $50K/year for dedicated capacity + priority support. Wave 4: $200K/year. Seat conveys guaranteed rate limits, SLA, and early access to new models. Transferable — if a startup gets acquired, the API seat transfers to the acquirer.",
        why_it_works: "API capacity IS genuinely scarce (GPU compute, support bandwidth). Enterprise buyers already pay six figures annually. The sales cycle exists because there's no structure — just back-and-forth emails. The cascade replaces the sales team with a self-service instrument.",
        distribution_lift: "Eliminates: Enterprise sales team for initial partner cohort. The instrument qualifies buyers by price (serious companies pay; tire-kickers don't). Transfers create a secondary market for API allocations.",
      },
      {
        name: "Boutique Hardware / Watches",
        type: "MB&F, Urwerk, Teenage Engineering, Nothing",
        what_happened: "Limited-run products distributed through dealer networks and waitlists. The dealer takes 40–60% margin. The waitlist is a spreadsheet. There's no transparency on availability, no transfer mechanism, no price discovery.",
        with_cascade: "Each production run = a wave. 50-piece run at $12K. Next run at $14K. Buyer sees exactly how many units exist, how many are claimed, and what the next batch costs. If a buyer's circumstances change before delivery, they transfer their position instead of canceling. The brand captures the appreciation instead of the grey market.",
        why_it_works: "The scarcity is literally real — you can't produce more than the factory allows. Current distribution (dealers, waitlists) gives away margin and control. The cascade keeps the brand-to-buyer relationship direct.",
        distribution_lift: "Eliminates: Dealer margin (40–60% savings), waitlist management, grey market leakage. Transfers stay on-platform where the brand sees them.",
      },
      {
        name: "Franchise / Territory Licenses",
        type: "Any service business expanding via territories",
        what_happened: "Franchise distribution is a manual, high-friction process: discovery days, FDD documents, franchise brokers taking 30–50% of the franchise fee. A franchise broker is literally a human doing what the cascade does structurally.",
        with_cascade: "Territories organized into waves by market tier. Tier 1 metros (Wave 1) at $50K franchise fee. Tier 2 markets (Wave 2) at $35K. Or reverse — early believers get smaller markets cheap, premium markets open later at higher prices. Transferable territory rights replace the 'franchise resale' black market.",
        why_it_works: "Territory rights are inherently scarce and naturally tiered. The current distribution model (franchise brokers) is expensive, slow, and opaque. The cascade makes the entire territory map visible. Potential franchisees can see what's open, what it costs, and what the next wave looks like.",
        distribution_lift: "Eliminates: Franchise broker fees (30–50%), discovery day costs, manual territory negotiation. The instrument IS the franchise sales process.",
      },
      {
        name: "Private Funds / SPVs (Non-Security Structured)",
        type: "Investment clubs, syndicates, LP seats",
        what_happened: "Fund managers spend 60–80% of their time fundraising instead of investing. LP seats are distributed through personal networks, conferences, and placement agents who take 2% of committed capital.",
        with_cascade: "CAREFUL — securities law is the constraint here. But for non-security structures (clubs, co-ops, revenue-share agreements), the cascade distributes membership positions without the founder having to personally sell every seat. The instrument does the qualifying and the urgency creation.",
        why_it_works: "Only in non-security contexts. The structural fit is perfect — fixed LP count, escalating commitment size, transferable positions. But regulatory overhead may exceed the instrument's benefits for anything that looks like a fund.",
        distribution_lift: "Eliminates: Placement agent fees, fundraising roadshows. But only if the legal structure supports it. This one needs a securities attorney before building.",
      },
    ],
  },
  {
    category: "Structurally Breaks",
    color: "#E8553A",
    description: "Real products where the cascade mechanism creates friction instead of removing it. The distribution problem is different from what the cascade solves.",
    items: [
      {
        name: "Slack",
        type: "Team communication · Freemium → per-seat",
        what_happened: "Grew through bottom-up adoption. One person on a team tries it free, invites colleagues, team hits the free tier limit, company buys seats. 12M+ daily active users.",
        why_it_breaks: "Slack's distribution IS the network. Every new user makes the product more valuable for existing users. Wave-gating Slack would have killed the viral loop that built the company. You can't say 'only 50 teams can use Slack this month' when the entire value proposition is 'everyone's already on Slack.'",
        the_distribution_problem: "Slack's distribution challenge was horizontal spread within organizations, not vertical commitment from early believers. The cascade solves the wrong problem.",
      },
      {
        name: "Stripe",
        type: "Payment infrastructure · Usage-based",
        what_happened: "Became the default payments layer for the internet by being the easiest to integrate. Distribution was developer word-of-mouth + beautiful docs. No scarcity needed — ubiquity IS the product.",
        why_it_breaks: "Infrastructure wants to be everywhere. Every API call Stripe doesn't process is revenue it doesn't earn. The cascade would limit adoption of something whose value comes from being unlimited. You can't wave-gate plumbing.",
        the_distribution_problem: "Stripe's distribution challenge was reducing friction to zero: 7 lines of code to accept payments. The cascade adds friction. That's the opposite of what infrastructure needs.",
      },
      {
        name: "Notion",
        type: "Workspace / docs · Freemium → team pricing",
        what_happened: "Grew through templates, community, and bottom-up team adoption. Free personal tier → paid team tier. The free tier IS the distribution mechanism.",
        why_it_breaks: "Same dynamic as Slack. Notion's distribution relies on a free user becoming an advocate who pulls in their team. Gating access to Notion would have prevented the template ecosystem, the community, and the organic word-of-mouth that built the company.",
        the_distribution_problem: "Notion needed breadth of adoption to create the network of templates and use cases that made it sticky. Scarcity would have starved the ecosystem.",
      },
      {
        name: "Canva",
        type: "Design tool · Freemium → Pro/Enterprise",
        what_happened: "$40B valuation built on making design accessible to non-designers. 190M+ monthly active users. The entire thesis is 'everyone can design.'",
        why_it_breaks: "The product's mission is democratization. Wave-gating a tool that exists to remove barriers is a philosophical contradiction. You can't say 'design for everyone — but only 17 of you at a time.'",
        the_distribution_problem: "Canva's distribution challenge was making design so easy that non-designers would adopt it. That requires zero barriers, not escalating ones.",
      },
      {
        name: "Any Mobile App Targeting Millions of Users",
        type: "Instagram, TikTok, Duolingo, etc.",
        what_happened: "Growth loops: content creates users creates content. Distribution is algorithmic (feed, recommendations, shares). The app store IS the distribution layer.",
        why_it_breaks: "Consumer apps need viral coefficients above 1.0. Every gate you add pushes the coefficient below 1.0. The cascade is a gate by design. Consumer apps die behind gates.",
        the_distribution_problem: "Consumer app distribution is a scale problem. The cascade solves a commitment problem. Different problems, incompatible solutions.",
      },
      {
        name: "Open Source Projects",
        type: "Linux, PostgreSQL, VS Code, React",
        what_happened: "Distribution through adoption. Anyone can use it. Community contributions make it better. The openness IS the distribution mechanism.",
        why_it_breaks: "Open source values: access, transparency, community ownership. Cascade values: scarcity, escalation, exclusivity. These are not just different — they're opposed. Gating an open source project would fork the community overnight.",
        the_distribution_problem: "Open source distribution is contribution-driven, not commitment-driven. The cascade has nothing to carry because the product is already everywhere.",
      },
    ],
  },
  {
    category: "The Edge Cases",
    color: "#9E6EC8",
    description: "Products where the cascade works for ONE layer but not the whole product. The founder has to decide which layer to instrument.",
    items: [
      {
        name: "Cursor / Windsurf / AI Code Editors",
        type: "AI-assisted development · Freemium → Pro → Enterprise",
        analysis: "The free/pro tiers need volume adoption (developers trying it, falling in love, upgrading). But the enterprise tier — dedicated instances, custom model fine-tuning, priority compute — is naturally constrained. Cascade the enterprise layer. Let the free tier run wild.",
        cascade_layer: "Enterprise partnerships only. 30 founding enterprise seats across 3 waves. The free and pro tiers distribute themselves.",
      },
      {
        name: "Midjourney",
        type: "AI image generation · Subscription tiers",
        analysis: "Already uses queue-based scarcity (faster generation for higher tiers). But the subscription model is volume-oriented. Where the cascade fits: limited API integration licenses for companies building on Midjourney. 50 commercial embedding seats. Wave-gated. Transferable.",
        cascade_layer: "Commercial API / embedding tier only. The consumer subscription distributes itself through Discord virality.",
      },
      {
        name: "A Restaurant (Yes, Really)",
        type: "High-end dining · Reservations",
        analysis: "Sounds absurd. But look at Noma, which closed. Look at any restaurant with a 6-month waitlist. The reservation IS a scarce position. A founding membership for a new restaurant — 50 seats, annual access, priority booking, transferable — is a cascade. It funds the build-out and pre-commits your best customers.",
        cascade_layer: "Founding membership tier only. Walk-in and standard reservations stay normal. The cascade funds construction and locks in the core audience.",
      },
      {
        name: "Online Course / Cohort Program",
        type: "Maven, Reforge, On Deck",
        analysis: "Cohort programs are naturally wave-gated (each cohort is a wave). Price can escalate as the program builds reputation. But transferability is tricky — a course seat that transfers to someone unqualified degrades the cohort experience. Transfer needs to be conditional (approved by creator).",
        cascade_layer: "Works if seats are for access to a community/network, not just content delivery. If the value is 'who else is in the room,' founding seats make sense. If the value is 'watch these videos,' it doesn't.",
      },
      {
        name: "SaaS with Marketplace Dynamics",
        type: "Shopify app, Salesforce ISV partner",
        analysis: "The SaaS product itself needs volume. But the marketplace/partner program — limited slots for featured partners, priority API access, co-marketing — is scarce. Cascade the partner program. Let the product grow open.",
        cascade_layer: "Partner / developer program only. The end-user product stays open and frictionless. The cascade distributes premium partner positions.",
      },
    ],
  },
];

function ProductCard({ item, color }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        background: "#0E0E16",
        border: "1px solid #1E1E28",
        borderLeft: `3px solid ${color}`,
        borderRadius: "0 4px 4px 0",
        padding: "18px 22px",
        marginBottom: "8px",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 600, color: "#E0E0E8" }}>
            {item.name}
          </div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#5A5A6A", marginTop: "3px" }}>
            {item.type}
          </div>
        </div>
        <span style={{ color: "#4A4A5A", fontSize: "14px", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0, marginTop: "4px" }}>▾</span>
      </div>

      {open && (
        <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {item.what_happened && (
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#5A5A6A", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "5px" }}>What Actually Happened</div>
              <p style={{ fontSize: "13px", color: "#9A9AAA", lineHeight: 1.7, margin: 0 }}>{item.what_happened}</p>
            </div>
          )}
          {item.with_cascade && (
            <div style={{ background: "rgba(126,200,110,0.06)", border: "1px solid rgba(126,200,110,0.15)", borderRadius: "3px", padding: "12px 16px" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#7EC86E", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "5px" }}>With the Cascade</div>
              <p style={{ fontSize: "13px", color: "#9A9AAA", lineHeight: 1.7, margin: 0 }}>{item.with_cascade}</p>
            </div>
          )}
          {item.why_it_works && (
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: color, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "5px" }}>Why It Works (or Doesn't)</div>
              <p style={{ fontSize: "13px", color: "#9A9AAA", lineHeight: 1.7, margin: 0 }}>{item.why_it_works}</p>
            </div>
          )}
          {item.distribution_lift && (
            <div style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "3px", padding: "12px 16px" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#C9A84C", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "5px" }}>Distribution Lift</div>
              <p style={{ fontSize: "13px", color: "#9A9AAA", lineHeight: 1.7, margin: 0 }}>{item.distribution_lift}</p>
            </div>
          )}
          {item.why_it_breaks && (
            <div style={{ background: "rgba(232,85,58,0.06)", border: "1px solid rgba(232,85,58,0.15)", borderRadius: "3px", padding: "12px 16px" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#E8553A", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "5px" }}>Why It Breaks</div>
              <p style={{ fontSize: "13px", color: "#9A9AAA", lineHeight: 1.7, margin: 0 }}>{item.why_it_breaks}</p>
            </div>
          )}
          {item.the_distribution_problem && (
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#5A5A6A", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "5px" }}>The Real Distribution Problem</div>
              <p style={{ fontSize: "13px", color: "#9A9AAA", lineHeight: 1.7, margin: 0 }}>{item.the_distribution_problem}</p>
            </div>
          )}
          {item.analysis && (
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#9E6EC8", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "5px" }}>Analysis</div>
              <p style={{ fontSize: "13px", color: "#9A9AAA", lineHeight: 1.7, margin: 0 }}>{item.analysis}</p>
            </div>
          )}
          {item.cascade_layer && (
            <div style={{ background: "rgba(158,110,200,0.06)", border: "1px solid rgba(158,110,200,0.15)", borderRadius: "3px", padding: "12px 16px" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#9E6EC8", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "5px" }}>Where the Cascade Fits</div>
              <p style={{ fontSize: "13px", color: "#9A9AAA", lineHeight: 1.7, margin: 0 }}>{item.cascade_layer}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ProductMap() {
  const [activeTab, setActiveTab] = useState(0);
  const section = PRODUCTS[activeTab];

  return (
    <div style={{ minHeight: "100vh", background: "#08080D", color: "#E0E0E8", fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Mono:wght@300;400;500&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      <div style={{ padding: "28px 24px 18px", borderBottom: "1px solid #1E1E28" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: "#C9A84C", margin: "0 0 4px" }}>
          Wave Cascade — Product Fit Map
        </h1>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#3A3A4A", margin: 0 }}>
          Named products · Honest analysis · Distribution lens
        </p>
      </div>

      <div style={{ display: "flex", gap: "4px", padding: "16px 24px", borderBottom: "1px solid #1E1E28", overflowX: "auto", flexWrap: "wrap" }}>
        {PRODUCTS.map((s, i) => (
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
            {s.category}
          </button>
        ))}
      </div>

      {section && (
        <div style={{ padding: "24px", maxWidth: "880px" }}>
          <p style={{ fontSize: "14px", fontWeight: 300, color: "#6A6A7A", lineHeight: 1.7, margin: "0 0 20px", maxWidth: "700px" }}>
            {section.description}
          </p>
          {section.items.map((item, i) => (
            <ProductCard key={i} item={item} color={section.color} />
          ))}
        </div>
      )}

      <div style={{ padding: "24px", borderTop: "1px solid #1E1E28", marginTop: "40px", maxWidth: "880px" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#4A4A5A", lineHeight: 1.8 }}>
          <span style={{ color: "#C9A84C" }}>The pattern:</span> The cascade works when the product has a natural constraint, the founder doesn't want to carry distribution personally, and the buyer's commitment can be expressed as a position rather than a subscription. It breaks when the product needs network density, when ubiquity is the goal, or when the buyer expects to try before committing at scale.
        </div>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#2A2A3A", margin: "16px 0 0" }}>
          CONFIDENTIAL · Ello Cello LLC · MO§ES™ pending trademark
        </p>
      </div>
    </div>
  );
}
