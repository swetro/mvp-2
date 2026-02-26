import React, { useState, useEffect } from "react";

// --- BRAND COLORS ---
const S = {
  neon:         "#CAFF00",
  cobalt:       "#0054FF",
  cobaltA:      "#0054FF66",
  neonA:        "#CAFF0055",
  bg:           "#111214",
  surface:      "#1A1C1F",
  surfaceAlt:   "#222427",
  border:       "#2A2D32",
  borderBright: "#3A3D44",
  text:         "#FFFFFF",
  muted:        "#9CA3AF",
  dim:          "#6B7280",
  danger:       "#FF4444",
  warning:      "#FFB800",
};

const FONT_BODY = "Poppins, sans-serif";
const FONT_NUM  = "'Barlow Condensed', sans-serif";

// --- DATA ---
const ACTIVITIES = [{"date":"2025-11-02","name":"Ricaurte Corrida","dist_km":8.77,"duration_min":70.8,"pace":"8:03","pace_raw":8.066,"hr":144,"kcal":673,"elevation":24.0,"points":13,"effort":null,"heart_eff":0.01435},{"date":"2025-11-05","name":"La Calera Corrida","dist_km":15.01,"duration_min":119.7,"pace":"7:58","pace_raw":7.973,"hr":141,"kcal":1145,"elevation":77.0,"points":23,"effort":null,"heart_eff":0.01482},{"date":"2025-11-07","name":"La Calera Corrida","dist_km":10.01,"duration_min":75.4,"pace":"7:31","pace_raw":7.528,"hr":143,"kcal":789,"elevation":77.0,"points":15,"effort":null,"heart_eff":0.01548},{"date":"2025-11-09","name":"La Calera Corrida","dist_km":10.02,"duration_min":72.8,"pace":"7:15","pace_raw":7.266,"hr":140,"kcal":786,"elevation":116.0,"points":14,"effort":null,"heart_eff":0.01639},{"date":"2025-11-11","name":"La Calera Corrida","dist_km":21.12,"duration_min":165.6,"pace":"7:50","pace_raw":7.837,"hr":145,"kcal":1632,"elevation":269.0,"points":32,"effort":null,"heart_eff":0.01467},{"date":"2025-11-13","name":"La Calera Corrida","dist_km":10.0,"duration_min":78.1,"pace":"7:48","pace_raw":7.809,"hr":141,"kcal":775,"elevation":59.0,"points":15,"effort":null,"heart_eff":0.01513},{"date":"2025-11-17","name":"La Calera Corrida","dist_km":13.01,"duration_min":100.2,"pace":"7:42","pace_raw":7.7,"hr":143,"kcal":1016,"elevation":163.0,"points":19,"effort":10.14,"heart_eff":0.01514},{"date":"2025-11-18","name":"La Calera Corrida","dist_km":11.01,"duration_min":81.5,"pace":"7:24","pace_raw":7.403,"hr":136,"kcal":847,"elevation":84.0,"points":16,"effort":10.39,"heart_eff":0.01655},{"date":"2025-11-20","name":"La Calera Corrida","dist_km":6.06,"duration_min":45.0,"pace":"7:25","pace_raw":7.424,"hr":144,"kcal":483,"elevation":42.0,"points":9,"effort":10.73,"heart_eff":0.01559},{"date":"2025-11-22","name":"La Calera Corrida","dist_km":10.01,"duration_min":61.5,"pace":"6:08","pace_raw":6.144,"hr":162,"kcal":802,"elevation":79.0,"points":13,"effort":13.04,"heart_eff":0.01675},{"date":"2025-11-25","name":"La Calera Corrida","dist_km":5.01,"duration_min":28.9,"pace":"5:46","pace_raw":5.767,"hr":160,"kcal":387,"elevation":36.0,"points":6,"effort":13.39,"heart_eff":0.01806},{"date":"2025-11-30","name":"Bogota, D.C. - 32K","dist_km":32.28,"duration_min":216.1,"pace":"6:41","pace_raw":6.697,"hr":168,"kcal":2749,"elevation":130.0,"points":44,"effort":12.72,"heart_eff":0.01482},{"date":"2025-12-04","name":"La Calera Corrida","dist_km":2.31,"duration_min":16.5,"pace":"7:08","pace_raw":7.145,"hr":139,"kcal":181,"elevation":10.0,"points":3,"effort":10.96,"heart_eff":0.01679},{"date":"2025-12-12","name":"La Calera Corrida","dist_km":2.15,"duration_min":15.4,"pace":"7:10","pace_raw":7.168,"hr":134,"kcal":169,"elevation":26.0,"points":3,"effort":10.99,"heart_eff":0.01735},{"date":"2025-12-13","name":"La Calera Corrida","dist_km":4.43,"duration_min":32.1,"pace":"7:14","pace_raw":7.245,"hr":139,"kcal":347,"elevation":23.0,"points":6,"effort":10.81,"heart_eff":0.01655},{"date":"2025-12-15","name":"La Calera Corrida","dist_km":2.0,"duration_min":13.8,"pace":"6:54","pace_raw":6.91,"hr":133,"kcal":156,"elevation":22.0,"points":3,"effort":11.28,"heart_eff":0.01813},{"date":"2025-12-16","name":"La Calera Corrida","dist_km":3.01,"duration_min":21.7,"pace":"7:12","pace_raw":7.214,"hr":151,"kcal":244,"elevation":17.0,"points":4,"effort":11.24,"heart_eff":0.0153},{"date":"2025-12-20","name":"La Calera Corrida","dist_km":4.0,"duration_min":28.4,"pace":"7:05","pace_raw":7.091,"hr":143,"kcal":317,"elevation":38.0,"points":6,"effort":11.17,"heart_eff":0.01644},{"date":"2025-12-22","name":"La Calera Corrida","dist_km":3.47,"duration_min":25.0,"pace":"7:11","pace_raw":7.198,"hr":142,"kcal":271,"elevation":18.0,"points":5,"effort":10.84,"heart_eff":0.0163},{"date":"2025-12-24","name":"Pozuelo de Alarcon Corrida","dist_km":6.85,"duration_min":45.0,"pace":"6:33","pace_raw":6.562,"hr":145,"kcal":531,"elevation":91.0,"points":9,"effort":11.8,"heart_eff":0.01751},{"date":"2025-12-28","name":"Uppsala Corrida","dist_km":4.36,"duration_min":30.0,"pace":"6:52","pace_raw":6.874,"hr":143,"kcal":350,"elevation":65.0,"points":6,"effort":11.67,"heart_eff":0.01695},{"date":"2026-01-04","name":"Pozuelo de Alarcon Corrida","dist_km":7.23,"duration_min":50.0,"pace":"6:55","pace_raw":6.92,"hr":138,"kcal":567,"elevation":63.0,"points":10,"effort":11.34,"heart_eff":0.01745},{"date":"2026-01-06","name":"Pozuelo de Alarcon Corrida","dist_km":6.85,"duration_min":47.2,"pace":"6:53","pace_raw":6.889,"hr":146,"kcal":558,"elevation":87.0,"points":10,"effort":11.83,"heart_eff":0.01658},{"date":"2026-01-13","name":"La Calera Corrida","dist_km":7.01,"duration_min":48.8,"pace":"6:57","pace_raw":6.952,"hr":153,"kcal":573,"elevation":24.0,"points":10,"effort":11.75,"heart_eff":0.01567},{"date":"2026-01-16","name":"La Calera Corrida","dist_km":5.01,"duration_min":33.1,"pace":"6:36","pace_raw":6.601,"hr":132,"kcal":374,"elevation":17.0,"points":7,"effort":11.3,"heart_eff":0.01913},{"date":"2026-01-18","name":"La Calera Corrida","dist_km":12.0,"duration_min":85.3,"pace":"7:06","pace_raw":7.104,"hr":155,"kcal":975,"elevation":86.0,"points":17,"effort":11.43,"heart_eff":0.01514},{"date":"2026-01-20","name":"La Calera Corrida","dist_km":8.39,"duration_min":60.0,"pace":"7:09","pace_raw":7.151,"hr":147,"kcal":663,"elevation":42.0,"points":12,"effort":11.05,"heart_eff":0.01585},{"date":"2026-01-22","name":"La Calera Atletismo","dist_km":16.0,"duration_min":119.3,"pace":"7:27","pace_raw":7.455,"hr":149,"kcal":1255,"elevation":149.0,"points":23,"effort":10.52,"heart_eff":0.01501},{"date":"2026-01-25","name":"La Calera - 6X600","dist_km":5.01,"duration_min":34.6,"pace":"6:53","pace_raw":6.9,"hr":147,"kcal":388,"elevation":null,"points":7,"effort":11.22,"heart_eff":0.01644},{"date":"2026-01-27","name":"La Calera Running","dist_km":10.02,"duration_min":72.4,"pace":"7:13","pace_raw":7.223,"hr":153,"kcal":818,"elevation":null,"points":14,"effort":11.3,"heart_eff":0.01508},{"date":"2026-02-01","name":"La Calera Running","dist_km":5.01,"duration_min":28.4,"pace":"5:39","pace_raw":5.661,"hr":172,"kcal":398,"elevation":null,"points":6,"effort":14.02,"heart_eff":0.01712},{"date":"2026-01-30","name":"La Calera Running","dist_km":20.0,"duration_min":144.3,"pace":"7:12","pace_raw":7.215,"hr":154,"kcal":1575,"elevation":null,"points":28,"effort":10.91,"heart_eff":0.015},{"date":"2026-02-03","name":"La Calera - 6k","dist_km":6.0,"duration_min":43.7,"pace":"7:16","pace_raw":7.281,"hr":150,"kcal":492,"elevation":null,"points":9,"effort":11.25,"heart_eff":0.01526},{"date":"2026-02-05","name":"La Calera - 24k","dist_km":24.01,"duration_min":176.6,"pace":"7:21","pace_raw":7.355,"hr":153,"kcal":1898,"elevation":null,"points":34,"effort":10.75,"heart_eff":0.01481},{"date":"2026-02-08","name":"La Calera - 5 X 1000","dist_km":0.81,"duration_min":5.2,"pace":"6:23","pace_raw":6.399,"hr":156,"kcal":63,"elevation":null,"points":1,"effort":12.19,"heart_eff":0.01669},{"date":"2026-02-10","name":"La Calera - 10k","dist_km":10.76,"duration_min":94.9,"pace":"8:49","pace_raw":8.819,"hr":140,"kcal":867,"elevation":null,"points":17,"effort":9.14,"heart_eff":0.0135},{"date":"2026-02-12","name":"La Calera - 28k","dist_km":28.01,"duration_min":204.1,"pace":"7:17","pace_raw":7.288,"hr":162,"kcal":2272,"elevation":null,"points":40,"effort":11.13,"heart_eff":0.01412},{"date":"2026-02-15","name":"La Calera - 7k Tempo","dist_km":7.01,"duration_min":40.7,"pace":"5:48","pace_raw":5.808,"hr":159,"kcal":545,"elevation":null,"points":9,"effort":13.39,"heart_eff":0.01805},{"date":"2026-02-17","name":"La Calera - 10k","dist_km":12.0,"duration_min":92.3,"pace":"7:41","pace_raw":7.689,"hr":149,"kcal":944,"elevation":null,"points":18,"effort":10.23,"heart_eff":0.01455},{"date":"2026-02-19","name":"La Calera - 30k","dist_km":30.01,"duration_min":223.4,"pace":"7:26","pace_raw":7.445,"hr":155,"kcal":2372,"elevation":null,"points":43,"effort":10.62,"heart_eff":0.01445},{"date":"2026-02-21","name":"La Calera - 5 X 1200","dist_km":7.49,"duration_min":48.9,"pace":"6:31","pace_raw":6.527,"hr":154,"kcal":593,"elevation":null,"points":10,"effort":12.14,"heart_eff":0.01658}];

