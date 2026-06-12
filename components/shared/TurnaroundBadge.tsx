"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

/**
 * Animated 72-hour turnaround badge.
 * size="sm"  — compact pill for inline use
 * size="md"  — card badge (CDFA credential card)
 * size="lg"  — feature callout
 *
 * Arc sweeps ~270° (¾ of circle) and back — slow, elegant, not a full spinner.
 */
export default function TurnaroundBadge({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const r   = size === "lg" ? 36 : size === "md" ? 28 : 20;
  const cx  = r + 4;
  const cy  = r + 4;
  const circumference = 2 * Math.PI * r;

  // 270° sweep = 75% of circumference
  const sweepEnd = circumference * 0.25; // dashOffset at max fill (circumference - 75% filled)

  if (size === "sm") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-3 py-1"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        >
          <Zap size={11} className="text-[#D97706] fill-[#D97706]" />
        </motion.div>
        <span className="text-[#92400E] text-[11px] font-bold tracking-wide">72-Hr Report</span>
      </motion.div>
    );
  }

  if (size === "lg") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-5 bg-white border border-amber-200 rounded-2xl px-6 py-5 shadow-md w-fit"
      >
        <div className="relative flex-shrink-0" style={{ width: cx * 2, height: cy * 2 }}>
          <svg width={cx * 2} height={cy * 2} className="absolute inset-0 -rotate-90">
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#FEF3C7" strokeWidth={4} />
            <motion.circle
              cx={cx} cy={cy} r={r}
              fill="none" stroke="#D97706" strokeWidth={4}
              strokeLinecap="round"
              strokeDasharray={circumference}
              animate={{ strokeDashoffset: [circumference, sweepEnd, circumference] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="font-display font-bold text-[#D97706] leading-none"
              style={{ fontSize: "1.1rem" }}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 3.5, repeat: Infinity }}
            >
              72
            </motion.span>
          </div>
        </div>
        <div>
          <p className="font-bold text-[#1F2937] text-[15px] leading-tight">72-Hour Turnaround</p>
          <p className="text-[#6B7280] text-[12px] mt-0.5">Preliminary divorce financial report</p>
        </div>
      </motion.div>
    );
  }

  // md — CDFA credential card badge
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-2.5"
    >
      <div className="relative flex-shrink-0" style={{ width: cx * 2, height: cy * 2 }}>
        <svg width={cx * 2} height={cy * 2} className="absolute inset-0 -rotate-90">
          {/* Track */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#FEF3C7" strokeWidth={3} />
          {/* Arc — sweeps to ~270° and back, 7s cycle */}
          <motion.circle
            cx={cx} cy={cy} r={r}
            fill="none" stroke="#D97706" strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: [circumference, sweepEnd, circumference] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-bold text-[#D97706] text-[11px] leading-none">72</span>
        </div>
      </div>
      <div>
        <p className="text-[#92400E] text-[12px] font-bold leading-none">72-Hr Turnaround</p>
        <p className="text-[#B45309] text-[10px] mt-0.5">Preliminary report</p>
      </div>
    </motion.div>
  );
}
