"use client";

import { useState } from "react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Link from "next/link";
import { CheckCircle, Video, Shield, Clock } from "lucide-react";

// 28 days = exactly 4 calendar rows; all days available (Mon–Sun)
const calDays = Array.from({ length: 28 }, (_, i) => i + 1);
const availableDays = calDays.map((d) => d); // every day available

const bullets = [
  { icon: Clock,  text: "45-min initial consultation" },
  { icon: Shield, text: "Confidential & no-obligation" },
  { icon: Video,  text: "Virtual or in-person available" },
];

export default function BookingSection() {
  const [selectedDay, setSelectedDay] = useState(15);

  return (
    <section className="bg-white py-[48px]">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatedSection className="text-center mb-6">
          <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-1.5">No-Obligation</p>
          <h2 className="font-display font-bold text-[#082B5C] text-3xl">Book a Consultation</h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-0 rounded-2xl overflow-hidden shadow-lg border border-gray-100">

          {/* ── Left panel ── */}
          <div className="bg-[#082B5C] px-6 py-7 flex flex-col justify-center gap-4">

            <div>
              <h3 className="font-display font-bold text-white text-[19px] leading-snug mb-1.5">
                Book a Consultation
              </h3>
              <p className="text-white/50 text-[13px] leading-relaxed">
                Confidential session to discuss your needs.
              </p>
            </div>

            <ul className="space-y-2.5">
              {bullets.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={12} className="text-white/65" />
                  </div>
                  <span className="text-white/70 text-[13px]">{text}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-1.5 text-white/30 text-[12px]">
              <CheckCircle size={11} className="text-emerald-400 flex-shrink-0" />
              Free · No commitment required
            </div>
          </div>

          {/* ── Right — calendar ── */}
          <div className="bg-[#F7F8FA] px-5 py-5">

            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-semibold text-[#082B5C] text-[14px]">Select a Date &amp; Time</p>
              </div>
              <div className="flex gap-1">
                {["‹","›"].map((ch) => (
                  <button key={ch} className="w-6 h-6 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#6B7280] text-xs hover:bg-gray-100 leading-none">
                    {ch}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[12px] font-semibold text-[#082B5C] mb-1.5">September 2025</p>

            {/* Weekday labels */}
            <div className="grid grid-cols-7 mb-0.5">
              {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
                <div key={d} className="text-center text-[10px] text-[#9CA3AF] font-medium py-0.5">{d}</div>
              ))}
            </div>

            {/* Day grid — 4 exact rows, no offset so no partial row */}
            <div className="grid grid-cols-7 gap-px mb-3">
              {calDays.map((d) => {
                const isAvail = availableDays.includes(d);
                const isSel   = d === selectedDay;
                return (
                  <button
                    key={d}
                    onClick={() => isAvail && setSelectedDay(d)}
                    style={{ aspectRatio: "1 / 1" }}
                    className={[
                      "rounded-full text-[12px] font-medium transition-all flex items-center justify-center w-full",
                      isSel   ? "bg-[#082B5C] text-white shadow-sm"
                      : isAvail ? "bg-white text-[#082B5C] hover:bg-[#082B5C]/8 cursor-pointer border border-gray-100"
                               : "text-[#6B7280]/30 cursor-default",
                    ].join(" ")}
                  >
                    {d}
                  </button>
                );
              })}
            </div>

            <Link
              href="/contact"
              className="block w-full text-center bg-[#082B5C] hover:bg-[#0d3d7a] text-white font-semibold py-2.5 rounded-xl text-[14px] transition-all"
            >
              Confirm — Sep {selectedDay}
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