const WEEKLY = [{"week":"2025-10-27/2025-11-02","total_km":8.8,"sessions":1,"avg_hr":144.0,"total_kcal":673,"avg_pace":8.066},{"week":"2025-11-03/2025-11-09","total_km":35.0,"sessions":3,"avg_hr":141.3,"total_kcal":2720,"avg_pace":7.589},{"week":"2025-11-10/2025-11-16","total_km":31.1,"sessions":2,"avg_hr":143.0,"total_kcal":2407,"avg_pace":7.823},{"week":"2025-11-17/2025-11-23","total_km":40.1,"sessions":4,"avg_hr":146.2,"total_kcal":3148,"avg_pace":7.168},{"week":"2025-11-24/2025-11-30","total_km":37.3,"sessions":2,"avg_hr":164.0,"total_kcal":3136,"avg_pace":6.232},{"week":"2025-12-01/2025-12-07","total_km":2.3,"sessions":1,"avg_hr":139.0,"total_kcal":181,"avg_pace":7.145},{"week":"2025-12-08/2025-12-14","total_km":6.6,"sessions":2,"avg_hr":136.5,"total_kcal":516,"avg_pace":7.207},{"week":"2025-12-15/2025-12-21","total_km":9.0,"sessions":3,"avg_hr":142.3,"total_kcal":717,"avg_pace":7.072},{"week":"2025-12-22/2025-12-28","total_km":14.7,"sessions":3,"avg_hr":143.3,"total_kcal":1152,"avg_pace":6.878},{"week":"2025-12-29/2026-01-04","total_km":7.2,"sessions":1,"avg_hr":138.0,"total_kcal":567,"avg_pace":6.92},{"week":"2026-01-05/2026-01-11","total_km":6.8,"sessions":1,"avg_hr":146.0,"total_kcal":558,"avg_pace":6.889},{"week":"2026-01-12/2026-01-18","total_km":24.0,"sessions":3,"avg_hr":146.7,"total_kcal":1922,"avg_pace":6.886},{"week":"2026-01-19/2026-01-25","total_km":29.4,"sessions":3,"avg_hr":147.7,"total_kcal":2306,"avg_pace":7.169},{"week":"2026-01-26/2026-02-01","total_km":35.0,"sessions":3,"avg_hr":159.7,"total_kcal":2791,"avg_pace":6.7},{"week":"2026-02-02/2026-02-08","total_km":30.8,"sessions":3,"avg_hr":153.0,"total_kcal":2453,"avg_pace":7.012},{"week":"2026-02-09/2026-02-15","total_km":45.8,"sessions":3,"avg_hr":153.7,"total_kcal":3684,"avg_pace":7.305},{"week":"2026-02-16/2026-02-22","total_km":49.5,"sessions":3,"avg_hr":152.7,"total_kcal":3909,"avg_pace":7.22}];

const RECENT       = ACTIVITIES[ACTIVITIES.length - 1];
const MARATHON_DATE = new Date("2026-03-16");
const totalKm      = ACTIVITIES.reduce((s,a) => s + a.dist_km, 0).toFixed(1);
const totalKcal    = ACTIVITIES.reduce((s,a) => s + a.kcal,    0);
const avgPaceAll   = (ACTIVITIES.reduce((s,a) => s + a.pace_raw, 0) / ACTIVITIES.length).toFixed(2);
const avgHR        = Math.round(ACTIVITIES.reduce((s,a) => s + a.hr, 0) / ACTIVITIES.length);
const longestRun   = Math.max(...ACTIVITIES.map(a => a.dist_km));
const lastWeekKm   = WEEKLY[WEEKLY.length - 1].total_km;
const prevWeekKm   = WEEKLY[WEEKLY.length - 2].total_km;
const prev4Weeks   = WEEKLY.slice(-5, -1).map(w => w.total_km);
const chronicLoad  = prev4Weeks.reduce((s,v) => s + v, 0) / 4;
const acwr         = parseFloat((lastWeekKm / chronicLoad).toFixed(2));
const weeklyIncrease = parseFloat((((lastWeekKm - prevWeekKm) / prevWeekKm) * 100).toFixed(1));
const last4HR      = ACTIVITIES.slice(-4).map(a => a.hr);
const hrVariance   = Math.max(...last4HR) - Math.min(...last4HR);
const last4wActs   = ACTIVITIES.slice(-12);
const hardSessions = last4wActs.filter(a => a.pace_raw < 6.5 || (a.effort && a.effort > 12.5));
const easyPct      = Math.round(((last4wActs.length - hardSessions.length) / last4wActs.length) * 100);
const acwrStatus   = acwr > 1.5 ? "high" : acwr > 1.3 ? "medium" : "low";
const riskColor    = { low: "#CAFF00", medium: "#FFB800", high: "#FF4444" };
const riskLabel    = { low: "Zona segura", medium: "Zona de alerta", high: "Zona de riesgo" };

function daysUntilMarathon() {
  const today = new Date("2026-02-21");
  return Math.ceil((MARATHON_DATE - today) / (1000 * 60 * 60 * 24));
}

