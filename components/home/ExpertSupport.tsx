"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { UserCheck, Clock, ShieldCheck, ArrowRight } from "lucide-react";

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ to, suffix = "", duration = 1.4 }: { to: number; suffix?: string; duration?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      // ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to, duration]);

  return <span ref={ref}>{value}{suffix}</span>;
}

// ── Feature bar — fills on scroll ────────────────────────────────────────────
function FillBar({ color, delay }: { color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="h-[3px] w-full rounded-full overflow-hidden bg-gray-100">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: "0%" }}
        animate={{ width: inView ? "100%" : "0%" }}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const features = [
  {
    icon: UserCheck,
    accent: "#082B5C",
    lightBg: "#EEF4FF",
    statTo: 1,
    statSuffix: ":1",
    statLabel: "Dedicated",
    title: "Your CPA. Always.",
    body: "A named, credentialed accountant on every file — not a support ticket queue.",
    barDelay: 0.1,
  },
  {
    icon: Clock,
    accent: "#D97706",
    lightBg: "#FFF8EC",
    statTo: 100,
    statSuffix: "%",
    statLabel: "On-time rate",
    title: "Clear timelines. Met.",
    body: "Deadlines committed upfront, in writing. No chasing, no last-minute surprises.",
    barDelay: 0.25,
  },
  {
    icon: ShieldCheck,
    accent: "#059669",
    lightBg: "#ECFDF5",
    statTo: 100,
    statSuffix: "%",
    statLabel: "Reviewed",
    title: "Right the first time.",
    body: "Every return, report, and filing goes through an internal review before delivery.",
    barDelay: 0.4,
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number]},
  },
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function ExpertSupport() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Two-col header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-end mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-3">Expert Support</p>
            <h2
              className="font-display font-bold text-[#082B5C] leading-tight"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Professional support,<br className="hidden lg:block" /> not a self-service portal.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#082B5C] hover:bg-[#0d3d7a] text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-all shadow-sm group whitespace-nowrap"
            >
              Get Expert Help
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* ── Cards ── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
              className="group relative bg-white rounded-2xl border border-gray-150 overflow-hidden"
              style={{ borderColor: "#E9EAEC", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
            >
              {/* Hover tint overlay */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ backgroundColor: f.lightBg }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              />

              {/* Top fill bar */}
              <div className="px-6 pt-5">
                <FillBar color={f.accent} delay={f.barDelay} />
              </div>

              <div className="relative z-10 p-6 pt-5">

                {/* Icon + stat row */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                    style={{ backgroundColor: f.lightBg }}
                  >
                    <f.icon size={20} style={{ color: f.accent }} strokeWidth={1.8} />
                  </div>

                  <div className="text-right">
                    <p
                      className="font-display font-extrabold leading-none"
                      style={{ color: f.accent, fontSize: "1.5rem" }}
                    >
                      <Counter to={f.statTo} suffix={f.statSuffix} duration={1.5} />
                    </p>
                    <p className="text-[10px] text-[#9CA3AF] uppercase tracking-widest mt-0.5 font-medium">
                      {f.statLabel}
                    </p>
                  </div>
                </div>

                {/* Text */}
                <h3 className="font-bold text-[#1F2937] text-[16px] leading-snug mb-2">
                  {f.title}
                </h3>
                <p className="text-[#6B7280] text-[13px] leading-relaxed">
                  {f.body}
                </p>

                {/* Accent bottom line */}
                <motion.div
                  className="mt-5 h-[2px] rounded-full"
                  style={{ backgroundColor: f.accent }}
                  initial={{ scaleX: 0, originX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.35 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
