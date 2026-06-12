"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { UserCheck, Clock, ShieldCheck } from "lucide-react";

const points = [
  {
    icon: UserCheck,
    title: "Dedicated CPA assigned to you",
    body: "Every client gets a named, credentialed accountant — not a ticket queue. Your expert knows your file.",
  },
  {
    icon: Clock,
    title: "Fast turnaround, every time",
    body: "We commit to clear timelines upfront. No chasing. No surprises. Deadlines are met.",
  },
  {
    icon: ShieldCheck,
    title: "Accuracy you can count on",
    body: "Every return, report, and filing is reviewed before delivery. We get it right the first time.",
  },
];

export default function ExpertSupport() {
  return (
    <section className="bg-[#F7F8FA] py-14 lg:py-18">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">

        <AnimatedSection className="text-center mb-10">
          <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-3">Expert Support</p>
          <h2
            className="font-display font-bold text-[#082B5C] leading-tight"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
          >
            Professional support,<br className="hidden lg:block" /> not a self-service portal.
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-xl bg-[#082B5C]/6 flex items-center justify-center mb-5">
                <p.icon size={20} className="text-[#082B5C]" strokeWidth={1.7} />
              </div>
              <h3 className="font-bold text-[#082B5C] text-[15px] leading-snug mb-2">{p.title}</h3>
              <p className="text-[#6B7280] text-[13px] leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>

        <AnimatedSection className="text-center" delay={0.2}>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#082B5C] hover:bg-[#0d3d7a] text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-all shadow-sm"
          >
            Get Expert Help
          </Link>
        </AnimatedSection>

      </div>
    </section>
  );
}
