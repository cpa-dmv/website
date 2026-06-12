"use client";

import AnimatedSection from "@/components/shared/AnimatedSection";
import TurnaroundBadge from "@/components/shared/TurnaroundBadge";
import { CheckCircle, Shield, Award } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

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
      {/* Pulsing shield */}
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

      {/* Stats */}
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

      {/* Animated dots */}
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

const cpaPoints = [
  "Tax planning, compliance, and reporting",
  "Accounting and financial statement preparation",
  "Audit readiness for businesses and non-profits",
  "Business advisory and entity setup",
];

const cdfaPoints = [
  "Divorce financial analysis and asset division",
  "Settlement planning with objective financial insight",
  "Retirement account division and QDRO analysis",
  "Tax consequence modeling for settlements",
];

function CertBadge({
  label,
  sub,
  icon: Icon,
  accent,
}: {
  label: string;
  sub: string;
  icon: typeof Shield;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      {/* Seal-style badge */}
      <div className="relative flex-shrink-0">
        <div
          className="w-[72px] h-[72px] rounded-full border-[3px] flex items-center justify-center"
          style={{ borderColor: accent, boxShadow: `0 0 0 4px ${accent}18` }}
        >
          <div className="text-center">
            <span
              className="font-display font-extrabold text-[17px] leading-none tracking-tight block"
              style={{ color: accent }}
            >
              {label}
            </span>
            <Icon size={10} className="mx-auto mt-0.5 opacity-50" style={{ color: accent }} />
          </div>
        </div>
        {/* Verified checkmark */}
        <div
          className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow"
          style={{ backgroundColor: accent }}
        >
          <CheckCircle size={11} className="text-white" />
        </div>
      </div>

      <div>
        <p className="font-semibold text-[#082B5C] text-[15px] leading-tight">{sub}</p>
        <p className="text-[#6B7280] text-[11px] mt-0.5 tracking-wide uppercase">
          {label === "CPA" ? "Licensed · AICPA Affiliated" : "IDFA Certified"}
        </p>
      </div>
    </div>
  );
}

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
            <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
              <CertBadge label="CPA" sub="Certified Public Accountant" icon={Shield} accent="#082B5C" />

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
            <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col relative overflow-hidden">
              {/* Subtle tint */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FAF5EB]/40 to-transparent pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                <CertBadge label="CDFA" sub="Certified Divorce Financial Analyst" icon={Award} accent="#D97706" />

                <ul className="space-y-2.5 mb-4 flex-1">
                  {cdfaPoints.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <CheckCircle size={14} className="text-[#D97706]/60 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#374151] leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mb-4">
                  <TurnaroundBadge size="md" />
                </div>

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
