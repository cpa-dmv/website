import Link from "next/link";
import { CheckCircle, ChevronRight } from "lucide-react";
import {
  Scale, ClipboardCheck, Search, FileText, ArrowLeftRight,
  Users, Briefcase, TrendingUp, BookOpen, Building2,
} from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Service, services } from "@/lib/services";

const iconMap: Record<string, React.ElementType> = {
  Scale, ClipboardCheck, Search, FileText, ArrowLeftRight,
  Users, Briefcase, TrendingUp, BookOpen, Building2,
};

// Unique decorative accent per service slug
const heroBg: Record<string, { accent: string; pattern: string; glow: string }> = {
  "cdfa-services": {
    accent: "#C084FC",
    glow: "radial-gradient(ellipse 60% 70% at 80% 50%, rgba(192,132,252,0.12) 0%, transparent 70%)",
    pattern: "radial-gradient(circle at 20% 80%, rgba(192,132,252,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(249,168,212,0.06) 0%, transparent 50%)",
  },
  "specialized-audit": {
    accent: "#34D399",
    glow: "radial-gradient(ellipse 60% 70% at 80% 50%, rgba(52,211,153,0.10) 0%, transparent 70%)",
    pattern: "radial-gradient(circle at 15% 85%, rgba(52,211,153,0.07) 0%, transparent 50%), radial-gradient(circle at 85% 15%, rgba(16,185,129,0.05) 0%, transparent 50%)",
  },
  "forensics-accounting": {
    accent: "#F87171",
    glow: "radial-gradient(ellipse 60% 70% at 80% 50%, rgba(248,113,113,0.10) 0%, transparent 70%)",
    pattern: "radial-gradient(circle at 10% 90%, rgba(248,113,113,0.07) 0%, transparent 50%), radial-gradient(circle at 90% 10%, rgba(239,68,68,0.05) 0%, transparent 50%)",
  },
  "taxation": {
    accent: "#FBBF24",
    glow: "radial-gradient(ellipse 60% 70% at 80% 50%, rgba(251,191,36,0.10) 0%, transparent 70%)",
    pattern: "radial-gradient(circle at 20% 80%, rgba(251,191,36,0.07) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(245,158,11,0.05) 0%, transparent 50%)",
  },
  "ap-ar": {
    accent: "#60A5FA",
    glow: "radial-gradient(ellipse 60% 70% at 80% 50%, rgba(96,165,250,0.10) 0%, transparent 70%)",
    pattern: "radial-gradient(circle at 15% 85%, rgba(96,165,250,0.07) 0%, transparent 50%), radial-gradient(circle at 85% 15%, rgba(59,130,246,0.05) 0%, transparent 50%)",
  },
  "payroll": {
    accent: "#A78BFA",
    glow: "radial-gradient(ellipse 60% 70% at 80% 50%, rgba(167,139,250,0.10) 0%, transparent 70%)",
    pattern: "radial-gradient(circle at 20% 80%, rgba(167,139,250,0.07) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139,92,246,0.05) 0%, transparent 50%)",
  },
  "hr-advisory": {
    accent: "#FB923C",
    glow: "radial-gradient(ellipse 60% 70% at 80% 50%, rgba(251,146,60,0.10) 0%, transparent 70%)",
    pattern: "radial-gradient(circle at 15% 85%, rgba(251,146,60,0.07) 0%, transparent 50%), radial-gradient(circle at 85% 15%, rgba(249,115,22,0.05) 0%, transparent 50%)",
  },
  "business-valuation": {
    accent: "#2DD4BF",
    glow: "radial-gradient(ellipse 60% 70% at 80% 50%, rgba(45,212,191,0.10) 0%, transparent 70%)",
    pattern: "radial-gradient(circle at 20% 80%, rgba(45,212,191,0.07) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(20,184,166,0.05) 0%, transparent 50%)",
  },
  "quickbooks": {
    accent: "#4ADE80",
    glow: "radial-gradient(ellipse 60% 70% at 80% 50%, rgba(74,222,128,0.10) 0%, transparent 70%)",
    pattern: "radial-gradient(circle at 15% 85%, rgba(74,222,128,0.07) 0%, transparent 50%), radial-gradient(circle at 85% 15%, rgba(34,197,94,0.05) 0%, transparent 50%)",
  },
  "bookkeeping": {
    accent: "#38BDF8",
    glow: "radial-gradient(ellipse 60% 70% at 80% 50%, rgba(56,189,248,0.10) 0%, transparent 70%)",
    pattern: "radial-gradient(circle at 15% 85%, rgba(56,189,248,0.07) 0%, transparent 50%), radial-gradient(circle at 85% 15%, rgba(14,165,233,0.05) 0%, transparent 50%)",
  },
  "accounting": {
    accent: "#818CF8",
    glow: "radial-gradient(ellipse 60% 70% at 80% 50%, rgba(129,140,248,0.10) 0%, transparent 70%)",
    pattern: "radial-gradient(circle at 20% 80%, rgba(129,140,248,0.07) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(99,102,241,0.05) 0%, transparent 50%)",
  },
  "business-registration": {
    accent: "#F59E0B",
    glow: "radial-gradient(ellipse 60% 70% at 80% 50%, rgba(245,158,11,0.10) 0%, transparent 70%)",
    pattern: "radial-gradient(circle at 20% 80%, rgba(245,158,11,0.07) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(217,119,6,0.05) 0%, transparent 50%)",
  },
};

const defaultHero = {
  accent: "#F59E0B",
  glow: "radial-gradient(ellipse 60% 70% at 80% 50%, rgba(245,158,11,0.10) 0%, transparent 70%)",
  pattern: "radial-gradient(circle at 20% 80%, rgba(245,158,11,0.07) 0%, transparent 50%)",
};

