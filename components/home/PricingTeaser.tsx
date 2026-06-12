"use client";

import AnimatedSection from "@/components/shared/AnimatedSection";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

// ── Alternating dark / light theme cards ─────────────────────────────────────

const CARDS = [
  {
    id: 0,
    // DARK
    bg: "#082B5C",
    textPrimary: "#FFFFFF",
    textSub: "rgba(255,255,255,0.45)",
    textLabel: "#F59E0B",
    chipBg: "rgba(255,255,255,0.12)",
    circle1: "rgba(245,158,11,0.14)",
    circle2: "rgba(255,255,255,0.06)",
    eyebrow: "CPA Advisory & Audits",
    title: "Forensics · CDFA · Attestations",
    label: "Standard Hourly",
    chip1: { text: "CDFA",  accentColor: "#F59E0B" },
    chip2: { text: "Audit", accentColor: "#93C5FD" },
  },
  {
    id: 1,
    // LIGHT
    bg: "#EEF4FF",
    textPrimary: "#082B5C",
    textSub: "rgba(8,43,92,0.45)",
    textLabel: "#D97706",
    chipBg: "rgba(8,43,92,0.08)",
    circle1: "rgba(8,43,92,0.06)",
    circle2: "rgba(8,43,92,0.03)",
    eyebrow: "Tax & Bookkeeping",
    title: "Business · Individual · Payroll",
    label: "Fixed-Fee Plans",
    chip1: { text: "Tax",    accentColor: "#082B5C" },
    chip2: { text: "Payroll",accentColor: "#059669" },
  },
  {
    id: 2,
    // DARK (different shade)
    bg: "#0D3D7A",
    textPrimary: "#FFFFFF",
    textSub: "rgba(255,255,255,0.45)",
    textLabel: "#F59E0B",
    chipBg: "rgba(255,255,255,0.12)",
    circle1: "rgba(110,231,183,0.13)",
    circle2: "rgba(255,255,255,0.05)",
    eyebrow: "Business Services",
    title: "AP/AR · HR Advisory · QuickBooks",
    label: "Hourly & Retainer",
    chip1: { text: "HR",    accentColor: "#F59E0B" },
    chip2: { text: "AP/AR", accentColor: "#6EE7B7" },
  },
  {
    id: 3,
    // LIGHT (warm tint)
    bg: "#FFF8EC",
    textPrimary: "#92400E",
    textSub: "rgba(146,64,14,0.45)",
    textLabel: "#B45309",
    chipBg: "rgba(146,64,14,0.08)",
    circle1: "rgba(217,119,6,0.10)",
    circle2: "rgba(146,64,14,0.05)",
    eyebrow: "Business Valuation",
    title: "Registration · Advisory · Court",
    label: "Engagement-Based",
    chip1: { text: "Court",   accentColor: "#B45309" },
    chip2: { text: "Biz Val", accentColor: "#D97706" },
  },
];

const AUTO_INTERVAL = 1500;

