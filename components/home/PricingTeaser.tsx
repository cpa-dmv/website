"use client";

import AnimatedSection from "@/components/shared/AnimatedSection";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

// ── Card definitions — each with different shade & content ───────────────────

const CARDS = [
  {
    id: 0,
    bg: "#082B5C",         // deep navy
    eyebrow: "CPA Advisory & Audits",
    title: "Forensics · CDFA · Attestations",
    label: "Standard Hourly",
    chip1: { text: "CDFA", color: "#F59E0B" },
    chip2: { text: "Audit", color: "#93C5FD" },
    circle1: "rgba(245,158,11,0.13)",
    circle2: "rgba(255,255,255,0.07)",
  },
  {
    id: 1,
    bg: "#0D3D7A",         // medium navy
    eyebrow: "Tax & Bookkeeping",
    title: "Business · Individual · Payroll",
    label: "Fixed-Fee Plans",
    chip1: { text: "Tax", color: "#F59E0B" },
    chip2: { text: "Payroll", color: "#6EE7B7" },
    circle1: "rgba(110,231,183,0.12)",
    circle2: "rgba(255,255,255,0.06)",
  },
  {
    id: 2,
    bg: "#113560",         // slightly lighter navy
    eyebrow: "Business Services",
    title: "AP/AR · HR Advisory · QuickBooks",
    label: "Hourly & Retainer",
    chip1: { text: "HR", color: "#F59E0B" },
    chip2: { text: "AP/AR", color: "#C4B5FD" },
    circle1: "rgba(196,181,253,0.12)",
    circle2: "rgba(255,255,255,0.05)",
  },
  {
    id: 3,
    bg: "#0A2A50",         // darkest
    eyebrow: "Business Valuation",
    title: "Registration · Advisory · Court",
    label: "Engagement-Based",
    chip1: { text: "Court", color: "#F59E0B" },
    chip2: { text: "Biz Val", color: "#FCA5A5" },
    circle1: "rgba(252,165,165,0.10)",
    circle2: "rgba(255,255,255,0.05)",
  },
];

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
  index,        // position in stack (0 = front)
  total,
  isRevealing,
}: {
  card: typeof CARDS[0];
  index: number;
  total: number;
  isRevealing: boolean;
}) {
  const isFront = index === 0;
  // Back cards: offset + rotate + scale
  const yOffset  = index * 14;
  const rotation = index * -2.5;
  const scale    = 1 - index * 0.035;

  return (
    <motion.div
      className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl cursor-default"
      style={{
        backgroundColor: card.bg,
        zIndex: total - index,
      }}
      animate={
        isRevealing && isFront
          ? {
              // Front card slides away to the back
              x: [0, 60, 0],
              y: [0, -40, yOffset * (total - 1)],
              rotate: [0, 8, rotation * (total - 1)],
              scale: [1, 0.92, scale * (total - 1 === 0 ? 1 : (1 - (total - 1) * 0.035))],
              zIndex: [total, 0, 1],
            }
          : {
              y: yOffset,
              rotate: rotation,
              scale,
            }
      }
      transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
    >
      {/* Decorative orbs */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 360 304" preserveAspectRatio="xMidYMid slice">
        <FloatCircle cx={310} cy={55}  r={100} color={card.circle1} delay={0} />
        <FloatCircle cx={30}  cy={260} r={80}  color={card.circle2} delay={1.2} />
        <FloatCircle cx={180} cy={180} r={60}  color="rgba(255,255,255,0.03)" delay={2.5} />
      </svg>

      {/* Content */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
        {/* Top */}
        <div>
          <p className="text-white/45 text-[10px] uppercase tracking-[0.18em] mb-1.5">Contact for pricing</p>
          <h3 className="font-display font-bold text-white text-xl mb-1">{card.eyebrow}</h3>
          <p className="text-white/40 text-xs">{card.title}</p>
        </div>

        {/* Rate + CTA */}
        <div className="flex items-end justify-between">
          <span className="font-display font-bold text-[#F59E0B] text-[1.6rem] leading-none">
            {card.label}
          </span>
          <Link
            href="/contact"
            className="bg-[#F59E0B] hover:bg-[#e08e00] text-[#082B5C] font-bold px-5 py-2.5 rounded-full text-sm transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Chips row */}
        <div className="flex items-center gap-3">
          <span className="text-white/30 text-[11px] uppercase tracking-widest">Services include</span>
          <span className="bg-white/10 text-[11px] font-semibold px-2.5 py-0.5 rounded-full" style={{ color: card.chip1.color }}>
            {card.chip1.text}
          </span>
          <span className="bg-white/10 text-[11px] font-semibold px-2.5 py-0.5 rounded-full" style={{ color: card.chip2.color }}>
            {card.chip2.text}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function CardStack() {
  const [order, setOrder] = useState([0, 1, 2, 3]);
  const [revealing, setRevealing] = useState(false);

  function handleHover() {
    if (revealing) return;
    setRevealing(true);
    setTimeout(() => {
      setOrder((prev) => {
        const next = [...prev];
        const front = next.shift()!;
        next.push(front);
        return next;
      });
      setRevealing(false);
    }, 540);
  }

  return (
    <div
      className="relative h-[304px] w-full"
      style={{ perspective: "1000px" }}
      onMouseEnter={handleHover}
    >
      {order.map((cardIdx, stackPos) => (
        <ServiceCard
          key={cardIdx}
          card={CARDS[cardIdx]}
          index={stackPos}
          total={CARDS.length}
          isRevealing={revealing && stackPos === 0}
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
            <div className="relative" style={{ paddingTop: "40px", paddingBottom: "8px" }}>
              <CardStack />
              <p className="text-center text-[11px] text-[#9CA3AF] mt-5 tracking-wide">
                Hover to explore service categories
              </p>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
