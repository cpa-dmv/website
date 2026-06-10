"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Scale, ClipboardCheck, Search, FileText, ArrowLeftRight,
  Users, Briefcase, TrendingUp, BookOpen, Building2,
} from "lucide-react";
import { ArrowRight } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Scale, ClipboardCheck, Search, FileText, ArrowLeftRight,
  Users, Briefcase, TrendingUp, BookOpen, Building2,
};

interface Props {
  name: string;
  slug: string;
  icon: string;
  tagline: string;
  rate: string;
  delay?: number;
}

export default function ServiceCard({ name, slug, icon, tagline, rate, delay = 0 }: Props) {
  const Icon = iconMap[icon] ?? FileText;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={{
        rotateX: -3,
        rotateY: 3,
        scale: 1.03,
        transition: { duration: 0.2 },
      }}
      style={{ transformStyle: "preserve-3d" }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#F59E0B]/30 transition-shadow cursor-pointer group"
    >
      <div className="w-12 h-12 rounded-xl bg-[#F7F8FA] group-hover:bg-[#FAF5EB] flex items-center justify-center mb-4 transition-colors">
        <Icon size={22} className="text-[#082B5C] group-hover:text-[#F59E0B] transition-colors" />
      </div>
      <h3 className="font-display font-bold text-[#1F2937] text-base mb-1 leading-tight">{name}</h3>
      <p className="text-sm text-[#6B7280] mb-3 leading-relaxed">{tagline}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#F59E0B] bg-[#FAF5EB] px-2.5 py-1 rounded-full">
          {rate}
        </span>
        <Link
          href={`/${slug}`}
          className="text-xs font-semibold text-[#082B5C] flex items-center gap-1 group-hover:text-[#F59E0B] transition-colors"
        >
          Learn More <ArrowRight size={12} />
        </Link>
      </div>
    </motion.div>
  );
}
