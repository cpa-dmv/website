import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/lib/services";
import ServicePageTemplate from "@/components/service-page/ServicePageTemplate";

export const metadata: Metadata = pageMetadata({
  path: "/business-valuation/",
  title: "Business Valuation Services in Fairfax, VA",
  description:
    "CPA-prepared business valuations for sales, acquisitions, divorce, estate planning and partnership disputes. Certified reports and expert opinion letters.",
});

export default function ValuationPage() {
  const service = getServiceBySlug("business-valuation")!;
  return <ServicePageTemplate service={service} />;
}
