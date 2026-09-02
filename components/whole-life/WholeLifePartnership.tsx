"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, HeartHandshake, Search, Sparkles } from "lucide-react";

export type Trait = { title: string; description: string };

const groomYouDeserve: Trait[] = [
  { title: "Kindness", description: "Genuinely kind to you, family, service workers, children, and strangers." },
  { title: "Emotional maturity", description: "Can communicate, apologize, handle disagreement, and manage his temper." },
  { title: "Respect", description: "Treats you as an equal and respects your opinions, career, and boundaries." },
  { title: "Ambition", description: "Has goals and takes responsibility for building his own life." },
  { title: "Financial responsibility", description: "Saves, avoids destructive debt, and plans realistically for the future." },
  { title: "Intellectual compatibility", description: "Enjoys meaningful conversation and continuing to learn together." },
  { title: "Family orientation", description: "Wants to build a healthy family, not simply have a wife." },
  { title: "Good father potential", description: "Patient, involved, and willing to share the work of raising children." },
  { title: "Integrity", description: "Does the right thing even when nobody is watching." },
  { title: "Communication", description: "Does not use silence, intimidation, manipulation, or humiliation to win." },
  { title: "Growth mindset", description: "Can admit when he is wrong, learn, and change." },
  { title: "Compatible values", description: "Shares the fundamental principles that guide your life." },
  { title: "Loyalty", description: "Faithful, dependable, and worthy of trust." },
  { title: "Healthy independence", description: "Has his own identity without needing to control yours." },
  { title: "Equality", description: "Sees marriage as a partnership rather than a hierarchy." },
  { title: "Joy", description: "Someone whose company you genuinely enjoy." },
  { title: "Stability", description: "Does not bring addiction, uncontrolled anger, or chronic chaos into your life." },
  { title: "Perspective", description: "Curious, open-minded, and comfortable with different backgrounds." },
];

const whatHeSeeks: Trait[] = [
  { title: "Character", description: "Kind, honest, trustworthy, and decent when nobody is watching." },
  { title: "Intelligence", description: "Someone he can have deep conversations with and learn from." },
  { title: "Warmth", description: "A person who helps home feel peaceful rather than constantly conflicted." },
  { title: "Purpose", description: "She has her own interests, ambitions, and things she cares about." },
  { title: "Partnership", description: "She sees marriage as both people working together against the problem." },
  { title: "Communication", description: "Can discuss difficult subjects without attacking, threatening, or withdrawing." },
  { title: "Confidence", description: "Comfortable with herself and not dependent on constant validation." },
  { title: "Growth", description: "Willing to learn, change, and improve throughout life." },
  { title: "Financial maturity", description: "Understands money and approaches lifestyle choices responsibly." },
  { title: "Family compatibility", description: "Shares similar ideas about children, parenting, and responsibilities." },
  { title: "Values", description: "Compatible beliefs about loyalty, family, work, and life." },
  { title: "Affection", description: "Genuine attraction, emotional closeness, and warmth." },
  { title: "Independence", description: "Maintains her own identity, friendships, and interests." },
  { title: "Adaptability", description: "Can navigate different people, cultures, and situations comfortably." },
  { title: "Loyalty", description: "Will stand beside him through difficult periods." },
];

const ITEMS_PER_PAGE = 5;

