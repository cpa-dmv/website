"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Megaphone,
  Monitor,
  Scale,
  Search,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";

const homeServices = [
  {
    icon: Scale,
    label: "Divorce Financial Analysis",
    slug: "cdfa-services",
    desc: "CDFA-certified settlement analysis.",
    color: "#C084FC",
    iconBg: "rgba(192,132,252,0.18)",
  },
  {
    icon: ClipboardCheck,
    label: "Audits & Attestations",
    slug: "specialized-audit",
    desc: "Rigorous audits for regulated industries.",
    color: "#34D399",
    iconBg: "rgba(52,211,153,0.18)",
  },
  {
    icon: Search,
    label: "Forensics Audits",
    slug: "forensics-accounting",
    desc: "Investigation and expert court witness.",
    color: "#FF7B7B",
    iconBg: "rgba(255,123,123,0.18)",
  },
  {
    icon: TrendingUp,
    label: "Business Valuation",
    slug: "business-valuation",
    desc: "Fair market value for transactions & disputes.",
    color: "#22D3EE",
    iconBg: "rgba(34,211,238,0.18)",
  },
  {
    icon: Monitor,
    label: "QuickBooks Setup",
    slug: "quickbooks",
    desc: "ProAdvisor setup, training, and cleanup.",
    color: "#60A5FA",
    iconBg: "rgba(96,165,250,0.18)",
  },
  {
    icon: BarChart3,
    label: "Financial Accounting and Reporting",
    slug: "accounting",
    desc: "Financial reporting and general ledger.",
    color: "#60A5FA",
    iconBg: "rgba(96,165,250,0.18)",
  },
  {
    icon: Users,
    label: "Payroll",
    slug: "payroll",
    desc: "Accurate payroll processing every cycle.",
    color: "#C084FC",
    iconBg: "rgba(192,132,252,0.18)",
  },
  {
    icon: Building2,
    label: "Business Registration",
    slug: "business-registration",
    desc: "Entity formation and state filing.",
    color: "#FBBF24",
    iconBg: "rgba(251,191,36,0.18)",
  },
  {
    icon: TrendingUp,
    label: "AP / AR",
    slug: "ap-ar",
    desc: "Cash flow management and reconciliation.",
    color: "#22D3EE",
    iconBg: "rgba(34,211,238,0.18)",
  },
  {
    icon: Briefcase,
    label: "HR Advisory",
    slug: "hr-advisory",
    desc: "Practical HR support for small businesses.",
    color: "#FB923C",
    iconBg: "rgba(251,146,60,0.18)",
  },
  {
    icon: FileText,
    label: "Taxation",
    slug: "taxation",
    desc: "Individual and corporate tax preparation.",
    color: "#FACC15",
    iconBg: "rgba(250,204,21,0.18)",
  },
  {
    icon: BookOpen,
    label: "Bookkeeping",
    slug: "bookkeeping",
    desc: "Accurate, organized books every month.",
    color: "#C084FC",
    iconBg: "rgba(192,132,252,0.18)",
  },
  {
    icon: Megaphone,
    label: "Social Media",
    slug: "social-media",
    desc: "Strategic social media management for brand growth.",
    color: "#FB7185",
    iconBg: "rgba(251,113,133,0.18)",
  },
  {
    icon: Target,
    label: "Digital Marketing",
    slug: "digital-marketing",
    desc: "Data-driven digital marketing solutions.",
    color: "#34D399",
    iconBg: "rgba(52,211,153,0.18)",
  },
];

