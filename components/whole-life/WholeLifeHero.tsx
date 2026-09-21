"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  HeartHandshake,
  Landmark,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";

const lifeStages = [
  { label: "Education", icon: GraduationCap },
  { label: "Career", icon: BriefcaseBusiness },
  { label: "Finances", icon: Landmark },
  { label: "Marriage", icon: HeartHandshake },
  { label: "Family", icon: UsersRound },
  { label: "Stability", icon: ShieldCheck },
];

/*
  Add your Whole Life hero photos here.

  Recommended:
  01 — counselling / family consultation
  02 — education / young person planning future
  03 — career / professional consultation
  04 — marriage / couple
  05 — family / family planning
  06 — retirement / older couple

  Put the images inside:

  public/images/whole-life/

  Example:
  /images/whole-life/hero-1.jpg
  /images/whole-life/hero-2.jpg
  etc.
*/

const heroImages = [
  "/images/whole-life/hero-1.jpg",
  "/images/whole-life/hero-2.jpg",
  "/images/whole-life/hero-3.jpg",
  "/images/whole-life/hero-4.jpg",
  "/images/whole-life/hero-5.jpg",
  "/images/whole-life/hero-6.jpg",
];

export default function WholeLifeHero() {
  const [activeImage, setActiveImage] = useState(0);

  /*
    Automatic photo rotation.
    No visible controls.
  */
  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % heroImages.length);
    }, 5500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative isolate min-h-[calc(100vh-70px)] overflow-hidden bg-[#263f57]">
      {/* =========================================================
          AUTOMATIC CINEMATIC PHOTO BACKGROUND
          ========================================================= */}

      <div className="absolute inset-0 -z-30 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={heroImages[activeImage]}
            initial={{
              opacity: 0,
              scale: 1.02,
            }}
            animate={{
              opacity: 1,
              scale: 1.07,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              opacity: {
                duration: 1.4,
                ease: "easeInOut",
              },
              scale: {
                duration: 6.2,
                ease: "easeOut",
              },
            }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[activeImage]}
              alt=""
              fill
              priority={activeImage === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* =========================================================
          DARK CINEMATIC OVERLAY
          ========================================================= */}

      <div className="absolute inset-0 -z-20 bg-[#071624]/55" />

      {/* Left-side darker gradient for text readability */}

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071624]/90 via-[#071624]/65 to-[#071624]/25" />

      {/* Bottom cinematic gradient */}

      <div className="absolute inset-x-0 bottom-0 -z-10 h-[45%] bg-gradient-to-t from-[#071624]/75 via-[#071624]/20 to-transparent" />

      {/* Warm highlight */}

      <div className="pointer-events-none absolute right-[8%] top-[12%] -z-10 h-[420px] w-[420px] rounded-full bg-[#d4a15f]/10 blur-3xl" />

      {/* =========================================================
          MAIN CONTENT
          ========================================================= */}

      <div className="mx-auto flex min-h-[calc(100vh-70px)] max-w-[1380px] items-start px-5 py-8 sm:px-7 sm:py-9 lg:px-10 lg:py-10">
        <div className="grid w-full items-start lg:grid-cols-[1.05fr_0.95fr]">
          {/* =====================================================
              LEFT CONTENT
              ===================================================== */}

          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 max-w-[760px] pt-1"
          >
            {/* =================================================
                LOGO + BADGE
                ================================================= */}

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.1,
              }}
              className="mb-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            >
              <motion.div
                animate={{
                  y: [0, -4],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                className="relative z-20 shrink-0 translate-y-7"
              >
                <div className="absolute inset-0 rounded-full bg-[#d89176]/20 blur-xl" />

                <Image
                  src="/images/whole-life-logo-transparent.png"
                  alt="Whole Life — Guidance, Commitment, Perseverance"
                  width={120}
                  height={120}
                  priority
                  className="relative h-auto w-[92px] sm:w-[105px]"
                />
              </motion.div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white shadow-lg backdrop-blur-xl">
                <Sparkles
                  size={14}
                  className="text-[#e9aa68]"
                />

                A lifetime partnership, not a one-time service
              </div>
            </motion.div>

            {/* =================================================
                EXACT ORIGINAL HEADLINE
                ================================================= */}

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-[760px] font-display text-[clamp(3rem,6vw,5.8rem)] font-bold leading-[0.94] tracking-[-0.055em] text-white"
            >
              One system for your

              <span className="mt-2 block bg-gradient-to-r from-[#e9a06f] via-[#e9aa68] to-[#d89176] bg-clip-text text-transparent">
                whole life.
              </span>
            </motion.h1>

            {/* =================================================
                EXACT ORIGINAL PARAGRAPH
                ================================================= */}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.35,
              }}
              className="mt-7 max-w-[690px] text-base leading-7 text-white/85 sm:text-lg sm:leading-8"
            >
              Continuous, thoughtful counseling through the decisions that
              shape your future—from education and career to finances,
              marriage, family, and long-term stability.
            </motion.p>

            {/* =================================================
                CTA BUTTONS
                ================================================= */}

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.48,
              }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#0d4f91] px-7 py-4 text-sm font-bold text-white shadow-[0_14px_35px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#1263b4] hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
              >
                Start the conversation

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <a
                href="#life-journey"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-7 py-4 text-sm font-bold text-white shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
              >
                Explore the journey

                <ArrowRight
                  size={15}
                  className="opacity-70 transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </motion.div>

            {/* =================================================
                LIFE STAGE NAVIGATION
                Same content, but no interaction required.
                Active stage automatically moves with photos.
                ================================================= */}

            <motion.ol
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.62,
              }}
              className="mt-10 grid grid-cols-3 gap-x-3 gap-y-5 border-t border-white/20 pt-6 sm:grid-cols-6"
            >
              {lifeStages.map(
                ({ label, icon: Icon }, index) => {
                  /*
                    Map the six photos to the six existing
                    life-stage labels.
                  */
                  const isActive =
                    index === activeImage % lifeStages.length;

                  return (
                    <li
                      key={label}
                      className="relative flex flex-col gap-2"
                    >
                      <span className="flex items-center gap-2">
                        <motion.span
                          animate={{
                            scale: isActive ? 1.1 : 1,
                            y: isActive ? -2 : 0,
                          }}
                          transition={{
                            duration: 0.35,
                            ease: "easeOut",
                          }}
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-500 ${
                            isActive
                              ? "border-[#e9aa68] bg-[#e9aa68]/20 text-[#e9aa68]"
                              : "border-white/25 bg-white/10 text-white/75"
                          }`}
                        >
                          <Icon
                            size={14}
                            strokeWidth={1.8}
                          />
                        </motion.span>

                        {index < lifeStages.length - 1 && (
                          <span
                            className={`hidden h-px flex-1 transition-all duration-700 sm:block ${
                              isActive
                                ? "bg-[#e9aa68]/80"
                                : "bg-white/20"
                            }`}
                          />
                        )}
                      </span>

                      <span
                        className={`text-[10px] font-bold uppercase tracking-[0.07em] transition-all duration-500 ${
                          isActive
                            ? "text-white"
                            : "text-white/55"
                        }`}
                      >
                        {label}
                      </span>
                    </li>
                  );
                }
              )}
            </motion.ol>
          </motion.div>

          {/* =====================================================
              RIGHT SIDE — EMPTY INTENTIONALLY

              The photograph itself is the visual storytelling.
              We don't put cards/trees/controls over it.
              ===================================================== */}

          <div className="hidden lg:block" />
        </div>
      </div>

      {/* =========================================================
          SUBTLE PHOTO TRANSITION GLOW
          ========================================================= */}

      <motion.div
        key={`glow-${activeImage}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.12, 0] }}
        transition={{
          duration: 1.8,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute inset-0 -z-5 bg-[#e9aa68]"
      />

      {/* =========================================================
          MOBILE PHOTO OVERLAY
          ========================================================= */}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#071624]/60 to-transparent lg:hidden" />

      {/* Bottom edge */}

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e9aa68]/60 to-transparent" />
    </section>
  );
}