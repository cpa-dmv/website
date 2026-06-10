import type { Metadata } from "next";
import { getServiceBySlug } from "@/lib/services";
import ServicePageTemplate from "@/components/service-page/ServicePageTemplate";

export const metadata: Metadata = {
  title: "HR Support & Advisory | CPA-DMV — Fairfax, VA",
  description: "Practical HR advisory for small businesses. $20/hr. Employee handbooks, onboarding, compliance guidance.",
};

export default function HRPage() {
  const service = getServiceBySlug("hr-advisory")!;
  return <ServicePageTemplate service={service} />;
}