export default function ServicesGrid() {
  return (
    <section className="relative overflow-hidden bg-[#EAF6FF] py-14 lg:py-20">
      {/* Decorative background - top left */}
      <div
        className="pointer-events-none absolute -left-32 -top-40 h-[430px] w-[430px] rounded-full border-[55px] border-[#CDE7FF]/80"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -left-20 -top-28 h-[300px] w-[300px] rounded-full border border-[#B8DAF8]/80"
        aria-hidden="true"
      />

      {/* Decorative dots - top right */}
      <div
        className="pointer-events-none absolute right-8 top-12 hidden h-32 w-32 opacity-60 lg:block"
        style={{
          backgroundImage:
            "radial-gradient(#8FC7F4 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
        }}
        aria-hidden="true"
      />

      {/* Decorative background - bottom right */}
      <div
        className="pointer-events-none absolute -bottom-44 -right-40 h-[430px] w-[430px] rounded-full border-[55px] border-[#CDE7FF]/80"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -bottom-28 -right-24 h-[300px] w-[300px] rounded-full border border-[#B8DAF8]/80"
        aria-hidden="true"
      />

      {/* Decorative dots - bottom left */}
      <div
        className="pointer-events-none absolute bottom-10 left-2 hidden h-28 w-28 opacity-50 lg:block"
        style={{
          backgroundImage:
            "radial-gradient(#8FC7F4 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <AnimatedSection className="mb-9 text-center">
          <div className="mb-3 flex items-center justify-center gap-4">
            <span className="h-[2px] w-16 bg-[#F59E0B]" />
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F59E0B]">
              What We Do
            </p>
            <span className="h-[2px] w-16 bg-[#F59E0B]" />
          </div>

          <h2
            className="font-display font-bold leading-none tracking-tight text-[#082B5C]"
            style={{
              fontSize: "clamp(2.5rem, 4vw, 4rem)",
            }}
          >
            Our Services
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#58708C] sm:text-base">
            Comprehensive accounting and advisory support to help your business
            thrive.
          </p>
        </AnimatedSection>

        {/* Services grid */}
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {homeServices.map((service, i) => {
            const Icon = service.icon;

            const isLastRow =
              i === homeServices.length - 2 ||
              i === homeServices.length - 1;

            return (
              <motion.div
                key={`${service.slug}-${i}`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(i * 0.045, 0.45),
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -7,
                  transition: {
                    duration: 0.2,
                    ease: "easeOut",
                  },
                }}
                className={
                  i === homeServices.length - 2
                    ? "lg:col-start-2"
                    : i === homeServices.length - 1
                      ? "lg:col-start-3"
                      : ""
                }
              >
                <Link
                  href={`/${service.slug}`}
                  className="group relative flex h-[174px] flex-col overflow-hidden rounded-[12px] border border-[#FFFFFF]/20 bg-gradient-to-br from-[#0B4F91] via-[#084B89] to-[#063F78] p-5 shadow-[0_12px_30px_rgba(8,75,137,0.16)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(8,75,137,0.28)]"
                >
                  {/* Subtle card glow */}
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30"
                    style={{
                      background: service.color,
                    }}
                  />

                  {/* Top row */}
                  <div className="relative z-10 flex items-start justify-between">
                    {/* Icon */}
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: service.iconBg,
                        borderColor: `${service.color}55`,
                      }}
                    >
                      <Icon
                        size={25}
                        strokeWidth={2}
                        style={{
                          color: service.color,
                        }}
                      />
                    </div>

                    {/* Arrow */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/[0.08] text-white backdrop-blur-sm transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/15 group-hover:translate-x-0.5">
                      <ArrowRight size={19} strokeWidth={2} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 mt-3">
                    <h3 className="font-display text-[15px] font-bold leading-tight text-white">
                      {service.label}
                    </h3>

                    <p className="mt-1.5 text-[13px] leading-[1.35] text-white/75">
                      {service.desc}
                    </p>
                  </div>

                  {/* Bottom CTA */}
                  <div className="relative z-10 mt-auto flex items-center gap-3">
                    <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-white">
                      Explore Service
                    </span>

                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />

                    <span className="h-px flex-1 bg-white/25 transition-colors duration-300 group-hover:bg-white/45" />
                  </div>

                  {/* Bottom shine */}
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <AnimatedSection className="mt-6 text-center" delay={0.2}>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 rounded-full bg-[#082B5C] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(8,43,92,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#0A3D7D] hover:shadow-[0_15px_30px_rgba(8,43,92,0.28)]"
          >
            Schedule a Free Consultation

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          <p className="mt-3 text-sm text-[#58708C]">
            Let&apos;s discuss how we can support your business goals.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}