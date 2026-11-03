import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/careers/",
  title: "Careers – Join the CPA-DMV Team",
  description:
    "Explore open roles at CPA-DMV, including AI, automation and help desk positions. Join our team serving clients across the DMV area.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
