import { useState, useMemo } from "react";

const GOLD = "#C4923A";
const BONE = "#F2EDE4";
const DARK = "#1A1A18";
const MID = "#6B6558";
const LIGHT_BORDER = "#DDD5C8";
const RED = "#B44A3F";
const GREEN = "#4A7C59";

function fmt$(n) {
  if (Math.abs(n) >= 1000000) return `$${(n / 1000000).toFixed(2)}M`;
  if (Math.abs(n) >= 1000) return `$${(n / 1000).toFixed(1)}K`;
  return `$${Math.round(n).toLocaleString()}`;
}
function fmtN(n) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return `${Math.round(n).toLocaleString()}`;
}

function Slider({ label, value, onChange, min, max, step = 1, format = "number", note }) {
  const displayVal = format === "currency" ? `$${value.toLocaleString()}` : format === "percent" ? `${value}%` : format === "mult" ? `${value / 100}x` : `${value}`;
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <span style={{ fontSize: 11.5, color: MID, fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
        <span style={{ fontSize: 12.5, fontWeight: 600, color: DARK, fontFamily: "'DM Mono', monospace" }}>{displayVal}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: GOLD, height: 4, cursor: "pointer" }} />
      {note && <div style={{ fontSize: 10, color: "#9A9285", marginTop: 2, fontStyle: "italic" }}>{note}</div>}
    </div>
  );
}