interface Props {
  service: Service;
  children?: React.ReactNode;
}

export default function ServicePageTemplate({ service, children }: Props) {
  const Icon = iconMap[service.icon] ?? FileText;
  const relatedServices = service.related
    .map((id) => services.find((s) => s.slug === id))
    .filter(Boolean) as Service[];

  const bg = heroBg[service.slug] ?? defaultHero;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#061A33] pt-32 pb-20 overflow-hidden">

        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />

        {/* Service-specific glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: bg.glow }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: bg.pattern }} />

        {/* Large faint icon watermark */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.04]">
          <Icon size={320} className="text-white" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/#services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">{service.name}</span>
          </nav>

          <div className="max-w-3xl">
            {/* Icon badge */}
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: `${bg.accent}18`, border: `1px solid ${bg.accent}35` }}>
              <Icon size={26} style={{ color: bg.accent }} />
            </div>

            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: bg.accent }} />
              <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: bg.accent }}>
                CPA-DMV Service
              </p>
            </div>

            {/* Heading */}
            <h1 className="font-display font-bold text-white text-4xl lg:text-5xl mb-5 leading-tight">
              {service.name}
            </h1>

            {/* Description */}
            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-2xl">
              {service.description}
            </p>

            {/* CTA + key included tags */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-bold px-7 py-3.5 rounded text-sm transition-all text-[#061A33]"
                style={{ background: bg.accent }}
              >
                Schedule a Free Consultation
              </Link>
            </div>

            {/* Included chips — top 4 */}
            <div className="flex flex-wrap gap-2">
              {service.included.slice(0, 4).map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
                  style={{ background: `${bg.accent}12`, border: `1px solid ${bg.accent}28`, color: "rgba(255,255,255,0.75)" }}>
                  <CheckCircle size={11} style={{ color: bg.accent }} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade to content */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(247,248,250,0))" }} />
      </section>

      {/* Main content */}
      <section className="bg-[#F7F8FA] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left main */}
            <div className="lg:col-span-2 space-y-12">
              {/* What's included */}
              <AnimatedSection>
                <h2 className="font-display font-bold text-[#082B5C] text-2xl mb-5">What&apos;s Included</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.included.map((item) => (
                    <div key={item} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                      <CheckCircle size={16} className="text-[#F59E0B] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#1F2937]">{item}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Who this serves */}
              <AnimatedSection delay={0.1}>
                <h2 className="font-display font-bold text-[#082B5C] text-2xl mb-5">Who This Serves</h2>
                <div className="space-y-3">
                  {service.whoServes.map((w) => (
                    <div key={w} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100">
                      <div className="w-2 h-2 rounded-full bg-[#F59E0B] flex-shrink-0" />
                      <span className="text-sm text-[#1F2937]">{w}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* 3-step process */}
              <AnimatedSection delay={0.2}>
                <h2 className="font-display font-bold text-[#082B5C] text-2xl mb-6">How It Works</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {service.process.map((step) => (
                    <div key={step.step} className="bg-white rounded-2xl p-6 border border-gray-100 relative">
                      <span className="font-display font-bold text-[#F59E0B] text-3xl">{step.step}</span>
                      <h3 className="font-semibold text-[#082B5C] text-base mt-2 mb-1">{step.title}</h3>
                      <p className="text-sm text-[#6B7280] leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Optional injected content (e.g. accordion for taxation) */}
              {children}
            </div>

            {/* Right sidebar */}
            <div className="space-y-6">
              {/* CTA card */}
              <AnimatedSection direction="right">
                <div className="bg-[#082B5C] rounded-2xl p-7 sticky top-24">
                  <h3 className="font-display font-bold text-white text-lg mb-2">Ready to get started?</h3>
                  <p className="text-white/60 text-sm mb-5 leading-relaxed">
                    Schedule a free consultation. We&apos;ll outline exactly what&apos;s needed and what working together looks like.
                  </p>
                  <Link
                    href="/contact"
                    className="block w-full text-center bg-[#F59E0B] hover:bg-[#e08e00] text-[#082B5C] font-bold py-3 rounded text-sm transition-all mb-3"
                  >
                    Free Consultation
                  </Link>
                  <a
                    href="mailto:support@cpa-dmv.com"
                    className="block text-center text-white/60 hover:text-white text-xs transition-colors"
                  >
                    support@cpa-dmv.com
                  </a>
                </div>
              </AnimatedSection>

              {/* Related services */}
              {relatedServices.length > 0 && (
                <AnimatedSection direction="right" delay={0.1}>
                  <div className="bg-white rounded-2xl p-6 border border-gray-100">
                    <h4 className="font-semibold text-[#082B5C] text-sm mb-4">Related Services</h4>
                    <div className="space-y-2">
                      {relatedServices.map((rs) => (
                        <Link
                          key={rs.slug}
                          href={`/${rs.slug}`}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F7F8FA] transition-colors group"
                        >
                          <span className="text-sm text-[#1F2937] group-hover:text-[#082B5C]">{rs.name}</span>
                          <ChevronRight size={14} className="text-[#6B7280] group-hover:text-[#F59E0B] transition-colors" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#FAF5EB] py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-display font-bold text-[#082B5C] text-2xl lg:text-3xl mb-4">
              Let&apos;s talk about your {service.name.toLowerCase()} needs.
            </h2>
            <p className="text-[#6B7280] mb-7">
              Start with a free consultation — no pressure, no commitment.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#082B5C] hover:bg-[#0d3d7a] text-white font-semibold px-8 py-4 rounded text-sm transition-all"
            >
              Schedule Your Free Consultation
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
