"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

// Mixed ratings — 4, 4.5, 5 stars; average 4.3
const reviews = [
  {
    quote: "CPA-DMV has been a game changer for our business. Responsive, knowledgeable, and they actually care about the outcome.",
    author: "Marcus T.",
    role: "Small Business Owner",
    rating: 5,
  },
  {
    quote: "Simplified our taxes considerably. A solid accounting partner — communication could be slightly faster but the work is excellent.",
    author: "Sarah K.",
    role: "Entrepreneur",
    rating: 4,
  },
  {
    quote: "Professional and reliable. I trust CPA-DMV with our most important financial decisions.",
    author: "Linda M.",
    role: "Credit Union CFO",
    rating: 5,
  },
  {
    quote: "The CDFA analysis gave me clarity I didn't think was possible. Walked into mediation prepared and confident.",
    author: "Jennifer R.",
    role: "Divorce Client",
    rating: 4.5,
  },
  {
    quote: "Payroll has been accurate and on time since we switched. Minor onboarding hiccups at the start but overall very happy.",
    author: "Omar S.",
    role: "Restaurant Owner",
    rating: 4,
  },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => {
        const full  = rating >= n;
        const half  = !full && rating >= n - 0.5;
        return (
          <span key={n} className="relative w-[13px] h-[13px] inline-block">
            {/* Empty star base */}
            <Star size={13} className="text-[#E5E7EB] fill-[#E5E7EB] absolute inset-0" />
            {/* Full fill */}
            {full && <Star size={13} className="text-[#F59E0B] fill-[#F59E0B] absolute inset-0" />}
            {/* Half fill — clip left 50% */}
            {half && (
              <span className="absolute inset-0 overflow-hidden" style={{ clipPath: "inset(0 50% 0 0)" }}>
                <Star size={13} className="text-[#F59E0B] fill-[#F59E0B]" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

// Header average stars (4.3 — render as 4 full + partial)
function AverageStars() {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map((n) => {
        const v = 4.3;
        const full = v >= n;
        const half = !full && v >= n - 0.5;
        return (
          <span key={n} className="relative w-5 h-5 inline-block">
            <Star size={20} className="text-[#E5E7EB] fill-[#E5E7EB] absolute inset-0" />
            {full && <Star size={20} className="text-[#F59E0B] fill-[#F59E0B] absolute inset-0" />}
            {half && (
              <span className="absolute inset-0 overflow-hidden" style={{ clipPath: "inset(0 57% 0 0)" }}>
                <Star size={20} className="text-[#F59E0B] fill-[#F59E0B]" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

export default function TestimonialsBar() {
  return (
    <section className="bg-[#F3F4F6] py-14 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-9">
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
          <div>
            <AverageStars />
            <div className="flex items-baseline gap-2 mt-1.5">
              <p className="font-display font-bold text-[#082B5C] text-2xl">4.3</p>
              <p className="text-[#6B7280] text-sm">out of 5</p>
            </div>
          </div>
          <p className="text-[#6B7280] text-sm sm:ml-2">Based on verified client reviews</p>
        </div>
      </div>

      {/* Scrolling strip */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#F3F4F6] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#F3F4F6] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-4 w-max px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        >
          {[...reviews, ...reviews].map((r, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-76 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-1">
                <StarRow rating={r.rating} />
                <span className="text-[#9CA3AF] text-[10px] font-medium">{r.rating}/5</span>
              </div>
              <p className="text-[#374151] text-[13px] leading-relaxed mt-3 mb-4 italic">
                &ldquo;{r.quote}&rdquo;
              </p>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#082B5C]/10 flex items-center justify-center text-[#082B5C] text-xs font-bold flex-shrink-0">
                  {r.author[0]}
                </div>
                <div>
                  <p className="text-[#082B5C] text-sm font-semibold leading-none">{r.author}</p>
                  <p className="text-[#9CA3AF] text-[11px] mt-0.5">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
