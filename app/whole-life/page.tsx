import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import WholeLifeSchema from "@/components/whole-life/WholeLifeSchema";
import { WHOLE_LIFE_SEO, WHOLE_LIFE_PATH } from "@/lib/whole-life-seo";
import WholeLifeHero from "@/components/whole-life/WholeLifeHero";
import WholeLifeCrossroads from "@/components/whole-life/WholeLifeCrossroads";
import WholeLifePartnership from "@/components/whole-life/WholeLifePartnership";
import WholeLifeChallenges from "@/components/whole-life/WholeLifeChallenges";
import WholeLifeBridePartnership from "@/components/whole-life/WholeLifeBridePartnership";
import WholeLifeChildrenFuture from "@/components/whole-life/WholeLifeChildrenFuture";
import WholeLifeMarriageValue from "@/components/whole-life/WholeLifeMarriageValue";
import WholeLifeLongevity from "@/components/whole-life/WholeLifeLongevity";
import WholeLifePromise from "@/components/whole-life/WholeLifePromise";
import WholeLifeTeam from "@/components/whole-life/WholeLifeTeam";
import NewsletterFeature from "@/components/newsletter/NewsletterFeature";
import ResearchpaperFeature from "@/components/researchpaper/ResearchpaperFeature";
import WholeLifeTestimonials from "@/components/whole-life/WholeLifeTestimonials";
import WholeLifeCounsellor from "@/components/whole-life/WholeLifeCounsellor";

export const metadata: Metadata = pageMetadata({
  path: WHOLE_LIFE_PATH,
  title: WHOLE_LIFE_SEO.title,
  description: WHOLE_LIFE_SEO.description,
  absoluteTitle: true, // skips the "| CPA-DMV" suffix so the title stays under 60 characters
  image: WHOLE_LIFE_SEO.ogImage,
});

export default function WholeLifePage() {
  return (
    <>
      <WholeLifeSchema />
      <WholeLifeHero />
      <WholeLifeTestimonials />
      <WholeLifeCounsellor />
      <WholeLifeTeam />
      <WholeLifeCrossroads />
      <WholeLifeMarriageValue />
      <WholeLifePartnership />
      <WholeLifeBridePartnership />
      <WholeLifeChallenges />
      <WholeLifeChildrenFuture />
      <WholeLifeLongevity />
      <NewsletterFeature theme="whole-life" />
      <ResearchpaperFeature />
      <WholeLifePromise />
    </>
  );
}