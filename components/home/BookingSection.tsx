"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/shared/AnimatedSection";
import {
  Calendar,
  ShieldCheck,
  Video,
  Clock3,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const bullets = [
  {
    icon: Clock3,
    text: "15-minute initial consultation",
  },
  {
    icon: ShieldCheck,
    text: "Confidential & no-obligation",
  },
  {
    icon: Video,
    text: "Virtual or in-person available",
  },
  {
    icon: CheckCircle2,
    text: "Response within one business day",
  },
];

const BOOKING_URL = "/contact/#booking";

export default function BookingSection() {
  return (
    <section className="relative overflow-hidden bg-[#F7F9FC] py-16 lg:py-24">
      {/* =========================================================
          BACKGROUND DECORATION
          ========================================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large soft blue glow */}
        <div className="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-[#DCEBFA]/45 blur-3xl" />

        {/* Soft gold glow */}
        <div className="absolute -right-32 bottom-0 h-[360px] w-[360px] rounded-full bg-[#F59E0B]/[0.07] blur-3xl" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(8,43,92,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(8,43,92,0.035) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Decorative circles */}
        <motion.div
          className="absolute right-[8%] top-[14%] h-24 w-24 rounded-full border border-[#082B5C]/[0.06]"
          animate={{
            y: [0, -10],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-[12%] left-[7%] h-16 w-16 rounded-full border border-[#F59E0B]/20"
          animate={{
            y: [0, 8],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* =========================================================
            HEADING
            ========================================================= */}

        <AnimatedSection className="mb-10 text-center lg:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-3 flex items-center justify-center gap-2"
          >
            <span className="h-px w-8 bg-[#F59E0B]" />

            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#D97706]">
              No-Obligation
            </p>

            <span className="h-px w-8 bg-[#F59E0B]" />
          </motion.div>

          <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-[#082B5C] sm:text-4xl">
            Book a Consultation
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#6B7280]">
            Get clear answers, practical guidance, and a straightforward path
            forward — with no obligation.
          </p>
        </AnimatedSection>

        {/* =========================================================
            MAIN CARD
            ========================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_25px_70px_rgba(8,43,92,0.12)]"
        >
          <div className="flex flex-col lg:flex-row">
            {/* =====================================================
                LEFT — INFORMATION PANEL
                ===================================================== */}

            <div className="relative overflow-hidden bg-[#082B5C] px-7 py-9 text-white sm:px-10 sm:py-11 lg:w-[390px] lg:flex-shrink-0 lg:px-10 lg:py-12">
              {/* Decorative background */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#1E5A99]/35" />

                <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#0D3D7A]/70" />

                <div className="absolute right-10 top-1/2 h-24 w-24 rounded-full border border-white/[0.05]" />

                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, white 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                  }}
                />
              </div>

              <div className="relative z-10">
                {/* Icon + heading */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-[#F59E0B]/35 bg-[#F59E0B]/10"
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(245,158,11,0)",
                        "0 0 24px rgba(245,158,11,0.22)",
                      ],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  >
                    <Calendar
                      size={25}
                      strokeWidth={1.8}
                      className="text-[#F59E0B]"
                    />
                  </motion.div>

                  <div>
                    <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#F59E0B]">
                      Let's Talk
                    </p>

                    <h3 className="font-display text-[25px] font-bold leading-[1.05]">
                      Book a Free
                      <br />
                      Consultation
                    </h3>
                  </div>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-7 max-w-[300px] text-[13px] leading-6 text-white/65"
                >
                  Schedule a confidential consultation to discuss your
                  situation, goals, and how our team can help.
                </motion.p>

                {/* Benefits */}
                <div className="mt-8 space-y-4">
                  {bullets.map((item, i) => {
                    const Icon = item.icon;

                    return (
                      <motion.div
                        key={item.text}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.45,
                          delay: 0.28 + i * 0.08,
                        }}
                        className="group flex items-center gap-3"
                      >
                        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[#F59E0B]/25 bg-[#F59E0B]/10 transition-colors duration-300 group-hover:border-[#F59E0B]/50 group-hover:bg-[#F59E0B]/15">
                          <Icon
                            size={13}
                            strokeWidth={2}
                            className="text-[#F59E0B]"
                          />
                        </span>

                        <span className="text-[13px] font-medium text-white/78">
                          {item.text}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* CTA */}
                <motion.a
                  href={BOOKING_URL}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.7,
                  }}
                  whileHover={{
                    y: -2,
                    boxShadow: "0 14px 30px rgba(245,158,11,0.28)",
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="mt-9 flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#D99D20] to-[#F59E0B] px-5 py-4 text-[13px] font-bold text-white shadow-[0_8px_20px_rgba(245,158,11,0.18)] transition-all duration-300"
                >
                  <Calendar size={16} />

                  Schedule Your Consultation

                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300"
                  />
                </motion.a>

                {/* Bottom separator */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.85,
                  }}
                  className="mt-7 h-px origin-left bg-gradient-to-r from-[#F59E0B]/50 to-transparent"
                />

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 1,
                  }}
                  className="mt-4 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[#F59E0B]/70"
                >
                  <ShieldCheck size={13} />

                  Free · Confidential · No commitment
                </motion.div>
              </div>
            </div>

            {/* =====================================================
                RIGHT — SCHEDULER AREA
                ===================================================== */}

            <div className="relative flex min-h-[430px] flex-1 items-center justify-center overflow-hidden bg-white px-6 py-12 sm:px-10 lg:min-h-[500px] lg:px-14">
              {/* Right background */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute right-[-80px] top-[-100px] h-[280px] w-[280px] rounded-full bg-[#DCEBFA]/50 blur-3xl" />

                <div className="absolute bottom-[-100px] left-[15%] h-[240px] w-[240px] rounded-full bg-[#F59E0B]/[0.055] blur-3xl" />

                <div
                  className="absolute inset-0 opacity-[0.35]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(8,43,92,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(8,43,92,0.025) 1px, transparent 1px)",
                    backgroundSize: "42px 42px",
                  }}
                />
              </div>

              <div className="relative z-10 w-full max-w-[440px] text-center">
                {/* Floating calendar illustration */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 15 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.65,
                    delay: 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  animate={{
                    y: [0, -7],
                  }}
                  className="mx-auto mb-7 flex h-[92px] w-[92px] items-center justify-center rounded-[26px] border border-[#082B5C]/10 bg-white shadow-[0_15px_35px_rgba(8,43,92,0.10)]"
                >
                  <div className="flex h-14 w-14 flex-col overflow-hidden rounded-xl border border-[#082B5C]/10 bg-[#F7F9FC]">
                    <div className="flex h-4 items-center justify-center bg-[#082B5C]">
                      <span className="text-[6px] font-bold uppercase tracking-wider text-white">
                        CPA-DMV
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col items-center justify-center">
                      <span className="text-[8px] font-bold uppercase text-[#F59E0B]">
                        TODAY
                      </span>

                      <span className="font-display text-[22px] font-bold leading-none text-[#082B5C]">
                        17
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Eyebrow */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mb-2 flex items-center justify-center gap-2"
                >
                  <Sparkles size={13} className="text-[#F59E0B]" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D97706]">
                    Simple & Convenient
                  </span>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="font-display text-2xl font-bold tracking-[-0.02em] text-[#082B5C]"
                >
                  Ready to connect?
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.38 }}
                  className="mx-auto mt-3 max-w-[390px] text-[13px] leading-6 text-[#6B7280]"
                >
                  Choose a date and time that works for you. Booking your
                  consultation takes less than two minutes.
                </motion.p>

                {/* Scheduler CTA */}
                <motion.a
                  href={BOOKING_URL}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.48,
                  }}
                  whileHover={{
                    y: -3,
                    boxShadow: "0 15px 30px rgba(8,43,92,0.20)",
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="group mt-7 inline-flex items-center gap-2.5 rounded-xl bg-[#082B5C] px-7 py-3.5 text-[13px] font-bold text-white shadow-[0_10px_22px_rgba(8,43,92,0.14)] transition-all duration-300 hover:bg-[#0D3D7A]"
                >
                  <Calendar size={15} />

                  Open Scheduler

                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </motion.a>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.6,
                  }}
                  className="mt-4 text-[10px] font-medium uppercase tracking-[0.12em] text-[#9CA3AF]"
                >
                  Weekend appointments only
                </motion.p>

                {/* Trust pills */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.7,
                  }}
                  className="mt-7 flex flex-wrap items-center justify-center gap-2"
                >
                  <span className="rounded-full border border-[#082B5C]/[0.08] bg-[#F7F9FC] px-3 py-1.5 text-[9px] font-semibold text-[#64748B]">
                    ✓ 15 MINUTES
                  </span>

                  <span className="rounded-full border border-[#082B5C]/[0.08] bg-[#F7F9FC] px-3 py-1.5 text-[9px] font-semibold text-[#64748B]">
                    ✓ CONFIDENTIAL
                  </span>

                  <span className="rounded-full border border-[#082B5C]/[0.08] bg-[#F7F9FC] px-3 py-1.5 text-[9px] font-semibold text-[#64748B]">
                    ✓ NO OBLIGATION
                  </span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="h-1 w-full bg-gradient-to-r from-[#082B5C] via-[#F59E0B] to-[#082B5C]" />
        </motion.div>
      </div>
    </section>
  );
}