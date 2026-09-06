"use client";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchNewsletters, type Newsletter } from "@/lib/newsletters";

export default function NewsletterFeature({ theme = "cpa" }: { theme?: "cpa" | "whole-life" }) {
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  useEffect(() => { fetchNewsletters().then((items) => setNewsletter(items.find((item) => item.featured) ?? items[0] ?? null)).catch(() => undefined); }, []);
  if (!newsletter) return null;
  const wholeLife = theme === "whole-life";
  const navy = wholeLife ? "#263f57" : "#082B5C";
  const accent = wholeLife ? "#c87568" : "#F59E0B";
  return <section className={wholeLife ? "bg-[#f7f5f1] py-16 lg:py-20" : "bg-white py-14 lg:py-20"}><div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8"><div className="overflow-hidden rounded-[28px] border border-[#263f57]/10 bg-white shadow-[0_20px_55px_rgba(38,63,87,0.09)]"><div className="grid lg:grid-cols-[0.8fr_1.2fr]">
    <div className="relative flex min-h-[280px] flex-col justify-between overflow-hidden p-8 text-white sm:p-10" style={{ backgroundColor: navy }}><div className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20" style={{ backgroundColor: accent }} /><div className="relative"><div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10"><Mail size={23} /></div><p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>{newsletter.series}</p><p className="mt-2 max-w-xs text-sm leading-6 text-white/65">Research-informed perspectives for the decisions that shape family, work, and life.</p></div><div className="relative mt-8 flex items-center gap-2 text-xs text-white/55"><BookOpen size={14} /> {newsletter.issue}</div></div>
    <div className="p-8 sm:p-10 lg:p-12"><div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-medium text-[#6B7280]"><span>{newsletter.audience}</span><span className="h-1 w-1 rounded-full bg-[#9CA3AF]" /><span className="inline-flex items-center gap-1.5"><Clock size={13} />{newsletter.readTime}</span></div><h2 className="max-w-2xl text-[clamp(1.75rem,3vw,2.65rem)] font-bold leading-[1.12] tracking-[-0.025em]" style={{ color: navy }}>{newsletter.title}</h2><p className="mt-5 max-w-2xl text-[15px] leading-7 text-[#667078]">{newsletter.excerpt}</p><Link href={`/newsletter/?issue=${newsletter.slug}`} className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5" style={{ backgroundColor: accent }}>Read the latest issue <ArrowRight size={16} /></Link><Link href="/newsletter/" className="ml-4 mt-7 inline-flex text-sm font-semibold" style={{ color: navy }}>View all issues</Link></div>
  </div></div></div></section>;
}
