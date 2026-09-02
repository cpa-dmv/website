"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Monitor } from "lucide-react";
import { EventItem, eventTypeColors } from "@/lib/events";

interface Props {
  event: EventItem;
  index?: number;
}

export default function EventCard({ event, index = 0 }: Props) {
  const colors = eventTypeColors[event.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.42, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-md transition-shadow flex flex-col"
      style={{ borderColor: "#DBEAFE" }}
    >
      {/* Date block + category row */}
      <div className="flex">
        <div
          className="flex flex-col items-center justify-center px-4 py-4 flex-shrink-0 min-w-[68px]"
          style={{ backgroundColor: colors.dateBg }}
        >
          <span className="text-white/65 text-[9px] font-bold uppercase tracking-widest leading-none">
            {event.month}
          </span>
          <span className="text-white font-display font-extrabold text-[2rem] leading-none my-0.5">
            {event.day}
          </span>
          <span className="text-white/55 text-[9px] font-semibold uppercase tracking-widest leading-none">
            {event.weekday}
          </span>
        </div>

        <div className="flex-1 px-4 py-4 flex flex-col justify-center min-w-0">
          <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${colors.text}`}>
            {event.type}
          </span>
          <h3 className="font-bold text-[#1F2937] text-[13px] leading-snug">
            {event.title}
          </h3>
        </div>
      </div>

      {/* Details */}
      <div className="px-4 py-3 flex flex-col gap-1.5 flex-1 border-t border-gray-100">
        <div className="flex items-center gap-1.5 text-[11.5px] text-[#6B7280]">
          <Clock size={11} className="flex-shrink-0 text-[#9CA3AF]" />
          {event.timeRange}
        </div>
        <div className="flex items-center gap-1.5 text-[11.5px] text-[#6B7280]">
          <Monitor size={11} className="flex-shrink-0 text-[#9CA3AF]" />
          {event.format} · {event.credits}
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 pb-4 pt-2">
        <Link
          href={event.registrationUrl}
          className="block w-full text-center text-white font-bold text-[12.5px] py-2.5 rounded-xl transition-all hover:opacity-90"
          style={{ backgroundColor: colors.btn }}
        >
          Register Free
        </Link>
      </div>
    </motion.div>
  );
}
