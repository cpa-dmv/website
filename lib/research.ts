export type ResearchSection = {
  heading: string;
  paragraphs: string[];
};

export type ResearchReference = {
  title: string;
  source: string;
  year: string;
};

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

  sections?: ResearchSection[];
  researchNote?: string;
  references?: ResearchReference[];
};

export async function fetchResearch(): Promise<
  ResearchPublication[]
> {
  try {
    const response = await fetch(
      "https://cpa-dmv.com/api/research.php",
      {
        cache: "no-store",
      },
    );

    if (response.ok) {
      const contentType =
        response.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        const data = await response.json();

        if (Array.isArray(data)) {
          return data;
        }
      }

      const text = await response.text();

      try {
        const data = JSON.parse(text);

        if (Array.isArray(data)) {
          return data;
        }
      } catch {
        // Continue to static fallback.
      }
    }
  } catch {
    console.warn(
      "Remote research API unavailable.",
    );
  }

  const fallback = await fetch(
    "/data/research.json",
    {
      cache: "no-store",
    },
  );

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