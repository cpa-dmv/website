"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Heart, Clock, Briefcase, ArrowRight, CheckCircle } from "lucide-react";

const pillars = [
  {
    icon: Briefcase,
    pct: "2%",
    label: "of Services",
    color: "#082B5C",
    lightBg: "#EEF2FF",
    headline: "Pro-Bono & Discounted Services",
    body: "We dedicate 2% of our annual service capacity to free or deeply discounted accounting, tax, and financial advisory work for qualifying non-profits, community organizations, and individuals in financial hardship.",
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
    body: "Two percent of CPA-DMV's annual revenue is directed back into the DMV community — supporting financial education programs, sponsoring local small-business events, and funding scholarships for aspiring accounting professionals.",
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
    body: "Our team commits 2% of working hours — roughly one week per year per person — to mentoring future CPAs, volunteering at financial education events, and advising community organizations pro-bono.",
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
      <section className="bg-[#082B5C] py-16 lg:py-20 relative overflow-hidden">
        {/* Soft orb */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/[0.03] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
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
            className="text-white/60 text-base max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          >
            At CPA-DMV, we believe professional success carries a community obligation.
            Our 2:2:2 pledge dedicates a portion of what we earn, what we do, and who we are
            to the people and organizations around us.
          </motion.p>

          {/* Summary chips */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 mt-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
          >
            {["2% of Services", "2% of Income", "2% of Time"].map((chip) => (
              <span key={chip} className="bg-white/10 border border-white/15 text-white/80 text-sm font-medium px-4 py-1.5 rounded-full">
                {chip}
              </span>
            ))}
          </motion.div>
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
      <AnimatedSection className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-gray-100 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          {[
            { value: "2%", label: "Services donated annually", sub: "Pro-bono & discounted work" },
            { value: "2%", label: "Income reinvested locally", sub: "Scholarships, events, programs" },
            { value: "2%", label: "Team time contributed", sub: "Mentorship & volunteer hours" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white px-8 py-8 text-center">
              <p className="font-display font-bold text-[#082B5C] text-4xl mb-1">{stat.value}</p>
              <p className="text-[#1F2937] text-sm font-semibold mb-1">{stat.label}</p>
              <p className="text-[#9CA3AF] text-xs">{stat.sub}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* ── Why it matters ── */}
      <section className="bg-[#082B5C] py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-3">Why It Matters</p>
            <h2 className="font-display font-bold text-white text-2xl lg:text-3xl mb-5">
              Accounting beyond the balance sheet
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-8">
              The DMV region is home to thousands of small businesses, immigrant entrepreneurs, non-profits, and families
              navigating complex financial decisions without professional guidance. CPA-DMV exists to serve them — not just
              those who can afford premium rates. The 2:2:2 model is our structured, accountable way of making that real every year.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#e08e00] text-[#082B5C] font-bold px-7 py-3.5 rounded-full text-sm transition-all group"
            >
              Partner with us or inquire about pro-bono eligibility
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}
