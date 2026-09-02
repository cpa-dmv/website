"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Accessibility, Brain, ExternalLink, Footprints, HeartPulse, Home, Landmark, MessageCircleHeart, ShieldCheck, Sparkles, UsersRound, WalletCards } from "lucide-react";

const ages = [
  { age: "45", label: "Build the plan", color: "#c87568" },
  { age: "65", label: "Protect independence", color: "#d5a457" },
  { age: "75", label: "Adapt with confidence", color: "#66897f" },
  { age: "85+", label: "Preserve care & dignity", color: "#687b98" },
];

const conversations = [
  { question: "Where will you feel at home?", detail: "Think ahead about accessibility, community, transportation, and whether the home can adapt as needs change.", icon: Home, color: "#c87568", tint: "#fbebe7" },
  { question: "Who forms your circle of care?", detail: "Clarify family roles, professional support, trusted contacts, and how caregiving responsibility will be shared.", icon: UsersRound, color: "#66897f", tint: "#eaf2ef" },
  { question: "How will independence be funded?", detail: "Coordinate retirement income, healthcare costs, insurance, emergency liquidity, and possible long-term support.", icon: Landmark, color: "#a77a3d", tint: "#f7f0e3" },
  { question: "Who can act when you cannot?", detail: "Put trusted decision-makers, medical wishes, estate documents, and financial safeguards in place early.", icon: ShieldCheck, color: "#68729a", tint: "#eeeef6" },
  { question: "What keeps life meaningful?", detail: "Protect friendship, movement, purpose, curiosity, and the routines that make each stage worth living.", icon: MessageCircleHeart, color: "#b96578", tint: "#f8eaf0" },
];

const evidence = [
  {
    value: "70%",
    context: "of adults who survive to 65 develop severe long-term support needs during their lifetime.",
    source: "HHS / ASPE",
    year: "2019 brief",
    url: "https://aspe.hhs.gov/reports/what-lifetime-risk-needing-receiving-long-term-services-supports",
    color: "#c87568",
  },
  {
    value: "14M+",
    context: "older adults report a fall each year—approximately one in four people age 65+.",
    source: "CDC",
    year: "Updated 2026",
    url: "https://www.cdc.gov/falls/data-research/index.html",
    color: "#d29c47",
  },
  {
    value: "6.9M",
    context: "Americans age 65+ are estimated to live with dementia—about one in nine.",
    source: "CDC",
    year: "2024 estimate",
    url: "https://www.cdc.gov/alzheimers-dementia/signs-symptoms/index.html",
    color: "#68729a",
  },
  {
    value: "$29,740",
    context: "was the median personal income of older Americans in 2022.",
    source: "ACL",
    year: "2023 profile",
    url: "https://acl.gov/sites/default/files/Profile%20of%20OA/ACL_ProfileOlderAmericans2023_508.pdf",
    color: "#66897f",
  },
];

