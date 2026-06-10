import type { Metadata } from "next";
import { getServiceBySlug } from "@/lib/services";
import ServicePageTemplate from "@/components/service-page/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Business Registration | CPA-DMV — Fairfax, VA",
  description: "Entity formation and registration in VA, MD, and DC. LLC, S-Corp, C-Corp. EIN, operating agreements, initial tax elections.",
};

export default function RegistrationPage() {
  const service = getServiceBySlug("business-registration")!;
  return <ServicePageTemplate service={service} />;
}
