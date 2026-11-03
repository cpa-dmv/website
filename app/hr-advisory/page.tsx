import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/lib/services";
import ServicePageTemplate from "@/components/service-page/ServicePageTemplate";

export const metadata: Metadata = pageMetadata({
  path: "/hr-advisory/",
  title: "HR Consulting for Small Businesses",
  description:
    "Practical HR advisory for small businesses in Fairfax, VA: employee handbooks, onboarding, compliance guidance and HR policy support. From $20/hr.",
});

export default function HRPage() {
  const service = getServiceBySlug("hr-advisory")!;
  return <ServicePageTemplate service={service} />;
}