function FloatCircle({
  cx, cy, r, color, delay,
}: { cx: number; cy: number; r: number; color: string; delay: number }) {
  return (
    <motion.circle
      cx={cx} cy={cy} r={r} fill={color}
      animate={{ cy: [cy, cy - 10, cy] }}
      transition={{ duration: 6 + delay * 1.5, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function ServiceCard({
  card,
  stackIndex,  // 0 = front
  total,
  isExiting,   // true only for the front card during transition
}: {
  card: typeof CARDS[0];
  stackIndex: number;
  total: number;
  isExiting: boolean;
}) {
  const isFront = stackIndex === 0;
  const yOffset  = stackIndex * 13;
  const rotation = stackIndex * -2.2;
  const scale    = 1 - stackIndex * 0.032;

  return (
    <motion.div
      layout
      className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl"
      style={{
        backgroundColor: card.bg,
        zIndex: total - stackIndex,
        originX: 0.5,
        originY: 0.5,
        border: card.id === 1 || card.id === 3 ? "1.5px solid rgba(8,43,92,0.18)" : "none",
      }}
      animate={
        isExiting
          ? {
              y: -60,
              x: 30,
              rotate: 10,
              scale: 0.88,
              opacity: 0,
            }
          : {
              y: yOffset,
              rotate: rotation,
              scale,
              opacity: 1,
              x: 0,
            }
      }
      transition={
        isExiting
          ? { duration: 0.38, ease: [0.4, 0, 0.6, 1] }
          : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {/* Decorative orbs */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 360 304" preserveAspectRatio="xMidYMid slice">
        <FloatCircle cx={310} cy={55}  r={110} color={card.circle1} delay={0} />
        <FloatCircle cx={30}  cy={260} r={85}  color={card.circle2} delay={1.3} />
        <FloatCircle cx={180} cy={175} r={65}  color="rgba(255,255,255,0.025)" delay={2.6} />
      </svg>

      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
        {/* Top */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] mb-1.5" style={{ color: card.textSub }}>
            Contact for pricing
          </p>
          <h3 className="font-display font-bold text-xl mb-1" style={{ color: card.textPrimary }}>
            {card.eyebrow}
          </h3>
          <p className="text-xs" style={{ color: card.textSub }}>{card.title}</p>
        </div>

        {/* Rate + CTA */}
        <div className="flex items-end justify-between">
          <span className="font-display font-bold text-[1.55rem] leading-none" style={{ color: card.textLabel }}>
            {card.label}
          </span>
          <Link
            href="/contact"
            className="bg-[#F59E0B] hover:bg-[#e08e00] text-[#082B5C] font-bold px-5 py-2.5 rounded-full text-sm transition-colors shadow-sm"
          >
            Get Started
          </Link>
        </div>

        {/* Chips */}
        <div className="flex items-center gap-2.5">
          <span className="text-[10px] uppercase tracking-widest" style={{ color: card.textSub }}>Services include</span>
          {[card.chip1, card.chip2].map((chip) => (
            <span
              key={chip.text}
              className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
              style={{ backgroundColor: card.chipBg, color: chip.accentColor }}
            >
              {chip.text}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function CardStack() {
  const [order, setOrder] = useState([0, 1, 2, 3]);
  const [exiting, setExiting] = useState(false);

  const advance = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => {
      setOrder((prev) => {
        const next = [...prev];
        const front = next.shift()!;
        next.push(front);
        return next;
      });
      setExiting(false);
    }, 380);
  }, [exiting]);

  // Auto-advance every 3s
  useEffect(() => {
    const id = setInterval(advance, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [advance]);

  return (
    <div
      className="relative h-[304px] w-full cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={advance}
    >
      {order.map((cardIdx, stackPos) => (
        <ServiceCard
          key={cardIdx}
          card={CARDS[cardIdx]}
          stackIndex={stackPos}
          total={CARDS.length}
          isExiting={exiting && stackPos === 0}
        />
      ))}
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────

export default function PricingTeaser() {
  return (
    <section className="bg-[#F7F8FA] py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left — copy */}
          <AnimatedSection direction="left">
            <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-4">Transparent Pricing</p>
            <h2
              className="font-display font-bold text-[#082B5C] leading-tight mb-5"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
            >
              What&apos;s your<br />time worth?
            </h2>
            <ul className="space-y-3 mb-8">
              {[
                "Clear, upfront rates — no surprises",
                "Flat rates, hourly, and fixed-fee engagements",
                "Free 30-minute consultation to scope your needs",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-[#1F2937]">
                  <CheckCircle size={16} className="text-[#F59E0B] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#082B5C] hover:bg-[#0d3d7a] text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-all shadow-lg"
            >
              View Pricing
            </Link>
          </AnimatedSection>

          {/* Right — stacked cards */}
          <AnimatedSection direction="right">
            <div className="flex flex-col items-center">
              <div className="relative w-full" style={{ paddingTop: "42px", paddingBottom: "0px" }}>
                <CardStack />
              </div>
              {/* <p className="text-center text-[11px] text-[#9CA3AF] mt-4 tracking-wide select-none">
                Auto-cycling · Click to advance
              </p> */}
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
