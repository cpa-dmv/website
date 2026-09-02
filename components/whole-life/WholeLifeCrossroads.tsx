"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Baby,
  BriefcaseBusiness,
  CircleHelp,
  Clock3,
  HeartPulse,
  Landmark,
  UsersRound,
} from "lucide-react";

const pressures = [
  {
    label: "Aging parents",
    detail: "Care, health, and changing family roles",
    icon: UsersRound,
    position: "left-[2%] top-[20%]",
    color: "#d89176",
  },
  {
    label: "Career crossroads",
    detail: "Momentum, reinvention, or uncertainty",
    icon: BriefcaseBusiness,
    position: "right-[1%] top-[16%]",
    color: "#527b75",
  },
  {
    label: "Independent children",
    detail: "A new chapter for them—and for you",
    icon: Baby,
    position: "left-[-2%] bottom-[16%]",
    color: "#839d8c",
  },
  {
    label: "Retirement in view",
    detail: "Time, purpose, and financial readiness",
    icon: Landmark,
    position: "right-[-2%] bottom-[17%]",
    color: "#d4a15f",
  },
];

const questions = [
  "Is your family prepared for what comes next?",
  "Does your career still support the life you want?",
  "Are your finances aligned with your future?",
];

export default function WholeLifeCrossroads() {
  return (
    <section id="life-journey" className="relative scroll-mt-20 border-t border-[#263f57]/8 bg-white py-16 text-[#263f57] lg:py-24">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-10 max-w-3xl text-center lg:mb-12"
        >
          <div className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#a66f4e]">
            <span className="h-px w-7 bg-[#d4a15f]" />
            Why whole-life planning matters
            <span className="h-px w-7 bg-[#d4a15f]" />
          </div>
          <h2 className="font-display text-[clamp(2rem,3.3vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.035em] text-[#263f57]">
            Life changes rarely happen one at a time.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#6f7880]">
            The decisions we make about work, money, relationships, and family are deeply connected. Good guidance looks at the whole picture.
          </p>
        </motion.div>

        <div className="grid items-center gap-10 rounded-[30px] border border-[#263f57]/8 bg-[#faf8f4] px-5 py-8 shadow-[0_18px_55px_rgba(38,63,87,0.06)] sm:px-8 lg:grid-cols-[0.94fr_1.06fr] lg:px-10 lg:py-10">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d4a15f]/25 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.17em] text-[#a66f4e] shadow-sm">
              <Clock3 size={14} />
              The midlife crossroads
            </div>

            <h3 className="font-display text-[clamp(1.75rem,2.6vw,2.65rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#263f57]">
              Around 45, several chapters can shift at once.
            </h3>

            <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#6f7880]">
              Careers peak or change, children become independent, parents need more support, and retirement begins to feel real.
            </p>

            <div className="mt-6 space-y-2.5">
              {questions.map((question, index) => (
                <motion.div
                  key={question}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.16 + index * 0.09, duration: 0.45 }}
                  className="group flex items-center gap-3 rounded-xl border border-[#263f57]/8 bg-white px-3.5 py-2.5 transition-all hover:border-[#d4a15f]/35 hover:shadow-sm"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f8e7df] text-[#bd7059]">
                    <CircleHelp size={16} />
                  </span>
                  <p className="text-sm font-medium text-[#465765] sm:text-[15px]">{question}</p>
                  <ArrowUpRight size={15} className="ml-auto text-[#263f57]/20 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#bd7059]" />
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-3 border-l-2 border-[#d4a15f] pl-4">
              <HeartPulse size={18} className="mt-0.5 shrink-0 text-[#b97a55]" />
              <p className="max-w-lg text-sm leading-6 text-[#788087]">
                These changes are not a crisis. They are a signal to bring every part of life into one thoughtful plan.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-square w-full max-w-[480px]"
          >
            <div className="absolute inset-[13%] rounded-full border border-[#263f57]/8" />
            <div className="absolute inset-[24%] rounded-full border border-dashed border-[#d4a15f]/35" />

            <motion.div
              className="absolute inset-[32%] flex flex-col items-center justify-center rounded-full border border-[#d4a15f]/25 bg-[radial-gradient(circle_at_35%_25%,#fffdf9,#f4e7d5_75%)] text-center shadow-[0_22px_65px_rgba(73,57,42,0.13)]"
              animate={{ boxShadow: ["0 22px 65px rgba(73,57,42,.13)", "0 25px 75px rgba(216,145,118,.22)", "0 22px 65px rgba(73,57,42,.13)"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#8a7768]">A pivotal age</span>
              <span className="font-display text-[clamp(3.6rem,8vw,5.5rem)] font-bold leading-none text-[#263f57]">45</span>
              <span className="mt-1 text-xs font-semibold text-[#ae6d52]">Plan the next chapter</span>
            </motion.div>

            <motion.div
              className="absolute inset-[19%] rounded-full border border-[#d4a15f]/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
            >
              <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full bg-[#f0c59b] shadow-[0_0_18px_#f0c59b]" />
            </motion.div>

            {pressures.map(({ label, detail, icon: Icon, position, color }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.18 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`absolute ${position} z-10 w-[155px] rounded-xl border border-[#263f57]/8 bg-white/95 p-3 shadow-[0_10px_28px_rgba(38,63,87,0.08)] backdrop-blur-xl sm:w-[180px]`}
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}22`, color }}>
                    <Icon size={18} />
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-[#263f57] sm:text-sm">{label}</h3>
                    <p className="mt-1 text-[10px] leading-4 text-[#7a8389] sm:text-[11px]">{detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="absolute bottom-[2%] left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-[#263f57]/8 bg-white/85 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#68757c] shadow-sm backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#839d8c]" />
              One life · connected decisions
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
