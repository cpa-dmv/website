"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    quote: "CPA-DMV has been a game changer for our business. Their team is responsive, knowledgeable, and truly cares.",
    author: "Marcus T.",
    role: "Small Business Owner",
  },
  {
    quote: "They simplified our taxes and saved us thousands. The best accounting partner we've worked with.",
    author: "Sarah K.",
    role: "Entrepreneur",
  },
  {
    quote: "Professional, reliable, and fast. I trust CPA-DMV with the most important financial decisions.",
    author: "Linda M.",
    role: "Credit Union CFO",
  },
  {
    quote: "The CDFA analysis gave me clarity I didn't think was possible. I walked into mediation prepared and confident.",
    author: "Jennifer R.",
    role: "Divorce Client",
  },
  {
    quote: "Payroll has been seamless since we switched. Accurate, on time, every single cycle.",
    author: "Omar S.",
    role: "Restaurant Owner",
  },
];

function StarRow() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13} className="fill-[#F59E0B] text-[#F59E0B]" />
      ))}
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
            <div className="flex gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={20} className="fill-[#F59E0B] text-[#F59E0B]" />
              ))}
            </div>
            <p className="font-display font-bold text-[#082B5C] text-2xl">Excellent</p>
          </div>
          <p className="text-[#6B7280] text-sm sm:ml-2">Based on verified client reviews</p>
        </div>
      </div>

      {/* Scrolling strip */}
      <div className="relative">
        {/* Fade edges */}
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
              <StarRow />
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
