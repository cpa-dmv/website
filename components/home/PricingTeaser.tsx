"use client";

import AnimatedSection from "@/components/shared/AnimatedSection";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

function FloatCircle({
  cx, cy, r, color, delay,
}: { cx: number; cy: number; r: number; color: string; delay: number }) {
  return (
    <motion.circle
      cx={cx} cy={cy} r={r} fill={color}
      animate={{ cy: [cy, cy - 12, cy] }}
      transition={{ duration: 6 + delay * 1.5, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

export default function PricingTeaser() {
  return (
    <section className="bg-[#F7F8FA] py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left — copy */}
          <AnimatedSection direction="left">
            <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-4">Transparent Pricing</p>
            <h2
              className="font-display font-bold text-[#082B5C] leading-tight mb-5"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
            >
              What&apos;s your<br />time worth?
            </h2>
            <ul className="space-y-3 mb-8">
              {[
                "Clear, upfront rates — no surprises",
                "Flat rates, hourly, and fixed-fee engagements",
                "Free 30-minute consultation to scope your needs",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-[#1F2937]">
                  <CheckCircle size={16} className="text-[#F59E0B] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/contact#pricing"
              className="inline-flex items-center gap-2 bg-[#082B5C] hover:bg-[#0d3d7a] text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-all shadow-lg"
            >
              View Pricing
            </Link>
          </AnimatedSection>

          {/* Right — animated dashboard card */}
          <AnimatedSection direction="right">
            <div className="relative h-[440px] flex items-center justify-center">

              {/* Shadow card behind */}
              <div className="absolute top-5 left-5 right-5 bottom-1 bg-[#082B5C]/10 rounded-3xl rotate-2 scale-[0.98]" />

              {/* Main blue card */}
              <motion.div
                className="relative w-full rounded-3xl overflow-hidden shadow-2xl bg-[#082B5C]"
                style={{ height: 380 }}
                whileHover={{ scale: 1.015, boxShadow: "0 32px 64px rgba(8,43,92,0.35)" }}
                transition={{ duration: 0.3 }}
              >
                {/* 3 decorative circles — SVG layer */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 360 380"
                  preserveAspectRatio="xMidYMid slice"
                >
                  {/* Top-right — gold tint */}
                  <FloatCircle cx={310} cy={55}  r={100} color="rgba(245,158,11,0.13)"  delay={0} />
                  {/* Bottom-left — blue tint */}
                  <FloatCircle cx={30}  cy={330} r={90}  color="rgba(255,255,255,0.07)" delay={1} />
                  {/* Centre — subtle white */}
                  <FloatCircle cx={185} cy={200} r={70}  color="rgba(255,255,255,0.04)" delay={2} />
                </svg>

                {/* Card content */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-between">

                  {/* Top */}
                  <div>
                    <motion.p
                      className="text-white/50 text-[10px] uppercase tracking-[0.18em] mb-1.5"
                      initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: 0.2 }}
                    >
                      Standard Hourly Rate
                    </motion.p>
                    <motion.h3
                      className="font-display font-bold text-white text-xl mb-1"
                      initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: 0.3 }}
                    >
                      CPA Advisory &amp; Audits
                    </motion.h3>
                    <motion.p
                      className="text-white/40 text-xs"
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                      viewport={{ once: true }} transition={{ delay: 0.4 }}
                    >
                      Forensics · CDFA · Attestations
                    </motion.p>
                  </div>

                  {/* Rate + CTA */}
                  <motion.div
                    className="flex items-end justify-between"
                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: 0.45 }}
                  >
                    <div className="flex items-end gap-1">
                      <span
                        className="font-display font-bold text-[#F59E0B] leading-none"
                        style={{ fontSize: "clamp(2.8rem, 5vw, 3.8rem)" }}
                      >
                        $180
                      </span>
                      <span className="text-white/50 text-base mb-2">/hr</span>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                      <Link
                        href="/contact"
                        className="bg-[#F59E0B] hover:bg-[#e08e00] text-[#082B5C] font-bold px-5 py-2.5 rounded-full text-sm transition-colors block"
                      >
                        Get Started
                      </Link>
                    </motion.div>
                  </motion.div>

                  {/* Mini stat row — no top border/line */}
                  <motion.div
                    className="flex gap-6"
                    initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: 0.55 }}
                  >
                    {[
                      { label: "Payroll", val: "$100/cycle" },
                      { label: "AP / AR", val: "$20/hr" },
                      { label: "Audits",  val: "Contact" },
                    ].map((s) => (
                      <div key={s.label}>
                        <p className="text-white/35 text-[10px] uppercase tracking-wide">{s.label}</p>
                        <p className="text-white/80 text-xs font-semibold mt-0.5">{s.val}</p>
                      </div>
                    ))}
                  </motion.div>

                </div>
              </motion.div>

              {/* Floating chips */}
              {[
                { label: "CDFA", rate: "$180/hr", pos: "-top-3 -right-3", delay: 0 },
                { label: "HR",   rate: "$20/hr",  pos: "-bottom-3 -left-3", delay: 1 },
              ].map((chip) => (
                <motion.div
                  key={chip.label}
                  className={`absolute bg-white rounded-2xl shadow-xl px-4 py-2.5 border border-gray-100 ${chip.pos}`}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: chip.delay }}
                >
                  <span className="text-[#082B5C] font-bold text-sm">{chip.label}</span>
                  <span className="text-[#F59E0B] font-bold text-sm ml-2">{chip.rate}</span>
                </motion.div>
              ))}

            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
