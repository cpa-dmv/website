"use client";

import { motion } from "framer-motion";
import {
  Award,
  BadgeDollarSign,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  CircleAlert,
  GraduationCap,
  Handshake,
  Heart,
  HeartHandshake,
  Home,
  PiggyBank,
  Scale,
  ShieldCheck,
  Sparkles,
  UsersRound,
  WalletCards,
} from "lucide-react";

const services = [
  {
    title: "High School counselling",
    icon: GraduationCap,
  },
  {
    title: "College counselling",
    icon: Building2,
  },
  {
    title: "Career counselling",
    icon: BriefcaseBusiness,
  },
  {
    title: "Internship counselling",
    icon: BriefcaseBusiness,
  },
  {
    title: "Job Counselling",
    icon: BriefcaseBusiness,
  },
  {
    title: "Arrange meet-ups with potential partners with commitments",
    icon: Handshake,
  },
  {
    title: "Marital Counselling",
    icon: HeartHandshake,
  },
];

const promiseItems = [
  {
    value: "Married",
    target: "24",
    icon: Heart,
  },
  {
    value: "Household income",
    target: "$30K",
    detail: "by 28",
    icon: WalletCards,
  },
  {
    value: "House",
    target: "$1M",
    detail: "by 30",
    icon: Home,
  },
  {
    value: "Kids",
    target: "2",
    detail: "by 32 unless health problem",
    icon: UsersRound,
  },
];

const exceptions = [
  "SAT score of less than 1520",
  "Obtain Technical license based career by 23",
  "Not married by 24",
  "Body count of 4 or more before marriage",
  "HS GPA of less than 3.8",
  "BS GPA of less than 3.8",
  "Course selection guidance not followed",
  "BS not completed in 4 years",
  "Not graduating from top 80 university for your major",
  "Getting married to someone not approved by us",
  "Smoking or drinking or drugs or gambling or women/men issues involved",
  "Getting married without our approval for marital agreement.",
  "Counseling sessions are not attended at least once a month for 15 minutes (Reschedules are allowed)",
  "Our advice are ignored",
  "No fault divorce",
  "Fault of divorce recipient of our services",
  "Choose to have no kids or one kid",
];

function SectionLabel({
  number,
  title,
  color = "#263f57",
}: {
  number: string;
  title: string;
  color?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[11px] font-bold text-white shadow-sm"
        style={{ backgroundColor: color }}
      >
        {number}
      </span>

      <div>
        <p
          className="text-[9px] font-bold uppercase tracking-[0.2em]"
          style={{ color }}
        >
          {title}
        </p>
      </div>
    </div>
  );
}

function ServiceItem({
  title,
  icon: Icon,
  index,
}: {
  title: string;
  icon: React.ElementType;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="group flex items-center gap-3 border-b border-[#263f57]/8 py-3 last:border-b-0"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#263f57]/10 bg-[#f5f8fb] text-[#263f57] transition-all duration-300 group-hover:bg-[#263f57] group-hover:text-white">
        <Icon size={17} strokeWidth={1.8} />
      </span>

      <p className="text-[13px] font-semibold leading-5 text-[#263f57] sm:text-[14px]">
        {title}
      </p>
    </motion.div>
  );
}

