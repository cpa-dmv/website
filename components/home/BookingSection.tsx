"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Link from "next/link";
import { CheckCircle, Video, Shield, Clock, ChevronLeft, ChevronRight } from "lucide-react";

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// September 2025 starts on Monday (index 1)
const MONTH_START_DOW = 1;
const MONTH_DAYS = 30;
const MONTH_NAME = "September 2025";

const bullets = [
  { icon: Clock,  text: "45-min initial consultation" },
  { icon: Shield, text: "Confidential & no-obligation" },
  { icon: Video,  text: "Virtual or in-person available" },
];

export default function BookingSection() {
  const [selectedDay, setSelectedDay] = useState(15);

  // Build grid: leading empty cells + day numbers
  const cells: (number | null)[] = [
    ...Array(MONTH_START_DOW).fill(null),
    ...Array.from({ length: MONTH_DAYS }, (_, i) => i + 1),
  ];
  // Pad to complete the last row
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <section className="bg-white py-[48px]">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatedSection className="text-center mb-8">
          <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-1.5">No-Obligation</p>
          <h2 className="font-display font-bold text-[#082B5C] text-3xl">Book a Consultation</h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] rounded-2xl overflow-hidden shadow-md border border-gray-200">

          {/* ── Left panel ── */}
          <div className="bg-[#082B5C] px-6 py-8 flex flex-col justify-center gap-5">
            <div>
              <h3 className="font-display font-bold text-white text-[20px] leading-snug mb-1.5">
                Book a Consultation
              </h3>
              <p className="text-white/50 text-[13px] leading-relaxed">
                Confidential session to discuss your needs.
              </p>
            </div>

            <ul className="space-y-3">
              {bullets.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={13} className="text-white/70" />
                  </div>
                  <span className="text-white/75 text-[13px]">{text}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 pt-1">
              <CheckCircle size={12} className="text-emerald-400 flex-shrink-0" />
              <span className="text-white/35 text-[12px]">Free · No commitment required</span>
            </div>
          </div>

          {/* ── Right — calendar ── */}
          <div className="bg-white px-6 py-6">

            {/* Calendar header */}
            <div className="flex items-center justify-between mb-5">
              <p className="font-semibold text-[#082B5C] text-[15px]">Select a Date &amp; Time</p>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[#6B7280] hover:bg-gray-50 hover:border-gray-300 transition-all">
                  <ChevronLeft size={14} />
                </button>
                <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[#6B7280] hover:bg-gray-50 hover:border-gray-300 transition-all">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            <p className="text-[13px] font-bold text-[#082B5C] mb-4">{MONTH_NAME}</p>

            {/* Weekday row */}
            <div className="grid grid-cols-7 mb-2">
              {DAYS_OF_WEEK.map((d) => (
                <div key={d} className="text-center text-[11px] font-semibold text-[#9CA3AF] py-1">{d}</div>
              ))}
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-7 gap-1 mb-5">
              {cells.map((d, i) => {
                if (d === null) return <div key={`e-${i}`} />;
                const isSel = d === selectedDay;
                return (
                  <motion.button
                    key={d}
                    onClick={() => setSelectedDay(d)}
                    whileHover={{ scale: isSel ? 1 : 1.12 }}
                    whileTap={{ scale: 0.93 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className={[
                      "aspect-square rounded-full text-[13px] font-medium flex items-center justify-center w-full transition-colors",
                      isSel
                        ? "bg-[#082B5C] text-white shadow-md"
                        : "text-[#374151] hover:bg-[#082B5C]/8 hover:text-[#082B5C]",
                    ].join(" ")}
                  >
                    <AnimatePresence mode="wait">
                      {isSel ? (
                        <motion.span
                          key="sel"
                          initial={{ scale: 0.7 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0.7 }}
                          transition={{ type: "spring", stiffness: 500, damping: 22 }}
                        >
                          {d}
                        </motion.span>
                      ) : (
                        <span>{d}</span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>

            <Link
              href="/contact"
              className="block w-full text-center bg-[#082B5C] hover:bg-[#0d3d7a] text-white font-semibold py-3 rounded-xl text-[14px] transition-all shadow-sm"
            >
              Confirm — Sep {selectedDay}
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
