import type { Metadata } from "next";
import { getServiceBySlug } from "@/lib/services";
import ServicePageTemplate from "@/components/service-page/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Payroll Services in Fairfax, VA",
  description:
    "Accurate payroll processing every cycle, with federal and state compliance, W-2s, and direct deposit setup.",
};

export default function PayrollPage() {
  const service = getServiceBySlug("payroll")!;
  return <ServicePageTemplate service={service} />;
}
