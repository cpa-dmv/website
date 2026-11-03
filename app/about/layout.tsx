import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/about/",
  title: "About Us – CPA & CDFA Firm in Fairfax, VA",
  description:
    "Meet the CPA-DMV team: certified public accountants and a Certified Divorce Financial Analyst serving clients in Fairfax, VA and the DMV area.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
