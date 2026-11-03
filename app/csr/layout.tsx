import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/csr/",
  title: "Community Impact & Pro-Bono Accounting",
  description:
    "Pro-bono and discounted accounting for non-profits, CPA exam scholarships, financial literacy workshops and mentoring from CPA-DMV in the DMV area.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
