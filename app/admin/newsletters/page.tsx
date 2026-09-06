"use client";
import { useEffect, useState } from "react";
import { FileText, Plus, Save, Trash2 } from "lucide-react";
import { fetchNewsletters, type Newsletter } from "@/lib/newsletters";

type DraftSection = { heading: string; paragraphs: string };
const blankSection = (): DraftSection => ({ heading: "", paragraphs: "" });
const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function NewsletterAdminPage() {
  const [title, setTitle] = useState("");
  const [issue, setIssue] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [audience, setAudience] = useState("For families and professionals");
  const [readTime, setReadTime] = useState("5 min read");
  const [researchNote, setResearchNote] = useState("");
  const [sections, setSections] = useState<DraftSection[]>([blankSection()]);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [status, setStatus] = useState("");
  const load = () => fetchNewsletters().then(setNewsletters).catch(() => setStatus("Could not connect to the newsletter service."));
  useEffect(() => { load(); }, []);

  const updateSection = (index: number, field: keyof DraftSection, value: string) => setSections((current) => current.map((section, position) => position === index ? { ...section, [field]: value } : section));
  const reset = () => { setTitle(""); setIssue(""); setExcerpt(""); setResearchNote(""); setSections([blankSection()]); };
  const save = async () => {
    if (!title.trim() || !sections.some((section) => section.paragraphs.trim())) { setStatus("Add a title and at least one paragraph."); return; }
    setStatus("Saving…");
    const item: Newsletter = { slug: slugify(title), series: "WholeLife Insights", issue: issue || `Issue ${String(newsletters.length + 1).padStart(2, "0")}`, title, excerpt, audience, readTime, featured: true, sections: sections.filter((section) => section.paragraphs.trim()).map((section, index) => ({ type: index === 0 && !section.heading ? "lead" : "section", heading: section.heading || undefined, paragraphs: section.paragraphs.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean) })), researchNote: researchNote || undefined };
    const response = await fetch("/api/newsletters.php", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) });
    if (!response.ok) { setStatus("The newsletter could not be saved."); return; }
    setStatus("Newsletter published successfully."); reset(); await load();
  };
  const remove = async (slug: string) => {
    if (!window.confirm("Delete this newsletter permanently?")) return;
    const response = await fetch(`/api/newsletters.php?slug=${encodeURIComponent(slug)}`, { method: "DELETE" });
    if (response.ok) { setStatus("Newsletter deleted."); await load(); } else setStatus("The newsletter could not be deleted.");
  };
  const input = "mt-1.5 w-full rounded-xl border border-[#263f57]/15 px-4 py-3 text-sm outline-none focus:border-[#c87568] focus:ring-2 focus:ring-[#c87568]/15";

  return <main className="min-h-screen bg-[#f7f5f1] pb-20 pt-[100px]"><div className="mx-auto max-w-[1100px] px-4 sm:px-6"><div className="mb-8"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c87568]">Admin</p><h1 className="mt-2 text-3xl font-bold text-[#263f57]">Newsletter manager</h1><p className="mt-2 text-sm text-[#6d777c]">Create and publish an issue directly. Authentication can be added later.</p></div><div className="grid gap-7 lg:grid-cols-[1.15fr_0.85fr]">
    <section className="rounded-[24px] bg-white p-6 shadow-sm sm:p-8"><div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold text-[#263f57] sm:col-span-2">Title<input className={input} value={title} onChange={(e) => setTitle(e.target.value)} /></label><label className="text-sm font-semibold text-[#263f57]">Issue label<input className={input} value={issue} onChange={(e) => setIssue(e.target.value)} placeholder="Issue 02" /></label><label className="text-sm font-semibold text-[#263f57]">Reading time<input className={input} value={readTime} onChange={(e) => setReadTime(e.target.value)} /></label><label className="text-sm font-semibold text-[#263f57] sm:col-span-2">Audience<input className={input} value={audience} onChange={(e) => setAudience(e.target.value)} /></label><label className="text-sm font-semibold text-[#263f57] sm:col-span-2">Short summary<textarea rows={3} className={input} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} /></label></div>
      <div className="my-7 border-t border-[#263f57]/10" />
      <div className="space-y-5">{sections.map((section, index) => <div key={index} className="rounded-2xl border border-[#263f57]/10 bg-[#faf9f7] p-5"><div className="mb-3 flex items-center justify-between"><h2 className="font-bold text-[#263f57]">Section {index + 1}</h2>{sections.length > 1 && <button onClick={() => setSections((current) => current.filter((_, position) => position !== index))} className="text-[#b85f58]" aria-label={`Remove section ${index + 1}`}><Trash2 size={17} /></button>}</div><label className="text-sm font-semibold text-[#263f57]">Section heading <span className="font-normal text-[#7a8388]">(optional)</span><input className={input} value={section.heading} onChange={(e) => updateSection(index, "heading", e.target.value)} /></label><label className="mt-4 block text-sm font-semibold text-[#263f57]">Paragraphs<textarea rows={7} className={input} value={section.paragraphs} onChange={(e) => updateSection(index, "paragraphs", e.target.value)} placeholder="Separate multiple paragraphs with a blank line." /></label></div>)}</div>
      <button onClick={() => setSections((current) => [...current, blankSection()])} className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#263f57]/15 px-5 py-2.5 text-sm font-bold text-[#263f57]"><Plus size={16} /> Add another section</button><label className="mt-6 block text-sm font-semibold text-[#263f57]">Research note <span className="font-normal text-[#7a8388]">(optional)</span><textarea rows={3} className={input} value={researchNote} onChange={(e) => setResearchNote(e.target.value)} /></label><button onClick={save} className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#c87568] px-6 py-3 text-sm font-bold text-white"><Save size={16} /> Save and publish</button>{status && <p className="mt-4 text-sm font-semibold text-[#526b65]">{status}</p>}</section>
    <aside className="rounded-[24px] bg-[#263f57] p-6 text-white sm:p-7"><div className="mb-6 flex items-center gap-2"><FileText size={19} className="text-[#efb2a8]" /><h2 className="text-xl font-bold">Published newsletters</h2></div><div className="space-y-3">{newsletters.map((newsletter) => <div key={newsletter.slug} className="rounded-2xl bg-white/8 p-4"><p className="text-[10px] font-bold uppercase tracking-widest text-[#efb2a8]">{newsletter.issue}</p><div className="mt-2 flex items-start justify-between gap-4"><p className="text-sm font-semibold leading-5">{newsletter.title}</p><button onClick={() => remove(newsletter.slug)} className="shrink-0 rounded-lg bg-white/10 p-2 text-white/65 hover:bg-red-500 hover:text-white" aria-label={`Delete ${newsletter.title}`}><Trash2 size={15} /></button></div></div>)}{!newsletters.length && <p className="text-sm text-white/55">No newsletters published.</p>}</div></aside>
  </div></div></main>;
}
