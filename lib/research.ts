export type ResearchPublication = {
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  series: string;
  category: string;
  pages: string;
  author: string;
  publishedDate: string;
  featured: boolean;
  pdf: string;
};

export async function fetchResearch(): Promise<ResearchPublication[]> {
  // Try the live PHP API first.
  try {
    const response = await fetch("/api/research.php", {
      cache: "no-store",
    });

    if (response.ok) {
      const contentType =
        response.headers.get("content-type") || "";

      // PHP API should return JSON.
      if (contentType.includes("application/json")) {
        const data = await response.json();

        if (Array.isArray(data)) {
          return data;
        }
      }

      // Some hosting configurations may not send
      // the correct content-type, so try parsing JSON anyway.
      const text = await response.text();

      try {
        const data = JSON.parse(text);

        if (Array.isArray(data)) {
          return data;
        }
      } catch {
        // Not valid JSON — continue to fallback.
      }
    }
  } catch {
    // PHP API unavailable locally — use static fallback.
  }

  // Static fallback used during local Next.js development.
  const fallback = await fetch("/data/research.json", {
    cache: "no-store",
  });

  if (!fallback.ok) {
    throw new Error(
      "Unable to load research publications.",
    );
  }

  const data = await fallback.json();

  if (!Array.isArray(data)) {
    throw new Error(
      "Research data has an invalid format.",
    );
  }

  return data;
}