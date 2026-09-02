"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeDollarSign, Blend, Clock3, HeartHandshake, MessagesSquare, RefreshCw, ShieldCheck, UsersRound } from "lucide-react";

const challengeGroups = [
  { number: "01", title: "Money, work & ambition", icon: BadgeDollarSign, summary: "Housing, childcare, education, two demanding careers, and unexpected job changes can turn practical decisions into recurring tension.", signals: ["Financial pressure", "Career trade-offs", "Too little shared time"], response: "Build one shared financial and career plan—with room for both people to grow.", color: "#b8794f", tint: "#f8eee3" },
  { number: "02", title: "Time & the invisible load", icon: Clock3, summary: "Work, commuting, household tasks, phones, and the responsibility of remembering everything can leave one partner carrying too much.", signals: ["Mental load", "Unequal responsibilities", "Constant logistics"], response: "Make ownership visible, divide it fairly, and protect time that is not about tasks.", color: "#557d75", tint: "#e9f1ee" },
  { number: "03", title: "Communication & closeness", icon: MessagesSquare, summary: "Couples may discuss schedules all day while fears, hopes, affection, and unresolved resentment remain unspoken.", signals: ["Emotional distance", "Conflict loops", "Declining intimacy"], response: "Create a safer way to speak honestly before distance becomes the normal pattern.", color: "#b96578", tint: "#f8eaf0" },
  { number: "04", title: "Parenting & extended family", icon: UsersRound, summary: "Parenting philosophies, in-laws, cultural expectations, and care for aging parents can pull a couple in several directions at once.", signals: ["Different parenting styles", "Boundary pressure", "Aging-parent care"], response: "Agree on the values of your home, then set boundaries and caregiving plans together.", color: "#6f8360", tint: "#edf2e9" },
  { number: "05", title: "Identity & expectations", icon: Blend, summary: "Gender roles, different backgrounds, social comparison, and a life centered only on children or work can slowly erase individual identity.", signals: ["Role conflict", "Comparison", "Loss of self"], response: "Stay curious about each other and protect the identities that each person brings home.", color: "#68729a", tint: "#eeeef6" },
  { number: "06", title: "Life-stage transitions", icon: RefreshCw, summary: "Relocation, entrepreneurship, job loss, children leaving home, and retirement can expose problems once hidden by a busy routine.", signals: ["Changing roles", "Empty nest", "Retirement reset"], response: "Keep redesigning the relationship so it remains meaningful beyond any single role.", color: "#55758e", tint: "#e9f0f4" },
];

export default function WholeLifeChallenges() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = challengeGroups[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <section className="relative overflow-hidden border-t border-white/8 bg-[#041830] py-14 lg:py-20">
      <div className="absolute left-1/2 top-0 h-80 w-[760px] -translate-x-1/2 rounded-full bg-[#d4a15f]/10 blur-[110px]" />
      <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.55 }} className="mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.19em] text-[#efc18e]">
            <span className="h-px w-7 bg-[#d4a15f]" />The pressure map<span className="h-px w-7 bg-[#d4a15f]" />
          </div>
          <h2 className="font-display text-[clamp(2.05rem,3.4vw,3.25rem)] font-bold leading-[1.06] tracking-[-0.04em] text-white">Relationships rarely struggle for just one reason.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/58 sm:text-[15px]">Explore six overlapping pressures—and the planning move that can protect the partnership.</p>
        </motion.div>

        <div className="mx-auto mt-7 grid max-w-5xl grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {challengeGroups.map(({ title, icon: Icon, color, tint }, index) => {
            const isActive = index === activeIndex;
            return (
              <motion.button key={title} type="button" onClick={() => setActiveIndex(index)} aria-pressed={isActive} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className={`flex min-h-[74px] items-center gap-2 rounded-2xl border px-3 py-3 text-left transition-all lg:flex-col lg:justify-center lg:text-center ${isActive ? "border-white bg-white text-[#041830] shadow-[0_12px_30px_rgba(0,0,0,0.28)]" : "border-white/20 bg-white/[0.09] text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-white/32 hover:bg-white/[0.14]"}`}>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl" style={!isActive ? { color: "#efc18e", backgroundColor: "rgba(255,255,255,.12)" } : { color, backgroundColor: tint }}><Icon size={16} /></span>
                <span className="text-[10px] font-bold leading-4">{title}</span>
              </motion.button>
            );
          })}
        </div>

        <div className="mx-auto mt-4 max-w-5xl overflow-hidden rounded-[26px] border border-white/12 bg-[#faf8f4] shadow-[0_22px_60px_rgba(0,0,0,0.2)]">
          <AnimatePresence mode="wait">
            <motion.article key={active.title} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }} className="grid items-center gap-6 p-5 sm:p-7 md:grid-cols-[0.42fr_1fr] lg:gap-9 lg:p-8">
              <div className="relative mx-auto flex h-52 w-52 items-center justify-center sm:h-56 sm:w-56">
                <motion.span className="absolute inset-0 rounded-full border" style={{ borderColor: `${active.color}22` }} animate={{ scale: [0.9, 1, 0.9], opacity: [0.3, 0.75, 0.3] }} transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }} />
                <motion.span className="absolute inset-8 rounded-full border border-dashed" style={{ borderColor: `${active.color}50` }} animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} />
                <span className="absolute left-1/2 top-1 -translate-x-1/2 rounded-full bg-[#faf8f4] px-3 py-1 text-[8px] font-bold uppercase tracking-[0.16em] text-[#918b84]">Selected pressure</span>
                <span className="relative flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white shadow-[0_14px_40px_rgba(38,63,87,0.12)]">
                  <ActiveIcon size={27} style={{ color: active.color }} />
                  <span className="mt-1 font-display text-xl font-bold leading-none text-[#263f57]">{active.number}</span>
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-[#263f57] sm:text-[28px]">{active.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6b767d]">{active.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {active.signals.map((signal) => <span key={signal} className="rounded-full px-3 py-1.5 text-[10px] font-bold" style={{ color: active.color, backgroundColor: active.tint }}>{signal}</span>)}
                </div>
                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#263f57]/7 bg-white p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eaf2ef] text-[#557d75]"><ShieldCheck size={16} /></span>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-[#557d75]">Protective move</p>
                    <p className="mt-1 text-[12px] leading-5 text-[#566771] sm:text-[13px]">{active.response}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <p className="mx-auto mt-5 flex max-w-3xl items-center justify-center gap-2 text-center text-xs font-semibold text-white/65"><HeartHandshake size={15} className="text-[#efc18e]" />The goal is not a pressure-free life—it is a prepared partnership.</p>
      </div>
    </section>
  );
}
