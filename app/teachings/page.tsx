import type { Metadata } from "next";
import { events } from "@/lib/events";
import EventCard from "@/components/shared/EventCard";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Link from "next/link";
import { GraduationCap, Star, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Teachings — CPA Exam Prep & CPE | CPA-DMV",
  description:
    "Free CPA exam prep and CPE sessions led by a licensed CPA in Fairfax, VA. 6-hour sessions, registration required. Free to attend.",
};

const sessionTypes = [
  { icon: GraduationCap, title: "CPA Exam Prep", desc: "Section-by-section FAR, AUD, REG, and BEC deep dives with exam strategy and practice questions." },
  { icon: Star, title: "CPE Credits", desc: "Continuing professional education sessions that count toward your CPA license renewal requirements." },
  { icon: Users, title: "Webinars", desc: "Topic-specific webinars on tax law changes, financial analysis, and accounting best practices." },
];

export default function TeachingsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#082B5C] pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-3">
            Free to Attend · Registration Required
          </p>
          <h1 className="font-display font-bold text-white text-4xl lg:text-5xl mb-4">
            Teachings — Exam Prep & CPE
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Free sessions led by a licensed CPA. Sharpen your skills, earn CPE credits, and build a stronger foundation — at no cost.
          </p>
          <div className="inline-flex items-center gap-2 bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B] text-sm font-semibold px-5 py-2.5 rounded-full">
            Free · 6 hours per session · Registration required
          </div>
        </div>
      </section>

      {/* Session types */}
      <section className="bg-[#F7F8FA] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {sessionTypes.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF5EB] flex items-center justify-center mx-auto mb-4">
                    <s.icon size={20} className="text-[#F59E0B]" />
                  </div>
                  <h3 className="font-display font-bold text-[#082B5C] text-base mb-2">{s.title}</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Upcoming sessions */}
          <AnimatedSection className="mb-8">
            <h2 className="font-display font-bold text-[#082B5C] text-2xl lg:text-3xl mb-2">
              Upcoming Sessions
            </h2>
            <p className="text-[#6B7280]">
              All sessions are free. Secure your spot below.
            </p>
          </AnimatedSection>

          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, i) => (
                <AnimatedSection key={event.id} delay={i * 0.1}>
                  <EventCard event={event} />
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-10 border border-gray-100 text-center">
              <p className="text-[#6B7280] mb-4">No sessions currently scheduled.</p>
              <p className="text-sm text-[#6B7280] mb-6">Join the notification list to be the first to know when new sessions are announced.</p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-[#082B5C] hover:bg-[#0d3d7a] text-white font-semibold px-6 py-3 rounded text-sm transition-all">
                Notify Me of New Sessions
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FAF5EB] py-14">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-display font-bold text-[#082B5C] text-2xl lg:text-3xl mb-4">
              Don&apos;t miss the next session.
            </h2>
            <p className="text-[#6B7280] mb-7">Spaces fill up. Register early to secure your spot.</p>
            <Link href="/events" className="inline-flex items-center gap-2 bg-[#082B5C] hover:bg-[#0d3d7a] text-white font-semibold px-8 py-4 rounded text-sm transition-all">
              View All Events
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
