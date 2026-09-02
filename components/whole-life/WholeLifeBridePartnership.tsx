"use client";

import { motion } from "framer-motion";
import { Check, Flower2 } from "lucide-react";
import { PerspectiveCard, type Trait } from "@/components/whole-life/WholeLifePartnership";

const brideYouDeserve: Trait[] = [
  { title: "Kind", description: "Treats you with warmth and respect, especially when life becomes difficult." },
  { title: "Loyal", description: "Someone you can trust completely through every season." },
  { title: "Intelligent", description: "Challenges you thoughtfully and enjoys meaningful conversation." },
  { title: "Emotionally mature", description: "Can disagree without damaging the relationship." },
  { title: "Has purpose", description: "Maintains her own interests, goals, and identity." },
  { title: "Communicative", description: "Expresses what she needs rather than expecting you to guess." },
  { title: "Financially responsible", description: "Understands that building stability and wealth is a team effort." },
  { title: "Family-minded", description: "Is prepared to build a healthy family together if children are part of the plan." },
  { title: "Supportive", description: "Does not disappear when failure, uncertainty, or hardship arrives." },
  { title: "Values-driven", description: "Her principles remain steady when circumstances change." },
  { title: "Fun to be around", description: "Brings laughter, friendship, and a sense of adventure into ordinary life." },
  { title: "Peaceful", description: "Helps home feel safe rather than like a constant battlefield." },
  { title: "Strong", description: "Can face adversity without expecting you to solve everything." },
  { title: "Independent", description: "Chooses the relationship from love, not an inability to function alone." },
  { title: "Affectionate", description: "Values emotional and physical closeness." },
  { title: "Open-minded", description: "Willing to grow, adapt, and experience life together." },
];

const whatSheSeeks: Trait[] = [
  { title: "Love & attraction", description: "Do I genuinely want to build a life with you?" },
  { title: "Emotional safety", description: "Can I be completely myself around you?" },
  { title: "Respect", description: "Will you treat me as an equal partner?" },
  { title: "Intellectual connection", description: "Can we keep talking, learning, and challenging each other?" },
  { title: "Ambition", description: "Are you building something meaningful with your life?" },
  { title: "Confidence", description: "Are you secure enough to celebrate rather than fear my success?" },
  { title: "Financial responsibility", description: "Can we build lasting financial security together?" },
  { title: "Family commitment", description: "Do we want the same kind of family and home?" },
  { title: "Communication", description: "Can we solve difficult problems without hurting each other?" },
  { title: "Fidelity", description: "Can I trust you completely?" },
  { title: "Growth", description: "Will we continue becoming better people together?" },
  { title: "Friendship", description: "Will I enjoy sharing an ordinary Tuesday with you?" },
  { title: "Adventure", description: "Will we explore the world and experience life together?" },
  { title: "Values", description: "Do we fundamentally agree about what matters?" },
  { title: "Peace", description: "Will our home be a place where both of us can recharge?" },
];

export default function WholeLifeBridePartnership() {
  return (
    <section className="relative overflow-hidden border-t border-[#263f57]/7 bg-white py-14 lg:py-20">
      <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-[#f4ddd4]/45 blur-[100px]" />
      <div className="absolute -right-32 top-10 h-72 w-72 rounded-full bg-[#e2ece8]/55 blur-[100px]" />

      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.55 }} className="mx-auto max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#527b75]/15 bg-[#f4f8f6] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.19em] text-[#527b75] shadow-sm">
            <Flower2 size={14} />Two perspectives · one relationship
          </div>
          <h2 className="font-display text-[clamp(2.1rem,3.5vw,3.4rem)] font-bold leading-[1.06] tracking-[-0.04em] text-[#263f57]">
            Recognizing a life partner with intention
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#6f767b]">
            A lasting match asks two separate questions: what qualities should you expect in a bride, and what qualities might a strong woman seek in you?
          </p>
        </motion.div>

        <div className="mt-9 grid items-stretch gap-5 lg:grid-cols-2">
          <PerspectiveCard eyebrow="Your standards" title="The bride you deserve" description="The qualities that support trust, affection, resilience, and a peaceful shared life." traits={brideYouDeserve} variant="deserve" />
          <PerspectiveCard eyebrow="Her perspective" title="What your dream bride is looking for" description="The deeper questions behind attraction, safety, commitment, and lasting compatibility." traits={whatSheSeeks} variant="seeks" />
        </div>

        <div className="mx-auto mt-7 flex max-w-3xl items-center gap-3 text-center">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4a15f]/40" />
          <p className="flex items-center gap-2 font-display text-base font-semibold italic text-[#526674] sm:text-lg"><Check size={15} className="text-[#66897f]" />See the person clearly. Build the partnership deliberately.</p>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4a15f]/40" />
        </div>
      </div>
    </section>
  );
}
