import type { Metadata } from "next";
import { getServiceBySlug } from "@/lib/services";
import ServicePageTemplate from "@/components/service-page/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Bookkeeping Services | CPA-DMV — Fairfax, VA",
  description: "Full-service monthly bookkeeping for small businesses — reconciled, organized, and tax-ready. Powered by QuickBooks and reviewed by a licensed CPA.",
};

export default function BookkeepingPage() {
  const service = getServiceBySlug("bookkeeping")!;
  return <ServicePageTemplate service={service} />;
}
