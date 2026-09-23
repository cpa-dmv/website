"use client";

import { motion } from "framer-motion";
import {
  Baby,
  BriefcaseBusiness,
  CircleHelp,
  HeartHandshake,
  Landmark,
  Leaf,
  UsersRound,
} from "lucide-react";

const questions = [
  "Is your family prepared for what comes next?",
  "Does your career still support the life you want?",
  "Are your finances aligned with your future?",
];

const lifeCards = [
  {
    title: "Aging parents",
    description: "Care, health, and changing family roles",
    icon: UsersRound,
    color: "#c96f5d",
  },
  {
    title: "Career crossroads",
    description: "Momentum, reinvention, or uncertainty",
    icon: BriefcaseBusiness,
    color: "#315b80",
  },
  {
    title: "Independent children",
    description: "A new chapter for them — and for you",
    icon: Baby,
    color: "#43847c",
  },
  {
    title: "Retirement in view",
    description: "Time, purpose, and financial readiness",
    icon: Landmark,
    color: "#c48b42",
  },
];

const benefits = [
  {
    title: "Clarity",
    description: "Clearer decisions",
    icon: Leaf,
  },
  {
    title: "Stronger relationships",
    description: "At every stage",
    icon: UsersRound,
  },
  {
    title: "Purpose",
    description: "A more meaningful life",
    icon: CompassIcon,
  },
  {
    title: "A brighter tomorrow",
    description: "With the right guidance",
    icon: Landmark,
  },
];

