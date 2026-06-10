import type { Metadata } from "next";
import { getServiceBySlug } from "@/lib/services";
import ServicePageTemplate from "@/components/service-page/ServicePageTemplate";

export const metadata: Metadata = {
  title: "QuickBooks Setup & Training | CPA-DMV — Fairfax, VA",
  description: "QuickBooks ProAdvisor setup, cleanup, and training. Chart of accounts, payroll integration, one-on-one training.",
};

export default function QuickBooksPage() {
  const service = getServiceBySlug("quickbooks")!;
  return <ServicePageTemplate service={service} />;
}
