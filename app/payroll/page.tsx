import type { Metadata } from "next";
import { getServiceBySlug } from "@/lib/services";
import ServicePageTemplate from "@/components/service-page/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Payroll Services | CPA-DMV — Fairfax, VA",
  description: "Accurate payroll processing every cycle. $100/cycle. Federal and state compliance, W-2s, direct deposit setup.",
};

export default function PayrollPage() {
  const service = getServiceBySlug("payroll")!;
  return <ServicePageTemplate service={service} />;
}
