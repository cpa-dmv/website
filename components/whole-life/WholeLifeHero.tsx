"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CloudRain,
  Compass,
  MessageCircle,
  HeartHandshake,
  Users,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const SLIDE_DURATION_MS = 3500; // 3.5 seconds

const slides = [
  {
    image: "/images/whole-life/hero-1.jpg?v=20261016",
    stageLabel: "The Reality",
    icon: CloudRain,
    eyebrow: "Relationship challenges are more common than you think",
    headingLines: ["Nearly 1.87 million", "Americans divorced in 2024-2026."],
    description:
      "Relationship struggles can affect more than two people—they can shape family life, emotional wellbeing, and the future couples imagined together. Behind every statistic is a personal story, and every situation deserves to be understood.",
    sourceNote:
      "Source: National Center for Family & Marriage Research analysis of U.S. Census Bureau data (2024-2026). This is a count, not the percentage of marriages that end in divorce.",
  },
  {
    image: "/images/whole-life/hero-2.jpg?v=20261016",
    stageLabel: "The Challenge",
    icon: MessageCircle,
    eyebrow: "When communication starts to break down",
    headingLines: ["Distance can grow", "one conversation at a time."],
    description:
      "Repeated arguments, feeling unheard, unresolved hurt, and uncertainty about trust can leave couples feeling far apart. Naming the challenge is not about assigning blame—it is a first step toward understanding what is happening.",
  },
  {
    image: "/images/whole-life/hero-3.jpg?v=20261016",
    stageLabel: "Support",
    icon: Compass,
    eyebrow: "You do not have to navigate it alone",
    headingLines: ["A safe space", "to talk things through."],
    description:
      "WholeLife marital counselling offers couples a supportive place to explore concerns, hear each other more clearly, and consider constructive ways forward. Every relationship is different, and outcomes cannot be guaranteed—but support can help you approach the next step with care.",
  },
  {
    image: "/images/whole-life/hero-4.jpg?v=20261016",
    stageLabel: "Communication",
    icon: HeartHandshake,
    eyebrow: "Make room for honest conversations",
    headingLines: ["Listen better.", "Understand more."],
    description:
      "Work toward expressing needs more clearly, listening with greater care, and approaching difficult conversations with mutual respect. Meaningful change often begins when both people have room to be heard.",
  },
  {
    image: "/images/whole-life/hero-5.jpg?v=20261016",
    stageLabel: "Rebuild Trust",
    icon: ShieldCheck,
    eyebrow: "Progress takes time—and support",
    headingLines: ["Rebuild trust", "at your own pace."],
    description:
      "Trust can take time, honesty, and consistent effort to rebuild. Guided conversations may help couples understand concerns, discuss boundaries, and decide what a healthier path forward could look like.",
  },
  {
    image: "/images/whole-life/hero-6.jpg?v=20261016",
    stageLabel: "Take a Step",
    icon: Users,
    eyebrow: "A conversation can be a beginning",
    headingLines: ["Take the first step", "toward a way forward."],
    description:
      "Start with a conversation about what you are facing and what kind of support may fit your relationship and family. There is no one-size-fits-all answer—just a chance to explore the next step with care.",
  },
];

