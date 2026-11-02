import type { Metadata } from "next";
import { getServiceBySlug } from "@/lib/services";
import ServicePageTemplate from "@/components/service-page/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Bookkeeping Services for US Businesses | CPA-DMV",
description:
  "Reliable bookkeeping services for small businesses across the United States, including organized financial records, monthly reconciliations and QuickBooks support.",
alternates: {
  canonical: "/bookkeeping/",
},
};

export default function BookkeepingPage() {
  const service = getServiceBySlug("bookkeeping")!;

  return <ServicePageTemplate service={service} />;
}
