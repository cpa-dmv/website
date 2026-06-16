"use client";

import { motion } from "framer-motion";
import { Mail, Calendar, Clock, MessageCircle } from "lucide-react";

const trustItems = [
  { icon: MessageCircle, label: "Live Chat Available", sub: "Chat with us in real time" },
  { icon: Calendar, label: "Free 30-Min Consultation", sub: "Book online, no commitment" },
  { icon: Mail, label: "support@cpa-dmv.com", sub: "Direct line to our team" },
  { icon: Clock, label: "1 Business Day", sub: "Response time guaranteed" },
];

export default function ContactHero() {
  return (
    <section className="relative bg-[#061A33] pt-32 pb-0 overflow-hidden">

      {/* Subtle grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Gold radial glow top-left */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(184,149,63,0.10) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-2 mb-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-[#F59E0B] text-xs font-semibold uppercase tracking-[0.18em]">
            Get In Touch
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="font-display font-bold text-white text-5xl lg:text-6xl leading-tight mb-5 max-w-3xl"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
        >
          Let&apos;s start a{" "}
          <span className="relative inline-block">
            <span className="text-white">conversation.</span>
            <motion.span
              className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-[#F59E0B]"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.65, delay: 0.6 }}
            />
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          className="text-white/60 text-base lg:text-lg max-w-2xl leading-relaxed mb-14"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          Book a time, send a message, or email us directly. We review all inquiries personally and respond within one business day.
        </motion.p>

        {/* Trust bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.label}
              className="flex items-center gap-3 py-5 px-6 border-r border-white/10 last:border-r-0 group cursor-default"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 + i * 0.09 }}
              whileHover={{ backgroundColor: "rgba(184,149,63,0.06)" }}
            >
              <motion.span
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(184,149,63,0.12)", border: "1px solid rgba(184,149,63,0.25)" }}
                whileHover={{ scale: 1.15, background: "rgba(184,149,63,0.22)" }}
                transition={{ duration: 0.2 }}
              >
                <item.icon size={15} className="text-[#F59E0B]" />
              </motion.span>
              <div className="min-w-0">
                <p className="text-white text-xs font-semibold truncate leading-tight">{item.label}</p>
                <p className="text-white/40 text-[11px] mt-0.5 leading-tight">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
