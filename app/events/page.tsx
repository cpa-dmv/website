import type { Metadata } from "next";
import { events } from "@/lib/events";
import EventCard from "@/components/shared/EventCard";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Events | CPA-DMV — Teachings, CPE, Exam Prep",
  description:
    "Upcoming free accounting events, CPE sessions, and CPA exam prep from CPA-DMV in Fairfax, VA. Register for free.",
};

export default function EventsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#082B5C] pt-32 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-3">
            Free to Attend
          </p>
          <h1 className="font-display font-bold text-white text-4xl lg:text-5xl mb-4">
            Upcoming Events
          </h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
            CPE sessions, CPA exam prep, and webinars — all free, all led by a licensed CPA.
          </p>
        </div>
      </section>

      <section className="bg-[#F7F8FA] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, i) => (
                <AnimatedSection key={event.id} delay={i * 0.1}>
                  <EventCard event={event} />
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <AnimatedSection>
              <div className="bg-white rounded-2xl p-12 border border-gray-100 text-center max-w-lg mx-auto">
                <div className="w-14 h-14 rounded-full bg-[#FAF5EB] flex items-center justify-center mx-auto mb-5">
                  <span className="text-2xl">📅</span>
                </div>
                <h2 className="font-display font-bold text-[#082B5C] text-xl mb-3">
                  No events currently scheduled.
                </h2>
                <p className="text-[#6B7280] text-sm mb-6 leading-relaxed">
                  Check back soon, or join the notification list to be the first to know when new sessions are announced.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#082B5C] hover:bg-[#0d3d7a] text-white font-semibold px-6 py-3 rounded text-sm transition-all"
                >
                  Join Notification List
                </Link>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </>
  );
}
