import type { Metadata } from "next";
import { getServiceBySlug } from "@/lib/services";
import ServicePageTemplate from "@/components/service-page/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Accounting Services in Fairfax, VA",
  description:
    "GAAP-compliant financial accounting and reporting for businesses, nonprofits, and credit unions. Monthly close, audited statements, and board-ready reports.",
};

export default function AccountingPage() {
  const service = getServiceBySlug("accounting")!;
  return <ServicePageTemplate service={service} />;
}
