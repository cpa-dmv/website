"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  GraduationCap, Award, Users, ChevronDown,
  Pencil, Calculator, Building2, ChevronLeft, ChevronRight,
} from "lucide-react";
import { events } from "@/lib/events";
import EventCard from "@/components/shared/EventCard";
import AnimatedSection from "@/components/shared/AnimatedSection";

// ─── Data ────────────────────────────────────────────────────────────────────

const SLIDES = [
  {
    id: "exam-prep",
    eyebrow: "FREE TO ATTEND · REGISTRATION REQUIRED",
    Icon: GraduationCap,
    lines: ["CPA Exam", "Preparation"],
    sub: "FAR · AUD · REG · BAR — focused sessions that turn complex topics into testable concepts.",
    img: "/website/images/teaching-slide-1.png",
  },
  {
    id: "cpe",
    eyebrow: "CONTINUING PROFESSIONAL EDUCATION",
    Icon: Award,
    lines: ["CPE Credits"],
    sub: "Tax law, audit standards, and GAAP updates — all qualifying for CPE credit.",
    img: "/website/images/teaching-slide-2.png",
  },
  {
    id: "community",
    eyebrow: "COMMUNITY · PEER LEARNING · OPEN Q&A",
    Icon: Users,
    lines: ["Peer Learning &", "Community"],
    sub: "Open Q&A, real case scenarios, and peer discussion — practical takeaways every session.",
    img: "/website/images/teaching-slide-3.png",
  },
];

const LEARN_CARDS = [
  {
    Icon: GraduationCap,
    title: "CPA Exam Preparation",
    body: "Focused review of FAR, AUD, REG, and BAR — broken into testable concepts so you walk in confident.",
  },
  {
    Icon: Award,
    title: "Continuing Education (CPE)",
    body: "Tax law, audit standards, and accounting updates — all qualifying for CPE credit.",
  },
  {
    Icon: Users,
    title: "Community & Peer Discussion",
    body: "Open Q&A, real case scenarios, and practical takeaways alongside fellow accounting professionals.",
  },
];

const TOPICS = [
  { title: "CPA Exam Sections — FAR, AUD, REG & BAR",       detail: "Deep-dive sessions for each exam section with practice problems, mnemonics, and high-frequency topic breakdowns." },
  { title: "Federal & State Tax Law Updates",                 detail: "Annual updates on IRS changes, new deductions, filing rule changes, and what they mean for individuals and businesses." },
  { title: "Business Entity Structures & Compliance",         detail: "LLCs, S-Corps, C-Corps, partnerships — how they're taxed, when to use each, and key compliance requirements." },
  { title: "Financial Statement Preparation & Analysis",      detail: "Balance sheets, income statements, cash flow — how to read, prepare, and analyze them with accuracy." },
  { title: "Internal Controls & Audit Procedures",            detail: "Core audit concepts, risk assessment, control frameworks, and how auditors evaluate organizational processes." },
  { title: "Ethics for CPAs (qualifying CPE)",                detail: "Professional ethics requirements, AICPA code of conduct, real-world dilemmas, and license maintenance requirements." },
  { title: "QuickBooks & Accounting Technology",              detail: "Hands-on guidance for QuickBooks setup, bank feeds, reporting, and common cleanup situations." },
  { title: "Payroll Compliance & HR Basics",                  detail: "Payroll tax rules, W-2 and 1099 processing, employee classification, and what small business owners need to know." },
];

const AUDIENCE = [
  { Icon: Pencil,     label: "CPA Candidates",           text: "Structured, expert-led review for each exam section — no expensive prep course required." },
  { Icon: Award,      label: "Licensed CPAs",             text: "Fulfill CPE requirements and stay current on tax law and audit standards." },
  { Icon: Calculator, label: "Accounting Professionals",  text: "Deepen skills in bookkeeping, payroll, and compliance topics." },
  { Icon: Building2,  label: "Business Owners",           text: "Understand your financials, taxes, and accounting — without a full-time hire." },
];

// ─── Shared variant (custom = delay in seconds) ───────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay, ease: "easeOut" },
  }),
};

// ─── StatCounter ─────────────────────────────────────────────────────────────

