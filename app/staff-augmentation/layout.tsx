import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/staff-augmentation/",
  title: "Staff Augmentation – IT, Finance & Admin Talent",
  description:
    "Staff augmentation from CPA-DMV: technology, accounting and finance, data, engineering and admin professionals matched to your project needs.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
