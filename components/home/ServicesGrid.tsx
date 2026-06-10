"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen, FileText, BarChart3, Users, ArrowLeftRight,
  Briefcase, Monitor, Building2, ClipboardCheck, Search, Scale,
} from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";

const homeServices = [
  { icon: BookOpen,       label: "Bookkeeping",               slug: "ap-ar",                 desc: "Accurate, organized books every month." },
  { icon: FileText,       label: "Taxes",                     slug: "taxation",              desc: "Individual and business tax preparation." },
  { icon: BarChart3,      label: "Accounting",                slug: "specialized-audit",     desc: "Financial reporting and general ledger." },
  { icon: Users,          label: "Payroll",                   slug: "payroll",               desc: "Accurate payroll processing every cycle." },
  { icon: ArrowLeftRight, label: "AP / AR",                   slug: "ap-ar",                 desc: "Cash flow management and reconciliation." },
  { icon: Briefcase,      label: "HR Advisory",               slug: "hr-advisory",           desc: "Practical HR support for small businesses." },
  { icon: Monitor,        label: "QuickBooks Setup",          slug: "quickbooks",            desc: "ProAdvisor setup, training, and cleanup." },
  { icon: Building2,      label: "Business Registration",     slug: "business-registration", desc: "Entity formation and state filing." },
  { icon: ClipboardCheck, label: "Audits & Attestations",     slug: "specialized-audit",     desc: "Rigorous audits for regulated industries." },
  { icon: Search,         label: "Forensics",                 slug: "forensics-accounting",  desc: "Investigation and expert court witness." },
  { icon: Scale,          label: "Divorce Financial Analysis",slug: "cdfa-services",         desc: "CDFA-certified settlement analysis." },
];

export default function ServicesGrid() {
  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10">
          <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-3">What We Do</p>
          <h2
            className="font-display font-bold text-[#082B5C] mb-3"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            Our Services
          </h2>
          <p className="text-[#6B7280] max-w-lg mx-auto text-sm">
            Comprehensive accounting and advisory support to help your business thrive.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {homeServices.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.42, delay: (i % 4) * 0.06, ease: [0.25, 0.4, 0.25, 1] }}
              whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.18 } }}
              className="group"
            >
              <Link
                href={`/${s.slug}`}
                className="flex flex-col items-start p-5 rounded-2xl border border-gray-100 bg-[#F7F8FA] hover:bg-white hover:border-[#082B5C]/20 hover:shadow-lg transition-all h-full"
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-[#082B5C]/6 group-hover:bg-[#EEF2FF] flex items-center justify-center mb-4 transition-colors flex-shrink-0">
                  <s.icon size={19} className="text-[#082B5C] group-hover:text-[#082B5C]" strokeWidth={1.8} />
                </div>

                {/* Title — Roboto, larger */}
                <h3
                  className="font-roboto font-bold text-[#1F2937] group-hover:text-[#082B5C] leading-snug mb-1.5 transition-colors"
                  style={{ fontSize: "15px" }}
                >
                  {s.label}
                </h3>

                {/* Desc — Roboto, smaller */}
                <p className="font-roboto text-[#6B7280] text-xs leading-relaxed">
                  {s.desc}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <AnimatedSection className="text-center mt-9" delay={0.2}>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#082B5C] hover:bg-[#0d3d7a] text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-all shadow-md"
          >
            Schedule a Free Consultation
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
