import type { Metadata } from "next";
import { getServiceBySlug } from "@/lib/services";
import ServicePageTemplate from "@/components/service-page/ServicePageTemplate";
import TaxAccordion from "@/components/service-page/TaxAccordion";

export const metadata: Metadata = {
  title: "Tax Preparation Services in Fairfax, VA",
  description:
    "Individual and business tax preparation and advisory in Fairfax, Virginia. Federal, state, and local tax expertise with a focus on accurate filing and compliance.",
};

export default function TaxationPage() {
  const service = getServiceBySlug("taxation")!;

  return (
    <ServicePageTemplate service={service}>
      <TaxAccordion />
    </ServicePageTemplate>
  );
}
