import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import ServicesGrid from "@/components/home/ServicesGrid";
import CDFASpotlight from "@/components/home/CDFASpotlight";
import ExpertSupport from "@/components/home/ExpertSupport";
import TaxSeasonSection from "@/components/home/TaxSeasonSection";
import FounderTeaser from "@/components/home/FounderTeaser";
import PricingTeaser from "@/components/home/PricingTeaser";
import BookingSection from "@/components/home/BookingSection";
import EventsTeaser from "@/components/home/EventsTeaser";
import TeachingsTeaser from "@/components/home/TeachingsTeaser";
import TestimonialsBar from "@/components/home/TestimonialsBar";
import ConversationCTA from "@/components/home/ConversationCTA";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsBar />
      <ServicesGrid />
      <CDFASpotlight />
      <ExpertSupport />
      <TaxSeasonSection />
      <FounderTeaser />
      <PricingTeaser />
      <BookingSection />
      <EventsTeaser />
      <TeachingsTeaser />
      <TestimonialsBar />
      <ConversationCTA />
    </main>
  );
}