export default function WholeLifeHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Auto-advance. Restarts after every slide change (including manual
  // selection) and pauses while the visitor is reading or interacting.
  useEffect(() => {
    if (isPaused) return;

    const timeout = setTimeout(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, SLIDE_DURATION_MS);

    return () => clearTimeout(timeout);
  }, [activeIndex, isPaused]);

  const activeSlide = slides[activeIndex];

  return (
    <section
      aria-label="WholeLife marital counselling"
      className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#071A2D] text-white"
    >
      {/* =========================================================
          BACKGROUND IMAGE
      ========================================================= */}
      <div className="absolute inset-0" aria-hidden="true">
        <AnimatePresence mode="sync">
          <motion.div
            key={activeSlide.image}
            initial={{
              opacity: 0,
              scale: shouldReduceMotion ? 1 : 1.04,
            }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: {
                duration: shouldReduceMotion ? 0.2 : 0.8,
                ease: "easeInOut",
              },
              scale: {
                duration: shouldReduceMotion ? 0 : 4.8,
                ease: "linear",
              },
            }}
            className="absolute inset-0"
          >
            <Image
              src={activeSlide.image}
              alt=""
              fill
              priority={activeIndex === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark overall overlay */}
        <div className="absolute inset-0 bg-[#071A2D]/45" />

        {/* Strong left-side readability gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#06182A]/95 via-[#071A2D]/75 to-[#071A2D]/25" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#06182A]/95 to-transparent" />

        {/* Subtle cinematic glow */}
        <div className="absolute left-[30%] top-[20%] h-[420px] w-[420px] rounded-full bg-[#F3A15F]/5 blur-3xl" />
      </div>

      {/* =========================================================
          CONTENT
      ========================================================= */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-[1500px] flex-col px-6 pb-8 pt-6 sm:px-10 lg:px-14">
        {/* =========================================================
            WHOLE LIFE LOGO
            Hero page only — top right
        ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute right-6 top-14 z-[50] sm:right-10 sm:top-16 lg:right-14 lg:top-20"
        >
          <div className="flex items-center justify-center rounded-2xl bg-white/10 px-3 py-2 backdrop-blur-md">
            <Image
              src="/images/whole-life-logo-transparent.png"
              alt="Whole Life"
              width={180}
              height={180}
              priority
              className="block h-auto w-[105px] object-contain sm:w-[120px] lg:w-[135px]"
            />
          </div>
        </motion.div>

        {/* =======================================================
            MAIN CONTENT
        ======================================================= */}
        <div
          className="flex flex-1 flex-col justify-center pb-4 pt-16 sm:pt-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <div className="max-w-[780px]">
            {/* Slide text: eyebrow, heading, description change together */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{
                  opacity: 0,
                  y: shouldReduceMotion ? 0 : 20,
                }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: shouldReduceMotion ? 0 : -12,
                }}
                transition={{
                  duration: shouldReduceMotion ? 0.2 : 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Eyebrow */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[11px] font-semibold tracking-wide text-white backdrop-blur-md sm:text-xs">
                  <Sparkles
                    size={14}
                    className="text-[#F3A15F]"
                    aria-hidden="true"
                  />
                  <span>{activeSlide.eyebrow}</span>
                </div>

                {/* Main Heading */}
                <h1 className="font-display text-[clamp(2.6rem,5.8vw,5.2rem)] font-bold leading-[0.98] tracking-[-0.05em]">
                  {activeSlide.headingLines.map((line, lineIndex) => (
                    <span
                      key={line}
                      className={`block ${
                        lineIndex === activeSlide.headingLines.length - 1
                          ? "text-[#F3A15F]"
                          : ""
                      }`}
                    >
                      {line}
                    </span>
                  ))}
                </h1>

                {/* Description */}
                <p className="mt-8 max-w-[720px] text-base leading-7 text-white/80 sm:text-lg">
                  {activeSlide.description}
                </p>
                {activeSlide.sourceNote && (
                  <p className="mt-3 max-w-[720px] text-xs leading-5 text-white/65">
                    {activeSlide.sourceNote}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.45,
                ease: "easeOut",
              }}
              className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
            >
              

              {/*
                NOTE: "Free 30-Minute Session" is the wording requested.
                Confirm the free-session offer and its terms before publishing.
              */}
              <a
                href="/contact/#booking"
                className="inline-flex w-fit items-center rounded-full bg-[#F3A15F] px-6 py-3.5 text-sm font-semibold text-[#071A2D] shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F7B176] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#071A2D]"
              >
                <span>Free 30-Minute Session - Book Now</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* =======================================================
            STAGE INDICATORS
        ======================================================= */}
        <motion.nav
          aria-label="Counselling topics"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            ease: "easeOut",
          }}
          className="relative z-20 mt-6 max-w-[760px] border-t border-white/20 pt-5"
        >
          <ol className="grid grid-cols-6 gap-1 sm:gap-3">
            {slides.map((slide, index) => {
              const Icon = slide.icon;
              const isActive = index === activeIndex;

              return (
                <motion.li
                  key={slide.stageLabel}
                  animate={{
                    opacity: isActive ? 1 : 0.62,
                  }}
                  transition={{ duration: 0.4 }}
                  className="relative flex flex-col items-center"
                >
                  <div className="flex w-full items-center">
                    {index > 0 && (
                      <div
                        aria-hidden="true"
                        className={`h-px flex-1 transition-colors duration-500 ${
                          index <= activeIndex
                            ? "bg-[#F3A15F]"
                            : "bg-white/20"
                        }`}
                      />
                    )}

                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Show slide ${index + 1}: ${slide.stageLabel}`}
                      aria-current={isActive ? "true" : undefined}
                      className="shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#071A2D]"
                    >
                      <motion.div
                        animate={{
                          scale: isActive ? 1.08 : 1,
                          borderColor: isActive
                            ? "#F3A15F"
                            : "rgba(255,255,255,0.25)",
                          backgroundColor: isActive
                            ? "rgba(243,161,95,0.12)"
                            : "rgba(255,255,255,0.06)",
                        }}
                        transition={{
                          duration: 0.4,
                          ease: "easeOut",
                        }}
                        className="flex h-9 w-9 items-center justify-center rounded-full border"
                      >
                        <Icon
                          size={15}
                          aria-hidden="true"
                          className={
                            isActive ? "text-[#F3A15F]" : "text-white/75"
                          }
                        />
                      </motion.div>
                    </button>

                    {index < slides.length - 1 && (
                      <div
                        aria-hidden="true"
                        className={`h-px flex-1 transition-colors duration-500 ${
                          index < activeIndex
                            ? "bg-[#F3A15F]"
                            : "bg-white/20"
                        }`}
                      />
                    )}
                  </div>

                  <span
                    className={`mt-2 text-center text-[9px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 sm:text-[10px] ${
                      isActive ? "text-white" : "text-white/55"
                    }`}
                  >
                    {slide.stageLabel}
                  </span>
                </motion.li>
              );
            })}
          </ol>
        </motion.nav>
      </div>
    </section>
  );
}
