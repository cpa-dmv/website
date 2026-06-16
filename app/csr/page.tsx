"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Heart, Clock, Briefcase, ArrowRight, CheckCircle } from "lucide-react";
import { useRef, useEffect } from "react";

// ─── Globe Canvas Animation ───────────────────────────────────────────────────
const CITIES: [number, number, boolean][] = [
  [38.85, -77.31, true],   // Fairfax VA (home)
  [40.71, -74.01, false],  // New York
  [34.05, -118.24, false], // Los Angeles
  [41.88, -87.63, false],  // Chicago
  [29.76, -95.37, false],  // Houston
  [51.51, -0.13, false],   // London
  [48.86, 2.35, false],    // Paris
  [52.52, 13.40, false],   // Berlin
  [35.69, 139.69, false],  // Tokyo
  [22.31, 114.17, false],  // Hong Kong
  [-33.87, 151.21, false], // Sydney
  [19.07, 72.88, false],   // Mumbai
  [-23.55, -46.63, false], // São Paulo
  [6.52, 3.38, false],     // Lagos
  [55.75, 37.62, false],   // Moscow
  [1.35, 103.82, false],   // Singapore
  [25.20, 55.27, false],   // Dubai
  [43.65, -79.38, false],  // Toronto
  [38.72, -9.14, false],   // Lisbon
  [59.33, 18.07, false],   // Stockholm
  [-1.29, 36.82, false],   // Nairobi
  [30.04, 31.24, false],   // Cairo
];

