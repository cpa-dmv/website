import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certified Divorce Financial Analyst (CDFA) Services in Fairfax, VA",
  description:
    "Professional divorce financial analysis, marital asset division, settlement scenario modeling, and court-ready financial reporting serving Fairfax and the DMV.",
};

export default function CDFAServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
