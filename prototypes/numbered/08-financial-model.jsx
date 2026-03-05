import { useState, useMemo, useCallback } from "react";

const GOLD = "#C4923A";
const BONE = "#F2EDE4";
const DARK = "#1A1A18";
const MID = "#6B6558";
const LIGHT_BORDER = "#DDD5C8";
const RED = "#B44A3F";
const GREEN = "#4A7C59";
const BLUE = "#3A6B8C";

function formatCurrency(n) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(2)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`;
  return `$${Math.round(n)}`;
}

function formatNumber(n) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return `${Math.round(n)}`;
}

function Slider({ label, value, onChange, min, max, step = 1, format = "number", suffix = "", prefix = "" }) {
  const displayVal = format === "currency" ? `$${value.toLocaleString()}` : format === "percent" ? `${value}%` : `${prefix}${value}${suffix}`;
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: MID, fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: DARK, fontFamily: "'DM Mono', monospace" }}>{displayVal}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: GOLD, height: 4, cursor: "pointer" }}
      />
    </div>
  );
}

function StatCard({ label, value, sub, color = DARK }) {
  return (
    <div style={{
      background: "white",
      border: `1px solid ${LIGHT_BORDER}`,
      borderRadius: 8,
      padding: "16px 20px",
      flex: 1,
      minWidth: 140
    }}>
      <div style={{ fontSize: 11, color: MID, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'DM Sans', sans-serif", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700, color, fontFamily: "'DM Mono', monospace", lineHeight: 1.1 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: MID, marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>{sub}</div>}
    </div>
  );
}

function MiniBar({ data, maxVal, label, color = GOLD }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
      <span style={{ fontSize: 11, color: MID, width: 30, textAlign: "right", fontFamily: "'DM Mono', monospace" }}>{label}</span>
      <div style={{ flex: 1, height: 16, background: "#F5F0E8", borderRadius: 3, overflow: "hidden" }}>
        <div style={{
          width: `${Math.min(100, (data / maxVal) * 100)}%`,
          height: "100%",
          background: color,
          borderRadius: 3,
          transition: "width 0.3s ease"
        }} />
      </div>
      <span style={{ fontSize: 11, color: DARK, width: 60, textAlign: "right", fontFamily: "'DM Mono', monospace" }}>{formatCurrency(data)}</span>
    </div>
  );
}

export default function KassaProjection() {
  // Growth assumptions
  const [foundersM1, setFoundersM1] = useState(3);
  const [founderGrowthPct, setFounderGrowthPct] = useState(25);
  const [avgSeatPrice, setAvgSeatPrice] = useState(1200);
  const [avgSeatsPerCascade, setAvgSeatsPerCascade] = useState(50);
  const [sellThroughPct, setSellThroughPct] = useState(60);
  const [avgWaves, setAvgWaves] = useState(4);
  const [waveMultiplier, setWaveMultiplier] = useState(160);
  
  // Economics
  const [platformFeePct, setPlatformFeePct] = useState(3);
  const [referralCommPct, setReferralCommPct] = useState(25);
  const [agentMixM12, setAgentMixM12] = useState(35);
  const [monthlyOpCost, setMonthlyOpCost] = useState(2000);
  
  // Scenario toggle
  const [scenario, setScenario] = useState("base");
  
  const scenarioMultipliers = {
    conservative: { growth: 0.6, sellThrough: 0.7, agentBoost: 0.5 },
    base: { growth: 1.0, sellThrough: 1.0, agentBoost: 1.0 },
    aggressive: { growth: 1.5, sellThrough: 1.2, agentBoost: 1.5 }
  };

  const projection = useMemo(() => {
    const sm = scenarioMultipliers[scenario];
    const months = [];
    let cumulativeRevenue = 0;
    let cumulativeSeats = 0;
    let cumulativeFounders = 0;
    let cumulativeGMV = 0;

    for (let m = 1; m <= 24; m++) {
      const effectiveGrowth = (founderGrowthPct / 100) * sm.growth;
      const newFounders = Math.max(1, Math.round(foundersM1 * Math.pow(1 + effectiveGrowth, m - 1)));
      cumulativeFounders += newFounders;

      // Each founder has a cascade with multiple waves
      // Average seat price increases per wave
      let totalGMV = 0;
      let totalSeats = 0;
      let totalPlatformRevenue = 0;
      let totalReferralCost = 0;

      // For each new founder listing this month
      // They don't sell all waves in month 1 - spread over time
      // But existing founders' cascades continue selling
      // Simplified: each founder sells (sellThrough% of seats/cascade) spread over ~6 months
      // Monthly seat velocity per active founder
      const effectiveSellThrough = (sellThroughPct / 100) * Math.min(1, sm.sellThrough);
      const totalSeatsPerFounder = avgSeatsPerCascade * avgWaves;
      const sellableSeats = totalSeatsPerFounder * effectiveSellThrough;
      const monthsToSell = 6; // average months to sell through a cascade
      const seatsPerFounderPerMonth = sellableSeats / monthsToSell;

      // Active founders = founders from last 6 months still selling
      const activeFounders = Math.min(cumulativeFounders, (() => {
        let active = 0;
        for (let prev = Math.max(0, m - 6); prev < m; prev++) {
          const prevFounders = Math.max(1, Math.round(foundersM1 * Math.pow(1 + effectiveGrowth, prev)));
          active += prevFounders;
        }
        return active;
      })());

      // Calculate weighted average price across waves
      let avgWeightedPrice = 0;
      let totalWaveSeats = 0;
      for (let w = 1; w <= avgWaves; w++) {
        const wavePrice = avgSeatPrice * Math.pow(waveMultiplier / 100, w - 1);
        const waveSeats = avgSeatsPerCascade; // same seats per wave for simplicity
        avgWeightedPrice += wavePrice * waveSeats;
        totalWaveSeats += waveSeats;
      }
      avgWeightedPrice /= totalWaveSeats;

      totalSeats = Math.round(activeFounders * seatsPerFounderPerMonth);
      totalGMV = totalSeats * avgWeightedPrice;

      // Platform fee scales with founder count
      let effectiveFee = platformFeePct / 100;
      if (cumulativeFounders > 200) effectiveFee = Math.max(effectiveFee, 0.05);
      else if (cumulativeFounders > 50) effectiveFee = Math.max(effectiveFee, 0.04);
      else if (cumulativeFounders > 10) effectiveFee = Math.max(effectiveFee, 0.03);

      totalPlatformRevenue = totalGMV * effectiveFee;

      // Agent mix grows over time
      const agentMixThisMonth = Math.min(agentMixM12 * sm.agentBoost, 80) * Math.min(1, m / 12) / 100;
      const humanReferralPct = 0.4; // 40% of human sales come through referrals
      const agentReferralPct = 0.85; // 85% of agent-mediated sales come through referrals

      const humanSales = totalGMV * (1 - agentMixThisMonth);
      const agentSales = totalGMV * agentMixThisMonth;
      const referralGMV = (humanSales * humanReferralPct) + (agentSales * agentReferralPct);
      totalReferralCost = referralGMV * effectiveFee * (referralCommPct / 100);

      const netRevenue = totalPlatformRevenue - totalReferralCost;
      const netAfterOps = netRevenue - monthlyOpCost;

      cumulativeRevenue += netRevenue;
      cumulativeSeats += totalSeats;
      cumulativeGMV += totalGMV;

      months.push({
        month: m,
        newFounders,
        activeFounders,
        cumulativeFounders,
        totalSeats,
        cumulativeSeats,
        avgWeightedPrice: Math.round(avgWeightedPrice),
        totalGMV,
        cumulativeGMV,
        platformRevenue: totalPlatformRevenue,
        referralCost: totalReferralCost,
        netRevenue,
        netAfterOps,
        cumulativeRevenue,
        agentMix: agentMixThisMonth,
        effectiveFee,
        monthlyOpCost
      });
    }
    return months;
  }, [foundersM1, founderGrowthPct, avgSeatPrice, avgSeatsPerCascade, sellThroughPct, avgWaves, waveMultiplier, platformFeePct, referralCommPct, agentMixM12, monthlyOpCost, scenario]);

  const m6 = projection[5];
  const m12 = projection[11];
  const m18 = projection[17];
  const m24 = projection[23];
  const breakEvenMonth = projection.findIndex(m => m.netAfterOps > 0) + 1;

  const maxMonthlyGMV = Math.max(...projection.map(m => m.totalGMV));
  const maxMonthlyRev = Math.max(...projection.map(m => m.netRevenue));

  return (
    <div style={{
      background: BONE,
      minHeight: "100vh",
      fontFamily: "'DM Sans', sans-serif",
      color: DARK,
      padding: 0
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: DARK, color: BONE, padding: "28px 32px 20px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
          <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.04em" }}>KA<span style={{ color: GOLD }}>§§</span>A</span>
          <span style={{ fontSize: 13, color: "#8A8275", fontWeight: 400 }}>FINANCIAL PROJECTION MODEL</span>
        </div>
        <div style={{ fontSize: 11, color: "#6B6558", fontFamily: "'DM Mono', monospace" }}>
          24-month forecast · powered by MO<span style={{ color: GOLD }}>§</span>E<span style={{ color: GOLD }}>§</span>™
        </div>
      </div>

      <div style={{ padding: "24px 32px", maxWidth: 1100, margin: "0 auto" }}>

        {/* Scenario Selector */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {["conservative", "base", "aggressive"].map(s => (
            <button
              key={s}
              onClick={() => setScenario(s)}
              style={{
                padding: "8px 20px",
                borderRadius: 6,
                border: scenario === s ? `2px solid ${GOLD}` : `1px solid ${LIGHT_BORDER}`,
                background: scenario === s ? "white" : "transparent",
                color: scenario === s ? DARK : MID,
                fontWeight: scenario === s ? 600 : 400,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                textTransform: "capitalize",
                transition: "all 0.2s"
              }}
            >
              {s}
            </button>
          ))}
          <span style={{ fontSize: 11, color: MID, alignSelf: "center", marginLeft: 8, fontStyle: "italic" }}>
            {scenario === "conservative" && "0.6x growth, 0.7x sell-through"}
            {scenario === "base" && "Your input assumptions as-is"}
            {scenario === "aggressive" && "1.5x growth, 1.2x sell-through, 1.5x agent adoption"}
          </span>
        </div>

        {/* Key Metrics */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
          <StatCard label="Year 1 GMV" value={formatCurrency(m12.cumulativeGMV)} sub={`${formatNumber(m12.cumulativeSeats)} seats sold`} color={DARK} />
          <StatCard label="Year 1 Net Revenue" value={formatCurrency(m12.cumulativeRevenue)} sub={`After referral costs`} color={GOLD} />
          <StatCard label="Year 2 GMV" value={formatCurrency(m24.cumulativeGMV)} sub={`${formatNumber(m24.cumulativeSeats)} total seats`} color={DARK} />
          <StatCard label="Year 2 Net Revenue" value={formatCurrency(m24.cumulativeRevenue)} sub={`${m24.cumulativeFounders} total founders`} color={GOLD} />
          <StatCard
            label="Cashflow Positive"
            value={breakEvenMonth > 0 ? `Month ${breakEvenMonth}` : "N/A"}
            sub={breakEvenMonth > 0 ? `After $${monthlyOpCost}/mo ops` : "Adjust assumptions"}
            color={breakEvenMonth > 0 && breakEvenMonth <= 6 ? GREEN : breakEvenMonth > 0 ? GOLD : RED}
          />
        </div>

        <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
          {/* Left: Controls */}
          <div style={{ flex: "0 0 300px" }}>
            <div style={{
              background: "white",
              border: `1px solid ${LIGHT_BORDER}`,
              borderRadius: 10,
              padding: 24,
              marginBottom: 20
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: GOLD, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
                Growth Assumptions
              </div>
              <Slider label="New founders Month 1" value={foundersM1} onChange={setFoundersM1} min={1} max={20} />
              <Slider label="Monthly founder growth" value={founderGrowthPct} onChange={setFounderGrowthPct} min={5} max={50} format="percent" />
              <Slider label="Avg seat price (Wave 1)" value={avgSeatPrice} onChange={setAvgSeatPrice} min={200} max={5000} step={100} format="currency" />
              <Slider label="Seats per wave" value={avgSeatsPerCascade} onChange={setAvgSeatsPerCascade} min={10} max={200} step={5} />
              <Slider label="Waves per cascade" value={avgWaves} onChange={setAvgWaves} min={2} max={8} />
              <Slider label="Wave price multiplier" value={waveMultiplier} onChange={setWaveMultiplier} min={120} max={250} step={10} format="percent" />
              <Slider label="Sell-through rate" value={sellThroughPct} onChange={setSellThroughPct} min={20} max={90} format="percent" />
            </div>

            <div style={{
              background: "white",
              border: `1px solid ${LIGHT_BORDER}`,
              borderRadius: 10,
              padding: 24
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: GOLD, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
                Economics
              </div>
              <Slider label="Platform fee" value={platformFeePct} onChange={setPlatformFeePct} min={2} max={6} format="percent" />
              <Slider label="Referral commission (% of fee)" value={referralCommPct} onChange={setReferralCommPct} min={10} max={50} format="percent" />
              <Slider label="Agent-mediated sales by M12" value={agentMixM12} onChange={setAgentMixM12} min={0} max={70} format="percent" />
              <Slider label="Monthly operating cost" value={monthlyOpCost} onChange={setMonthlyOpCost} min={500} max={15000} step={500} format="currency" />
            </div>
          </div>

          {/* Right: Charts & Tables */}
          <div style={{ flex: 1, minWidth: 400 }}>
            {/* Monthly GMV Bars */}
            <div style={{
              background: "white",
              border: `1px solid ${LIGHT_BORDER}`,
              borderRadius: 10,
              padding: 24,
              marginBottom: 20
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: GOLD, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
                Monthly GMV (Gross Merchandise Volume)
              </div>
              {[0, 2, 5, 8, 11, 14, 17, 20, 23].map(i => (
                <MiniBar key={i} data={projection[i].totalGMV} maxVal={maxMonthlyGMV} label={`M${i + 1}`} color={GOLD} />
              ))}
            </div>

            {/* Monthly Net Revenue Bars */}
            <div style={{
              background: "white",
              border: `1px solid ${LIGHT_BORDER}`,
              borderRadius: 10,
              padding: 24,
              marginBottom: 20
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: GOLD, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
                Monthly Net Platform Revenue (After Referral Costs)
              </div>
              {[0, 2, 5, 8, 11, 14, 17, 20, 23].map(i => (
                <MiniBar key={i} data={Math.max(0, projection[i].netRevenue)} maxVal={maxMonthlyRev} label={`M${i + 1}`} color={GREEN} />
              ))}
            </div>

            {/* Quarterly Breakdown */}
            <div style={{
              background: "white",
              border: `1px solid ${LIGHT_BORDER}`,
              borderRadius: 10,
              padding: 24,
              marginBottom: 20,
              overflowX: "auto"
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: GOLD, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
                Quarterly Summary
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: "'DM Mono', monospace" }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${LIGHT_BORDER}` }}>
                    {["", "Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"].map(h => (
                      <th key={h} style={{ padding: "8px 6px", textAlign: "right", color: MID, fontWeight: 500, fontSize: 11 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "New Founders", key: "newFounders", fmt: "num" },
                    { label: "Active Founders", key: "activeFounders", fmt: "num" },
                    { label: "Seats Sold", key: "totalSeats", fmt: "num" },
                    { label: "GMV", key: "totalGMV", fmt: "cur" },
                    { label: "Platform Rev", key: "platformRevenue", fmt: "cur" },
                    { label: "Referral Cost", key: "referralCost", fmt: "cur" },
                    { label: "Net Revenue", key: "netRevenue", fmt: "cur" },
                    { label: "Agent Mix", key: "agentMix", fmt: "pct" },
                    { label: "Net After Ops", key: "netAfterOps", fmt: "cur" }
                  ].map(row => (
                    <tr key={row.label} style={{ borderBottom: `1px solid ${LIGHT_BORDER}` }}>
                      <td style={{ padding: "7px 6px", fontWeight: 500, color: DARK, fontFamily: "'DM Sans', sans-serif", fontSize: 11, whiteSpace: "nowrap" }}>{row.label}</td>
                      {[2, 5, 8, 11, 14, 17, 20, 23].map(qi => {
                        const qData = projection.slice(Math.max(0, qi - 2), qi + 1);
                        let val;
                        if (row.key === "agentMix") {
                          val = projection[qi].agentMix;
                        } else if (row.key === "activeFounders" || row.key === "newFounders") {
                          val = qData.reduce((s, m) => s + m[row.key], 0);
                          if (row.key === "activeFounders") val = projection[qi].activeFounders;
                        } else {
                          val = qData.reduce((s, m) => s + m[row.key], 0);
                        }
                        const display = row.fmt === "cur" ? formatCurrency(val) :
                          row.fmt === "pct" ? `${Math.round(val * 100)}%` :
                          formatNumber(val);
                        const isNeg = val < 0;
                        return (
                          <td key={qi} style={{
                            padding: "7px 6px",
                            textAlign: "right",
                            color: isNeg ? RED : DARK,
                            fontSize: 11
                          }}>
                            {display}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Unit Economics */}
            <div style={{
              background: "white",
              border: `1px solid ${LIGHT_BORDER}`,
              borderRadius: 10,
              padding: 24
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: GOLD, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
                Unit Economics at Month 12
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 12 }}>
                <div>
                  <div style={{ color: MID, fontSize: 11, marginBottom: 2 }}>Avg weighted seat price</div>
                  <div style={{ fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>{formatCurrency(m12.avgWeightedPrice)}</div>
                </div>
                <div>
                  <div style={{ color: MID, fontSize: 11, marginBottom: 2 }}>Platform take per seat</div>
                  <div style={{ fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>{formatCurrency(m12.avgWeightedPrice * m12.effectiveFee)}</div>
                </div>
                <div>
                  <div style={{ color: MID, fontSize: 11, marginBottom: 2 }}>Net per seat (after referral)</div>
                  <div style={{ fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>
                    {formatCurrency(m12.avgWeightedPrice * m12.effectiveFee * (1 - (referralCommPct / 100) * 0.5))}
                  </div>
                </div>
                <div>
                  <div style={{ color: MID, fontSize: 11, marginBottom: 2 }}>Effective platform fee</div>
                  <div style={{ fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>{(m12.effectiveFee * 100).toFixed(1)}%</div>
                </div>
                <div>
                  <div style={{ color: MID, fontSize: 11, marginBottom: 2 }}>Agent-mediated %</div>
                  <div style={{ fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>{Math.round(m12.agentMix * 100)}%</div>
                </div>
                <div>
                  <div style={{ color: MID, fontSize: 11, marginBottom: 2 }}>Monthly seats sold</div>
                  <div style={{ fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>{formatNumber(m12.totalSeats)}</div>
                </div>
                <div>
                  <div style={{ color: MID, fontSize: 11, marginBottom: 2 }}>Cumulative founders</div>
                  <div style={{ fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>{m12.cumulativeFounders}</div>
                </div>
                <div>
                  <div style={{ color: MID, fontSize: 11, marginBottom: 2 }}>Revenue/founder/month</div>
                  <div style={{ fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>
                    {formatCurrency(m12.netRevenue / Math.max(1, m12.activeFounders))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div style={{
          background: "white",
          border: `1px solid ${LIGHT_BORDER}`,
          borderRadius: 10,
          padding: 24,
          marginTop: 24
        }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: GOLD, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
            Key Milestones
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { label: "Month 6", data: m6 },
              { label: "Month 12", data: m12 },
              { label: "Month 18", data: m18 },
              { label: "Month 24", data: m24 }
            ].map(({ label, data }) => (
              <div key={label} style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>{label}</div>
                <div style={{ fontSize: 11, color: MID, lineHeight: 1.8, fontFamily: "'DM Mono', monospace" }}>
                  <div>{data.cumulativeFounders} founders · {formatNumber(data.cumulativeSeats)} seats</div>
                  <div>Cumulative GMV: {formatCurrency(data.cumulativeGMV)}</div>
                  <div>Cumulative Net Rev: {formatCurrency(data.cumulativeRevenue)}</div>
                  <div>Monthly GMV: {formatCurrency(data.totalGMV)}</div>
                  <div>Monthly Net: {formatCurrency(data.netRevenue)}</div>
                  <div>Agent mix: {Math.round(data.agentMix * 100)}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", padding: "24px 0 16px", fontSize: 10, color: MID, fontFamily: "'DM Mono', monospace" }}>
          KA<span style={{ color: GOLD }}>§§</span>A Financial Model · Ello Cello LLC · CONFIDENTIAL · {new Date().toISOString().split('T')[0]}
        </div>
      </div>
    </div>
  );
}
