"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  BriefcaseBusiness,
  HeartHandshake,
  MonitorCog,
  Scale,
  Sparkles,
  Stethoscope,
  TrendingUp,
  UserRound,
} from "lucide-react";

const team = [
  {
    name: "Praveen Singhal",
    role: "Certified Divorce Financial Analyst",
    credential: "CDFA®",
    group: "Financial clarity",
    icon: TrendingUp,
    photo: "/images/praveen-singhal.png",
    accent: "#c87568",
    tint: "#f7e8e3",
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
  },
  {
    name: "Tushita Bhandari",
    role: "Research & Human Development",
    credential: "PhD",
    group: "Life guidance",
    icon: Stethoscope,
    photo: null,
    accent: "#66897f",
    tint: "#e7f0ed",
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
  },
  {
    name: "Sachit Garg",
    role: "Director of Operations",
    credential: "Operations",
    group: "Program delivery",
    icon: HeartHandshake,
    photo: "/images/sachit.png",
    accent: "#687b98",
    tint: "#e9edf3",
  },
  // {
  //   name: "Vikram Pratap",
  //   role: "Marketing & Community",
  //   credential: "Marketing",
  //   group: "Community growth",
  //   icon: Megaphone,
  //   photo: null,
  //   accent: "#8b78a0",
  //   tint: "#eeeaf2",
  // },
  {
    name: "Sahil Singh",
    role: "Technical Help Desk",
    credential: "Technology",
    group: "Client support",
    icon: MonitorCog,
    photo: "/images/sahil-singh.png",
    accent: "#56889a",
    tint: "#e7f0f3",
  },
];

export default function WholeLifeTeam() {
  return (
    <section className="relative overflow-hidden border-t border-[#263f57]/7 bg-[#f7f5f1] py-16 lg:py-20">
      <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#f2d9d1]/50 blur-[115px]" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#d7e7e2]/65 blur-[115px]" />

      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#66897f]/15 bg-white/75 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.19em] text-[#557d75] shadow-sm">
            <Sparkles size={14} /> Six perspectives · one team
          </div>
          <h2 className="font-display text-[clamp(2.15rem,3.6vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[#263f57]">
            Your life is connected.
            <span className="block text-[#c87568]">So is the expertise behind you.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#6d777c] sm:text-base">
            Financial, relational, operational, and human guidance come together around one shared understanding of your goals.
          </p>
        </motion.div>

        <div className="mt-9 grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {team.map(({ name, role, credential, group, icon: Icon, photo, accent, tint }, index) => {
            const initials = name.split(" ").map((part) => part[0]).join("").slice(0, 2);

            return (
              <motion.article
                key={name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.055, duration: 0.45 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-[22px] border border-[#263f57]/8 bg-white p-3 shadow-[0_10px_30px_rgba(38,63,87,0.055)]"
              >
                <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: accent }} />

                <div className="flex items-center gap-3">
                  <div className="relative flex h-[112px] w-[98px] shrink-0 items-center justify-center overflow-hidden rounded-2xl" style={{ background: `linear-gradient(145deg, ${tint}, #f7f8f7)` }}>
                    {photo ? (
                      <Image
                        src={photo}
                        alt={`${name} — ${role}`}
                        fill
                        sizes="98px"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:13px_13px]" />
                        <UserRound size={41} strokeWidth={1.25} style={{ color: accent }} />
                        <span className="absolute bottom-2 rounded-full border border-white/70 bg-white/75 px-2 py-0.5 text-[8px] font-bold tracking-[0.12em] backdrop-blur-sm" style={{ color: accent }}>{initials}</span>
                      </>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center gap-1.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ color: accent, backgroundColor: tint }}><Icon size={14} /></span>
                      <span className="truncate text-[8px] font-bold uppercase tracking-[0.13em] text-[#8a9194]">{group}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold leading-tight text-[#263f57]">{name}</h3>
                    <p className="mt-1 text-[10px] leading-4 text-[#707b81]">{role}</p>
                    <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-[#263f57]/7 bg-[#f8f7f4] px-2 py-1 text-[8px] font-bold uppercase tracking-[0.1em] text-[#5f707b]"><BadgeCheck size={10} style={{ color: accent }} />{credential}</span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.35, duration: 0.55 }} className="mx-auto mt-6 flex max-w-3xl items-center justify-center gap-3 text-center">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#c87568]/45" />
          <p className="font-display text-sm font-semibold italic text-[#526674] sm:text-base">Different disciplines. One continuous conversation about your life.</p>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#c87568]/45" />
        </motion.div>
      </div>
    </section>
  );
}
