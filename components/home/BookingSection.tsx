"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Link from "next/link";
import { CheckCircle, Video, Shield, Clock, ChevronLeft, ChevronRight, Globe } from "lucide-react";

// September 2025 — starts Monday (DOW index 1)
const MONTH_NAME   = "September 2025";
const MONTH_DAYS   = 30;
const MONTH_DOW    = 1; // Monday
const WEEKDAYS     = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const TIME_SLOTS   = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"];

const bullets = [
  { icon: Clock,  text: "45-min initial consultation" },
  { icon: Shield, text: "Confidential & no-obligation" },
  { icon: Video,  text: "Virtual or in-person available" },
];

function getDayLabel(day: number): string {
  const dow = (MONTH_DOW + day - 1) % 7;
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dow];
}

export default function BookingSection() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Build grid cells: leading blanks + day numbers
  const cells: (number | null)[] = [
    ...Array(MONTH_DOW).fill(null),
    ...Array.from({ length: MONTH_DAYS }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const hasSelection = selectedDay !== null && selectedTime !== null;

  return (
    <section className="bg-[#F7F8FA] py-[56px]">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatedSection className="text-center mb-8">
          <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-1.5">No-Obligation</p>
          <h2 className="font-display font-bold text-[#082B5C] text-3xl">Book a Consultation</h2>
        </AnimatedSection>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-[260px_1fr] rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white"
        >

          {/* ── Left panel ── */}
          <div className="bg-[#082B5C] px-6 py-8 flex flex-col gap-5">
            {/* Org label */}
            <p className="text-white/35 text-[10px] uppercase tracking-widest font-semibold">CPA-DMV</p>

            <div>
              <h3 className="font-display font-bold text-white text-[20px] leading-snug mb-2">
                Consultation
              </h3>
              <p className="text-white/45 text-[13px] leading-relaxed">
                Schedule a confidential consultation to discuss your situation and how we can help.
              </p>
            </div>

            <ul className="space-y-3">
              {bullets.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={13} className="text-white/70" />
                  </div>
                  <span className="text-white/70 text-[13px]">{text}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 mt-auto pt-2 border-t border-white/10">
              <CheckCircle size={12} className="text-emerald-400 flex-shrink-0" />
              <span className="text-white/35 text-[11px]">Free · No commitment required</span>
            </div>
          </div>

          {/* ── Right panel ── */}
          <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-gray-100">

            {/* Calendar column */}
            <div className="flex-1 px-6 py-6">
              <div className="flex items-center justify-between mb-5">
                <p className="font-semibold text-[#082B5C] text-[15px]">Select a Date &amp; Time</p>
                <div className="flex items-center gap-1">
                  <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-[#6B7280] hover:bg-gray-50 transition-all">
                    <ChevronLeft size={13} />
                  </button>
                  <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-[#6B7280] hover:bg-gray-50 transition-all">
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>

              <p className="text-[13px] font-bold text-[#082B5C] mb-4">{MONTH_NAME}</p>

              {/* Weekday headers */}
              <div className="grid grid-cols-7 mb-1">
                {WEEKDAYS.map((d) => (
                  <div key={d} className="text-center text-[10px] font-semibold text-[#9CA3AF] py-1">{d}</div>
                ))}
              </div>

              {/* Day grid */}
              <div className="grid grid-cols-7 gap-0.5">
                {cells.map((d, i) => {
                  if (d === null) return <div key={`e-${i}`} />;
                  const isSel = d === selectedDay;
                  return (
                    <motion.button
                      key={d}
                      onClick={() => { setSelectedDay(d); setSelectedTime(null); }}
                      whileHover={{ scale: isSel ? 1 : 1.1 }}
                      whileTap={{ scale: 0.92 }}
                      transition={{ type: "spring", stiffness: 400, damping: 22 }}
                      className={[
                        "aspect-square rounded-full text-[12px] font-medium flex items-center justify-center w-full transition-colors",
                        isSel
                          ? "bg-[#082B5C] text-white shadow-md"
                          : "text-[#374151] hover:bg-[#082B5C]/8 hover:text-[#082B5C]",
                      ].join(" ")}
                    >
                      {d}
                    </motion.button>
                  );
                })}
              </div>

              {/* Timezone */}
              <div className="mt-4 flex items-center gap-1.5 text-[11px] text-[#9CA3AF]">
                <Globe size={11} />
                Eastern Time – US &amp; Canada (GMT-4)
              </div>
            </div>

            {/* Time slots column */}
            <div className="lg:w-[160px] flex-shrink-0 px-4 py-6">
              <AnimatePresence mode="wait">
                {selectedDay ? (
                  <motion.div
                    key={selectedDay}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="text-[12px] font-bold text-[#082B5C] mb-3">
                      {getDayLabel(selectedDay)}, Sep {selectedDay}
                    </p>
                    <div className="flex flex-col gap-2">
                      {TIME_SLOTS.map((slot, i) => {
                        const isSel = slot === selectedTime;
                        return (
                          <motion.button
                            key={slot}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06 }}
                            onClick={() => setSelectedTime(slot)}
                            className={[
                              "w-full py-2 px-3 rounded-lg border text-[12px] font-semibold transition-all text-center",
                              isSel
                                ? "bg-[#082B5C] text-white border-[#082B5C] shadow-sm"
                                : "border-[#082B5C]/25 text-[#082B5C] hover:bg-[#082B5C]/6 hover:border-[#082B5C]/40",
                            ].join(" ")}
                          >
                            {slot}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex items-center justify-center"
                  >
                    <p className="text-[11px] text-[#9CA3AF] text-center leading-relaxed">
                      Select a date to see available times
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Confirm button */}
              <AnimatePresence>
                {hasSelection && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4"
                  >
                    <Link
                      href="/contact"
                      className="block w-full text-center bg-[#082B5C] hover:bg-[#0d3d7a] text-white font-bold py-2.5 rounded-xl text-[12px] transition-all shadow-sm"
                    >
                      Confirm
                    </Link>
                    <p className="text-[10px] text-[#9CA3AF] text-center mt-1.5">
                      Sep {selectedDay} · {selectedTime}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