export default function WholeLifePromise() {
  return (
    <section className="relative overflow-hidden border-t border-[#263f57]/8 bg-[#fcfaf7] py-16 lg:py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-[-180px] top-20 h-[420px] w-[420px] rounded-full bg-[#f4d8d0]/45 blur-[110px]" />
      <div className="pointer-events-none absolute right-[-180px] top-[35%] h-[440px] w-[440px] rounded-full bg-[#dce9e6]/55 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-180px] left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-[#e8dfd1]/35 blur-[110px]" />

      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        {/* ================================================================
            HEADER
        ================================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c87568]/20 bg-white px-4 py-2 shadow-sm">
            <Sparkles size={14} className="text-[#c87568]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a96056]">
              Our package · Our promise
            </span>
          </div>

          <h2 className="font-display text-[clamp(2.25rem,4vw,4rem)] font-bold leading-[1.03] tracking-[-0.045em] text-[#263f57]">
            One program.
            <span className="block text-[#c87568]">
              A lifetime of guidance.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#6d777c] sm:text-base">
            A continuous counselling relationship designed to support the
            decisions that shape education, career, partnership, marriage,
            family, and long-term life outcomes.
          </p>
        </motion.div>

        {/* ================================================================
            MAIN PACKAGE
        ================================================================ */}
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
          {/* ---------------------------------------------------------------
              01 SERVICES
          --------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="overflow-hidden rounded-[28px] border border-[#263f57]/10 bg-white shadow-[0_18px_55px_rgba(38,63,87,0.07)]"
          >
            <div className="border-b border-[#263f57]/8 bg-gradient-to-r from-[#263f57] to-[#315b80] px-5 py-5 sm:px-7">
              <SectionLabel number="01" title="Services" color="#c87568" />

              <h3 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
                What the WholeLife program provides.
              </h3>

              <p className="mt-2 max-w-xl text-xs leading-5 text-white/60 sm:text-sm">
                One connected program covering the major stages and decisions
                of life.
              </p>
            </div>

            <div className="p-5 sm:p-7">
              <div className="grid sm:grid-cols-2 sm:gap-x-7">
                {services.map((service, index) => (
                  <ServiceItem
                    key={service.title}
                    title={service.title}
                    icon={service.icon}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* ---------------------------------------------------------------
              RIGHT COLUMN
          --------------------------------------------------------------- */}
          <div className="grid gap-5">
           

            {/* 02 WARRANTY */}
            <motion.div
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: 0.08, duration: 0.5 }}
              className="overflow-hidden rounded-[28px] border border-[#315b80]/15 bg-white shadow-[0_18px_55px_rgba(38,63,87,0.06)]"
            >
              <div className="border-b border-[#315b80]/10 bg-[#f2f6fa] px-5 py-4 sm:px-6">
                <SectionLabel number="02" title="Warranty" color="#263f57" />
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eaf1f6] text-[#263f57]">
                    <ShieldCheck size={25} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8a9296]">
                      Guaranteed
                    </p>

                    <p className="mt-1 font-display text-2xl font-bold text-[#c87568]">
                      100% fee reimbursement
                    </p>

                    <div className="mt-3 space-y-2">
                      <p className="flex items-center gap-2 text-sm text-[#263f57]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#263f57]" />
                        Not married by <strong>24</strong>
                      </p>

                      <p className="flex items-center gap-2 text-sm text-[#263f57]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#263f57]" />
                        Divorced by <strong>40</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 03 ASSUMPTIONS */}
            <motion.div
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: 0.16, duration: 0.5 }}
              className="rounded-[28px] border border-[#557d75]/20 bg-white p-5 shadow-[0_18px_55px_rgba(85,125,117,0.06)] sm:p-6"
            >
              <SectionLabel number="03" title="Assumptions" color="#557d75" />

              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#eef5f2] px-4 py-3.5">
                <CheckCircle2 size={19} className="shrink-0 text-[#557d75]" />

                <p className="text-sm font-semibold text-[#263f57]">
                  Family / Child is listening
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ================================================================
            PROMISE
        ================================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="relative mt-6 overflow-hidden rounded-[30px] bg-[#263f57] px-5 py-8 shadow-[0_22px_60px_rgba(38,63,87,0.15)] sm:px-8 lg:px-10 lg:py-10"
        >
          <div className="pointer-events-none absolute right-[-80px] top-[-100px] h-64 w-64 rounded-full bg-[#c87568]/15 blur-[70px]" />

          <div className="relative">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#efc18e]">
                  The promise
                </p>

                <h3 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                  The life we are working toward.
                </h3>

                <p className="mt-2 max-w-2xl text-xs leading-5 text-white/55 sm:text-sm">
                  These are the stated WholeLife program targets.
                </p>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#efc18e]/25 bg-[#efc18e]/10 text-[#efc18e]">
                <Sparkles size={21} />
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {promiseItems.map(
                ({ value, target, detail, icon: Icon }, index) => (
                  <motion.div
                    key={value}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.07, duration: 0.4 }}
                    className="rounded-2xl border border-white/10 bg-white/[0.055] p-4"
                  >
                    <Icon size={18} className="text-[#efc18e]" />

                    <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.13em] text-white/45">
                      {value}
                    </p>

                    <p className="mt-1 font-display text-2xl font-bold text-white">
                      {target}
                    </p>

                    {detail && (
                      <p className="mt-1 text-[11px] leading-4 text-white/55">
                        {detail}
                      </p>
                    )}
                  </motion.div>
                ),
              )}
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[#c87568]/20 bg-[#c87568]/10 px-4 py-3.5">
              <HeartHandshake size={19} className="shrink-0 text-[#f19a88]" />

              <p className="text-xs leading-5 text-white/65 sm:text-sm">
                <strong className="text-white">
                  Kids: 2 by 32 unless health problem.
                </strong>
              </p>
            </div>
          </div>
        </motion.div>

        {/* ================================================================
            RESERVES
        ================================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="mt-6 grid gap-5 lg:grid-cols-[1fr_1.25fr]"
        >
          <div className="rounded-[28px] border border-[#a77a3d]/20 bg-white p-6 shadow-[0_16px_45px_rgba(167,122,61,0.06)] sm:p-7">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f7f0e3] text-[#a77a3d]">
                <PiggyBank size={21} />
              </span>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#a77a3d]">
                  Reserves
                </p>

                <h3 className="mt-1 font-display text-xl font-bold text-[#263f57]">
                  Financial reserve principle
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#6d777c]">
                  25% of revenue to be maintained in liquid assets (Real estate
                  equities) or Stocks
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#263f57]/10 bg-gradient-to-br from-white to-[#f5f8fb] p-6 shadow-[0_16px_45px_rgba(38,63,87,0.05)] sm:p-7">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#eaf1f6] text-[#263f57]">
                <HeartHandshake size={21} />
              </span>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#263f57]">
                  Our philosophy
                </p>

                <h3 className="mt-1 font-display text-xl font-bold text-[#263f57]">
                  We guide. We commit. We stay with you.
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#6d777c]">
                  WholeLife is built around a continuous relationship rather
                  than isolated appointments.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================================================================
            EXCEPTIONS
        ================================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mt-6 overflow-hidden rounded-[30px] border border-[#263f57]/10 bg-white shadow-[0_18px_55px_rgba(38,63,87,0.06)]"
        >
          <div className="border-b border-[#263f57]/8 bg-[#f7f8fa] px-5 py-6 sm:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#fbebe7] text-[#c87568]">
                  <CircleAlert size={21} />
                </span>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#c87568]">
                    Program conditions
                  </p>

                  <h3 className="mt-1 font-display text-2xl font-bold text-[#263f57] sm:text-3xl">
                    Exceptions
                  </h3>

                  <p className="mt-2 max-w-2xl text-xs leading-5 text-[#7a8388] sm:text-sm">
                    The following conditions are part of the WholeLife program
                    plan and warranty framework.
                  </p>
                </div>
              </div>

              <span className="shrink-0 rounded-full bg-[#263f57] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white">
                {exceptions.length} conditions
              </span>
            </div>
          </div>

          <div className="grid gap-x-8 p-5 sm:grid-cols-2 sm:p-7 lg:grid-cols-3">
            {exceptions.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: Math.min(index * 0.025, 0.25),
                  duration: 0.3,
                }}
                className="flex items-start gap-3 border-b border-[#263f57]/7 py-3 last:border-b-0 sm:nth-[n+14]:border-b-0"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f4f7f9] text-[#55758e]">
                  <CheckCircle2 size={13} />
                </span>

                <p className="text-[12px] leading-5 text-[#59656c]">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Certificate with warranty */}
          <div className="border-t border-[#263f57]/8 bg-[#263f57] px-5 py-5 sm:px-7">
            <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#efc18e]">
                  <Award size={19} />
                </span>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#efc18e]">
                    Certificate
                  </p>

                  <p className="mt-0.5 text-sm font-semibold text-white">
                    Certificate with warranty
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-white/55">
                <ShieldCheck size={15} className="text-[#efc18e]" />
                100% Fee Reimbursement
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================================================================
            FINAL STATEMENT
        ================================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-8 max-w-4xl text-center"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#c87568]/35" />
            <Heart size={16} className="fill-[#c87568]/10 text-[#c87568]" />
            <span className="h-px w-12 bg-[#c87568]/35" />
          </div>

          <p className="mt-4 font-display text-xl font-bold text-[#263f57] sm:text-2xl">
            We guide.
            <span className="text-[#c87568]"> We commit.</span>
            <span className="text-[#557d75]"> We stay with you.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}