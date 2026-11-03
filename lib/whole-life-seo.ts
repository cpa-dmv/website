// WholeLife SEO values (used by app/whole-life/page.tsx and WholeLifeSchema).
import { SITE_URL } from "@/lib/seo";

export const WHOLE_LIFE_PATH = "/whole-life/"; // trailing slash matches next.config.ts and sitemap.ts
export const WHOLE_LIFE_URL = `${SITE_URL}${WHOLE_LIFE_PATH}`;

export const WHOLE_LIFE_SEO = {
  // Under 60 characters, primary keyword first.
  title: "Marriage Counselling & Premarital Guidance | WholeLife",
  // Under 155 characters, keywords plus a call to action.
  description:
    "Marriage counselling, premarital guidance and relationship conflict resolution with WholeLife. Book your free introductory session today.",
  ogImage: `${SITE_URL}/images/whole-life/hero-1.jpg`,
  logo: `${SITE_URL}/images/whole-life-logo-transparent.png`,
  
  sameAs: [
    "https://www.linkedin.com/company/wholelifedmv/",
    "https://www.instagram.com/wholelifedmv_/",
    "https://x.com/WholeLifeDMV",
    "https://www.facebook.com/profile.php?id=61593770790169",
    "https://www.youtube.com/@WholeLifeDMV",
    "https://substack.com/@wholelifedmv",
  ],
};
