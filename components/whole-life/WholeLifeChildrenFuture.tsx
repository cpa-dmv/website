"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Activity,
  BadgeDollarSign,
  BrainCircuit,
  HeartHandshake,
  MessageCircleMore,
  Sparkles,
  Star,
  UsersRound,
} from "lucide-react";

const foundations = [
  {
    number: "01",
    title: "Health & wellbeing",
    detail:
      "Physical health, emotional resilience, and social confidence.",
    icon: Activity,
    color: "#c87568",
    tint: "#fbebe7",
  },
  {
    number: "02",
    title: "Mind & voice",
    detail:
      "Intellectual curiosity and the confidence to hold meaningful conversations.",
    icon: BrainCircuit,
    color: "#68729a",
    tint: "#eeeef6",
  },
  {
    number: "03",
    title: "Relationships",
    detail:
      "The ability to build friendships, belonging, and healthy human connection.",
    icon: UsersRound,
    color: "#557d75",
    tint: "#e9f1ee",
  },
  {
    number: "04",
    title: "Financial confidence",
    detail:
      "Financial literacy, independence, and the judgment to create lasting security.",
    icon: BadgeDollarSign,
    color: "#a77a3d",
    tint: "#f7f0e3",
  },
  {
    number: "05",
    title: "Love & family",
    detail:
      "The maturity to choose a partner, sustain a marriage, and raise a family with care.",
    icon: HeartHandshake,
    color: "#b96578",
    tint: "#f8eaf0",
  },
  {
    number: "06",
    title: "A life well lived",
    detail:
      "Rich experiences, enduring relationships, and genuine satisfaction across the years.",
    icon: Sparkles,
    color: "#55758e",
    tint: "#e9f0f4",
  },
];

