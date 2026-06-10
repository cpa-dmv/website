import Link from "next/link";
import { Clock, Calendar } from "lucide-react";
import { EventItem, eventTypeColors } from "@/lib/events";

interface Props {
  event: EventItem;
  compact?: boolean;
}

export default function EventCard({ event, compact = false }: Props) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:border-[#082B5C]/15 transition-all group flex flex-col">
      {/* Date badge */}
      <div className="bg-[#082B5C] px-5 py-3.5 flex items-center gap-4">
        <div className="text-center flex-shrink-0">
          <span className="block text-[#F59E0B] text-[10px] font-bold uppercase tracking-widest font-roboto">
            {event.month}
          </span>
          <span className="block text-white font-roboto text-3xl font-bold leading-none">
            {event.day}
          </span>
        </div>
        <div className="flex-1">
          <span className={`inline-block text-[11px] font-semibold font-roboto px-2.5 py-1 rounded-full ${eventTypeColors[event.type]}`}>
            {event.type}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-roboto font-bold text-[#1F2937] text-[14px] mb-2 leading-snug group-hover:text-[#082B5C] transition-colors">
          {event.title}
        </h3>
        {!compact && (
          <p className="font-roboto text-sm text-[#6B7280] mb-3 leading-relaxed flex-1">
            {event.description}
          </p>
        )}
        <div className="flex items-center gap-3 text-[11px] text-[#9CA3AF] mb-3 font-roboto">
          <span className="flex items-center gap-1"><Clock size={11} /> {event.duration}</span>
          <span className="flex items-center gap-1"><Calendar size={11} /> {event.time}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold font-roboto text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
            {event.cost}
          </span>
          <Link
            href={event.registrationUrl}
            className="font-roboto text-[11px] font-semibold bg-[#082B5C] hover:bg-[#0d3d7a] text-white px-3.5 py-1.5 rounded-lg transition-colors"
          >
            Register Free
          </Link>
        </div>
      </div>
    </div>
  );
}
