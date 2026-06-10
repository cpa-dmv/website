"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, FileText, BarChart3, Sparkles, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";

const cards = [
  {
    icon: GraduationCap,
    title: "CPA Exam Prep",
    tag: "Exam",
    color: "bg-blue-50",
    iconColor: "text-blue-600",
    border: "hover:border-blue-200",
  },
  {
    icon: BookOpen,
    title: "Continuing Education",
    tag: "CPE",
    color: "bg-purple-50",
    iconColor: "text-purple-600",
    border: "hover:border-purple-200",
  },
  {
    icon: FileText,
    title: "Tax Update Sessions",
    tag: "Updates",
    color: "bg-amber-50",
    iconColor: "text-amber-600",
    border: "hover:border-amber-200",
  },
  {
    icon: BarChart3,
    title: "Accounting Workshops",
    tag: "Workshop",
    color: "bg-teal-50",
    iconColor: "text-teal-600",
    border: "hover:border-teal-200",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export default function TeachingsTeaser() {
  return (
    <section className="bg-[#F7F8FA] py-14 lg:py-20">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-9">
          <div>
            <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-2">Teachings</p>
            <h2
              className="font-display font-bold text-[#082B5C] leading-tight"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
            >
              Learn with CPA-DMV.
            </h2>
            <p className="text-[#6B7280] text-sm mt-2 max-w-sm">
              Exam prep, continuing education, and practical learning — many sessions free to attend.
            </p>
          </div>
          <Link
            href="/teachings"
            className="flex-shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-[#082B5C] hover:text-[#F59E0B] transition-colors"
          >
            View all teachings <ArrowRight size={14} />
          </Link>
        </AnimatedSection>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              transition={{ duration: 0.45 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`group bg-white rounded-2xl border border-gray-100 ${card.border} hover:shadow-lg transition-all p-5 flex flex-col cursor-default`}
            >
              <motion.div
                className={`w-11 h-11 rounded-xl ${card.color} flex items-center justify-center mb-4`}
                whileHover={{ scale: 1.1, rotate: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <card.icon size={22} className={card.iconColor} strokeWidth={1.75} />
              </motion.div>

              <span className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-widest mb-1">
                {card.tag}
              </span>
              <h3 className="font-semibold text-[#082B5C] text-sm leading-snug">
                {card.title}
              </h3>
            </motion.div>
          ))}
        </motion.div>

        {/* Strip */}
        <AnimatedSection delay={0.25}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl px-6 py-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FAF5EB] flex items-center justify-center flex-shrink-0">
                <Sparkles size={15} className="text-[#F59E0B]" />
              </div>
              <p className="text-sm text-[#374151] font-medium">
                Many sessions are <span className="text-[#082B5C] font-semibold">free to attend.</span>
              </p>
            </div>
            <Link
              href="/teachings"
              className="flex-shrink-0 inline-flex items-center gap-1.5 bg-[#082B5C] hover:bg-[#0d3d7a] text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-all"
            >
              View Teachings
            </Link>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
