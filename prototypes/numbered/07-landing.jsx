import { useState } from "react";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
`;

const SAMPLE_PRODUCTS = [
  { name: "COMMAND", category: "AI Governance", wave: 1, seats: 50, available: 43, price: 800, status: "ACTIVE", founder: "burnmydays" },
  { name: "SuperWriter AI", category: "AI Writing", wave: 2, seats: 100, available: 62, price: 1200, status: "ACTIVE", founder: "J. Kim" },
  { name: "StackPilot", category: "Dev Tools", wave: 1, seats: 30, available: 30, price: 4500, status: "UPCOMING", founder: "M. Torres" },
  { name: "Framecraft", category: "Design", wave: 3, seats: 75, available: 18, price: 2000, status: "ACTIVE", founder: "A. Lindqvist" },
  { name: "Synthcal", category: "Analytics", wave: 1, seats: 40, available: 37, price: 650, status: "ACTIVE", founder: "R. Osei" },
  { name: "Docuvault", category: "Storage", wave: 2, seats: 60, available: 41, price: 900, status: "ACTIVE", founder: "P. Novak" },
  { name: "Audioloom", category: "Creator Tools", wave: 1, seats: 200, available: 200, price: 299, status: "UPCOMING", founder: "S. Patel" },
  { name: "NeuralPath", category: "ML Ops", wave: 1, seats: 25, available: 19, price: 5500, status: "ACTIVE", founder: "D. Chen" },
];

const CATEGORIES = ["All", "AI Governance", "AI Writing", "Dev Tools", "Design", "Analytics", "Storage", "Creator Tools", "ML Ops"];

const SectionMark = () => <span style={{ color: "#C4923A", fontWeight: 600 }}>§</span>;

export default function KassaLanding() {
  const [view, setView] = useState("landing");
  const [listStyle, setListStyle] = useState("table");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [signupType, setSignupType] = useState(null);
  const [signupStep, setSignupStep] = useState(1);
  const [formData, setFormData] = useState({});

  const filtered = selectedCategory === "All"
    ? SAMPLE_PRODUCTS
    : SAMPLE_PRODUCTS.filter(p => p.category === selectedCategory);

  const resetSignup = () => { setSignupType(null); setSignupStep(1); setFormData({}); };

  return (
    <>
      <style>{FONTS}{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #FAFAF8; }
        ::selection { background: #C4923A; color: white; }
        input, textarea, select {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #E0DDD6;
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          background: white;
          color: #2A2824;
          transition: border-color 0.2s;
          outline: none;
        }
        input:focus, textarea:focus, select:focus {
          border-color: #C4923A;
        }
        input::placeholder, textarea::placeholder {
          color: #B5B0A5;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease both; }
        .fade-up-1 { animation: fadeUp 0.6s ease 0.1s both; }
        .fade-up-2 { animation: fadeUp 0.6s ease 0.2s both; }
        .fade-up-3 { animation: fadeUp 0.6s ease 0.3s both; }
        .fade-up-4 { animation: fadeUp 0.6s ease 0.4s both; }
        .fade-up-5 { animation: fadeUp 0.6s ease 0.5s both; }
        .slide-in { animation: slideIn 0.4s ease both; }
      `}</style>

      <div style={{ 
        minHeight: "100vh", 
        background: "#FAFAF8", 
        fontFamily: "'DM Sans', sans-serif",
        color: "#2A2824"
      }}>
        {/* NAV */}
        <nav style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          borderBottom: "1px solid #EDEBE6",
          background: "white",
          position: "sticky",
          top: 0,
          zIndex: 100
        }}>
          <div 
            style={{ cursor: "pointer", display: "flex", alignItems: "baseline", gap: 2 }}
            onClick={() => { setView("landing"); resetSignup(); }}
          >
            <span style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: 26, 
              fontWeight: 600,
              letterSpacing: "0.02em",
              color: "#2A2824"
            }}>
              KA<span style={{ color: "#C4923A" }}>§§</span>A
            </span>
          </div>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            <span 
              onClick={() => { setView("list"); resetSignup(); }} 
              style={{ cursor: "pointer", fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase", color: view === "list" ? "#C4923A" : "#7A7568", fontWeight: 500, transition: "color 0.2s" }}
            >
              Products
            </span>
            <span 
              onClick={() => { setView("how"); resetSignup(); }} 
              style={{ cursor: "pointer", fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase", color: view === "how" ? "#C4923A" : "#7A7568", fontWeight: 500, transition: "color 0.2s" }}
            >
              How It Works
            </span>
            <span
              onClick={() => { setView("signup"); resetSignup(); }}
              style={{
                cursor: "pointer",
                fontSize: 14,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "10px 24px",
                background: "#2A2824",
                color: "white",
                borderRadius: 6,
                fontWeight: 500,
                transition: "background 0.2s"
              }}
            >
              Get Started
            </span>
          </div>
        </nav>

        {/* LANDING */}
        {view === "landing" && (
          <div>
            {/* HERO */}
            <section style={{ 
              padding: "100px 40px 80px", 
              maxWidth: 900, 
              margin: "0 auto",
              textAlign: "center"
            }}>
              <p className="fade-up" style={{ 
                fontSize: 13, 
                letterSpacing: "0.15em", 
                textTransform: "uppercase", 
                color: "#C4923A",
                marginBottom: 24,
                fontWeight: 500
              }}>
                Powered by MO§E§™
              </p>
              <h1 className="fade-up-1" style={{ 
                fontFamily: "'Playfair Display', serif", 
                fontSize: 52, 
                fontWeight: 500, 
                lineHeight: 1.15,
                color: "#2A2824",
                marginBottom: 28
              }}>
                Founding seats for products that don't need venture capital
              </h1>
              <p className="fade-up-2" style={{ 
                fontSize: 18, 
                lineHeight: 1.7, 
                color: "#7A7568",
                maxWidth: 620,
                margin: "0 auto 48px"
              }}>
                KA<SectionMark /><SectionMark />A is the marketplace where startup products sell scarce founding positions with built-in price escalation. Keep 100% of your company. Pay only when you sell.
              </p>
              <div className="fade-up-3" style={{ display: "flex", gap: 16, justifyContent: "center" }}>
                <button 
                  onClick={() => { setView("signup"); setSignupType("founder"); setSignupStep(1); }}
                  style={{
                    padding: "16px 36px",
                    background: "#2A2824",
                    color: "white",
                    border: "none",
                    borderRadius: 6,
                    fontSize: 15,
                    fontWeight: 500,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: "0.02em"
                  }}
                >
                  List Your Product
                </button>
                <button 
                  onClick={() => setView("list")}
                  style={{
                    padding: "16px 36px",
                    background: "transparent",
                    color: "#2A2824",
                    border: "1px solid #D6D2CA",
                    borderRadius: 6,
                    fontSize: 15,
                    fontWeight: 500,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: "0.02em"
                  }}
                >
                  Browse Products
                </button>
              </div>
            </section>

            {/* NUMBERS BAR */}
            <section className="fade-up-4" style={{ 
              borderTop: "1px solid #EDEBE6", 
              borderBottom: "1px solid #EDEBE6",
              background: "white",
              display: "flex",
              justifyContent: "center",
              gap: 80,
              padding: "36px 40px"
            }}>
              {[
                { num: "8", label: "Products Listed" },
                { num: "580", label: "Total Seats" },
                { num: "$299–$5,500", label: "Seat Range" },
                { num: "4%", label: "Platform Fee" }
              ].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 600, color: "#2A2824" }}>{s.num}</div>
                  <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#B5B0A5", marginTop: 6 }}>{s.label}</div>
                </div>
              ))}
            </section>

            {/* HOW IT WORKS - CONDENSED */}
            <section style={{ padding: "80px 40px", maxWidth: 1000, margin: "0 auto" }}>
              <p style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C4923A", marginBottom: 12, fontWeight: 500, textAlign: "center" }}>How It Works</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 500, textAlign: "center", marginBottom: 60, color: "#2A2824" }}>
                Three roles. One instrument.
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 40 }}>
                {[
                  {
                    role: "Founder",
                    steps: [
                      "List your product for free",
                      "Configure your cascade — set seats, waves, and prices",
                      "Activate and receive payment as seats sell",
                      "Keep 100% of your equity. Pay 2–5% platform fee only on sales."
                    ]
                  },
                  {
                    role: "Buyer",
                    steps: [
                      "Browse verified products with transparent pricing",
                      "Purchase a founding seat at the current wave price",
                      "14-day escrow protects your purchase",
                      "Hold a serialized, hash-verified seat with proof of ownership"
                    ]
                  },
                  {
                    role: "Referrer",
                    steps: [
                      "Generate your unique referral link for any product",
                      "Share with your audience — social, newsletter, blog",
                      "Earn 25% of the platform fee on every attributed sale",
                      "Your earnings grow as the product catalog grows"
                    ]
                  }
                ].map((col, ci) => (
                  <div key={ci} style={{ 
                    background: "white", 
                    border: "1px solid #EDEBE6", 
                    borderRadius: 10, 
                    padding: "36px 28px",
                  }}>
                    <div style={{ 
                      fontSize: 11, 
                      letterSpacing: "0.15em", 
                      textTransform: "uppercase", 
                      color: "#C4923A", 
                      fontWeight: 600,
                      marginBottom: 8
                    }}>
                      {col.role}
                    </div>
                    <div style={{ 
                      fontFamily: "'Playfair Display', serif", 
                      fontSize: 22, 
                      fontWeight: 500, 
                      marginBottom: 28,
                      color: "#2A2824"
                    }}>
                      {col.role === "Founder" ? "Sell seats, not equity" : col.role === "Buyer" ? "Own a founding position" : "Earn by sharing"}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      {col.steps.map((step, si) => (
                        <div key={si} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                          <div style={{ 
                            minWidth: 26, 
                            height: 26, 
                            borderRadius: "50%", 
                            border: "1.5px solid #D6D2CA",
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center",
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#7A7568",
                            marginTop: 1
                          }}>
                            {si + 1}
                          </div>
                          <p style={{ fontSize: 14, lineHeight: 1.6, color: "#5A564E" }}>{step}</p>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => { setView("signup"); setSignupType(col.role.toLowerCase()); setSignupStep(1); }}
                      style={{
                        width: "100%",
                        marginTop: 28,
                        padding: "13px 0",
                        background: col.role === "Founder" ? "#2A2824" : "transparent",
                        color: col.role === "Founder" ? "white" : "#2A2824",
                        border: col.role === "Founder" ? "none" : "1px solid #D6D2CA",
                        borderRadius: 6,
                        fontSize: 14,
                        fontWeight: 500,
                        cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                        letterSpacing: "0.02em"
                      }}
                    >
                      {col.role === "Founder" ? "List Your Product" : col.role === "Buyer" ? "Browse Products" : "Start Referring"}
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* PREVIEW LIST */}
            <section style={{ padding: "0 40px 80px", maxWidth: 1000, margin: "0 auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
                <div>
                  <p style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C4923A", marginBottom: 8, fontWeight: 500 }}>Live Listings</p>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 500, color: "#2A2824" }}>Current products</h2>
                </div>
                <span onClick={() => setView("list")} style={{ fontSize: 14, color: "#C4923A", cursor: "pointer", fontWeight: 500 }}>View all →</span>
              </div>
              
              {/* TABLE VIEW */}
              <div style={{ background: "white", border: "1px solid #EDEBE6", borderRadius: 10, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #EDEBE6" }}>
                      {["Product", "Category", "Wave", "Seats Left", "Price", "Status"].map((h, i) => (
                        <th key={i} style={{ 
                          padding: "14px 20px", 
                          textAlign: "left", 
                          fontSize: 11, 
                          letterSpacing: "0.12em", 
                          textTransform: "uppercase", 
                          color: "#B5B0A5",
                          fontWeight: 600,
                          background: "#FAFAF8"
                        }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SAMPLE_PRODUCTS.slice(0, 5).map((p, i) => (
                      <tr key={i} style={{ 
                        borderBottom: i < 4 ? "1px solid #F3F1ED" : "none",
                        cursor: "pointer",
                        transition: "background 0.15s"
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = "#FDFCFA"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <td style={{ padding: "16px 20px" }}>
                          <span style={{ fontWeight: 600, fontSize: 15 }}>{p.name}</span>
                          <span style={{ fontSize: 12, color: "#B5B0A5", marginLeft: 8 }}>by {p.founder}</span>
                        </td>
                        <td style={{ padding: "16px 20px", fontSize: 14, color: "#7A7568" }}>{p.category}</td>
                        <td style={{ padding: "16px 20px", fontSize: 14, color: "#7A7568" }}>Wave {p.wave}</td>
                        <td style={{ padding: "16px 20px" }}>
                          <span style={{ fontSize: 14, fontWeight: 500, color: p.available <= 20 ? "#C4923A" : "#5A564E" }}>
                            {p.available} / {p.seats}
                          </span>
                        </td>
                        <td style={{ padding: "16px 20px", fontSize: 15, fontWeight: 600, color: "#2A2824" }}>${p.price.toLocaleString()}</td>
                        <td style={{ padding: "16px 20px" }}>
                          <span style={{ 
                            display: "inline-block",
                            padding: "4px 12px", 
                            borderRadius: 20, 
                            fontSize: 11, 
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            background: p.status === "ACTIVE" ? "#F0EDE6" : "#F5F3EE",
                            color: p.status === "ACTIVE" ? "#7A7568" : "#B5B0A5"
                          }}>
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* FOOTER TAGLINE */}
            <section style={{ 
              padding: "60px 40px", 
              textAlign: "center",
              borderTop: "1px solid #EDEBE6"
            }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#B5B0A5", fontStyle: "italic" }}>
                MO<span style={{ color: "#C4923A" }}>§</span>E<span style={{ color: "#C4923A" }}>§</span>™ writes the rules. KA<span style={{ color: "#C4923A" }}>§§</span>A runs the deals.
              </p>
              <p style={{ fontSize: 12, color: "#D6D2CA", marginTop: 16 }}>© 2026 Ello Cello LLC. All rights reserved.</p>
            </section>
          </div>
        )}

        {/* FULL PRODUCT LIST */}
        {view === "list" && (
          <div style={{ padding: "48px 40px", maxWidth: 1100, margin: "0 auto" }}>
            <div className="fade-up" style={{ marginBottom: 40 }}>
              <p style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C4923A", marginBottom: 8, fontWeight: 500 }}>Products</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 500, color: "#2A2824", marginBottom: 8 }}>Founding seats available now</h2>
              <p style={{ fontSize: 15, color: "#7A7568" }}>Verified products with transparent cascade pricing. Each seat is serialized and hash-verified.</p>
            </div>

            {/* FILTERS + VIEW TOGGLE */}
            <div className="fade-up-1" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {CATEGORIES.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedCategory(c)}
                    style={{
                      padding: "8px 18px",
                      borderRadius: 20,
                      border: selectedCategory === c ? "1px solid #C4923A" : "1px solid #E0DDD6",
                      background: selectedCategory === c ? "#FAF6EF" : "white",
                      color: selectedCategory === c ? "#C4923A" : "#7A7568",
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      transition: "all 0.2s"
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 4, background: "#F3F1ED", borderRadius: 6, padding: 3 }}>
                {["table", "card"].map(s => (
                  <button
                    key={s}
                    onClick={() => setListStyle(s)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 4,
                      border: "none",
                      background: listStyle === s ? "white" : "transparent",
                      color: listStyle === s ? "#2A2824" : "#B5B0A5",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      boxShadow: listStyle === s ? "0 1px 3px rgba(0,0,0,0.08)" : "none"
                    }}
                  >
                    {s === "table" ? "List" : "Cards"}
                  </button>
                ))}
              </div>
            </div>

            {/* TABLE VARIATION */}
            {listStyle === "table" && (
              <div className="fade-up-2" style={{ background: "white", border: "1px solid #EDEBE6", borderRadius: 10, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #EDEBE6" }}>
                      {["Product", "Category", "Founder", "Wave", "Seats Available", "Current Price", "Status"].map((h, i) => (
                        <th key={i} style={{ 
                          padding: "14px 18px", 
                          textAlign: "left", 
                          fontSize: 11, 
                          letterSpacing: "0.12em", 
                          textTransform: "uppercase", 
                          color: "#B5B0A5",
                          fontWeight: 600,
                          background: "#FAFAF8"
                        }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((p, i) => (
                      <tr key={i} style={{ 
                        borderBottom: "1px solid #F3F1ED",
                        cursor: "pointer",
                        transition: "background 0.15s"
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = "#FDFCFA"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <td style={{ padding: "18px 18px", fontWeight: 600, fontSize: 15 }}>{p.name}</td>
                        <td style={{ padding: "18px 18px", fontSize: 14, color: "#7A7568" }}>{p.category}</td>
                        <td style={{ padding: "18px 18px", fontSize: 14, color: "#7A7568" }}>{p.founder}</td>
                        <td style={{ padding: "18px 18px" }}>
                          <span style={{ 
                            display: "inline-flex", 
                            alignItems: "center", 
                            gap: 6,
                            fontSize: 14, 
                            color: "#5A564E" 
                          }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C4923A" }} />
                            Wave {p.wave}
                          </span>
                        </td>
                        <td style={{ padding: "18px 18px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ flex: 1, height: 4, background: "#F3F1ED", borderRadius: 2, maxWidth: 60 }}>
                              <div style={{ 
                                height: "100%", 
                                borderRadius: 2, 
                                background: p.available / p.seats > 0.5 ? "#D6D2CA" : "#C4923A",
                                width: `${(1 - p.available / p.seats) * 100}%`
                              }} />
                            </div>
                            <span style={{ fontSize: 14, fontWeight: 500, color: p.available <= 20 ? "#C4923A" : "#5A564E" }}>
                              {p.available}<span style={{ color: "#B5B0A5", fontWeight: 400 }}> / {p.seats}</span>
                            </span>
                          </div>
                        </td>
                        <td style={{ padding: "18px 18px", fontSize: 16, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", color: "#2A2824" }}>
                          ${p.price.toLocaleString()}
                        </td>
                        <td style={{ padding: "18px 18px" }}>
                          <span style={{ 
                            display: "inline-block",
                            padding: "5px 14px", 
                            borderRadius: 20, 
                            fontSize: 11, 
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            background: p.status === "ACTIVE" ? "#F0EDE6" : "#F5F3EE",
                            color: p.status === "ACTIVE" ? "#7A7568" : "#B5B0A5"
                          }}>
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* CARD VARIATION */}
            {listStyle === "card" && (
              <div className="fade-up-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
                {filtered.map((p, i) => (
                  <div key={i} style={{ 
                    background: "white", 
                    border: "1px solid #EDEBE6", 
                    borderRadius: 10, 
                    padding: "28px 24px",
                    cursor: "pointer",
                    transition: "border-color 0.2s, box-shadow 0.2s"
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#C4923A40"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(196,146,58,0.06)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#EDEBE6"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                      <span style={{ 
                        fontSize: 11, 
                        letterSpacing: "0.1em", 
                        textTransform: "uppercase", 
                        color: "#B5B0A5",
                        fontWeight: 600
                      }}>
                        {p.category}
                      </span>
                      <span style={{ 
                        padding: "3px 10px", 
                        borderRadius: 20, 
                        fontSize: 10, 
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        background: p.status === "ACTIVE" ? "#F0EDE6" : "#F5F3EE",
                        color: p.status === "ACTIVE" ? "#7A7568" : "#B5B0A5"
                      }}>
                        {p.status}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 500, marginBottom: 4 }}>{p.name}</h3>
                    <p style={{ fontSize: 13, color: "#B5B0A5", marginBottom: 24 }}>by {p.founder}</p>
                    
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, fontSize: 13, color: "#7A7568" }}>
                      <span>Wave {p.wave}</span>
                      <span style={{ fontWeight: 500, color: p.available <= 20 ? "#C4923A" : "#5A564E" }}>{p.available} seats left</span>
                    </div>
                    <div style={{ height: 3, background: "#F3F1ED", borderRadius: 2, marginBottom: 20 }}>
                      <div style={{ 
                        height: "100%", 
                        borderRadius: 2, 
                        background: p.available / p.seats > 0.5 ? "#D6D2CA" : "#C4923A",
                        width: `${(1 - p.available / p.seats) * 100}%`,
                        transition: "width 0.3s"
                      }} />
                    </div>

                    <div style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "baseline",
                      paddingTop: 16,
                      borderTop: "1px solid #F3F1ED"
                    }}>
                      <span style={{ fontSize: 24, fontWeight: 600, color: "#2A2824" }}>${p.price.toLocaleString()}</span>
                      <span style={{ fontSize: 12, color: "#B5B0A5" }}>per seat</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* HOW IT WORKS - FULL */}
        {view === "how" && (
          <div style={{ padding: "60px 40px", maxWidth: 800, margin: "0 auto" }}>
            <div className="fade-up" style={{ textAlign: "center", marginBottom: 64 }}>
              <p style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C4923A", marginBottom: 12, fontWeight: 500 }}>The Instrument</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 500, color: "#2A2824", marginBottom: 16 }}>How the cascade works</h2>
              <p style={{ fontSize: 16, color: "#7A7568", lineHeight: 1.7 }}>A founding seat is a priced position in a product — serialized, hash-verified, and transferable under the founder's terms.</p>
            </div>

            {[
              { num: "01", title: "Founder lists a product", desc: "Any working product can list on KA§§A for free. The founder configures their cascade: total seats, number of waves, price per wave, and post-sale terms including buyback clauses." },
              { num: "02", title: "The cascade structures scarcity", desc: "Seats are released in waves. Wave 1 has the lowest price. Each subsequent wave is higher. Once a wave sells out, the next wave activates. Total supply is fixed. This is the instrument — built-in price escalation with verifiable scarcity." },
              { num: "03", title: "Buyer purchases a founding seat", desc: "The buyer pays the current wave price. Payment enters a 14–30 day escrow. After escrow clears, the seat is confirmed: a unique serial number is assigned, the lineage hash chain begins, and a verifiable emblem is generated." },
              { num: "04", title: "Every seat is an instrument", desc: "Each seat carries a serial (KS-2026-XXXXX), a tamper-evident hash chain signed with classical and post-quantum cryptography, and a public verification page. The seat is the buyer's proof of founding position. It can be verified by anyone, anywhere, at any time." },
              { num: "05", title: "Referrers distribute, everyone earns", desc: "Anyone can generate a referral link for any product. When a referred buyer purchases a seat, the referrer earns 25% of the platform fee. The founder pays nothing extra — the commission comes from the platform's share. Distribution becomes an instrument, not an expense." }
            ].map((step, i) => (
              <div key={i} className={`fade-up-${i + 1}`} style={{ 
                display: "flex", 
                gap: 32, 
                marginBottom: i < 4 ? 48 : 0,
                paddingBottom: i < 4 ? 48 : 0,
                borderBottom: i < 4 ? "1px solid #F3F1ED" : "none"
              }}>
                <div style={{ 
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 42, 
                  fontWeight: 300, 
                  color: "#E0DDD6",
                  minWidth: 70,
                  lineHeight: 1
                }}>
                  {step.num}
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 500, marginBottom: 12, color: "#2A2824" }}>{step.title}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.75, color: "#7A7568" }}>{step.desc}</p>
                </div>
              </div>
            ))}

            <div style={{ textAlign: "center", marginTop: 64 }}>
              <button
                onClick={() => { setView("signup"); resetSignup(); }}
                style={{
                  padding: "16px 48px",
                  background: "#2A2824",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif"
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        )}

        {/* SIGNUP FLOWS */}
        {view === "signup" && (
          <div style={{ padding: "60px 40px", maxWidth: 600, margin: "0 auto" }}>
            {/* TYPE SELECTOR */}
            {!signupType && (
              <div className="fade-up">
                <div style={{ textAlign: "center", marginBottom: 48 }}>
                  <p style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C4923A", marginBottom: 12, fontWeight: 500 }}>Get Started</p>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 500, color: "#2A2824", marginBottom: 12 }}>How will you use KA<SectionMark /><SectionMark />A?</h2>
                  <p style={{ fontSize: 15, color: "#7A7568" }}>Choose your role. You can always add more later.</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { type: "founder", title: "I'm a Founder", desc: "List your product and sell founding seats. Keep 100% equity.", icon: "◆" },
                    { type: "buyer", title: "I'm a Buyer", desc: "Browse products and purchase founding positions.", icon: "■" },
                    { type: "referrer", title: "I'm a Referrer", desc: "Share products with your network and earn on every sale.", icon: "▲" }
                  ].map((opt, i) => (
                    <div
                      key={i}
                      onClick={() => { setSignupType(opt.type); setSignupStep(1); }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 20,
                        padding: "24px 28px",
                        background: "white",
                        border: "1px solid #EDEBE6",
                        borderRadius: 10,
                        cursor: "pointer",
                        transition: "border-color 0.2s, box-shadow 0.2s"
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "#C4923A"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(196,146,58,0.08)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "#EDEBE6"; e.currentTarget.style.boxShadow = "none"; }}
                    >
                      <div style={{ 
                        width: 44, 
                        height: 44, 
                        borderRadius: 8, 
                        background: "#FAF6EF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                        color: "#C4923A"
                      }}>
                        {opt.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{opt.title}</div>
                        <div style={{ fontSize: 14, color: "#7A7568" }}>{opt.desc}</div>
                      </div>
                      <div style={{ fontSize: 18, color: "#D6D2CA" }}>→</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FOUNDER SIGNUP */}
            {signupType === "founder" && (
              <div className="fade-up">
                <div style={{ marginBottom: 36 }}>
                  <span onClick={resetSignup} style={{ fontSize: 13, color: "#B5B0A5", cursor: "pointer" }}>← Back</span>
                </div>
                <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C4923A", marginBottom: 8, fontWeight: 600 }}>Founder</p>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: "#2A2824", marginBottom: 8 }}>
                  {signupStep === 1 ? "Tell us about you" : signupStep === 2 ? "Tell us about your product" : "Review & submit"}
                </h2>

                {/* Progress */}
                <div style={{ display: "flex", gap: 8, marginBottom: 36 }}>
                  {[1, 2, 3].map(s => (
                    <div key={s} style={{ 
                      flex: 1, height: 3, borderRadius: 2, 
                      background: s <= signupStep ? "#C4923A" : "#EDEBE6",
                      transition: "background 0.3s"
                    }} />
                  ))}
                </div>

                {signupStep === 1 && (
                  <div className="slide-in" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#7A7568", display: "block", marginBottom: 8 }}>Full Name</label>
                      <input placeholder="Your name" value={formData.name || ""} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#7A7568", display: "block", marginBottom: 8 }}>Email</label>
                      <input type="email" placeholder="you@company.com" value={formData.email || ""} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#7A7568", display: "block", marginBottom: 8 }}>Company / Brand</label>
                      <input placeholder="Your company or brand name" value={formData.company || ""} onChange={e => setFormData({...formData, company: e.target.value})} />
                    </div>
                    <button onClick={() => setSignupStep(2)} style={{ marginTop: 8, padding: "14px 0", background: "#2A2824", color: "white", border: "none", borderRadius: 6, fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                      Continue
                    </button>
                  </div>
                )}

                {signupStep === 2 && (
                  <div className="slide-in" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#7A7568", display: "block", marginBottom: 8 }}>Product Name</label>
                      <input placeholder="What's your product called?" value={formData.product || ""} onChange={e => setFormData({...formData, product: e.target.value})} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#7A7568", display: "block", marginBottom: 8 }}>Product URL</label>
                      <input placeholder="https://yourproduct.com" value={formData.url || ""} onChange={e => setFormData({...formData, url: e.target.value})} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#7A7568", display: "block", marginBottom: 8 }}>Category</label>
                      <select value={formData.category || ""} onChange={e => setFormData({...formData, category: e.target.value})}>
                        <option value="">Select a category</option>
                        {CATEGORIES.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#7A7568", display: "block", marginBottom: 8 }}>What does your product do?</label>
                      <textarea rows={3} placeholder="Brief description — what problem does it solve?" value={formData.desc || ""} onChange={e => setFormData({...formData, desc: e.target.value})} style={{ resize: "vertical" }} />
                    </div>
                    <div style={{ display: "flex", gap: 12 }}>
                      <button onClick={() => setSignupStep(1)} style={{ flex: 1, padding: "14px 0", background: "transparent", color: "#7A7568", border: "1px solid #E0DDD6", borderRadius: 6, fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                        Back
                      </button>
                      <button onClick={() => setSignupStep(3)} style={{ flex: 2, padding: "14px 0", background: "#2A2824", color: "white", border: "none", borderRadius: 6, fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {signupStep === 3 && (
                  <div className="slide-in" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <div style={{ background: "#FAF6EF", borderRadius: 8, padding: "24px" }}>
                      <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C4923A", fontWeight: 600, marginBottom: 16 }}>Your Application</div>
                      {[
                        ["Name", formData.name],
                        ["Email", formData.email],
                        ["Company", formData.company],
                        ["Product", formData.product],
                        ["URL", formData.url],
                        ["Category", formData.category]
                      ].map(([k, v], i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 5 ? "1px solid #EDE8DE" : "none" }}>
                          <span style={{ fontSize: 13, color: "#B5B0A5" }}>{k}</span>
                          <span style={{ fontSize: 14, fontWeight: 500, color: "#2A2824" }}>{v || "—"}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: "white", border: "1px solid #EDEBE6", borderRadius: 8, padding: "20px" }}>
                      <p style={{ fontSize: 13, color: "#7A7568", lineHeight: 1.7 }}>
                        By submitting, you're applying for a founder account on KA<SectionMark /><SectionMark />A. We'll review your product, verify the URL is live, and reach out to schedule a brief onboarding call. Current platform fee: <strong>Wave 1 — 2% locked forever</strong> for founding partners.
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: 12 }}>
                      <button onClick={() => setSignupStep(2)} style={{ flex: 1, padding: "14px 0", background: "transparent", color: "#7A7568", border: "1px solid #E0DDD6", borderRadius: 6, fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                        Back
                      </button>
                      <button style={{ flex: 2, padding: "14px 0", background: "#C4923A", color: "white", border: "none", borderRadius: 6, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.02em" }}>
                        Submit Application
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* BUYER SIGNUP */}
            {signupType === "buyer" && (
              <div className="fade-up">
                <div style={{ marginBottom: 36 }}>
                  <span onClick={resetSignup} style={{ fontSize: 13, color: "#B5B0A5", cursor: "pointer" }}>← Back</span>
                </div>
                <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C4923A", marginBottom: 8, fontWeight: 600 }}>Buyer</p>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: "#2A2824", marginBottom: 8 }}>
                  {signupStep === 1 ? "Create your account" : "You're in"}
                </h2>

                <div style={{ display: "flex", gap: 8, marginBottom: 36 }}>
                  {[1, 2].map(s => (
                    <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: s <= signupStep ? "#C4923A" : "#EDEBE6", transition: "background 0.3s" }} />
                  ))}
                </div>

                {signupStep === 1 && (
                  <div className="slide-in" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#7A7568", display: "block", marginBottom: 8 }}>Full Name</label>
                      <input placeholder="Your name" value={formData.name || ""} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#7A7568", display: "block", marginBottom: 8 }}>Email</label>
                      <input type="email" placeholder="you@email.com" value={formData.email || ""} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div style={{ background: "white", border: "1px solid #EDEBE6", borderRadius: 8, padding: "20px" }}>
                      <p style={{ fontSize: 13, color: "#7A7568", lineHeight: 1.7 }}>
                        Your account lets you browse all products, purchase founding seats, track your holdings, and verify your seat lineage at any time. No payment required until you buy a seat.
                      </p>
                    </div>
                    <button onClick={() => setSignupStep(2)} style={{ marginTop: 8, padding: "14px 0", background: "#2A2824", color: "white", border: "none", borderRadius: 6, fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                      Create Account
                    </button>
                  </div>
                )}

                {signupStep === 2 && (
                  <div className="slide-in" style={{ textAlign: "center", padding: "40px 0" }}>
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#FAF6EF", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 28, color: "#C4923A" }}>✓</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 500, marginBottom: 12 }}>Welcome to KA<SectionMark /><SectionMark />A</h3>
                    <p style={{ fontSize: 15, color: "#7A7568", marginBottom: 32, lineHeight: 1.6 }}>Your account is ready. Every seat you purchase will be serialized, hash-verified, and linked to your account with full lineage tracking.</p>
                    <button onClick={() => setView("list")} style={{ padding: "14px 36px", background: "#2A2824", color: "white", border: "none", borderRadius: 6, fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                      Browse Products
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* REFERRER SIGNUP */}
            {signupType === "referrer" && (
              <div className="fade-up">
                <div style={{ marginBottom: 36 }}>
                  <span onClick={resetSignup} style={{ fontSize: 13, color: "#B5B0A5", cursor: "pointer" }}>← Back</span>
                </div>
                <p style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C4923A", marginBottom: 8, fontWeight: 600 }}>Referrer</p>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 500, color: "#2A2824", marginBottom: 8 }}>
                  {signupStep === 1 ? "Join the network" : signupStep === 2 ? "How you'll earn" : "You're in"}
                </h2>

                <div style={{ display: "flex", gap: 8, marginBottom: 36 }}>
                  {[1, 2, 3].map(s => (
                    <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: s <= signupStep ? "#C4923A" : "#EDEBE6", transition: "background 0.3s" }} />
                  ))}
                </div>

                {signupStep === 1 && (
                  <div className="slide-in" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#7A7568", display: "block", marginBottom: 8 }}>Full Name</label>
                      <input placeholder="Your name" value={formData.name || ""} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#7A7568", display: "block", marginBottom: 8 }}>Email</label>
                      <input type="email" placeholder="you@email.com" value={formData.email || ""} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#7A7568", display: "block", marginBottom: 8 }}>How will you share? <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, color: "#B5B0A5" }}>(optional)</span></label>
                      <select value={formData.channel || ""} onChange={e => setFormData({...formData, channel: e.target.value})}>
                        <option value="">Select your primary channel</option>
                        <option value="newsletter">Newsletter</option>
                        <option value="social">Social Media</option>
                        <option value="blog">Blog / Website</option>
                        <option value="youtube">YouTube / Video</option>
                        <option value="podcast">Podcast</option>
                        <option value="community">Community / Forum</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <button onClick={() => setSignupStep(2)} style={{ marginTop: 8, padding: "14px 0", background: "#2A2824", color: "white", border: "none", borderRadius: 6, fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                      Continue
                    </button>
                  </div>
                )}

                {signupStep === 2 && (
                  <div className="slide-in" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div style={{ background: "white", border: "1px solid #EDEBE6", borderRadius: 10, overflow: "hidden" }}>
                      {[
                        { label: "Your commission", value: "25% of platform fee", detail: "On an $800 seat with 4% platform fee ($32), you earn $8 per sale" },
                        { label: "How it tracks", value: "Unique referral link", detail: "Every click is attributed. Cookies persist for 30 days." },
                        { label: "When you're paid", value: "On escrow release", detail: "After the buyer's escrow clears (14–30 days), your commission releases." },
                        { label: "What you can share", value: "Any listed product", detail: "Generate a link for any product on KA§§A. Share as many as you want." }
                      ].map((item, i) => (
                        <div key={i} style={{ padding: "20px 24px", borderBottom: i < 3 ? "1px solid #F3F1ED" : "none" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                            <span style={{ fontSize: 13, color: "#B5B0A5", fontWeight: 500 }}>{item.label}</span>
                            <span style={{ fontSize: 14, fontWeight: 600, color: "#2A2824" }}>{item.value}</span>
                          </div>
                          <p style={{ fontSize: 13, color: "#7A7568", lineHeight: 1.5 }}>{item.detail}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 12 }}>
                      <button onClick={() => setSignupStep(1)} style={{ flex: 1, padding: "14px 0", background: "transparent", color: "#7A7568", border: "1px solid #E0DDD6", borderRadius: 6, fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                        Back
                      </button>
                      <button onClick={() => setSignupStep(3)} style={{ flex: 2, padding: "14px 0", background: "#2A2824", color: "white", border: "none", borderRadius: 6, fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                        Join Network
                      </button>
                    </div>
                  </div>
                )}

                {signupStep === 3 && (
                  <div className="slide-in" style={{ textAlign: "center", padding: "40px 0" }}>
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#FAF6EF", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 28, color: "#C4923A" }}>✓</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 500, marginBottom: 12 }}>You're in the network</h3>
                    <p style={{ fontSize: 15, color: "#7A7568", marginBottom: 32, lineHeight: 1.6 }}>Your referral dashboard is ready. Generate links, track clicks, and watch your commissions grow as the catalog expands.</p>
                    <button onClick={() => setView("list")} style={{ padding: "14px 36px", background: "#2A2824", color: "white", border: "none", borderRadius: 6, fontSize: 15, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                      Browse Products to Share
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
