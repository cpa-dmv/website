
import Image from "next/image";

const expertise = [
  "Marriage and relationship guidance",
  "Premarital preparation and long-term commitment",
  "Navigating major life transitions",
  "Divorce financial analysis and asset division",
  "Financial investigations and support calculations",
];

const credentials = [
  "Certified Divorce Financial Analyst (IDFA Certified)",
  "Founder & Principal, WholeLife",
  "Expertise in forensic accounting and financial analysis",
];

export default function WholeLifeCounsellor() {
  return (
    <section className="bg-[#f7f5f1] px-4 py-8 sm:px-6 md:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-6 overflow-hidden rounded-3xl bg-white p-5 shadow-sm sm:p-7 md:grid-cols-[0.9fr_1.1fr] md:gap-8 md:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          {/* Left column: landscape photo and booking card */}
          <div className="flex min-w-0 flex-col gap-4">
            <div className="relative aspect-[5/3.5] w-full overflow-hidden rounded-2xl bg-[#e8e5df]">
              <Image
                src="/images/whole-life/dr-praveen-singhal.jpg"
                alt="Dr Praveen Singhal, Founder and Principal of WholeLife"
                fill
                priority={false}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 45vw, 600px"
                className="object-cover object-[center_20%]"
              />
            </div>

            <div className="rounded-2xl bg-[#263f57] p-5 text-white sm:p-6">
              <h4 className="text-lg font-semibold leading-snug">
                Take the First Step Towards a Stronger Future
              </h4>

              <p className="mt-3 text-sm leading-6 text-white/85">
                Connect with Dr Praveen Singhal, book your FREE introductory
                session, and receive our Marriage Handbook filled with
                practical insights for building a stronger, lasting
                relationship!
              </p>

              <a
                href="/contact/"
                className="mt-4 inline-flex max-w-full items-center justify-center rounded-full bg-[#c87568] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#b86659]"
              >
                Book Your FREE Introductory Session →
              </a>

              <p className="mt-3 text-xs tracking-wide text-white/70">
                Guidance · Commitment · Perseverance
              </p>
            </div>
          </div>

          {/* Right column: complete counsellor profile */}
          <div className="min-w-0 md:pt-1">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#c87568]">
              Meet Your Counsellor
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-[#263f57] sm:text-3xl">
              Dr Praveen Singhal
            </h2>

            <p className="mt-1.5 text-sm font-medium text-[#c87568]">
              Founder &amp; Principal, WholeLife
            </p>

            <h3 className="mt-4 text-lg font-semibold leading-snug text-[#263f57] sm:text-xl">
              Helping Couples Navigate Challenges and Build Stronger
              Relationships
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
              Every marriage has its difficult moments. WholeLife encourages
              couples to seek guidance, improve understanding, and approach
              long-term commitment with greater clarity and intention.
            </p>

            <h4 className="mt-5 font-semibold text-[#263f57]">
              Areas of Expertise
            </h4>

            <ul className="mt-2.5 space-y-2 text-sm leading-5 text-slate-600 sm:text-base sm:leading-6">
              {expertise.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className="shrink-0 text-[#c87568]">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h4 className="mt-5 font-semibold text-[#263f57]">
              Professional Credentials
            </h4>

            <ul className="mt-2.5 space-y-2 text-sm leading-5 text-slate-600 sm:text-base sm:leading-6">
              {credentials.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className="shrink-0 text-[#c87568]">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