export default function WholeLifeChildrenFuture() {
  return (
    <section className="relative overflow-hidden bg-[#fcfaf7] py-16 lg:py-24">
      {/* Background decoration */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4a15f]/35 to-transparent" />

      <div className="absolute left-[2%] top-24 h-80 w-80 rounded-full bg-[#f4ddd4]/45 blur-[110px]" />

      <div className="absolute right-[2%] top-24 h-80 w-80 rounded-full bg-[#dfeae7]/60 blur-[110px]" />

      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        {/* =========================================================
            HEADER
        ========================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d4a15f]/20 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.19em] text-[#a66f4e] shadow-sm">
            <Star size={14} />
            A parent&apos;s deepest hope
          </div>

          <h2 className="font-display text-[clamp(2.15rem,3.8vw,3.7rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[#263f57]">
            Two paths.{" "}
            <span className="text-[#c87568]">One promise.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#6e777c]">
            Whether you are guiding a daughter or a son, the destination is
            the same: helping them build the inner strength and life skills to
            thrive long after childhood.
          </p>
        </motion.div>

        {/* =========================================================
            GIRL + BOY VISUAL AREA
        ========================================================== */}
        <div className="mx-auto mt-12 max-w-[1080px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">

            {/* =====================================================
                DAUGHTER
            ====================================================== */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65 }}
              className="flex flex-col"
            >
              {/* Girl image stage */}
              <div className="relative h-[430px] sm:h-[470px]">
                {/* Peach circle */}
                <div className="absolute bottom-4 left-1/2 h-[330px] w-[330px] -translate-x-1/2 rounded-full bg-[#f7ddd6] sm:h-[390px] sm:w-[390px]" />

                {/* Decorative text */}
                <div className="absolute left-[3%] top-16 z-20 rotate-[-3deg] font-display text-lg font-bold italic leading-[0.95] text-[#c87568] sm:left-[4%] sm:text-2xl">
                  Confident
                  <br />
                  tomorrow

                  <div className="mt-3 text-3xl font-normal not-italic">
                    ♡
                  </div>
                </div>

                {/* Girl */}
                <div className="absolute inset-x-0 bottom-0 z-10 mx-auto h-[430px] w-[330px] sm:h-[470px] sm:w-[370px]">
                  <Image
                    src="/images/whole-life/daughter.png"
                    alt="Young woman representing a daughter"
                    fill
                    priority
                    sizes="(max-width: 640px) 330px, 370px"
                    className="object-contain object-bottom"
                  />
                </div>
              </div>

              {/* Daughter card */}
              <div className="relative z-30 mx-auto -mt-2 w-full max-w-[390px] rounded-2xl border border-[#c87568]/12 bg-white px-6 py-4 shadow-[0_18px_45px_rgba(38,63,87,0.12)]">
                <div className="flex items-center justify-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fbebe7] text-[#c87568]">
                    <MessageCircleMore size={21} />
                  </span>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#b3655b]">
                      For your
                    </p>

                    <p className="font-display text-2xl font-bold leading-tight text-[#263f57]">
                      Daughter
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* =====================================================
                SON
            ====================================================== */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65 }}
              className="flex flex-col"
            >
              {/* Boy image stage */}
              <div className="relative h-[430px] sm:h-[470px]">
                {/* Blue circle */}
                <div className="absolute bottom-4 left-1/2 h-[330px] w-[330px] -translate-x-1/2 rounded-full bg-[#deebf1] sm:h-[390px] sm:w-[390px]" />

                {/* Decorative text */}
                <div className="absolute right-[3%] top-16 z-20 rotate-[3deg] text-right font-display text-lg font-bold italic leading-[0.95] text-[#557d75] sm:right-[4%] sm:text-2xl">
                  Stronger
                  <br />
                  tomorrow

                  <div className="mt-3 text-3xl font-normal not-italic">
                    ↗
                  </div>
                </div>

                {/* Boy */}
                <div className="absolute inset-x-0 bottom-0 z-10 mx-auto h-[430px] w-[330px] sm:h-[470px] sm:w-[370px]">
                  <Image
                    src="/images/whole-life/son.png"
                    alt="Young man representing a son"
                    fill
                    priority
                    sizes="(max-width: 640px) 330px, 370px"
                    className="object-contain object-bottom"
                  />
                </div>
              </div>

              {/* Son card */}
              <div className="relative z-30 mx-auto -mt-2 w-full max-w-[390px] rounded-2xl border border-[#557d75]/12 bg-white px-6 py-4 shadow-[0_18px_45px_rgba(38,63,87,0.12)]">
                <div className="flex items-center justify-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e9f1ee] text-[#557d75]">
                    <BrainCircuit size={21} />
                  </span>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#557d75]">
                      For your
                    </p>

                    <p className="font-display text-2xl font-bold leading-tight text-[#263f57]">
                      Son
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* =======================================================
              CENTER HEART + CONNECTOR LINES
              Separate row = no overlap possible
          ======================================================== */}
          <div className="relative mt-7 hidden h-[78px] lg:block">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 1080 78"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Daughter → center */}
              <motion.path
                d="M180 5 C300 5 400 65 540 65"
                stroke="#c87568"
                strokeWidth="2"
                strokeDasharray="6 7"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.2,
                  duration: 0.9,
                }}
              />

              {/* Son → center */}
              <motion.path
                d="M900 5 C780 5 680 65 540 65"
                stroke="#557d75"
                strokeWidth="2"
                strokeDasharray="6 7"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.2,
                  duration: 0.9,
                }}
              />
            </svg>

            {/* Center heart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.25,
                duration: 0.5,
                type: "spring",
                stiffness: 170,
              }}
              className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#263f57] text-white shadow-[0_14px_35px_rgba(38,63,87,0.25)] ring-8 ring-[#fcfaf7]">
                <HeartHandshake size={26} />
              </div>
            </motion.div>
          </div>

          {/* Mobile center heart */}
          <div className="flex justify-center py-6 lg:hidden">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#263f57] text-white shadow-[0_14px_35px_rgba(38,63,87,0.22)] ring-8 ring-[#fcfaf7]">
              <HeartHandshake size={25} />
            </div>
          </div>
        </div>

        {/* =========================================================
            FOUNDATIONS
        ========================================================== */}
        <div className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {foundations.map(
            ({ number, title, detail, icon: Icon, color, tint }, index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                transition={{
                  delay: (index % 3) * 0.07,
                  duration: 0.45,
                }}
                whileHover={{ y: -3 }}
                className="group flex items-start gap-4 rounded-2xl border border-[#263f57]/8 bg-white p-4 shadow-[0_8px_26px_rgba(38,63,87,0.04)] transition-shadow hover:shadow-[0_14px_35px_rgba(38,63,87,0.08)] sm:p-5"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
                  style={{
                    color,
                    backgroundColor: tint,
                  }}
                >
                  <Icon size={20} />
                </span>

                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[9px] font-bold tracking-[0.15em]"
                      style={{ color }}
                    >
                      {number}
                    </span>

                    <span
                      className="h-px w-5"
                      style={{
                        backgroundColor: `${color}55`,
                      }}
                    />
                  </div>

                  <h3 className="mt-1 text-[15px] font-bold text-[#263f57]">
                    {title}
                  </h3>

                  <p className="mt-1 text-[12px] leading-5 text-[#747d82]">
                    {detail}
                  </p>
                </div>
              </motion.article>
            )
          )}
        </div>

        {/* =========================================================
            BOTTOM MEASURE
        ========================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            delay: 0.15,
            duration: 0.5,
          }}
          className="mx-auto mt-8 flex max-w-4xl flex-col items-center justify-between gap-3 rounded-2xl bg-[#263f57] px-5 py-5 text-center shadow-[0_14px_35px_rgba(38,63,87,0.15)] sm:flex-row sm:text-left"
        >
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#efc18e]">
              The measure that matters
            </p>

            <p className="mt-1 text-sm font-semibold text-white sm:text-[15px]">
              At 70: health, meaningful experiences, lasting relationships, and
              satisfaction with the life they built.
            </p>
          </div>

          <Sparkles
            size={22}
            className="shrink-0 text-[#efc18e]"
          />
        </motion.div>
      </div>
    </section>
  );
}