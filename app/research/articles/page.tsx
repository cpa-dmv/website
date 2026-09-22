"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchResearch, type ResearchPublication } from "@/lib/research";

type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

const sections: ArticleSection[] = [
  {
    heading: "The New Definition of Success",
    paragraphs: [
      "For much of modern history, education has been treated as the central pathway to a successful adult life. Students were encouraged to focus on grades, examinations, degrees, and professional qualifications, with the expectation that academic achievement would naturally translate into career stability and personal independence.",
      "That assumption is becoming increasingly incomplete. A degree remains valuable, but academic achievement alone does not prepare a person for every decision they will face after graduation.",
      "Young adults must navigate increasingly complex choices involving employment, money, relationships, housing, health, family responsibilities, technology, and long-term planning. These decisions rarely appear on an academic transcript.",
      "The result is a gap between being academically prepared and being prepared for life.",
    ],
  },
  {
    heading: "Academic Achievement and Life Preparedness Are Different",
    paragraphs: [
      "Academic success measures performance within an educational environment. It can demonstrate discipline, knowledge, analytical ability, persistence, and subject-specific competence.",
      "Life preparedness is broader. It involves the ability to apply knowledge in uncertain and changing circumstances.",
      "A person may graduate with excellent grades and still struggle to understand taxes, negotiate employment terms, evaluate financial products, communicate effectively in difficult relationships, or make long-term decisions.",
      "This does not diminish the importance of education. Instead, it highlights the need to expand the definition of preparation.",
    ],
  },
  {
    heading: "The Transition Into Adulthood",
    paragraphs: [
      "The transition from education into adulthood is one of the most consequential periods in a person's life.",
      "During this stage, individuals begin making decisions that can have effects lasting years or even decades. Career choices influence income and professional development. Financial decisions influence savings and debt. Relationship decisions influence family structures and responsibilities.",
      "At the same time, young adults are expected to make many of these decisions with limited practical experience.",
      "The challenge is therefore not simply acquiring information. It is learning how to make decisions responsibly when the correct answer is not obvious.",
    ],
  },
  {
    heading: "Career Preparedness",
    paragraphs: [
      "Academic qualifications can open professional opportunities, but career development requires additional capabilities.",
      "Individuals increasingly need to understand how to evaluate opportunities, communicate their value, build professional relationships, adapt to technological change, and continue learning throughout their careers.",
      "Career preparedness also includes understanding that professional paths are rarely linear. People may change industries, start businesses, pursue further education, work internationally, or move between employment and independent work.",
      "Preparing for a career therefore means developing both technical competence and the ability to navigate change.",
    ],
  },
  {
    heading: "Financial Preparedness",
    paragraphs: [
      "Financial decisions are another major area where academic achievement does not automatically translate into practical readiness.",
      "Young adults may encounter salaries, taxes, insurance, loans, investments, retirement planning, rent, mortgages, and other financial responsibilities soon after entering the workforce.",
      "The consequences of financial decisions can compound over time. Understanding basic financial principles can therefore become an important component of long-term stability.",
      "Financial preparedness does not require everyone to become an investment expert. It requires individuals to understand the fundamentals well enough to make informed decisions and recognize when professional advice may be appropriate.",
    ],
  },
  {
    heading: "Relationships, Marriage, and Family",
    paragraphs: [
      "Education systems traditionally devote considerable attention to academic and professional development but comparatively little to interpersonal decision-making.",
      "Yet relationships and family decisions can become some of the most significant decisions of adulthood.",
      "Communication, compatibility, conflict resolution, expectations, shared financial responsibilities, parenting decisions, and extended-family dynamics can all influence long-term wellbeing.",
      "Preparing for these areas does not mean prescribing a particular life path. It means developing the communication and decision-making capabilities required to navigate whichever path an individual chooses.",
    ],
  },
  {
    heading: "The Role of Continuous Counseling",
    paragraphs: [
      "If life decisions become more complex after graduation, preparation cannot reasonably end at graduation.",
      "A continuous counseling model treats development as an ongoing process rather than a single educational phase.",
      "Instead of providing support only when a crisis occurs, individuals can benefit from guidance at important transition points: choosing education, entering employment, changing careers, managing finances, considering marriage, starting a family, or planning for later life.",
      "The purpose is not to make decisions for an individual. It is to provide perspective, information, structured reflection, and support so that individuals can make their own decisions more thoughtfully.",
    ],
  },
  {
    heading: "Why the WholeLife Model Matters",
    paragraphs: [
      "The WholeLife approach is based on the idea that education, career, financial stability, relationships, family, and long-term planning should not be treated as completely isolated areas.",
      "Each can influence the others.",
      "A career decision can affect finances. Financial decisions can affect family planning. Family responsibilities can affect career choices. Educational decisions can influence professional opportunities.",
      "A broader model of counseling therefore considers the interaction between these areas rather than examining each decision in isolation.",
    ],
  },
  {
    heading: "From One-Time Advice to Long-Term Partnership",
    paragraphs: [
      "Traditional counseling is often associated with a single consultation or a specific problem.",
      "A lifetime partnership is different. It recognizes that circumstances change and that advice that is appropriate at one stage may need to be reconsidered later.",
      "The objective is therefore not to provide a permanent answer to every question. It is to establish a trusted framework through which individuals can revisit important decisions as their circumstances evolve.",
    ],
  },
  {
    heading: "Conclusion",
    paragraphs: [
      "Academic success remains an important foundation, but it is only one component of life preparedness.",
      "The modern transition into adulthood requires individuals to navigate education, careers, finances, relationships, family responsibilities, and long-term planning in an environment that continues to change.",
      "Preparing people for these decisions requires a broader understanding of development—one that continues beyond the classroom and adapts to different stages of life.",
      "The central idea is simple: a successful education should not only prepare someone to earn a degree. It should help prepare them to navigate the life that follows.",
    ],
  },
];

