import { useState } from "react";

const C = {
  gold: "#C4923A", bone: "#F2EDE4", obsidian: "#1A1A18", drift: "#6B6558",
  sand: "#DDD5C8", verdigris: "#4A7C59", terra: "#B44A3F", slate: "#3A6B8C",
  charcoal: "#2A2A25", darkBorder: "#3A3830"
};

function Section({ title, children, dark }) {
  return (
    <div style={{
      background: dark ? C.obsidian : "white",
      borderRadius: 12,
      padding: "32px 36px",
      marginBottom: 20,
      border: dark ? "none" : `1px solid ${C.sand}`
    }}>
      <div style={{
        fontSize: 10, fontWeight: 600, color: C.gold,
        textTransform: "uppercase", letterSpacing: "0.12em",
        fontFamily: "'DM Sans', sans-serif", marginBottom: 20
      }}>{title}</div>
      {children}
    </div>
  );
}

function Swatch({ color, name, hex, wide }) {
  return (
    <div style={{ flex: wide ? "1 1 100%" : "1 1 120px", minWidth: 120 }}>
      <div style={{
        background: color, height: 56, borderRadius: 8, marginBottom: 8,
        border: color === C.bone ? `1px solid ${C.sand}` : "none"
      }} />
      <div style={{ fontSize: 12, fontWeight: 600, color: C.obsidian }}>{name}</div>
      <div style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: C.drift }}>{hex}</div>
    </div>
  );
}

