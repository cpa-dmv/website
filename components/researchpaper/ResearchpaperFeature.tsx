 "use client";

import { ArrowRight, BookOpen, FileText } from "lucide-react";
import Link from "next/link";

export default function ResearchpaperFeature() {
  return (
    <section className="bg-[#F7F5F1] px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#C97565]">
            WholeLife Knowledge Hub
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-[#29435B] md:text-4xl">
            Research &amp; Articles
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#657481]">
            Explore research, analysis, and practical insights that support
            healthier relationships, stronger families, and better decisions.
          </p>
        </div>

        <div className="grid overflow-hidden rounded-3xl border border-[#E7E5E0] bg-white shadow-sm md:grid-cols-[0.85fr_1.15fr]">
          <div className="relative flex min-h-[260px] flex-col justify-between overflow-hidden bg-[#29435B] p-8 text-white md:p-10">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#C97565]/25" />

            <div className="relative">
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <BookOpen size={24} />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F1A08D]">
                Evidence-informed perspectives
              </p>

              <h3 className="mt-4 max-w-sm text-2xl font-semibold leading-snug">
                Ideas that help turn understanding into action.
              </h3>
            </div>

            <div className="relative mt-8 flex items-center gap-2 text-sm text-white/70">
              <FileText size={16} />
              <span>Research and professional insights</span>
            </div>
          </div>

          <div className="flex flex-col justify-center p-8 md:p-10">
            <p className="text-sm font-medium text-[#C97565]">
              WHOLELIFE RESEARCH
            </p>

            <h3 className="mt-4 text-2xl font-bold leading-tight text-[#29435B] md:text-3xl">
              Discover our research articles
            </h3>

            <p className="mt-4 max-w-xl leading-7 text-[#657481]">
              Read perspectives on relationships, family wellbeing, life
              transitions, and the issues that shape our everyday decisions.
              Visit our research library to explore the published articles.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/research/"
                className="inline-flex items-center gap-3 rounded-full bg-[#29435B] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#20364A]"
              >
                Explore Research
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/research/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#29435B] transition hover:text-[#C97565]"
              >
                View all articles
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}