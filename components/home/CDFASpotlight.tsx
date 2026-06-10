import Link from "next/link";
import { CheckCircle, Award } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";

const capabilities = [
  "Asset & liability inventory with CPA-level precision",
  "Tax consequence modeling for divorce settlements",
  "Retirement account division & QDRO analysis",
  "Business valuation within marital estates",
];

export default function CDFASpotlight() {
  return (
    <section className="bg-[#FAF5EB] py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — CDFA credential visual */}
          <AnimatedSection direction="left">
            <div className="bg-[#082B5C] rounded-3xl p-10 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#F59E0B]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-full bg-[#F59E0B] flex items-center justify-center mx-auto mb-5">
                  <Award size={36} className="text-[#082B5C]" />
                </div>
                <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-2">
                  Credential
                </p>
                <h3 className="font-display font-bold text-white text-2xl lg:text-3xl mb-3">
                  Certified Divorce<br />Financial Analyst
                </h3>
                <p className="text-white/60 text-sm mb-5 leading-relaxed max-w-xs mx-auto">
                  Issued by the Institute for Divorce Financial Analysts — the gold standard for financial expertise in divorce proceedings.
                </p>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-white/80 text-xs italic leading-relaxed">
                    &ldquo;Most CDFAs come from financial planning backgrounds. Ours brings CPA-level audit and tax analysis — every number in a settlement is stress-tested.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right — capabilities */}
          <AnimatedSection direction="right">
            <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-3">
              CDFA Expertise
            </p>
            <h2 className="font-display font-bold text-[#082B5C] text-3xl lg:text-4xl mb-4 leading-tight">
              Financial clarity<br />when it matters most.
            </h2>
            <p className="text-[#6B7280] text-base mb-8 leading-relaxed">
              Divorce is the most financially complex event in most people&apos;s lives. A CDFA with CPA credentials means the numbers in your settlement aren&apos;t just organized — they&apos;re verified.
            </p>
            <ul className="space-y-3 mb-8">
              {capabilities.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <span className="text-[#1F2937] text-sm">{c}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/cdfa-services"
                className="inline-flex items-center gap-2 bg-[#082B5C] hover:bg-[#0d3d7a] text-white font-semibold px-6 py-3 rounded text-sm transition-all"
              >
                Explore CDFA Services
              </Link>
              <div className="text-sm">
                <span className="block font-semibold text-[#082B5C]">$180/hr</span>
                <span className="text-[#6B7280] text-xs">Engagement-based pricing</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
