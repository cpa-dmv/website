"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  UserPlus,
  BriefcaseBusiness,
  Cpu,
  BarChart3,
  Headphones,
  ShieldCheck,
  Zap,
  Target,
  Search,
  Handshake,
  Building2,
  Clock3,
  Sparkles,
} from "lucide-react";

const roles = [
  {
    icon: Cpu,
    title: "Technology & IT",
    text: "Technology professionals who help organizations build, maintain, and improve their digital systems.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Finance & Accounting",
    text: "Accounting, finance, bookkeeping, and reporting professionals aligned with your operational needs.",
  },
  {
    icon: BarChart3,
    title: "Data & Analytics",
    text: "Data professionals supporting reporting, analysis, dashboards, automation, and business intelligence.",
  },
  {
    icon: Building2,
    title: "Engineering & Design",
    text: "Engineering and design professionals available for project-based and long-term requirements.",
  },
  {
    icon: Headphones,
    title: "Operations & Support",
    text: "Reliable administrative, customer support, and operational talent to strengthen your team.",
  },
  {
    icon: Users,
    title: "Specialized Professionals",
    text: "Qualified professionals sourced around your specific skill, experience, and project requirements.",
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Faster Talent Deployment",
    text: "Add qualified professionals to your team without waiting through lengthy traditional hiring cycles.",
  },
  {
    icon: Target,
    title: "Right-Fit Expertise",
    text: "We focus on matching professionals to the specific skills, experience, and responsibilities your project requires.",
  },
  {
    icon: Users,
    title: "Flexible Workforce",
    text: "Scale your workforce up or down as projects, workloads, and business priorities change.",
  },
  {
    icon: ShieldCheck,
    title: "Reduced Hiring Overhead",
    text: "Expand your capabilities while reducing the administrative burden associated with permanent hiring.",
  },
];

const process = [
  {
    number: "01",
    icon: Search,
    title: "Understand Your Requirement",
    text: "We begin by understanding your business, project objectives, required skills, timeline, and engagement model.",
  },
  {
    number: "02",
    icon: Users,
    title: "Source & Screen",
    text: "Our team identifies qualified professionals and evaluates their experience against your specific requirements.",
  },
  {
    number: "03",
    icon: Handshake,
    title: "Present Qualified Talent",
    text: "You receive a focused selection of professionals who align with the role and your organization's needs.",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Onboard & Support",
    text: "Once selected, we support the onboarding process and remain available throughout the engagement.",
  },
];

const engagementModels = [
  "Short-term project support",
  "Long-term staff augmentation",
  "Specialized skill requirements",
  "Team expansion",
  "Peak workload support",
  "Project-based staffing",
];

