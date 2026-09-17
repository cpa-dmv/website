import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  FileText,
  Search,
} from "lucide-react";

export default function ResearchArticlesPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f5f1]">
      {/* Hero */}
      <section className="bg-[#263f57] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1180px]">
          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/65 transition-colors hover:text-white"
          >
            <ArrowLeft size={15} />
            Back to Research
          </Link>

          <div className="mt-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#efb2a8]">
            <Search size={15} />
            Research & Insights
          </div>

          <h1 className="mt-5 max-w-4xl text-[clamp(2.5rem,5vw,4.8rem)] font-bold leading-none tracking-[-0.04em]">
            Research Articles
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            Explore research papers, professional articles, analysis, and
            insights from CPA-DMV and its research contributors.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-[1180px] px-4 py-16 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 text-[#263f57]">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
              <BookOpen size={19} />
            </div>

            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#6b7280]">
              Publications
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#263f57] sm:text-4xl">
            Research & professional publications
          </h2>

          <p className="mt-4 text-[16px] leading-7 text-[#667085]">
            This section will feature research papers, articles, studies, and
            professional publications contributed by CPA-DMV and its research
            team.
          </p>
        </div>

        {/* Coming soon card */}
        <div className="mt-10 overflow-hidden rounded-[28px] border border-[#263f57]/10 bg-white shadow-sm">
          <div className="flex flex-col items-center px-6 py-16 text-center sm:px-10 sm:py-20">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#2563EB]">
              <FileText size={28} />
            </div>

            <div className="mt-7 inline-flex items-center rounded-full border border-[#263f57]/10 bg-[#f7f5f1] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#6b7280]">
              Coming Soon
            </div>

            <h3 className="mt-5 text-2xl font-bold text-[#263f57] sm:text-3xl">
              Research publications are being prepared
            </h3>

            <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#667085]">
              Our research articles and publications are currently being
              prepared. New papers and professional insights will be added here
              as they become available.
            </p>

            <div className="mt-8">
              <Link
                href="/newsletter"
                className="inline-flex items-center gap-2 rounded-full bg-[#263f57] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#1d3144]"
              >
                Explore Newsletter
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        {/* Future publication information */}
        <div className="mt-12 rounded-[24px] border border-[#263f57]/10 bg-[#263f57] p-7 text-white sm:p-9">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#efb2a8]">
                What you'll find here
              </div>

              <h3 className="mt-3 text-2xl font-bold">
                Research, analysis & professional insights
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/65">
                Future publications may include research papers, analytical
                studies, professional articles, and other knowledge resources.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
              <div className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                Status
              </div>
              <div className="mt-1 text-sm font-semibold text-white">
                Publications coming soon
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[#263f57]/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#263f57]">
              Interested in our research and professional insights?
            </p>
            <p className="mt-1 text-sm text-[#667085]">
              Connect with the CPA-DMV team to learn more.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#263f57] transition-colors hover:text-[#2563EB]"
          >
            Get in touch
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}