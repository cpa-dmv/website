"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Scale, Search, TrendingUp, ArrowRight, CheckCircle, Zap, Clock } from "lucide-react";

// ── Services ──────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "cdfa",
    icon: Scale,
    tag: "CDFA · Divorce",
    name: "Divorce Financial Analysis",
    deliverable: "Preliminary settlement report",
    bullets: [
      "Asset division & liability summary",
      "Settlement scenario comparison",
      "Tax consequence analysis",
    ],
    href: "/cdfa-services",
    accent: "#D97706",
    lightBg: "#FFF8EC",
    chipColor: "#92400E",
  },
  {
    id: "forensics",
    icon: Search,
    tag: "Forensics Audit",
    name: "Forensic Audit Report",
    deliverable: "Preliminary findings report",
    bullets: [
      "Financial irregularity summary",
      "Document trail analysis",
      "Court-ready preliminary memo",
    ],
    href: "/forensics-accounting",
    accent: "#082B5C",
    lightBg: "#EEF4FF",
    chipColor: "#082B5C",
  },
  {
    id: "bizval",
    icon: TrendingUp,
    tag: "Business Valuation",
    name: "Business Valuation",
    deliverable: "Preliminary valuation estimate",
    bullets: [
      "Fair market value range",
      "Asset & income approach summary",
      "Comparable transaction reference",
    ],
    href: "/business-valuation",
    accent: "#059669",
    lightBg: "#ECFDF5",
    chipColor: "#065F46",
  },
];

// ── Animated countdown clock ──────────────────────────────────────────────────

const TICK_HOURS = [72, 65, 54, 43, 36, 24, 18, 12, 8, 4, 1];

