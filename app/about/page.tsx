"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Shield, Award, Star, CheckCircle, ArrowRight,
  BookOpen, Search, Scale, BarChart3, Monitor, FileText,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const PRAVEEN = {
  name: "Dr. Praveen Singhal",
  photo: "/website/images/praveen.png",
  role: "Founder & Principal",
  cert: "CDFA",
  certFull: "Certified Divorce Financial Analyst",
  certColor: "#D97706",
  certBg: "#FFF8EC",
  affiliation: "IDFA Certified",
  specialties: [
    { icon: Scale,    text: "Forensic & Financial Investigations" },
    { icon: Search,   text: "Divorce Financial Analysis" },
    { icon: BarChart3,text: "Government Accounting Systems" },
    { icon: FileText, text: "Individuals Taxation & Compliance" },
    { icon: Shield,   text: "Court-Ready Financial Reporting" },
  ],
  highlights: [
    "Forensic accounting & financial investigations for individuals and businesses.",
    "Divorce financial analysis for asset division, income analysis & support calculations.",
    "Government accounting systems and compliance with accuracy and control.",
    "Court-ready financial reports — reliable, professional, and easy to understand.",
    "Tax planning, compliance, and IRS representation with precision and care.",
  ],
};

const HIMANSHU = {
  name: "Himanshu Kalra",
  photo: "/website/images/himanshu.png",
  role: "CPA Partner",
  cert: "CPA",
  certFull: "Certified Public Accountant",
  certColor: "#082B5C",
  certBg: "#EEF4FF",
  affiliation: "AICPA Member",
  specialties: [
    { icon: Monitor,  text: "ERP, QuickBooks & Excel Expert" },
    { icon: FileText, text: "Tax Support & Compliance" },
    { icon: Search,   text: "Audit Support & Documentation" },
    { icon: BookOpen, text: "Bookkeeping" },
    { icon: BarChart3,text: "Reconciliations & Month-End Close" },
  ],
  highlights: [
    "Managed accounting operations including AP, vendor invoices, reconciliations, and month-end close for 150+ retail outlets.",
    "Prepared audit working papers and supported statutory audits, GST, and TDS compliance.",
    "Built automation tools using Excel & Outlook to improve workflows and reduce manual effort.",
    "Experienced with QuickBooks, ERP systems, and advanced Excel for efficient and reliable reporting.",
  ],
};

const TRUST_VALUES = [
  { icon: "🎯", label: "Accurate & Reliable",      desc: "We focus on quality, accuracy, and detail." },
  { icon: "🔒", label: "Confidential & Secure",    desc: "Your information is safe and always protected." },
  { icon: "⚡", label: "Timely & Dependable",      desc: "On-time reporting and quick turnaround." },
  { icon: "🤝", label: "Personalized Approach",    desc: "Every client is unique. Every solution is tailored." },
  { icon: "📊", label: "Insightful & Strategic",   desc: "Data-driven insights that help you grow." },
];

const TOOLS = [
  { name: "QuickBooks", color: "#2CA01C" },
  { name: "Zoho Books", color: "#E8432D" },
  { name: "Excel",      color: "#217346" },
];

