"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BriefcaseBusiness,
  ChevronRight,
  HeartHandshake,
  Home,
  Landmark,
  Scale,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";

const dimensions = [
  {
    title: "Companionship & belonging",
    short: "Belonging",
    icon: HeartHandshake,
    description: "A trusted person for ordinary days, celebrations, disappointments, illness, and the decisions that shape a life.",
    includes: ["Emotional support", "Shared experiences", "Stronger social network"],
    color: "#f0a08d",
  },
  {
    title: "Home & financial resilience",
    short: "Security",
    icon: Landmark,
    description: "Shared expenses and coordinated planning can strengthen housing options, saving, investing, insurance, and retirement readiness.",
    includes: ["Housing capacity", "Shared resources", "Financial protection"],
    color: "#e4b56d",
  },
  {
    title: "Family & parenting",
    short: "Family",
    icon: UsersRound,
    description: "A committed partnership can create a stable home and a team for childcare, education, household work, and family decisions.",
    includes: ["Stable home", "Shared parenting", "Divided responsibilities"],
    color: "#8fb5a8",
  },
  {
    title: "Career & opportunity",
    short: "Growth",
    icon: BriefcaseBusiness,
    description: "One partner may be able to retrain, change roles, take a career risk, or start a business while the other provides stability.",
    includes: ["Career flexibility", "Combined networks", "Room to take risks"],
    color: "#8da8c2",
  },
  {
    title: "Legal & later-life protection",
    short: "Protection",
    icon: Scale,
    description: "Marriage can provide important rights involving inheritance, medical decisions, property, taxes, beneficiaries, and later-life care.",
    includes: ["Legal rights", "Retirement partnership", "Later-life support"],
    color: "#b7a5d1",
  },
];

export default function WholeLifeMarriageValue() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = dimensions[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <section className="relative overflow-hidden border-t border-[#263f57]/7 bg-white py-16 lg:py-24">
      <div className="absolute left-1/2 top-0 h-64 w-[700px] -translate-x-1/2 rounded-full bg-[#f7e9dd]/60 blur-[100px]" />

      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.55 }} className="mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#c87568]/15 bg-[#fcf3ef] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.19em] text-[#a96056]">
            <Sparkles size={14} />The value of partnership
          </div>
          <h2 className="font-display text-[clamp(2.15rem,3.8vw,3.7rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[#263f57]">
            Marriage is more than a milestone.
            <span className="block text-[#c87568]">It is a shared-life system.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#6e777c]">
            At its best, marriage connects emotional, financial, family, professional, and legal decisions into one resilient partnership.
          </p>
        </motion.div>

        <div className="relative mt-10 overflow-hidden rounded-[32px] bg-[#041830] shadow-[0_26px_70px_rgba(4,24,48,0.22)]">
          <div className="absolute inset-0 opacity-[0.045] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:26px_26px]" />
          <div className="absolute -left-28 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#c87568]/15 blur-[90px]" />

          <div className="relative grid items-center gap-5 p-5 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10 lg:p-10">
            <div className="relative mx-auto flex h-[310px] w-full max-w-[390px] items-center justify-center sm:h-[350px]">
              <div className="absolute h-52 w-52 rounded-full border border-white/12 sm:h-60 sm:w-60">
                <motion.span className="absolute inset-[-1px] rounded-full" animate={{ rotate: 360 }} transition={{ duration: 16, repeat: Infinity, ease: "linear" }}>
                  <span className="absolute left-1/2 top-[-3px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#efc18e] shadow-[0_0_14px_#efc18e]" />
                </motion.span>
                {dimensions.map(({ icon: Icon, color }, index) => {
                  const angle = (index / dimensions.length) * Math.PI * 2 - Math.PI / 2;
                  const x = 50 + Math.cos(angle) * 50;
                  const y = 50 + Math.sin(angle) * 50;
                  return (
                    <button key={index} type="button" onClick={() => setActiveIndex(index)} aria-label={`Show ${dimensions[index].title}`} className={`absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-all ${activeIndex === index ? "scale-110 border-white bg-white shadow-[0_0_25px_rgba(255,255,255,0.24)]" : "border-white/15 bg-[#0b2948] hover:border-white/35"}`} style={{ left: `${x}%`, top: `${y}%`, color }}>
                      <Icon size={17} />
                    </button>
                  );
                })}
              </div>

              <motion.div className="absolute h-40 w-40 rounded-full border border-dashed border-[#efc18e]/30 sm:h-44 sm:w-44" animate={{ rotate: -360 }} transition={{ duration: 26, repeat: Infinity, ease: "linear" }} />

              <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white text-center shadow-[0_18px_45px_rgba(0,0,0,0.28)] sm:h-36 sm:w-36">
                <motion.span key={activeIndex} initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 190 }} className="flex h-10 w-10 items-center justify-center rounded-full" style={{ color: active.color, backgroundColor: `${active.color}1f` }}>
                  <ActiveIcon size={20} />
                </motion.span>
                <span className="mt-2 text-[8px] font-bold uppercase tracking-[0.17em] text-[#8a8d8d]">A shared life</span>
                <span className="font-display text-lg font-bold text-[#263f57]">Together</span>
              </div>

              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.16em] text-white/35">Select a dimension</div>
            </div>

            <div>
              <div className="grid gap-2 sm:grid-cols-5 lg:grid-cols-1">
                {dimensions.map(({ title, short, icon: Icon, color }, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button key={title} type="button" onClick={() => setActiveIndex(index)} aria-pressed={isActive} className={`group flex items-center gap-3 rounded-xl border px-3 py-3 text-left transition-all sm:flex-col sm:text-center lg:flex-row lg:text-left ${isActive ? "border-white/20 bg-white/[0.12]" : "border-transparent bg-transparent hover:border-white/10 hover:bg-white/[0.055]"}`}>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ color, backgroundColor: `${color}1c` }}><Icon size={16} /></span>
                      <span className={`text-[10px] font-bold leading-4 sm:hidden lg:block lg:text-xs ${isActive ? "text-white" : "text-white/52 group-hover:text-white/78"}`}>{title}</span>
                      <span className={`hidden text-[9px] font-bold sm:block lg:hidden ${isActive ? "text-white" : "text-white/52"}`}>{short}</span>
                      <ChevronRight size={14} className={`ml-auto hidden transition-transform lg:block ${isActive ? "translate-x-0.5 text-[#efc18e]" : "text-white/15"}`} />
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 min-h-[190px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.065] p-5 backdrop-blur-sm sm:p-6">
                <AnimatePresence mode="wait">
                  <motion.div key={active.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.28 }}>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: active.color }}>Dimension {activeIndex + 1} of {dimensions.length}</p>
                    <h3 className="mt-1 font-display text-2xl font-bold text-white">{active.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/58">{active.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {active.includes.map((item) => <span key={item} className="flex items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.06] px-3 py-1.5 text-[10px] font-semibold text-white/70"><ShieldCheck size={11} style={{ color: active.color }} />{item}</span>)}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-7 flex max-w-3xl items-center justify-center gap-3 text-center">
          <Home size={16} className="shrink-0 text-[#c87568]" />
          <p className="font-display text-base font-semibold italic text-[#526674] sm:text-lg">Two people do not simply share a home—they build capacity for life together.</p>
        </div>
      </div>
    </section>
  );
}
