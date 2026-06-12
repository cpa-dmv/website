"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { UserCheck, Clock, ShieldCheck, ArrowRight } from "lucide-react";

const points = [
  {
    icon: UserCheck,
    title: "Your CPA. Always.",
    short: "A named accountant on your file — not a queue.",
    detail: "Every client is assigned a credentialed CPA who knows your situation. Same person, every time.",
    stat: "1:1",
    statLabel: "Dedicated",
    color: "#082B5C",
    lightBg: "rgba(8,43,92,0.06)",
  },
  {
    icon: Clock,
    title: "Clear timelines.",
    short: "Deadlines set upfront, always met.",
    detail: "We commit to turnaround times before we start — no chasing, no surprises.",
    stat: "On time",
    statLabel: "Every time",
    color: "#D97706",
    lightBg: "rgba(217,119,6,0.07)",
  },
  {
    icon: ShieldCheck,
    title: "Right the first time.",
    short: "Every filing reviewed before delivery.",
    detail: "Returns, reports, and filings go through an internal review. We get it right before it leaves our desk.",
    stat: "100%",
    statLabel: "Reviewed",
    color: "#059669",
    lightBg: "rgba(5,150,105,0.07)",
  },
];

export default function ExpertSupport() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="bg-[#F7F8FA] py-14 lg:py-20">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatedSection className="text-center mb-12">
          <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-3">Expert Support</p>
          <h2
            className="font-display font-bold text-[#082B5C] leading-tight"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
          >
            Professional support,<br className="hidden lg:block" /> not a self-service portal.
          </h2>
        </AnimatedSection>

        {/* Interactive cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {points.map((p, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="relative bg-white rounded-2xl border overflow-hidden cursor-default select-none transition-all duration-300"
                style={{
                  borderColor: isActive ? `${p.color}30` : "#F3F4F6",
                  boxShadow: isActive
                    ? `0 8px 32px ${p.color}14, 0 2px 8px rgba(0,0,0,0.06)`
                    : "0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                {/* Animated top bar */}
                <motion.div
                  className="h-[3px] w-full"
                  style={{ background: p.color }}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="p-6">
                  {/* Icon + stat row */}
                  <div className="flex items-start justify-between mb-5">
                    <motion.div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: p.lightBg }}
                      animate={{ scale: isActive ? 1.1 : 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    >
                      <p.icon size={20} style={{ color: p.color }} strokeWidth={1.8} />
                    </motion.div>

                    <motion.div
                      className="text-right"
                      animate={{ opacity: isActive ? 1 : 0.35 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="font-display font-bold text-[18px] leading-none" style={{ color: p.color }}>
                        {p.stat}
                      </p>
                      <p className="text-[10px] text-[#9CA3AF] font-medium mt-0.5 uppercase tracking-wide">
                        {p.statLabel}
                      </p>
                    </motion.div>
                  </div>

                  <h3 className="font-bold text-[#1F2937] text-[15px] leading-snug mb-1.5">{p.title}</h3>

                  {/* Swap short ↔ detail on hover */}
                  <div className="relative min-h-[48px]">
                    <AnimatePresence mode="wait">
                      {isActive ? (
                        <motion.p
                          key="detail"
                          className="text-[13px] leading-relaxed"
                          style={{ color: p.color, opacity: 0.85 }}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                        >
                          {p.detail}
                        </motion.p>
                      ) : (
                        <motion.p
                          key="short"
                          className="text-[#6B7280] text-[13px] leading-relaxed"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                        >
                          {p.short}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Arrow hint on hover */}
                  <motion.div
                    className="mt-4 flex items-center gap-1"
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -6 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span className="text-[11px] font-semibold" style={{ color: p.color }}>Book a consultation</span>
                    <ArrowRight size={11} style={{ color: p.color }} />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <AnimatedSection className="text-center" delay={0.2}>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#082B5C] hover:bg-[#0d3d7a] text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-all shadow-sm group"
          >
            Get Expert Help
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </AnimatedSection>

      </div>
    </section>
  );
}