// --- SPARKLINE ---
function Spark({ data, color, h = 40 }) {
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg viewBox={`0 0 100 ${h}`} style={{ width: "100%", height: h }}>
      <defs>
        <linearGradient id={`sg${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={`0,${h} ${pts} 100,${h}`} fill={`url(#sg${color.replace("#","")})`} stroke="none" />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// --- BAR CHART ---
function Bars({ data, h = 80 }) {
  const max = Math.max(...data.map(d => d.v));
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: h }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end" }}>
            <div style={{
              width: "100%",
              background: i === data.length - 1 ? `linear-gradient(180deg,${S.neon},${S.cobalt})` : `${S.neon}28`,
              borderRadius: "3px 3px 0 0",
              height: `${(d.v / max) * 100}%`,
              transition: "height 0.6s ease",
              border: i === data.length - 1 ? `1px solid ${S.neon}66` : "none"
            }} title={`${d.l}: ${d.v}km`} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 3, marginTop: 5 }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, fontSize: 7, color: S.muted, textAlign: "center", overflow: "hidden", whiteSpace: "nowrap" }}>
            {d.l.split("/")[0].slice(5)}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- SCORE RING ---
function ScoreRing({ value, size = 120, label, color }) {
  const r = 46, circ = 2 * Math.PI * r;
  const pct = (value / 100) * circ;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="50" cy="50" r={r} fill="none" stroke={S.border} strokeWidth="6" />
        <circle cx="50" cy="50" r={r} fill="none" stroke={color || S.neon} strokeWidth="6"
          strokeDasharray={`${pct} ${circ}`} strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${color || S.neon}88)` }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: size > 100 ? 24 : 18, fontWeight: 900, color: color || S.neon, lineHeight: 1 }}>{value}</div>
        {label && <div style={{ fontSize: 8, color: S.muted, marginTop: 3, letterSpacing: ".08em" }}>{label}</div>}
      </div>
    </div>
  );
}

// --- PULSE ORB ---
function PulseOrb() {
  return (
    <div style={{ position: "relative", width: 12, height: 12, flexShrink: 0 }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: S.neon, animation: "pulseOrb 1.5s infinite" }} />
      <div style={{ position: "absolute", inset: -4, borderRadius: "50%", background: `${S.neon}22`, animation: "pulseOrb 1.5s infinite .3s" }} />
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function SwetroD() {
  const [analysis,   setAnalysis]   = useState(null);
  const [loading,    setLoading]    = useState(false);
  const [activeTab,  setActiveTab]  = useState("ai");
  const [dateRange,  setDateRange]  = useState("4w");
  const [isPro,      setIsPro]      = useState(false);
  const [aiPhase,    setAiPhase]    = useState("idle");
  const daysLeft = daysUntilMarathon();

  const scoreColor  = s => s >= 80 ? S.neon : s >= 60 ? "#FFB800" : "#FF4444";
  const statusColor = { green: S.neon, yellow: "#FFB800", red: "#FF4444" };
  const trendIcon   = { up: "^", down: "v", stable: "-" };

  const TAPER = [
    { week: "Feb 23 - Mar 1",  label: "REDUCCION ACTIVA",  km: "32-36", intensity: "Moderada",  sessions: 3, focus: "Ultimo rodaje largo 18-20km. Reducir 30% volumen. Mantener strides.", color: S.neon },
    { week: "Mar 2 - Mar 9",   label: "TAPER PROFUNDO",    km: "20-25", intensity: "Baja-Media", sessions: 3, focus: "Rodajes cortos. Dos sesiones de aceleraciones. Sueno y nutricion.",   color: S.cobalt },
    { week: "Mar 10 - Mar 15", label: "SEMANA DE CARRERA", km: "10-15", intensity: "Muy baja",   sessions: 2, focus: "Rodajes suaves 20-30min. Activacion 3km el sabado. Carbo-loading.",  color: "#FFB800" },
  ];

  useEffect(() => { if (isPro) fetchAnalysis(); }, [isPro]);

  async function fetchAnalysis() {
    if (analysis) return;
    setLoading(true);
    setAiPhase("thinking");
    const prompt = `Eres el motor de inteligencia deportiva de Swetro. El atleta Calderon se prepara para la Maraton de Seoul el 16 de marzo de 2026 (faltan ${daysLeft} dias).

Ultima sesion: "${RECENT.name}" - ${RECENT.date}
Distancia: ${RECENT.dist_km}km | Ritmo: ${RECENT.pace}/km | FC: ${RECENT.hr}bpm | Esfuerzo: ${RECENT.effort}
Contexto: ${totalKm}km totales (41 sesiones), ACWR: ${acwr}x (${riskLabel[acwrStatus]}), FC prom: ${avgHR}bpm