function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let t = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particles: travel between city pairs
    const PARTICLES = Array.from({ length: 18 }, () => ({
      from: Math.floor(Math.random() * CITIES.length),
      to:   Math.floor(Math.random() * CITIES.length),
      prog: Math.random(),
      speed: 0.0025 + Math.random() * 0.003,
    }));

    const GOLD        = "#B8953F";
    const GOLD_BRIGHT = "#E8C96A";

    // Fixed arc connections between city pairs (drawn once as faint lines)
    const ARC_PAIRS = [[0,1],[0,5],[0,8],[0,11],[0,13],[1,6],[2,9],[3,14],[5,7],[8,15],[9,16],[6,10],[4,12]];

    function getGlobeDims() {
      const W = canvas.width, H = canvas.height;
      const R = Math.min(W * 0.42, H * 0.48);
      const cx = W * 0.74, cy = H * 0.5;
      return { W, H, R, cx, cy };
    }

    function project(latDeg: number, lonDeg: number, rotY: number) {
      const { R, cx, cy } = getGlobeDims();
      const lat = (latDeg * Math.PI) / 180;
      const lon = (lonDeg * Math.PI) / 180;
      const x = Math.cos(lat) * Math.sin(lon - rotY);
      const y = -Math.sin(lat);
      const z = Math.cos(lat) * Math.cos(lon - rotY);
      return { px: cx + R * x, py: cy + R * y, z };
    }

    function draw() {
      t += 0.007;
      const rotY = t * 0.16;
      const { W, H, R, cx, cy } = getGlobeDims();

      ctx.clearRect(0, 0, W, H);

      // ── Atmosphere glow ──────────────────────────────────────────────────────
      const atmos = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.35);
      atmos.addColorStop(0, "rgba(184,149,63,0.0)");
      atmos.addColorStop(0.7, "rgba(184,149,63,0.06)");
      atmos.addColorStop(1, "rgba(15,36,71,0.0)");
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.35, 0, Math.PI * 2);
      ctx.fillStyle = atmos; ctx.fill();

      // ── Globe fill (very dark navy) ──────────────────────────────────────────
      const fillGrd = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.05, cx, cy, R);
      fillGrd.addColorStop(0, "rgba(20,50,100,0.45)");
      fillGrd.addColorStop(1, "rgba(6,14,36,0.65)");
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = fillGrd; ctx.fill();

      // ── Latitude lines ───────────────────────────────────────────────────────
      for (let latDeg = -75; latDeg <= 75; latDeg += 15) {
        const isEq = latDeg === 0;
        ctx.beginPath();
        let first = true;
        for (let lon = 0; lon <= 362; lon += 2) {
          const { px, py, z } = project(latDeg, lon, rotY);
          if (z < 0) { first = true; continue; }
          const fade = Math.max(0, z);
          if (first) { ctx.moveTo(px, py); first = false; } else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = isEq ? `rgba(184,149,63,0.85)` : `rgba(184,149,63,0.28)`;
        ctx.lineWidth   = isEq ? 2 : 0.7;
        ctx.stroke();
      }

      // ── Longitude lines ──────────────────────────────────────────────────────
      for (let lonDeg = 0; lonDeg < 360; lonDeg += 18) {
        ctx.beginPath();
        let first = true;
        for (let lat = -88; lat <= 88; lat += 2) {
          const { px, py, z } = project(lat, lonDeg, rotY);
          if (z < 0) { first = true; continue; }
          if (first) { ctx.moveTo(px, py); first = false; } else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = `rgba(184,149,63,0.22)`;
        ctx.lineWidth = 0.65;
        ctx.stroke();
      }

      // ── Outer rim ────────────────────────────────────────────────────────────
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(184,149,63,0.5)";
      ctx.lineWidth = 1.5; ctx.stroke();

      // ── Equator highlight glow (extra pass) ─────────────────────────────────
      ctx.beginPath();
      ctx.shadowColor = "#B8953F"; ctx.shadowBlur = 8;
      let first = true;
      for (let lon = 0; lon <= 362; lon += 2) {
        const { px, py, z } = project(0, lon, rotY);
        if (z < 0) { first = true; continue; }
        if (first) { ctx.moveTo(px, py); first = false; } else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = "rgba(232,201,106,0.6)";
      ctx.lineWidth = 2.5; ctx.stroke();
      ctx.shadowBlur = 0;

      // ── Static arc connections ───────────────────────────────────────────────
      ARC_PAIRS.forEach(([a, b]) => {
        const [aLat, aLon] = CITIES[a], [bLat, bLon] = CITIES[b];
        const mLat = (aLat + bLat) / 2 - 22;
        const mLon = (aLon + bLon) / 2;
        const pa = project(aLat, aLon, rotY);
        const pb = project(bLat, bLon, rotY);
        const pm = project(mLat, mLon, rotY);
        if (pa.z < 0 || pb.z < 0 || pm.z < -0.1) return;
        const vis = Math.min(pa.z, pb.z);
        ctx.beginPath();
        ctx.moveTo(pa.px, pa.py);
        ctx.quadraticCurveTo(pm.px, pm.py, pb.px, pb.py);
        ctx.strokeStyle = `rgba(184,149,63,${0.18 * vis})`;
        ctx.lineWidth = 0.8;
        ctx.setLineDash([4, 7]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // ── City dots + pulse rings ──────────────────────────────────────────────
      CITIES.forEach(([lat, lon, isHome]) => {
        const { px, py, z } = project(lat, lon, rotY);
        if (z < 0.04) return;
        const alpha = Math.min(1, z * 2.2);

        // Outer pulse ring
        const pulse = (Math.sin(t * 2.2 + lat * 0.15) + 1) * 0.5;
        const ringR = (isHome ? 18 : 10) + pulse * (isHome ? 12 : 7);
        ctx.beginPath(); ctx.arc(px, py, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = isHome
          ? `rgba(232,201,106,${(0.5 - pulse * 0.42) * alpha})`
          : `rgba(184,149,63,${(0.35 - pulse * 0.3) * alpha})`;
        ctx.lineWidth = isHome ? 1.5 : 1;
        ctx.stroke();

        // Inner ring
        const r2 = (isHome ? 9 : 5) + pulse * 3;
        ctx.beginPath(); ctx.arc(px, py, r2, 0, Math.PI * 2);
        ctx.strokeStyle = isHome
          ? `rgba(232,201,106,${(0.7 - pulse * 0.5) * alpha})`
          : `rgba(184,149,63,${(0.45 - pulse * 0.35) * alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Home: third outer ring
        if (isHome) {
          const p3 = (Math.sin(t * 2.2 + 2) + 1) * 0.5;
          ctx.beginPath(); ctx.arc(px, py, 28 + p3 * 14, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(232,201,106,${(0.22 - p3 * 0.18) * alpha})`;
          ctx.lineWidth = 1; ctx.stroke();
        }

        // Glowing dot
        ctx.shadowColor = isHome ? GOLD_BRIGHT : GOLD;
        ctx.shadowBlur  = isHome ? 14 : 6;
        ctx.beginPath(); ctx.arc(px, py, isHome ? 6 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = isHome ? GOLD_BRIGHT : `rgba(232,201,106,${alpha})`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Fairfax label
        if (isHome && z > 0.12) {
          ctx.font = "bold 12px sans-serif";
          ctx.fillStyle = `rgba(232,201,106,${alpha})`;
          ctx.shadowColor = "#000"; ctx.shadowBlur = 4;
          ctx.fillText("★ Fairfax, VA", px + 10, py - 10);
          ctx.shadowBlur = 0;
        }
      });

      // ── Travelling particles ─────────────────────────────────────────────────
      PARTICLES.forEach(p => {
        p.prog += p.speed;
        if (p.prog > 1) { p.prog = 0; p.from = p.to; p.to = Math.floor(Math.random() * CITIES.length); }
        const [fLat, fLon] = CITIES[p.from];
        const [tLat, tLon] = CITIES[p.to];
        const mLat = (fLat + tLat) / 2 - 20;
        const mLon = (fLon + tLon) / 2;
        const tp = p.prog;
        const lat = (1-tp)*(1-tp)*fLat + 2*(1-tp)*tp*mLat + tp*tp*tLat;
        const lon = (1-tp)*(1-tp)*fLon + 2*(1-tp)*tp*mLon + tp*tp*tLon;
        const { px, py, z } = project(lat, lon, rotY);
        if (z < 0) return;
        const fade = (1 - Math.abs(tp - 0.5) * 2) * Math.min(1, z * 2.5);

        // Trail glow
        ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,201,106,${fade * 0.18})`; ctx.fill();

        // Core particle
        ctx.shadowColor = GOLD_BRIGHT; ctx.shadowBlur = 10;
        ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,201,106,${fade * 0.95})`; ctx.fill();
        ctx.shadowBlur = 0;
      });

      // ── People silhouettes — below-right of globe ────────────────────────────
      const silBaseX = cx + R * 0.45;
      const silBaseY = cy + R + 18;
      [0, 1, 2].forEach((i) => {
        const bob = Math.sin(t * 1.1 + i * 1.2) * 3.5;
        const x = silBaseX + i * 34;
        const y = silBaseY + bob;
        const a = 0.3 + i * 0.1;

        ctx.shadowColor = GOLD; ctx.shadowBlur = 6;
        ctx.strokeStyle = `rgba(184,149,63,${a})`;
        ctx.lineWidth = 1.6; ctx.lineCap = "round";

        ctx.beginPath(); ctx.arc(x, y - 26, 7, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x, y - 19); ctx.lineTo(x, y - 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x - 10, y - 13); ctx.lineTo(x + 10, y - 13); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x, y - 2); ctx.lineTo(x - 8, y + 14);
        ctx.moveTo(x, y - 2); ctx.lineTo(x + 8, y + 14); ctx.stroke();
        ctx.shadowBlur = 0;

        // Dashed line to globe rim
        ctx.beginPath();
        ctx.moveTo(x, y - 30);
        ctx.lineTo(cx + R * Math.sin((i - 1) * 0.3), cy + R * 0.88);
        ctx.strokeStyle = `rgba(184,149,63,${a * 0.3})`;
        ctx.lineWidth = 0.6; ctx.setLineDash([3, 6]); ctx.stroke();
        ctx.setLineDash([]);
      });

      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}

// ─── Walking Figures ──────────────────────────────────────────────────────────
// Each walker starts at a different % across the screen so they never bunch up.
// duration = how many seconds to cross full width; startPct = initial left position.
const WALKERS = [
  { startPct: 15, speed: 34, scale: 0.72, opacity: 0.38 },
  { startPct: 48, speed: 40, scale: 0.60, opacity: 0.32 },
  { startPct: 78, speed: 29, scale: 0.88, opacity: 0.48 },
];

function WalkerFigure({ scale, opacity, legDelay = 0 }: { scale: number; opacity: number; legDelay?: number }) {
  const color = "#B8953F";
  const sw = 1.8;
  const dur = 0.5;
  return (
    <svg width={36 * scale} height={52 * scale} viewBox="0 0 36 52" style={{ display: "block", opacity }}>
      {/* Head */}
      <circle cx="18" cy="6" r="5.5" fill="none" stroke={color} strokeWidth={sw} />
      {/* Body */}
      <line x1="18" y1="12" x2="18" y2="30" stroke={color} strokeWidth={sw} strokeLinecap="round" />

      {/* Left arm — swings forward when left leg is back */}
      <motion.line x1="18" y1="18" x2="8" y2="25" stroke={color} strokeWidth={sw} strokeLinecap="round"
        animate={{ x2: [8, 26, 8], y2: [25, 19, 25] }}
        transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay: legDelay + dur / 2 }} />
      {/* Right arm */}
      <motion.line x1="18" y1="18" x2="28" y2="25" stroke={color} strokeWidth={sw} strokeLinecap="round"
        animate={{ x2: [28, 10, 28], y2: [25, 19, 25] }}
        transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay: legDelay + dur / 2 }} />

      {/* Left leg — front foot far left, swings to far right */}
      <motion.line x1="18" y1="30" x2="5" y2="50" stroke={color} strokeWidth={sw} strokeLinecap="round"
        animate={{ x2: [5, 28, 5] }}
        transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay: legDelay }} />
      {/* Right leg — opposite phase */}
      <motion.line x1="18" y1="30" x2="28" y2="50" stroke={color} strokeWidth={sw} strokeLinecap="round"
        animate={{ x2: [28, 5, 28] }}
        transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay: legDelay }} />
    </svg>
  );
}

