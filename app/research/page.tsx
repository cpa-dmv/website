import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock,
  FileText,
  Search,
} from "lucide-react";

export default function ResearchPage() {
  return (
    <main className="min-h-screen max-w-full overflow-x-hidden bg-[#f7f5f1]">
      {/* Hero */}
      <section className="bg-[#263f57] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1180px]">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#efb2a8]">
            <Search size={15} />
            Research & Insights
          </div>

          <h1 className="mt-5 max-w-4xl text-[clamp(2.5rem,5vw,4.8rem)] font-bold leading-none tracking-[-0.04em]">
            Research Articles
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            Explore research, analysis, and professional insights from
            CPA-DMV and its research contributors.
          </p>
        </div>
      </section>

      {/* Publications */}
      <section className="mx-auto max-w-[1180px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#263f57]">
            <BookOpen size={15} />
            Publications
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#263f57] sm:text-4xl">
            Research Articles
          </h2>

          <p className="mt-4 text-base leading-7 text-[#263f57]/65">
            A dedicated space for research papers, studies, and evidence-based
            insights developed by CPA-DMV and its research contributors.
          </p>
        </div>

        {/* Empty state */}
        <div className="mt-10 rounded-[28px] border border-[#263f57]/10 bg-white px-6 py-14 shadow-sm sm:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#263f57]/5">
              <FileText size={28} className="text-[#263f57]" />
            </div>

            <h3 className="mt-6 text-2xl font-bold text-[#263f57]">
              Publications coming soon
            </h3>

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#263f57]/65">
              Our research publications are currently being prepared. New
              studies, articles, and evidence-based insights will be published
              here as they become available.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-[#263f57]/55 sm:flex-row">
              <div className="inline-flex items-center gap-2">
                <Clock size={15} />
                New publications will appear here after release
              </div>
            </div>
          </div>
        </div>

        {/* Future publication format */}
        <div className="mt-12">
          <div className="rounded-[24px] border border-[#263f57]/10 bg-[#263f57] p-7 text-white sm:p-9">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#efb2a8]">
                  What to expect
                </p>

                <h3 className="mt-3 text-2xl font-bold">
                  Research, analysis & professional insights
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">
                  Future publications may include research papers, analytical
                  studies, professional articles, and evidence-based insights
                  from the CPA-DMV team and its research contributors.
                </p>
              </div>

              <div className="shrink-0">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/80">
                  <BookOpen size={15} />
                  Coming soon
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 border-t border-[#263f57]/10 pt-10">
          <p className="text-sm text-[#263f57]/60">
            Interested in our research and professional insights?
          </p>

          <a
            href="/contact"
            className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#263f57] transition-transform hover:translate-x-0.5"
          >
            Get in touch
            <ArrowRight size={15} />
          </a>
        </div>
      </section>
    </main>
  );
}