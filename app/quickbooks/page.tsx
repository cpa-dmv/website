import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/lib/services";
import ServicePageTemplate from "@/components/service-page/ServicePageTemplate";

export const metadata: Metadata = pageMetadata({
  path: "/quickbooks/",
  title: "QuickBooks Setup, Cleanup & Training",
  description:
    "QuickBooks ProAdvisor setup, data cleanup and one-on-one training for small businesses in Fairfax, VA. Chart of accounts, bank feeds, payroll.",
});

export default function QuickBooksPage() {
  const service = getServiceBySlug("quickbooks")!;
  return <ServicePageTemplate service={service} />;
}
