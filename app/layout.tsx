import type { Metadata } from "next";
import { Playfair_Display, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingActionButton from "@/components/shared/FloatingActionButton";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "CPA-DMV | Certified Public Accountant — Fairfax, VA",
    template: "%s | CPA-DMV",
  },
  description:
    "CPA-DMV offers expert accounting, tax, bookkeeping, payroll, CDFA divorce financial analysis, and audit services in Fairfax, VA and the DMV area.",
  openGraph: { type: "website", locale: "en_US", siteName: "CPA-DMV" },
  metadataBase: new URL("https://cpa-dmv.com"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${roboto.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingActionButton />
      </body>
    </html>
  );
}