export function PerspectiveCard({ eyebrow, title, description, traits, variant }: {
  eyebrow: string; title: string; description: string; traits: Trait[]; variant: "deserve" | "seeks";
}) {
  const [page, setPage] = useState(0);
  const pages = Math.ceil(traits.length / ITEMS_PER_PAGE);
  const visibleTraits = traits.slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE);
  const isDeserve = variant === "deserve";
  const accent = isDeserve ? "#c87568" : "#527b75";
  const tint = isDeserve ? "#fbebe7" : "#eaf2ef";
  const previous = () => setPage((current) => (current - 1 + pages) % pages);
  const next = () => setPage((current) => (current + 1) % pages);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[26px] border border-[#263f57]/8 bg-white shadow-[0_16px_45px_rgba(38,63,87,0.07)]">
      <div className="relative border-b border-[#263f57]/7 px-5 py-5 sm:px-6">
        <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: accent }} />
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl" style={{ color: accent, backgroundColor: tint }}>
            {isDeserve ? <HeartHandshake size={21} /> : <Search size={20} />}
          </span>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: accent }}>{eyebrow}</p>
            <h3 className="mt-1 font-display text-[22px] font-bold leading-tight text-[#263f57] sm:text-2xl">{title}</h3>
            <p className="mt-2 text-xs leading-5 text-[#788087]">{description}</p>
          </div>
        </div>
      </div>

      <div className="relative min-h-[330px] flex-1 px-5 py-3 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.ul key={page} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }} className="divide-y divide-[#263f57]/7">
            {visibleTraits.map((trait, index) => (
              <li key={trait.title} className="flex gap-3 py-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold" style={{ color: accent, backgroundColor: tint }}>
                  {page * ITEMS_PER_PAGE + index + 1}
                </span>
                <div>
                  <h4 className="text-[13px] font-bold text-[#344b5d]">{trait.title}</h4>
                  <p className="mt-0.5 text-[11px] leading-4 text-[#7b8388]">{trait.description}</p>
                </div>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between border-t border-[#263f57]/7 bg-[#fcfbf9] px-5 py-3 sm:px-6">
        <div className="flex gap-1.5" aria-label={`${title} pages`}>
          {Array.from({ length: pages }).map((_, index) => (
            <button key={index} type="button" onClick={() => setPage(index)} aria-label={`Show page ${index + 1} of ${title}`} aria-pressed={page === index} className={`h-1.5 rounded-full transition-all ${page === index ? "w-6" : "w-1.5 bg-[#263f57]/15"}`} style={page === index ? { backgroundColor: accent } : undefined} />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="mr-1 text-[9px] font-bold uppercase tracking-[0.13em] text-[#9a9691]">{page + 1} / {pages}</span>
          <button type="button" onClick={previous} aria-label={`Previous page of ${title}`} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#263f57]/10 bg-white text-[#61717c] transition-colors hover:text-[#263f57]"><ChevronLeft size={16} /></button>
          <button type="button" onClick={next} aria-label={`Next page of ${title}`} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#263f57]/10 bg-white text-[#61717c] transition-colors hover:text-[#263f57]"><ChevronRight size={16} /></button>
        </div>
      </div>
    </article>
  );
}

export default function WholeLifePartnership() {
  return (
    <section className="relative overflow-hidden bg-[#fbf7f2] py-14 lg:py-20">
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#d4a15f]/35 to-transparent" />
      <div className="absolute -left-28 top-24 h-64 w-64 rounded-full bg-[#f3d8ce]/35 blur-[90px]" />
      <div className="absolute -right-28 bottom-12 h-72 w-72 rounded-full bg-[#dce9e4]/50 blur-[100px]" />

      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.55 }} className="mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#c87568]/15 bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.19em] text-[#a96056] shadow-sm">
            <Sparkles size={14} /> Two perspectives · one relationship
          </div>
          <h2 className="font-display text-[clamp(2.1rem,3.5vw,3.4rem)] font-bold leading-[1.06] tracking-[-0.04em] text-[#263f57]">Choosing a life partner with clarity</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#6f767b]">A healthy match begins with understanding both sides: the qualities you deserve and the qualities a strong partner hopes to find in you.</p>
        </motion.div>

        <div className="mt-9 grid items-stretch gap-5 lg:grid-cols-2">
          <PerspectiveCard eyebrow="Your standards" title="The groom you deserve" description="The qualities that create safety, respect, growth, and a genuinely shared life." traits={groomYouDeserve} variant="deserve" />
          <PerspectiveCard eyebrow="His perspective" title="What your dream groom is looking for" description="The character, maturity, and partnership qualities he may hope to find in return." traits={whatHeSeeks} variant="seeks" />
        </div>

        <div className="mx-auto mt-7 flex max-w-3xl items-center gap-3 text-center">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4a15f]/40" />
          <p className="flex items-center gap-2 font-display text-base font-semibold italic text-[#526674] sm:text-lg"><Check size={15} className="text-[#66897f]" />Know what matters. Become what matters.</p>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4a15f]/40" />
        </div>
      </div>
    </section>
  );
}
