"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Monitor, Users } from "lucide-react";
import { EventItem, eventTypeColors } from "@/lib/events";

interface Props {
  event: EventItem;
  compact?: boolean;
  index?: number;
}

export default function EventCard({ event, compact = false, index = 0 }: Props) {
  const colors = eventTypeColors[event.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-150 shadow-sm hover:shadow-lg transition-shadow flex flex-col"
      style={{ borderColor: "#E5E7EB" }}
    >
      {/* Date + category header */}
      <div className="flex">
        {/* Date block */}
        <div
          className="flex flex-col items-center justify-center px-5 py-5 flex-shrink-0 min-w-[76px]"
          style={{ backgroundColor: colors.dateBg }}
        >
          <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest leading-none">
            {event.month}
          </span>
          <span className="text-white font-display font-extrabold text-[2.2rem] leading-none my-0.5">
            {event.day}
          </span>
          <span className="text-white/60 text-[10px] font-semibold uppercase tracking-widest leading-none">
            {event.weekday}
          </span>
        </div>

        {/* Category + title area */}
        <div className="flex-1 px-4 py-4 flex flex-col justify-center">
          <span className={`text-[10px] font-bold uppercase tracking-widest ${colors.text} mb-1.5`}>
            {event.type}
          </span>
          <h3 className="font-bold text-[#1F2937] text-[14px] leading-snug group-hover:text-[#082B5C]">
            {event.title}
          </h3>
        </div>
      </div>

      {/* Details */}
      <div className="px-4 pt-3 pb-4 flex flex-col gap-2 flex-1">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-[12px] text-[#6B7280]">
            <Clock size={12} className="flex-shrink-0 text-[#9CA3AF]" />
            {event.timeRange}
          </div>
          <div className="flex items-center gap-2 text-[12px] text-[#6B7280]">
            <svg className="w-3 h-3 flex-shrink-0 text-[#9CA3AF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
            </svg>
            {event.credits}
          </div>
          <div className="flex items-center gap-2 text-[12px] text-[#6B7280]">
            <Monitor size={12} className="flex-shrink-0 text-[#9CA3AF]" />
            {event.format}
          </div>
        </div>

        <div className="mt-auto pt-3">
          <Link
            href={event.registrationUrl}
            className="block w-full text-center text-white font-bold text-[13px] py-2.5 rounded-xl transition-all hover:opacity-90 hover:shadow-md"
            style={{ backgroundColor: colors.btn }}
          >
            Register Free
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
