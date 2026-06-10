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

interface Props {
  service: Service;
  children?: React.ReactNode;
}

export default function ServicePageTemplate({ service, children }: Props) {
  const Icon = iconMap[service.icon] ?? FileText;
  const relatedServices = service.related
    .map((id) => services.find((s) => s.slug === id))
    .filter(Boolean) as Service[];

  return (
    <>
      {/* Hero */}
      <section className="bg-[#082B5C] pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/50 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/#services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight size={12} />
            <span className="text-white/80">{service.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#F59E0B]/15 flex items-center justify-center mb-5">
                <Icon size={26} className="text-[#F59E0B]" />
              </div>
              <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-3">
                CPA-DMV Service
              </p>
              <h1 className="font-display font-bold text-white text-3xl lg:text-5xl mb-4 leading-tight">
                {service.name}
              </h1>
              <p className="text-white/70 text-base lg:text-lg mb-8 leading-relaxed max-w-lg">
                {service.description}
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#e08e00] text-[#082B5C] font-bold px-7 py-3.5 rounded text-sm transition-all"
                >
                  Schedule a Free Consultation
                </Link>
              </div>
            </div>
            {/* Rate card */}
            <AnimatedSection direction="right">
              <div className="bg-white/5 border border-white/15 rounded-2xl p-7 backdrop-blur">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-2">Pricing</p>
                <p className="font-display font-bold text-[#F59E0B] text-3xl mb-1">{service.rate}</p>
                <p className="text-white/60 text-sm mb-5">{service.rateModel}</p>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-white/50 text-xs mb-3">This service includes:</p>
                  <ul className="space-y-2">
                    {service.included.slice(0, 4).map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-white/80">
                        <CheckCircle size={14} className="text-[#F59E0B] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                    {service.included.length > 4 && (
                      <li className="text-xs text-white/40">+{service.included.length - 4} more included</li>
                    )}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
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
