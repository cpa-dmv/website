import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/cdfa-services/",
  title: "Divorce Financial Analyst (CDFA) in Virginia",
  description:
    "Certified Divorce Financial Analyst in Fairfax, VA: divorce asset division, tax impact modeling, QDRO analysis and court-ready reports. $180/hr.",
  image: "https://cpa-dmv.com/images/cdfa-hero.jpg",
});

export default function CDFAServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
