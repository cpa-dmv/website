import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/lib/services";
import ServicePageTemplate from "@/components/service-page/ServicePageTemplate";

export const metadata: Metadata = pageMetadata({
  path: "/accounting/",
  title: "Small Business Accounting Services in Fairfax, VA",
  description:
    "Accounting for businesses, non-profits and credit unions in Fairfax, VA: GAAP-compliant financial statements, monthly close and board-ready reports.",
});

export default function AccountingPage() {
  const service = getServiceBySlug("accounting")!;
  return <ServicePageTemplate service={service} />;
}
