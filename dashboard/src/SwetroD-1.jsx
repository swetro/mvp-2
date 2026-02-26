import { useState, useEffect, useRef } from "react";

// ─── SWETRO BRAND COLORS ─────────────────────────────────────────────────────
const S = {
  neon: "#CAFF00",        // Verde neon
  cobalt: "#0054FF",      // Azul cobalto (opaque version)
  cobaltA: "#0054FFA4",   // Azul cobalto con transparencia
  neonA: "#CAFF0080",     // Verde neon con transparencia
  bg: "#060809",
  surface: "#0C0F14",
  surfaceAlt: "#111620",
  border: "#1A2030",
  borderBright: "#243040",
  text: "#E8EDF5",
  muted: "#4A5568",
  dim: "#2D3748",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const ACTIVITIES = [{"date":"2025-11-02","name":"Ricaurte Corrida","dist_km":8.77,"duration_min":70.8,"pace":"8:03","pace_raw":8.066,"hr":144,"kcal":673,"elevation":24.0,"points":13,"effort":null,"heart_eff":0.01435},{"date":"2025-11-05","name":"La Calera Corrida","dist_km":15.01,"duration_min":119.7,"pace":"7:58","pace_raw":7.973,"hr":141,"kcal":1145,"elevation":77.0,"points":23,"effort":null,"heart_eff":0.01482},{"date":"2025-11-07","name":"La Calera Corrida","dist_km":10.01,"duration_min":75.4,"pace":"7:31","pace_raw":7.528,"hr":143,"kcal":789,"elevation":77.0,"points":15,"effort":null,"heart_eff":0.01548},{"date":"2025-11-09","name":"La Calera Corrida","dist_km":10.02,"duration_min":72.8,"pace":"7:15","pace_raw":7.266,"hr":140,"kcal":786,"elevation":116.0,"points":14,"effort":null,"heart_eff":0.01639},{"date":"2025-11-11","name":"La Calera Corrida","dist_km":21.12,"duration_min":165.6,"pace":"7:50","pace_raw":7.837,"hr":145,"kcal":1632,"elevation":269.0,"points":32,"effort":null,"heart_eff":0.01467},{"date":"2025-11-13","name":"La Calera Corrida","dist_km":10.0,"duration_min":78.1,"pace":"7:48","pace_raw":7.809,"hr":141,"kcal":775,"elevation":59.0,"points":15,"effort":null,"heart_eff":0.01513},{"date":"2025-11-17","name":"La Calera Corrida","dist_km":13.01,"duration_min":100.2,"pace":"7:42","pace_raw":7.7,"hr":143,"kcal":1016,"elevation":163.0,"points":19,"effort":10.14,"heart_eff":0.01514},{"date":"2025-11-18","name":"La Calera Corrida","dist_km":11.01,"duration_min":81.5,"pace":"7:24","pace_raw":7.403,"hr":136,"kcal":847,"elevation":84.0,"points":16,"effort":10.39,"heart_eff":0.01655},{"date":"2025-11-20","name":"La Calera Corrida","dist_km":6.06,"duration_min":45.0,"pace":"7:25","pace_raw":7.424,"hr":144,"kcal":483,"elevation":42.0,"points":9,"effort":10.73,"heart_eff":0.01559},{"date":"2025-11-22","name":"La Calera Corrida","dist_km":10.01,"duration_min":61.5,"pace":"6:08","pace_raw":6.144,"hr":162,"kcal":802,"elevation":79.0,"points":13,"effort":13.04,"heart_eff":0.01675},{"date":"2025-11-25","name":"La Calera Corrida","dist_km":5.01,"duration_min":28.9,"pace":"5:46","pace_raw":5.767,"hr":160,"kcal":387,"elevation":36.0,"points":6,"effort":13.39,"heart_eff":0.01806},{"date":"2025-11-30","name":"Bogota, D.C. - 32K","dist_km":32.28,"duration_min":216.1,"pace":"6:41","pace_raw":6.697,"hr":168,"kcal":2749,"elevation":130.0,"points":44,"effort":12.72,"heart_eff":0.01482},{"date":"2025-12-04","name":"La Calera Corrida","dist_km":2.31,"duration_min":16.5,"pace":"7:08","pace_raw":7.145,"hr":139,"kcal":181,"elevation":10.0,"points":3,"effort":10.96,"heart_eff":0.01679},{"date":"2025-12-12","name":"La Calera Corrida","dist_km":2.15,"duration_min":15.4,"pace":"7:10","pace_raw":7.168,"hr":134,"kcal":169,"elevation":26.0,"points":3,"effort":10.99,"heart_eff":0.01735},{"date":"2025-12-13","name":"La Calera Corrida","dist_km":4.43,"duration_min":32.1,"pace":"7:14","pace_raw":7.245,"hr":139,"kcal":347,"elevation":23.0,"points":6,"effort":10.81,"heart_eff":0.01655},{"date":"2025-12-15","name":"La Calera Corrida","dist_km":2.0,"duration_min":13.8,"pace":"6:54","pace_raw":6.91,"hr":133,"kcal":156,"elevation":22.0,"points":3,"effort":11.28,"heart_eff":0.01813},{"date":"2025-12-16","name":"La Calera Corrida","dist_km":3.01,"duration_min":21.7,"pace":"7:12","pace_raw":7.214,"hr":151,"kcal":244,"elevation":17.0,"points":4,"effort":11.24,"heart_eff":0.0153},{"date":"2025-12-20","name":"La Calera Corrida","dist_km":4.0,"duration_min":28.4,"pace":"7:05","pace_raw":7.091,"hr":143,"kcal":317,"elevation":38.0,"points":6,"effort":11.17,"heart_eff":0.01644},{"date":"2025-12-22","name":"La Calera Corrida","dist_km":3.47,"duration_min":25.0,"pace":"7:11","pace_raw":7.198,"hr":142,"kcal":271,"elevation":18.0,"points":5,"effort":10.84,"heart_eff":0.0163},{"date":"2025-12-24","name":"Pozuelo de Alarcón Corrida","dist_km":6.85,"duration_min":45.0,"pace":"6:33","pace_raw":6.562,"hr":145,"kcal":531,"elevation":91.0,"points":9,"effort":11.8,"heart_eff":0.01751},{"date":"2025-12-28","name":"Uppsala Corrida","dist_km":4.36,"duration_min":30.0,"pace":"6:52","pace_raw":6.874,"hr":143,"kcal":350,"elevation":65.0,"points":6,"effort":11.67,"heart_eff":0.01695},{"date":"2026-01-04","name":"Pozuelo de Alarcón Corrida","dist_km":7.23,"duration_min":50.0,"pace":"6:55","pace_raw":6.92,"hr":138,"kcal":567,"elevation":63.0,"points":10,"effort":11.34,"heart_eff":0.01745},{"date":"2026-01-06","name":"Pozuelo de Alarcón Corrida","dist_km":6.85,"duration_min":47.2,"pace":"6:53","pace_raw":6.889,"hr":146,"kcal":558,"elevation":87.0,"points":10,"effort":11.83,"heart_eff":0.01658},{"date":"2026-01-13","name":"La Calera Corrida","dist_km":7.01,"duration_min":48.8,"pace":"6:57","pace_raw":6.952,"hr":153,"kcal":573,"elevation":24.0,"points":10,"effort":11.75,"heart_eff":0.01567},{"date":"2026-01-16","name":"La Calera Corrida","dist_km":5.01,"duration_min":33.1,"pace":"6:36","pace_raw":6.601,"hr":132,"kcal":374,"elevation":17.0,"points":7,"effort":11.3,"heart_eff":0.01913},{"date":"2026-01-18","name":"La Calera Corrida","dist_km":12.0,"duration_min":85.3,"pace":"7:06","pace_raw":7.104,"hr":155,"kcal":975,"elevation":86.0,"points":17,"effort":11.43,"heart_eff":0.01514},{"date":"2026-01-20","name":"La Calera Corrida","dist_km":8.39,"duration_min":60.0,"pace":"7:09","pace_raw":7.151,"hr":147,"kcal":663,"elevation":42.0,"points":12,"effort":11.05,"heart_eff":0.01585},{"date":"2026-01-22","name":"La Calera Atletismo","dist_km":16.0,"duration_min":119.3,"pace":"7:27","pace_raw":7.455,"hr":149,"kcal":1255,"elevation":149.0,"points":23,"effort":10.52,"heart_eff":0.01501},{"date":"2026-01-25","name":"La Calera - 6X600","dist_km":5.01,"duration_min":34.6,"pace":"6:53","pace_raw":6.9,"hr":147,"kcal":388,"elevation":null,"points":7,"effort":11.22,"heart_eff":0.01644},{"date":"2026-01-27","name":"La Calera Running","dist_km":10.02,"duration_min":72.4,"pace":"7:13","pace_raw":7.223,"hr":153,"kcal":818,"elevation":null,"points":14,"effort":11.3,"heart_eff":0.01508},{"date":"2026-02-01","name":"La Calera Running","dist_km":5.01,"duration_min":28.4,"pace":"5:39","pace_raw":5.661,"hr":172,"kcal":398,"elevation":null,"points":6,"effort":14.02,"heart_eff":0.01712},{"date":"2026-01-30","name":"La Calera Running","dist_km":20.0,"duration_min":144.3,"pace":"7:12","pace_raw":7.215,"hr":154,"kcal":1575,"elevation":null,"points":28,"effort":10.91,"heart_eff":0.015},{"date":"2026-02-03","name":"La Calera - 6k","dist_km":6.0,"duration_min":43.7,"pace":"7:16","pace_raw":7.281,"hr":150,"kcal":492,"elevation":null,"points":9,"effort":11.25,"heart_eff":0.01526},{"date":"2026-02-05","name":"La Calera - 24k","dist_km":24.01,"duration_min":176.6,"pace":"7:21","pace_raw":7.355,"hr":153,"kcal":1898,"elevation":null,"points":34,"effort":10.75,"heart_eff":0.01481},{"date":"2026-02-08","name":"La Calera - 5 X 1000","dist_km":0.81,"duration_min":5.2,"pace":"6:23","pace_raw":6.399,"hr":156,"kcal":63,"elevation":null,"points":1,"effort":12.19,"heart_eff":0.01669},{"date":"2026-02-10","name":"La Calera - 10k","dist_km":10.76,"duration_min":94.9,"pace":"8:49","pace_raw":8.819,"hr":140,"kcal":867,"elevation":null,"points":17,"effort":9.14,"heart_eff":0.0135},{"date":"2026-02-12","name":"La Calera - 28k","dist_km":28.01,"duration_min":204.1,"pace":"7:17","pace_raw":7.288,"hr":162,"kcal":2272,"elevation":null,"points":40,"effort":11.13,"heart_eff":0.01412},{"date":"2026-02-15","name":"La Calera - 7k Tempo","dist_km":7.01,"duration_min":40.7,"pace":"5:48","pace_raw":5.808,"hr":159,"kcal":545,"elevation":null,"points":9,"effort":13.39,"heart_eff":0.01805},{"date":"2026-02-17","name":"La Calera - 10k","dist_km":12.0,"duration_min":92.3,"pace":"7:41","pace_raw":7.689,"hr":149,"kcal":944,"elevation":null,"points":18,"effort":10.23,"heart_eff":0.01455},{"date":"2026-02-19","name":"La Calera - 30k","dist_km":30.01,"duration_min":223.4,"pace":"7:26","pace_raw":7.445,"hr":155,"kcal":2372,"elevation":null,"points":43,"effort":10.62,"heart_eff":0.01445},{"date":"2026-02-21","name":"La Calera - 5 X 1200","dist_km":7.49,"duration_min":48.9,"pace":"6:31","pace_raw":6.527,"hr":154,"kcal":593,"elevation":null,"points":10,"effort":12.14,"heart_eff":0.01658}];
const WEEKLY = [{"week":"2025-10-27/2025-11-02","total_km":8.8,"sessions":1,"avg_hr":144.0,"total_kcal":673,"avg_pace":8.066},{"week":"2025-11-03/2025-11-09","total_km":35.0,"sessions":3,"avg_hr":141.3,"total_kcal":2720,"avg_pace":7.589},{"week":"2025-11-10/2025-11-16","total_km":31.1,"sessions":2,"avg_hr":143.0,"total_kcal":2407,"avg_pace":7.823},{"week":"2025-11-17/2025-11-23","total_km":40.1,"sessions":4,"avg_hr":146.2,"total_kcal":3148,"avg_pace":7.168},{"week":"2025-11-24/2025-11-30","total_km":37.3,"sessions":2,"avg_hr":164.0,"total_kcal":3136,"avg_pace":6.232},{"week":"2025-12-01/2025-12-07","total_km":2.3,"sessions":1,"avg_hr":139.0,"total_kcal":181,"avg_pace":7.145},{"week":"2025-12-08/2025-12-14","total_km":6.6,"sessions":2,"avg_hr":136.5,"total_kcal":516,"avg_pace":7.207},{"week":"2025-12-15/2025-12-21","total_km":9.0,"sessions":3,"avg_hr":142.3,"total_kcal":717,"avg_pace":7.072},{"week":"2025-12-22/2025-12-28","total_km":14.7,"sessions":3,"avg_hr":143.3,"total_kcal":1152,"avg_pace":6.878},{"week":"2025-12-29/2026-01-04","total_km":7.2,"sessions":1,"avg_hr":138.0,"total_kcal":567,"avg_pace":6.92},{"week":"2026-01-05/2026-01-11","total_km":6.8,"sessions":1,"avg_hr":146.0,"total_kcal":558,"avg_pace":6.889},{"week":"2026-01-12/2026-01-18","total_km":24.0,"sessions":3,"avg_hr":146.7,"total_kcal":1922,"avg_pace":6.886},{"week":"2026-01-19/2026-01-25","total_km":29.4,"sessions":3,"avg_hr":147.7,"total_kcal":2306,"avg_pace":7.169},{"week":"2026-01-26/2026-02-01","total_km":35.0,"sessions":3,"avg_hr":159.7,"total_kcal":2791,"avg_pace":6.7},{"week":"2026-02-02/2026-02-08","total_km":30.8,"sessions":3,"avg_hr":153.0,"total_kcal":2453,"avg_pace":7.012},{"week":"2026-02-09/2026-02-15","total_km":45.8,"sessions":3,"avg_hr":153.7,"total_kcal":3684,"avg_pace":7.305},{"week":"2026-02-16/2026-02-22","total_km":49.5,"sessions":3,"avg_hr":152.7,"total_kcal":3909,"avg_pace":7.22}];

const RECENT = ACTIVITIES[ACTIVITIES.length - 1];
const MARATHON_DATE = new Date("2026-03-16");
const totalKm = ACTIVITIES.reduce((s,a)=>s+a.dist_km,0).toFixed(1);
const totalKcal = ACTIVITIES.reduce((s,a)=>s+a.kcal,0);
const avgPace = (ACTIVITIES.reduce((s,a)=>s+a.pace_raw,0)/ACTIVITIES.length).toFixed(2);
const avgHR = Math.round(ACTIVITIES.reduce((s,a)=>s+a.hr,0)/ACTIVITIES.length);
const longestRun = Math.max(...ACTIVITIES.map(a=>a.dist_km));
const lastWeekKm = WEEKLY[WEEKLY.length-1].total_km;
const prevWeekKm = WEEKLY[WEEKLY.length-2].total_km;
const prev4Weeks = WEEKLY.slice(-5,-1).map(w=>w.total_km);
const chronicLoad = prev4Weeks.reduce((s,v)=>s+v,0)/4;
const acwr = parseFloat((lastWeekKm/chronicLoad).toFixed(2));
const weeklyIncrease = parseFloat((((lastWeekKm-prevWeekKm)/prevWeekKm)*100).toFixed(1));
const last4HR = ACTIVITIES.slice(-4).map(a=>a.hr);
const hrVariance = Math.max(...last4HR)-Math.min(...last4HR);
const last4wActivities = ACTIVITIES.slice(-12);
const hardSessions = last4wActivities.filter(a=>a.pace_raw<6.5||(a.effort&&a.effort>12.5));
const easyPct = Math.round(((last4wActivities.length-hardSessions.length)/last4wActivities.length)*100);
const acwrStatus = acwr>1.5?"high":acwr>1.3?"medium":"low";
const riskColor = {low:S.neon, medium:"#FFB800", high:"#FF4444"};
const riskLabel = {low:"Zona segura",medium:"Zona de alerta",high:"Zona de riesgo"};

function daysUntilMarathon(){
  const today=new Date("2026-02-21");
  return Math.ceil((MARATHON_DATE-today)/(1000*60*60*24));
}

// ─── MINI SPARKLINE ───────────────────────────────────────────────────────────
function Spark({data,color,h=40}){
  const max=Math.max(...data), min=Math.min(...data), range=max-min||1;
  const pts=data.map((v,i)=>{
    const x=(i/(data.length-1))*100;
    const y=h-((v-min)/range)*(h-4)-2;
    return `${x},${y}`;
  }).join(" ");
  return(
    <svg viewBox={`0 0 100 ${h}`} style={{width:"100%",height:h}}>
      <defs>
        <linearGradient id={`sg${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polyline points={`0,${h} ${pts} 100,${h}`} fill={`url(#sg${color.replace('#','')})`} stroke="none"/>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ─── BAR CHART ────────────────────────────────────────────────────────────────
function Bars({data,h=80}){
  const max=Math.max(...data.map(d=>d.v));
  return(
    <div style={{width:"100%"}}>
      <div style={{display:"flex",alignItems:"flex-end",gap:3,height:h}}>
        {data.map((d,i)=>(
          <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",height:"100%",justifyContent:"flex-end"}}>
            <div style={{
              width:"100%",
              background: i===data.length-1
                ? `linear-gradient(180deg,${S.neon},${S.cobalt})`
                : `${S.neon}28`,
              borderRadius:"3px 3px 0 0",
              height:`${(d.v/max)*100}%`,
              transition:"height 0.6s ease",
              border: i===data.length-1?`1px solid ${S.neon}66`:"none"
            }} title={`${d.l}: ${d.v}km`}/>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:3,marginTop:5}}>
        {data.map((d,i)=>(
          <div key={i} style={{flex:1,fontSize:7,color:S.muted,textAlign:"center",overflow:"hidden",whiteSpace:"nowrap"}}>
            {d.l.split("/")[0].slice(5)}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SCORE RING ───────────────────────────────────────────────────────────────
function ScoreRing({value,size=120,label,color}){
  const r=46,circ=2*Math.PI*r;
  const pct=(value/100)*circ;
  return(
    <div style={{position:"relative",width:size,height:size,flexShrink:0}}>
      <svg width={size} height={size} viewBox="0 0 100 100" style={{transform:"rotate(-90deg)"}}>
        <circle cx="50" cy="50" r={r} fill="none" stroke={S.border} strokeWidth="6"/>
        <circle cx="50" cy="50" r={r} fill="none" stroke={color||S.neon} strokeWidth="6"
          strokeDasharray={`${pct} ${circ}`} strokeLinecap="round"
          style={{filter:`drop-shadow(0 0 6px ${color||S.neon}88)`}}/>
      </svg>
      <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <div style={{fontSize:size>100?24:18,fontWeight:900,color:color||S.neon,lineHeight:1}}>{value}</div>
        {label&&<div style={{fontSize:8,color:S.muted,marginTop:3,letterSpacing:".08em"}}>{label}</div>}
      </div>
    </div>
  );
}

// ─── AI ANALYSIS PULSE INDICATOR ─────────────────────────────────────────────
function PulseOrb(){
  return(
    <div style={{position:"relative",width:12,height:12,flexShrink:0}}>
      <div style={{position:"absolute",inset:0,borderRadius:"50%",background:S.neon,animation:"pulseOrb 1.5s infinite"}}/>
      <div style={{position:"absolute",inset:-4,borderRadius:"50%",background:`${S.neon}22`,animation:"pulseOrb 1.5s infinite .3s"}}/>
    </div>
  );
}

export default function SwetroD() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("ai");
  const [aiPhase, setAiPhase] = useState("idle"); // idle | thinking | streaming | done
  const [typedText, setTypedText] = useState("");
  const daysLeft = daysUntilMarathon();

  useEffect(()=>{ fetchAnalysis(); },[]);

  async function fetchAnalysis(){
    setLoading(true);
    setAiPhase("thinking");
    const prompt=`Eres el motor de inteligencia deportiva de Swetro. El atleta Calderón se prepara para la Maratón de Seúl el 16 de marzo de 2026 (faltan ${daysLeft} días).

Última sesión: "${RECENT.name}" — ${RECENT.date}
Distancia: ${RECENT.dist_km}km | Ritmo: ${RECENT.pace}/km | FC: ${RECENT.hr}bpm | Esfuerzo: ${RECENT.effort} | Eficiencia cardíaca: ${RECENT.heart_eff}
Tipo: Intervalos 5×1200m

Contexto global:
- Total km acumulados (41 sesiones): ${totalKm}km
- Tiradas largas: 32k·28k·30k·24k en últimas 3 semanas
- Semana actual: 49.5km (récord ciclo), +8.1% vs semana anterior
- Ritmo largo promedio: ~7:20/km | Ritmo intervalos: ~5:46–6:31/km
- ACWR: ${acwr}x (${riskLabel[acwrStatus]})
- FC promedio global: ${avgHR}bpm

Responde SOLO con JSON válido (sin markdown):
{
  "score": <1-100>,
  "headline": "<frase impactante máx 7 palabras>",
  "subheadline": "<contexto en 12 palabras>",
  "readiness": <0-100>,
  "projectedTime": "<hh:mm estimado maratón>",
  "projectedPace": "<ritmo estimado /km>",
  "aiVerdict": "<párrafo de 3 oraciones: evaluación profunda del atleta, estado actual y lo que necesita para la maratón>",
  "strengths": ["<s1>","<s2>","<s3>"],
  "warnings": ["<w1>","<w2>"],
  "keyMetrics": [{"label":"<métrica>","value":"<val>","trend":"<up|down|stable>","status":"<green|yellow|red>","note":"<qué significa>"}],
  "weekPlan": [{"day":"<Lun/Mar/Mié/Jue/Vie/Sáb/Dom>","type":"<Descanso|Fácil|Tempo|Intervalos|Largo>","km":"<km o →>","notes":"<breve>"}],
  "injuryRisk": {"level":"<low|medium|high>","score":<0-100>,"topRisk":"<zona corporal>","action":"<acción inmediata>"},
  "funFact": "<dato curioso motivador sobre el entrenamiento>",
  "seoulTip": "<tip específico para la maratón de Seúl (clima, altitud, logística)>"
}`;

    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1200,
          messages:[{role:"user",content:prompt}]
        })
      });
      const data=await res.json();
      const text=data.content?.[0]?.text||"";
      setAiPhase("streaming");
      // stream text for effect
      let i=0;
      const iv=setInterval(()=>{
        i+=12;
        setTypedText(text.slice(0,i));
        if(i>=text.length){
          clearInterval(iv);
          try{
            const m=text.match(/\{[\s\S]*\}/);
            if(m) setAnalysis(JSON.parse(m[0]));
          }catch(e){}
          setAiPhase("done");
          setLoading(false);
        }
      },10);
    }catch(e){
      setAiPhase("idle");
      setLoading(false);
    }
  }

  const scoreColor=(s)=>s>=80?S.neon:s>=60?"#FFB800":"#FF4444";
  const statusColor={green:S.neon,yellow:"#FFB800",red:"#FF4444"};
  const trendIcon={up:"↑",down:"↓",stable:"→"};

  const TAPER=[
    {week:"Feb 23 – Mar 1",label:"REDUCCIÓN ACTIVA",km:"32–36",intensity:"Moderada",sessions:3,focus:"Último rodaje largo 18–20km. Reducir 30% volumen. Mantener strides.",color:S.neon},
    {week:"Mar 2 – Mar 9",label:"TAPER PROFUNDO",km:"20–25",intensity:"Baja–Media",sessions:3,focus:"Rodajes ≤12km. Dos sesiones de aceleraciones. Sueño y nutrición.",color:S.cobalt},
    {week:"Mar 10 – Mar 15",label:"SEMANA DE CARRERA",km:"10–15",intensity:"Muy baja",sessions:2,focus:"Rodajes suaves 20–30min. Activación 3km el sábado. Carbo-loading.",color:"#FFB800"},
  ];

  return(
    <div style={{minHeight:"100vh",background:S.bg,fontFamily:"'Courier New',monospace",color:S.text}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Barlow+Condensed:wght@400;600;700;800;900&display=swap');
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulseOrb{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.4)}}
        @keyframes glow{0%,100%{box-shadow:0 0 20px ${S.neonA}}50%{box-shadow:0 0 40px ${S.neonA},0 0 60px ${S.cobaltA}}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-track{background:${S.bg}}
        ::-webkit-scrollbar-thumb{background:${S.cobalt}44;border-radius:2px}
        button{font-family:'Space Mono',monospace;cursor:pointer}
        .card{background:${S.surface};border:1px solid ${S.border};border-radius:12px;padding:18px}
        .tab-btn{padding:14px 18px;background:none;border:none;border-bottom:2px solid transparent;font-size:10px;letter-spacing:.14em;font-weight:700;transition:all .2s;white-space:nowrap;color:${S.muted}}
        .tab-btn.active-tab{color:${S.neon};border-bottom-color:${S.neon}}
        .tab-btn:hover:not(.active-tab){color:${S.text}}
        .shimmer{background:linear-gradient(90deg,${S.surface} 0%,${S.surfaceAlt} 50%,${S.surface} 100%);background-size:200% 100%;animation:shimmer 1.5s infinite}
      `}</style>

      {/* ── TOPBAR ── */}
      <div style={{background:S.surface,borderBottom:`1px solid ${S.border}`,padding:"14px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:20,backdropFilter:"blur(12px)"}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          {/* Logo */}
          <div style={{position:"relative"}}>
            <div style={{width:36,height:36,background:`linear-gradient(135deg,${S.neon},${S.cobalt})`,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:900}}>
              S
            </div>
            <div style={{position:"absolute",inset:-1,borderRadius:9,border:`1px solid ${S.neonA}`,pointerEvents:"none"}}/>
          </div>
          <div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:900,color:S.neon,letterSpacing:".12em"}}>SWETRO</div>
            <div style={{fontSize:9,color:S.muted,letterSpacing:".2em",marginTop:-2}}>MARATHON INTELLIGENCE</div>
          </div>
        </div>

        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          {/* AI status */}
          <div style={{display:"flex",alignItems:"center",gap:8,background:S.surfaceAlt,border:`1px solid ${S.border}`,borderRadius:20,padding:"6px 14px"}}>
            {aiPhase==="done"?<PulseOrb/>:<div style={{width:8,height:8,borderRadius:"50%",background:aiPhase==="thinking"?"#FFB800":S.muted}}/>}
            <span style={{fontSize:10,color:aiPhase==="done"?S.neon:aiPhase==="thinking"?"#FFB800":S.muted,letterSpacing:".1em"}}>
              {aiPhase==="done"?"IA ACTIVA":aiPhase==="thinking"?"ANALIZANDO...":aiPhase==="streaming"?"PROCESANDO...":"IA STANDBY"}
            </span>
          </div>
          <div style={{background:`${S.neon}11`,border:`1px solid ${S.neonA}`,borderRadius:20,padding:"6px 14px",fontSize:11,color:S.neon,fontWeight:700,letterSpacing:".1em",fontFamily:"'Barlow Condensed',sans-serif"}}>
            {daysLeft}D · SEÚL
          </div>
        </div>
      </div>

      {/* ── HERO STRIP ── */}
      <div style={{background:`linear-gradient(135deg,${S.surface},${S.bg})`,borderBottom:`1px solid ${S.border}`,padding:"24px 24px 0"}}>
        {/* Athlete row */}
        <div style={{display:"flex",gap:20,alignItems:"flex-start",flexWrap:"wrap",marginBottom:20}}>
          <div style={{display:"flex",alignItems:"center",gap:16,flex:"0 0 auto"}}>
            <div style={{width:60,height:60,borderRadius:"50%",background:`linear-gradient(135deg,${S.cobalt}44,${S.neon}22)`,border:`2px solid ${S.neonA}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26}}>🏃</div>
            <div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:28,fontWeight:900,color:S.text,letterSpacing:".04em"}}>CALDERÓN</div>
              <div style={{fontSize:10,color:S.muted,marginTop:2}}>41 sesiones · Nov'25 – Feb'26</div>
              <div style={{display:"flex",gap:6,marginTop:6}}>
                <span style={{fontSize:9,background:`${S.neon}11`,border:`1px solid ${S.neonA}`,borderRadius:4,padding:"2px 8px",color:S.neon,letterSpacing:".1em"}}>MARATONISTA</span>
                <span style={{fontSize:9,background:`${S.cobalt}22`,border:`1px solid ${S.cobalt}66`,borderRadius:4,padding:"2px 8px",color:"#7EB8FF",letterSpacing:".1em"}}>LA CALERA</span>
              </div>
            </div>
          </div>

          {/* Stat pills */}
          <div style={{display:"flex",gap:10,flexWrap:"wrap",flex:1}}>
            {[
              {l:"KM TOTAL",v:totalKm,u:"km",color:S.neon},
              {l:"SESIONES",v:"41",u:"",color:S.neon},
              {l:"MAYOR TIRADA",v:longestRun,u:"km",color:S.neon},
              {l:"CALORÍAS",v:`${(totalKcal/1000).toFixed(1)}k`,u:"kcal",color:"#7EB8FF"},
              {l:"RITMO PROM.",v:avgPace,u:"min/km",color:"#7EB8FF"},
              {l:"FC PROMEDIO",v:avgHR,u:"bpm",color:"#FFB800"},
            ].map((s,i)=>(
              <div key={i} style={{background:S.surfaceAlt,border:`1px solid ${S.border}`,borderRadius:8,padding:"10px 14px",textAlign:"center",flex:"1 0 80px"}}>
                <div style={{fontSize:8,color:S.muted,letterSpacing:".12em",marginBottom:3}}>{s.l}</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:800,color:s.color}}>{s.v}</div>
                <div style={{fontSize:8,color:S.dim}}>{s.u}</div>
              </div>
            ))}
          </div>

          {/* Marathon countdown */}
          <div style={{background:`linear-gradient(135deg,${S.neon}0A,${S.cobalt}22)`,border:`1px solid ${S.neonA}`,borderRadius:12,padding:"16px 20px",textAlign:"center",flex:"0 0 130px",animation:"glow 3s infinite"}}>
            <div style={{fontSize:9,color:S.neon,letterSpacing:".15em",marginBottom:4}}>MARATÓN SEÚL</div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:44,fontWeight:900,color:S.neon,lineHeight:1,textShadow:`0 0 24px ${S.neon}`}}>{daysLeft}</div>
            <div style={{fontSize:9,color:S.muted,marginTop:4}}>días restantes</div>
            <div style={{marginTop:10,height:3,background:S.border,borderRadius:2}}>
              <div style={{width:`${Math.round(((90-daysLeft)/90)*100)}%`,height:"100%",background:`linear-gradient(90deg,${S.neon},${S.cobalt})`,borderRadius:2}}/>
            </div>
            <div style={{fontSize:8,color:S.muted,marginTop:4}}>16 MAR 2026</div>
          </div>
        </div>

        {/* TABS */}
        <div style={{display:"flex",gap:0,overflowX:"auto",borderTop:`1px solid ${S.border}`}}>
          {[
            ["ai","⚡ IA ANÁLISIS"],
            ["overview","RESUMEN"],
            ["activity","ÚLTIMA SESIÓN"],
            ["injury","🛡 PREVENCIÓN"],
            ["history","HISTORIAL"],
          ].map(([id,label])=>(
            <button key={id} className={`tab-btn${activeTab===id?" active-tab":""}`}
              onClick={()=>setActiveTab(id)}
              style={{color:activeTab===id?(id==="injury"?"#FF4444":S.neon):undefined,
                      borderBottomColor:activeTab===id?(id==="injury"?"#FF4444":S.neon):undefined}}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{padding:"24px",maxWidth:1100,margin:"0 auto"}}>

        {/* ══════════════════ AI TAB (HERO) ══════════════════ */}
        {activeTab==="ai"&&(
          <div style={{animation:"fadeUp .4s ease"}}>

            {/* Loading state */}
            {loading&&!analysis&&(
              <div>
                <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:24,padding:"20px 24px",background:`${S.cobalt}11`,border:`1px solid ${S.cobalt}44`,borderRadius:14}}>
                  <div style={{width:40,height:40,border:`2px solid ${S.border}`,borderTop:`2px solid ${S.neon}`,borderRadius:"50%",animation:"spin 1s linear infinite"}}/>
                  <div>
                    <div style={{fontSize:12,color:S.neon,fontWeight:700,marginBottom:4}}>Swetro IA está analizando tu entrenamiento...</div>
                    <div style={{fontSize:11,color:S.muted}}>Procesando 41 sesiones · 3 meses de datos · métricas de rendimiento</div>
                  </div>
                </div>
                {/* Skeleton cards */}
                {[1,2,3].map(i=>(
                  <div key={i} style={{height:80,borderRadius:12,marginBottom:12}} className="shimmer"/>
                ))}
              </div>
            )}

            {analysis&&(
              <div>
                {/* ── AI VERDICT HERO ── */}
                <div style={{background:`linear-gradient(135deg,${S.cobalt}18,${S.neon}08)`,border:`1px solid ${S.cobaltA}`,borderRadius:16,padding:"28px",marginBottom:20,position:"relative",overflow:"hidden"}}>
                  {/* bg glow */}
                  <div style={{position:"absolute",top:-40,right:-40,width:200,height:200,borderRadius:"50%",background:`${S.neon}06`,pointerEvents:"none"}}/>
                  <div style={{position:"absolute",bottom:-60,left:-20,width:160,height:160,borderRadius:"50%",background:`${S.cobalt}0A`,pointerEvents:"none"}}/>

                  <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:12}}>
                    <PulseOrb/>
                    <span style={{fontSize:10,color:S.neon,letterSpacing:".15em",fontWeight:700}}>SWETRO IA · ANÁLISIS COMPLETO</span>
                  </div>

                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:32,fontWeight:900,color:S.text,letterSpacing:".03em",marginBottom:6,lineHeight:1.1}}>
                    {analysis.headline}
                  </div>
                  <div style={{fontSize:12,color:S.muted,marginBottom:20}}>{analysis.subheadline}</div>

                  {/* Score rings row */}
                  <div style={{display:"flex",gap:24,flexWrap:"wrap",alignItems:"center",marginBottom:24}}>
                    <ScoreRing value={analysis.score} size={120} label="SCORE SESIÓN" color={scoreColor(analysis.score)}/>
                    <ScoreRing value={analysis.readiness} size={120} label="MARATHON READY" color={scoreColor(analysis.readiness)}/>
                    <div style={{flex:1,minWidth:220}}>
                      <div style={{marginBottom:16}}>
                        <div style={{fontSize:10,color:S.muted,letterSpacing:".1em",marginBottom:4}}>TIEMPO PROYECTADO</div>
                        <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:44,fontWeight:900,color:S.cobalt==="0054FF"?"#5599FF":S.cobalt,lineHeight:1}}>{analysis.projectedTime}</div>
                        {analysis.projectedPace&&<div style={{fontSize:11,color:S.muted,marginTop:4}}>{analysis.projectedPace}/km promedio</div>}
                      </div>
                      {/* Readiness bar */}
                      <div style={{height:6,background:S.border,borderRadius:3,overflow:"hidden"}}>
                        <div style={{width:`${analysis.readiness}%`,height:"100%",background:`linear-gradient(90deg,${S.cobalt},${S.neon})`,borderRadius:3,transition:"width 1.5s ease"}}/>
                      </div>
                      <div style={{display:"flex",justifyContent:"space-between",marginTop:4,fontSize:9,color:S.muted}}>
                        <span>0%</span><span style={{color:S.neon}}>{analysis.readiness}% listo</span><span>100%</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Verdict text */}
                  <div style={{background:`${S.bg}88`,border:`1px solid ${S.border}`,borderRadius:10,padding:"16px",borderLeft:`3px solid ${S.neon}`}}>
                    <div style={{fontSize:9,color:S.neon,letterSpacing:".12em",marginBottom:8}}>VEREDICTO IA</div>
                    <div style={{fontSize:13,color:"#94A3B8",lineHeight:1.7}}>{analysis.aiVerdict}</div>
                  </div>
                </div>

                {/* ── KEY METRICS GRID ── */}
                {analysis.keyMetrics&&(
                  <div style={{marginBottom:20}}>
                    <div style={{fontSize:9,color:S.muted,letterSpacing:".15em",marginBottom:12}}>MÉTRICAS CLAVE · EVALUACIÓN IA</div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>
                      {analysis.keyMetrics.map((m,i)=>(
                        <div key={i} style={{background:S.surface,border:`1px solid ${statusColor[m.status]||S.border}22`,borderTop:`2px solid ${statusColor[m.status]||S.neon}`,borderRadius:"0 0 10px 10px",padding:"14px"}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                            <div style={{fontSize:9,color:S.muted,letterSpacing:".08em"}}>{m.label}</div>
                            <span style={{fontSize:12,color:statusColor[m.status]||S.neon}}>{trendIcon[m.trend]||"→"}</span>
                          </div>
                          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:26,fontWeight:800,color:statusColor[m.status]||S.neon}}>{m.value}</div>
                          <div style={{fontSize:10,color:S.muted,marginTop:4,lineHeight:1.4}}>{m.note}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── STRENGTHS + WARNINGS ── */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
                  <div style={{background:S.surface,border:`1px solid ${S.neon}22`,borderRadius:12,padding:"18px"}}>
                    <div style={{fontSize:9,color:S.neon,letterSpacing:".15em",marginBottom:12}}>✓ FORTALEZAS DETECTADAS</div>
                    {analysis.strengths?.map((s,i)=>(
                      <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:10}}>
                        <div style={{width:20,height:20,background:`${S.neon}15`,border:`1px solid ${S.neonA}`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:S.neon,fontWeight:700,flexShrink:0}}>{i+1}</div>
                        <div style={{fontSize:12,color:"#94A3B8",lineHeight:1.5}}>{s}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{background:S.surface,border:`1px solid #FFB80022`,borderRadius:12,padding:"18px"}}>
                    <div style={{fontSize:9,color:"#FFB800",letterSpacing:".15em",marginBottom:12}}>⚠ ALERTAS IA</div>
                    {analysis.warnings?.map((w,i)=>(
                      <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:10}}>
                        <div style={{width:20,height:20,background:"#FFB80015",border:"1px solid #FFB80044",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#FFB800",fontWeight:700,flexShrink:0}}>!</div>
                        <div style={{fontSize:12,color:"#94A3B8",lineHeight:1.5}}>{w}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── WEEK PLAN ── */}
                {analysis.weekPlan&&(
                  <div style={{marginBottom:20}}>
                    <div style={{fontSize:9,color:S.muted,letterSpacing:".15em",marginBottom:12}}>PLAN SEMANAL RECOMENDADO · IA</div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:6}}>
                      {analysis.weekPlan.map((d,i)=>{
                        const tc=d.type==="Descanso"?S.muted:d.type==="Fácil"?S.cobalt:d.type==="Largo"?S.neon:d.type==="Tempo"?"#FFB800":"#FF8844";
                        return(
                          <div key={i} style={{background:S.surface,border:`1px solid ${tc}33`,borderRadius:10,padding:"12px 8px",textAlign:"center"}}>
                            <div style={{fontSize:9,color:S.muted,letterSpacing:".08em",marginBottom:4}}>{d.day}</div>
                            <div style={{fontSize:10,fontWeight:700,color:tc,marginBottom:4,lineHeight:1.2}}>{d.type}</div>
                            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:800,color:tc}}>{d.km}</div>
                            <div style={{fontSize:8,color:S.dim,marginTop:4,lineHeight:1.3}}>{d.notes}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ── FUN FACT + SEOUL TIP ── */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
                  <div style={{background:`${S.neon}08`,border:`1px solid ${S.neonA}`,borderRadius:12,padding:"16px",display:"flex",gap:12,alignItems:"flex-start"}}>
                    <span style={{fontSize:22,flexShrink:0}}>💡</span>
                    <div>
                      <div style={{fontSize:9,color:S.neon,letterSpacing:".12em",marginBottom:6}}>DATO CURIOSO</div>
                      <div style={{fontSize:12,color:"#94A3B8",lineHeight:1.6}}>{analysis.funFact}</div>
                    </div>
                  </div>
                  <div style={{background:`${S.cobalt}11`,border:`1px solid ${S.cobalt}44`,borderRadius:12,padding:"16px",display:"flex",gap:12,alignItems:"flex-start"}}>
                    <span style={{fontSize:22,flexShrink:0}}>🇰🇷</span>
                    <div>
                      <div style={{fontSize:9,color:"#7EB8FF",letterSpacing:".12em",marginBottom:6}}>TIP MARATÓN SEÚL</div>
                      <div style={{fontSize:12,color:"#94A3B8",lineHeight:1.6}}>{analysis.seoulTip}</div>
                    </div>
                  </div>
                </div>

                {/* ── INJURY RISK COMPACT ── */}
                {analysis.injuryRisk&&(
                  <div style={{background:S.surface,border:`1px solid ${riskColor[analysis.injuryRisk.level]}33`,borderRadius:12,padding:"18px",display:"flex",gap:20,alignItems:"center",flexWrap:"wrap"}}>
                    <div style={{flex:"0 0 auto"}}>
                      <div style={{fontSize:9,color:S.muted,letterSpacing:".12em",marginBottom:6}}>RIESGO DE LESIÓN · IA</div>
                      <div style={{display:"flex",alignItems:"center",gap:12}}>
                        <ScoreRing value={analysis.injuryRisk.score} size={80} color={riskColor[analysis.injuryRisk.level]}/>
                        <div>
                          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,fontWeight:800,color:riskColor[analysis.injuryRisk.level]}}>{riskLabel[analysis.injuryRisk.level]?.toUpperCase()}</div>
                          <div style={{fontSize:11,color:S.muted,marginTop:4}}>Zona: {analysis.injuryRisk.topRisk}</div>
                        </div>
                      </div>
                    </div>
                    <div style={{flex:1,minWidth:200,background:`${S.bg}88`,borderLeft:`2px solid ${riskColor[analysis.injuryRisk.level]}`,borderRadius:"0 8px 8px 0",padding:"12px 16px"}}>
                      <div style={{fontSize:9,color:riskColor[analysis.injuryRisk.level],letterSpacing:".1em",marginBottom:6}}>ACCIÓN INMEDIATA</div>
                      <div style={{fontSize:12,color:"#94A3B8",lineHeight:1.6}}>{analysis.injuryRisk.action}</div>
                    </div>
                    <button onClick={()=>setActiveTab("injury")} style={{background:"transparent",border:`1px solid ${S.neonA}`,borderRadius:8,padding:"8px 16px",color:S.neon,fontSize:10,letterSpacing:".1em"}}>
                      PLAN COMPLETO →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════ OVERVIEW TAB ══════════════════ */}
        {activeTab==="overview"&&(
          <div style={{animation:"fadeUp .4s ease"}}>
            {/* Weekly km chart */}
            <div className="card" style={{marginBottom:16}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:16,fontWeight:700,color:S.text}}>Kilómetros por semana</div>
                  <div style={{fontSize:10,color:S.muted,marginTop:2}}>Progresión de carga — pico récord esta semana</div>
                </div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:800,color:S.neon}}>{lastWeekKm} km ↑</div>
              </div>
              <Bars data={WEEKLY.map(w=>({v:w.total_km,l:w.week}))} h={100}/>
            </div>

            {/* Mini metric cards */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:16}}>
              {[
                {label:"Ritmo prom. (min/km)",data:WEEKLY.map(w=>w.avg_pace),color:"#7EB8FF",curr:WEEKLY[WEEKLY.length-1].avg_pace.toFixed(2),note:"Menor = más rápido"},
                {label:"FC promedio (bpm)",data:WEEKLY.map(w=>w.avg_hr),color:"#FFB800",curr:Math.round(WEEKLY[WEEKLY.length-1].avg_hr),note:"Zona de trabajo"},
                {label:"Sesiones / semana",data:WEEKLY.map(w=>w.sessions),color:S.neon,curr:WEEKLY[WEEKLY.length-1].sessions,note:"Frecuencia semanal"},
              ].map((c,i)=>(
                <div key={i} className="card">
                  <div style={{fontSize:9,color:S.muted,letterSpacing:".08em",marginBottom:4}}>{c.label}</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:28,fontWeight:800,color:c.color,marginBottom:2}}>{c.curr}</div>
                  <div style={{fontSize:9,color:S.dim,marginBottom:10}}>{c.note}</div>
                  <Spark data={c.data} color={c.color} h={36}/>
                </div>
              ))}
            </div>

            {/* ACWR Banner */}
            <div style={{background:`${riskColor[acwrStatus]}08`,border:`1px solid ${riskColor[acwrStatus]}25`,borderRadius:12,padding:"18px 22px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
              <div>
                <div style={{fontSize:9,color:S.muted,letterSpacing:".15em",marginBottom:4}}>🛡 CARGA DE ENTRENAMIENTO</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:18,fontWeight:700,color:riskColor[acwrStatus]}}>{riskLabel[acwrStatus]} — ACWR {acwr}x · +{weeklyIncrease}% vs semana anterior</div>
              </div>
              <button onClick={()=>setActiveTab("injury")} style={{background:"transparent",border:`1px solid ${riskColor[acwrStatus]}44`,borderRadius:8,padding:"7px 16px",color:riskColor[acwrStatus],fontSize:10,letterSpacing:".1em"}}>
                VER ANÁLISIS →
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════ ACTIVITY TAB ══════════════════ */}
        {activeTab==="activity"&&(
          <div style={{animation:"fadeUp .4s ease"}}>
            <div style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:16}}>
              {/* Hero card */}
              <div className="card" style={{flex:"2 1 300px",borderColor:`${S.neon}22`}}>
                <div style={{fontSize:9,color:S.muted,letterSpacing:".15em",marginBottom:8}}>ÚLTIMA ACTIVIDAD · {RECENT.date}</div>
                <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:24,fontWeight:800,color:S.text,marginBottom:18}}>{RECENT.name}</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
                  {[
                    {l:"DISTANCIA",v:`${RECENT.dist_km}`,u:"km",icon:"📏"},
                    {l:"DURACIÓN",v:`${Math.floor(RECENT.duration_min)}m`,u:"",icon:"⏱"},
                    {l:"RITMO",v:RECENT.pace,u:"/km",icon:"⚡"},
                    {l:"FC PROM.",v:`${RECENT.hr}`,u:"bpm",icon:"❤️"},
                    {l:"CALORÍAS",v:`${RECENT.kcal}`,u:"kcal",icon:"🔥"},
                    {l:"ESFUERZO",v:RECENT.effort?.toFixed(1)||"—",u:"",icon:"💪"},
                  ].map((m,i)=>(
                    <div key={i} style={{background:S.bg,borderRadius:8,padding:"12px",textAlign:"center"}}>
                      <div style={{fontSize:14,marginBottom:4}}>{m.icon}</div>
                      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:800,color:S.neon}}>{m.v}<span style={{fontSize:11,color:S.muted}}>{m.u}</span></div>
                      <div style={{fontSize:8,color:S.dim,letterSpacing:".08em",marginTop:2}}>{m.l}</div>
                    </div>
                  ))}
                </div>
                <div style={{marginTop:14,padding:"10px 14px",background:S.bg,borderRadius:8,fontSize:11,color:S.muted,borderLeft:`2px solid ${S.neon}`}}>
                  🏋️ Intervalos <strong style={{color:S.neon}}>5 × 1200m</strong> · Trabajo de calidad en fase de carga máxima
                </div>
              </div>

              {/* AI score compact */}
              {analysis?(
                <div className="card" style={{flex:"1 1 160px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,borderColor:`${S.neon}22`}}>
                  <ScoreRing value={analysis.score} size={110} label="SCORE IA" color={scoreColor(analysis.score)}/>
                  {analysis.marathonTips&&(
                    <div style={{fontSize:11,color:S.muted,lineHeight:1.5,textAlign:"left",background:S.bg,borderRadius:8,padding:12,borderLeft:`2px solid ${S.neon}`,width:"100%"}}>
                      🎯 {analysis.marathonTips||analysis.aiVerdict?.slice(0,120)+"…"}
                    </div>
                  )}
                </div>
              ):(
                <div className="card" style={{flex:"1 1 160px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12}}>
                  <div style={{width:40,height:40,border:`2px solid ${S.border}`,borderTop:`2px solid ${S.neon}`,borderRadius:"50%",animation:"spin 1s linear infinite"}}/>
                  <div style={{fontSize:11,color:S.muted,textAlign:"center"}}>Analizando...</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════════════════ INJURY TAB ══════════════════ */}
        {activeTab==="injury"&&(
          <div style={{animation:"fadeUp .4s ease"}}>
            {/* ACWR hero */}
            <div style={{background:`${riskColor[acwrStatus]}08`,border:`2px solid ${riskColor[acwrStatus]}33`,borderRadius:14,padding:"24px",marginBottom:20}}>
              <div style={{fontSize:10,color:riskColor[acwrStatus],letterSpacing:".15em",marginBottom:12}}>CARGA DE ENTRENAMIENTO · ANÁLISIS DE RIESGO</div>
              <div style={{display:"flex",gap:32,flexWrap:"wrap",alignItems:"flex-start"}}>
                <div>
                  <div style={{fontSize:10,color:S.muted,marginBottom:4}}>Ratio Aguda:Crónica (ACWR)</div>
                  <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:60,fontWeight:900,color:riskColor[acwrStatus],lineHeight:1,textShadow:`0 0 24px ${riskColor[acwrStatus]}55`}}>{acwr}<span style={{fontSize:22}}>x</span></div>
                  <div style={{fontSize:12,color:riskColor[acwrStatus],marginTop:4,fontWeight:700}}>{riskLabel[acwrStatus]}</div>
                  <div style={{fontSize:10,color:S.muted,marginTop:8,maxWidth:280,lineHeight:1.5}}>
                    Semana actual: <strong style={{color:S.text}}>{lastWeekKm}km</strong> vs. crónica: <strong style={{color:S.text}}>{chronicLoad.toFixed(1)}km</strong>
                  </div>
                </div>
                {/* Scale */}
                <div style={{flex:1,minWidth:220}}>
                  <div style={{fontSize:9,color:S.muted,letterSpacing:".1em",marginBottom:12}}>ESCALA DE RIESGO ACWR</div>
                  <div style={{position:"relative",height:12,borderRadius:6,background:`linear-gradient(90deg,${S.neon} 0%,${S.neon} 40%,#FFB800 55%,#FF4444 80%,#CC0000 100%)`,marginBottom:8}}>
                    <div style={{position:"absolute",left:`${Math.min(((acwr-0.5)/1.5)*100,97)}%`,top:-4,width:20,height:20,background:S.text,borderRadius:"50%",border:`3px solid ${riskColor[acwrStatus]}`,transform:"translateX(-50%)",boxShadow:`0 0 12px ${riskColor[acwrStatus]}`}}/>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:S.muted}}>
                    <span>0.5</span><span>0.8</span><span>1.3</span><span>1.5</span><span>2.0</span>
                  </div>
                  <div style={{marginTop:16,display:"flex",flexDirection:"column",gap:6}}>
                    {[
                      {range:"0.8 – 1.3x",label:"Zona óptima",color:S.neon},
                      {range:"1.3 – 1.5x",label:"Zona de alerta",color:"#FFB800"},
                      {range:"> 1.5x",label:"Zona de riesgo",color:"#FF4444"},
                    ].map((r,i)=>(
                      <div key={i} style={{display:"flex",alignItems:"center",gap:10}}>
                        <div style={{width:8,height:8,borderRadius:"50%",background:r.color,flexShrink:0}}/>
                        <span style={{fontSize:10,color:r.color,width:80}}>{r.range}</span>
                        <span style={{fontSize:10,color:S.muted}}>{r.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Signals */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:12,marginBottom:24}}>
              {[
                {icon:"📈",label:"ACWR (Aguda:Crónica)",val:`${acwr}x`,status:acwrStatus,detail:`Sem. actual (${lastWeekKm}km) vs promedio 4 sem. (${chronicLoad.toFixed(1)}km). ${acwr>1.3?"Carga elevada.":"Dentro del rango óptimo."}`,threshold:"Óptimo: 0.8 – 1.3x"},
                {icon:"📊",label:"Incremento semanal",val:`+${weeklyIncrease}%`,status:weeklyIncrease>15?"high":weeklyIncrease>10?"medium":"low",detail:`De ${prevWeekKm}km a ${lastWeekKm}km. Regla del 10%: no superar ese umbral semanal.`,threshold:"Recomendado: < 10% / semana"},
                {icon:"❤️",label:"Variabilidad FC 4 ses.",val:`${hrVariance} bpm`,status:hrVariance>25?"medium":"low",detail:`FC entre ${Math.min(...last4HR)} y ${Math.max(...last4HR)} bpm. ${hrVariance>25?"Posible fatiga acumulada.":"Buen control de intensidad."}`,threshold:"Normal: 15–30 bpm"},
                {icon:"⚖️",label:"Balance 80/20",val:`${easyPct}% fácil`,status:easyPct<70?"high":easyPct<78?"medium":"low",detail:`${100-easyPct}% de sesiones en zona dura. ${easyPct<78?"Demasiado volumen duro.":"Distribución correcta."}`,threshold:"≥ 80% en zona baja"},
              ].map((sig,i)=>(
                <div key={i} style={{background:S.surface,borderLeft:`4px solid ${riskColor[sig.status]}`,borderRadius:"0 12px 12px 0",padding:"16px",border:`1px solid ${riskColor[sig.status]}22`,borderLeftWidth:4}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                    <div>
                      <div style={{fontSize:9,color:S.muted,letterSpacing:".08em",marginBottom:4}}>{sig.label}</div>
                      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:30,fontWeight:900,color:riskColor[sig.status]}}>{sig.val}</div>
                    </div>
                    <span style={{fontSize:24}}>{sig.icon}</span>
                  </div>
                  <div style={{fontSize:10,color:S.muted,lineHeight:1.5,marginBottom:8}}>{sig.detail}</div>
                  <div style={{fontSize:9,color:riskColor[sig.status],background:`${riskColor[sig.status]}11`,borderRadius:4,padding:"4px 8px",display:"inline-block"}}>{sig.threshold}</div>
                </div>
              ))}
            </div>

            {/* Taper plan */}
            <div style={{fontSize:9,color:S.muted,letterSpacing:".15em",marginBottom:10}}>PLAN DE TAPER · {daysLeft} DÍAS PARA SEÚL</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {TAPER.map((week,i)=>(
                <div key={i} style={{background:S.surface,border:`1px solid ${week.color}22`,borderRadius:12,padding:"18px 20px",display:"flex",gap:20,flexWrap:"wrap",alignItems:"flex-start"}}>
                  <div style={{flex:"0 0 160px"}}>
                    <div style={{fontSize:9,color:S.muted,letterSpacing:".08em",marginBottom:4}}>SEMANA {i+1}</div>
                    <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,fontWeight:800,color:week.color,letterSpacing:".08em",marginBottom:6}}>{week.label}</div>
                    <div style={{fontSize:9,color:S.muted}}>{week.week}</div>
                  </div>
                  <div style={{display:"flex",gap:16,flex:"0 0 auto",flexWrap:"wrap"}}>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:800,color:week.color}}>{week.km}</div>
                      <div style={{fontSize:8,color:S.muted}}>km</div>
                    </div>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:22,fontWeight:800,color:S.muted}}>{week.sessions}</div>
                      <div style={{fontSize:8,color:S.muted}}>ses.</div>
                    </div>
                  </div>
                  <div style={{flex:1,minWidth:200,fontSize:11,color:S.muted,lineHeight:1.6,borderLeft:`2px solid ${S.border}`,paddingLeft:16}}>{week.focus}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════ HISTORY TAB ══════════════════ */}
        {activeTab==="history"&&(
          <div style={{animation:"fadeUp .4s ease"}}>
            <div style={{fontSize:10,color:S.muted,letterSpacing:".1em",marginBottom:12}}>41 SESIONES · NOV 2025 – FEB 2026</div>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              {[...ACTIVITIES].reverse().map((a,i)=>{
                const isLong=a.dist_km>=18;
                const isTempo=a.pace_raw<6.0;
                const isInt=a.name.toLowerCase().includes("x ");
                const tag=isLong?"LARGO":isTempo?"TEMPO":isInt?"INTERVALOS":"RODAJE";
                const tc=isLong?S.neon:isTempo?"#FF4444":isInt?"#7EB8FF":"#8888AA";
                return(
                  <div key={i} style={{background:i===0?`${S.neon}06`:S.surface,border:`1px solid ${i===0?S.neonA:S.border}`,borderRadius:10,padding:"11px 16px",display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
                    <div style={{fontSize:10,color:S.muted,width:82,flexShrink:0}}>{a.date}</div>
                    <div style={{flex:"1 1 140px",fontSize:12,color:i===0?S.text:"#94A3B8",fontWeight:i===0?700:400}}>{a.name}</div>
                    <span style={{fontSize:8,fontWeight:700,color:tc,background:`${tc}11`,border:`1px solid ${tc}33`,borderRadius:4,padding:"2px 7px",letterSpacing:".08em"}}>{tag}</span>
                    <div style={{display:"flex",gap:14,flexShrink:0}}>
                      <span style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:15,fontWeight:700,color:S.neon}}>{a.dist_km} km</span>
                      <span style={{fontSize:11,color:S.muted}}>{a.pace}/km</span>
                      <span style={{fontSize:11,color:S.muted}}>{a.hr}bpm</span>
                    </div>
                    {i===0&&<span style={{fontSize:8,color:S.neon,background:`${S.neon}11`,border:`1px solid ${S.neonA}`,borderRadius:4,padding:"2px 8px"}}>ÚLTIMO</span>}
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
