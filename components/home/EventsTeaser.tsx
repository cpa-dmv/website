import { events } from "@/lib/events";
import EventCard from "@/components/shared/EventCard";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Link from "next/link";

export default function EventsTeaser() {
  const upcoming = events.slice(0, 3);
  if (upcoming.length === 0) return null;

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-[#1E5FA8] text-xs font-semibold uppercase tracking-widest mb-2">
              Free to Attend
            </p>
            <h2 className="font-display font-bold text-[#082B5C] text-3xl lg:text-[2.4rem] leading-tight">
              Upcoming Teachings &amp; Events
            </h2>
          </div>
          <Link
            href="/events"
            className="text-sm font-semibold text-[#082B5C] hover:text-[#F59E0B] transition-colors flex-shrink-0"
          >
            See all events →
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {upcoming.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
