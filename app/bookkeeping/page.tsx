import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/lib/services";
import ServicePageTemplate from "@/components/service-page/ServicePageTemplate";

export const metadata: Metadata = pageMetadata({
  path: "/bookkeeping/",
  title: "Bookkeeping Services in Northern Virginia",
  description:
    "Monthly bookkeeping for small businesses in Northern Virginia: reconciliations, P&L and balance sheets, powered by QuickBooks and a licensed CPA.",
});

export default function BookkeepingPage() {
  const service = getServiceBySlug("bookkeeping")!;

  return <ServicePageTemplate service={service} />;
}
