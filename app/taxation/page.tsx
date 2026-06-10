import type { Metadata } from "next";
import { getServiceBySlug } from "@/lib/services";
import ServicePageTemplate from "@/components/service-page/ServicePageTemplate";
import TaxAccordion from "@/components/service-page/TaxAccordion";

export const metadata: Metadata = {
  title: "Taxation Services | CPA-DMV — Fairfax, VA",
  description:
    "Individual and business tax preparation and advisory in Fairfax, VA. Fixed fee per return. Federal, state, and local expertise. Free consultation.",
};

export default function TaxationPage() {
  const service = getServiceBySlug("taxation")!;
  return (
    <ServicePageTemplate service={service}>
      <TaxAccordion />
    </ServicePageTemplate>
  );
}
