import type { Metadata } from "next";
import { getServiceBySlug } from "@/lib/services";
import ServicePageTemplate from "@/components/service-page/ServicePageTemplate";
import AnimatedSection from "@/components/shared/AnimatedSection";

export const metadata: Metadata = {
  title: "Audits & Attestations | CPA-DMV — Fairfax, VA",
  description:
    "Specialized audit and attestation services for credit unions (NCUA), non-profits, ALFs, and educational institutions. AICPA affiliated CPA in Fairfax, VA.",
};

const tiers = [
  { name: "Hourly", price: "$180/hr", desc: "Flexible hourly engagement for smaller or exploratory engagements.", tag: "" },
  { name: "Standard Fixed", price: "$2,500", desc: "25-hour fixed engagement. Ideal for most supervisory committee and review engagements.", tag: "Most Common" },
  { name: "Enterprise Fixed", price: "$10,000", desc: "100-hour fixed engagement for complex organizations requiring deep audit fieldwork.", tag: "" },
];

const industries = [
  { name: "Credit Unions (NCUA)", desc: "Supervisory committee audits and agreed-upon procedures fully aligned with NCUA regulations." },
  { name: "Single Audits (Uniform Guidance)", desc: "Federal program audits under 2 CFR Part 200 for non-profits and government entities." },
  { name: "Assisted Living Facilities", desc: "Financial audits and compliance reviews for ALF operators and ownership groups." },
  { name: "Educational Institutions", desc: "Audit services for private schools, tutoring organizations, and educational non-profits." },
];

export default function AuditPage() {
  const service = getServiceBySlug("specialized-audit")!;

  return (
    <ServicePageTemplate service={service}>
      {/* 3-tier pricing comparison */}
      <AnimatedSection delay={0.3}>
        <h2 className="font-display font-bold text-[#082B5C] text-2xl mb-5">Audit Pricing Tiers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-2xl p-6 border-2 relative ${
                t.tag ? "border-[#F59E0B] bg-[#FAF5EB]" : "border-gray-100 bg-white"
              }`}
            >
              {t.tag && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F59E0B] text-[#082B5C] text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                  {t.tag}
                </span>
              )}
              <p className="font-display font-bold text-[#F59E0B] text-2xl mb-1">{t.price}</p>
              <p className="font-semibold text-[#082B5C] text-base mb-2">{t.name}</p>
              <p className="text-sm text-[#6B7280] leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Industries */}
      <AnimatedSection delay={0.4}>
        <h2 className="font-display font-bold text-[#082B5C] text-2xl mb-5">Industry Specializations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {industries.map((ind) => (
            <div key={ind.name} className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="font-semibold text-[#082B5C] text-sm mb-1">{ind.name}</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">{ind.desc}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </ServicePageTemplate>
  );
}
