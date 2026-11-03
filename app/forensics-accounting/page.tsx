import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/lib/services";
import ServicePageTemplate from "@/components/service-page/ServicePageTemplate";

export const metadata: Metadata = pageMetadata({
  path: "/forensics-accounting/",
  title: "Forensic Accounting & Expert Witness Services",
  description:
    "Forensic accounting, financial fraud investigation, litigation support and expert financial witness services in Fairfax, VA and the DMV area. $180/hr.",
});

export default function ForensicsPage() {
  const service = getServiceBySlug("forensics-accounting")!;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://cpa-dmv.com/forensics-accounting/#service",
        name: service.name,
        description: service.description,
        url: "https://cpa-dmv.com/forensics-accounting/",
        serviceType: [
          "Forensic Accounting",
          "Financial Fraud Investigation",
          "Litigation Support",
          "Expert Witness Services",
        ],
        provider: {
          "@type": "Organization",
          name: "CPA-DMV",
          url: "https://cpa-dmv.com/",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://cpa-dmv.com/forensics-accounting/#breadcrumbs",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://cpa-dmv.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://cpa-dmv.com/#services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.name,
            item: "https://cpa-dmv.com/forensics-accounting/",
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ServicePageTemplate service={service} />
    </>
  );
}
