
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
    <section className="bg-[#f7f5f1] px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 overflow-hidden rounded-3xl bg-white p-6 shadow-sm md:grid-cols-[0.85fr_1.15fr] md:gap-14 md:p-12">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl bg-[#e8e5df]">
            <Image
              src="/images/whole-life/dr-praveen-singhal.jpg"
              alt="Dr Praveen Singhal, Founder and Principal of WholeLife"
              fill
              priority={false}
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover object-top"
            />
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#c87568]">
              Meet Your Counsellor
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-[#263f57] md:text-4xl">
              Dr Praveen Singhal
            </h2>

            <p className="mt-2 font-medium text-[#c87568]">
              Founder &amp; Principal, WholeLife
            </p>

            <h3 className="mt-7 text-xl font-semibold leading-snug text-[#263f57] md:text-2xl">
              Helping Couples Navigate Challenges and Build Stronger
              Relationships
            </h3>

            <p className="mt-4 leading-7 text-slate-600">
              Every marriage has its difficult moments. WholeLife encourages
              couples to seek guidance, improve understanding, and approach
              long-term commitment with greater clarity and intention.
            </p>

            <h4 className="mt-7 font-semibold text-[#263f57]">
              Areas of Expertise
            </h4>

            <ul className="mt-3 space-y-2 text-slate-600">
              {expertise.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-[#c87568]">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h4 className="mt-7 font-semibold text-[#263f57]">
              Professional Credentials
            </h4>

            <ul className="mt-3 space-y-2 text-slate-600">
              {credentials.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-[#c87568]">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl bg-[#263f57] p-6 text-white">
              <h4 className="text-xl font-semibold">
                Take the First Step Towards a Stronger Future
              </h4>

              <p className="mt-3 leading-7 text-white/85">
                Connect with Dr Praveen Singhal, book your FREE introductory
                session, and receive our Marriage Handbook filled with
                practical insights for building a stronger, lasting
                relationship!
              </p>

              <a
                href="/contact/"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-[#c87568] px-6 py-3 font-semibold text-white transition hover:bg-[#b86659]"
              >
                Book Your FREE Introductory Session →
              </a>

              <p className="mt-4 text-sm tracking-wide text-white/70">
                Guidance · Commitment · Perseverance
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