const evidenceCategories = [
  {
    label: "Care needs",
    icon: HeartPulse,
    color: "#c87568",
    sources: [{ label: "HHS / ASPE", url: "https://aspe.hhs.gov/reports/what-lifetime-risk-needing-receiving-long-term-services-supports" }],
    stats: [
      { value: "70%", label: "develop severe long-term support needs after surviving to 65" },
      { value: "48%", label: "receive some paid long-term support during their lifetime" },
      { value: "78% vs 65%", label: "women versus men develop severe needs after ages 70–79" },
    ],
  },
  {
    label: "Living & finances",
    icon: WalletCards,
    color: "#a77a3d",
    sources: [{ label: "ACL 2023 Profile", url: "https://acl.gov/aging-and-disability-in-america/data-and-research/profile-older-americans" }],
    stats: [
      { value: "28%", label: "of community-dwelling older adults lived alone" },
      { value: "42%", label: "of women age 75+ lived alone" },
      { value: "29%", label: "of older women were widowed—about 9 million women" },
      { value: "68% / 47%", label: "older men versus older women were married" },
      { value: "$29,740", label: "median personal income among older Americans in 2022" },
      { value: "10.2% + 4.7%", label: "below poverty plus classified as near-poor" },
    ],
  },
  {
    label: "Cognition & disability",
    icon: Accessibility,
    color: "#68729a",
    sources: [
      { label: "CDC Dementia", url: "https://www.cdc.gov/alzheimers-dementia/signs-symptoms/index.html" },
      { label: "Census 2023 ACS", url: "https://data.census.gov/table/ACSDT1Y2023.B18108" },
    ],
    stats: [
      { value: "13.5M", label: "Americans age 65+ reported a disability—approximately 23%" },
      { value: "6.9M", label: "Americans age 65+ are estimated to live with dementia" },
      { value: "1 in 9", label: "older Americans are estimated to be living with dementia" },
      { value: "1.7 → 13.1%", label: "diagnosed dementia rises from ages 65–74 to age 85+" },
    ],
  },
  {
    label: "Falls & mobility",
    icon: Footprints,
    color: "#557d75",
    sources: [
      { label: "CDC Falls Data", url: "https://www.cdc.gov/falls/data-research/index.html" },
      { label: "CDC Falls Facts", url: "https://www.cdc.gov/falls/data-research/facts-stats/index.html" },
    ],
    stats: [
      { value: "14M+", label: "older adults report falling each year—more than one in four" },
      { value: "1M", label: "fall-related hospitalizations occur among older adults annually" },
      { value: "319K", label: "older adults are hospitalized for hip fractures each year" },
      { value: "78.4 / 100K", label: "the age-65+ fall death rate reported for 2024" },
    ],
  },
];

