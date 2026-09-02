"use client";

import { motion } from "framer-motion";
import { Activity, BadgeDollarSign, BrainCircuit, HeartHandshake, MessageCircleMore, Sparkles, Star, UsersRound } from "lucide-react";

const foundations = [
  { number: "01", title: "Health & wellbeing", detail: "Physical health, emotional resilience, and social confidence.", icon: Activity, color: "#c87568", tint: "#fbebe7" },
  { number: "02", title: "Mind & voice", detail: "Intellectual curiosity and the confidence to hold meaningful conversations.", icon: BrainCircuit, color: "#68729a", tint: "#eeeef6" },
  { number: "03", title: "Relationships", detail: "The ability to build friendships, belonging, and healthy human connection.", icon: UsersRound, color: "#557d75", tint: "#e9f1ee" },
  { number: "04", title: "Financial confidence", detail: "Financial literacy, independence, and the judgment to create lasting security.", icon: BadgeDollarSign, color: "#a77a3d", tint: "#f7f0e3" },
  { number: "05", title: "Love & family", detail: "The maturity to choose a partner, sustain a marriage, and raise a family with care.", icon: HeartHandshake, color: "#b96578", tint: "#f8eaf0" },
  { number: "06", title: "A life well lived", detail: "Rich experiences, enduring relationships, and genuine satisfaction across the years.", icon: Sparkles, color: "#55758e", tint: "#e9f0f4" },
];

export default function WholeLifeChildrenFuture() {
  return (
    <section className="relative overflow-hidden bg-[#fcfaf7] py-16 lg:py-24">
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#d4a15f]/35 to-transparent" />
      <div className="absolute left-[8%] top-20 h-72 w-72 rounded-full bg-[#f4ddd4]/40 blur-[100px]" />
      <div className="absolute right-[8%] top-20 h-72 w-72 rounded-full bg-[#dfeae7]/55 blur-[100px]" />

      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.55 }} className="mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d4a15f]/20 bg-white/75 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.19em] text-[#a66f4e] shadow-sm"><Star size={14} />A parent&apos;s deepest hope</div>
          <h2 className="font-display text-[clamp(2.15rem,3.8vw,3.7rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[#263f57]">Two paths. <span className="text-[#c87568]">One promise.</span></h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#6e777c]">Whether you are guiding a daughter or a son, the destination is the same: helping them build the inner strength and life skills to thrive long after childhood.</p>
        </motion.div>

        <div className="relative mx-auto mt-9 max-w-4xl">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.5 }} className="flex items-center justify-end gap-3 rounded-2xl border border-[#c87568]/14 bg-white px-3 py-3 shadow-sm sm:px-5">
              <div className="text-right"><p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#b3655b]">For your</p><p className="font-display text-lg font-bold text-[#263f57] sm:text-2xl">Daughter</p></div>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fbebe7] text-[#c87568] sm:h-12 sm:w-12"><MessageCircleMore size={20} /></span>
            </motion.div>

            <motion.div initial={{ scale: 0.7, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, type: "spring", stiffness: 180 }} className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#263f57] text-white shadow-[0_10px_28px_rgba(38,63,87,0.2)] sm:h-14 sm:w-14"><HeartHandshake size={22} /></motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.5 }} className="flex items-center gap-3 rounded-2xl border border-[#557d75]/14 bg-white px-3 py-3 shadow-sm sm:px-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e9f1ee] text-[#557d75] sm:h-12 sm:w-12"><BrainCircuit size={20} /></span>
              <div><p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#557d75]">For your</p><p className="font-display text-lg font-bold text-[#263f57] sm:text-2xl">Son</p></div>
            </motion.div>
          </div>

          <svg className="pointer-events-none absolute left-1/2 top-[88%] hidden h-16 w-[72%] -translate-x-1/2 sm:block" viewBox="0 0 720 64" fill="none" preserveAspectRatio="none" aria-hidden="true">
            <motion.path d="M0 2C160 2 190 60 360 60" stroke="#c87568" strokeWidth="1.5" strokeDasharray="5 6" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.35, duration: 0.9 }} />
            <motion.path d="M720 2C560 2 530 60 360 60" stroke="#557d75" strokeWidth="1.5" strokeDasharray="5 6" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.35, duration: 0.9 }} />
          </svg>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {foundations.map(({ number, title, detail, icon: Icon, color, tint }, index) => (
            <motion.article key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: (index % 3) * 0.07, duration: 0.45 }} whileHover={{ y: -3 }} className="group flex items-start gap-4 rounded-2xl border border-[#263f57]/8 bg-white p-4 shadow-[0_8px_26px_rgba(38,63,87,0.04)] transition-shadow hover:shadow-[0_14px_35px_rgba(38,63,87,0.08)] sm:p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl" style={{ color, backgroundColor: tint }}><Icon size={20} /></span>
              <div><div className="flex items-center gap-2"><span className="text-[9px] font-bold tracking-[0.15em]" style={{ color }}>{number}</span><span className="h-px w-5" style={{ backgroundColor: `${color}55` }} /></div><h3 className="mt-1 text-[15px] font-bold text-[#263f57]">{title}</h3><p className="mt-1 text-[12px] leading-5 text-[#747d82]">{detail}</p></div>
            </motion.article>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.5 }} className="mx-auto mt-7 flex max-w-4xl flex-col items-center justify-between gap-3 rounded-2xl bg-[#263f57] px-5 py-4 text-center shadow-[0_14px_35px_rgba(38,63,87,0.15)] sm:flex-row sm:text-left">
          <div><p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#efc18e]">The measure that matters</p><p className="mt-1 text-sm font-semibold text-white sm:text-[15px]">At 70: health, meaningful experiences, lasting relationships, and satisfaction with the life they built.</p></div>
          <Sparkles size={22} className="shrink-0 text-[#efc18e]" />
        </motion.div>
      </div>
    </section>
  );
}
