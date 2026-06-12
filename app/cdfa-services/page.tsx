"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/shared/AnimatedSection";
import TurnaroundBadge from "@/components/shared/TurnaroundBadge";
import { Award, FileText, Scale, PiggyBank, Briefcase, ArrowRight, Zap } from "lucide-react";

const services = [
  { icon: FileText,  label: "Marital Asset Division",       desc: "Complete inventory and equitable distribution analysis." },
  { icon: Scale,     label: "Settlement Scenario Modeling", desc: "Side-by-side financial comparison of settlement options." },
  { icon: PiggyBank, label: "Retirement & QDRO Analysis",   desc: "Pension division, IRA splits, and long-term income impact." },
  { icon: Briefcase, label: "Tax Consequence Modeling",     desc: "How each scenario affects your tax liability now and later." },
  { icon: Award,     label: "Expert Court Testimony",       desc: "Credentialed CDFA testimony and exhibit preparation." },
  { icon: FileText,  label: "Business Valuation (Divorce)", desc: "Fair market value of business interests for settlement." },
];

const steps = [
  { num: "01", label: "Initial consultation",    desc: "We review your situation and confirm scope.", highlight: false },
  { num: "02", label: "Document intake",          desc: "You share financial records securely.", highlight: false },
  { num: "03", label: "72-hr preliminary report", desc: "Preliminary analysis delivered within 72 hours.", highlight: true },
  { num: "04", label: "Full analysis & review",   desc: "Comprehensive report with scenario modeling.", highlight: false },
  { num: "05", label: "Mediation / court ready",  desc: "Exhibits and testimony support if needed.", highlight: false },
];

export default function CDFAPage() {
  return (
    <div className="bg-white pt-[70px]">

      {/* Hero */}
      <section className="bg-[#082B5C] py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-[#D97706]/8"
            animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute -bottom-16 -left-16 w-[300px] h-[300px] rounded-full bg-white/[0.03]"
            animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end gap-8">
            <div className="flex-1">
              <motion.p className="text-[#D97706] text-xs font-bold uppercase tracking-widest mb-4"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                CDFA · Certified Divorce Financial Analyst
              </motion.p>
              <motion.h1
                className="font-display font-bold text-white leading-tight mb-4"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              >
                Financial clarity<br />when life changes.
              </motion.h1>
              <motion.p className="text-white/55 text-base max-w-lg"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
                Objective, court-ready divorce financial analysis from a credentialed CPA and CDFA professional.
              </motion.p>
            </div>

            {/* 72hr animated widget */}
            <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45, type: "spring", stiffness: 160 }} className="flex-shrink-0">
              <div className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-2xl p-6 text-center min-w-[188px]">
                <div className="relative w-16 h-16 mx-auto mb-3">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(217,119,6,0.22)" strokeWidth="4" />
                    <motion.circle cx="32" cy="32" r="28" fill="none" stroke="#D97706" strokeWidth="4"
                      strokeLinecap="round" strokeDasharray={175.9}
                      animate={{ strokeDashoffset: [175.9, 43.97, 175.9] }}
                      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                      <Zap size={22} className="text-[#D97706] fill-[#D97706]" />
                    </motion.div>
                  </div>
                </div>
                <motion.p className="font-display font-bold text-white text-3xl leading-none"
                  animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 2.5, repeat: Infinity }}>
                  72hrs
                </motion.p>
                <p className="text-white/55 text-xs mt-1">Preliminary report</p>
                <p className="text-[#D97706] text-[10px] mt-1 uppercase tracking-widest font-bold">Turnaround</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <p className="text-[#D97706] text-xs font-semibold uppercase tracking-widest mb-3">What We Cover</p>
            <h2 className="font-display font-bold text-[#082B5C] text-2xl lg:text-3xl">CDFA Services</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="bg-[#F7F8FA] hover:bg-white border border-gray-100 hover:border-[#D97706]/20 hover:shadow-md rounded-2xl p-5 transition-all group">
                <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center mb-3">
                  <s.icon size={17} className="text-[#D97706]" strokeWidth={1.8} />
                </div>
                <h3 className="font-bold text-[#1F2937] text-[14px] mb-1 group-hover:text-[#082B5C]">{s.label}</h3>
                <p className="text-[#6B7280] text-[12px] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process — step 03 highlighted */}
      <section className="bg-[#F7F8FA] py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <p className="text-[#D97706] text-xs font-semibold uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="font-display font-bold text-[#082B5C] text-2xl lg:text-3xl">From intake to analysis</h2>
          </AnimatedSection>
          <div className="space-y-3">
            {steps.map((step, i) => (
              <motion.div key={step.num}
                initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                className={`flex items-start gap-4 p-4 rounded-2xl border ${
                  step.highlight ? "bg-amber-50 border-amber-200 shadow-sm" : "bg-white border-gray-100"
                }`}>
                <span className={`font-display font-bold text-[13px] w-7 flex-shrink-0 mt-0.5 ${step.highlight ? "text-[#D97706]" : "text-[#082B5C]/30"}`}>
                  {step.num}
                </span>
                <div className="flex-1 flex items-start justify-between gap-3">
                  <div>
                    <p className={`font-bold text-[14px] ${step.highlight ? "text-[#92400E]" : "text-[#1F2937]"}`}>{step.label}</p>
                    <p className={`text-[12px] mt-0.5 ${step.highlight ? "text-[#B45309]" : "text-[#6B7280]"}`}>{step.desc}</p>
                  </div>
                  {step.highlight && <TurnaroundBadge size="sm" />}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-display font-bold text-[#082B5C] text-2xl lg:text-3xl mb-3">
              Ready to get started?
            </h2>
            <p className="text-[#6B7280] text-base mb-7 max-w-md mx-auto">
              Book a confidential consultation. Preliminary analysis within 72 hours of document intake.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-[#082B5C] hover:bg-[#0d3d7a] text-white font-bold px-7 py-3.5 rounded-full text-sm transition-all group shadow-md">
                Book a Consultation
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a href="mailto:support@cpa-dmv.com"
                className="inline-flex items-center gap-2 border border-gray-200 hover:border-[#082B5C]/30 text-[#374151] font-medium px-6 py-3.5 rounded-full text-sm transition-all">
                Email Us
              </a>
            </div>
            <p className="text-[#9CA3AF] text-xs mt-5">Confidential · IDFA Certified · Contact for pricing</p>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}
