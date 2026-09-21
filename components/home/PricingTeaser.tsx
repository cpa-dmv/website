"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const CARDS = [
  {
    title: "CPA Advisory & Audits",
    subtitle: "Forensics · CDFA · Attestations",
    price: "Standard Hourly",
    accent: "#082B5C",
    tags: ["CPA", "AUDIT"],
    text: "Contact for pricing",
  },
  {
    title: "Tax & Bookkeeping",
    subtitle: "Business · Individual · Payroll",
    price: "Fixed-Fee Plans",
    accent: "#EEF4FF",
    tags: ["TAX", "BOOKS"],
    text: "Simple, transparent pricing",
  },
  {
    title: "Business Services",
    subtitle: "AP/AR · HR Advisory · QuickBooks",
    price: "Hourly & Retainer",
    accent: "#0D3D7A",
    tags: ["HR", "AP/AR"],
    text: "Contact for pricing",
  },
  {
    title: "Business Valuation",
    subtitle: "Registration · Advisory · Court",
    price: "Engagement-Based",
    accent: "#FFF8EC",
    tags: ["VALUATION", "ADVISORY"],
    text: "Contact for pricing",
  },
];

const AUTO_INTERVAL = 3000;

function FloatCircle({
  size,
  left,
  top,
  opacity = 0.12,
}: {
  size: number;
  left: string;
  top: string;
  opacity?: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left,
        top,
        background:
          "radial-gradient(circle, rgba(37,99,235,0.18) 0%, rgba(37,99,235,0) 70%)",
        opacity,
      }}
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
  );
}

