"use client";

import { useEffect, useState } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Link from "next/link";
import { Zap, FileCheck, RefreshCw, Clock } from "lucide-react";

/* ── Card 1: Instant Expert Match ─────────────────────────────────── */
function ExpertMatchVisual() {
  const [active, setActive] = useState(0);
  const experts = [
    { initial: "H", color: "bg-blue-500", label: "Himanshu K." },
    { initial: "P", color: "bg-emerald-500", label: "Praveen S." },
    { initial: "C", color: "bg-purple-500", label: "CPA-DMV" },
  ];

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % experts.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="mt-4 p-3 bg-[#F7F8FA] rounded-xl border border-gray-100">
      <div className="flex items-center gap-2 mb-3">
        {experts.map((e, i) => (
          <motion.div
            key={i}
            animate={{
              scale: active === i ? 1.2 : 1,
              y: active === i ? -3 : 0,
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`w-8 h-8 rounded-full ${e.color} flex items-center justify-center text-white text-[11px] font-bold shadow-sm flex-shrink-0`}
          >
            {e.initial}
          </motion.div>
        ))}
        <div className="flex-1 min-w-0 ml-1">
          <motion.p
            key={active}
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-[10px] font-semibold text-[#082B5C] truncate"
          >
            {experts[active].label}
          </motion.p>
          <p className="text-[9px] text-[#6B7280]">Senior CPA · Available now</p>
        </div>
      </div>
      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#082B5C] rounded-full"
          animate={{ width: ["20%", "75%", "20%"] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <p className="text-[9px] text-[#6B7280] mt-1.5">Matching in progress…</p>
    </div>
  );
}

/* ── Card 2: Zero Manual Entry ─────────────────────────────────────── */
const formRows = [
  { label: "Tax forms", status: "Auto-filled" },
  { label: "Bank statements", status: "Auto-filled" },
  { label: "Receipts", status: "Done" },
];
const cycleStates = ["Fetching", "Auto-filled", "Done"] as const;

function ZeroEntryVisual() {
  const [states, setStates] = useState([0, 0, 0]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const cycle = (rowIdx: number, stateIdx: number) => {
      timers.push(
        setTimeout(() => {
          setStates((prev) => {
            const next = [...prev];
            next[rowIdx] = stateIdx;
            return next;
          });
          if (stateIdx < cycleStates.length - 1) {
            cycle(rowIdx, stateIdx + 1);
          } else {
            setTimeout(() => {
              setStates((prev) => {
                const next = [...prev];
                next[rowIdx] = 0;
                return next;
              });
              // restart after brief pause
              setTimeout(() => cycle(rowIdx, 0), 600);
            }, 2400);
          }
        }, rowIdx * 700 + stateIdx * 900)
      );
    };
    formRows.forEach((_, i) => cycle(i, 0));
    return () => timers.forEach(clearTimeout);
  }, []);

  const colorMap: Record<string, string> = {
    Fetching: "bg-amber-100 text-amber-700",
    "Auto-filled": "bg-blue-100 text-blue-700",
    Done: "bg-emerald-100 text-emerald-700",
  };

  return (
    <div className="mt-4 space-y-2">
      {formRows.map((row, i) => (
        <div key={row.label} className="flex items-center gap-2 p-2.5 bg-[#F7F8FA] rounded-lg border border-gray-100">
          <div className="w-1.5 h-1.5 rounded-full bg-[#082B5C]/30 flex-shrink-0" />
          <span className="text-xs text-[#374151] flex-1">{row.label}</span>
          <motion.span
            key={cycleStates[states[i]]}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${colorMap[cycleStates[states[i]]]}`}
          >
            {cycleStates[states[i]]}
          </motion.span>
        </div>
      ))}
    </div>
  );
}

/* ── Card 3: No back and forth ─────────────────────────────────────── */
const processSteps = ["Documents", "Expert Review", "Filed"];

function ProcessFlowVisual() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % (processSteps.length + 1)), 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="mt-4 p-3 bg-[#F7F8FA] rounded-xl border border-gray-100">
      <div className="flex items-center gap-1">
        {processSteps.map((label, i) => (
          <div key={label} className="flex items-center gap-1 flex-1 min-w-0">
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <motion.div
                animate={{
                  backgroundColor: step > i ? "#082B5C" : step === i ? "#0d3d7a" : "#E5E7EB",
                  scale: step === i ? 1.15 : 1,
                }}
                transition={{ duration: 0.4 }}
                className="w-6 h-6 rounded-full flex items-center justify-center"
              >
                {step > i ? (
                  <span className="text-white text-[9px] font-bold">✓</span>
                ) : (
                  <span className="text-[9px] font-bold" style={{ color: step === i ? "white" : "#9CA3AF" }}>{i + 1}</span>
                )}
              </motion.div>
              <span className="text-[8px] text-[#6B7280] text-center leading-tight w-12">{label}</span>
            </div>
            {i < processSteps.length - 1 && (
              <div className="flex-1 h-px bg-gray-200 relative -mt-3 mx-0.5">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[#082B5C] rounded-full"
                  animate={{ width: step > i ? "100%" : "0%" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Card 4: Filing time ───────────────────────────────────────────── */
function FilingProgressVisual() {
  const progress = useMotionValue(0);
  const width = useTransform(progress, [0, 100], ["0%", "100%"]);

  useEffect(() => {
    const run = async () => {
      while (true) {
        await animate(progress, 92, { duration: 2.2, ease: "easeOut" });
        await new Promise((r) => setTimeout(r, 1400));
        await animate(progress, 0, { duration: 0.6, ease: "easeIn" });
        await new Promise((r) => setTimeout(r, 400));
      }
    };
    run();
  }, [progress]);

  const [label, setLabel] = useState<"Submitted" | "Filed ✓">("Submitted");
  useEffect(() => {
    const unsub = progress.on("change", (v) => {
      setLabel(v > 85 ? "Filed ✓" : "Submitted");
    });
    return unsub;
  }, [progress]);

  return (
    <div className="mt-4 p-3 bg-[#F7F8FA] rounded-xl border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] text-[#6B7280]">Filing progress</span>
        <motion.span
          className="text-[10px] font-bold text-[#082B5C]"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          {label === "Filed ✓" ? "92%" : "—"}
        </motion.span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div className="h-full bg-[#082B5C] rounded-full" style={{ width }} />
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-[9px] text-[#6B7280]">Submitted</span>
        <motion.span
          className="text-[9px] font-semibold"
          animate={{ color: label === "Filed ✓" ? "#059669" : "#9CA3AF" }}
          transition={{ duration: 0.4 }}
        >
          {label}
        </motion.span>
      </div>
    </div>
  );
}

/* ── Section ───────────────────────────────────────────────────────── */
const cards = [
  {
    icon: Zap,
    title: "Instant Expert Match",
    body: "Get matched with a senior tax expert in minutes.",
    Visual: ExpertMatchVisual,
  },
  {
    icon: FileCheck,
    title: "Zero Manual Entry. Zero Delays.",
    body: "Pre-filled forms from your documents. Less admin, more accuracy.",
    Visual: ZeroEntryVisual,
  },
  {
    icon: RefreshCw,
    title: "No back and forth, no revision loops.",
    body: "We get it right the first time — documents, review, filed.",
    Visual: ProcessFlowVisual,
  },
  {
    icon: Clock,
    title: "Average filing time: 12 hours.",
    body: "Fast, accurate, and filed the same day.",
    Visual: FilingProgressVisual,
  },
];

export default function ExpertSupport() {
  return (
    <section className="bg-[#F7F8FA] py-14 lg:py-20">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10">
          <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-3">Expert Support</p>
          <h2 className="font-display font-bold text-[#082B5C] mb-3 leading-tight"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}>
            Need more help? Hire DMV&apos;s Top Tax Experts<br className="hidden lg:block" />
            and file within 24 hours.
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-9">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="w-9 h-9 rounded-xl bg-[#082B5C]/8 flex items-center justify-center mb-4">
                <c.icon size={17} className="text-[#082B5C]" />
              </div>
              <h3 className="font-semibold text-[#082B5C] text-sm leading-snug mb-3">{c.title}</h3>
              <c.Visual />
            </motion.div>
          ))}
        </div>

        <AnimatedSection className="text-center" delay={0.2}>
          <Link href="/contact"
            className="inline-flex items-center gap-2 bg-[#082B5C] hover:bg-[#0d3d7a] text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-all shadow-sm">
            Get Expert Help Now
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
