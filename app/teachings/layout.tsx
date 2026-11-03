import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/teachings/",
  title: "Free CPA Exam Prep & CPE Courses",
  description:
    "Free CPA exam prep for FAR, AUD, REG and BAR, plus CPE sessions on tax, audit and GAAP updates and open accounting Q&A, from CPA-DMV in Fairfax, VA.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
