export type NewsletterSection = { id?: string; type: "lead" | "section" | "quote"; heading?: string; paragraphs: string[] };
export type Newsletter = { slug: string; series: string; issue: string; title: string; excerpt: string; audience: string; readTime: string; featured: boolean; sections: NewsletterSection[]; researchNote?: string };

export async function fetchNewsletters(): Promise<Newsletter[]> {
  const response = await fetch("/api/newsletters.php", { cache: "no-store" });
  if (response.ok) return response.json();
  const fallback = await fetch("/data/newsletters.json", { cache: "no-store" });
  if (!fallback.ok) throw new Error("Unable to load newsletters");
  return fallback.json();
}
