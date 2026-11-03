import { BUSINESS, SITE_URL } from "@/lib/seo";

// Home page only. Tells Google who the business is, where it is, and which
// areas it serves. No phone number is listed because the site publishes none.
export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AccountingService",
        "@id": `${SITE_URL}/#business`,
        name: BUSINESS.name,
        url: `${SITE_URL}/`,
        logo: BUSINESS.logo,
        image: BUSINESS.logo,
        email: BUSINESS.email,
        description:
          "CPA firm in Fairfax, VA offering tax preparation, accounting, bookkeeping, payroll, audits, forensic accounting and divorce financial analysis.",
        address: { "@type": "PostalAddress", ...BUSINESS.address },
        areaServed: [
          { "@type": "State", name: "Virginia" },
          { "@type": "State", name: "Maryland" },
          { "@type": "AdministrativeArea", name: "Washington, DC" },
        ],
        knowsAbout: [
          "Tax preparation",
          "Accounting",
          "Bookkeeping",
          "Payroll",
          "Business valuation",
          "Forensic accounting",
          "Certified Divorce Financial Analyst services",
        ],
        sameAs: BUSINESS.sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "CPA-DMV",
        publisher: { "@id": `${SITE_URL}/#business` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // "<" is escaped so the JSON can never close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
}
