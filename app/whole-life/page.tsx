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

export const metadata: Metadata = {
  title: "Whole Life Counseling | Guidance for Every Life Stage",
  description:
    "One continuous counseling system for education, career, finances, marriage, family, and long-term stability.",
};

export default function WholeLifePage() {
  return (
    <>
      <WholeLifeHero />
      <WholeLifeCrossroads />
      <WholeLifeMarriageValue />
      <WholeLifePartnership />
      <WholeLifeBridePartnership />
      <WholeLifeChallenges />
      <WholeLifeTeam />
      <WholeLifeChildrenFuture />
      <WholeLifeLongevity />
      <WholeLifePromise />
    </>
  );
}