function ServiceCard({
  card,
  index,
  activeIndex,
  onClick,
}: {
  card: (typeof CARDS)[number];
  index: number;
  activeIndex: number;
  onClick: () => void;
}) {
  const position = (index - activeIndex + CARDS.length) % CARDS.length;

  const isFront = position === 0;
  const isSecond = position === 1;
  const isThird = position === 2;

  let y = 0;
  let x = 0;
  let scale = 1;
  let rotate = 0;
  let opacity = 1;
  let zIndex = 30;

  if (isSecond) {
    y = 22;
    x = 18;
    scale = 0.95;
    rotate = -2;
    opacity = 0.95;
    zIndex = 20;
  } else if (isThird) {
    y = 42;
    x = 34;
    scale = 0.9;
    rotate = -4;
    opacity = 0.75;
    zIndex = 10;
  } else if (!isFront) {
    y = 60;
    x = 48;
    scale = 0.86;
    rotate = -6;
    opacity = 0;
    zIndex = 0;
  }

  const isDark =
    card.accent === "#082B5C" || card.accent === "#0D3D7A";

  return (
    <motion.div
      className="absolute inset-x-0 top-0 mx-auto w-full max-w-[495px] cursor-pointer"
      style={{ zIndex }}
      animate={{
        y,
        x,
        scale,
        rotate,
        opacity,
      }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={onClick}
    >
      <div
        className="relative min-h-[260px] overflow-hidden rounded-[24px] border border-white/40 shadow-[0_24px_55px_rgba(8,43,92,0.20)]"
        style={{
          backgroundColor: card.accent,
          color: isDark ? "#ffffff" : "#082B5C",
        }}
      >
        {/* Decorative shapes */}
        <div
          className="absolute -right-16 -top-20 h-56 w-56 rounded-full"
          style={{
            background: isDark
              ? "rgba(56,189,248,0.16)"
              : "rgba(8,43,92,0.06)",
          }}
        />

        <div
          className="absolute -bottom-24 -left-10 h-52 w-52 rounded-full"
          style={{
            background: isDark
              ? "rgba(255,255,255,0.04)"
              : "rgba(8,43,92,0.04)",
          }}
        />

        <div className="relative z-10 flex min-h-[260px] flex-col p-7">
          {/* Top */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p
                className="mb-2 text-[9px] font-semibold uppercase tracking-[0.22em]"
                style={{
                  color: isDark
                    ? "rgba(255,255,255,0.48)"
                    : "rgba(8,43,92,0.48)",
                }}
              >
                {card.text}
              </p>

              <h3 className="text-[20px] font-bold leading-tight">
                {card.title}
              </h3>

              <p
                className="mt-1 text-[11px]"
                style={{
                  color: isDark
                    ? "rgba(255,255,255,0.52)"
                    : "rgba(8,43,92,0.55)",
                }}
              >
                {card.subtitle}
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.08 }}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
              style={{
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.10)"
                  : "rgba(8,43,92,0.08)",
              }}
            >
              <ArrowRight size={17} />
            </motion.div>
          </div>

          {/* Price */}
          <div className="mt-auto flex items-end justify-between gap-4">
            <div>
              <p
                className="text-[22px] font-bold"
                style={{
                  color: isDark ? "#F59E0B" : "#D97706",
                }}
              >
                {card.price}
              </p>
            </div>

            <Link
              href="/contact"
              onClick={(e) => e.stopPropagation()}
              className="group flex items-center gap-2 rounded-full bg-[#F59E0B] px-5 py-2.5 text-[11px] font-bold text-[#082B5C] shadow-lg transition-all duration-300 hover:bg-[#fbbf24] hover:shadow-xl"
            >
              Get Started
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Tags */}
          <div className="mt-6 flex items-center gap-2">
            <span
              className="mr-1 text-[8px] font-semibold uppercase tracking-[0.15em]"
              style={{
                color: isDark
                  ? "rgba(255,255,255,0.42)"
                  : "rgba(8,43,92,0.42)",
              }}
            >
              Services Include
            </span>

            {card.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-3 py-1 text-[8px] font-bold uppercase tracking-wide"
                style={{
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.10)"
                    : "rgba(8,43,92,0.08)",
                  color: isDark
                    ? "rgba(255,255,255,0.75)"
                    : "rgba(8,43,92,0.70)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CardStack() {
  const [activeIndex, setActiveIndex] = useState(0);

  const advance = useCallback(() => {
    setActiveIndex((current) => (current + 1) % CARDS.length);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(advance, AUTO_INTERVAL);

    return () => window.clearInterval(interval);
  }, [advance]);

  return (
    <div className="relative mx-auto h-[330px] w-full max-w-[540px]">
      {CARDS.map((card, index) => (
        <ServiceCard
          key={`${card.title}-${index}`}
          card={card}
          index={index}
          activeIndex={activeIndex}
          onClick={advance}
        />
      ))}

      {/* Stack indicators */}
      <div className="absolute -bottom-1 left-1/2 z-40 flex -translate-x-1/2 gap-1.5">
        {CARDS.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Show pricing card ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: index === activeIndex ? 24 : 7,
              backgroundColor:
                index === activeIndex ? "#F59E0B" : "rgba(8,43,92,0.25)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function PricingTeaser() {
  return (
    <section className="relative min-h-[700px] overflow-hidden py-16 lg:py-24">
      {/* =========================================================
          BACKGROUND IMAGE
          ========================================================= */}
      <div
        className="absolute inset-0 scale-[1.03] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/pricing-background.jpg')",
        }}
      />

      {/* =========================================================
          LIGHT OVERLAYS
          Reduced from the previous version so the image is visible.
          ========================================================= */}

      {/* Overall white wash */}
      <div className="absolute inset-0 bg-white/45" />

      {/* Subtle CPA blue tint */}
      <div className="absolute inset-0 bg-[#DCEBFA]/20" />

      {/* Keep left side clean for text while revealing image toward right */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/45 to-white/20" />

      {/* Soft white glow around content */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_48%,rgba(255,255,255,0.72),transparent_42%)]" />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/55 to-transparent" />

      {/* =========================================================
          DECORATIVE FLOATING ELEMENTS
          ========================================================= */}
      <FloatCircle size={300} left="-100px" top="8%" opacity={0.16} />
      <FloatCircle size={220} left="47%" top="8%" opacity={0.12} />
      <FloatCircle size={280} left="80%" top="58%" opacity={0.13} />

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* =====================================================
              LEFT CONTENT
              ===================================================== */}
          <div className="max-w-[590px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.18em] text-[#D97706]">
                Transparent Pricing
              </p>

              <h2 className="max-w-[540px] text-[clamp(2.5rem,4vw,4.2rem)] font-bold leading-[0.98] tracking-[-0.04em] text-[#082B5C]">
                What's your
                <br />
                time worth?
              </h2>

              <div className="mt-8 space-y-4">
                {[
                  "Clear, upfront rates – no surprises",
                  "Flat rates, hourly, and fixed-fee engagements",
                  "Free 15-minute consultation to scope your needs",
                ].map((item) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2
                      size={18}
                      strokeWidth={2.5}
                      className="shrink-0 text-[#F59E0B]"
                    />

                    <span className="text-[15px] font-medium text-[#27364A] lg:text-[16px]">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mt-9"
              >
                <Link
                  href="/pricing"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#082B5C] px-7 py-4 text-[13px] font-bold text-white shadow-[0_14px_28px_rgba(8,43,92,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#0D3D7A] hover:shadow-[0_18px_35px_rgba(8,43,92,0.28)]"
                >
                  View Pricing

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* =====================================================
              RIGHT CARD STACK
              ===================================================== */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <CardStack />
          </motion.div>
        </div>
      </div>
    </section>
  );
}