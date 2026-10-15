import type { Metadata } from "next";
import { getServiceBySlug } from "@/lib/services";
import ServicePageTemplate from "@/components/service-page/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Bookkeeping Services in Fairfax, VA",
  description:
    "Reliable bookkeeping services for small businesses in Fairfax, Northern Virginia, and the DMV. Get organized financial records, monthly reconciliations, and QuickBooks support from CPA-DMV.",
};

export default function BookkeepingPage() {
  const service = getServiceBySlug("bookkeeping")!;

  return <ServicePageTemplate service={service} />;
}