function WalkingFigures() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
      <div className="absolute bottom-7 left-0 right-0 h-px" style={{ background: "rgba(184,149,63,0.15)" }} />
      {WALKERS.map((w, i) => (
        <motion.div
          key={i}
          className="absolute bottom-7"
          initial={{ left: `${w.startPct}%` }}
          animate={{ left: ["−5%", "105%"] }}
          transition={{
            duration: w.speed,
            // Start mid-journey so the figure appears at startPct immediately,
            // then loops from the left edge.
            delay: -(w.startPct / 100) * w.speed,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <WalkerFigure scale={w.scale} opacity={w.opacity} legDelay={i * 0.08} />
        </motion.div>
      ))}
    </div>
  );
}

const pillars = [
  {
    icon: Briefcase,
    pct: "2%",
    label: "of Services",
    color: "#082B5C",
    lightBg: "#EEF2FF",
    headline: "Pro-Bono & Discounted Services",
    body: "Free or discounted accounting, tax, and advisory work for non-profits and individuals in need.",
    examples: [
      "Tax preparation for low-income households",
      "Bookkeeping support for 501(c)(3) organizations",
      "Financial literacy workshops at no charge",
      "Audit readiness guidance for small non-profits",
    ],
  },
  {
    icon: Heart,
    pct: "2%",
    label: "of Income",
    color: "#B45309",
    lightBg: "#FEF3C7",
    headline: "Community Reinvestment",
    body: "A portion of annual revenue reinvested into DMV financial education, small-business events, and CPA scholarships.",
    examples: [
      "CPA exam scholarship fund for DMV students",
      "Small-business financial literacy sponsorships",
      "Local community event and resource funding",
      "Partnerships with financial empowerment nonprofits",
    ],
  },
  {
    icon: Clock,
    pct: "2%",
    label: "of Time",
    color: "#065F46",
    lightBg: "#D1FAE5",
    headline: "Volunteer & Mentorship Hours",
    body: "One week per year per person dedicated to mentoring future CPAs and volunteering at community events.",
    examples: [
      "CPA exam mentorship for exam candidates",
      "Guest speaking at local colleges and universities",
      "Volunteer tax clinics during filing season",
      "Advisory board participation for community orgs",
    ],
  },
];