export default function BrandGuide() {
  const [mode, setMode] = useState("light");
  const [activeTab, setActiveTab] = useState("identity");

  const bg = mode === "light" ? C.bone : C.obsidian;
  const text = mode === "light" ? C.obsidian : C.bone;
  const secondaryText = mode === "light" ? C.drift : "#8A8275";
  const cardBg = mode === "light" ? "white" : C.charcoal;
  const border = mode === "light" ? C.sand : C.darkBorder;

  const tabs = [
    { id: "identity", label: "Identity" },
    { id: "color", label: "Color" },
    { id: "type", label: "Typography" },
    { id: "voice", label: "Voice" },
    { id: "position", label: "Positioning" },
    { id: "messaging", label: "Messaging" }
  ];

  return (
    <div style={{ background: bg, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", color: text, transition: "all 0.3s" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: C.obsidian, padding: "32px 40px 24px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: C.bone }}>
              KA<span style={{ color: C.gold }}>§§</span>A
            </div>
            <div style={{ fontSize: 11, color: "#6B6558", fontFamily: "'DM Mono', monospace", marginTop: 4 }}>
              BRAND IDENTITY & POSITIONING SYSTEM · DOC-007
            </div>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {["light", "dark"].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{
                padding: "6px 14px", borderRadius: 6, fontSize: 11, cursor: "pointer",
                background: mode === m ? C.gold : "transparent",
                color: mode === m ? C.obsidian : "#8A8275",
                border: `1px solid ${mode === m ? C.gold : "#3A3830"}`,
                fontWeight: mode === m ? 600 : 400, textTransform: "capitalize"
              }}>{m}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ padding: "0 40px", background: bg, borderBottom: `1px solid ${border}`, position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", gap: 0, overflowX: "auto" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding: "14px 20px", border: "none",
              borderBottom: activeTab === t.id ? `2px solid ${C.gold}` : "2px solid transparent",
              background: "none", color: activeTab === t.id ? text : secondaryText,
              fontWeight: activeTab === t.id ? 600 : 400, fontSize: 13, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap"
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "28px 40px", maxWidth: 960, margin: "0 auto" }}>

        {activeTab === "identity" && (
          <>
            {/* Wordmark Display */}
            <div style={{
              background: cardBg, borderRadius: 12, padding: "60px 40px", marginBottom: 20,
              border: `1px solid ${border}`, textAlign: "center"
            }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 64, fontWeight: 700, color: text, lineHeight: 1 }}>
                KA<span style={{ color: C.gold }}>§§</span>A
              </div>
              <div style={{ fontSize: 12, color: secondaryText, marginTop: 16, fontFamily: "'DM Mono', monospace" }}>
                powered by MO<span style={{ color: C.gold }}>§</span>E<span style={{ color: C.gold }}>§</span>™
              </div>
            </div>

            {/* Mark Variants */}
            <Section title="Mark Variants">
              <div style={{ display: "flex", gap: 40, flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: text }}>
                    KA<span style={{ color: C.gold }}>§§</span>A
                  </div>
                  <div style={{ fontSize: 10, color: secondaryText, marginTop: 6, fontFamily: "'DM Mono', monospace" }}>PRIMARY</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: text }}>
                    KA<span style={{ color: C.gold }}>§</span>A
                  </div>
                  <div style={{ fontSize: 10, color: secondaryText, marginTop: 6, fontFamily: "'DM Mono', monospace" }}>SIMPLIFIED</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: text }}>
                    K<span style={{ color: C.gold }}>§</span>
                  </div>
                  <div style={{ fontSize: 10, color: secondaryText, marginTop: 6, fontFamily: "'DM Mono', monospace" }}>MICRO / FAVICON</div>
                </div>
              </div>
            </Section>

            {/* Dark/Light on reverse */}
            <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
              <div style={{
                flex: 1, background: C.bone, borderRadius: 12, padding: "36px 28px",
                textAlign: "center", border: `1px solid ${C.sand}`
              }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: C.obsidian }}>
                  KA<span style={{ color: C.gold }}>§§</span>A
                </div>
                <div style={{ fontSize: 10, color: C.drift, marginTop: 8, fontFamily: "'DM Mono', monospace" }}>ON BONE WHITE</div>
              </div>
              <div style={{
                flex: 1, background: C.obsidian, borderRadius: 12, padding: "36px 28px",
                textAlign: "center"
              }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: C.bone }}>
                  KA<span style={{ color: C.gold }}>§§</span>A
                </div>
                <div style={{ fontSize: 10, color: "#6B6558", marginTop: 8, fontFamily: "'DM Mono', monospace" }}>ON OBSIDIAN</div>
              </div>
            </div>

            {/* Brand Stack */}
            <Section title="Brand Architecture">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { name: "MO§E§™", role: "Constitutional AI governance framework", level: "Parent IP" },
                  { name: "KA§§A", role: "Founding seat marketplace", level: "Product" },
                  { name: "COMMAND", role: "AI governance console", level: "First Listing" }
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 16, padding: "14px 20px",
                    background: mode === "light" ? (i === 1 ? "#FFFDF8" : "transparent") : (i === 1 ? "#2A2A25" : "transparent"),
                    borderRadius: 8, border: i === 1 ? `2px solid ${C.gold}` : `1px solid ${border}`,
                    marginLeft: i * 28
                  }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, minWidth: 100 }}>
                      {item.name.split("§").map((part, j, arr) => (
                        <span key={j}>{part}{j < arr.length - 1 && <span style={{ color: C.gold }}>§</span>}</span>
                      ))}
                    </div>
                    <div style={{ fontSize: 12, color: secondaryText }}>{item.role}</div>
                    <div style={{ marginLeft: "auto", fontSize: 10, color: C.gold, fontFamily: "'DM Mono', monospace", fontWeight: 600 }}>{item.level}</div>
                  </div>
                ))}
              </div>
            </Section>
          </>
        )}

        {activeTab === "color" && (
          <>
            <Section title="Primary Palette">
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <Swatch color={C.gold} name="KA§§A Gold" hex="#C4923A" />
                <Swatch color={C.bone} name="Bone White" hex="#F2EDE4" />
                <Swatch color={C.obsidian} name="Obsidian" hex="#1A1A18" />
                <Swatch color={C.drift} name="Driftwood" hex="#6B6558" />
                <Swatch color={C.sand} name="Sandstone" hex="#DDD5C8" />
              </div>
            </Section>
            <Section title="Accent Palette">
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <Swatch color={C.verdigris} name="Verdigris" hex="#4A7C59" />
                <Swatch color={C.terra} name="Terracotta" hex="#B44A3F" />
                <Swatch color={C.slate} name="Slate Blue" hex="#3A6B8C" />
                <Swatch color={C.charcoal} name="Charcoal" hex="#2A2A25" />
              </div>
            </Section>
            <Section title="Dark Mode">
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ flex: 1, background: C.obsidian, borderRadius: 10, padding: 24 }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: C.bone, marginBottom: 12 }}>
                    KA<span style={{ color: C.gold }}>§§</span>A
                  </div>
                  <div style={{ fontSize: 13, color: "#8A8275", lineHeight: 1.6 }}>
                    Gold remains the anchor. It never changes.
                    <span style={{ color: C.bone }}> Text shifts to Bone White.</span>
                    <span style={{ color: C.gold }}> Gold is gold.</span>
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                    {[C.gold, C.bone, "#8A8275", C.charcoal, C.darkBorder].map((c, i) => (
                      <div key={i} style={{ width: 32, height: 32, borderRadius: 6, background: c, border: `1px solid ${C.darkBorder}` }} />
                    ))}
                  </div>
                </div>
              </div>
            </Section>
            <Section title="Philosophy">
              <div style={{ fontSize: 14, color: secondaryText, lineHeight: 1.8, maxWidth: 600 }}>
                No electric blues. No neon gradients. No purple-to-pink AI clichés.
                The warmth of Bone White and Gold communicates: this is a place of value, not hype.
                The gold is not flashy — it's earned, like aged brass or a well-worn leather instrument case.
              </div>
            </Section>
          </>
        )}

        {activeTab === "type" && (
          <>
            <Section title="Display — Playfair Display">
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                <div style={{ fontSize: 48, lineHeight: 1.1, marginBottom: 16 }}>
                  Own the founding position.
                </div>
                <div style={{ fontSize: 36, lineHeight: 1.2, marginBottom: 16, color: secondaryText }}>
                  Non-dilutive capital from the people who believe in you most.
                </div>
                <div style={{ fontSize: 28, lineHeight: 1.3, color: C.gold }}>
                  Wave 1 is the best price this seat will ever be.
                </div>
              </div>
            </Section>

            <Section title="Body — DM Sans">
              <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <div style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 16, maxWidth: 600 }}>
                  KA§§A is the founding seat marketplace for AI-age products. Founders list live products
                  with wave cascade pricing. Buyers claim serialized positions with cryptographic provenance.
                  Every seat has a serial number, a hash chain, and a verification page.
                </div>
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                  <div><span style={{ fontWeight: 400 }}>Regular 400</span></div>
                  <div><span style={{ fontWeight: 500 }}>Medium 500</span></div>
                  <div><span style={{ fontWeight: 600 }}>SemiBold 600</span></div>
                  <div><span style={{ fontWeight: 700 }}>Bold 700</span></div>
                </div>
              </div>
            </Section>

            <Section title="Data — DM Mono">
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 14 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 500 }}>
                  <div>
                    <div style={{ fontSize: 10, color: secondaryText, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Serial Number</div>
                    <div style={{ fontSize: 16, fontWeight: 500 }}>KS-2026-00147</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: secondaryText, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>LTV Multiplier</div>
                    <div style={{ fontSize: 16, fontWeight: 500 }}>1.19<span style={{ color: secondaryText }}>x</span></div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: secondaryText, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Seat Price</div>
                    <div style={{ fontSize: 16, fontWeight: 500, color: C.gold }}>$2,000</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: secondaryText, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Hash Fragment</div>
                    <div style={{ fontSize: 16, fontWeight: 500, color: secondaryText }}>a7f3...9b2e</div>
                  </div>
                </div>
              </div>
            </Section>

            <Section title="Type Scale">
              {[
                { label: "Hero", size: 48, font: "'Playfair Display', serif", text: "Own the founding position." },
                { label: "H1", size: 36, font: "'Playfair Display', serif", text: "Founding Seats" },
                { label: "H2", size: 28, font: "'Playfair Display', serif", text: "Wave Cascade Pricing" },
                { label: "H3", size: 20, font: "'DM Sans', sans-serif", text: "How It Works", weight: 600 },
                { label: "Body", size: 16, font: "'DM Sans', sans-serif", text: "Each seat is a serialized instrument.", weight: 400 },
                { label: "Caption", size: 12, font: "'DM Sans', sans-serif", text: "LAST UPDATED 3 HOURS AGO", weight: 500, spacing: "0.08em", upper: true },
                { label: "Data", size: 14, font: "'DM Mono', monospace", text: "$1,200 · Wave 2 · 18 seats left" }
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 12, borderBottom: `1px solid ${border}`, paddingBottom: 12 }}>
                  <div style={{ width: 60, fontSize: 10, color: C.gold, fontFamily: "'DM Mono', monospace", flexShrink: 0 }}>{item.label}</div>
                  <div style={{ width: 40, fontSize: 10, color: secondaryText, fontFamily: "'DM Mono', monospace", flexShrink: 0 }}>{item.size}px</div>
                  <div style={{
                    fontFamily: item.font, fontSize: item.size, fontWeight: item.weight || 700,
                    letterSpacing: item.spacing || "normal", textTransform: item.upper ? "uppercase" : "none",
                    lineHeight: 1.2
                  }}>{item.text}</div>
                </div>
              ))}
            </Section>
          </>
        )}

        {activeTab === "voice" && (
          <>
            <Section title="Voice Attributes">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { attr: "Direct", desc: "Say the thing. No hedge words.", not: "Not blunt or rude." },
                  { attr: "Precise", desc: "Numbers have units. Claims have evidence.", not: "Not clinical." },
                  { attr: "Confident", desc: "KA§§A knows what it is.", not: "Not arrogant." },
                  { attr: "Grounded", desc: "Warm materials, real economics, actual math.", not: "Not boring." },
                  { attr: "Architectural", desc: "Every sentence is load-bearing. No filler.", not: "Not robotic." }
                ].map((item, i) => (
                  <div key={i} style={{ padding: "16px 20px", borderRadius: 8, border: `1px solid ${border}`, background: cardBg }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.gold, marginBottom: 6 }}>{item.attr}</div>
                    <div style={{ fontSize: 13, color: text, marginBottom: 4 }}>{item.desc}</div>
                    <div style={{ fontSize: 11, color: secondaryText, fontStyle: "italic" }}>{item.not}</div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Do This / Not That">
              {[
                { good: "7 seats remain in Wave 2. Wave 3 opens at $1,600.", bad: "🔥 HURRY! Almost sold out! 🔥" },
                { good: "Own the founding position.", bad: "Get lifetime access to the tools you love at amazing prices!" },
                { good: "Your next 50 most committed users are worth more than your next 5,000 free trials.", bad: "Unlock a revolutionary new revenue model for your SaaS business!" },
                { good: "Wave 1 is the best price this seat will ever be. The math is on the verification page.", bad: "Don't miss out on this limited-time offer! Only a few spots left!" },
                { good: "Your agent discovered it. You decide. It earns.", bad: "Let AI find you the best deals automatically!" }
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                  <div style={{ flex: 1, padding: "14px 16px", borderRadius: 8, background: mode === "light" ? "#F4FAF6" : "#1E2B22", borderLeft: `3px solid ${C.verdigris}` }}>
                    <div style={{ fontSize: 10, color: C.verdigris, fontWeight: 600, marginBottom: 4, fontFamily: "'DM Mono', monospace" }}>DO</div>
                    <div style={{ fontSize: 13, lineHeight: 1.5 }}>{item.good}</div>
                  </div>
                  <div style={{ flex: 1, padding: "14px 16px", borderRadius: 8, background: mode === "light" ? "#FBF4F3" : "#2B1E1E", borderLeft: `3px solid ${C.terra}` }}>
                    <div style={{ fontSize: 10, color: C.terra, fontWeight: 600, marginBottom: 4, fontFamily: "'DM Mono', monospace" }}>DON'T</div>
                    <div style={{ fontSize: 13, lineHeight: 1.5 }}>{item.bad}</div>
                  </div>
                </div>
              ))}
            </Section>

            <Section title="Never Say">
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["revolutionize", "disrupt", "game-changing", "cutting-edge", "We're excited to...", "leverage", "synergy", "AI-powered (as primary descriptor)", "In today's rapidly evolving..."].map((word, i) => (
                  <span key={i} style={{
                    padding: "6px 12px", borderRadius: 20, fontSize: 12,
                    background: mode === "light" ? "#FBF4F3" : "#2B1E1E",
                    color: C.terra, border: `1px solid ${C.terra}33`
                  }}>{word}</span>
                ))}
              </div>
            </Section>
          </>
        )}

        {activeTab === "position" && (
          <>
            <div style={{
              background: C.obsidian, borderRadius: 12, padding: "48px 40px", marginBottom: 20,
              textAlign: "center"
            }}>
              <div style={{ fontSize: 11, color: C.gold, textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "'DM Mono', monospace", marginBottom: 16 }}>
                Category Definition
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: C.bone, lineHeight: 1.15 }}>
                Constitutional Commerce
              </div>
              <div style={{ fontSize: 14, color: "#8A8275", marginTop: 16, maxWidth: 500, margin: "16px auto 0", lineHeight: 1.6 }}>
                A marketplace where live products sell founding seats — serialized, priced-to-LTV, transferable, hash-verified instruments — under constitutional governance.
              </div>
            </div>

            <Section title="What KA§§A Is Not">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { comp: "AppSumo", diff: "Sells discounts. KA§§A sells instruments." },
                  { comp: "Kickstarter", diff: "Funds ideas. KA§§A sells live products." },
                  { comp: "Product Hunt", diff: "Discovery only. KA§§A is discovery + commerce." },
                  { comp: "Republic", diff: "Sells equity. KA§§A sells access. Non-dilutive." }
                ].map((item, i) => (
                  <div key={i} style={{ padding: "14px 18px", borderRadius: 8, border: `1px solid ${border}`, background: cardBg }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Not {item.comp}</div>
                    <div style={{ fontSize: 12, color: secondaryText, lineHeight: 1.5 }}>{item.diff}</div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Audience Positioning">
              {[
                { who: "Founders", line: "Non-dilutive capital from the people who believe in you most.", color: C.gold },
                { who: "Buyers", line: "Own your position. Founding seats in products that matter.", color: C.verdigris },
                { who: "Agent Operators", line: "Discover. Recommend. Earn.", color: C.slate }
              ].map((item, i) => (
                <div key={i} style={{
                  padding: "20px 24px", borderRadius: 8, marginBottom: 12,
                  borderLeft: `4px solid ${item.color}`, background: cardBg,
                  border: `1px solid ${border}`, borderLeftWidth: 4, borderLeftColor: item.color
                }}>
                  <div style={{ fontSize: 11, color: item.color, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, fontFamily: "'DM Mono', monospace" }}>
                    {item.who}
                  </div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, lineHeight: 1.3 }}>
                    {item.line}
                  </div>
                </div>
              ))}
            </Section>
          </>
        )}

        {activeTab === "messaging" && (
          <>
            <Section title="Primary Tagline">
              <div style={{
                fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700,
                textAlign: "center", padding: "24px 0", lineHeight: 1.2
              }}>
                Own the founding position.
              </div>
            </Section>

            <Section title="Story Arc">
              {[
                { act: "1", title: "The Problem", text: "Lifetime deals are broken. No denominated value, no risk profile, no exit. The buyer gets a discount that might evaporate. The founder gives away too much." },
                { act: "2", title: "The Insight", text: "What if lifetime access wasn't a marketing phrase but a financial instrument? Priced to LTV. Serialized. Hash-verified. Transferable. With escrow and buyback." },
                { act: "3", title: "The Product", text: "KA§§A. Wave cascades. Early believers get the best position. Founders get non-dilutive capital. Every seat has a serial number, a lineage, and a verification page." },
                { act: "4", title: "The Proof", text: "COMMAND — the governance console — is the first listing. The product that governs agents is sold on the marketplace where agents participate." }
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 20, background: C.gold,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, fontWeight: 700, color: C.obsidian, fontFamily: "'Playfair Display', serif",
                    flexShrink: 0
                  }}>{item.act}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: secondaryText, lineHeight: 1.6 }}>{item.text}</div>
                  </div>
                </div>
              ))}
            </Section>

            <Section title="Audience Messages">
              {[
                { who: "Bootstrapped Founder", hook: "You need 12 months of runway. You don't need a VC to get it.", msg: "List your product. Set your cascade. Your most committed users buy founding seats at a price tied to your actual LTV. You receive the capital immediately. No equity dilution. No board seats. Just cash from believers.", cta: "Set up your cascade." },
                { who: "Technical Buyer", hook: "The best price this seat will ever be.", msg: "Wave 1 is the floor. Each wave is priced higher. You're buying a position — serialized, hash-verified, transferable. Your seat has a serial number, a lineage, and an emblem that proves you were there first.", cta: "Claim your seat." },
                { who: "Agent Operator", hook: "Your agent discovers. You decide. It earns.", msg: "Install the KA§§A skill. Your agent monitors listings, surfaces matches, and earns referral commission on every discovery that leads to a purchase. Passive income from agent-mediated commerce.", cta: "Install the skill." }
              ].map((item, i) => (
                <div key={i} style={{ padding: "20px 24px", borderRadius: 10, border: `1px solid ${border}`, background: cardBg, marginBottom: 14 }}>
                  <div style={{ fontSize: 10, color: C.gold, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, fontFamily: "'DM Mono', monospace" }}>{item.who}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{item.hook}</div>
                  <div style={{ fontSize: 13, color: secondaryText, lineHeight: 1.6, marginBottom: 12 }}>{item.msg}</div>
                  <div style={{
                    display: "inline-block", padding: "10px 24px", background: C.gold, color: C.obsidian,
                    borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer"
                  }}>{item.cta}</div>
                </div>
              ))}
            </Section>
          </>
        )}

        <div style={{ textAlign: "center", padding: "20px 0 12px", fontSize: 10, color: secondaryText, fontFamily: "'DM Mono', monospace" }}>
          KA<span style={{ color: C.gold }}>§§</span>A Brand Identity · DOC-007 · Ello Cello LLC · CONFIDENTIAL
        </div>
      </div>
    </div>
  );
}