function CompassIcon({
  size = 22,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M15.5 8.5L13.3 13.3L8.5 15.5L10.7 10.7L15.5 8.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function WholeLifeCrossroads() {
  return (
    <section
      id="life-journey"
      className="overflow-hidden bg-white text-[#263f57]"
    >
      {/* =========================================================
          INTRO
      ========================================================= */}
      <div className="bg-white px-5 pb-9 pt-14 sm:px-6 lg:px-8 lg:pb-11 lg:pt-16">
        <div className="mx-auto max-w-[1000px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4 flex items-center justify-center gap-4"
          >
            <span className="h-px w-8 bg-[#c87568]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#a85f4e] sm:text-[11px]">
              Why Whole-Life Planning Matters
            </span>

            <span className="h-px w-8 bg-[#c87568]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display text-[clamp(2rem,3.8vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.045em] text-[#173a5d]"
          >
            Life changes rarely happen one at a time.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mx-auto mt-4 max-w-[760px] text-sm leading-7 text-[#657487] sm:text-base"
          >
            The decisions we make about work, money, relationships, and family
            are deeply connected. Good guidance looks at the whole picture.
          </motion.p>
        </div>
      </div>

      {/* =========================================================
          MAIN PHOTO SECTION
      ========================================================= */}
      <div className="relative overflow-hidden">

        {/* Background photograph */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/whole-life/journey-path.jpg')",
          }}
        />

        {/* Softer overlay — photo remains visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/86 via-white/38 to-white/5" />

        <div className="absolute inset-0 bg-gradient-to-b from-white/12 via-transparent to-white/18" />

        {/* =======================================================
            MAIN CONTAINER
        ======================================================= */}
        <div className="relative z-10 mx-auto max-w-[1450px] px-5 py-9 sm:px-7 lg:px-10 lg:py-11">

          <div className="grid items-start gap-8 lg:grid-cols-[0.82fr_1.18fr] xl:grid-cols-[0.8fr_1.2fr] xl:gap-10">

            {/* ===================================================
                LEFT CONTENT
            =================================================== */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="relative z-20 max-w-[535px] lg:pt-1 xl:pt-3"
            >
              {/* Label */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#c87568]/30 bg-white/95 px-4 py-2 shadow-[0_7px_22px_rgba(38,63,87,0.08)] backdrop-blur-md">
                <CircleHelp
                  size={14}
                  className="text-[#c87568]"
                />

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a85f4e] sm:text-[11px]">
                  The Midlife Crossroads
                </span>
              </div>

              {/* Smaller / more balanced heading */}
              <h3 className="mt-6 font-display text-[clamp(2.45rem,4.5vw,4.25rem)] font-bold leading-[0.99] tracking-[-0.052em] text-[#173a5d]">
                Around 45, several
                <br />
                chapters can
                <br />
                <span className="text-[#b8664e]">
                  shift at once.
                </span>
              </h3>

              {/* Description */}
              <p className="mt-5 max-w-[490px] text-[15px] leading-7 text-[#4f6276] sm:text-base">
                Careers peak or change, children become independent,
                parents need more support, and retirement begins to feel
                real.
              </p>

              {/* Questions */}
              <div className="mt-6 space-y-3">
                {questions.map((question, index) => (
                  <motion.div
                    key={question}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                    }}
                    className="group flex min-h-[65px] items-center justify-between rounded-[17px] border border-white bg-white/95 px-4 shadow-[0_7px_22px_rgba(38,63,87,0.09)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(38,63,87,0.13)] sm:px-5"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c87568]/12">
                        <CircleHelp
                          size={18}
                          className="text-[#c87568]"
                        />
                      </div>

                      <span className="text-sm font-semibold leading-5 text-[#304960] sm:text-[15px]">
                        {question}
                      </span>
                    </div>

                   
                  </motion.div>
                ))}
              </div>

              {/* Closing statement */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-6 flex max-w-[500px] gap-4 border-l-2 border-[#c87568] pl-5"
              >
                <HeartHandshake
                  size={24}
                  strokeWidth={1.8}
                  className="mt-0.5 shrink-0 text-[#c87568]"
                />

                <p className="text-sm leading-6 text-[#536679]">
                  These changes are not a crisis. They are a signal to
                  bring every part of life into one thoughtful plan.
                </p>
              </motion.div>
            </motion.div>

            {/* ===================================================
                RIGHT VISUAL AREA
            =================================================== */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8 }}
              className="relative min-h-[620px] lg:min-h-[640px]"
            >
              {/* =================================================
                  DESKTOP VISUAL
              ================================================= */}
              <div className="relative mx-auto hidden h-[640px] w-full max-w-[760px] lg:block">

                {/* =================================================
    TOP CARDS
================================================= */}
<div className="absolute inset-x-0 top-0 flex items-start justify-between">
  <div className="w-[225px] xl:w-[235px]">
    <LifeCard card={lifeCards[0]} />
  </div>

  <div className="w-[225px] xl:w-[235px]">
    <LifeCard card={lifeCards[1]} />
  </div>
</div>

{/* =================================================
    BOTTOM CARDS
================================================= */}
<div className="absolute inset-x-0 top-[250px] flex items-start justify-between">
  <div className="w-[225px] xl:w-[235px]">
    <LifeCard card={lifeCards[2]} />
  </div>

  <div className="w-[225px] xl:w-[235px]">
    <LifeCard card={lifeCards[3]} />
  </div>
</div>

                {/* ===============================================
                    45 — moved slightly RIGHT + DOWN
                =============================================== */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.82 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute left-1/2 top-[185px] z-30 -translate-x-1/2"
                >
                  <div className="flex h-[215px] w-[215px] flex-col items-center justify-center rounded-full border border-white bg-white/94 text-center shadow-[0_22px_65px_rgba(38,63,87,0.18)] backdrop-blur-md">
                    <span className="text-[10px] font-bold uppercase tracking-[0.23em] text-[#a85f4e]">
                      A pivotal age
                    </span>

                    <span className="mt-1 font-display text-[84px] font-bold leading-none tracking-[-0.08em] text-[#173a5d]">
                      45
                    </span>

                    <span className="mt-1 text-[14px] font-bold leading-5 text-[#b8664e]">
                      Plan the next
                      <br />
                      chapter
                    </span>

                    <span className="mt-2 h-[2px] w-9 bg-[#c87568]" />
                  </div>
                </motion.div>

                {/* ===============================================
                    CONNECTOR LINES
                =============================================== */}
                <svg
                  className="pointer-events-none absolute inset-0 z-20 h-full w-full"
                  viewBox="0 0 760 640"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
  d="M235 82 C320 82 330 155 375 205"
  fill="none"
  stroke="#d97963"
  strokeWidth="2.5"
  strokeDasharray="6 8"
/>

<path
  d="M525 82 C465 82 455 155 435 205"
  fill="none"
  stroke="#d97963"
  strokeWidth="2.5"
  strokeDasharray="6 8"
/>

<path
  d="M235 330 C315 330 340 320 375 310"
  fill="none"
  stroke="#d97963"
  strokeWidth="2.5"
  strokeDasharray="6 8"
/>

<path
  d="M525 330 C470 330 455 320 435 310"
  fill="none"
  stroke="#d97963"
  strokeWidth="2.5"
  strokeDasharray="6 8"
/>
                </svg>

                {/* ===============================================
                    GOAL CARD — MOVED UP
                =============================================== */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: 0.5,
                  }}
                  className="absolute bottom-[30px] right-0 z-30"
                >
                  <div className="rounded-[18px] bg-[#173a5d]/94 px-6 py-5 text-white shadow-[0_15px_40px_rgba(23,58,93,0.2)] backdrop-blur-md">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/65">
                      The goal
                    </p>

                    <div className="mt-2 space-y-1">
                      <p className="text-sm font-semibold">
                        A healthier family.
                      </p>

                      <p className="text-sm font-semibold">
                        Fulfilling work.
                      </p>

                      <p className="text-sm font-semibold">
                        Financial freedom.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Goal message */}
                <div className="absolute bottom-[175px] right-[5px] z-30">
                  <p className="rotate-[-3deg] font-display text-[14px] italic leading-5 text-[#315b80]">
                    
                  </p>
                </div>
              </div>

              {/* =================================================
                  MOBILE
              ================================================= */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
                {lifeCards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                    }}
                  >
                    <LifeCard card={card} />
                  </motion.div>
                ))}

                <div className="col-span-1 flex justify-center py-5 sm:col-span-2">
                  <div className="flex h-[190px] w-[190px] flex-col items-center justify-center rounded-full border border-white bg-white/95 text-center shadow-[0_20px_55px_rgba(38,63,87,0.16)] backdrop-blur-md">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#a85f4e]">
                      A pivotal age
                    </span>

                    <span className="font-display text-[76px] font-bold leading-none tracking-[-0.08em] text-[#173a5d]">
                      45
                    </span>

                    <span className="text-sm font-bold leading-5 text-[#b8664e]">
                      Plan the next
                      <br />
                      chapter
                    </span>
                  </div>
                </div>

                <div className="col-span-1 sm:col-span-2">
                  <div className="rounded-[18px] bg-[#173a5d]/95 px-5 py-5 text-white shadow-lg">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/65">
                      The goal
                    </p>

                    <div className="mt-2 grid gap-1 sm:grid-cols-3">
                      <p className="text-sm font-semibold">
                        A healthier family.
                      </p>

                      <p className="text-sm font-semibold">
                        Fulfilling work.
                      </p>

                      <p className="text-sm font-semibold">
                        Financial freedom.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* =====================================================
              BENEFITS BAR
          ===================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="relative z-40 mt-8 overflow-hidden rounded-[24px] border border-white bg-white/95 shadow-[0_18px_55px_rgba(38,63,87,0.16)] backdrop-blur-xl lg:mt-5"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    className={`flex items-center gap-3 px-4 py-4 sm:px-6 lg:px-7 lg:py-5 ${
                      index < benefits.length - 1
                        ? "border-b border-[#263f57]/10 lg:border-b-0 lg:border-r"
                        : ""
                    }`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eef2f6]">
                      <Icon
                        size={21}
                        strokeWidth={1.8}
                        className="text-[#173a5d]"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[#173a5d]">
                        {benefit.title}
                      </p>

                      <p className="mt-0.5 text-[11px] text-[#718092]">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   LIFE CARD
============================================================= */

function LifeCard({
  card,
}: {
  card: (typeof lifeCards)[number];
}) {
  const Icon = card.icon;

  return (
    <div className="relative z-20 w-full">
      <div className="rounded-[18px] border border-white bg-white/95 p-3.5 shadow-[0_12px_35px_rgba(38,63,87,0.12)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(38,63,87,0.16)]">
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: `${card.color}18`,
            }}
          >
            <Icon
              size={23}
              strokeWidth={1.8}
              style={{
                color: card.color,
              }}
            />
          </div>

          <div className="min-w-0">
            <h4 className="text-sm font-bold leading-5 text-[#173a5d]">
              {card.title}
            </h4>

            <p className="mt-1 text-[11px] leading-4 text-[#68798a]">
              {card.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}