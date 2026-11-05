
"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";

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

export default function FreeRelationshipGuidePage() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#F8F6F2] text-[#29435D]">

      {/* SECTION 1 — FREE RELATIONSHIP GUIDE */}
      <section className="relative overflow-hidden bg-[#071B31] px-6 py-16 text-white md:px-16 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">

          <div>
            <span className="inline-flex rounded-full border border-[#F5A15F]/40 bg-white/10 px-5 py-2 text-sm font-bold text-[#F5A15F]">
              ✦ YOUR FREE RELATIONSHIP GUIDE COUNSELING ✦
            </span>

            <h1 className="mt-7 text-4xl font-extrabold leading-tight md:text-6xl">
              Every Minute,
              <span className="block text-[#F5A15F]">
                Another Marriage
              </span>
              Faces a Turning Point.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-white/80">
              Relationships face challenges that go beyond communication.
              Children, parenting, careers, finances and family
              responsibilities can all put pressure on a marriage.
            </p>

            <p className="mt-5 text-xl font-bold leading-relaxed text-white">
              Your relationship deserves attention before it reaches a
              breaking point.
            </p>

            <a
              href="#free-session"
              className="mt-8 inline-flex rounded-full bg-[#F5A15F] px-8 py-4 font-extrabold text-[#071B31] shadow-lg transition hover:-translate-y-1 hover:bg-[#F7B47F]"
            >
              GET YOUR FREE RELATIONSHIP GUIDE COUNSELING →
            </a>

            <p className="mt-4 text-sm text-white/65">
                Guidance · Commitment · Perseverance
            </p>
          </div>

          {/* GUIDE COVER */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur">
              <div className="flex aspect-[4/5] flex-col justify-between rounded-2xl bg-[#F8F6F2] p-8 text-[#29435D]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D47768]">
                    WHOLELIFE PRESENTS
                  </p>

                  <div className="mt-8 h-1 w-16 rounded-full bg-[#F5A15F]" />

                  <h2 className="mt-8 text-4xl font-extrabold leading-tight">
                    A Stronger
                    <span className="block text-[#D47768]">
                      Relationship
                    </span>
                    Starts With
                    <span className="block">Understanding.</span>
                  </h2>

                  <p className="mt-6 text-sm leading-6 text-[#64748B]">
                    A practical guide to navigating marriage, family,
                    communication and life's important decisions together.
                  </p>
                </div>

                <div className="border-t border-[#29435D]/15 pt-5">
                  <p className="font-extrabold">WHOLE LIFE</p>
                  <p className="mt-1 text-xs tracking-widest text-[#64748B]">
                    GUIDANCE · COMMITMENT · PERSEVERANCE
                  </p>
                  <span className="mt-5 inline-block rounded-full bg-[#F5A15F] px-4 py-2 text-xs font-extrabold text-[#071B31]">
                    100% FREE GUIDE
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -right-4 rounded-2xl bg-[#D47768] px-6 py-4 font-extrabold text-white shadow-xl">
              YOUR GUIDE IS FREE!
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — DR PRAVEEN SINGHAL */}
      <section className="px-6 py-16 md:px-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-8 overflow-hidden rounded-3xl bg-white p-5 shadow-xl sm:p-8 md:grid-cols-[0.95fr_1.05fr] md:gap-10 md:p-10">

            {/* COUNSELLOR PHOTO AND CTA CARD */}
            <div className="flex min-w-0 flex-col gap-4">
              <div className="relative aspect-[5/3.5] w-full overflow-hidden rounded-2xl bg-[#E8E5DF]">
                <Image
                  src="/images/whole-life/dr-praveen-singhal.jpg"
                  alt="Dr Praveen Singhal, Founder and Principal of WholeLife"
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover object-[center_20%]"
                />
              </div>

              <div className="rounded-2xl bg-[#263F57] p-5 text-white sm:p-6">
                <h3 className="text-lg font-extrabold leading-snug">
                  Take the First Step Towards a Stronger Future
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/85">
                  Connect with Dr Praveen Singhal, book your FREE introductory
                  session, and receive our Marriage Handbook filled with
                  practical insights for building a stronger, lasting
                  relationship!
                </p>

                <a
                  href="/contact/"
                  className="mt-5 inline-flex max-w-full items-center justify-center rounded-full bg-[#C87568] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#B86659]"
                >
                  Book Your FREE Introductory Session →
                </a>

                <p className="mt-3 text-xs tracking-wide text-white/70">
                  Guidance · Commitment · Perseverance
                </p>
              </div>
            </div>

            {/* COUNSELLOR PROFILE */}
            <div className="min-w-0 md:pt-1">
              <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#C87568]">
                Meet Your Counsellor
              </p>

              <h2 className="text-3xl font-extrabold tracking-tight text-[#263F57]">
                Dr Praveen Singhal
              </h2>

              <p className="mt-1.5 text-sm font-semibold text-[#C87568]">
                Founder &amp; Principal, WholeLife
              </p>

              <h3 className="mt-5 text-xl font-extrabold leading-snug text-[#263F57]">
                Helping Couples Navigate Challenges and Build Stronger
                Relationships
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                Every marriage has its difficult moments. WholeLife encourages
                couples to seek guidance, improve understanding, and approach
                long-term commitment with greater clarity and intention.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                From everyday decisions to life's biggest milestones,
                WholeLife is here to guide you.
              </p>

              <h4 className="mt-6 font-extrabold text-[#263F57]">
                Areas of Expertise
              </h4>

              <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-600 sm:text-base">
                {expertise.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="shrink-0 font-bold text-[#C87568]">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h4 className="mt-6 font-extrabold text-[#263F57]">
                Professional Credentials
              </h4>

              <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-600 sm:text-base">
                {credentials.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="shrink-0 font-bold text-[#C87568]">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — FREE SESSION */}
      <section
        id="free-session"
        className="scroll-mt-20 bg-[#071B31] px-6 py-16 text-center text-white md:px-16 md:py-24"
      >
        <div className="mx-auto max-w-4xl">
          <span className="inline-flex rounded-full border border-[#F5A15F]/40 bg-[#F5A15F]/10 px-5 py-2 text-sm font-extrabold text-[#F5A15F]">
            YOUR NEXT STEP STARTS HERE
          </span>

          <h2 className="mt-7 text-4xl font-extrabold leading-tight md:text-6xl">
            Don't Wait for a Crisis
            <span className="block text-[#F5A15F]">
              to Seek Support.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/75">
            Build a stronger relationship with the right guidance and
            support at every stage of life. Whether you are preparing for
            marriage, navigating challenges or planning your future
            together, take the first step today.
          </p>

          <div className="mx-auto mt-10 max-w-xl rounded-3xl bg-white p-8 text-[#29435D] shadow-2xl sm:p-10">

            <p className="text-sm font-extrabold uppercase tracking-widest text-[#C87568]">
              INTRODUCTORY OFFER
            </p>

            <h3 className="mt-4 text-3xl font-extrabold leading-tight">
              YOUR FIRST
              <span className="mt-2 block text-4xl text-[#D47768] sm:text-5xl">
                30-MINUTE SESSION
              </span>
              <span className="mt-2 block text-4xl font-black text-[#F5A15F]">
                IS FREE!
              </span>
            </h3>

            {/* CALENDAR-STYLE BOOKING CTA */}
            <a
              href="/contact/"
              className="mt-8 flex items-center justify-center gap-3 rounded-2xl bg-[#F5A15F] px-6 py-5 font-extrabold text-[#071B31] shadow-md transition hover:-translate-y-1 hover:bg-[#F7B47F]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/40 text-2xl">
                📅
              </span>
              <span className="text-left">
                <span className="block text-lg">BOOK YOUR FREE SESSION</span>
                <span className="block text-xs font-medium">
                  Schedule your introductory appointment
                </span>
              </span>
            </a>

            {/* PHONE CALL OPTION */}
            <a
              href="/contact/"
              className="mt-4 flex items-center justify-center gap-3 rounded-2xl border-2 border-[#29435D]/20 px-6 py-5 font-extrabold text-[#29435D] transition hover:bg-[#F8F6F2]"
            >
              <span className="text-2xl">☎</span>
              <span className="text-left">
                <span className="block">REQUEST A FREE PHONE CALL</span>
                <span className="block text-xs font-medium text-slate-500">
                  Let us know when we can reach you
                </span>
              </span>
            </a>

            {/* FREE RELATIONSHIP GUIDE BUTTON */}
<a
  href="/contact/"
  className="mt-3 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#263F57] px-6 py-5 font-extrabold text-white shadow-sm transition hover:bg-[#1d3044]"
>
  GET YOUR FREE RELATIONSHIP GUIDE →
</a>


            <p className="mt-5 text-xs leading-5 text-[#94A3B8]">
              Your first introductory session is completely FREE.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#041426] px-6 py-10 text-center text-white/60">
        <p className="text-xl font-extrabold text-white">WholeLife</p>

        <p className="mt-2 text-xs tracking-widest">
          GUIDANCE · COMMITMENT · PERSEVERANCE
        </p>

        <p className="mt-5 text-sm">
          © {new Date().getFullYear()} WholeLife. All rights reserved.
        </p>

        <a
          href="/whole-life/"
          className="mt-4 inline-block text-sm text-[#F5A15F] transition hover:underline"
        >
          ← Back to WholeLife
        </a>
      </footer>
    </main>
  );
}
