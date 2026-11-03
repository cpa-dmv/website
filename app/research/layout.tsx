import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/research/",
  title: "Research Articles & Professional Insights",
  description:
    "Research publications and professional insights from CPA-DMV and WholeLife on accounting, finance and the decisions that shape a lifetime.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
