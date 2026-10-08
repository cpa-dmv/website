"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Clock3,
  MapPin,
  Users,
  Sparkles,
  ShieldCheck,
  Cpu,
  Workflow,
} from "lucide-react";
import { useState } from "react";

type Position = {
  id: string;
  title: string;
  subtitle: string;
  department: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  qualifications: string[];
  preferredSkills: string[];
  initialProjects: {
    title: string;
    items: string[];
  }[];
  successCriteria: string[];
};

const positions: Position[] = [
  {
    id: "ai-automation-specialist",
    title: "AI & Automation Specialist",
    subtitle: "RPA, Help Desk & Voice Agent",
    department: "Technology / Automation",
    location: "Remote / Hybrid",
    type: "Full-Time / Contract",

    summary:
      "CPA-DMV is seeking an experienced AI & Automation Specialist to design, develop, and implement intelligent automation solutions for business and IT support operations. The role combines Artificial Intelligence, Robotic Process Automation, ticketing automation, and AI voice technology.",

    responsibilities: [
      "Design and implement an intelligent help desk and ticket automation system.",
      "Automatically receive, categorize, prioritize, and route incoming support requests.",
      "Use AI to understand user issues and determine the appropriate response or action.",
      "Automate common Level 1 support requests and repetitive help desk activities.",
      "Create automatic responses for common support questions.",
      "Integrate AI with internal knowledge bases and support documentation.",
      "Automatically create, update, assign, and close tickets where appropriate.",
      "Develop escalation rules for issues requiring Level 2 support or human intervention.",
      "Design and configure an AI-powered voice agent for Level 1 help desk support.",
      "Enable the voice agent to answer incoming calls and interact naturally with users.",
      "Configure the voice agent to understand common technical and support questions.",
      "Create support tickets automatically based on voice conversations.",
      "Capture caller information, issue details, and conversation summaries.",
      "Integrate the AI voice agent with ticketing, CRM, communication, and internal systems.",
      "Configure intelligent call routing and escalation.",
      "Transfer complex, sensitive, or unresolved issues to human support staff.",
      "Identify repetitive manual processes that can be automated.",
      "Design and implement RPA workflows to reduce manual work.",
      "Combine RPA with AI to automate decision-based workflows.",
      "Automate data entry, document processing, system updates, notifications, and task creation.",
      "Develop AI agents capable of completing defined business and support tasks.",
      "Design prompts, workflows, decision logic, confidence thresholds, and guardrails.",
      "Integrate Large Language Models with business applications.",
      "Implement Retrieval-Augmented Generation where appropriate.",
      "Configure AI systems to provide accurate responses based on approved company information.",
      "Test and monitor AI outputs to reduce incorrect or unsupported responses.",
      "Create appropriate confidence thresholds and escalation rules.",
      "Integrate AI and automation solutions through APIs, webhooks, databases, and third-party platforms.",
      "Define clear human escalation and exception-handling processes.",
      "Maintain audit logs for automated activities.",
      "Create documentation, standard operating procedures, troubleshooting guides, and support documentation.",
      "Train employees on newly implemented AI and automation solutions.",
    ],

    qualifications: [
      "Bachelor's degree in Computer Science, Information Technology, Artificial Intelligence, Data Science, Software Engineering, or a related field, or equivalent practical experience.",
      "Hands-on experience with Artificial Intelligence and automation technologies.",
      "Experience implementing Robotic Process Automation.",
      "Experience working with Large Language Models and generative AI.",
      "Experience with AI agents or conversational AI solutions.",
      "Experience integrating applications using APIs and webhooks.",
      "Understanding of databases and system integrations.",
      "Strong troubleshooting and problem-solving skills.",
      "Ability to understand business processes and convert them into automated workflows.",
      "Strong written and verbal communication skills.",
    ],

    preferredSkills: [
      "OpenAI API / Azure OpenAI",
      "Microsoft Azure AI",
      "Python",
      "JavaScript / TypeScript",
      "Microsoft Power Automate",
      "UiPath",
      "Automation Anywhere",
      "n8n",
      "Make",
      "Zapier",
      "Microsoft Power Platform",
      "Twilio",
      "Voice AI platforms",
      "Speech-to-Text technologies",
      "Text-to-Speech technologies",
      "REST APIs",
      "Webhooks",
      "SQL",
      "CRM integrations",
      "Help desk systems",
      "Vector databases",
      "RAG / Knowledge Base solutions",
      "Microsoft 365 integrations",
      "AWS / Azure / Google Cloud",
    ],

    initialProjects: [
      {
        title: "AI Help Desk Ticket Automation",
        items: [
          "Receive support requests.",
          "Understand user issues.",
          "Categorize tickets.",
          "Determine priority.",
          "Provide automated Level 1 responses.",
          "Assign tickets to the appropriate department.",
          "Escalate unresolved issues.",
          "Maintain ticket history and documentation.",
        ],
      },
      {
        title: "AI Voice Agent for Level 1 Support",
        items: [
          "Answer incoming support calls.",
          "Identify the caller's issue.",
          "Provide approved troubleshooting assistance.",
          "Answer common questions.",
          "Create support tickets.",
          "Summarize conversations.",
          "Escalate complex requests.",
          "Transfer users to human support when necessary.",
        ],
      },
      {
        title: "RPA + AI Business Process Automation",
        items: [
          "Identify repetitive internal processes.",
          "Implement automation solutions combining RPA and AI.",
          "Improve speed and accuracy.",
          "Improve operational efficiency.",
        ],
      },
    ],

    successCriteria: [
      "Reduced manual Level 1 help desk workload.",
      "Faster response times.",
      "Improved ticket routing and prioritization.",
      "Successful automation of repetitive processes.",
      "Reliable AI-to-human escalation.",
      "Accurate call and ticket documentation.",
      "Secure handling of confidential information.",
      "Measurable improvements in operational efficiency.",
    ],
  },

  {
    id: "civil-engineer-autocad",
    title: "Civil Engineer",
    subtitle: "AutoCAD",
    department: "Engineering / Design",
    location: "India",
    type: "Full-Time",

    summary:
      "We are looking for a Civil Engineer with strong AutoCAD knowledge and hands-on design experience to support engineering and design projects related to heavy industrial facilities and structures. The ideal candidate should have at least 2 years of relevant experience and be interested in a long-term career commitment with the organization.",

    responsibilities: [
      "Prepare and develop civil and structural drawings using AutoCAD.",
      "Create detailed engineering drawings, layouts, plans, sections, and construction details.",
      "Work on the design and drafting of heavy industrial facilities, plants, foundations, structures, and related civil works.",
      "Review engineering drawings, specifications, and project requirements.",
      "Coordinate with engineers, architects, contractors, and project teams to ensure drawings meet project requirements.",
      "Revise and update drawings based on engineering comments and site or project changes.",
      "Ensure drawings comply with applicable engineering standards, codes, and project specifications.",
      "Support quantity calculations, design documentation, and preparation of construction drawings.",
      "Maintain proper drawing documentation, revisions, and project records.",
      "Assist the engineering team in resolving design and drafting-related issues.",
    ],

    qualifications: [
      "Bachelor's Degree or Diploma in Civil Engineering.",
      "Minimum 2 years of relevant Civil Engineering or design experience.",
      "Strong practical knowledge and experience with AutoCAD.",
      "Experience preparing civil or structural designs and drawings for heavy industrial projects is strongly preferred.",
      "Ability to read and understand engineering drawings, specifications, and technical documents.",
      "Good understanding of civil engineering design and construction practices.",
      "Strong attention to detail and accuracy in preparing drawings.",
      "Good communication, coordination, and problem-solving skills.",
    ],

    preferredSkills: [
      "Heavy industrial buildings and facilities",
      "Manufacturing plants",
      "Industrial foundations",
      "Equipment foundations",
      "Structural layouts",
      "Site development and civil works",
      "Concrete structures",
      "Steel structures",
      "Industrial construction projects",
    ],

    initialProjects: [],

    successCriteria: [
      "Accurate and professionally prepared engineering drawings.",
      "Reliable AutoCAD-based drafting and design support.",
      "Well-maintained drawing revisions and project records.",
      "Effective coordination with engineering and project teams.",
      "Compliance with applicable standards, codes, and project specifications.",
      "Long-term professional growth and contribution to engineering projects.",
    ],
  },
];

