import type { Metadata } from "next";
import { getServiceBySlug } from "@/lib/services";
import ServicePageTemplate from "@/components/service-page/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Business Valuation | CPA-DMV — Fairfax, VA",
  description: "CPA-prepared business valuations for sales, divorce, estate planning, and litigation. Certified written reports.",
};

export default function ValuationPage() {
  const service = getServiceBySlug("business-valuation")!;
  return <ServicePageTemplate service={service} />;
}