function StatCounter({ value, suffix = "", label }: { value: number | string; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [shown, setShown] = useState<number | string>(typeof value === "number" ? 0 : "—");

  useEffect(() => {
    if (!inView) return;
    if (typeof value === "string") { setShown(value); return; }
    const dur = 1200;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      setShown(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <p className="font-bold mb-1" style={{ color: "#B8953F", fontFamily: "Georgia, serif", fontSize: "clamp(36px, 4vw, 52px)" }}>
        {shown}{suffix}
      </p>
      <p className="font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.45)", fontSize: "11px" }}>
        {label}
      </p>
    </motion.div>
  );
}

// ─── Hero Carousel ────────────────────────────────────────────────────────────

const INTERVAL = 2800;

function HeroCarousel() {
  const [cur, setCur] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const [pk, setPk] = useState(0); // progress key — forces bar reset
  const touchX = useRef<number | null>(null);
  const total = SLIDES.length;

  const go = useCallback((idx: number, d: number) => {
    setDir(d);
    setCur(((idx % total) + total) % total);
    setPk((k) => k + 1);
  }, [total]);

  const next = useCallback(() => go(cur + 1, 1), [cur, go]);
  const prev = useCallback(() => go(cur - 1, -1), [cur, go]);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(next, INTERVAL);
    return () => clearTimeout(id);
  }, [cur, paused, next]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [next, prev]);

  const slide = SLIDES[cur];

  return (
    <div
      role="region"
      aria-label="Teachings overview carousel"
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(560px, 78vh, 740px)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = touchX.current - e.changedTouches[0].clientX;
        if (Math.abs(dx) > 48) dx > 0 ? next() : prev();
        touchX.current = null;
      }}
    >
      {/* Slide */}
      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={cur}
          custom={dir}
          initial={{ x: dir > 0 ? "100%" : "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: dir > 0 ? "-100%" : "100%" }}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          style={{
            backgroundImage: `url('${slide.img}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay — 72% opacity so text is legible over any photo */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "rgba(6, 16, 36, 0.52)" }} />

          <div className="relative z-10 max-w-[680px] mx-auto">
            {/* Icon badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex justify-center mb-7"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(184,149,63,0.14)", border: "1px solid rgba(184,149,63,0.32)" }}
              >
                <slide.Icon size={30} style={{ color: "#B8953F" }} />
              </div>
            </motion.div>

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-bold uppercase mb-5"
              style={{ color: "#B8953F", fontSize: "11px", letterSpacing: "0.12em" }}
            >
              {slide.eyebrow}
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-white font-bold leading-tight mb-5"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(32px, 5.5vw, 52px)" }}
            >
              {slide.lines.map((line, li) => <span key={li} className="block">{line}</span>)}
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25 }}
              className="max-w-[520px] mx-auto leading-relaxed mb-10"
              style={{ color: "rgba(255,255,255,0.65)", fontSize: "clamp(13px, 1.6vw, 15px)" }}
            >
              {slide.sub}
            </motion.p>

            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.42, type: "spring", stiffness: 200, damping: 18 }}
              className="inline-flex"
            >
              <motion.div
                className="rounded-full px-6 py-2.5 flex items-center gap-2"
                style={{
                  background: "rgba(184,149,63,0.12)",
                  border: "1px solid rgba(184,149,63,0.45)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 0 16px rgba(184,149,63,0.18)",
                }}
                animate={{ boxShadow: ["0 0 10px rgba(184,149,63,0.12)", "0 0 22px rgba(184,149,63,0.32)", "0 0 10px rgba(184,149,63,0.12)"] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Gold dot */}
                <motion.span
                  className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "#B8953F" }}
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="font-semibold tracking-wide" style={{ color: "#E8C96A", fontSize: "12px", letterSpacing: "0.06em" }}>
                  Free · 6 hours per session · Registration required
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-[3px]" style={{ background: "rgba(255,255,255,0.1)" }}>
        {!paused && (
          <motion.div
            key={pk}
            className="h-full"
            style={{ background: "#B8953F" }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: INTERVAL / 1000, ease: "linear" }}
          />
        )}
      </div>

      {/* Arrow buttons */}
      {(["prev", "next"] as const).map((label) => (
        <button
          key={label}
          onClick={label === "prev" ? prev : next}
          aria-label={label === "prev" ? "Previous slide" : "Next slide"}
          className="absolute top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-100 opacity-70"
          style={{
            [label === "prev" ? "left" : "right"]: "20px",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.22)",
            backdropFilter: "blur(8px)",
          }}
        >
          {label === "prev" ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      ))}

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i, i >= cur ? 1 : -1)}
            aria-label={`Slide ${i + 1}`}
            style={{
              height: "8px",
              width: i === cur ? "28px" : "8px",
              borderRadius: "4px",
              background: i === cur ? "#B8953F" : "rgba(255,255,255,0.3)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Accordion Row ────────────────────────────────────────────────────────────

function AccordionRow({ topic, index, isOpen, onToggle }: {
  topic: { title: string; detail: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      custom={index * 0.07}
      className="border-b"
      style={{
        borderColor: "#E2DDD4",
        borderLeft: isOpen ? "3px solid #B8953F" : "3px solid transparent",
        transition: "border-left-color 0.3s ease",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-semibold pr-4" style={{ color: "#1A1A1A", fontSize: "15px" }}>
          <span className="font-mono font-bold mr-3" style={{ color: "#B8953F", fontSize: "12px" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          {topic.title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={18} style={{ color: "#5C5C5C" }} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p className="pb-5 leading-relaxed" style={{ color: "#5C5C5C", fontSize: "14px", paddingLeft: "56px", paddingRight: "20px" }}>
              {topic.detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Audience Card ────────────────────────────────────────────────────────────

function AudienceCard({ card, delay, inView }: {
  card: typeof AUDIENCE[number];
  delay: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      custom={delay}
      whileHover={{ y: -4, transition: { duration: 0.22 } }}
      className="rounded-2xl p-6 cursor-default relative overflow-hidden"
      style={{
        background: hovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)",
        borderTop:    hovered ? "2px solid #B8953F"           : "1px solid rgba(255,255,255,0.1)",
        borderRight:  hovered ? "1px solid rgba(184,149,63,0.35)" : "1px solid rgba(255,255,255,0.1)",
        borderBottom: hovered ? "1px solid rgba(184,149,63,0.35)" : "1px solid rgba(255,255,255,0.1)",
        borderLeft:   hovered ? "1px solid rgba(184,149,63,0.35)" : "1px solid rgba(255,255,255,0.1)",
        boxShadow: hovered ? "0 8px 32px rgba(184,149,63,0.18)" : "none",
        transition: "background 0.28s ease, border 0.28s ease, box-shadow 0.28s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Shine sweep on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: "-100%", opacity: 0 }}
        animate={hovered ? { x: "200%", opacity: [0, 0.18, 0] } : { x: "-100%", opacity: 0 }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)",
          transform: "skewX(-15deg)",
        }}
      />

      {/* Icon with spin-in + glow pulse */}
      <motion.div
        className="w-11 h-11 rounded-full flex items-center justify-center mb-4"
        style={{ background: hovered ? "rgba(184,149,63,0.25)" : "rgba(184,149,63,0.15)" }}
        initial={{ rotate: -30, scale: 0.6, opacity: 0 }}
        animate={inView
          ? { rotate: 0, scale: hovered ? 1.18 : 1, opacity: 1 }
          : { rotate: -30, scale: 0.6, opacity: 0 }}
        transition={{ duration: 0.45, delay: delay + 0.15, ease: "easeOut" }}
      >
        <motion.div
          animate={inView ? { rotate: [0, -8, 8, 0] } : {}}
          transition={{ delay: delay + 0.6, duration: 0.4, ease: "easeInOut" }}
        >
          <card.Icon size={20} style={{ color: "#B8953F" }} />
        </motion.div>
      </motion.div>

      {/* Title slides up slightly after card */}
      <motion.h3
        className="font-semibold mb-2 text-white"
        style={{ fontSize: "15px" }}
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.38, delay: delay + 0.22 }}
      >
        {card.label}
      </motion.h3>

      {/* Body fades in last */}
      <motion.p
        className="leading-relaxed"
        style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: delay + 0.32 }}
      >
        {card.text}
      </motion.p>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TeachingsPage() {
  const [openTopic, setOpenTopic] = useState<number | null>(null);

  const learnRef      = useRef<HTMLDivElement>(null);
  const audienceRef   = useRef<HTMLDivElement>(null);
  const instructorRef = useRef<HTMLDivElement>(null);
  const ctaRef        = useRef<HTMLDivElement>(null);

  const learnInView      = useInView(learnRef,      { once: true, margin: "0px 0px -80px 0px" });
  const audienceInView   = useInView(audienceRef,   { once: true, margin: "0px 0px -80px 0px" });
  const instructorInView = useInView(instructorRef, { once: true, margin: "0px 0px -60px 0px" });
  const ctaInView        = useInView(ctaRef,        { once: true, margin: "0px 0px -60px 0px" });

  return (
    <div className="bg-white pt-[70px]">

      {/* ── S1: Hero Carousel ────────────────────────────────────────────── */}
      <HeroCarousel />

      {/* ── S2: What You'll Learn ────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <p className="font-bold uppercase mb-3" style={{ color: "#B8953F", fontSize: "11px", letterSpacing: "0.12em" }}>
              WHAT YOU'LL LEARN
            </p>
            <h2 className="font-bold" style={{ color: "#0F2447", fontFamily: "Georgia, serif", fontSize: "clamp(24px, 3vw, 36px)" }}>
              Sessions Designed for Real-World Practice
            </h2>
          </AnimatedSection>

          <div ref={learnRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LEARN_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                initial="hidden"
                animate={learnInView ? "show" : "hidden"}
                custom={i * 0.15}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="rounded-2xl p-7 flex flex-col"
                style={{ background: "#FFFFFF", border: "1px solid #E2DDD4", transition: "border-color 0.25s, box-shadow 0.25s", cursor: "default" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "#B8953F";
                  el.style.boxShadow = "0 8px 24px rgba(184,149,63,0.12)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "#E2DDD4";
                  el.style.boxShadow = "none";
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 flex-shrink-0" style={{ background: "#FAF5EB" }}>
                  <card.Icon size={22} style={{ color: "#B8953F" }} />
                </div>
                <h3 className="font-bold mb-3" style={{ color: "#0F2447", fontSize: "17px" }}>{card.title}</h3>
                <p className="leading-relaxed" style={{ color: "#5C5C5C", fontSize: "14px" }}>{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── S3: Topics Accordion ─────────────────────────────────────────── */}
      <section id="curriculum" className="py-20" style={{ background: "#F9F8F6" }}>
        <div className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <p className="font-bold uppercase mb-3" style={{ color: "#B8953F", fontSize: "11px", letterSpacing: "0.12em" }}>
              CURRICULUM
            </p>
            <h2 className="font-bold" style={{ color: "#0F2447", fontFamily: "Georgia, serif", fontSize: "clamp(24px, 3vw, 36px)" }}>
              What&apos;s On the Agenda
            </h2>
          </AnimatedSection>

          <div className="rounded-2xl overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid #E2DDD4" }}>
            {TOPICS.map((topic, i) => (
              <AccordionRow
                key={topic.title}
                topic={topic}
                index={i}
                isOpen={openTopic === i}
                onToggle={() => setOpenTopic(openTopic === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── S4: Who Should Attend ────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#0F2447" }}>
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Stat counters */}
          <div className="grid grid-cols-3 gap-6 mb-16">
            <StatCounter value={6} suffix=" hrs" label="Per Session" />
            <StatCounter value="Free"             label="Cost to Attend" />
            <StatCounter value="CPE"              label="Credits Available" />
          </div>

          <AnimatedSection className="text-center mb-10">
            <p className="font-bold uppercase mb-3" style={{ color: "#B8953F", fontSize: "11px", letterSpacing: "0.12em" }}>
              WHO THIS IS FOR
            </p>
            <h2 className="font-bold text-white" style={{ fontFamily: "Georgia, serif", fontSize: "clamp(24px, 3vw, 36px)" }}>
              Built for Everyone in Accounting
            </h2>
          </AnimatedSection>

          <div ref={audienceRef} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {AUDIENCE.map((card, i) => (
              <AudienceCard key={card.label} card={card} delay={i * 0.12} inView={audienceInView} />
            ))}
          </div>
        </div>
      </section>

      {/* ── S5: Upcoming Sessions (preserved) ────────────────────────────── */}
      <section id="sessions" className="bg-[#F7F8FA] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-8">
            <p className="font-bold uppercase mb-3" style={{ color: "#B8953F", fontSize: "11px", letterSpacing: "0.12em" }}>
              UPCOMING SESSIONS
            </p>
            <h2 className="font-display font-bold text-[#082B5C] text-2xl lg:text-3xl mb-2">
              Upcoming Sessions
            </h2>
            <p className="text-[#6B7280]">All sessions are free. Secure your spot below.</p>
          </AnimatedSection>

          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, i) => (
                <AnimatedSection key={event.id} delay={i * 0.1}>
                  <EventCard event={event} />
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-10 border border-gray-100 text-center">
              <p className="text-[#6B7280] mb-4">No sessions currently scheduled.</p>
              <p className="text-sm text-[#6B7280] mb-6">
                Join the notification list to be the first to know when new sessions are announced.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded text-sm transition-all hover:opacity-90"
                style={{ background: "#0F2447" }}
              >
                Notify Me of New Sessions
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── S6: Instructor ───────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div ref={instructorRef} className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-14">

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={instructorInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex-shrink-0 text-center"
            >
              <div
                className="rounded-2xl mx-auto"
                aria-label="Instructor photo placeholder"
                style={{ width: 280, height: 320, background: "#D1D5DB" }}
              />
              <p className="mt-3 text-[13px]" style={{ color: "#5C5C5C" }}>
                Licensed CPA · CDFA · Fairfax, VA
              </p>
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={instructorInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex-1"
            >
              <p className="font-bold uppercase mb-3" style={{ color: "#B8953F", fontSize: "11px", letterSpacing: "0.12em" }}>
                ABOUT THE INSTRUCTOR
              </p>
              <h2 className="font-bold mb-5" style={{ color: "#0F2447", fontFamily: "Georgia, serif", fontSize: "clamp(22px, 3vw, 32px)" }}>
                Led by a Licensed CPA &amp; CDFA
              </h2>
              <p className="leading-relaxed mb-7" style={{ color: "#5C5C5C", fontSize: "15px" }}>
                These sessions are led by a licensed Certified Public Accountant and Certified Divorce Financial Analyst based
                in Fairfax, VA. With years of experience in audit, tax, and financial advisory — and a genuine commitment to
                professional education — each session is practical, current, and built around what practitioners actually need to know.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {["CPA", "CDFA", "AICPA Member"].map((badge, i) => (
                  <motion.span
                    key={badge}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={instructorInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.55 + i * 0.1, type: "spring", stiffness: 220, damping: 14 }}
                    className="px-4 py-1.5 rounded-full font-semibold"
                    style={{ background: "#FAF5EB", color: "#B8953F", border: "1px solid #F0E4C4", fontSize: "13px" }}
                  >
                    {badge}
                  </motion.span>
                ))}
              </div>

              <Link
                href="/about"
                className="font-medium transition-all hover:opacity-80"
                style={{ color: "#B8953F", textDecoration: "underline", textUnderlineOffset: "3px", fontSize: "14px" }}
              >
                Full Bio &amp; Credentials →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── S7: Bottom CTA ───────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#0F2447" }}>
        <div ref={ctaRef} className="max-w-[620px] mx-auto px-6 text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={ctaInView ? "show" : "hidden"}
            custom={0}
            className="font-bold text-white mb-4"
            style={{ fontFamily: "Georgia, serif", fontSize: "clamp(26px, 3.5vw, 38px)" }}
          >
            Ready to Join a Session?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={ctaInView ? "show" : "hidden"}
            custom={0.12}
            className="mb-8"
            style={{ color: "rgba(255,255,255,0.65)", fontSize: "15px" }}
          >
            Sessions are free and open to all. Seats are limited — registration is required.
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={ctaInView ? "show" : "hidden"}
            custom={0.24}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#sessions"
              className="font-semibold text-white px-8 py-3.5 rounded-[6px] inline-block transition-opacity hover:opacity-90"
              style={{ background: "#1A3560", fontSize: "15px" }}
            >
              View Upcoming Sessions
            </a>
            <Link
              href="/contact"
              className="font-semibold inline-block px-8 py-3.5 rounded-[6px] transition-colors"
              style={{ background: "transparent", border: "1.5px solid rgba(255,255,255,0.35)", color: "white", fontSize: "15px" }}
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
