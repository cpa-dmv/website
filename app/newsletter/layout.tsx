import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/newsletter/",
  title: "Newsletter: Research & Professional Insights",
  description:
    "Subscribe to the CPA-DMV and WholeLife newsletter for research and professional insights on the decisions that shape a lifetime.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