export default function WholeLifeLongevity() {
  const [activeCategory, setActiveCategory] = useState(0);
  const selectedCategory = evidenceCategories[activeCategory];

  return (
    <section className="relative overflow-hidden border-t border-[#263f57]/7 bg-[#f4f7f6] py-16 lg:py-24">
      <div className="absolute -left-36 top-10 h-80 w-80 rounded-full bg-[#f1d9ce]/35 blur-[110px]" />
      <div className="absolute -right-36 bottom-0 h-96 w-96 rounded-full bg-[#d9e8e3]/55 blur-[120px]" />

      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.55 }} className="mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#66897f]/15 bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.19em] text-[#557d75] shadow-sm"><HeartPulse size={14} />Longevity with intention</div>
          <h2 className="font-display text-[clamp(2.15rem,3.8vw,3.7rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[#263f57]">A longer life deserves a <span className="text-[#c87568]">stronger plan.</span></h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#6d777c]">Aging brings real changes, but preparation can preserve independence, reduce family uncertainty, and keep more choices in your hands.</p>
        </motion.div>

        <div className="mx-auto mt-9 grid max-w-6xl overflow-hidden rounded-[24px] border border-[#263f57]/8 bg-white shadow-[0_14px_40px_rgba(38,63,87,0.06)] sm:grid-cols-2 lg:grid-cols-4">
          {evidence.map(({ value, context, source, year, url, color }, index) => (
            <motion.article
              key={value}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="group relative border-b border-[#263f57]/7 p-5 last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <span className="absolute inset-x-5 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: color }} />
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-display text-[clamp(2rem,3.2vw,2.85rem)] font-bold leading-none tracking-[-0.04em]" style={{ color }}>{value}</p>
                <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#aaa49d]">{year}</span>
              </div>
              <p className="mt-3 min-h-[54px] text-[11px] leading-[18px] text-[#6e797f]">{context}</p>
              <a href={url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#263f57]/45 transition-colors hover:text-[#263f57]">
                {source}<ExternalLink size={10} />
              </a>
            </motion.article>
          ))}
        </div>

        <div className="mx-auto mt-5 max-w-6xl overflow-hidden rounded-[26px] border border-[#263f57]/8 bg-white shadow-[0_14px_40px_rgba(38,63,87,0.055)]">
          <div className="flex flex-col gap-4 border-b border-[#263f57]/7 bg-[#faf8f4] px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#a66f4e]">The complete evidence picture</p>
              <p className="mt-0.5 text-sm font-semibold text-[#344b5d]">Choose a category to explore the remaining figures.</p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {evidenceCategories.map(({ label, icon: Icon, color }, index) => {
                const isActive = index === activeCategory;
                return (
                  <button key={label} type="button" onClick={() => setActiveCategory(index)} aria-pressed={isActive} className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-[10px] font-bold transition-all ${isActive ? "border-[#263f57] bg-[#263f57] text-white shadow-sm" : "border-[#263f57]/8 bg-white text-[#68757c] hover:border-[#263f57]/16"}`}>
                    <Icon size={14} style={!isActive ? { color } : undefined} />{label}
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={selectedCategory.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.28 }} className="p-4 sm:p-5">
              <div className={`grid gap-3 ${selectedCategory.stats.length > 4 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
                {selectedCategory.stats.map(({ value, label }, index) => (
                  <motion.div key={`${selectedCategory.label}-${value}`} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05, duration: 0.3 }} className="rounded-2xl border border-[#263f57]/7 bg-[#fcfbf9] p-4">
                    <p className="font-display text-[clamp(1.55rem,2.5vw,2.2rem)] font-bold leading-none tracking-[-0.035em]" style={{ color: selectedCategory.color }}>{value}</p>
                    <p className="mt-2 text-[10px] leading-[17px] text-[#707b81]">{label}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#263f57]/35">Sources:</span>
                {selectedCategory.sources.map((source) => (
                  <a key={source.label} href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#263f57]/45 transition-colors hover:text-[#263f57]">
                    {source.label}<ExternalLink size={10} />
                  </a>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-5 grid items-start gap-4 lg:grid-cols-[0.84fr_1.16fr]">
          <motion.div initial={{ opacity: 0, x: -22 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="relative overflow-hidden rounded-[24px] bg-[#041830] p-5 shadow-[0_18px_45px_rgba(4,24,48,0.18)] sm:p-6">
            <div className="absolute inset-0 opacity-[0.045] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:25px_25px]" />
            <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-[#66897f]/20 blur-[75px]" />
            <div className="relative">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#efc18e]">Your future runway</p>
              <h3 className="mt-1.5 font-display text-2xl font-bold text-white">Plan before choices narrow.</h3>
              <p className="mt-2 text-xs leading-5 text-white/52">Discuss support, housing, and decisions while everyone can participate calmly.</p>

              <div className="relative mt-4 pl-1">
                <motion.div className="absolute bottom-4 left-[22px] top-4 w-px origin-top bg-gradient-to-b from-[#c87568] via-[#d5a457] to-[#687b98]" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 1.15, ease: "easeOut" }} />
                <div className="space-y-2.5">
                  {ages.map(({ age, label, color }, index) => (
                    <motion.div key={age} initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.18 + index * 0.13, duration: 0.45 }} className="relative flex items-center gap-4">
                      <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[3px] border-[#041830] bg-white font-display text-xs font-bold" style={{ color }}>{age}</span>
                      <div className="flex-1 rounded-xl border border-white/8 bg-white/[0.055] px-3.5 py-2.5"><p className="text-[11px] font-bold text-white/82">{label}</p></div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-[#efc18e]/18 bg-[#efc18e]/8 px-3.5 py-3"><Brain size={16} className="shrink-0 text-[#efc18e]" /><p className="text-[10px] leading-4 text-white/62">Planning preserves dignity, clarity, and options.</p></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 22 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6 }} className="rounded-[24px] border border-[#263f57]/8 bg-white p-5 shadow-[0_14px_35px_rgba(38,63,87,0.055)] sm:p-6">
            <div className="flex items-end justify-between gap-4 border-b border-[#263f57]/7 pb-3">
              <div><p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#a66f4e]">Five conversations</p><h3 className="mt-1 font-display text-xl font-bold text-[#263f57] sm:text-2xl">Start while the future is flexible.</h3></div>
              <Sparkles size={19} className="mb-1 shrink-0 text-[#d4a15f]" />
            </div>
            <div className="mt-2 divide-y divide-[#263f57]/7">
              {conversations.map(({ question, detail, icon: Icon, color, tint }, index) => (
                <motion.div key={question} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07, duration: 0.4 }} className="group flex gap-3 py-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-105" style={{ color, backgroundColor: tint }}><Icon size={15} /></span>
                  <div><h4 className="text-xs font-bold text-[#344b5d]">{question}</h4><p className="mt-0.5 text-[10px] leading-[15px] text-[#7a8388]">{detail}</p></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