export default function StaffAugmentationPage() {
  return (
    <main className="min-h-screen bg-[#F7F9FC] text-[#082B5C]">

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-[-180px] top-[-120px] h-[420px] w-[420px] rounded-full bg-[#EAF2FF] blur-3xl" />
          <div className="absolute right-[-160px] top-[80px] h-[420px] w-[420px] rounded-full bg-[#FFF4D8] blur-3xl" />
          <div className="absolute left-1/2 top-[35%] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-white blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-[#E6A817]" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C68A00]">
                  Staff Augmentation
                </span>
              </div>

              <h1 className="max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-[#082B5C] sm:text-5xl lg:text-6xl">
                The right people.
                <br />
                <span className="text-[#D99800]">
                  When you need them.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5B6678] sm:text-xl">
                Build a stronger, more flexible workforce with qualified
                professionals who can integrate directly into your team,
                projects, and business operations.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#082B5C] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#082B5C]/15 transition-all hover:-translate-y-0.5 hover:bg-[#0D3D7A]"
                >
                  Schedule a Free Consultation
                  <ArrowRight size={17} />
                </Link>

                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-full border border-[#082B5C]/15 bg-white px-7 py-3.5 text-sm font-semibold text-[#082B5C] transition-colors hover:bg-[#F1F5FA]"
                >
                  How It Works
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-[#657184]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-[#D99800]" />
                  Flexible staffing
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-[#D99800]" />
                  Qualified professionals
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-[#D99800]" />
                  Scalable support
                </div>
              </div>
            </motion.div>

            {/* Right visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-[#082B5C]/10 bg-[#082B5C] p-6 shadow-2xl shadow-[#082B5C]/20 sm:p-8">

                <div className="absolute right-[-70px] top-[-70px] h-52 w-52 rounded-full border border-white/10" />
                <div className="absolute bottom-[-90px] left-[-70px] h-64 w-64 rounded-full border border-[#E6A817]/20" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#E6A817]">
                        Your Team
                      </p>

                      <h2 className="mt-2 text-2xl font-bold text-white">
                        Built around your needs
                      </h2>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                      <UserPlus className="text-[#E6A817]" size={24} />
                    </div>
                  </div>

                  <div className="mt-8 space-y-3">
                    {[
                      ["Technology", "IT & Automation"],
                      ["Finance", "Accounting & Reporting"],
                      ["Analytics", "Data & BI"],
                      ["Operations", "Support & Administration"],
                    ].map(([title, subtitle], index) => (
                      <motion.div
                        key={title}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.45,
                          delay: 0.35 + index * 0.1,
                        }}
                        className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.07] p-4"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E6A817]/15">
                          <CheckCircle2
                            size={19}
                            className="text-[#E6A817]"
                          />
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            {title}
                          </p>
                          <p className="mt-0.5 text-xs text-white/55">
                            {subtitle}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-7 rounded-2xl border border-[#E6A817]/20 bg-[#E6A817]/10 p-4">
                    <div className="flex items-center gap-3">
                      <Sparkles size={18} className="text-[#E6A817]" />
                      <p className="text-sm font-medium text-white">
                        Flexible talent. Focused execution.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="border-y border-[#082B5C]/6 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF2FF]">
            <Users size={27} className="text-[#082B5C]" />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-[#C68A00]">
            Workforce flexibility
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#082B5C] sm:text-4xl">
            Extend your team without slowing down.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#647084] sm:text-lg">
            Staff augmentation gives organizations access to skilled
            professionals without requiring every business need to become a
            permanent full-time hire. Whether you need additional capacity,
            specialized expertise, or support for a specific project, we help
            connect you with talent that can work alongside your existing
            team.
          </p>
        </div>
      </section>

      {/* Roles */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute right-[-150px] top-[10%] h-80 w-80 rounded-full bg-[#EAF2FF] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#E6A817]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C68A00]">
                Talent capabilities
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#082B5C] sm:text-4xl">
              Professionals for the work that matters.
            </h2>

            <p className="mt-4 text-base leading-7 text-[#657184]">
              We can help strengthen your workforce across technology,
              finance, operations, analytics, engineering, and other
              specialized functions.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((role, index) => {
              const Icon = role.icon;

              return (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="group rounded-3xl border border-[#082B5C]/8 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl hover:shadow-[#082B5C]/8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF2FF] transition-colors group-hover:bg-[#082B5C]">
                      <Icon
                        size={22}
                        className="text-[#082B5C] transition-colors group-hover:text-white"
                      />
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4F6F9] transition-colors group-hover:bg-[#EAF2FF]">
                      <ArrowRight size={15} />
                    </div>
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-[#082B5C]">
                    {role.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#697586]">
                    {role.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[#082B5C] py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">

            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#E6A817]" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E6A817]">
                  Why staff augmentation
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                More capability.
                <br />
                Less hiring friction.
              </h2>

              <p className="mt-5 max-w-lg text-base leading-7 text-white/65">
                Grow your capabilities while keeping your workforce flexible.
                Our staffing approach is designed around your business
                requirements rather than a one-size-fits-all hiring model.
              </p>

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#E6A817] px-6 py-3 text-sm font-bold text-[#082B5C] transition-colors hover:bg-[#F1BE42]"
              >
                Discuss Your Staffing Needs
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;

                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    className="rounded-3xl border border-white/10 bg-white/[0.06] p-6"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E6A817]/15">
                      <Icon size={21} className="text-[#E6A817]" />
                    </div>

                    <h3 className="mt-5 font-bold text-white">
                      {benefit.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/55">
                      {benefit.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* Engagement models */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#E6A817]" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C68A00]">
                  Flexible engagement
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#082B5C] sm:text-4xl">
                Staffing that adapts to your business.
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-[#657184]">
                Your workforce needs can change quickly. Our approach allows
                you to access additional expertise when you need it, without
                committing your organization to a rigid staffing structure.
              </p>

              <div className="mt-8 space-y-3">
                {engagementModels.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm font-medium text-[#374151]"
                  >
                    <CheckCircle2
                      size={18}
                      className="shrink-0 text-[#D99800]"
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-[#F3F6FA] p-7 sm:p-9">
              <div className="rounded-3xl bg-white p-7 shadow-sm sm:p-9">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF2FF]">
                  <Clock3 size={23} className="text-[#082B5C]" />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-[#082B5C]">
                  Need talent quickly?
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#687486]">
                  Tell us what you're looking for, the skills you need, and
                  how your team operates. We'll help identify an engagement
                  approach that fits your requirements.
                </p>

                <Link
                  href="/contact"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#082B5C] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0D3D7A]"
                >
                  Start a Conversation
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Process */}
      <section
        id="how-it-works"
        className="relative overflow-hidden bg-[#F7F9FC] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[#E6A817]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C68A00]">
                Our process
              </span>
              <span className="h-px w-10 bg-[#E6A817]" />
            </div>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#082B5C] sm:text-4xl">
              A straightforward path to the right talent.
            </h2>

            <p className="mt-4 text-base leading-7 text-[#657184]">
              From your first conversation to onboarding, we keep the process
              focused, transparent, and aligned with your goals.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="relative rounded-3xl border border-[#082B5C]/8 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#082B5C]">
                      <Icon size={20} className="text-white" />
                    </div>

                    <span className="text-3xl font-bold text-[#E7ECF3]">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-6 font-bold text-[#082B5C]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#697586]">
                    {step.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#082B5C] px-7 py-14 text-center shadow-2xl shadow-[#082B5C]/15 sm:px-12 sm:py-16">

            <div className="absolute left-[-80px] top-[-100px] h-64 w-64 rounded-full border border-white/10" />
            <div className="absolute right-[-80px] bottom-[-120px] h-72 w-72 rounded-full border border-[#E6A817]/20" />

            <div className="relative">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E6A817]/15">
                <UserPlus size={23} className="text-[#E6A817]" />
              </div>

              <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-[#E6A817]">
                Let's build your team
              </p>

              <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to add the right talent to your team?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/60">
                Tell us about your staffing requirements and let's explore how
                flexible talent can support your next stage of growth.
              </p>

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#E6A817] px-7 py-3.5 text-sm font-bold text-[#082B5C] transition-all hover:-translate-y-0.5 hover:bg-[#F1BE42]"
              >
                Schedule a Free Consultation
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}