"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Users, Award } from "lucide-react";

const stats = [
  {
    icon: ShieldCheck,
    value: "CPA",
    isText: true,
    label: "Licensed Expertise",
    sub: "Virginia Board of Accountancy",
    color: "text-white",
    accentColor: "text-white",
    iconBg: "bg-white/10",
    glowColor: "rgba(255,255,255,0.06)",
    lineColor: "bg-white/25",
  },
  {
    icon: Users,
    value: 200,
    suffix: "+",
    isText: false,
    label: "Clients Served",
    sub: "Businesses & individuals, DMV area",
    color: "text-[#F59E0B]",
    accentColor: "text-[#F59E0B]",
    iconBg: "bg-[#F59E0B]/12",
    glowColor: "rgba(245,158,11,0.10)",
    lineColor: "bg-[#F59E0B]/50",
  },
  {
    icon: Award,
    value: "CDFA",
    isText: true,
    label: "Divorce Financial Analyst",
    sub: "Institute for Divorce Financial Analysts",
    color: "text-white",
    accentColor: "text-white",
    iconBg: "bg-white/10",
    glowColor: "rgba(255,255,255,0.06)",
    lineColor: "bg-white/25",
  },
];

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatsBar() {
  return (
    <section className="bg-[#082B5C] relative overflow-hidden">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.4, 0.25, 1] }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className={`relative flex flex-col gap-3.5 px-8 py-10 cursor-default group ${
                i < stats.length - 1
                  ? "border-b sm:border-b-0 sm:border-r border-white/10"
                  : ""
              }`}
            >
              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: `radial-gradient(ellipse at 30% 40%, ${s.glowColor}, transparent 70%)` }}
              />

              {/* Icon with bounce-in */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
                whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 220, damping: 14, delay: i * 0.12 + 0.15 }}
                whileHover={{ scale: 1.12, rotate: 4 }}
                className={`w-12 h-12 rounded-2xl ${s.iconBg} flex items-center justify-center flex-shrink-0 relative z-10`}
              >
                <s.icon size={22} className={s.color} />
              </motion.div>

              {/* Value */}
              <div className="relative z-10">
                <span className={`block font-display font-extrabold leading-none ${s.color}`}
                  style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)" }}>
                  {s.isText ? s.value : <CountUp target={s.value as number} suffix={s.suffix} />}
                </span>

                <span className="block text-white font-semibold text-[15px] mt-2 leading-snug">
                  {s.label}
                </span>
                <span className="block text-white/40 text-[11.5px] mt-0.5 leading-snug">
                  {s.sub}
                </span>
              </div>

              {/* Animated underline */}
              <motion.div
                className={`h-px ${s.lineColor} rounded-full relative z-10`}
                initial={{ width: 0 }}
                whileInView={{ width: "48%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.12 + 0.35, ease: "easeOut" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
