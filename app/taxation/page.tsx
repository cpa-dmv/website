import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/lib/services";
import ServicePageTemplate from "@/components/service-page/ServicePageTemplate";
import TaxAccordion from "@/components/service-page/TaxAccordion";

export const metadata: Metadata = pageMetadata({
  path: "/taxation/",
  title: "Tax Preparation Services in Fairfax, VA",
  description:
    "Individual and business tax preparation, tax planning and IRS support in Fairfax, VA. Federal, state and local returns for S-Corps, LLCs and individuals.",
});

export default function TaxationPage() {
  const service = getServiceBySlug("taxation")!;

  return (
    <ServicePageTemplate service={service}>
      <TaxAccordion />
    </ServicePageTemplate>
  );
}