function ClockTicker() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1); // 1 = down

  useEffect(() => {
    const id = setInterval(() => {
      setDir(-1);
      setIdx((i) => (i + 1) % TICK_HOURS.length);
    }, 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative overflow-hidden" style={{ width: 110, height: 80 }}>
      <AnimatePresence mode="popLayout" initial={false} custom={dir}>
        <motion.span
          key={idx}
          custom={dir}
          initial={{ y: dir * 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: dir * -40, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center font-display font-extrabold text-white"
          style={{ fontSize: "clamp(3.5rem, 6vw, 5rem)", lineHeight: 1 }}
        >
          {TICK_HOURS[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// ── Arc ring around "HRS" ─────────────────────────────────────────────────────

function PulseRing() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer pulse */}
      <motion.div
        className="absolute rounded-full border-2 border-[#F59E0B]/30"
        style={{ width: 180, height: 180 }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full border border-[#F59E0B]/20"
        style={{ width: 145, height: 145 }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      {/* Inner circle */}
      <div
        className="relative z-10 rounded-full flex flex-col items-center justify-center"
        style={{ width: 112, height: 112, background: "rgba(245,158,11,0.12)", border: "2px solid rgba(245,158,11,0.25)" }}
      >
        <Zap size={18} className="text-[#F59E0B] mb-0.5" fill="#F59E0B" />
        <span className="text-[#F59E0B] text-[11px] font-bold uppercase tracking-widest">hrs</span>
      </div>
    </div>
  );
}

// ── Service tab card ──────────────────────────────────────────────────────────

function ServiceTab({
  svc,
  active,
  onClick,
  index,
}: {
  svc: typeof SERVICES[0];
  active: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="w-full text-left rounded-2xl border transition-all duration-300 overflow-hidden focus:outline-none"
      style={{
        borderColor: active ? `${svc.accent}50` : "rgba(255,255,255,0.08)",
        background: active ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
        boxShadow: active ? `0 0 0 1px ${svc.accent}30, 0 8px 32px rgba(0,0,0,0.25)` : "none",
      }}
    >
      {/* Active top bar */}
      <motion.div
        className="h-[3px] w-full"
        style={{ backgroundColor: svc.accent, originX: 0 }}
        animate={{ scaleX: active ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.35 }}
      />

      <div className="p-5">
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors"
            style={{ backgroundColor: active ? `${svc.accent}25` : "rgba(255,255,255,0.07)" }}
          >
            <svc.icon size={18} style={{ color: active ? svc.accent : "rgba(255,255,255,0.45)" }} strokeWidth={1.8} />
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="text-[10px] uppercase tracking-widest font-semibold mb-0.5 transition-colors"
              style={{ color: active ? svc.accent : "rgba(255,255,255,0.35)" }}
            >
              {svc.tag}
            </p>
            <p
              className="font-bold text-[14px] leading-snug transition-colors"
              style={{ color: active ? "#FFFFFF" : "rgba(255,255,255,0.60)" }}
            >
              {svc.name}
            </p>
          </div>
        </div>

        {/* Expanded detail */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={12} style={{ color: svc.accent }} />
                  <span className="text-white/70 text-[12px]">Delivered within 72 hours:</span>
                </div>
                <ul className="space-y-2">
                  {svc.bullets.map((b, i) => (
                    <motion.li
                      key={b}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 + 0.1 }}
                      className="flex items-start gap-2.5 text-[12px] text-white/65"
                    >
                      <CheckCircle size={12} className="flex-shrink-0 mt-0.5" style={{ color: svc.accent }} />
                      {b}
                    </motion.li>
                  ))}
                </ul>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="mt-4"
                >
                  <Link
                    href={svc.href}
                    className="inline-flex items-center gap-1.5 text-[12px] font-semibold group"
                    style={{ color: svc.accent }}
                  >
                    Learn more
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function TurnaroundUSP() {
  const [active, setActive] = useState(0);

  // Auto-cycle through tabs
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % SERVICES.length), 3800);
    return () => clearInterval(id);
  }, []);

  const activeSvc = SERVICES[active];

  return (
    <section className="relative overflow-hidden" style={{ background: "#041830" }}>
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{ width: 500, height: 500, top: -120, right: -100, background: "radial-gradient(circle, rgba(8,43,92,0.7) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{ width: 400, height: 400, bottom: -80, left: -60, background: "radial-gradient(circle, rgba(217,119,6,0.08) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 items-center">

          {/* ── Left: headline + clock ── */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="flex items-center gap-2.5 mb-7"
            >
              <div className="w-6 h-[2px] bg-[#F59E0B] rounded-full" />
              <span className="text-[#F59E0B] text-[11px] font-bold uppercase tracking-[0.2em]">
                Our Speed Commitment
              </span>
            </motion.div>

            {/* Big number + ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-6 mb-6"
            >
              <ClockTicker />
              <PulseRing />
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-display font-bold text-white leading-tight mb-4"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
            >
              Preliminary report.<br />
              <span className="text-[#F59E0B]">Delivered in 72 hours.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.3 }}
              className="text-white/50 text-[15px] leading-relaxed mb-8 max-w-sm"
            >
              From document intake to preliminary findings — we deliver faster than the industry standard, without cutting corners.
            </motion.p>

            {/* Proof chips */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-wrap gap-2"
            >
              {["Divorce Financial Analysis", "Forensic Audit", "Business Valuation"].map((label, i) => (
                <button
                  key={label}
                  onClick={() => setActive(i)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-semibold transition-all"
                  style={{
                    borderColor: active === i ? SERVICES[i].accent : "rgba(255,255,255,0.12)",
                    background: active === i ? `${SERVICES[i].accent}18` : "transparent",
                    color: active === i ? SERVICES[i].accent : "rgba(255,255,255,0.45)",
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: active === i ? SERVICES[i].accent : "rgba(255,255,255,0.25)" }}
                  />
                  {label}
                </button>
              ))}
            </motion.div>
          </div>

          {/* ── Right: service tabs ── */}
          <div className="flex flex-col gap-3">
            {SERVICES.map((svc, i) => (
              <ServiceTab
                key={svc.id}
                svc={svc}
                active={active === i}
                onClick={() => setActive(i)}
                index={i}
              />
            ))}

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-2"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#e08e00] text-[#082B5C] font-bold px-6 py-3 rounded-full text-sm transition-all shadow-lg group"
              >
                Book a consultation
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
