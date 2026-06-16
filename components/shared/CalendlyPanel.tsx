"use client";

import { motion } from "framer-motion";

const bullets = [
  "30-minute initial consultation",
  "Confidential & no-obligation",
  "Virtual or in-person available",
  "Response within one business day",
];

export default function CalendlyPanel() {
  return (
    <div className="bg-[#082B5C] text-white px-10 py-12 flex flex-col justify-center lg:w-[360px] flex-shrink-0">

      {/* Icon — pulse */}
      <motion.div
        className="flex items-center gap-3 mb-5"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <motion.div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
          style={{ background: "rgba(184,149,63,0.2)", border: "1px solid rgba(184,149,63,0.35)" }}
          animate={{ boxShadow: ["0 0 0px rgba(184,149,63,0)", "0 0 18px rgba(184,149,63,0.4)", "0 0 0px rgba(184,149,63,0)"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          📅
        </motion.div>
        <h2 className="font-display font-bold text-white text-2xl leading-tight">
          Book a Free<br />Consultation
        </h2>
      </motion.div>

      {/* Description */}
      <motion.p
        className="text-white/65 text-sm leading-relaxed mb-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.22 }}
      >
        Schedule a confidential consultation to discuss your situation and how we can help.
      </motion.p>

      {/* Bullet points */}
      <ul className="space-y-4">
        {bullets.map((item, i) => (
          <motion.li
            key={item}
            className="flex items-center gap-3 text-sm text-white/80 cursor-default"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.32 + i * 0.1 }}
            whileHover={{ x: 5, color: "#E8C96A" }}
          >
            <motion.span
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(184,149,63,0.2)", border: "1px solid rgba(184,149,63,0.45)" }}
              whileHover={{ scale: 1.25, background: "rgba(184,149,63,0.4)" }}
              transition={{ duration: 0.2 }}
            >
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <motion.path
                  d="M1 4l2.5 2.5L9 1"
                  stroke="#B8953F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                />
              </svg>
            </motion.span>
            <span style={{ transition: "color 0.2s" }}>{item}</span>
          </motion.li>
        ))}
      </ul>

      {/* Animated gold divider */}
      <motion.div
        className="mt-10 h-px"
        style={{ background: "linear-gradient(to right, rgba(184,149,63,0.6), rgba(184,149,63,0))" }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      />

      {/* Bottom note */}
      <motion.p
        className="mt-5 text-xs"
        style={{ color: "rgba(184,149,63,0.7)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        ★ Free · No commitment · Confidential
      </motion.p>

    </div>
  );
}
