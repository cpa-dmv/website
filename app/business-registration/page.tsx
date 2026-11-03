import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/lib/services";
import ServicePageTemplate from "@/components/service-page/ServicePageTemplate";

export const metadata: Metadata = pageMetadata({
  path: "/business-registration/",
  title: "LLC Formation & Business Registration in VA",
  description:
    "LLC, S-Corp and C-Corp formation in Virginia, Maryland and DC: entity selection, EIN, operating agreement review and initial tax elections.",
});

export default function RegistrationPage() {
  const service = getServiceBySlug("business-registration")!;
  return <ServicePageTemplate service={service} />;
}
