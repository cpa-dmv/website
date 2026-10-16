import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Whole Life Counseling | Guidance for Every Life Stage",
  description:
    "One continuous counseling system for education, career, finances, marriage, family, and long-term stability.",
};

export default function WholeLifePage() {
  return (
    <>
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