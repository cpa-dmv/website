"use client";

import AnimatedSection from "@/components/shared/AnimatedSection";
import { CheckCircle, Shield, Award } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import TurnaroundBadge from "@/components/shared/TurnaroundBadge";

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

              <ul className="space-y-2.5 mb-6 flex-1">
                {cpaPoints.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <CheckCircle size={14} className="text-[#082B5C]/50 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#374151] leading-snug">{b}</span>
                  </li>
                ))}
              </ul>

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

                <TurnaroundBadge size="md" />

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-amber-100">
                  <div className="flex items-center gap-2">
                    {["IDFA", "Court-Ready", "$180/hr"].map((tag) => (
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
