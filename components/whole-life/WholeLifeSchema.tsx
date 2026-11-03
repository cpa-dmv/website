import { WHOLE_LIFE_SEO, WHOLE_LIFE_URL } from "@/lib/whole-life-seo";
import { SITE_URL } from "@/lib/seo";

export default function WholeLifeSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${WHOLE_LIFE_URL}#organization`,
    name: "WholeLife",
    url: WHOLE_LIFE_URL,
    logo: WHOLE_LIFE_SEO.logo,
    image: WHOLE_LIFE_SEO.ogImage,
    description: WHOLE_LIFE_SEO.description,
    areaServed: "United States",
    parentOrganization: { "@type": "Organization", name: "CPA-DMV", url: SITE_URL },
    founder: {
      "@type": "Person",
      name: "Dr Praveen Singhal",
      jobTitle: "Founder & Principal, WholeLife",
    },
    knowsAbout: [
      "Marriage counselling",
      "Premarital guidance",
      "Relationship conflict resolution",
      "Divorce mediation",
    ],
    sameAs: WHOLE_LIFE_SEO.sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
}
