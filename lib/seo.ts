import type { Metadata } from "next";

// Shared SEO helpers. Every page's metadata goes through pageMetadata()
// so titles, canonicals and social previews stay consistent.

export const SITE_URL = "https://cpa-dmv.com";
export const SITE_NAME = "CPA-DMV";
// app/icon.png is served at /icon.png (the CPA-DMV logo).
export const DEFAULT_OG_IMAGE = `${SITE_URL}/icon.png`;

export const BUSINESS = {
  name: "CPA-DMV",
  email: "support@cpa-dmv.com",
  logo: `${SITE_URL}/icon.png`,
  address: {
    streetAddress: "10521 Judicial Dr #100",
    addressLocality: "Fairfax",
    addressRegion: "VA",
    postalCode: "22030",
    addressCountry: "US",
  },
  sameAs: ["https://www.linkedin.com/company/cpa-dmv/"],
};

type PageSeo = {
  /** Page title WITHOUT the brand. app/layout.tsx appends " | CPA-DMV". */
  title: string;
  description: string;
  /** Path with leading and trailing slash, e.g. "/taxation/". */
  path: string;
  /** Use true when the title already contains the brand (home page). */
  absoluteTitle?: boolean;
  image?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  image = DEFAULT_OG_IMAGE,
}: PageSeo): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path }, // resolved against metadataBase in app/layout.tsx
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url,
      images: [{ url: image }],
    },
    twitter: {
      // The default image is the square logo, so use the small card for it.
      card: image === DEFAULT_OG_IMAGE ? "summary" : "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

/** For admin / private screens: keep them out of search results. Sets nothing else. */
export function privateMetadata(): Metadata {
  return { robots: { index: false, follow: false } };
}
