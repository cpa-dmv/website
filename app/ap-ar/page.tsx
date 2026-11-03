import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/lib/services";
import ServicePageTemplate from "@/components/service-page/ServicePageTemplate";

export const metadata: Metadata = pageMetadata({
  path: "/ap-ar/",
  title: "Accounts Payable & Receivable Services",
  description:
    "Accounts payable and receivable management for small businesses in Fairfax, VA: invoicing, collections, aging reports and month-end close. From $20/hr.",
});

export default function APARPage() {
  const service = getServiceBySlug("ap-ar")!;
  return <ServicePageTemplate service={service} />;
}
