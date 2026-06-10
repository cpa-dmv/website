import type { Metadata } from "next";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Link from "next/link";
import { Shield, Award, GraduationCap, BookOpen, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About & Founder | CPA-DMV — Fairfax, VA",
  description:
    "Meet the CPA-DMV founder — a licensed CPA and Certified Divorce Financial Analyst serving individuals and businesses in Fairfax, VA.",
};

const credentials = [
  { icon: Shield, label: "CPA Licensed", sub: "Virginia Board of Accountancy" },
  { icon: Award, label: "CDFA Certified", sub: "Institute for Divorce Financial Analysts" },
  { icon: BookOpen, label: "AICPA Member", sub: "American Institute of CPAs" },
  { icon: Users, label: "VA Society of CPAs", sub: "Virginia Society of CPAs" },
  { icon: GraduationCap, label: "QuickBooks ProAdvisor", sub: "Intuit Certified" },
];

const values = [
  { title: "Integrity", desc: "Every recommendation is given with honesty and your best financial interest at heart." },
  { title: "Precision", desc: "Numbers must be right. We don't estimate where we can verify." },
  { title: "Proactive Growth", desc: "We don't just react to your situation — we help you anticipate and plan ahead." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#082B5C] pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-3">
            About CPA-DMV
          </p>
          <h1 className="font-display font-bold text-white text-4xl lg:text-5xl mb-4 leading-tight">
            Expert-led. Precision-driven.<br />Built on trust.
          </h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
            CPA-DMV is a Certified Public Accounting firm in Fairfax, VA — anchored by a CDFA credential and specialized audit capability across regulated industries.
          </p>
        </div>
      </section>

      {/* Founder bio section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Photo */}
            <AnimatedSection direction="left" className="lg:col-span-2">
              <div className="aspect-[4/5] rounded-3xl bg-[#F7F8FA] border-2 border-dashed border-[#082B5C]/20 flex flex-col items-center justify-center">
                {/* TODO: Replace with: <Image src="/images/founder.jpg" alt="CPA-DMV Founder" fill className="object-cover rounded-3xl" /> */}
                <div className="text-center px-8">
                  <div className="w-20 h-20 rounded-full bg-[#082B5C]/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">👤</span>
                  </div>
                  <p className="text-[#082B5C]/40 text-sm font-medium">Founder headshot</p>
                  <p className="text-[#082B5C]/30 text-xs mt-1">Min 400×500px required for launch</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Bio */}
            <AnimatedSection direction="right" className="lg:col-span-3">
              <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-3">
                Founder & Principal CPA
              </p>
              {/* TODO: Replace placeholder copy with actual founder-written bio */}
              <h2 className="font-display font-bold text-[#082B5C] text-3xl lg:text-4xl mb-6">
                [Founder Name]<br />
                <span className="text-[#6B7280] text-2xl font-semibold">CPA · CDFA</span>
              </h2>

              <div className="space-y-4 text-[#6B7280] leading-relaxed">
                <p>
                  {/* TODO: Para 1 — CPA licensure, years of practice, specializations */}
                  [Para 1: CPA licensure, years of practice, and primary specializations — to be written by the firm founder. Target 60–80 words.]
                </p>
                <p>
                  {/* TODO: Para 2 — CDFA certification story */}
                  [Para 2: CDFA certification — when obtained, why pursued, and what the CPA+CDFA combination means for divorce clients. Target 60–80 words.]
                </p>
                <p>
                  {/* TODO: Para 3 — Teaching background */}
                  [Para 3: Teaching background — CPE instruction, exam prep sessions, and commitment to community education. Target 40–60 words.]
                </p>
                <p>
                  {/* TODO: Para 4 — Firm values */}
                  [Para 4: Firm values — &quot;Integrity, Precision, and Proactive Growth.&quot; Target 40–60 words.]
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#082B5C] hover:bg-[#0d3d7a] text-white font-semibold px-6 py-3 rounded text-sm transition-all"
                >
                  Schedule a Consultation
                </Link>
                <Link
                  href="/cdfa-services"
                  className="inline-flex items-center gap-2 border-2 border-[#082B5C] text-[#082B5C] hover:bg-[#082B5C] hover:text-white font-semibold px-6 py-3 rounded text-sm transition-all"
                >
                  Explore CDFA Services
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {/* Credentials badge strip */}
          <AnimatedSection className="mt-14" delay={0.2}>
            <div className="border-t border-gray-100 pt-12">
              <p className="text-[#6B7280] text-xs font-semibold uppercase tracking-widest text-center mb-8">
                Credentials & Affiliations
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {credentials.map((c) => (
                  <div
                    key={c.label}
                    className="flex items-center gap-3 bg-[#F7F8FA] rounded-xl px-5 py-3.5 border border-gray-100"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#FAF5EB] flex items-center justify-center flex-shrink-0">
                      <c.icon size={16} className="text-[#F59E0B]" />
                    </div>
                    <div>
                      <span className="block text-sm font-semibold text-[#082B5C]">{c.label}</span>
                      <span className="block text-xs text-[#6B7280]">{c.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#F7F8FA] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <h2 className="font-display font-bold text-[#082B5C] text-3xl mb-3">Our Commitment</h2>
            <p className="text-[#6B7280] max-w-xl mx-auto">The principles that guide every engagement.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center">
                  <h3 className="font-display font-bold text-[#F59E0B] text-2xl mb-3">{v.title}</h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#082B5C] py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-display font-bold text-white text-3xl mb-4">
              Ready to work with us?
            </h2>
            <p className="text-white/60 mb-7">Start with a free consultation.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#e08e00] text-[#082B5C] font-bold px-8 py-4 rounded text-sm transition-all"
            >
              Schedule a Free Consultation
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
