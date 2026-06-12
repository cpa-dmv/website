import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import SpotlightSection from "@/components/home/SpotlightSection";
import ServicesGrid from "@/components/home/ServicesGrid";
import PricingTeaser from "@/components/home/PricingTeaser";
import ExpertSupport from "@/components/home/ExpertSupport";
import TestimonialsBar from "@/components/home/TestimonialsBar";
import EventsTeaser from "@/components/home/EventsTeaser";
import TeachingsTeaser from "@/components/home/TeachingsTeaser";
import BookingSection from "@/components/home/BookingSection";

export const metadata: Metadata = {
  title: "CPA-DMV | Certified Public Accountant — Fairfax, VA",
  description:
    "Expert accounting, tax, CDFA divorce financial analysis, audits, bookkeeping, and payroll services in Fairfax, VA. CPA and CDFA certified. Free consultation.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SpotlightSection />
      <div style={{ width: "min(1080px, calc(100vw - 32px))", height: "1px", margin: "0 auto", background: "rgba(8, 43, 92, 0.08)" }} />
      <ServicesGrid />
      <PricingTeaser />
      <div style={{ width: "min(1080px, calc(100vw - 32px))", height: "1px", margin: "0 auto", background: "rgba(8, 43, 92, 0.08)" }} />
      <ExpertSupport />
      <TeachingsTeaser />
      <EventsTeaser />
      <TestimonialsBar />
      <BookingSection />
    </>
  );
}
