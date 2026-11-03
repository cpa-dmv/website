import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/lib/services";
import ServicePageTemplate from "@/components/service-page/ServicePageTemplate";

export const metadata: Metadata = pageMetadata({
  path: "/payroll/",
  title: "Payroll Processing Services in Fairfax, VA",
  description:
    "Payroll processing for small businesses in Fairfax, VA: direct deposit, federal and state payroll tax filings, W-2 and 1099 forms. $100 per cycle.",
});

export default function PayrollPage() {
  const service = getServiceBySlug("payroll")!;
  return <ServicePageTemplate service={service} />;
}
