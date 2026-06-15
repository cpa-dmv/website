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
      <section className="relative overflow-hidden min-h-[520px] flex items-center bg-[#041830]">
        {/* Background photo */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/images/cdfa-hero.jpg"
            alt=""
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
          {/* Dark gradient overlay — heavy left, fades right */}
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(100deg, rgba(4,24,48,0.96) 0%, rgba(8,43,92,0.85) 40%, rgba(8,43,92,0.4) 62%, rgba(4,24,48,0.05) 100%)" }} />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-[580px]">

            {/* Eyebrow */}
            <motion.p
              className="text-[#D97706] text-[11px] font-bold uppercase tracking-[0.22em] mb-5"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            >
              CDFA · Certified Divorce Financial Analyst
            </motion.p>

            {/* Headline */}
            <motion.h1
              className="font-display font-bold text-white leading-[1.08] mb-2"
              style={{ fontSize: "clamp(2.6rem, 5vw, 3.8rem)" }}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
            >
              Financial clarity<br />
              when life changes<span className="text-[#D97706]">.</span>
            </motion.h1>

            {/* Amber underline accent */}
            <motion.div
              className="h-[3px] w-16 bg-[#D97706] rounded-full mb-6"
              initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.32, duration: 0.5 }}
            />

            {/* Body */}
            <motion.p
              className="text-white/65 text-[1.05rem] leading-relaxed mb-8 max-w-[480px]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }}
            >
              Objective, court-ready divorce financial analysis from a credentialed CPA and CDFA professional.
            </motion.p>

            {/* 72-hr badge — horizontal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, type: "spring", stiffness: 180 }}
              className="inline-flex items-center gap-4 bg-white/10 border border-white/20 backdrop-blur-sm rounded-2xl px-5 py-4"
            >
              {/* Arc badge */}
              <div className="relative w-12 h-12 flex-shrink-0">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(217,119,6,0.25)" strokeWidth="3.5" />
                  <motion.circle cx="24" cy="24" r="20" fill="none" stroke="#D97706" strokeWidth="3.5"
                    strokeLinecap="round" strokeDasharray={125.6}
                    animate={{ strokeDashoffset: [125.6, 31.4, 125.6] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    <Zap size={17} className="text-[#D97706] fill-[#D97706]" />
                  </motion.div>
                </div>
              </div>
              {/* Text */}
              <div>
                <p className="font-display font-bold text-white text-2xl leading-none">72hrs</p>
                <p className="text-white/55 text-[12px] mt-0.5">Preliminary report</p>
                <p className="text-[#D97706] text-[9px] mt-0.5 uppercase tracking-widest font-bold">Turnaround</p>
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
                className="bg-[#F7F8FA] hover:bg-white border border-gray-200 hover:border-[#D97706]/30 hover:shadow-md rounded-2xl p-6 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
                  <s.icon size={19} className="text-[#D97706]" strokeWidth={1.8} />
                </div>
                <h3 className="font-bold text-[#1F2937] text-[17px] mb-1.5 group-hover:text-[#082B5C]">{s.label}</h3>
                <p className="text-[#6B7280] text-[13px] leading-relaxed">{s.desc}</p>
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
                className={`flex items-start gap-4 p-5 rounded-2xl border ${
                  step.highlight ? "bg-amber-50 border-amber-200 shadow-sm" : "bg-white border-gray-100"
                }`}>
                <span className={`font-display font-bold text-[15px] w-8 flex-shrink-0 mt-0.5 ${step.highlight ? "text-[#D97706]" : "text-[#082B5C]/30"}`}>
                  {step.num}
                </span>
                <div className="flex-1 flex items-start justify-between gap-3">
                  <div>
                    <p className={`font-bold text-[19px] ${step.highlight ? "text-[#92400E]" : "text-[#1F2937]"}`}>{step.label}</p>
                    <p className={`text-[14px] mt-1 ${step.highlight ? "text-[#B45309]" : "text-[#6B7280]"}`}>{step.desc}</p>
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
