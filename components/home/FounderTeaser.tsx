"use client";

import AnimatedSection from "@/components/shared/AnimatedSection";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Shield, Award } from "lucide-react";

const founders = [
  {
    name: "Himanshu Kalra",
    credential: "CPA",
    credentialBg: "bg-[#082B5C] text-white",
    badgeRing: "ring-[#082B5C]/20",
    photo: "/images/founder-himanshu.jpg",
    initial: "H",
    initBg: "bg-[#082B5C]",
    title: "Financial Expert · CPA Licensed",
    tags: ["CPA Licensed", "AICPA Member", "QuickBooks ProAdvisor"],
    Icon: Shield,
    accentClass: "text-[#082B5C]",
    highlight: "Precision in numbers. Clarity in decisions.",
    desc: "Expert in tax, audit, forensic accounting, business valuation, and financial reporting — dedicated to helping businesses grow with accurate, reliable financial support.",
  },
  {
    name: "Dr. Praveen Singhal",
    credential: "CDFA",
    credentialBg: "bg-[#F59E0B] text-[#082B5C]",
    badgeRing: "ring-[#F59E0B]/30",
    photo: "/images/founder-praveen.jpg",
    initial: "P",
    initBg: "bg-[#F59E0B]",
    title: "Founder · CDFA Certified",
    tags: ["CDFA Certified", "BS, MS Finance", "PhD Management"],
    Icon: Award,
    accentClass: "text-[#F59E0B]",
    highlight: "Financial clarity when life changes.",
    desc: "Certified Divorce Financial Analyst with expertise in divorce financial analysis, forensic accounting, government accounting systems, and court-ready financial reporting.",
  },
];

function FounderCard({ f, delay, direction }: { f: (typeof founders)[0]; delay: number; direction: "left" | "right" }) {
  const [imgError, setImgError] = useState(false);

  return (
    <AnimatedSection delay={delay} direction={direction}>
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-shadow group">
        <div className="flex items-start gap-6 mb-6">
          {/* Photo */}
          <div className="relative flex-shrink-0">
            <div className={`w-24 h-24 rounded-2xl overflow-hidden ring-4 ${f.badgeRing} shadow-lg`}>
              {!imgError ? (
                <Image
                  src={f.photo}
                  alt={f.name}
                  fill
                  className="object-cover object-top"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className={`w-full h-full ${f.initBg} flex items-center justify-center`}>
                  <span className="text-white text-3xl font-display font-bold">{f.initial}</span>
                </div>
              )}
            </div>
            <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-xl ${f.credentialBg} flex items-center justify-center shadow-lg`}>
              <span className="text-[11px] font-bold">{f.credential}</span>
            </div>
          </div>

          {/* Name & tags */}
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-[#082B5C] text-xl leading-snug">{f.name}</h3>
            <p className="text-[#6B7280] text-xs mt-1 mb-3">{f.title}</p>
            <div className="flex flex-wrap gap-2">
              {f.tags.map((t) => (
                <span key={t} className="text-[10px] font-medium border border-gray-200 text-[#6B7280] px-2.5 py-1 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Highlight */}
        <div className="bg-[#F7F8FA] rounded-xl p-4 mb-5 border-l-4 border-[#F59E0B]">
          <p className={`font-display font-bold text-sm ${f.accentClass}`}>{f.highlight}</p>
        </div>

        <p className="text-[#6B7280] text-sm leading-relaxed mb-5">{f.desc}</p>

        <Link href="/about" className="inline-flex items-center gap-1 text-sm font-semibold text-[#082B5C] hover:text-[#F59E0B] transition-colors">
          Full Profile →
        </Link>
      </div>
    </AnimatedSection>
  );
}

export default function FounderTeaser() {
  return (
    <section className="bg-[#F7F8FA] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-3">Our Team</p>
          <h2 className="font-display font-bold text-[#082B5C] text-3xl lg:text-4xl mb-3">
            Two experts. One trusted firm.
          </h2>
          <p className="text-[#6B7280] max-w-xl mx-auto">Your Trust. Our Expertise. Better Results.</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {founders.map((f, i) => (
            <FounderCard
              key={f.name}
              f={f}
              delay={i * 0.15}
              direction={i === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
