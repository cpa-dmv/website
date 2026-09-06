import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter Publisher",
  robots: { index: false, follow: false },
};

export default function NewsletterPublisherLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