function JobCard({
  position,
  onApply,
}: {
  position: Position;
  onApply: (id: string) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-[28px] border border-[#082B5C]/10 bg-white shadow-[0_18px_60px_rgba(8,43,92,0.07)]"
    >
      <div className="h-1 w-full bg-gradient-to-r from-[#082B5C] via-[#1D4E89] to-[#F59E0B]" />

      <div className="p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#082B5C]/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#082B5C]">
                <BriefcaseBusiness size={12} />
                {position.department}
              </span>

              <span className="inline-flex items-center rounded-full bg-[#F59E0B]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#B56B00]">
                Open Position
              </span>
            </div>

            <h3 className="font-display text-2xl font-bold tracking-tight text-[#082B5C] sm:text-3xl">
              {position.title}
            </h3>

            <p className="mt-1 text-sm font-semibold text-[#F59E0B]">
              {position.subtitle}
            </p>

            <p className="mt-4 text-sm leading-7 text-[#66737D] sm:text-[15px]">
              {position.summary}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onApply(position.id)}
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#082B5C] px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(8,43,92,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#0D3D7A]"
          >
            Apply for this position
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>

        <div className="mt-7 flex flex-wrap gap-2 border-t border-[#082B5C]/8 pt-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#F7F8FA] px-3.5 py-2 text-xs font-semibold text-[#52606B]">
            <MapPin size={13} className="text-[#F59E0B]" />
            {position.location}
          </span>

          <span className="inline-flex items-center gap-2 rounded-full bg-[#F7F8FA] px-3.5 py-2 text-xs font-semibold text-[#52606B]">
            <Clock3 size={13} className="text-[#F59E0B]" />
            {position.type}
          </span>
        </div>

        <div className="mt-7 space-y-3">
          <details className="group/details rounded-2xl border border-[#082B5C]/8 bg-[#FAFBFC] p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-[#082B5C]">
              Key responsibilities
              <ChevronDown
                size={17}
                className="transition-transform group-open/details:rotate-180"
              />
            </summary>

            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {position.responsibilities.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm leading-6 text-[#66737D]"
                >
                  <CheckCircle2
                    size={16}
                    className="mt-1 shrink-0 text-[#082B5C]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </details>

          <details className="group/details rounded-2xl border border-[#082B5C]/8 bg-[#FAFBFC] p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-[#082B5C]">
              Required qualifications
              <ChevronDown
                size={17}
                className="transition-transform group-open/details:rotate-180"
              />
            </summary>

            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {position.qualifications.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm leading-6 text-[#66737D]"
                >
                  <CheckCircle2
                    size={16}
                    className="mt-1 shrink-0 text-[#082B5C]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </details>

          {position.preferredSkills.length > 0 && (
            <details className="group/details rounded-2xl border border-[#082B5C]/8 bg-[#FAFBFC] p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-[#082B5C]">
                Preferred experience & technical skills
                <ChevronDown
                  size={17}
                  className="transition-transform group-open/details:rotate-180"
                />
              </summary>

              <div className="mt-5 flex flex-wrap gap-2">
                {position.preferredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-[#082B5C]/8 bg-white px-3 py-2 text-xs font-medium text-[#596873]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </details>
          )}

          {position.initialProjects.length > 0 && (
            <details className="group/details rounded-2xl border border-[#082B5C]/8 bg-[#FAFBFC] p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-[#082B5C]">
                Initial projects
                <ChevronDown
                  size={17}
                  className="transition-transform group-open/details:rotate-180"
                />
              </summary>

              <div className="mt-5 grid gap-5 md:grid-cols-3">
                {position.initialProjects.map((project, index) => (
                  <div
                    key={project.title}
                    className="rounded-2xl border border-[#082B5C]/8 bg-white p-5"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#082B5C]/5 text-xs font-bold text-[#082B5C]">
                      0{index + 1}
                    </div>

                    <h4 className="mt-4 text-sm font-bold leading-5 text-[#082B5C]">
                      {project.title}
                    </h4>

                    <ul className="mt-4 space-y-2.5">
                      {project.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-xs leading-5 text-[#697680]"
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#F59E0B]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </details>
          )}

          <details className="group/details rounded-2xl border border-[#082B5C]/8 bg-[#FAFBFC] p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-[#082B5C]">
              What success looks like
              <ChevronDown
                size={17}
                className="transition-transform group-open/details:rotate-180"
              />
            </summary>

            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {position.successCriteria.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm leading-6 text-[#66737D]"
                >
                  <CheckCircle2
                    size={16}
                    className="mt-1 shrink-0 text-[#F59E0B]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </motion.article>
  );
}

export default function CareersPage() {
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const selectedJob = positions.find(
    (position) => position.id === selectedPosition
  );

  const scrollToApplication = (positionId: string) => {
    setSelectedPosition(positionId);
    setSubmitMessage("");
    setSubmitSuccess(false);

    setTimeout(() => {
      document.getElementById("application")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleApplicationSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!selectedJob) {
      setSubmitSuccess(false);
      setSubmitMessage("Please select a position before applying.");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitSuccess(false);

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);

      const response = await fetch(
        "https://cpa-dmv.com/api/careers-submit.php",
        {
          method: "POST",
          body: formData,
        }
      );

      let result: {
        success?: boolean;
        error?: string;
        applicationId?: string;
      };

      try {
        result = await response.json();
      } catch {
        throw new Error(
          "The server returned an invalid response. Please try again."
        );
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Unable to submit your application."
        );
      }

      setSubmitSuccess(true);

      setSubmitMessage(
        result.applicationId
          ? `Application submitted successfully. Your application ID is ${result.applicationId}.`
          : "Application submitted successfully. Thank you for applying."
      );

      form.reset();
    } catch (error) {
      setSubmitSuccess(false);

      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting your application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F8FA] text-[#263F57]">
      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#041830]">
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#1D4E89]/30 blur-[120px]" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#F59E0B]/10 blur-[120px]" />

        <div className="relative mx-auto max-w-[1180px] px-4 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-28 lg:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F59E0B]">
              <Sparkles size={13} />
              Careers at CPA-DMV
            </div>

            <h1 className="font-display text-[clamp(2.7rem,6vw,5rem)] font-bold leading-[1.02] tracking-[-0.045em] text-white">
              Build meaningful work.
              <span className="block text-[#F59E0B]">
                Grow with us.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
              Join a team working across technology, automation, engineering,
              business operations, and professional services.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#openings"
                className="inline-flex items-center gap-2 rounded-full bg-[#F59E0B] px-6 py-3.5 text-sm font-bold text-[#041830] shadow-lg transition hover:bg-[#FFB62E]"
              >
                Explore Open Roles
                <ArrowRight size={16} />
              </a>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Meet Our Team
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-14 grid max-w-5xl gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3"
          >
            {[
              {
                icon: Users,
                title: "People First",
                text: "Respect, collaboration, and trust.",
              },
              {
                icon: Cpu,
                title: "Technology & Innovation",
                text: "Build practical solutions with modern technology.",
              },
              {
                icon: ShieldCheck,
                title: "Professional Standards",
                text: "Integrity, accountability, and quality.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="bg-white/[0.035] px-5 py-6"
                >
                  <Icon size={20} className="text-[#F59E0B]" />

                  <p className="mt-3 text-sm font-bold text-white">
                    {item.title}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-white/45">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          WHY CPA-DMV
      ========================================================= */}

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F59E0B]">
              Why CPA-DMV
            </p>

            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-[#082B5C] sm:text-4xl">
              Work where your contribution matters.
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-[#6B7680]">
              We value people who can take ownership, solve problems, work
              collaboratively, and turn ideas into meaningful results.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: BriefcaseBusiness,
                title: "Meaningful responsibility",
                text: "Take ownership of work that directly contributes to our clients and organization.",
              },
              {
                icon: Users,
                title: "Collaborative culture",
                text: "Work alongside professionals across technology, operations, engineering, and business.",
              },
              {
                icon: Sparkles,
                title: "Continuous learning",
                text: "Develop your skills through practical experience, new challenges, and modern tools.",
              },
              {
                icon: ShieldCheck,
                title: "Professional standards",
                text: "We value reliability, integrity, communication, confidentiality, and attention to detail.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#082B5C]/8 bg-[#F8F9FA] p-5"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#082B5C]/5 text-[#082B5C]">
                    <Icon size={17} />
                  </div>

                  <h3 className="mt-4 text-sm font-bold text-[#082B5C]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#6B7680]">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          OPEN POSITIONS
      ========================================================= */}

      <section
        id="openings"
        className="scroll-mt-20 border-t border-[#082B5C]/8 bg-[#F7F8FA] py-16 lg:py-24"
      >
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F59E0B]">
              Current opportunities
            </p>

            <h2 className="mt-3 font-display text-3xl font-bold text-[#082B5C] sm:text-4xl">
              Open positions
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#6B7680] sm:text-base">
              Explore our current openings and review the responsibilities,
              qualifications, technical requirements, and expected outcomes
              before applying.
            </p>
          </div>

          <div className="space-y-6">
            {positions.map((position) => (
              <JobCard
                key={position.id}
                position={position}
                onApply={scrollToApplication}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          APPLICATION
      ========================================================= */}

      <section
        id="application"
        className="scroll-mt-20 bg-white py-16 lg:py-24"
      >
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[30px] border border-[#082B5C]/10 bg-white shadow-[0_20px_70px_rgba(8,43,92,0.08)]">
            <div className="bg-[#082B5C] p-7 text-white sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F59E0B]">
                Join CPA-DMV
              </p>

              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                Submit your application
              </h2>

              {selectedJob ? (
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
                    Applying for
                  </p>

                  <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {selectedJob.title}
                      </h3>

                      <p className="mt-1 text-sm text-[#F59E0B]">
                        {selectedJob.subtitle}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPosition("");
                        setSubmitMessage("");
                        setSubmitSuccess(false);
                      }}
                      className="mt-3 text-left text-xs font-semibold text-white/55 underline underline-offset-4 transition hover:text-white sm:mt-0 sm:text-right"
                    >
                      Change position
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-4 max-w-2xl text-sm leading-6 text-white/60">
                  Select a specific open position below to begin your
                  application.
                </p>
              )}
            </div>

            {!selectedJob ? (
              <div className="p-7 sm:p-10">
                <div className="grid gap-4 sm:grid-cols-2">
                  {positions.map((position) => (
                    <button
                      key={position.id}
                      type="button"
                      onClick={() => {
                        setSelectedPosition(position.id);
                        setSubmitMessage("");
                        setSubmitSuccess(false);
                      }}
                      className="group rounded-2xl border border-[#082B5C]/10 bg-[#F8F9FA] p-5 text-left transition hover:-translate-y-0.5 hover:border-[#082B5C]/20 hover:bg-white hover:shadow-[0_12px_30px_rgba(8,43,92,0.07)]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#F59E0B]">
                            {position.department}
                          </p>

                          <h3 className="mt-2 text-lg font-bold text-[#082B5C]">
                            {position.title}
                          </h3>

                          <p className="mt-1 text-xs font-semibold text-[#6B7680]">
                            {position.subtitle}
                          </p>
                        </div>

                        <ArrowRight
                          size={18}
                          className="mt-1 shrink-0 text-[#082B5C] transition-transform group-hover:translate-x-1"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleApplicationSubmit}
                encType="multipart/form-data"
                className="grid gap-5 p-7 sm:grid-cols-2 sm:p-10"
              >
                <input
                  type="hidden"
                  name="position"
                  value={selectedJob.id}
                />

                <input
                  type="hidden"
                  name="positionTitle"
                  value={selectedJob.title}
                />

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#52606B]">
                    Full name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-[#D8DEE5] bg-white px-4 py-3 text-sm text-[#1F2937] outline-none transition focus:border-[#082B5C] focus:ring-2 focus:ring-[#082B5C]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#52606B]">
                    Email address
                  </label>

                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-[#D8DEE5] bg-white px-4 py-3 text-sm text-[#1F2937] outline-none transition focus:border-[#082B5C] focus:ring-2 focus:ring-[#082B5C]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#52606B]">
                    Phone
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full rounded-xl border border-[#D8DEE5] bg-white px-4 py-3 text-sm text-[#1F2937] outline-none transition focus:border-[#082B5C] focus:ring-2 focus:ring-[#082B5C]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#52606B]">
                    LinkedIn URL
                  </label>

                  <input
                    type="url"
                    name="linkedin"
                    placeholder="https://linkedin.com/in/..."
                    className="w-full rounded-xl border border-[#D8DEE5] bg-white px-4 py-3 text-sm text-[#1F2937] outline-none transition focus:border-[#082B5C] focus:ring-2 focus:ring-[#082B5C]/10"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#52606B]">
                    Resume / CV
                  </label>

                  <input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    required
                    className="w-full rounded-xl border border-[#D8DEE5] bg-white px-4 py-2.5 text-sm text-[#52606B] file:mr-4 file:rounded-lg file:border-0 file:bg-[#082B5C] file:px-3 file:py-2 file:text-xs file:font-bold file:text-white"
                  />

                  <p className="mt-2 text-[11px] text-[#8A939A]">
                    PDF, DOC, or DOCX format. Maximum file size: 5 MB.
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#52606B]">
                    Cover letter
                  </label>

                  <textarea
                    name="coverLetter"
                    rows={7}
                    required
                    placeholder={`Tell us about your experience, strengths, and why you are a strong candidate for ${selectedJob.title}.`}
                    className="w-full resize-y rounded-xl border border-[#D8DEE5] bg-white px-4 py-3 text-sm leading-6 text-[#1F2937] outline-none transition focus:border-[#082B5C] focus:ring-2 focus:ring-[#082B5C]/10"
                  />
                </div>

                <div className="sm:col-span-2 rounded-2xl border border-[#082B5C]/8 bg-[#F8F9FA] p-5">
                  <div className="flex gap-3">
                    <ShieldCheck
                      size={20}
                      className="mt-0.5 shrink-0 text-[#082B5C]"
                    />

                    <div>
                      <p className="text-sm font-bold text-[#082B5C]">
                        Application confidentiality
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#6B7680]">
                        Your application and supporting documents will be
                        reviewed only for recruitment and evaluation purposes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#082B5C] px-7 py-4 text-sm font-bold text-white shadow-[0_12px_30px_rgba(8,43,92,0.18)] transition hover:bg-[#0D3D7A] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting
                      ? "Submitting application..."
                      : "Submit Application"}

                    {!isSubmitting && (
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    )}
                  </button>

                  {submitMessage && (
                    <div
                      className={`mt-4 rounded-xl border px-4 py-4 text-sm leading-6 ${
                        submitSuccess
                          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                          : "border-red-200 bg-red-50 text-red-700"
                      }`}
                    >
                      {submitMessage}
                    </div>
                  )}

                  <p className="mt-3 text-center text-[11px] leading-5 text-[#8A939A]">
                    By submitting this application, you confirm that the
                    information provided is accurate to the best of your
                    knowledge.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <section className="bg-[#041830] py-14">
        <div className="mx-auto flex max-w-[900px] flex-col items-center px-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-[#F59E0B]">
            <Workflow size={22} />
          </div>

          <h2 className="mt-5 font-display text-2xl font-bold text-white sm:text-3xl">
            Ready to build something meaningful?
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/50">
            Explore our current opportunities and find the position that
            matches your experience and ambitions.
          </p>

          <a
            href="#openings"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F59E0B] px-6 py-3.5 text-sm font-bold text-[#041830] transition hover:bg-[#FFB62E]"
          >
            View Open Positions
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </main>
  );
}