const COMBINED = [
  { icon: "🏆", label: "Combined Expertise",    sub: "Accounting · Tax · Audit · Forensics · Advisory" },
  { icon: "✅", label: "Certified. Credible.",  sub: "Professionals you can rely on." },
  { icon: "🎯", label: "Client Focused",        sub: "Timely, confidential, accurate." },
  { icon: "📍", label: "Local Commitment",      sub: "Fairfax, VA — serving the DMV area." },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function CertBadge({ cert, color, bg }: { cert: string; color: string; bg: string }) {
  return (
    <div className="relative flex-shrink-0 w-[88px] h-[88px]">
      <svg width="88" height="88" viewBox="0 0 88 88" className="absolute inset-0">
        <circle cx="44" cy="44" r="40" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="5 3" opacity="0.35" />
        <circle cx="44" cy="44" r="33" fill="none" stroke={color} strokeWidth="2.5" opacity="0.8" />
        <circle cx="44" cy="44" r="30" fill={bg} />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45 * Math.PI) / 180;
          return (
            <line key={i}
              x1={44 + 37 * Math.cos(a)} y1={44 + 37 * Math.sin(a)}
              x2={44 + 40 * Math.cos(a)} y2={44 + 40 * Math.sin(a)}
              stroke={color} strokeWidth="1.8" opacity="0.45"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display font-extrabold leading-none tracking-tight"
          style={{ color, fontSize: cert === "CDFA" ? "14px" : "18px" }}>
          {cert}
        </span>
        <Star size={9} fill={color} color={color} className="mt-0.5" />
      </div>
      <div className="absolute -bottom-1 -right-1 w-[20px] h-[20px] rounded-full flex items-center justify-center border-2 border-white shadow-sm"
        style={{ backgroundColor: color }}>
        <CheckCircle size={11} className="text-white" strokeWidth={2.5} />
      </div>
    </div>
  );
}

function FounderCard({ person, index }: { person: typeof PRAVEEN; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isFounder = index === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-3xl overflow-hidden border flex flex-col"
      style={{
        borderColor: `${person.certColor}25`,
        background: `linear-gradient(160deg, ${person.certBg} 0%, #FFFFFF 45%)`,
        boxShadow: `0 4px 32px ${person.certColor}12`,
      }}
    >
      {/* Top accent bar */}
      <motion.div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${person.certColor}, ${person.certColor}60)` }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
      />

      {/* Founder ribbon */}
      {isFounder && (
        <div
          className="absolute top-5 right-0 px-3 py-1 text-white text-[10px] font-bold uppercase tracking-widest rounded-l-full shadow"
          style={{ backgroundColor: person.certColor }}
        >
          Founder
        </div>
      )}

      <div className="p-7 flex flex-col flex-1 gap-5">

        {/* Header */}
        <div className="flex items-start gap-4">
          {/* Headshot */}
          <div className="relative flex-shrink-0">
            <div className="w-[90px] h-[110px] rounded-2xl overflow-hidden" style={{ border: `2px solid ${person.certColor}30` }}>
              <img
                src={person.photo}
                alt={person.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          <div className="pl-8 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: person.certColor }}>
              {person.role}
            </p>
            <h3 className="font-display font-bold text-[#082B5C] text-[1.2rem] leading-snug mb-1">
              {person.name}
            </h3>
            <p className="text-[12px] font-semibold" style={{ color: person.certColor }}>
              {person.certFull}
            </p>
            <p className="text-[11px] text-[#9CA3AF] mt-0.5 uppercase tracking-wide">{person.affiliation}</p>
          </div>
        </div>

        {/* Specialties */}
        <div>
          <p className="text-[10px] text-[#9CA3AF] uppercase tracking-widest font-semibold mb-2.5">Specialties</p>
          <ul className="space-y-2">
            {person.specialties.map((s, i) => (
              <motion.li
                key={s.text}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.15 + 0.4 + i * 0.07 }}
                className="flex items-center gap-2.5"
              >
                <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${person.certColor}12` }}>
                  <s.icon size={12} style={{ color: person.certColor }} strokeWidth={1.8} />
                </div>
                <span className="text-[13px] font-semibold text-[#082B5C]">{s.text}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Highlights */}
        <div className="flex-1">
          <p className="text-[10px] text-[#9CA3AF] uppercase tracking-widest font-semibold mb-2.5 flex items-center gap-1.5">
            <BarChart3 size={10} /> Experience Highlights
          </p>
          <ul className="space-y-2">
            {person.highlights.map((h, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.15 + 0.6 + i * 0.06 }}
                className="flex items-start gap-2 text-[12px] text-[#6B7280] leading-relaxed"
              >
                <CheckCircle size={11} className="flex-shrink-0 mt-0.5" style={{ color: person.certColor }} />
                {h}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Bottom explore link */}
        <div className="pt-4 border-t" style={{ borderColor: `${person.certColor}15` }}>
          <Link
            href={person.cert === "CDFA" ? "/cdfa-services" : "/taxation"}
            className="inline-flex items-center gap-1.5 text-[13px] font-bold group"
            style={{ color: person.certColor }}
          >
            Explore {person.cert} services
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="bg-white pt-[70px]">

      {/* ── Hero ── */}
      <section className="bg-[#041830] relative overflow-hidden">

        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />

        {/* Gold glow bottom-left */}
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(184,149,63,0.08) 0%, transparent 65%)" }} />
        {/* Blue glow top-right */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(8,43,92,0.7) 0%, transparent 70%)" }} />

        {/* Main content */}
        <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-[90px] pb-0 text-center">

          {/* Eyebrow */}
          <motion.div className="flex items-center justify-center gap-2 mb-5"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <motion.span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"
              animate={{ scale: [1, 1.7, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }} />
            <p className="text-[#F59E0B] text-xs font-bold uppercase tracking-[0.22em]">About CPA-DMV</p>
            <motion.span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"
              animate={{ scale: [1, 1.7, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
          </motion.div>

          {/* Heading */}
          <motion.h1 className="font-display font-bold text-white leading-tight mb-5"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)" }}>
            {["Certified.", "Experienced."].map((word, i) => (
              <motion.span key={word} className="inline-block mr-4"
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.14, duration: 0.5 }}>
                {word}
              </motion.span>
            ))}
            <br />
            <motion.span className="text-[#F59E0B] inline-block relative"
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52, duration: 0.5 }}>
              Committed.
              <motion.span className="absolute -bottom-1 left-0 h-[2px] rounded-full w-full"
                style={{ background: "linear-gradient(to right, #F59E0B, rgba(184,149,63,0.2))" }}
                initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
                transition={{ delay: 0.95, duration: 0.65 }} />
            </motion.span>
          </motion.h1>

          <motion.p className="text-white/55 text-base max-w-2xl mx-auto leading-relaxed mb-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            We are two experienced finance professionals dedicated to delivering accurate, reliable, and insightful financial solutions for individuals, businesses, and professionals.
          </motion.p>

          {/* Expertise pills */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl mx-auto pb-12">
            {COMBINED.map((c, i) => (
              <motion.div key={c.label}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden bg-white/[0.05] border border-white/10 rounded-2xl px-4 py-4 text-left cursor-default group"
                whileHover={{ y: -5, borderColor: "rgba(184,149,63,0.45)" }}
                transition={{ duration: 0.15 }}
              >
                {/* Gold top border on hover */}
                <motion.div
                  className="absolute top-0 left-0 h-[2px] rounded-t-2xl w-full"
                  style={{ background: "linear-gradient(to right, #F59E0B, rgba(184,149,63,0.3))" }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="text-xl inline-block"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.15 }}
                >{c.icon}</motion.span>
                <p className="text-white/90 text-[12px] font-bold mt-2 leading-tight">{c.label}</p>
                <p className="text-white/40 text-[11px] mt-0.5 leading-snug">{c.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats bar — sits at the very bottom of hero */}
        <div className="border-t border-white/10">
          <div className="max-w-[1100px] mx-auto grid grid-cols-2 lg:grid-cols-4">
            {[
              { value: "15+", label: "Years of Experience" },
              { value: "500+", label: "Clients Served" },
              { value: "CDFA", label: "Certified Analyst" },
              { value: "CPA", label: "Licensed & Affiliated" },
            ].map((s, i) => (
              <motion.div key={s.label}
                className="py-5 px-6 text-center border-r border-white/10 last:border-r-0"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 + i * 0.08 }}
                whileHover={{ backgroundColor: "rgba(184,149,63,0.06)" }}
              >
                <p className="text-[#F59E0B] text-xl font-bold leading-none">{s.value}</p>
                <p className="text-white/40 text-[11px] mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founders — Praveen LEFT, Himanshu RIGHT ── */}
      <section className="bg-[#F7F8FA] py-16 lg:py-20">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-3">Our Team</p>
            <h2 className="font-display font-bold text-[#082B5C] text-3xl lg:text-4xl">
              Meet the professionals
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            <FounderCard person={PRAVEEN}  index={0} />
            <FounderCard person={HIMANSHU} index={1} />
          </div>
        </div>
      </section>

      {/* ── Tools & Systems ── */}
      <section className="bg-white py-14">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            className="text-center text-[11px] text-[#9CA3AF] uppercase tracking-widest font-semibold mb-8"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            Tools &amp; Systems We Use
          </motion.p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {TOOLS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.07, y: -3 }}
                className="bg-[#F7F8FA] border border-gray-200 rounded-2xl px-8 py-4 text-center shadow-sm cursor-default"
              >
                <p className="font-bold text-[15px]" style={{ color: t.color }}>{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust values strip ── */}
      <section className="bg-[#041830] py-12">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-white/10 rounded-2xl overflow-hidden">
            {TRUST_VALUES.map((v, i) => (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                className="bg-[#041830] px-5 py-6 text-center transition-colors"
              >
                <div className="text-2xl mb-2">{v.icon}</div>
                <p className="text-white/90 text-[15px] font-bold leading-snug mb-1">{v.label}</p>
                <p className="text-white/40 text-[12px] leading-snug">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-white py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-3">Get Started</p>
            <h2 className="font-display font-bold text-[#082B5C] text-3xl mb-4">
              Ready to work with us?
            </h2>
            <p className="text-[#6B7280] mb-8">Start with a free, no-obligation consultation.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#082B5C] hover:bg-[#0d3d7a] text-white font-bold px-8 py-3.5 rounded-full text-sm transition-all shadow-lg group"
              >
                Book a Consultation
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/cdfa-services"
                className="inline-flex items-center gap-2 border border-[#D97706]/40 text-[#D97706] hover:bg-amber-50 font-semibold px-7 py-3.5 rounded-full text-sm transition-all"
              >
                Explore CDFA Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