const references = [
  {
    title:
      "Economic Well-Being of U.S. Households in 2025",
    source: "Federal Reserve",
    year: "2026",
  },
  {
    title:
      "Milestones: Young Adults and the Transition to Adulthood",
    source: "Pew Research Center",
    year: "2024",
  },
  {
    title: "Job Outlook 2025",
    source: "National Association of Colleges and Employers",
    year: "2025",
  },
  {
    title: "Education Pays",
    source: "U.S. Bureau of Labor Statistics",
    year: "2026",
  },
  {
    title:
      "Young Adult Milestones and Family Formation",
    source: "U.S. Census Bureau",
    year: "2025",
  },
];

export default function ResearchArticlesPage() {
  const [publication, setPublication] =
    useState<ResearchPublication | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedSlug = params.get("paper");

    fetchResearch()
      .then((items) => {
        const selected =
          items.find((item) => item.slug === requestedSlug) ??
          items.find((item) => item.slug === "beyond-the-degree") ??
          items[0] ??
          null;

        setPublication(selected);
      })
      .catch(() => {
        setPublication(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f5f1] px-5 py-24">
        <div className="mx-auto max-w-[1000px] text-center">
          <div className="mx-auto h-12 w-12 animate-pulse rounded-full bg-[#263f57]/10" />

          <p className="mt-6 text-sm font-semibold text-[#536573]">
            Loading research publication...
          </p>
        </div>
      </main>
    );
  }

  if (!publication) {
    return (
      <main className="min-h-screen bg-[#f7f5f1] px-5 py-24">
        <div className="mx-auto max-w-[900px] rounded-[28px] bg-white p-10 text-center shadow-sm">
          <FileText
            size={42}
            className="mx-auto text-[#c87568]"
          />

          <h1 className="mt-6 text-3xl font-bold text-[#263f57]">
            Research publication not found
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-[#536573]">
            The research publication you are looking for is no longer
            available or could not be loaded.
          </p>

          <Link
            href="/research"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#263f57] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1c3044]"
          >
            <ArrowLeft size={16} />
            Back to Research
          </Link>
        </div>
      </main>
    );
  }

  const isBeyondTheDegree =
    publication.slug === "beyond-the-degree";

  return (
    <main className="min-h-screen bg-[#f7f5f1]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#263f57]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,117,104,0.22),transparent_38%)]" />

        <div className="relative mx-auto max-w-[1200px] px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20">
          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Research
          </Link>

          <div className="mt-14 max-w-[950px]">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e49a8e]">
              {publication.series}
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
              {publication.title}
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
              {publication.description}
            </p>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm text-white/65">
              <span>
                <strong className="text-white">
                  Category:
                </strong>{" "}
                {publication.category}
              </span>

              <span>
                <strong className="text-white">
                  Pages:
                </strong>{" "}
                {publication.pages}
              </span>

              <span>
                <strong className="text-white">
                  Author:
                </strong>{" "}
                {publication.author}
              </span>

              <span>
                <strong className="text-white">
                  Published:
                </strong>{" "}
                {publication.publishedDate}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-[1000px] px-5 py-14 sm:px-8 sm:py-20">
        {/* BEYOND THE DEGREE — CUSTOM ARTICLE */}
        {isBeyondTheDegree && (
          <>
            <article className="rounded-[30px] bg-white p-7 shadow-sm sm:p-10 lg:p-14">
              <div className="mb-12 border-b border-[#263f57]/10 pb-10">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c87568]">
                  Research Article
                </p>

                <h2 className="mt-4 text-3xl font-bold leading-tight text-[#263f57] sm:text-4xl">
                  {publication.shortTitle ||
                    publication.title}
                </h2>

                <p className="mt-6 text-lg leading-8 text-[#536573]">
                  {publication.description}
                </p>
              </div>

              <div className="space-y-12">
                {sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-2xl font-bold leading-tight text-[#263f57] sm:text-3xl">
                      {section.heading}
                    </h2>

                    <div className="mt-5 space-y-5">
                      {section.paragraphs.map(
                        (paragraph, index) => (
                          <p
                            key={`${section.heading}-${index}`}
                            className="text-base leading-8 text-[#536573]"
                          >
                            {paragraph}
                          </p>
                        ),
                      )}
                    </div>
                  </section>
                ))}
              </div>
            </article>

            {/* WHOLELIFE CLOSING */}
            <section className="mt-8 overflow-hidden rounded-[30px] bg-[#263f57] p-8 text-white sm:p-12">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e49a8e]">
                WholeLife Perspective
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
                A lifetime partnership, not a one-time service.
              </h2>

              <p className="mt-6 max-w-3xl text-base leading-8 text-white/70">
                WholeLife is built around continuous,
                thoughtful counseling through the decisions
                that shape a person&apos;s future—from education
                and career to finances, marriage, family, and
                long-term stability.
              </p>
            </section>

            {/* REFERENCES */}
            <section className="mt-8 rounded-[30px] bg-white p-8 shadow-sm sm:p-10">
              <div className="flex items-center gap-3">
                <FileText
                  size={20}
                  className="text-[#c87568]"
                />

                <h2 className="text-2xl font-bold text-[#263f57]">
                  References
                </h2>
              </div>

              <div className="mt-7 divide-y divide-[#263f57]/10">
                {references.map((reference, index) => (
                  <div
                    key={reference.title}
                    className="flex gap-5 py-5"
                  >
                    <span className="shrink-0 text-sm font-bold text-[#c87568]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <p className="font-semibold text-[#263f57]">
                        {reference.title}
                      </p>

                      <p className="mt-1 text-sm text-[#7a8388]">
                        {reference.source} ·{" "}
                        {reference.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* OTHER RESEARCH PAPERS — PDF BASED */}
        {!isBeyondTheDegree && (
          <section className="rounded-[30px] bg-white p-7 shadow-sm sm:p-10 lg:p-12">
            <div className="border-b border-[#263f57]/10 pb-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c87568]">
                Research Publication
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight text-[#263f57] sm:text-4xl">
                {publication.shortTitle ||
                  publication.title}
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-[#536573]">
                {publication.description}
              </p>
            </div>

            <div className="grid gap-6 border-b border-[#263f57]/10 py-8 sm:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7a8388]">
                  Author
                </p>

                <p className="mt-2 font-semibold text-[#263f57]">
                  {publication.author}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7a8388]">
                  Published
                </p>

                <p className="mt-2 font-semibold text-[#263f57]">
                  {publication.publishedDate}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7a8388]">
                  Series
                </p>

                <p className="mt-2 font-semibold text-[#263f57]">
                  {publication.series}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7a8388]">
                  Publication
                </p>

                <p className="mt-2 font-semibold text-[#263f57]">
                  {publication.pages}
                </p>
              </div>
            </div>

            {publication.pdf && (
              <div className="mt-8 rounded-2xl bg-[#f7f5f1] p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#263f57] text-white">
                      <FileText size={21} />
                    </div>

                    <div>
                      <p className="font-bold text-[#263f57]">
                        Full Research Publication
                      </p>

                      <p className="mt-1 text-sm text-[#7a8388]">
                        The complete publication is
                        available as a PDF document.
                      </p>
                    </div>
                  </div>

                  <a
                    href={publication.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#263f57] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1c3044]"
                  >
                    Open Research Paper
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            )}

            {!publication.pdf && (
              <div className="mt-8 rounded-2xl border border-dashed border-[#263f57]/15 bg-[#f7f5f1] p-8 text-center">
                <FileText
                  size={30}
                  className="mx-auto text-[#c87568]"
                />

                <p className="mt-4 font-semibold text-[#263f57]">
                  Publication document coming soon
                </p>

                <p className="mt-2 text-sm text-[#7a8388]">
                  The research information has been
                  published, but the full PDF has not yet
                  been uploaded.
                </p>
              </div>
            )}
          </section>
        )}

        {/* FOOTER CTA */}
        <section className="mt-10 rounded-[30px] border border-[#263f57]/10 bg-white p-8 text-center shadow-sm sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c87568]">
            Continue Exploring
          </p>

          <h2 className="mt-3 text-2xl font-bold text-[#263f57] sm:text-3xl">
            Explore more WholeLife research
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#536573]">
            Explore research and publications examining
            education, career development, financial
            preparedness, relationships, family, and
            long-term life planning.
          </p>

          <Link
            href="/research"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#263f57] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#1c3044]"
          >
            View All Research
            <ExternalLink size={16} />
          </Link>
        </section>
      </section>
    </main>
  );
}