Responde SOLO con JSON valido (sin markdown):
{
  "score": <1-100>,
  "headline": "<frase impactante max 7 palabras>",
  "subheadline": "<contexto en 12 palabras>",
  "readiness": <0-100>,
  "projectedTime": "<hh:mm estimado maraton>",
  "projectedPace": "<ritmo estimado /km>",
  "aiVerdict": "<parrafo de 3 oraciones>",
  "strengths": ["<s1>","<s2>","<s3>"],
  "warnings": ["<w1>","<w2>"],
  "keyMetrics": [{"label":"<metrica>","value":"<val>","trend":"<up|down|stable>","status":"<green|yellow|red>","note":"<que significa>"}],
  "weekPlan": [{"day":"<Lun/Mar/Mie/Jue/Vie/Sab/Dom>","type":"<Descanso|Facil|Tempo|Intervalos|Largo>","km":"<km o ->","notes":"<breve>"}],
  "injuryRisk": {"level":"<low|medium|high>","score":<0-100>,"topRisk":"<zona corporal>","action":"<accion inmediata>"},
  "funFact": "<dato curioso motivador>",
  "seoulTip": "<tip especifico para la maraton de Seoul>"
}`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1200,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || "";
      setAiPhase("done");
      setLoading(false);
      try {
        const m = text.match(/\{[\s\S]*\}/);
        if (m) setAnalysis(JSON.parse(m[0]));
      } catch(e) {}
    } catch(e) {
      setAiPhase("idle");
      setLoading(false);
    }
  }

  // ---- CSS ----
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;900&family=Barlow+Condensed:wght@700;800;900&display=swap');
    @keyframes spin     { to { transform: rotate(360deg) } }
    @keyframes fadeUp   { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }
    @keyframes pulseOrb { 0%,100% { opacity:1; transform:scale(1) } 50% { opacity:.4; transform:scale(1.4) } }
    @keyframes glow     { 0%,100% { box-shadow:0 0 20px ${S.neonA} } 50% { box-shadow:0 0 40px ${S.neonA},0 0 60px ${S.cobaltA} } }
    @keyframes shimmer  { 0% { background-position:-200% 0 } 100% { background-position:200% 0 } }
    * { box-sizing:border-box; margin:0; padding:0 }
    ::-webkit-scrollbar { width:3px }
    ::-webkit-scrollbar-track { background:${S.bg} }
    ::-webkit-scrollbar-thumb { background:${S.cobalt}44; border-radius:2px }
    button { font-family:'Poppins',sans-serif; cursor:pointer }
    .card { background:${S.surface}; border:1px solid ${S.border}; border-radius:14px; padding:20px }
    .tab-btn { padding:12px 18px; background:none; border:none; border-bottom:2px solid transparent; font-size:11px; letter-spacing:.06em; font-weight:600; transition:all .2s; white-space:nowrap; color:${S.muted}; font-family:'Poppins',sans-serif }
    .tab-btn.active-tab { color:${S.neon}; border-bottom-color:${S.neon} }
    .tab-btn:hover:not(.active-tab) { color:${S.text} }
    .shimmer { background:linear-gradient(90deg,${S.surface} 0%,${S.surfaceAlt} 50%,${S.surface} 100%); background-size:200% 100%; animation:shimmer 1.5s infinite }
  `;

  // ================================================================
  // RENDER
  // ================================================================
  return (
    <div style={{ minHeight: "100vh", background: S.bg, fontFamily: FONT_BODY, color: S.text }}>
      <style>{css}</style>

      {/* ---- TOPBAR ---- */}
      <div style={{ background: S.bg, borderBottom: `1px solid ${S.border}`, padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 20, height: 56 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontFamily: FONT_NUM, fontSize: 26, fontWeight: 900, color: S.neon, letterSpacing: ".08em", lineHeight: 1 }}>SWETRO</span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: S.surface, border: `1px solid ${S.border}`, borderRadius: 20, padding: "5px 12px" }}>
            {aiPhase === "done" ? <PulseOrb /> : <div style={{ width: 7, height: 7, borderRadius: "50%", background: aiPhase === "thinking" ? S.warning : S.muted }} />}
            <span style={{ fontSize: 11, fontWeight: 500, color: aiPhase === "done" ? S.neon : aiPhase === "thinking" ? S.warning : S.muted }}>
              {aiPhase === "done" ? "IA activa" : aiPhase === "thinking" ? "Analizando..." : "IA standby"}
            </span>
          </div>
          <div style={{ background: S.neon, borderRadius: 20, padding: "5px 14px", fontSize: 12, fontWeight: 700, color: S.bg, fontFamily: FONT_NUM, letterSpacing: ".06em" }}>
            {daysLeft}D . SEUL
          </div>
          <button
            onClick={() => setIsPro(p => !p)}
            style={{ background: isPro ? `${S.neon}18` : S.surface, border: `1px solid ${isPro ? S.neon : S.border}`, borderRadius: 20, padding: "5px 14px", fontSize: 11, fontWeight: 600, color: isPro ? S.neon : S.muted, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
          >
            {isPro ? "Pro ON" : "Free"} <span style={{ fontSize: 9, opacity: .6 }}>demo</span>
          </button>
        </div>
      </div>

      {/* ---- HERO STRIP ---- */}
      <div style={{ background: S.bg, borderBottom: `1px solid ${S.border}`, padding: "20px 24px 0" }}>
        <div style={{ marginBottom: 14 }}>

          {/* Row 1: Avatar + Countdown */}
          <div style={{ display: "flex", gap: 12, alignItems: "stretch", marginBottom: 10 }}>

            {/* Avatar */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1, background: S.surface, border: `1px solid ${S.border}`, borderRadius: 12, padding: "12px 16px" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg,${S.cobalt}44,${S.neon}22)`, border: `2px solid ${S.neonA}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, flexShrink: 0 }}>
                🏃
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: FONT_NUM, fontSize: 22, fontWeight: 900, color: S.text, letterSpacing: ".04em", lineHeight: 1 }}>JOSE GUILLERMO CALDERON</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 5 }}>
                  <span style={{ fontSize: 12, color: S.muted }}>Hombre</span>
                  <span style={{ fontSize: 12, color: S.border }}>.</span>
                  <span style={{ fontSize: 12, color: S.muted }}>39 anos</span>
                  <span style={{ fontSize: 12, color: S.border }}>.</span>
                  <span style={{ fontSize: 16 }} title="Colombia">🇨🇴</span>
                </div>
                <div style={{ display: "flex", gap: 6, marginTop: 7, flexWrap: "wrap" }}>
                  {[
                    { dist: "10K",  mark: "48:32",   color: "#7EB8FF" },
                    { dist: "21K",  mark: "1:52:14",  color: S.neon },
                    { dist: "42K",  mark: "4:05:00",  color: "#FFB800" },
                  ].map(({ dist, mark, color }) => (
                    <div key={dist} style={{ display: "flex", alignItems: "center", gap: 4, background: `${color}10`, border: `1px solid ${color}33`, borderRadius: 20, padding: "3px 10px" }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color }}>{dist}</span>
                      <span style={{ fontSize: 8, color: S.dim }}>.</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color, fontFamily: FONT_NUM }}>{mark}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Countdown */}
            <div style={{ background: `linear-gradient(135deg,${S.neon}0D,${S.cobalt}18)`, border: `1px solid ${S.neonA}`, borderRadius: 12, padding: "16px 24px", textAlign: "center", flex: "0 0 180px", animation: "glow 3s infinite", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontSize: 10, color: S.neon, fontWeight: 600, letterSpacing: ".04em", marginBottom: 4 }}>Maraton Seoul</div>
              <div style={{ fontFamily: FONT_NUM, fontSize: 72, fontWeight: 900, color: S.neon, lineHeight: 1, textShadow: `0 0 32px ${S.neon}88` }}>{daysLeft}</div>
              <div style={{ fontSize: 13, color: S.text, fontWeight: 500, marginTop: 2 }}>dias restantes</div>
              <div style={{ height: 3, background: S.border, borderRadius: 2, marginTop: 10 }}>
                <div style={{ width: `${Math.round(((90 - daysLeft) / 90) * 100)}%`, height: "100%", background: `linear-gradient(90deg,${S.neon},${S.cobalt})`, borderRadius: 2 }} />
              </div>
              <div style={{ fontSize: 10, color: S.muted, marginTop: 4 }}>16 MAR 2026</div>
            </div>
          </div>

          {/* Row 2: 6 stat pills */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 8 }}>
            {[
              { l: "KM total",      v: totalKm,                           u: "km",   color: S.neon, hero: true },
              { l: "Sesiones",      v: "41",                              u: "",     color: S.text, hero: false },
              { l: "Mayor distancia", v: longestRun,                      u: "km",   color: S.text, hero: false },
              { l: "Calorias",      v: `${(totalKcal/1000).toFixed(1)}k`, u: "kcal", color: S.text, hero: false },
              { l: "Ritmo prom.",   v: avgPaceAll,                        u: "/km",  color: S.text, hero: false },
              { l: "FC promedio",   v: avgHR,                             u: "bpm",  color: S.text, hero: false },
            ].map((s, i) => (
              <div key={i} style={{ background: s.hero ? `${S.neon}0A` : S.surface, border: `1px solid ${s.hero ? S.neonA : S.border}`, borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 10, color: S.muted, fontWeight: 500, marginBottom: 3 }}>{s.l}</div>
                <div style={{ fontFamily: FONT_NUM, fontSize: s.hero ? 26 : 20, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: 10, color: S.muted, marginTop: 2 }}>{s.u}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Date filter */}
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 14 }}>
          <span style={{ fontSize: 11, color: S.muted, fontWeight: 500, marginRight: 4 }}>Periodo</span>
          {[["4w","4 semanas"],["8w","8 semanas"],["12w","12 semanas"],["custom","Personalizado"]].map(([id,label]) => (
            <button key={id} onClick={() => setDateRange(id)} style={{ background: dateRange === id ? S.neon : "transparent", color: dateRange === id ? S.bg : S.muted, border: `1px solid ${dateRange === id ? S.neon : S.border}`, borderRadius: 6, padding: "4px 12px", fontSize: 11, fontWeight: dateRange === id ? 700 : 500, cursor: "pointer" }}>
              {label}
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, overflowX: "auto", borderTop: `1px solid ${S.border}`, marginTop: 4 }}>
          {[
            ["ai",       "IA ANALISIS"],
            ["overview", "RESUMEN"],
            ["activity", "ULTIMA SESION"],
            ["injury",   "PREVENCION"],
            ["history",  "HISTORIAL"],
          ].map(([id, label]) => (
            <button key={id} className={`tab-btn${activeTab === id ? " active-tab" : ""}`} onClick={() => setActiveTab(id)}
              style={{ color: activeTab === id ? (id === "injury" ? "#FF4444" : S.neon) : undefined, borderBottomColor: activeTab === id ? (id === "injury" ? "#FF4444" : S.neon) : undefined }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ---- MAIN CONTENT ---- */}
      <div style={{ padding: "24px", maxWidth: 1100, margin: "0 auto", minHeight: "calc(100vh - 200px)" }}>

        {/* ======================== AI TAB ======================== */}
        {activeTab === "ai" && (
          <div style={{ animation: "fadeUp .4s ease" }}>

            {/* FREE USER - full paywall */}
            {!isPro && (
              <div style={{ position: "relative", minHeight: 520 }}>
                {/* blurred preview */}
                <div style={{ filter: "blur(6px)", pointerEvents: "none", userSelect: "none", opacity: .7 }}>
                  <div style={{ background: `linear-gradient(135deg,${S.cobalt}18,${S.neon}08)`, border: `1px solid ${S.cobalt}44`, borderRadius: 16, padding: "28px", marginBottom: 16 }}>
                    <div style={{ fontFamily: FONT_NUM, fontSize: 48, fontWeight: 900, color: S.text, lineHeight: 1, marginBottom: 10 }}>Listo para tu proxima tirada larga</div>
                    <div style={{ fontSize: 14, color: S.muted, marginBottom: 24 }}>Ciclo solido . Pico de carga . {daysLeft} dias para Seoul</div>
                    <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
                      <ScoreRing value={78} size={100} label="FITNESS" color={S.neon} />
                      <ScoreRing value={62} size={100} label="READINESS" color="#7EB8FF" />
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <div style={{ fontSize: 11, color: S.muted, marginBottom: 4 }}>Tiempo proyectado</div>
                        <div style={{ fontFamily: FONT_NUM, fontSize: 40, fontWeight: 900, color: S.neon, lineHeight: 1 }}>3:58:00</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div style={{ background: S.surface, borderRadius: 14, height: 160 }} />
                    <div style={{ background: S.surface, borderRadius: 14, height: 160 }} />
                  </div>
                </div>

                {/* overlay CTA */}
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: `linear-gradient(180deg,${S.bg}00 0%,${S.bg}CC 40%,${S.bg} 100%)` }}>
                  <div style={{ textAlign: "center", padding: "32px", maxWidth: 420 }}>
                    <div style={{ width: 56, height: 56, borderRadius: "50%", background: `${S.neon}15`, border: `1px solid ${S.neonA}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 20px" }}>🔒</div>
                    <div style={{ fontFamily: FONT_NUM, fontSize: 36, fontWeight: 900, color: S.text, marginBottom: 10, lineHeight: 1.1 }}>Analisis IA completo</div>
                    <div style={{ fontSize: 14, color: S.muted, lineHeight: 1.7, marginBottom: 28 }}>Score de fitness, tiempo proyectado en Seoul, plan semanal personalizado y alertas de lesion.</div>
                    <button onClick={() => setIsPro(true)} style={{ background: `linear-gradient(135deg,${S.neon},${S.cobalt})`, border: "none", borderRadius: 12, padding: "14px 0", fontSize: 15, fontWeight: 700, color: S.bg, cursor: "pointer", width: "100%", marginBottom: 12, boxShadow: `0 4px 28px ${S.neon}44`, fontFamily: FONT_BODY }}>
                      Activar Swetro Pro
                    </button>
                    <div style={{ fontSize: 11, color: S.muted }}>7 dias gratis . Sin compromiso</div>
                  </div>
                </div>
              </div>
            )}

            {/* PRO USER */}
            {isPro && (
              <div>
                {/* Loading */}
                {loading && (
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, padding: "24px", background: `${S.cobalt}0D`, border: `1px solid ${S.cobalt}33`, borderRadius: 14 }}>
                      <div style={{ width: 40, height: 40, border: `2px solid ${S.border}`, borderTop: `2px solid ${S.neon}`, borderRadius: "50%", animation: "spin 1s linear infinite", flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 14, color: S.neon, fontWeight: 700, marginBottom: 6 }}>Swetro IA analizando tu entrenamiento...</div>
                        <div style={{ fontSize: 12, color: S.muted }}>Procesando 41 sesiones . 3 meses de datos</div>
                      </div>
                    </div>
                    {[1,2,3].map(i => <div key={i} style={{ height: 80, borderRadius: 12, marginBottom: 12 }} className="shimmer" />)}
                  </div>
                )}

                {/* Placeholder - shown when loaded but no analysis yet (edge case) */}
                {!loading && !analysis && (
                  <div style={{ background: `linear-gradient(135deg,${S.cobalt}18,${S.neon}08)`, border: `1px solid ${S.cobalt}44`, borderRadius: 16, padding: "28px" }}>
                    <div style={{ fontFamily: FONT_NUM, fontSize: 48, fontWeight: 900, color: S.text, lineHeight: 1, marginBottom: 10 }}>Analizando tu ciclo...</div>
                    <div style={{ fontSize: 14, color: S.muted }}>{daysLeft} dias para Seoul. Conectando con IA...</div>
                  </div>
                )}

                {/* Full analysis */}
                {analysis && (
                  <div style={{ animation: "fadeUp .4s ease" }}>

                    {/* Hero verdict */}
                    <div style={{ background: `linear-gradient(135deg,${S.cobalt}18,${S.neon}08)`, border: `1px solid ${S.cobaltA}`, borderRadius: 16, padding: "28px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: `${S.neon}06`, pointerEvents: "none" }} />
                      <div style={{ position: "absolute", bottom: -60, left: -20, width: 160, height: 160, borderRadius: "50%", background: `${S.cobalt}0A`, pointerEvents: "none" }} />
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
                        <PulseOrb />
                        <span style={{ fontSize: 10, color: S.neon, letterSpacing: ".06em", fontWeight: 700 }}>SWETRO IA . ANALISIS COMPLETO</span>
                      </div>
                      <div style={{ fontFamily: FONT_NUM, fontSize: 48, fontWeight: 900, color: S.text, letterSpacing: ".01em", marginBottom: 8, lineHeight: 1, maxWidth: 700 }}>{analysis.headline}</div>
                      <div style={{ fontSize: 14, color: S.muted, fontWeight: 400, marginBottom: 24, lineHeight: 1.5 }}>{analysis.subheadline}</div>
                      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center", marginBottom: 24 }}>
                        <ScoreRing value={analysis.score} size={120} label="SCORE SESION" color={scoreColor(analysis.score)} />
                        <ScoreRing value={analysis.readiness} size={120} label="MARATHON READY" color={scoreColor(analysis.readiness)} />
                        <div style={{ flex: 1, minWidth: 220 }}>
                          <div style={{ marginBottom: 16 }}>
                            <div style={{ fontSize: 10, color: S.muted, letterSpacing: ".04em", marginBottom: 4 }}>TIEMPO PROYECTADO</div>
                            <div style={{ fontFamily: FONT_NUM, fontSize: 44, fontWeight: 900, color: "#5599FF", lineHeight: 1 }}>{analysis.projectedTime}</div>
                            {analysis.projectedPace && <div style={{ fontSize: 11, color: S.muted, marginTop: 4 }}>{analysis.projectedPace}/km promedio</div>}
                          </div>
                          <div style={{ height: 6, background: S.border, borderRadius: 3, overflow: "hidden" }}>
                            <div style={{ width: `${analysis.readiness}%`, height: "100%", background: `linear-gradient(90deg,${S.cobalt},${S.neon})`, borderRadius: 3, transition: "width 1.5s ease" }} />
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 9, color: S.muted }}>
                            <span>0%</span>
                            <span style={{ color: S.neon }}>{analysis.readiness}% listo</span>
                            <span>100%</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ background: `${S.bg}88`, border: `1px solid ${S.border}`, borderRadius: 10, padding: "16px", borderLeft: `3px solid ${S.neon}` }}>
                        <div style={{ fontSize: 9, color: S.neon, letterSpacing: ".05em", marginBottom: 8 }}>VEREDICTO IA</div>
                        <div style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.7 }}>{analysis.aiVerdict}</div>
                      </div>
                    </div>

                    {/* Key metrics */}
                    {analysis.keyMetrics && (
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ fontSize: 9, color: S.muted, letterSpacing: ".06em", marginBottom: 12 }}>METRICAS CLAVE . EVALUACION IA</div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 10 }}>
                          {analysis.keyMetrics.map((m, i) => (
                            <div key={i} style={{ background: S.surface, border: `1px solid ${statusColor[m.status] || S.border}22`, borderTop: `2px solid ${statusColor[m.status] || S.neon}`, borderRadius: "0 0 10px 10px", padding: "14px" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                                <div style={{ fontSize: 9, color: S.muted, letterSpacing: ".08em" }}>{m.label}</div>
                                <span style={{ fontSize: 12, color: statusColor[m.status] || S.neon }}>{trendIcon[m.trend] || "-"}</span>
                              </div>
                              <div style={{ fontFamily: FONT_NUM, fontSize: 26, fontWeight: 800, color: statusColor[m.status] || S.neon }}>{m.value}</div>
                              <div style={{ fontSize: 10, color: S.muted, marginTop: 4, lineHeight: 1.4 }}>{m.note}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Strengths + warnings */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
                      <div style={{ background: S.surface, border: `1px solid ${S.neon}22`, borderRadius: 12, padding: "18px" }}>
                        <div style={{ fontSize: 9, color: S.neon, letterSpacing: ".06em", marginBottom: 12 }}>FORTALEZAS DETECTADAS</div>
                        {analysis.strengths?.map((s, i) => (
                          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                            <div style={{ width: 20, height: 20, background: `${S.neon}15`, border: `1px solid ${S.neonA}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: S.neon, fontWeight: 700, flexShrink: 0 }}>{i+1}</div>
                            <div style={{ fontSize: 12, color: "#94A3B8", lineHeight: 1.5 }}>{s}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ background: S.surface, border: `1px solid #FFB80022`, borderRadius: 12, padding: "18px" }}>
                        <div style={{ fontSize: 9, color: "#FFB800", letterSpacing: ".06em", marginBottom: 12 }}>ALERTAS IA</div>
                        {analysis.warnings?.map((w, i) => (
                          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                            <div style={{ width: 20, height: 20, background: "#FFB80015", border: "1px solid #FFB80044", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#FFB800", fontWeight: 700, flexShrink: 0 }}>!</div>
                            <div style={{ fontSize: 12, color: "#94A3B8", lineHeight: 1.5 }}>{w}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Week plan */}
                    {analysis.weekPlan && (
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ fontSize: 9, color: S.muted, letterSpacing: ".06em", marginBottom: 12 }}>PLAN SEMANAL RECOMENDADO . IA</div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 6 }}>
                          {analysis.weekPlan.map((d, i) => {
                            const tc = d.type === "Descanso" ? S.muted : d.type === "Facil" ? S.cobalt : d.type === "Largo" ? S.neon : d.type === "Tempo" ? "#FFB800" : "#FF8844";
                            return (
                              <div key={i} style={{ background: S.surface, border: `1px solid ${tc}33`, borderRadius: 10, padding: "12px 8px", textAlign: "center" }}>
                                <div style={{ fontSize: 9, color: S.muted, letterSpacing: ".08em", marginBottom: 4 }}>{d.day}</div>
                                <div style={{ fontSize: 10, fontWeight: 700, color: tc, marginBottom: 4, lineHeight: 1.2 }}>{d.type}</div>
                                <div style={{ fontFamily: FONT_NUM, fontSize: 18, fontWeight: 800, color: tc }}>{d.km}</div>
                                <div style={{ fontSize: 8, color: S.dim, marginTop: 4, lineHeight: 1.3 }}>{d.notes}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Fun fact + Seoul tip */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
                      <div style={{ background: `${S.neon}08`, border: `1px solid ${S.neonA}`, borderRadius: 12, padding: "16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <span style={{ fontSize: 22, flexShrink: 0 }}>💡</span>
                        <div>
                          <div style={{ fontSize: 9, color: S.neon, letterSpacing: ".05em", marginBottom: 6 }}>DATO CURIOSO</div>
                          <div style={{ fontSize: 12, color: "#94A3B8", lineHeight: 1.6 }}>{analysis.funFact}</div>
                        </div>
                      </div>
                      <div style={{ background: `${S.cobalt}11`, border: `1px solid ${S.cobalt}44`, borderRadius: 12, padding: "16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <span style={{ fontSize: 22, flexShrink: 0 }}>🇰🇷</span>
                        <div>
                          <div style={{ fontSize: 9, color: "#7EB8FF", letterSpacing: ".05em", marginBottom: 6 }}>TIP MARATON SEOUL</div>
                          <div style={{ fontSize: 12, color: "#94A3B8", lineHeight: 1.6 }}>{analysis.seoulTip}</div>
                        </div>
                      </div>
                    </div>

                    {/* Injury risk */}
                    {analysis.injuryRisk && (
                      <div style={{ background: S.surface, border: `1px solid ${riskColor[analysis.injuryRisk.level]}33`, borderRadius: 12, padding: "18px", display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
                        <div style={{ flex: "0 0 auto" }}>
                          <div style={{ fontSize: 9, color: S.muted, letterSpacing: ".05em", marginBottom: 6 }}>RIESGO DE LESION . IA</div>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <ScoreRing value={analysis.injuryRisk.score} size={80} color={riskColor[analysis.injuryRisk.level]} />
                            <div>
                              <div style={{ fontFamily: FONT_NUM, fontSize: 20, fontWeight: 800, color: riskColor[analysis.injuryRisk.level] }}>{(riskLabel[analysis.injuryRisk.level] || "").toUpperCase()}</div>
                              <div style={{ fontSize: 11, color: S.muted, marginTop: 4 }}>Zona: {analysis.injuryRisk.topRisk}</div>
                            </div>
                          </div>
                        </div>
                        <div style={{ flex: 1, minWidth: 200, background: `${S.bg}88`, borderLeft: `2px solid ${riskColor[analysis.injuryRisk.level]}`, borderRadius: "0 8px 8px 0", padding: "12px 16px" }}>
                          <div style={{ fontSize: 9, color: riskColor[analysis.injuryRisk.level], letterSpacing: ".04em", marginBottom: 6 }}>ACCION INMEDIATA</div>
                          <div style={{ fontSize: 12, color: "#94A3B8", lineHeight: 1.6 }}>{analysis.injuryRisk.action}</div>
                        </div>
                        <button onClick={() => setActiveTab("injury")} style={{ background: "transparent", border: `1px solid ${S.neonA}`, borderRadius: 8, padding: "8px 16px", color: S.neon, fontSize: 10, letterSpacing: ".04em" }}>
                          PLAN COMPLETO
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ======================== OVERVIEW TAB ======================== */}
        {activeTab === "overview" && (
          <div style={{ animation: "fadeUp .4s ease" }}>
            <div className="card" style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 11, color: S.muted, fontWeight: 500, marginBottom: 4 }}>Kilometros esta semana</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <span style={{ fontFamily: FONT_NUM, fontSize: 64, fontWeight: 900, color: S.neon, lineHeight: 1, textShadow: `0 0 24px ${S.neon}55` }}>{lastWeekKm}</span>
                    <span style={{ fontSize: 18, color: S.muted }}>km</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                    <span style={{ fontSize: 13, color: weeklyIncrease >= 0 ? S.neon : S.danger, fontWeight: 700 }}>{weeklyIncrease >= 0 ? "+" : ""}{weeklyIncrease}%</span>
                    <span style={{ fontSize: 12, color: S.muted }}>vs semana anterior . {prevWeekKm} km</span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 10, color: S.muted, marginBottom: 4 }}>Record del ciclo</div>
                  <div style={{ fontFamily: FONT_NUM, fontSize: 20, fontWeight: 700, color: S.text }}>{Math.max(...WEEKLY.map(w => w.total_km))} km</div>
                  <div style={{ fontSize: 10, color: S.muted, marginTop: 8 }}>17 semanas . Nov-Feb</div>
                </div>
              </div>
              <Bars data={WEEKLY.map(w => ({ v: w.total_km, l: w.week }))} h={100} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 16 }}>
              {[
                { label: "Ritmo prom. (min/km)", data: WEEKLY.map(w => w.avg_pace),    color: "#7EB8FF", curr: WEEKLY[WEEKLY.length-1].avg_pace.toFixed(2),             note: "Menor = mas rapido" },
                { label: "FC promedio (bpm)",    data: WEEKLY.map(w => w.avg_hr),      color: "#FFB800", curr: Math.round(WEEKLY[WEEKLY.length-1].avg_hr),               note: "Zona de trabajo" },
                { label: "Sesiones / semana",    data: WEEKLY.map(w => w.sessions),    color: S.neon,    curr: WEEKLY[WEEKLY.length-1].sessions,                         note: "Frecuencia semanal" },
              ].map((c, i) => (
                <div key={i} className="card">
                  <div style={{ fontSize: 9, color: S.muted, letterSpacing: ".08em", marginBottom: 4 }}>{c.label}</div>
                  <div style={{ fontFamily: FONT_NUM, fontSize: 28, fontWeight: 800, color: c.color, marginBottom: 2 }}>{c.curr}</div>
                  <div style={{ fontSize: 9, color: S.dim, marginBottom: 10 }}>{c.note}</div>
                  <Spark data={c.data} color={c.color} h={36} />
                </div>
              ))}
            </div>

            <div style={{ background: `${riskColor[acwrStatus]}08`, border: `1px solid ${riskColor[acwrStatus]}25`, borderRadius: 12, padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ fontSize: 9, color: S.muted, letterSpacing: ".06em", marginBottom: 4 }}>CARGA DE ENTRENAMIENTO</div>
                <div style={{ fontFamily: FONT_NUM, fontSize: 18, fontWeight: 700, color: riskColor[acwrStatus] }}>{riskLabel[acwrStatus]} - ACWR {acwr}x . +{weeklyIncrease}% vs semana anterior</div>
              </div>
              <button onClick={() => setActiveTab("injury")} style={{ background: "transparent", border: `1px solid ${riskColor[acwrStatus]}44`, borderRadius: 8, padding: "7px 16px", color: riskColor[acwrStatus], fontSize: 10, letterSpacing: ".04em" }}>
                VER ANALISIS
              </button>
            </div>
          </div>
        )}

        {/* ======================== ACTIVITY TAB ======================== */}
        {activeTab === "activity" && (() => {
          const isInt   = /\d+\s*[xXx]\s*\d/.test(RECENT.name);
          const isLong  = RECENT.dist_km >= 18;
          const isTempo = RECENT.pace_raw < 6.0;
          const typeLabel = isInt ? "INTERVALOS" : isLong ? "LARGO" : isTempo ? "TEMPO" : "RODAJE";
          const typeColor = isInt ? "#7EB8FF"    : isLong ? S.neon   : isTempo ? S.danger : "#9CA3AF";
          const avgPaceRaw = ACTIVITIES.reduce((s,a) => s + a.pace_raw, 0) / ACTIVITIES.length;
          const paceVsAvg  = parseFloat((avgPaceRaw - RECENT.pace_raw).toFixed(2));
          const hrVsAvg    = RECENT.hr - avgHR;
          return (
            <div style={{ animation: "fadeUp .4s ease" }}>
              <div className="card" style={{ marginBottom: 12, borderColor: `${typeColor}33`, background: `linear-gradient(135deg,${typeColor}06,${S.surface})` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: typeColor, background: `${typeColor}18`, border: `1px solid ${typeColor}44`, borderRadius: 20, padding: "3px 10px", letterSpacing: ".04em" }}>{typeLabel}</span>
                    <span style={{ fontSize: 11, color: S.muted }}>{RECENT.date}</span>
                  </div>
                  {analysis && <span style={{ fontSize: 11, color: S.muted }}>Score IA <strong style={{ color: scoreColor(analysis.score), fontFamily: FONT_NUM, fontSize: 16 }}>{analysis.score}</strong></span>}
                </div>
                <div style={{ fontFamily: FONT_NUM, fontSize: 18, fontWeight: 700, color: S.text, marginBottom: 16 }}>{RECENT.name}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                  <div style={{ background: S.bg, borderRadius: 12, padding: "16px 18px", borderLeft: `3px solid ${typeColor}` }}>
                    <div style={{ fontSize: 11, color: S.muted, marginBottom: 4 }}>Distancia</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                      <span style={{ fontFamily: FONT_NUM, fontSize: 64, fontWeight: 900, color: typeColor, lineHeight: 1 }}>{RECENT.dist_km}</span>
                      <span style={{ fontSize: 18, color: S.muted }}>km</span>
                    </div>
                    <div style={{ fontSize: 11, color: S.muted, marginTop: 6 }}>{Math.floor(RECENT.duration_min)}min {Math.round((RECENT.duration_min % 1) * 60)}seg</div>
                  </div>
                  <div style={{ background: S.bg, borderRadius: 12, padding: "16px 18px" }}>
                    <div style={{ fontSize: 11, color: S.muted, marginBottom: 4 }}>Ritmo promedio</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                      <span style={{ fontFamily: FONT_NUM, fontSize: 36, fontWeight: 800, color: S.text, lineHeight: 1 }}>{RECENT.pace}</span>
                      <span style={{ fontSize: 13, color: S.muted }}>/km</span>
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: paceVsAvg >= 0 ? S.neon : S.danger }}>
                      {paceVsAvg >= 0 ? `+${paceVsAvg.toFixed(2)} mas rapido` : `${Math.abs(paceVsAvg).toFixed(2)} mas lento`} que promedio
                    </div>
                  </div>
                  <div style={{ background: S.bg, borderRadius: 12, padding: "16px 18px" }}>
                    <div style={{ fontSize: 11, color: S.muted, marginBottom: 4 }}>FC promedio</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                      <span style={{ fontFamily: FONT_NUM, fontSize: 36, fontWeight: 800, color: S.warning, lineHeight: 1 }}>{RECENT.hr}</span>
                      <span style={{ fontSize: 13, color: S.muted }}>bpm</span>
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: hrVsAvg > 0 ? S.danger : S.neon }}>
                      {hrVsAvg > 0 ? "+" : ""}{hrVsAvg} bpm vs promedio
                    </div>
                  </div>
                </div>
              </div>

              {/* Tertiary metrics */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 12 }}>
                {[
                  { l: "Calorias",   v: `${RECENT.kcal}`,                                u: "kcal" },
                  { l: "Esfuerzo",   v: RECENT.effort?.toFixed(1) || "-",                u: "RPE" },
                  { l: "Elevacion",  v: RECENT.elevation != null ? `${RECENT.elevation}` : "-", u: "m" },
                ].map((m, i) => (
                  <div key={i} style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: 10, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: S.muted }}>{m.l}</span>
                    <span style={{ fontFamily: FONT_NUM, fontSize: 18, fontWeight: 700, color: S.text }}>{m.v} <span style={{ fontSize: 11, color: S.muted }}>{m.u}</span></span>
                  </div>
                ))}
              </div>

              {/* Narrative analysis - Pro feature */}
              <div style={{ position: "relative", borderRadius: 14, overflow: "hidden" }}>
                <div style={{ background: `linear-gradient(135deg,${S.neon}06,${S.cobalt}0A)`, border: `1px solid ${S.neonA}`, borderRadius: 14, padding: "20px 22px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <PulseOrb />
                    <span style={{ fontSize: 11, color: S.neon, fontWeight: 700, letterSpacing: ".04em" }}>SWETRO IA . ANALISIS DE SESION</span>
                  </div>
                  {[
                    "Jose Guillermo, completaste una sesion de intervalos exigente con un ritmo promedio de 6:31 min/km que demuestra excelente capacidad de recuperacion tras tu rodaje de 30k del miercoles.",
                    "Estos 5x1200m con una frecuencia cardiaca controlada en 154 bpm muestran que tus sistemas aerobico y anaerobico estan trabajando bien a tres semanas de Seoul.",
                    "El esfuerzo de 12.14 es significativo pero manejable considerando que ya llevas 49.5km esta semana. Con un ACWR en 1.36x estas en zona donde el riesgo de sobrecarga aumenta.",
                    "Considera hacer tu proximo rodaje en zona 1-2 muy suave. La capacidad de aguantar ritmo despues de acumular fatiga es exactamente lo que necesitaras en el km 35 de Seoul.",
                  ].map((p, i) => (
                    <p key={i} style={{ fontSize: 13, color: i === 3 ? S.text : S.muted, lineHeight: 1.7, margin: 0, marginBottom: i < 3 ? 12 : 0, fontWeight: i === 3 ? 500 : 400 }}>{p}</p>
                  ))}
                  <div style={{ marginTop: 16, padding: "12px 16px", background: `${S.bg}CC`, borderRadius: 10, borderLeft: `3px solid ${S.neon}`, display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>⚡</span>
                    <div>
                      <div style={{ fontSize: 11, color: S.neon, fontWeight: 700, marginBottom: 4 }}>Proximas 72 horas</div>
                      <div style={{ fontSize: 12, color: S.muted, lineHeight: 1.6 }}>Prioriza hidratacion profunda, proteina de calidad y sueno de al menos 7-8 horas.</div>
                    </div>
                  </div>
                </div>
                {/* Paywall overlay */}
                {!isPro && (
                  <div style={{ position: "absolute", inset: 0, borderRadius: 14, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", background: `${S.bg}77` }} />
                    <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "24px 28px", maxWidth: 360 }}>
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${S.neon}18`, border: `1px solid ${S.neonA}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, margin: "0 auto 14px" }}>🔒</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: S.text, marginBottom: 6 }}>Analisis de sesion . Pro</div>
                      <div style={{ fontSize: 12, color: S.muted, lineHeight: 1.6, marginBottom: 20 }}>Recibe feedback personalizado de cada entrenamiento con contexto de tu ciclo.</div>
                      <button onClick={() => setIsPro(true)} style={{ background: `linear-gradient(135deg,${S.neon},${S.cobalt})`, border: "none", borderRadius: 10, padding: "11px 28px", fontSize: 13, fontWeight: 700, color: S.bg, cursor: "pointer", width: "100%", boxShadow: `0 4px 20px ${S.neon}33`, fontFamily: FONT_BODY }}>
                        Activar Swetro Pro
                      </button>
                      <div style={{ fontSize: 10, color: S.dim, marginTop: 10 }}>7 dias gratis . Cancela cuando quieras</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* ======================== INJURY TAB ======================== */}
        {activeTab === "injury" && (
          <div style={{ animation: "fadeUp .4s ease" }}>
            <div className="card" style={{ marginBottom: 12, borderColor: `${riskColor[acwrStatus]}33`, background: `linear-gradient(135deg,${riskColor[acwrStatus]}06,${S.surface})` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 11, color: S.muted, fontWeight: 600 }}>Carga de entrenamiento . ACWR</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: riskColor[acwrStatus], background: `${riskColor[acwrStatus]}18`, border: `1px solid ${riskColor[acwrStatus]}44`, borderRadius: 20, padding: "3px 10px" }}>{riskLabel[acwrStatus].toUpperCase()}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <div style={{ background: S.bg, borderRadius: 12, padding: "16px 18px", borderLeft: `3px solid ${riskColor[acwrStatus]}` }}>
                  <div style={{ fontSize: 11, color: S.muted, marginBottom: 4 }}>ACWR actual</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                    <span style={{ fontFamily: FONT_NUM, fontSize: 64, fontWeight: 900, color: riskColor[acwrStatus], lineHeight: 1 }}>{acwr}</span>
                    <span style={{ fontSize: 18, color: S.muted }}>x</span>
                  </div>
                  <div style={{ fontSize: 11, color: S.muted }}>Optimo: 0.8 - 1.3x</div>
                </div>
                <div style={{ background: S.bg, borderRadius: 12, padding: "16px 18px" }}>
                  <div style={{ fontSize: 11, color: S.muted, marginBottom: 4 }}>Semana actual</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                    <span style={{ fontFamily: FONT_NUM, fontSize: 36, fontWeight: 800, color: S.text, lineHeight: 1 }}>{lastWeekKm}</span>
                    <span style={{ fontSize: 13, color: S.muted }}>km</span>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: weeklyIncrease > 10 ? S.danger : S.neon }}>
                    {weeklyIncrease >= 0 ? "+" : ""}{weeklyIncrease}% vs semana anterior
                  </div>
                </div>
                <div style={{ background: S.bg, borderRadius: 12, padding: "16px 18px" }}>
                  <div style={{ fontSize: 11, color: S.muted, marginBottom: 4 }}>Media cronica (4 sem.)</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                    <span style={{ fontFamily: FONT_NUM, fontSize: 36, fontWeight: 800, color: S.text, lineHeight: 1 }}>{chronicLoad.toFixed(1)}</span>
                    <span style={{ fontSize: 13, color: S.muted }}>km</span>
                  </div>
                  <div style={{ position: "relative", height: 6, borderRadius: 3, background: `linear-gradient(90deg,${S.neon} 0%,${S.neon} 40%,#FFB800 55%,#FF4444 80%,#CC0000 100%)`, marginTop: 4 }}>
                    <div style={{ position: "absolute", left: `${Math.min(((acwr - 0.5) / 1.5) * 100, 96)}%`, top: -4, width: 14, height: 14, background: S.text, borderRadius: "50%", border: `2px solid ${riskColor[acwrStatus]}`, transform: "translateX(-50%)" }} />
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8, marginBottom: 12 }}>
              {[
                { label: "Incremento semanal",     val: `+${weeklyIncrease}%`,  status: weeklyIncrease > 15 ? "high" : weeklyIncrease > 10 ? "medium" : "low", detail: `De ${prevWeekKm}km a ${lastWeekKm}km`,                                  threshold: "< 10% / semana" },
                { label: "Variabilidad FC",         val: `${hrVariance} bpm`,    status: hrVariance > 25 ? "medium" : "low",                                       detail: `${Math.min(...last4HR)}-${Math.max(...last4HR)} bpm ultimas 4 sesiones`, threshold: "Normal: 15-30 bpm" },
                { label: "Balance 80/20",           val: `${easyPct}% facil`,    status: easyPct < 70 ? "high" : easyPct < 78 ? "medium" : "low",                  detail: `${100 - easyPct}% de sesiones en zona dura`,                           threshold: ">= 80% en zona baja" },
                { label: "Sesiones ultimas 4 sem.", val: `${last4wActs.length}`, status: "low",                                                                     detail: `${hardSessions.length} sesiones duras de ${last4wActs.length}`,        threshold: "Frecuencia optima" },
              ].map((sig, i) => (
                <div key={i} style={{ background: S.surface, border: `1px solid ${riskColor[sig.status]}22`, borderRadius: 10, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 11, color: S.muted, marginBottom: 4 }}>{sig.label}</div>
                    <div style={{ fontSize: 11, color: S.muted, lineHeight: 1.4 }}>{sig.detail}</div>
                    <div style={{ fontSize: 10, color: riskColor[sig.status], marginTop: 4, fontWeight: 500 }}>{sig.threshold}</div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontFamily: FONT_NUM, fontSize: 22, fontWeight: 800, color: riskColor[sig.status] }}>{sig.val}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 11, color: S.muted, fontWeight: 600, marginBottom: 10 }}>Plan de taper . {daysLeft} dias para Seoul</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {TAPER.map((week, i) => (
                <div key={i} style={{ background: S.surface, border: `1px solid ${week.color}22`, borderRadius: 12, padding: "16px 20px", display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
                  <div style={{ flex: "0 0 auto" }}>
                    <div style={{ fontSize: 10, color: S.muted, marginBottom: 2 }}>Semana {i+1}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: week.color, marginBottom: 2 }}>{week.label}</div>
                    <div style={{ fontSize: 10, color: S.muted }}>{week.week}</div>
                  </div>
                  <div style={{ display: "flex", gap: 20, flex: "0 0 auto" }}>
                    <div>
                      <div style={{ fontFamily: FONT_NUM, fontSize: 24, fontWeight: 800, color: week.color, lineHeight: 1 }}>{week.km}</div>
                      <div style={{ fontSize: 10, color: S.muted }}>km</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: FONT_NUM, fontSize: 24, fontWeight: 800, color: S.muted, lineHeight: 1 }}>{week.sessions}</div>
                      <div style={{ fontSize: 10, color: S.muted }}>sesiones</div>
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 200, fontSize: 12, color: S.muted, lineHeight: 1.6, borderLeft: `2px solid ${S.border}`, paddingLeft: 16 }}>{week.focus}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================== HISTORY TAB ======================== */}
        {activeTab === "history" && (
          <div style={{ animation: "fadeUp .4s ease" }}>
            <div style={{ fontSize: 10, color: S.muted, letterSpacing: ".04em", marginBottom: 12 }}>41 SESIONES . NOV 2025 - FEB 2026</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {[...ACTIVITIES].reverse().map((a, i) => {
                const isLong  = a.dist_km >= 18;
                const isTempo = a.pace_raw < 6.0;
                const isInt   = a.name.toLowerCase().includes("x ");
                const tag     = isLong ? "LARGO" : isTempo ? "TEMPO" : isInt ? "INTERVALOS" : "RODAJE";
                const tc      = isLong ? S.neon : isTempo ? "#FF4444" : isInt ? "#7EB8FF" : "#8888AA";
                return (
                  <div key={i} style={{ background: i === 0 ? `${S.neon}06` : S.surface, border: `1px solid ${i === 0 ? S.neonA : S.border}`, borderRadius: 10, padding: "11px 16px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <div style={{ fontSize: 10, color: S.muted, width: 82, flexShrink: 0 }}>{a.date}</div>
                    <div style={{ flex: "1 1 140px", fontSize: 12, color: i === 0 ? S.text : "#94A3B8", fontWeight: i === 0 ? 700 : 400 }}>{a.name}</div>
                    <span style={{ fontSize: 8, fontWeight: 700, color: tc, background: `${tc}11`, border: `1px solid ${tc}33`, borderRadius: 4, padding: "2px 7px", letterSpacing: ".08em" }}>{tag}</span>
                    <div style={{ display: "flex", gap: 14, flexShrink: 0 }}>
                      <span style={{ fontFamily: FONT_NUM, fontSize: 15, fontWeight: 700, color: S.neon }}>{a.dist_km} km</span>
                      <span style={{ fontSize: 11, color: S.muted }}>{a.pace}/km</span>
                      <span style={{ fontSize: 11, color: S.muted }}>{a.hr}bpm</span>
                    </div>
                    {i === 0 && <span style={{ fontSize: 8, color: S.neon, background: `${S.neon}11`, border: `1px solid ${S.neonA}`, borderRadius: 4, padding: "2px 8px" }}>ULTIMO</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
