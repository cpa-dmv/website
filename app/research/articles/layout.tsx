import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/research/articles/",
  title: "Research Publication",
  description:
    "Read a research publication from CPA-DMV and WholeLife: professional insights on accounting, finance and life decisions.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
