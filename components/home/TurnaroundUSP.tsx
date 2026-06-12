"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Search, TrendingUp, ArrowRight, CheckCircle, Zap } from "lucide-react";

const SERVICES = [
  {
    id: "cdfa",
    icon: Scale,
    tag: "CDFA · Divorce",
    name: "Divorce Financial Analysis",
    bullets: ["Asset division & liability summary", "Settlement scenario comparison", "Tax consequence analysis"],
    href: "/cdfa-services",
    accent: "#D97706",
  },
  {
    id: "forensics",
    icon: Search,
    tag: "Forensics Audit",
    name: "Forensic Audit Report",
    bullets: ["Financial irregularity summary", "Document trail analysis", "Court-ready preliminary memo"],
    href: "/forensics-accounting",
    accent: "#60A5FA",
  },
  {
    id: "bizval",
    icon: TrendingUp,
    tag: "Business Valuation",
    name: "Business Valuation",
    bullets: ["Fair market value range", "Asset & income approach summary", "Comparable transaction reference"],
    href: "/business-valuation",
    accent: "#34D399",
  },
];

export default function TurnaroundUSP() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % SERVICES.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden" style={{ background: "#041830" }}>
      {/* Subtle orb */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{ width: 480, height: 480, top: -100, right: -80, background: "radial-gradient(circle, rgba(8,43,92,0.65) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 9, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 items-center">

          {/* ── Left ── */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4 }}
              className="flex items-center gap-2.5 mb-5"
            >
              <Zap size={13} className="text-[#F59E0B]" fill="#F59E0B" />
              <span className="text-[#F59E0B] text-[11px] font-bold uppercase tracking-[0.2em]">Speed Commitment</span>
            </motion.div>

            {/* Headline — Roboto, not display */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.1 }}
              className="mb-4"
            >
              <div className="flex items-end gap-3 mb-2">
                <span className="font-roboto font-extrabold text-white leading-none" style={{ fontSize: "clamp(3.5rem, 7vw, 5.5rem)" }}>
                  72
                </span>
                <span className="text-[#F59E0B] font-bold text-[1.1rem] mb-2 uppercase tracking-widest">hrs</span>
              </div>
              <p className="font-roboto font-bold text-white/90 text-[1.2rem] leading-snug">
                Preliminary report, delivered.<br />
                <span className="text-white/45 font-normal text-[1rem]">Faster than the industry standard.</span>
              </p>
            </motion.div>

            {/* Service filter chips */}
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-2 mt-5"
            >
              {SERVICES.map((svc, i) => (
                <button
                  key={svc.id}
                  onClick={() => setActive(i)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-semibold transition-all duration-200"
                  style={{
                    borderColor: active === i ? svc.accent : "rgba(255,255,255,0.12)",
                    background:  active === i ? `${svc.accent}18` : "transparent",
                    color:       active === i ? svc.accent : "rgba(255,255,255,0.40)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: active === i ? svc.accent : "rgba(255,255,255,0.2)" }} />
                  {svc.tag}
                </button>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.45 }}
              className="mt-6"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#e08e00] text-[#082B5C] font-bold px-6 py-2.5 rounded-full text-sm transition-all shadow-lg group"
              >
                Book a consultation
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* ── Right: tabs ── */}
          <div className="flex flex-col gap-2.5">
            {SERVICES.map((svc, i) => {
              const isActive = active === i;
              return (
                <motion.button
                  key={svc.id}
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.09 }}
                  className="w-full text-left rounded-2xl border overflow-hidden focus:outline-none transition-all duration-300"
                  style={{
                    borderColor: isActive ? `${svc.accent}45` : "rgba(255,255,255,0.07)",
                    background:  isActive ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.025)",
                  }}
                >
                  {/* Sweep bar */}
                  <motion.div
                    className="h-[2px]"
                    style={{ backgroundColor: svc.accent, originX: 0 }}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="px-4 py-3.5">
                    {/* Header row */}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                        style={{ backgroundColor: isActive ? `${svc.accent}22` : "rgba(255,255,255,0.06)" }}
                      >
                        <svc.icon size={15} style={{ color: isActive ? svc.accent : "rgba(255,255,255,0.35)" }} strokeWidth={1.8} />
                      </div>
                      <div className="flex-1">
                        <p className="text-[9px] uppercase tracking-widest font-semibold transition-colors"
                          style={{ color: isActive ? svc.accent : "rgba(255,255,255,0.30)" }}>
                          {svc.tag}
                        </p>
                        <p className="text-[13px] font-bold transition-colors"
                          style={{ color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.55)" }}>
                          {svc.name}
                        </p>
                      </div>
                    </div>

                    {/* Expanded bullets */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden mt-3 pt-3 border-t border-white/10 space-y-1.5"
                        >
                          {svc.bullets.map((b, j) => (
                            <motion.li
                              key={b}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: j * 0.06 + 0.05 }}
                              className="flex items-center gap-2 text-[11px] text-white/55"
                            >
                              <CheckCircle size={10} style={{ color: svc.accent }} className="flex-shrink-0" />
                              {b}
                            </motion.li>
                          ))}
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}>
                            <Link href={svc.href}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold mt-2 group"
                              style={{ color: svc.accent }}>
                              Learn more <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                          </motion.div>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
