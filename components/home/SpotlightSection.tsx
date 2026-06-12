"use client";

import AnimatedSection from "@/components/shared/AnimatedSection";
import { CheckCircle, Shield, Award, Star } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// ── Bullet points — 3 each ───────────────────────────────────────────────────

const cpaPoints = [
  "Tax planning, compliance & reporting",
  "Audits, reviews & financial statements",
  "Business advisory & entity setup",
];

const cdfaPoints = [
  "Divorce financial analysis & asset division",
  "Settlement scenario & tax consequence modeling",
  "Retirement (QDRO) & expert court testimony",
];

// ── Certification seal badge ──────────────────────────────────────────────────

function CertSeal({
  label,
  accent,
  isGold,
}: {
  label: string;
  accent: string;
  isGold?: boolean;
}) {
  return (
    <div className="relative flex-shrink-0 w-[76px] h-[76px]">
      {/* Outer decorative ring with notches (SVG) */}
      <svg width="76" height="76" viewBox="0 0 76 76" className="absolute inset-0">
        {/* Dashed outer ring */}
        <circle
          cx="38" cy="38" r="35"
          fill="none"
          stroke={accent}
          strokeWidth="1.5"
          strokeDasharray="4 3"
          opacity="0.4"
        />
        {/* Solid inner ring */}
        <circle
          cx="38" cy="38" r="29"
          fill="none"
          stroke={accent}
          strokeWidth="2.5"
          opacity="0.9"
        />
        {/* Inner fill */}
        <circle cx="38" cy="38" r="26" fill={isGold ? "#FEF3C7" : "#EEF2FF"} />
        {/* 8 small tick marks around outer ring */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const x1 = 38 + 32 * Math.cos(angle);
          const y1 = 38 + 32 * Math.sin(angle);
          const x2 = 38 + 35 * Math.cos(angle);
          const y2 = 38 + 35 * Math.sin(angle);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={accent} strokeWidth="1.5" opacity="0.5" />
          );
        })}
      </svg>

      {/* Label text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-display font-extrabold leading-none tracking-tight"
          style={{ color: accent, fontSize: label === "CDFA" ? "13px" : "16px" }}
        >
          {label}
        </span>
        <div className="mt-1">
          {isGold
            ? <Star size={8} fill={accent} color={accent} />
            : <Shield size={8} color={accent} strokeWidth={2} />
          }
        </div>
      </div>

      {/* Verified badge */}
      <div
        className="absolute -bottom-0.5 -right-0.5 w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-white shadow-sm"
        style={{ backgroundColor: accent }}
      >
        <CheckCircle size={10} className="text-white" strokeWidth={2.5} />
      </div>
    </div>
  );
}

// ── CPA pulse widget ──────────────────────────────────────────────────────────

const credentialStats = [
  { label: "Licensed", sub: "Virginia CPA" },
  { label: "Affiliated", sub: "AICPA Member" },
  { label: "Active", sub: "In good standing" },
];

function CPACredentialWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="mb-4 bg-[#082B5C]/[0.04] border border-[#082B5C]/10 rounded-xl px-4 py-3 flex items-center gap-4"
    >
      <div className="relative flex-shrink-0 w-9 h-9 flex items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-full bg-[#082B5C]/10"
          animate={{ scale: [1, 1.55, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full bg-[#082B5C]/8"
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <Shield size={16} className="text-[#082B5C] relative z-10" strokeWidth={2} />
      </div>

      <div className="flex gap-4">
        {credentialStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 + i * 0.1 }}
            className="flex flex-col"
          >
            <span className="text-[11px] font-bold text-[#082B5C] leading-none">{s.label}</span>
            <span className="text-[9px] text-[#082B5C]/50 mt-0.5 uppercase tracking-wide">{s.sub}</span>
          </motion.div>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-1">
        {[0, 0.3, 0.6].map((delay, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[#082B5C]"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity, delay }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ── 72-Hr widget: typewriter countdown ────────────────────────────────────────

const HOURS = [72, 68, 54, 36, 24, 12, 8, 4, 1];

function CountdownWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="mb-4 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 flex items-center gap-3 overflow-hidden"
    >
      {/* Digit flip */}
      <div className="relative flex-shrink-0 w-[52px] h-[36px] bg-[#D97706] rounded-lg flex items-center justify-center overflow-hidden shadow-sm">
        {HOURS.map((h, i) => (
          <motion.span
            key={h}
            className="absolute font-display font-extrabold text-white text-[18px] leading-none"
            initial={{ y: "100%", opacity: 0 }}
            animate={{
              y: ["100%", "0%", "0%", "-100%"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.6,
              delay: i * 1.4,
              repeat: Infinity,
              repeatDelay: HOURS.length * 1.4 - 1.6,
              ease: "easeInOut",
              times: [0, 0.15, 0.75, 1],
            }}
          >
            {h}
          </motion.span>
        ))}
      </div>

      <div className="flex flex-col min-w-0">
        <span className="text-[12px] font-bold text-[#92400E] leading-none">Hour countdown</span>
        <span className="text-[10px] text-[#B45309] mt-0.5">Preliminary report delivered</span>
      </div>

      {/* Animated progress bar */}
      <div className="ml-auto flex-shrink-0 w-16 h-1.5 bg-amber-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#D97706] rounded-full"
          animate={{ width: ["100%", "0%"] }}
          transition={{
            duration: HOURS.length * 1.4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function SpotlightSection() {
  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatedSection className="text-center mb-10">
          <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-3">Our Credentials</p>
          <h2
            className="font-display font-bold text-[#082B5C]"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.6rem)" }}
          >
            Dual credentials. Deeper expertise.
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* CPA */}
          <AnimatedSection direction="left">
            <div className="rounded-2xl p-7 border border-[#082B5C]/12 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col" style={{ background: "linear-gradient(135deg, #EEF4FF 0%, #F5F8FF 60%, #EDF3FF 100%)" }}>

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <CertSeal label="CPA" accent="#082B5C" />
                <div>
                  <p className="font-semibold text-[#082B5C] text-[15px] leading-tight">Certified Public Accountant</p>
                  <p className="text-[#6B7280] text-[11px] mt-0.5 tracking-wide uppercase">Licensed · AICPA Affiliated</p>
                </div>
              </div>

              <ul className="space-y-2.5 mb-4 flex-1">
                {cpaPoints.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <CheckCircle size={14} className="text-[#082B5C]/50 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#374151] leading-snug">{b}</span>
                  </li>
                ))}
              </ul>

              <CPACredentialWidget />

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  {["AICPA", "VA CPA", "BOA"].map((tag) => (
                    <span key={tag} className="text-[10px] font-semibold text-[#082B5C]/60 bg-[#082B5C]/6 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href="/taxation" className="text-sm font-semibold text-[#082B5C] hover:text-[#F59E0B] transition-colors">
                  Explore →
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* CDFA */}
          <AnimatedSection direction="right">
            <div className="bg-white rounded-2xl p-7 border border-amber-200 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FAF5EB]/50 to-transparent pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <CertSeal label="CDFA" accent="#D97706" isGold />
                  <div>
                    <p className="font-semibold text-[#082B5C] text-[15px] leading-tight">Certified Divorce Financial Analyst</p>
                    <p className="text-[#6B7280] text-[11px] mt-0.5 tracking-wide uppercase">IDFA Certified</p>
                  </div>
                </div>

                <ul className="space-y-2.5 mb-4 flex-1">
                  {cdfaPoints.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <CheckCircle size={14} className="text-[#D97706]/60 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#374151] leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>

                <CountdownWidget />

                <div className="flex items-center justify-between pt-4 border-t border-amber-100">
                  <div className="flex items-center gap-2">
                    {["IDFA", "Court-Ready", "Contact for pricing"].map((tag) => (
                      <span key={tag} className="text-[10px] font-semibold text-[#D97706] bg-amber-50 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href="/cdfa-services" className="text-sm font-semibold text-[#D97706] hover:text-[#082B5C] transition-colors">
                    Explore →
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
