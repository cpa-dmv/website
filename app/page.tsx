import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import SpotlightSection from "@/components/home/SpotlightSection";
import ServicesGrid from "@/components/home/ServicesGrid";
import TurnaroundUSP from "@/components/home/TurnaroundUSP";
import PricingTeaser from "@/components/home/PricingTeaser";
import ExpertSupport from "@/components/home/ExpertSupport";
import TestimonialsBar from "@/components/home/TestimonialsBar";
import EventsTeaser from "@/components/home/EventsTeaser";
import TeachingsTeaser from "@/components/home/TeachingsTeaser";
import BookingSection from "@/components/home/BookingSection";
import NewsletterFeature from "@/components/newsletter/NewsletterFeature";

export const metadata: Metadata = {
title: "CPA-DMV | Accounting, Tax & Whole Life Services",
description:
  "Accounting, tax, bookkeeping, payroll, business advisory, counselling, conflict resolution and mediation services for clients across the United States.",
alternates: {
  canonical: "/",
},
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SpotlightSection />
      <div style={{ width: "min(1080px, calc(100vw - 32px))", height: "1px", margin: "0 auto", background: "rgba(8, 43, 92, 0.08)" }} />
      <ServicesGrid />
      <TurnaroundUSP />
      <PricingTeaser />
      <div style={{ width: "min(1080px, calc(100vw - 32px))", height: "1px", margin: "0 auto", background: "rgba(8, 43, 92, 0.08)" }} />
      <ExpertSupport />
      <div style={{ width: "min(1080px, calc(100vw - 32px))", height: "1px", margin: "0 auto", background: "rgba(8, 43, 92, 0.08)" }} />
      <TeachingsTeaser />
      <NewsletterFeature />
      <EventsTeaser />
      <TestimonialsBar />
      <BookingSection />
    </>
  );
}

// export default function Home() {
//   return null
// }
