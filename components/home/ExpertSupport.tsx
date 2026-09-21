"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  UserCheck,
  Clock,
  ShieldCheck,
  ArrowRight,
  Check,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Animated Counter
// ─────────────────────────────────────────────────────────────

function Counter({
  to,
  suffix = "",
  duration = 1.2,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  useEffect(() => {
    if (!inView) return;

    let start: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;

      const progress = Math.min(
        (timestamp - start) / (duration * 1000),
        1
      );

      // Smooth ease-out
      const eased =
        progress === 1
          ? 1
          : 1 - Math.pow(2, -10 * progress);

      setValue(Math.round(eased * to));

      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// Feature Data
// ─────────────────────────────────────────────────────────────

const features = [
  {
    icon: UserCheck,
    accent: "#2563EB",
    accentDark: "#082B5C",
    lightBg: "#EEF5FF",
    glow: "rgba(37,99,235,0.22)",

    statTo: 1,
    statSuffix: ":1",
    statLabel: "Dedicated",

    title: "Your CPA. Always.",

    body:
      "A named, credentialed accountant on every file — not a support ticket queue.",

    details: [
      "Dedicated CPA assigned to your account",
      "Direct communication with your accountant",
      "Personalized financial guidance",
      "No support-ticket handoffs",
    ],
  },

  {
    icon: Clock,
    accent: "#F59E0B",
    accentDark: "#D97706",
    lightBg: "#FFF7E8",
    glow: "rgba(245,158,11,0.25)",

    statTo: 100,
    statSuffix: "%",
    statLabel: "On-time rate",

    title: "Clear timelines. Met.",

    body:
      "Deadlines committed upfront, in writing. No chasing, no last-minute surprises.",

    details: [
      "Personalized filing timeline",
      "Proactive deadline reminders",
      "Real-time status updates",
      "Clear communication throughout",
      "No last-minute rush",
    ],
  },

  {
    icon: ShieldCheck,
    accent: "#059669",
    accentDark: "#047857",
    lightBg: "#ECFDF5",
    glow: "rgba(5,150,105,0.23)",

    statTo: 100,
    statSuffix: "%",
    statLabel: "Reviewed",

    title: "Right the first time.",

    body:
      "Every return, report, and filing goes through an internal review before delivery.",

    details: [
      "Internal quality-control review",
      "Every filing checked before delivery",
      "Accuracy-focused workflow",
      "Multiple verification points",
      "Professional standards maintained",
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// Card Animation
// ─────────────────────────────────────────────────────────────

const cardEntrance = {
  hidden: {
    opacity: 0,
    y: 35,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween" as const,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as [
        number,
        number,
        number,
        number
      ],
    },
  },
};

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────

export default function ExpertSupport() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">

      {/* ───────────────── Background Decoration ───────────────── */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Soft blue glow */}
        <motion.div
          className="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.08), transparent 68%)",
          }}
          animate={{
            x: [0, 25, 0],
            y: [0, -15, 0],
          }}
          transition={{
            type: "tween",
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Orange glow */}
        <motion.div
          className="absolute right-[-160px] top-[25%] h-[420px] w-[420px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(245,158,11,0.07), transparent 68%)",
          }}
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            type: "tween",
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Subtle dots */}
        <div
          className="absolute right-8 top-16 h-32 w-32 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(#93C5FD 1.5px, transparent 1.5px)",
            backgroundSize: "14px 14px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">

        {/* ───────────────── Header ───────────────── */}

        <div className="grid grid-cols-1 items-end gap-8 mb-12 lg:grid-cols-[1fr_auto]">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              type: "tween",
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#F59E0B]">
              Expert Support
            </p>

            <h2
              className="font-display font-bold leading-[1.08] text-[#082B5C]"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.15rem)",
              }}
            >
              Professional support,
              <br className="hidden lg:block" />
              {" "}not a self-service portal.
            </h2>

            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#6B7280]">
              Work directly with experienced CPAs who understand your
              business, respond quickly, and deliver with precision.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "tween",
              duration: 0.6,
              delay: 0.2,
            }}
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 whitespace-nowrap rounded-full bg-[#082B5C] px-7 py-4 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(8,43,92,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#0D3D7A] hover:shadow-[0_15px_35px_rgba(8,43,92,0.25)]"
            >
              Get Expert Help

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>

        {/* ───────────────── Cards ───────────────── */}

        <motion.div
          className="flex flex-col gap-5 lg:flex-row lg:items-stretch"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-60px",
          }}
        >
          {features.map((f, index) => {
            const isHovered = hovered === index;
            const hasHoveredCard = hovered !== null;

            return (
              <motion.article
                key={f.title}
                variants={cardEntrance}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className="relative min-w-0 overflow-hidden rounded-[24px]"
                animate={{
                  flex:
                    hovered === null
                      ? 1
                      : isHovered
                      ? 1.45
                      : 0.82,

                  y: isHovered ? -10 : 0,

                  scale:
                    isHovered
                      ? 1.015
                      : hasHoveredCard
                      ? 0.985
                      : 1,
                }}
                transition={{
                  type: "tween",
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  boxShadow: isHovered
                    ? `0 25px 60px ${f.glow}`
                    : "0 8px 30px rgba(15,23,42,0.07)",
                }}
              >

                {/* Card background */}
                <div
                  className="absolute inset-0 rounded-[24px] border bg-white"
                  style={{
                    borderColor: isHovered
                      ? `${f.accent}55`
                      : "#E5E7EB",
                  }}
                />

                {/* Animated accent glow */}
                <motion.div
                  className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${f.glow}, transparent 68%)`,
                  }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1.2 : 0.7,
                  }}
                  transition={{
                    type: "tween",
                    duration: 0.45,
                    ease: "easeOut",
                  }}
                />

                {/* Top accent line */}
                <motion.div
                  className="relative z-10 mx-6 mt-5 h-[3px] rounded-full"
                  style={{
                    backgroundColor: f.accent,
                  }}
                  animate={{
                    scaleX: isHovered ? 1 : 0.75,
                    opacity: isHovered ? 1 : 0.9,
                  }}
                  transition={{
                    type: "tween",
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                />

                <div className="relative z-10 p-6">

                  {/* Icon + stat */}
                  <div className="mb-6 flex items-start justify-between">

                    <motion.div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl"
                      style={{
                        backgroundColor: f.lightBg,
                        boxShadow: isHovered
                          ? `0 10px 30px ${f.glow}`
                          : "none",
                      }}
                      animate={{
                        scale: isHovered ? 1.12 : 1,
                        rotate: isHovered ? -3 : 0,
                      }}
                      transition={{
                        type: "tween",
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <f.icon
                        size={22}
                        strokeWidth={1.8}
                        style={{
                          color: f.accent,
                        }}
                      />
                    </motion.div>

                    <div className="text-right">

                      <motion.p
                        className="font-display font-extrabold leading-none"
                        style={{
                          color: f.accentDark,
                          fontSize: isHovered
                            ? "2rem"
                            : "1.55rem",
                        }}
                        transition={{
                          type: "tween",
                          duration: 0.3,
                        }}
                      >
                        <Counter
                          to={f.statTo}
                          suffix={f.statSuffix}
                        />
                      </motion.p>

                      <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#9CA3AF]">
                        {f.statLabel}
                      </p>
                    </div>
                  </div>

                  {/* Title */}
                  <motion.h3
                    className="font-display font-bold text-[#1F2937]"
                    animate={{
                      fontSize: isHovered
                        ? "20px"
                        : "16px",
                    }}
                    transition={{
                      type: "tween",
                      duration: 0.3,
                    }}
                  >
                    {f.title}
                  </motion.h3>

                  {/* Description */}
                  <p className="mt-2 text-[13px] leading-relaxed text-[#6B7280]">
                    {f.body}
                  </p>

                  {/* Expanded content */}
                  <AnimatePresence initial={false}>
                    {isHovered && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          height: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                          y: 8,
                        }}
                        transition={{
                          type: "tween",
                          duration: 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="my-5 h-px bg-gray-100" />

                        <div className="space-y-3">
                          {f.details.map((detail, detailIndex) => (
                            <motion.div
                              key={detail}
                              initial={{
                                opacity: 0,
                                x: -10,
                              }}
                              animate={{
                                opacity: 1,
                                x: 0,
                              }}
                              transition={{
                                type: "tween",
                                duration: 0.3,
                                delay: detailIndex * 0.05,
                              }}
                              className="flex items-start gap-2.5"
                            >
                              <span
                                className="mt-[2px] flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
                                style={{
                                  backgroundColor: f.accent,
                                }}
                              >
                                <Check
                                  size={10}
                                  strokeWidth={3}
                                  className="text-white"
                                />
                              </span>

                              <span className="text-[12px] leading-relaxed text-[#4B5563]">
                                {detail}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Bottom CTA */}
                  <div className="mt-6 flex items-center justify-between">

                    <div className="flex items-center gap-3">
                      <motion.span
                        className="text-[10px] font-bold uppercase tracking-[0.15em]"
                        style={{
                          color: f.accentDark,
                        }}
                      >
                        {isHovered
                          ? "Learn More"
                          : "Explore"}
                      </motion.span>

                      <motion.div
                        className="h-[2px] rounded-full"
                        style={{
                          backgroundColor: f.accent,
                        }}
                        animate={{
                          width: isHovered
                            ? 70
                            : 35,
                        }}
                        transition={{
                          type: "tween",
                          duration: 0.3,
                        }}
                      />
                    </div>

                    <motion.div
                      className="flex h-10 w-10 items-center justify-center rounded-full border"
                      style={{
                        borderColor: `${f.accent}55`,
                        backgroundColor: f.lightBg,
                      }}
                      animate={{
                        x: isHovered ? 4 : 0,
                        rotate: isHovered ? 0 : 0,
                        scale: isHovered ? 1.08 : 1,
                      }}
                      transition={{
                        type: "tween",
                        duration: 0.3,
                      }}
                    >
                      <ArrowRight
                        size={17}
                        style={{
                          color: f.accentDark,
                        }}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* ───────────────── Bottom Statement ───────────────── */}

        <motion.div
          className="mt-16 text-center"
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            type: "tween",
            duration: 0.6,
          }}
        >
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9CA3AF]">
            More Than Accounting
          </p>

          <h3 className="font-display text-2xl font-bold text-[#082B5C] lg:text-3xl">
            A True Partner in Your Success
          </h3>
        </motion.div>

      </div>
    </section>
  );
}