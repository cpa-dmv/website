
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  BriefcaseBusiness,
  HeartHandshake,
  MonitorCog,
  Scale,
  Stethoscope,
  Target,
  UserRound,
} from "lucide-react";

const team = [
  {
    name: "Sachit Garg",
    role: "Director of Operations",
    credential: "Operations",
    group: "Program delivery",
    icon: HeartHandshake,
    photo: "/images/sachit.png",
    accent: "#687b98",
    tint: "#e9edf3",
    points: [
      "Program coordination and delivery",
      "Operational planning and workflows",
      "Cross-functional team coordination",
    ],
  },
  {
    name: "Dipika Jain",
    role: "Certified Divorce Mediator",
    credential: "Mediation",
    group: "Conflict resolution",
    icon: Scale,
    photo: "/images/dipika-ji.png",
    accent: "#b67278",
    tint: "#f6e8eb",
    points: [
      "Conflict resolution and mediation",
      "Facilitating constructive discussions",
      "Exploring practical agreements",
    ],
  },
  {
    name: "Sarif Malik",
    role: "Senior Manager",
    credential: "Project Management",
    group: "Senior management",
    icon: Target,
    photo: "/images/sarif.png",
    accent: "#5b6fa6",
    tint: "#eef1f8",
    points: [
      "Project coordination and execution",
      "Team and stakeholder communication",
      "Tracking deliverables and progress",
    ],
  },
  {
    name: "Himanshu Kalra",
    role: "Certified Public Accountant",
    credential: "CPA",
    group: "Financial strategy",
    icon: BriefcaseBusiness,
    photo: "/images/himanshu-kalra.png",
    accent: "#b3874d",
    tint: "#f5eee3",
    points: [
      "Accounting and financial reporting",
      "Financial planning and analysis",
      "Supporting informed financial decisions",
    ],
  },
  {
    name: "Tushita Bhandari",
    role: "Research & Human Development",
    credential: "PhD",
    group: "Life guidance",
    icon: Stethoscope,
    photo: "/images/tushita-bhandari.jpg",
    accent: "#66897f",
    tint: "#e7f0ed",
    points: [
      "Research and information synthesis",
      "Human development initiatives",
      "Learning and research resources",
    ],
  },
  {
    name: "Vardan Kadyan",
    role: "IT Analyst",
    credential: "Technology",
    group: "Web development & AI",
    icon: MonitorCog,
    photo: "/images/vardan.png",
    accent: "#2563eb",
    tint: "#eff6ff",
    points: [
      "Website and application support",
      "Data analysis and technical troubleshooting",
      "Web development and business operations",
    ],
  },
  {
    name: "Sahil Singh",
    role: "Technical Help Desk",
    credential: "Technology",
    group: "Client support",
    icon: MonitorCog,
    photo: "/images/sahil-singh.png",
    accent: "#56889a",
    tint: "#e7f0f3",
    points: [
      "Technical troubleshooting",
      "User support and issue resolution",
      "Reliable IT operations support",
    ],
  },
  {
    name: "Abhimanyu Mishra",
    role: "Senior IT Recruiter",
    credential: "Recruitment",
    group: "Talent acquisition",
    icon: UserRound,
    photo: "/images/abhimanyu.png",
    accent: "#5b6fa6",
    tint: "#eef1f8",
    points: [
      "IT talent sourcing",
      "Candidate screening and coordination",
      "Recruitment pipeline management",
    ],
  },
];

export default function WholeLifeTeam() {
  return (
    <section className="relative overflow-hidden border-t border-[#263f57]/7 bg-[#f7f5f1] py-14 lg:py-18">
      <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#f2d9d1]/50 blur-[115px]" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#d7e7e2]/65 blur-[115px]" />

      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-display text-[clamp(2.15rem,3.6vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[#263f57]">
            Your life is connected.
            <span className="block text-[#c87568]">
              So is the expertise behind you.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#6d777c] sm:text-base">
            Financial, relational, operational, and human guidance come
            together around one shared understanding of your goals.
          </p>
        </motion.div>

        {/* Team profiles */}
        <div className="mt-9 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map(
            (
              {
                name,
                role,
                credential,
                group,
                icon: Icon,
                photo,
                accent,
                tint,
                points,
              },
              index
            ) => (
              <motion.article
                key={name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  delay: (index % 3) * 0.07,
                  duration: 0.45,
                }}
                whileHover={{ y: -3 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-[#263f57]/8 bg-white p-4 shadow-[0_10px_30px_rgba(38,63,87,0.055)] transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(38,63,87,0.10)] sm:p-5"
              >
                <span
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ backgroundColor: accent }}
                />

                <div className="flex items-center gap-3">
                  <div
                    className="relative h-[100px] w-[88px] shrink-0 overflow-hidden rounded-2xl"
                    style={{
                      background: `linear-gradient(145deg, ${tint}, #f7f8f7)`,
                    }}
                  >
                    <Image
                      src={photo}
                      alt={`${name} — ${role}`}
                      fill
                      sizes="(max-width: 640px) 88px, 100px"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center gap-1.5">
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                        style={{
                          color: accent,
                          backgroundColor: tint,
                        }}
                      >
                        <Icon size={14} />
                      </span>

                      <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#8a9194]">
                        {group}
                      </span>
                    </div>

                    <h3 className="font-display text-base font-bold leading-tight text-[#263f57] sm:text-lg">
                      {name}
                    </h3>

                    <p className="mt-1 text-[11px] leading-4 text-[#707b81]">
                      {role}
                    </p>

                    <span className="mt-2 inline-flex max-w-full items-center gap-1 rounded-full border border-[#263f57]/7 bg-[#f8f7f4] px-2 py-1 text-[8px] font-bold uppercase tracking-[0.08em] text-[#5f707b]">
                      <BadgeCheck
                        size={10}
                        className="shrink-0"
                        style={{ color: accent }}
                      />
                      <span className="truncate">{credential}</span>
                    </span>
                  </div>
                </div>

                <div className="my-4 h-px bg-[#263f57]/8" />

                <ul className="flex-1 space-y-2.5 text-[12px] leading-[1.5] text-[#526674] sm:text-[13px]">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span
                        className="mt-[3px] shrink-0 text-[11px] font-bold"
                        style={{ color: accent }}
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            )
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.55 }}
          className="mx-auto mt-7 flex max-w-3xl items-center justify-center gap-3 text-center"
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#c87568]/45" />

          <p className="font-display text-sm font-semibold italic text-[#526674] sm:text-base">
            Different disciplines. One continuous conversation about your life.
          </p>

          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#c87568]/45" />
        </motion.div>
      </div>
    </section>
  );
}
