"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Calendar, Shield, Video, Clock, CheckCircle } from "lucide-react";

const bullets = [
  { icon: Clock,    text: "30-minute initial consultation" },
  { icon: Shield,   text: "Confidential & no-obligation" },
  { icon: Video,    text: "Virtual or in-person available" },
  { icon: CheckCircle, text: "Response within one business day" },
];

const CALENDLY_URL = "https://calendly.com/cpa-dmv-support/30min";

export default function BookingSection() {

  return (
    <section className="bg-[#F7F8FA] py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatedSection className="text-center mb-10">
          <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-1.5">No-Obligation</p>
          <h2 className="font-display font-bold text-[#082B5C] text-3xl">Book a Consultation</h2>
        </AnimatedSection>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden shadow-lg flex flex-col lg:flex-row"
        >
          {/* Left — navy panel */}
          <div className="bg-[#082B5C] text-white px-10 py-12 flex flex-col justify-center lg:w-[360px] flex-shrink-0">
            <motion.div
              className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
                style={{ background: "rgba(184,149,63,0.2)", border: "1px solid rgba(184,149,63,0.35)" }}
                animate={{ boxShadow: ["0 0 0px rgba(184,149,63,0)", "0 0 18px rgba(184,149,63,0.4)", "0 0 0px rgba(184,149,63,0)"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >📅</motion.div>
              <h2 className="font-display font-bold text-white text-2xl leading-tight">
                Book a Free<br />Consultation
              </h2>
            </motion.div>

            <motion.p className="text-white/65 text-sm leading-relaxed mb-8"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}>
              Schedule a confidential consultation to discuss your situation and how we can help.
            </motion.p>

            <ul className="space-y-4 mb-10">
              {bullets.map((item, i) => (
                <motion.li key={item.text}
                  className="flex items-center gap-3 text-sm text-white/80"
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.32 + i * 0.1 }}
                >
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(184,149,63,0.2)", border: "1px solid rgba(184,149,63,0.45)" }}>
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <motion.path d="M1 4l2.5 2.5L9 1" stroke="#B8953F" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }} />
                    </svg>
                  </span>
                  {item.text}
                </motion.li>
              ))}
            </ul>

            {/* CTA button */}
            <motion.a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm transition-all"
              style={{ background: "linear-gradient(135deg, #B8953F, #F59E0B)", color: "#fff" }}
              whileHover={{ scale: 1.03, boxShadow: "0 8px 24px rgba(184,149,63,0.4)" }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Calendar size={15} />
              Schedule Now
            </motion.a>

            <motion.div className="mt-6 h-px"
              style={{ background: "linear-gradient(to right, rgba(184,149,63,0.6), rgba(184,149,63,0))" }}
              initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }} />
            <motion.p className="mt-4 text-xs" style={{ color: "rgba(184,149,63,0.7)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
              ★ Free · No commitment · Confidential
            </motion.p>
          </div>

          {/* Right — visual */}
          <div className="flex-1 bg-white flex items-center justify-center py-14 px-8">
            <div className="text-center max-w-xs">
              <motion.div
                className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center text-4xl"
                style={{ background: "rgba(8,43,92,0.06)", border: "1px solid rgba(8,43,92,0.1)" }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >📅</motion.div>
              <h3 className="font-display font-bold text-[#082B5C] text-xl mb-2">Ready to connect?</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed mb-6">
                Click the button to pick a date and time that works for you. The whole process takes under 2 minutes.
              </p>
              <motion.a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white"
                style={{ background: "#082B5C" }}
                whileHover={{ scale: 1.04, backgroundColor: "#0d3d7a" }}
                whileTap={{ scale: 0.97 }}
              >
                <Calendar size={14} />
                Open Scheduler
              </motion.a>
              <p className="text-[#9CA3AF] text-xs mt-3">Opens a quick booking popup</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
