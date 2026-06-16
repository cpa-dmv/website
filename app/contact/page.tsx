import type { Metadata } from "next";
import AnimatedSection from "@/components/shared/AnimatedSection";
import ContactForm from "@/components/shared/ContactForm";
import CalendlyEmbed from "@/components/shared/CalendlyEmbed";
import CalendlyPanel from "@/components/shared/CalendlyPanel";
import ContactHero from "@/components/contact/ContactHero";
import { Mail, MapPin, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | CPA-DMV — Schedule a Free Consultation",
  description:
    "Schedule a free consultation with CPA-DMV in Fairfax, VA. Book online or send a message. No phone — email us at support@cpa-dmv.com.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      {/* Calendly */}
      <section className="bg-[#EDEEF0] py-16 lg:py-20 border-t-2 border-[#D1D5DB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden shadow-lg flex flex-col lg:flex-row">

            {/* Left panel — animated */}
            <CalendlyPanel />

            {/* Right panel — Calendly embed */}
            <div className="flex-1 bg-white">
              <CalendlyEmbed url="https://calendly.com/cpa-dmv-support/30min" minHeight={800} />
            </div>

          </div>
        </div>
      </section>

      {/* Contact form + info */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <AnimatedSection className="lg:col-span-2">
              <h2 className="font-display font-bold text-[#082B5C] text-2xl lg:text-3xl mb-2">
                Start the Conversation
              </h2>
              <p className="text-[#6B7280] text-sm mb-7 leading-relaxed">
                Tell us how we can assist you. Use this form for CDFA analysis, tax preparation, audit planning, bookkeeping, payroll support, QuickBooks assistance, or entity setup. We&apos;ll respond with clear, professional next steps.
              </p>
              <ContactForm />
            </AnimatedSection>

            {/* Contact info */}
            <AnimatedSection direction="right" delay={0.1}>
              <div className="space-y-6">
                <div className="bg-[#F7F8FA] rounded-2xl p-6 border border-gray-300">
                  <h3 className="font-semibold text-[#082B5C] text-base mb-4">Contact Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="text-[#F59E0B] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-[#1F2937]">Office</p>
                        <p className="text-sm text-[#6B7280]">10521 Judicial Dr #100<br />Fairfax, VA 22030</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail size={16} className="text-[#F59E0B] flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-[#1F2937]">Email</p>
                        <a
                          href="mailto:support@cpa-dmv.com"
                          className="text-sm text-[#082B5C] hover:text-[#F59E0B] transition-colors font-medium"
                        >
                          support@cpa-dmv.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <ExternalLink size={16} className="text-[#F59E0B] flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-[#1F2937]">LinkedIn</p>
                        <a
                          href="https://linkedin.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#082B5C] hover:text-[#F59E0B] transition-colors"
                        >
                          Connect with us
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FAF5EB] rounded-2xl p-6 border border-[#F59E0B]/20">
                  <h3 className="font-semibold text-[#082B5C] text-base mb-2">Response Time</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    We respond to all inquiries within one business day. For urgent matters, use the calendar booking above.
                  </p>
                </div>

                <div className="bg-[#F7F8FA] rounded-2xl p-6 border border-gray-300">
                  <h3 className="font-semibold text-[#082B5C] text-base mb-3">Affiliations</h3>
                  <div className="flex flex-wrap gap-2">
                    {["AICPA", "VA CPA Society", "CDFA Institute", "QB ProAdvisor"].map((b) => (
                      <span key={b} className="text-xs font-medium border border-gray-200 text-[#6B7280] px-3 py-1.5 rounded-full">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
