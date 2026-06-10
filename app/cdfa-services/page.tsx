import type { Metadata } from "next";
import { getServiceBySlug } from "@/lib/services";
import ServicePageTemplate from "@/components/service-page/ServicePageTemplate";
import CalendlyEmbed from "@/components/shared/CalendlyEmbed";
import AnimatedSection from "@/components/shared/AnimatedSection";

export const metadata: Metadata = {
  title: "CDFA & Divorce Asset Division | CPA-DMV",
  description:
    "Certified Divorce Financial Analyst in Fairfax, VA. CPA-level financial analysis for divorce settlements, asset division, QDRO, and tax consequences. $180/hr.",
};

export default function CDFAPage() {
  const service = getServiceBySlug("cdfa-services")!;

  return (
    <>
      <ServicePageTemplate service={service}>
        {/* CDFA-specific explainer block */}
        <AnimatedSection delay={0.3}>
          <div className="bg-[#FAF5EB] rounded-2xl p-8 border border-[#F59E0B]/20">
            <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-3">
              What is a CDFA?
            </p>
            <h3 className="font-display font-bold text-[#082B5C] text-xl mb-3">
              CPA + CDFA = a different level of analysis.
            </h3>
            <p className="text-[#6B7280] text-sm leading-relaxed mb-3">
              The Certified Divorce Financial Analyst (CDFA) designation is issued by the Institute for Divorce Financial Analysts and represents specialized training in the financial complexities of divorce — from asset division and retirement accounts to tax consequences and support modeling.
            </p>
            <p className="text-[#6B7280] text-sm leading-relaxed">
              Most CDFAs come from financial planning backgrounds. CPA-DMV&apos;s founder brings CPA-level audit and tax analysis — meaning every number in your settlement is not just organized, but stress-tested with the rigor of a certified accountant.
            </p>
          </div>
        </AnimatedSection>
      </ServicePageTemplate>

      {/* Calendly inline booking */}
      <section className="bg-[#F7F8FA] py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <h2 className="font-display font-bold text-[#082B5C] text-3xl lg:text-4xl mb-3">
              Book Your CDFA Consultation
            </h2>
            <p className="text-[#6B7280]">
              Pick a time below. 45-minute confidential call — phone or video.
            </p>
            <p className="text-[#F59E0B] font-semibold text-sm mt-2">$180/hr · Engagement-based</p>
          </AnimatedSection>
          {/* TODO: Replace CALENDLY_URL with real Calendly CDFA event URL */}
          <CalendlyEmbed url="https://calendly.com/cpa-dmv/cdfa-consultation" minHeight={650} />
        </div>
      </section>
    </>
  );
}
