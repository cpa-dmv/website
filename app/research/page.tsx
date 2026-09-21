import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
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

        {/* Published Research Article */}
        <div className="mt-10">
          <Link
            href="/research/articles/"
            className="group block rounded-[28px] border border-[#263f57]/10 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-10"
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#c87568]">
                  <BookOpen size={15} />
                  Research Publication
                </div>

                <h3 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-[#263f57] sm:text-3xl">
                  Beyond the Degree: Why Academic Success Is No Longer Enough
                  for Life Preparedness in the 21st Century
                </h3>

                <p className="mt-4 max-w-3xl text-base leading-7 text-[#263f57]/65">
                  A research publication examining the gap between academic
                  achievement and the practical capabilities required to
                  navigate adult life.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[#263f57]/55">
                  <span>17-page publication</span>
                  <span>WholeLife</span>
                  <span>Research Article</span>
                </div>
              </div>

              <div className="shrink-0">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#263f57] px-6 py-3 text-sm font-bold text-white transition-all group-hover:bg-[#1d3144]">
                  Read Research Paper
                  <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 border-t border-[#263f57]/10 pt-10">
          <p className="text-sm text-[#263f57]/60">
            Interested in our research and professional insights?
          </p>

          <Link
            href="/contact"
            className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#263f57] transition-transform hover:translate-x-0.5"
          >
            Get in touch
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}