export default function CSRPage() {
  return (
    <div className="bg-white pt-[70px]">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "522px", background: "#061020" }}>
        {/* Globe animation */}
        <GlobeCanvas />
        {/* Subtle vignette overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(6,16,32,0.15) 0%, transparent 45%, rgba(6,16,32,0.5) 100%)" }} />
        {/* Walking figures */}
        <WalkingFigures />

        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 relative z-10 py-20 lg:py-28 flex items-center">
          {/* Text — left half only */}
          <div className="w-full lg:w-1/2">
            <motion.p
              className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-4"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            >
              Corporate Social Responsibility
            </motion.p>
            <motion.h1
              className="font-display font-bold text-white mb-5 leading-tight"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.25rem)" }}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            >
              The 2 : 2 : 2 Commitment
            </motion.h1>
            <motion.p
              className="text-white/60 text-base leading-relaxed mb-8 max-w-md"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            >
              At CPA-DMV, professional success carries a community obligation. Our 2:2:2 pledge
              dedicates a portion of what we earn, what we do, and who we are to the people around us.
            </motion.p>

            {/* Summary chips */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
            >
              {["2% of Services", "2% of Income", "2% of Time"].map((chip, i) => (
                <motion.span
                  key={chip}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + i * 0.12, type: "spring", stiffness: 200 }}
                  className="relative overflow-hidden text-sm font-semibold px-5 py-2 rounded-full cursor-default"
                  style={{
                    background: "rgba(184,149,63,0.12)",
                    border: "1px solid rgba(184,149,63,0.45)",
                    color: "#E8C96A",
                    boxShadow: "0 0 12px rgba(184,149,63,0.15)",
                  }}
                  whileHover={{ scale: 1.06, boxShadow: "0 0 22px rgba(184,149,63,0.35)" }}
                >
                  {/* Shimmer sweep */}
                  <motion.span
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.22) 50%, transparent 65%)", skewX: "-15deg" }}
                    animate={{ x: ["-120%", "220%"] }}
                    transition={{ duration: 2.2, delay: 0.8 + i * 0.4, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
                  />
                  {/* Pulsing dot */}
                  <motion.span
                    className="inline-block w-1.5 h-1.5 rounded-full mr-2 flex-shrink-0"
                    style={{ background: "#B8953F", verticalAlign: "middle" }}
                    animate={{ scale: [1, 1.7, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.8, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  {chip}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── What is 2:2:2 ── */}
      <AnimatedSection className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
        <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-3">Our Pledge</p>
        <h2 className="font-display font-bold text-[#082B5C] text-2xl lg:text-3xl mb-4">
          What 2 : 2 : 2 Means
        </h2>
        <p className="text-[#6B7280] text-base leading-relaxed">
          The 2:2:2 model is simple: every year, CPA-DMV gives back <strong className="text-[#082B5C]">2% of our services</strong> as
          pro-bono or discounted work, directs <strong className="text-[#082B5C]">2% of our income</strong> to community
          reinvestment, and volunteers <strong className="text-[#082B5C]">2% of our time</strong> through mentorship and
          education. Together, these three commitments create a meaningful, measurable impact.
        </p>
      </AnimatedSection>

      {/* ── 3 Pillars ── */}
      <section className="bg-[#F7F8FA] py-14 lg:py-18">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col"
              >
                {/* Top accent band */}
                <div className="h-1.5 w-full" style={{ background: p.color }} />

                <div className="p-7 flex flex-col flex-1">
                  {/* Icon + percentage */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: p.lightBg }}>
                      <p.icon size={22} style={{ color: p.color }} strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="font-display font-bold leading-none" style={{ fontSize: "2rem", color: p.color }}>{p.pct}</p>
                      <p className="text-[#6B7280] text-xs font-medium mt-0.5">{p.label}</p>
                    </div>
                  </div>

                  <h3 className="font-bold text-[#1F2937] text-[16px] mb-2">{p.headline}</h3>
                  <p className="text-[#6B7280] text-[13px] leading-relaxed mb-5">{p.body}</p>

                  <ul className="space-y-2 mt-auto">
                    {p.examples.map((ex) => (
                      <li key={ex} className="flex items-start gap-2.5 text-[13px] text-[#374151]">
                        <CheckCircle size={13} className="flex-shrink-0 mt-0.5" style={{ color: p.color }} />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Impact strip ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { value: "2%", label: "Services donated annually", sub: "Pro-bono & discounted work",    icon: "🤝" },
            { value: "2%", label: "Income reinvested locally",  sub: "Scholarships, events, programs", icon: "🌱" },
            { value: "2%", label: "Team time contributed",      sub: "Mentorship & volunteer hours",   icon: "⏱️" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.5, delay: i * 0.13, ease: "easeOut" }}
              whileHover={{ y: -5, boxShadow: "0 12px 36px rgba(8,43,92,0.1)" }}
              className="relative overflow-hidden rounded-2xl text-center px-8 py-9 cursor-default"
              style={{
                background: "#F8F9FB",
                border: "1px solid #E5E8EF",
                boxShadow: "0 2px 12px rgba(8,43,92,0.05)",
                transition: "box-shadow 0.25s ease",
              }}
            >
              {/* Subtle top accent bar */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                style={{ background: "linear-gradient(90deg, #B8953F, #E8C96A, #B8953F)" }}
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.13 + 0.3 }}
              />

              {/* Icon */}
              <motion.div
                className="text-2xl mb-3"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 16, delay: i * 0.13 + 0.2 }}
              >
                {stat.icon}
              </motion.div>

              {/* Value */}
              <motion.p
                className="font-display font-bold text-[#082B5C] mb-1"
                style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 14, delay: i * 0.13 + 0.15 }}
              >
                {stat.value}
              </motion.p>

              <p className="text-[#1F2937] text-sm font-semibold mb-1">{stat.label}</p>
              <p className="text-[#9CA3AF] text-xs">{stat.sub}</p>

              {/* Hover shimmer */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ x: "-100%", opacity: 0 }}
                whileHover={{ x: "200%", opacity: [0, 0.12, 0] }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ background: "linear-gradient(105deg, transparent 40%, rgba(184,149,63,0.3) 50%, transparent 60%)" }}
              />
            </motion.div>
          ))}
        </div>
      </div>


    </div>
  );
}
