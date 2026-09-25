"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  GraduationCap,
  BriefcaseBusiness,
  Landmark,
  Heart,
  Users,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const heroImages = [
  "/images/whole-life/hero-1.jpg",
  "/images/whole-life/hero-2.jpg",
  "/images/whole-life/hero-3.jpg",
  "/images/whole-life/hero-4.jpg",
  "/images/whole-life/hero-5.jpg",
  "/images/whole-life/hero-6.jpg",
];

const lifeStages = [
  {
    label: "Education",
    icon: GraduationCap,
  },
  {
    label: "Career",
    icon: BriefcaseBusiness,
  },
  {
    label: "Finances",
    icon: Landmark,
  },
  {
    label: "Marriage",
    icon: Heart,
  },
  {
    label: "Family",
    icon: Users,
  },
  {
    label: "Stability",
    icon: ShieldCheck,
  },
];

export default function WholeLifeHero() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((current) => (current + 1) % heroImages.length);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#071A2D] text-white">
      {/* =========================================================
          BACKGROUND IMAGE
      ========================================================= */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={heroImages[activeImage]}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: {
                duration: 1.2,
                ease: "easeInOut",
              },
              scale: {
                duration: 6,
                ease: "linear",
              },
            }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[activeImage]}
              alt="Whole Life counseling"
              fill
              priority={activeImage === 0}
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
  initial={{ opacity: 0, y: -8 }}
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
            TOP EYEBROW
        ======================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative z-20 mb-10 flex items-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[11px] font-semibold tracking-wide text-white backdrop-blur-md sm:text-xs">
            <Sparkles size={14} className="text-[#F3A15F]" />
            <span>A lifetime partnership, not a one-time service</span>
          </div>
        </motion.div>

        {/* =======================================================
            MAIN CONTENT
        ======================================================= */}
        <div className="flex flex-1 flex-col justify-center pb-4">
          <div className="max-w-[780px]">

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-display text-[clamp(3.4rem,7vw,6.2rem)] font-bold leading-[0.94] tracking-[-0.055em]"
            >
              <span className="block">One system for</span>
              <span className="block">your</span>
              <span className="block text-[#F3A15F]">
                whole life.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.35,
                ease: "easeOut",
              }}
              className="mt-8 max-w-[720px] text-base leading-7 text-white/80 sm:text-lg"
            >
              Continuous, thoughtful counseling through the decisions that
              shape your future—from education and career to finances,
              marriage, family, and long-term stability.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.45,
                ease: "easeOut",
              }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href="/contact/#booking"
                className="group inline-flex items-center gap-3 rounded-full bg-[#1769C2] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1B75D0] hover:shadow-xl"
              >
                <span>Start the conversation</span>
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              
            </motion.div>
          </div>
        </div>

        {/* =======================================================
            LIFE STAGES
        ======================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            ease: "easeOut",
          }}
          className="relative z-20 mt-6 max-w-[760px] border-t border-white/20 pt-5"
        >
          <div className="grid grid-cols-6 gap-1 sm:gap-3">
            {lifeStages.map((stage, index) => {
              const Icon = stage.icon;
              const isActive = index === activeImage;

              return (
                <motion.div
                  key={stage.label}
                  animate={{
                    opacity: isActive ? 1 : 0.62,
                  }}
                  transition={{ duration: 0.4 }}
                  className="relative flex flex-col items-center"
                >
                  <div className="flex w-full items-center">
                    {index > 0 && (
                      <div
                        className={`h-px flex-1 transition-colors duration-500 ${
                          index <= activeImage
                            ? "bg-[#F3A15F]"
                            : "bg-white/20"
                        }`}
                      />
                    )}

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
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
                    >
                      <Icon
                        size={15}
                        className={
                          isActive
                            ? "text-[#F3A15F]"
                            : "text-white/75"
                        }
                      />
                    </motion.div>

                    {index < lifeStages.length - 1 && (
                      <div
                        className={`h-px flex-1 transition-colors duration-500 ${
                          index < activeImage
                            ? "bg-[#F3A15F]"
                            : "bg-white/20"
                        }`}
                      />
                    )}
                  </div>

                  <span
                    className={`mt-2 text-center text-[9px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 sm:text-[10px] ${
                      isActive
                        ? "text-white"
                        : "text-white/55"
                    }`}
                  >
                    {stage.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}