import type { Metadata } from "next";
import { getServiceBySlug } from "@/lib/services";
import ServicePageTemplate from "@/components/service-page/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Forensics Accounting + Court Witness | CPA-DMV",
  description:
    "Forensic accounting investigation and expert court witness testimony services in Fairfax, VA. Financial fraud investigation, litigation support, $180/hr.",
};

export default function ForensicsPage() {
  const service = getServiceBySlug("forensics-accounting")!;
  return <ServicePageTemplate service={service} />;
}
