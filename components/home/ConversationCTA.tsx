import Link from "next/link";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { ArrowRight, Mail } from "lucide-react";

export default function ConversationCTA() {
  return (
    <section className="bg-[#F3F4F6] py-10 lg:py-12 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Text */}
            <div>
              <p className="text-[#F59E0B] text-[11px] font-semibold uppercase tracking-widest mb-1">
                Let&apos;s Talk
              </p>
              <h2 className="font-display font-bold text-[#082B5C] text-xl lg:text-2xl leading-tight">
                Ready to get started?
              </h2>
              <p className="text-[#6B7280] text-sm mt-1 max-w-xs">
                Tax, divorce finances, or business advisory — we&apos;re here.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#082B5C] hover:bg-[#0d3d7a] text-white font-semibold px-6 py-3 rounded-full text-sm transition-all hover:scale-105 shadow-sm group"
              >
                Free Consultation
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href="mailto:support@cpa-dmv.com"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-[#374151] font-medium px-5 py-3 rounded-full text-sm transition-all"
              >
                <Mail size={13} className="text-[#082B5C]" />
                Email Us
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
