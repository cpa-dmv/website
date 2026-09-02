"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeDollarSign,
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  HeartHandshake,
  Infinity as InfinityIcon,
  PiggyBank,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

const targets = [
  { value: "1 year", label: "of wrong turns reclaimed", icon: Route, color: "#f19a88" },
  { value: "$30K", label: "in opportunity potential", icon: GraduationCap, color: "#efbd76" },
  { value: "$100K", label: "in costly choices avoided", icon: PiggyBank, color: "#80aa9d" },
  { value: "$1M+", label: "long-term wealth potential", icon: Target, color: "#91a8c2" },
];

const stages = [
  { label: "High school", icon: GraduationCap },
  { label: "College", icon: Building2 },
  { label: "Career", icon: BriefcaseBusiness },
  { label: "Partnership", icon: HeartHandshake },
];

export default function WholeLifePromise() {
  return (
    <section className="relative overflow-hidden border-t border-[#263f57]/7 bg-white py-14 lg:py-16">
      <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-[#f6dfd7]/55 blur-[115px]" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#dceae6]/65 blur-[120px]" />

      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-7 max-w-5xl text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#c87568]/15 bg-[#fcf3ef] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.19em] text-[#a96056]">
            <InfinityIcon size={14} /> Our promise · your program
          </div>
          <h2 className="font-display text-[clamp(2.05rem,3.2vw,3.15rem)] font-bold leading-[1.03] tracking-[-0.04em] text-[#263f57]">
            One relationship with your future.
            <span className="block text-[#c87568]">Not a collection of appointments.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#6d777c] sm:text-base">
            Education, career, money, partnership, and family decisions are connected—so the guidance should be connected too.
          </p>
        </motion.div>

        <div className="relative overflow-hidden rounded-[30px] bg-[#041830] shadow-[0_26px_70px_rgba(4,24,48,0.2)]">
          <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:25px_25px]" />
          <motion.div
            className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-[#c87568]/15 blur-[90px]"
            animate={{ scale: [1, 1.13, 1], opacity: [0.45, 0.75, 0.45] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative grid lg:grid-cols-[1.04fr_0.96fr]">
            <div className="border-b border-white/10 p-5 sm:p-7 lg:border-b-0 lg:border-r lg:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#efc18e]">The promise</p>
                  <h3 className="mt-1 font-display text-2xl font-bold text-white">Better decisions compound.</h3>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#efc18e]/25 bg-[#efc18e]/10 text-[#efc18e]"><Sparkles size={18} /></span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                {targets.map(({ value, label, icon: Icon, color }, index) => (
                  <motion.div
                    key={value}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    className="group rounded-2xl border border-white/9 bg-white/[0.055] p-3.5 transition-colors hover:bg-white/[0.09] sm:p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <Icon size={16} style={{ color }} />
                      <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-white/25">Planning target</span>
                    </div>
                    <p className="mt-3 font-display text-2xl font-bold leading-none" style={{ color }}>{value}</p>
                    <p className="mt-1.5 text-[10px] leading-4 text-white/52">{label}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-3 flex items-center gap-3 rounded-2xl border border-[#f19a88]/18 bg-[#f19a88]/9 px-4 py-3.5">
                <HeartHandshake size={18} className="shrink-0 text-[#f19a88]" />
                <p className="text-[11px] leading-5 text-white/68"><strong className="text-white">The measure beyond money:</strong> a stable, fulfilled life with relationships worth keeping.</p>
              </div>
            </div>

            <div className="bg-white/[0.035] p-5 sm:p-7 lg:p-8">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#80aa9d]">The program</p>
                <h3 className="mt-1 font-display text-2xl font-bold text-white">Guidance that grows with you.</h3>
                <p className="mt-2 text-xs leading-5 text-white/48">One continuous counseling relationship across the decisions that matter most.</p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                {stages.map(({ label, icon: Icon }, index) => (
                  <motion.div key={label} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08, duration: 0.4 }} className="flex items-center gap-2.5 rounded-xl border border-white/8 bg-white/[0.05] px-3 py-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.08] text-[#efc18e]"><Icon size={14} /></span>
                    <span className="text-[10px] font-bold text-white/72">{label}</span>
                    {index < stages.length - 1 && <ArrowRight size={11} className="ml-auto text-white/18" />}
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white">
                <div className="flex items-center justify-between gap-4 border-b border-[#263f57]/8 px-4 py-3">
                  <div className="flex items-center gap-2.5"><BadgeDollarSign size={17} className="text-[#c87568]" /><span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#6c777e]">Program investment</span></div>
                  <span className="rounded-full bg-[#eef4f2] px-2.5 py-1 text-[9px] font-bold text-[#557d75]">10-year horizon</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] items-end gap-4 px-4 py-4">
                  <div><p className="font-display text-3xl font-bold leading-none text-[#263f57]">$20,000</p><p className="mt-1 text-[10px] text-[#7a8388]">One-time program fee</p></div>
                  <div className="text-right"><p className="font-display text-xl font-bold text-[#c87568]">10%</p><p className="text-[9px] text-[#7a8388]">referral benefit</p></div>
                </div>
              </div>

              <div className="mt-3 flex gap-2.5 rounded-xl border border-[#80aa9d]/20 bg-[#80aa9d]/9 px-3.5 py-3">
                <ShieldCheck size={15} className="mt-0.5 shrink-0 text-[#80aa9d]" />
                <p className="text-[9px] leading-4 text-white/48"><strong className="text-white/75">Commitment policy:</strong> any fee-return provision is governed by written eligibility and program terms. Counseling supports better decisions; personal, marital, and financial outcomes are not guaranteed.</p>
              </div>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-4 max-w-3xl text-center text-[9px] leading-4 text-[#8a9296]">
          Illustrative planning targets are aspirations, not promises of scholarships, savings, marriage, or investment performance.
        </p>
      </div>
    </section>
  );
}