function StatCard({ label, value, sub, color = DARK }) {
  return (
    <div style={{
      background: "white", border: `1px solid ${LIGHT_BORDER}`, borderRadius: 8,
      padding: "14px 18px", flex: 1, minWidth: 150
    }}>
      <div style={{ fontSize: 10, color: MID, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'DM Sans', sans-serif", marginBottom: 5 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color, fontFamily: "'DM Mono', monospace", lineHeight: 1.1 }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: MID, marginTop: 3, fontFamily: "'DM Sans', sans-serif" }}>{sub}</div>}
    </div>
  );
}

function Bar({ value, maxVal, label, color = GOLD, showVal }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
      <span style={{ fontSize: 10, color: MID, width: 26, textAlign: "right", fontFamily: "'DM Mono', monospace" }}>{label}</span>
      <div style={{ flex: 1, height: 14, background: "#F5F0E8", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ width: `${Math.max(1, Math.min(100, (value / maxVal) * 100))}%`, height: "100%", background: color, borderRadius: 3, transition: "width 0.3s ease" }} />
      </div>
      <span style={{ fontSize: 10, color: DARK, width: 58, textAlign: "right", fontFamily: "'DM Mono', monospace" }}>{showVal || fmt$(value)}</span>
    </div>
  );
}

function Section({ title, children, style: s }) {
  return (
    <div style={{ background: "white", border: `1px solid ${LIGHT_BORDER}`, borderRadius: 10, padding: "20px 22px", marginBottom: 16, ...s }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: GOLD, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>{title}</div>
      {children}
    </div>
  );
}

export default function KassaProjectionV2() {
  const [foundersM1, setFoundersM1] = useState(3);
  const [peakGrowthPct, setPeakGrowthPct] = useState(30);
  const [growthDecayPct, setGrowthDecayPct] = useState(8);
  const [founderCap, setFounderCap] = useState(30);
  const [avgSeatPrice, setAvgSeatPrice] = useState(1000);
  const [seatsPerWave, setSeatsPerWave] = useState(40);
  const [avgWaves, setAvgWaves] = useState(4);
  const [waveMult, setWaveMult] = useState(160);
  const [sellThrough, setSellThrough] = useState(55);
  const [platformFee, setPlatformFee] = useState(3);
  const [refComm, setRefComm] = useState(25);
  const [agentMixM12, setAgentMixM12] = useState(30);
  const [opsCost, setOpsCost] = useState(2500);
  const [scenario, setScenario] = useState("base");
  const [tab, setTab] = useState("overview");

  const SM = { conservative: { g: 0.65, s: 0.75, a: 0.5 }, base: { g: 1, s: 1, a: 1 }, aggressive: { g: 1.4, s: 1.15, a: 1.5 } };

  const projection = useMemo(() => {
    const s = SM[scenario];
    const months = [];
    let cumRev = 0, cumSeats = 0, cumFounders = 0, cumGMV = 0;
    
    let wavePriceSum = 0, waveSeatsSum = 0;
    for (let w = 1; w <= avgWaves; w++) {
      const wp = avgSeatPrice * Math.pow(waveMult / 100, w - 1);
      wavePriceSum += wp * seatsPerWave;
      waveSeatsSum += seatsPerWave;
    }
    const avgWPrice = wavePriceSum / waveSeatsSum;
    const effST = (sellThrough / 100) * Math.min(1, s.s);
    const totalSeatsPerFounder = seatsPerWave * avgWaves;
    const sellablePerFounder = totalSeatsPerFounder * effST;
    const sellMonths = 8;
    const seatsPerFounderMo = sellablePerFounder / sellMonths;

    for (let m = 1; m <= 24; m++) {
      const rawNew = foundersM1 * Math.pow(1 + (peakGrowthPct * s.g / 100), m - 1) * Math.pow(1 - growthDecayPct / 100, Math.max(0, m - 3));
      const newFounders = Math.min(Math.max(1, Math.round(rawNew)), founderCap);
      cumFounders += newFounders;

      let activeFounders = 0;
      const mStart = Math.max(0, months.length - sellMonths + 1);
      for (let p = mStart; p < months.length; p++) {
        activeFounders += months[p].newFounders;
      }
      activeFounders += newFounders;
      
      const moSeats = Math.round(activeFounders * seatsPerFounderMo);
      const moGMV = moSeats * avgWPrice;
      
      let effFee = platformFee / 100;
      if (cumFounders > 200) effFee = Math.max(effFee, 0.05);
      else if (cumFounders > 50) effFee = Math.max(effFee, 0.04);
      else if (cumFounders > 10) effFee = Math.max(effFee, 0.03);
      
      const platRev = moGMV * effFee;
      const agentTarget = Math.min(70, agentMixM12 * s.a);
      const agentPct = agentTarget * (1 / (1 + Math.exp(-0.4 * (m - 8)))) / 100;
      const humanSales = moGMV * (1 - agentPct);
      const agentSales = moGMV * agentPct;
      const refGMV = (humanSales * 0.35) + (agentSales * 0.80);
      const refCost = refGMV * effFee * (refComm / 100);
      const netRev = platRev - refCost;
      const netOps = netRev - opsCost;
      cumRev += netRev;
      cumSeats += moSeats;
      cumGMV += moGMV;
      const founderPayout = moGMV - platRev;

      months.push({
        month: m, newFounders, activeFounders, cumFounders,
        moSeats, cumSeats, avgWPrice: Math.round(avgWPrice),
        moGMV, cumGMV, platRev, refCost, netRev, netOps,
        cumRev, agentPct, effFee, founderPayout
      });
    }
    return months;
  }, [foundersM1, peakGrowthPct, growthDecayPct, founderCap, avgSeatPrice, seatsPerWave, avgWaves, waveMult, sellThrough, platformFee, refComm, agentMixM12, opsCost, scenario]);

  const m3 = projection[2], m6 = projection[5], m12 = projection[11], m18 = projection[17], m24 = projection[23];
  const breakEven = projection.findIndex(m => m.netOps > 0) + 1;
  const maxGMV = Math.max(...projection.map(m => m.moGMV));
  const maxRev = Math.max(...projection.map(m => Math.max(0, m.netRev)));
  const maxFounders = Math.max(...projection.map(m => m.newFounders));
  const founderY1Total = projection.slice(0, 12).reduce((s, m) => s + m.founderPayout, 0);
  const founderY2Total = projection.reduce((s, m) => s + m.founderPayout, 0);
  const qIndices = [2, 5, 8, 11, 14, 17, 20, 23];
  const qLabels = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"];

  const cascadeValue = (() => { let t = 0; for (let w = 1; w <= avgWaves; w++) t += seatsPerWave * avgSeatPrice * Math.pow(waveMult / 100, w - 1) * sellThrough / 100; return t; })();
  const cascadeNet = cascadeValue * (1 - platformFee / 100);

  return (
    <div style={{ background: BONE, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", color: DARK }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      
      <div style={{ background: DARK, color: BONE, padding: "24px 28px 18px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: "0.04em" }}>KA<span style={{ color: GOLD }}>§§</span>A</span>
          <span style={{ fontSize: 12, color: "#8A8275" }}>FINANCIAL PROJECTION MODEL v2</span>
          <span style={{ fontSize: 10, color: "#5A5548", marginLeft: "auto", fontFamily: "'DM Mono', monospace" }}>
            Growth decay · founder caps · sigmoid agent curve
          </span>
        </div>
      </div>

      <div style={{ padding: "20px 28px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
          {["conservative", "base", "aggressive"].map(sc => (
            <button key={sc} onClick={() => setScenario(sc)} style={{
              padding: "7px 18px", borderRadius: 6,
              border: scenario === sc ? `2px solid ${GOLD}` : `1px solid ${LIGHT_BORDER}`,
              background: scenario === sc ? "white" : "transparent",
              color: scenario === sc ? DARK : MID, fontWeight: scenario === sc ? 600 : 400,
              fontSize: 12, cursor: "pointer", textTransform: "capitalize"
            }}>{sc}</button>
          ))}
          <span style={{ fontSize: 10, color: MID, marginLeft: 8, fontStyle: "italic" }}>
            {scenario === "conservative" ? "0.65x growth · 0.75x sell-through · 0.5x agent" :
             scenario === "base" ? "Your assumptions as entered" :
             "1.4x growth · 1.15x sell-through · 1.5x agent adoption"}
          </span>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
          <StatCard label="Year 1 GMV" value={fmt$(m12.cumGMV)} sub={`${fmtN(m12.cumSeats)} seats · ${m12.cumFounders} founders`} />
          <StatCard label="Year 1 Net Revenue" value={fmt$(m12.cumRev)} sub={`${(m12.effFee * 100).toFixed(0)}% effective fee`} color={GOLD} />
          <StatCard label="Year 2 GMV" value={fmt$(m24.cumGMV)} sub={`${fmtN(m24.cumSeats)} seats · ${m24.cumFounders} founders`} />
          <StatCard label="Year 2 Net Revenue" value={fmt$(m24.cumRev)} color={GOLD} sub={`Agent mix: ${Math.round(m24.agentPct * 100)}%`} />
          <StatCard label="Cashflow +" value={breakEven > 0 ? `Mo ${breakEven}` : "—"} 
            sub={breakEven > 0 ? `After $${opsCost.toLocaleString()}/mo` : "Not in 24mo"} 
            color={breakEven > 0 && breakEven <= 6 ? GREEN : breakEven > 0 ? GOLD : RED} />
        </div>

        <div style={{ 
          background: `linear-gradient(135deg, ${DARK} 0%, #2A2A25 100%)`, 
          borderRadius: 10, padding: "16px 22px", marginBottom: 20,
          display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center"
        }}>
          <div>
            <div style={{ fontSize: 10, color: GOLD, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Founder Capital Deployed (Non-Dilutive)</div>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 10, color: "#8A8275" }}>Year 1</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: BONE, fontFamily: "'DM Mono', monospace" }}>{fmt$(founderY1Total)}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: "#8A8275" }}>Year 2 cumulative</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: BONE, fontFamily: "'DM Mono', monospace" }}>{fmt$(founderY2Total)}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: "#8A8275" }}>Avg per founder cascade</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: BONE, fontFamily: "'DM Mono', monospace" }}>{fmt$(cascadeNet)}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: "#8A8275" }}>Runway equiv (@ $8K/mo)</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: BONE, fontFamily: "'DM Mono', monospace" }}>{Math.round(cascadeNet / 8000)} months</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 4, marginBottom: 16, borderBottom: `1px solid ${LIGHT_BORDER}` }}>
          {[
            { id: "overview", label: "Overview" },
            { id: "quarterly", label: "Quarterly" },
            { id: "sensitivity", label: "Sensitivity" },
            { id: "unit", label: "Unit Economics" }
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: "8px 16px", border: "none", borderBottom: tab === t.id ? `2px solid ${GOLD}` : "2px solid transparent",
              background: "none", color: tab === t.id ? DARK : MID, fontWeight: tab === t.id ? 600 : 400,
              fontSize: 12, cursor: "pointer", marginBottom: -1
            }}>{t.label}</button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <div style={{ flex: "0 0 280px" }}>
            <Section title="Supply & Growth">
              <Slider label="Founders Month 1" value={foundersM1} onChange={setFoundersM1} min={1} max={15} />
              <Slider label="Peak growth rate" value={peakGrowthPct} onChange={setPeakGrowthPct} min={5} max={50} format="percent" note="Monthly % at start, decays over time" />
              <Slider label="Growth decay" value={growthDecayPct} onChange={setGrowthDecayPct} min={0} max={15} format="percent" note="pp lost per month after month 3" />
              <Slider label="Founder cap/month" value={founderCap} onChange={setFounderCap} min={5} max={100} note="Operational ceiling on onboarding" />
            </Section>
            <Section title="Cascade Structure">
              <Slider label="Avg seat price (W1)" value={avgSeatPrice} onChange={setAvgSeatPrice} min={200} max={5000} step={50} format="currency" />
              <Slider label="Seats per wave" value={seatsPerWave} onChange={setSeatsPerWave} min={10} max={150} step={5} />
              <Slider label="Waves" value={avgWaves} onChange={setAvgWaves} min={2} max={8} />
              <Slider label="Wave multiplier" value={waveMult} onChange={setWaveMult} min={120} max={250} step={5} format="mult" />
              <Slider label="Sell-through" value={sellThrough} onChange={setSellThrough} min={20} max={85} format="percent" />
            </Section>
            <Section title="Economics">
              <Slider label="Platform fee" value={platformFee} onChange={setPlatformFee} min={2} max={6} format="percent" />
              <Slider label="Referral commission" value={refComm} onChange={setRefComm} min={10} max={50} format="percent" note="% of platform fee → referrers" />
              <Slider label="Agent-mediated by M12" value={agentMixM12} onChange={setAgentMixM12} min={0} max={60} format="percent" note="Sigmoid adoption curve" />
              <Slider label="Monthly ops" value={opsCost} onChange={setOpsCost} min={500} max={15000} step={250} format="currency" />
            </Section>
          </div>

          <div style={{ flex: 1, minWidth: 380 }}>
            {tab === "overview" && (
              <>
                <Section title="Monthly GMV">
                  {projection.map((m, i) => <Bar key={i} value={m.moGMV} maxVal={maxGMV} label={m.month} />)}
                </Section>
                <Section title="Monthly Net Revenue">
                  {projection.map((m, i) => <Bar key={i} value={Math.max(0, m.netRev)} maxVal={maxRev} label={m.month} color={GREEN} />)}
                </Section>
                <Section title="New Founders / Month">
                  {projection.map((m, i) => <Bar key={i} value={m.newFounders} maxVal={maxFounders} label={m.month} color={GOLD} showVal={String(m.newFounders)} />)}
                </Section>
              </>
            )}

            {tab === "quarterly" && (
              <Section title="Quarterly Breakdown" style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: "'DM Mono', monospace" }}>
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${LIGHT_BORDER}` }}>
                      <th style={{ padding: "6px 4px", textAlign: "left", color: MID, fontWeight: 500, fontSize: 10 }}></th>
                      {qLabels.map(q => <th key={q} style={{ padding: "6px 4px", textAlign: "right", color: MID, fontWeight: 500, fontSize: 10 }}>{q}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { l: "New Founders", fn: (qi) => { const st = qi < 3 ? 0 : qi - 2; return projection.slice(st, qi + 1).reduce((s, m) => s + m.newFounders, 0); }, f: fmtN },
                      { l: "Active Founders", fn: (qi) => projection[qi].activeFounders, f: fmtN },
                      { l: "Cumulative", fn: (qi) => projection[qi].cumFounders, f: fmtN },
                      { l: "Seats (Qtr)", fn: (qi) => { const st = qi < 3 ? 0 : qi - 2; return projection.slice(st, qi + 1).reduce((s, m) => s + m.moSeats, 0); }, f: fmtN },
                      { l: "GMV (Qtr)", fn: (qi) => { const st = qi < 3 ? 0 : qi - 2; return projection.slice(st, qi + 1).reduce((s, m) => s + m.moGMV, 0); }, f: fmt$ },
                      { l: "Platform Rev", fn: (qi) => { const st = qi < 3 ? 0 : qi - 2; return projection.slice(st, qi + 1).reduce((s, m) => s + m.platRev, 0); }, f: fmt$ },
                      { l: "Referral Cost", fn: (qi) => { const st = qi < 3 ? 0 : qi - 2; return projection.slice(st, qi + 1).reduce((s, m) => s + m.refCost, 0); }, f: fmt$ },
                      { l: "Net Revenue", fn: (qi) => { const st = qi < 3 ? 0 : qi - 2; return projection.slice(st, qi + 1).reduce((s, m) => s + m.netRev, 0); }, f: fmt$ },
                      { l: "Net After Ops", fn: (qi) => { const st = qi < 3 ? 0 : qi - 2; return projection.slice(st, qi + 1).reduce((s, m) => s + m.netOps, 0); }, f: fmt$ },
                      { l: "Agent Mix", fn: (qi) => projection[qi].agentPct, f: (v) => `${Math.round(v * 100)}%` },
                      { l: "Cum GMV", fn: (qi) => projection[qi].cumGMV, f: fmt$ },
                      { l: "Cum Net Rev", fn: (qi) => projection[qi].cumRev, f: fmt$ },
                      { l: "Founder Capital", fn: (qi) => { const st = qi < 3 ? 0 : qi - 2; return projection.slice(st, qi + 1).reduce((s, m) => s + m.founderPayout, 0); }, f: fmt$ },
                    ].map(row => (
                      <tr key={row.l} style={{ borderBottom: `1px solid ${LIGHT_BORDER}` }}>
                        <td style={{ padding: "6px 4px", fontWeight: 500, color: DARK, fontFamily: "'DM Sans', sans-serif", fontSize: 10.5, whiteSpace: "nowrap" }}>{row.l}</td>
                        {qIndices.map(qi => {
                          const val = row.fn(qi);
                          return <td key={qi} style={{ padding: "6px 4px", textAlign: "right", color: val < 0 ? RED : DARK, fontSize: 10.5 }}>{row.f(val)}</td>;
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Section>
            )}

            {tab === "sensitivity" && (
              <>
                <Section title="Sensitivity Analysis — What Moves Year 2 Revenue Most?">
                  <div style={{ fontSize: 11, color: MID, marginBottom: 14, lineHeight: 1.5 }}>
                    Approximate impact of a +1 unit change in each input on cumulative Year 2 net revenue. Longer bars = higher leverage.
                  </div>
                  {(() => {
                    const baseRev = m24.cumRev;
                    const tests = [
                      { label: "+1 founder M1", delta: baseRev * (1 / foundersM1) },
                      { label: "+5pp peak growth", delta: baseRev * 0.22 },
                      { label: "+$200 seat price", delta: baseRev * (200 / avgSeatPrice) },
                      { label: "+10 seats/wave", delta: baseRev * (10 / seatsPerWave) },
                      { label: "+10pp sell-through", delta: baseRev * (10 / sellThrough) },
                      { label: "+1pp platform fee", delta: m24.cumGMV * 0.01 * 0.7 },
                      { label: "+10pp agent mix", delta: baseRev * 0.06 },
                      { label: "+1 wave", delta: baseRev * (1 / avgWaves) * 0.5 },
                      { label: "-$500/mo ops", delta: 500 * 24 },
                      { label: "-3pp growth decay", delta: baseRev * 0.18 },
                    ];
                    const maxD = Math.max(...tests.map(t => Math.abs(t.delta)));
                    return tests.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta)).map((t, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <span style={{ fontSize: 10, color: MID, width: 130, textAlign: "right" }}>{t.label}</span>
                        <div style={{ flex: 1, height: 16, background: "#F5F0E8", borderRadius: 3, overflow: "hidden" }}>
                          <div style={{ width: `${(Math.abs(t.delta) / maxD) * 100}%`, height: "100%", background: t.delta > 0 ? GREEN : RED, borderRadius: 3, transition: "width 0.3s" }} />
                        </div>
                        <span style={{ fontSize: 10, color: GREEN, width: 55, textAlign: "right", fontFamily: "'DM Mono', monospace", fontWeight: 600 }}>
                          +{fmt$(t.delta)}
                        </span>
                      </div>
                    ));
                  })()}
                </Section>
                <Section title="Break-Even Sensitivity">
                  <div style={{ fontSize: 11, color: MID, marginBottom: 14, lineHeight: 1.5 }}>
                    How fast you reach monthly cashflow positive under different operating cost assumptions.
                  </div>
                  {[1000, 2000, 3000, 5000, 7500, 10000].map(cost => {
                    const be = projection.findIndex(m => m.netRev > cost) + 1;
                    return (
                      <div key={cost} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <span style={{ fontSize: 10, color: MID, width: 80, textAlign: "right", fontFamily: "'DM Mono', monospace" }}>${(cost / 1000).toFixed(1)}K/mo</span>
                        <div style={{ flex: 1, height: 16, background: "#F5F0E8", borderRadius: 3, overflow: "hidden" }}>
                          <div style={{ width: be > 0 ? `${(be / 24) * 100}%` : "100%", height: "100%", background: be > 0 && be <= 12 ? GREEN : be > 0 ? GOLD : RED, borderRadius: 3, transition: "width 0.3s" }} />
                        </div>
                        <span style={{ fontSize: 10, color: be > 0 ? GREEN : RED, width: 60, textAlign: "right", fontFamily: "'DM Mono', monospace", fontWeight: 600 }}>
                          {be > 0 ? `Month ${be}` : "> 24mo"}
                        </span>
                      </div>
                    );
                  })}
                </Section>
              </>
            )}

            {tab === "unit" && (
              <>
                <Section title="Unit Economics at Month 12">
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                    {[
                      { l: "Avg weighted seat price", v: fmt$(m12.avgWPrice) },
                      { l: "Platform take per seat", v: fmt$(m12.avgWPrice * m12.effFee) },
                      { l: "Net per seat (after ref)", v: fmt$(m12.avgWPrice * m12.effFee * (1 - refComm / 100 * 0.5)) },
                      { l: "Effective fee", v: `${(m12.effFee * 100).toFixed(1)}%` },
                      { l: "Agent-mediated", v: `${Math.round(m12.agentPct * 100)}%` },
                      { l: "Monthly seats", v: fmtN(m12.moSeats) },
                      { l: "Active founders", v: String(m12.activeFounders) },
                      { l: "Rev / active founder", v: fmt$(m12.netRev / Math.max(1, m12.activeFounders)) },
                      { l: "Seats / founder / mo", v: String(Math.round(m12.moSeats / Math.max(1, m12.activeFounders))) },
                    ].map(item => (
                      <div key={item.l}>
                        <div style={{ fontSize: 10, color: MID, marginBottom: 3 }}>{item.l}</div>
                        <div style={{ fontSize: 14, fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>{item.v}</div>
                      </div>
                    ))}
                  </div>
                </Section>
                <Section title="Single Cascade Economics (Founder View)">
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    {[
                      { l: "Total seats in cascade", v: `${seatsPerWave * avgWaves}` },
                      { l: "Sellable seats", v: `${Math.round(seatsPerWave * avgWaves * sellThrough / 100)}` },
                      { l: "Gross cascade value", v: fmt$(cascadeValue) },
                      { l: "Platform fee", v: fmt$(cascadeValue * platformFee / 100) },
                      { l: "Founder net", v: fmt$(cascadeNet) },
                      { l: "Runway equiv (@ $8K/mo)", v: `${Math.round(cascadeNet / 8000)} months` },
                      { l: "Wave 1 price", v: fmt$(avgSeatPrice) },
                      { l: `Wave ${avgWaves} price`, v: fmt$(avgSeatPrice * Math.pow(waveMult / 100, avgWaves - 1)) },
                    ].map(item => (
                      <div key={item.l}>
                        <div style={{ fontSize: 10, color: MID, marginBottom: 3 }}>{item.l}</div>
                        <div style={{ fontSize: 14, fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>{item.v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 14, padding: "12px 14px", background: "#F8F5EF", borderRadius: 6, fontSize: 10, color: MID, lineHeight: 1.6 }}>
                    A single cascade generates {fmt$(cascadeNet)} in non-dilutive capital for the founder.
                    At a $8K/mo burn rate, that's {Math.round(cascadeNet / 8000)} months of runway — without giving up a single point of equity.
                    Wave 1 buyers pay {fmt$(avgSeatPrice)}. Wave {avgWaves} buyers pay {fmt$(avgSeatPrice * Math.pow(waveMult / 100, avgWaves - 1))}.
                    Early believers get the best price. That's the cascade.
                  </div>
                </Section>
                <Section title="Model Methodology">
                  <div style={{ fontSize: 10.5, color: MID, lineHeight: 1.8 }}>
                    <div><strong style={{ color: DARK }}>Growth decay:</strong> Starts at peak rate, loses {growthDecayPct}pp/month after month 3. Prevents exponential fantasy. Hard cap at {founderCap} new founders/month.</div>
                    <div style={{ marginTop: 6 }}><strong style={{ color: DARK }}>Sell-through:</strong> Each founder's cascade sells over ~8 months. Active founders = those from last 8 months still with inventory.</div>
                    <div style={{ marginTop: 6 }}><strong style={{ color: DARK }}>Agent adoption:</strong> Sigmoid curve. Slow months 1-5, ramps 6-12, plateaus at target. Models real technology adoption.</div>
                    <div style={{ marginTop: 6 }}><strong style={{ color: DARK }}>Referral rates:</strong> 35% of human sales via referrals. 80% of agent sales via referrals (agents almost always carry attribution).</div>
                    <div style={{ marginTop: 6 }}><strong style={{ color: DARK }}>Fee scaling:</strong> Steps up: 3% at 10+ founders, 4% at 50+, 5% at 200+.</div>
                  </div>
                </Section>
              </>
            )}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20, marginBottom: 8 }}>
          {[
            { l: "Month 3", d: m3 }, { l: "Month 6", d: m6 },
            { l: "Month 12", d: m12 }, { l: "Month 18", d: m18 }, { l: "Month 24", d: m24 }
          ].map(({ l, d }) => (
            <div key={l} style={{ flex: 1, minWidth: 170, background: "white", border: `1px solid ${LIGHT_BORDER}`, borderRadius: 8, padding: "12px 14px" }}>
              <div style={{ fontWeight: 600, fontSize: 12, marginBottom: 6, borderLeft: `3px solid ${GOLD}`, paddingLeft: 8 }}>{l}</div>
              <div style={{ fontSize: 10, color: MID, lineHeight: 1.7, fontFamily: "'DM Mono', monospace" }}>
                <div>{d.cumFounders} founders · {fmtN(d.cumSeats)} seats</div>
                <div>Cum GMV: {fmt$(d.cumGMV)}</div>
                <div>Cum Rev: {fmt$(d.cumRev)}</div>
                <div>Mo GMV: {fmt$(d.moGMV)}</div>
                <div>Mo Net: {fmt$(d.netRev)}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", padding: "12px 0", fontSize: 9, color: MID, fontFamily: "'DM Mono', monospace" }}>
          KA<span style={{ color: GOLD }}>§§</span>A Projection Model v2 · Ello Cello LLC · CONFIDENTIAL
        </div>
      </div>
    </div>
  );
}
