import type { Metadata } from "next";
import { getServiceBySlug } from "@/lib/services";
import ServicePageTemplate from "@/components/service-page/ServicePageTemplate";

export const metadata: Metadata = {
  title: "AP / AR Services | CPA-DMV — Fairfax, VA",
  description: "Accounts payable and receivable management in Fairfax, VA. $20/hr, typical $200. Keep your cash flow healthy.",
};

export default function APARPage() {
  const service = getServiceBySlug("ap-ar")!;
  return <ServicePageTemplate service={service} />;
}
