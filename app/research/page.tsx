"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Search,
} from "lucide-react";
import {
  fetchResearch,
  type ResearchPublication,
} from "@/lib/research";

export default function ResearchPage() {
  const [items, setItems] = useState<ResearchPublication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResearch()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

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

        {/* Loading */}
        {loading && (
          <p className="mt-10 text-sm text-[#6d777c]">
            Loading research publications…
          </p>
        )}

        {/* Research grid */}
        {!loading && items.length > 0 && (
          <div className="mt-10 grid min-w-0 gap-5 md:grid-cols-2">
            {items.map((item) => (
              <Link
                key={item.slug}
                href={`/research/articles/?paper=${encodeURIComponent(item.slug)}`}
                className="group min-w-0 max-w-full break-words rounded-[24px] border border-[#263f57]/10 bg-white p-8 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg [overflow-wrap:anywhere]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#c87568]">
                    <BookOpen size={14} />
                    {item.series || "Research"}
                  </div>

                  {item.publishedDate && (
                    <span className="shrink-0 text-xs font-semibold text-[#263f57]/45">
                      {item.publishedDate}
                    </span>
                  )}
                </div>

                <h3 className="mt-5 max-w-full break-words text-2xl font-bold leading-tight tracking-tight text-[#263f57] [overflow-wrap:anywhere]">
                  {item.title}
                </h3>

                <p className="mt-4 max-w-full break-words text-sm leading-6 text-[#6d777c] [overflow-wrap:anywhere]">
                  {item.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-[#263f57]/50">
                  {item.pages && <span>{item.pages}</span>}
                  {item.category && <span>{item.category}</span>}
                  {item.author && <span>{item.author}</span>}
                </div>

                <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#263f57] transition-transform group-hover:translate-x-1">
                  Read Research Paper
                  <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !items.length && (
          <div className="mt-10 rounded-[24px] border border-[#263f57]/10 bg-white px-6 py-14 text-center text-[#7a8388]">
            <BookOpen className="mx-auto mb-3" />
            <p>No research publications available yet.</p>
          </div>
        )}

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