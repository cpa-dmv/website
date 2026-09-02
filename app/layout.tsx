import type { Metadata } from "next";
import { Playfair_Display, Roboto } from "next/font/google";
import Script from "next/script";
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
      <body suppressHydrationWarning className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingActionButton />
        <Script id="remove-extension-hydration-attributes" strategy="beforeInteractive">
          {`(() => {
            const isExtensionError = (event) => {
              const filename = typeof event?.filename === "string" ? event.filename : "";
              const errorStack = typeof event?.error?.stack === "string" ? event.error.stack : "";
              const reasonStack = typeof event?.reason?.stack === "string" ? event.reason.stack : "";
              return filename.startsWith("chrome-extension://") ||
                errorStack.includes("chrome-extension://") ||
                reasonStack.includes("chrome-extension://");
            };

            const ignoreExtensionError = (event) => {
              if (!isExtensionError(event)) return;
              event.preventDefault();
              event.stopImmediatePropagation();
            };

            window.addEventListener("error", ignoreExtensionError, true);
            window.addEventListener("unhandledrejection", ignoreExtensionError, true);

            const clean = (root) => {
              if (!(root instanceof Element)) return;
              const elements = [root, ...root.querySelectorAll("*")];
              for (const element of elements) {
                element.removeAttribute("bis_skin_checked");
                for (const attribute of [...element.attributes]) {
                  if (attribute.name.startsWith("__processed_")) {
                    element.removeAttribute(attribute.name);
                  }
                }
              }
            };

            clean(document.documentElement);
            const observer = new MutationObserver((mutations) => {
              for (const mutation of mutations) {
                if (mutation.type === "attributes") clean(mutation.target);
                for (const node of mutation.addedNodes) clean(node);
              }
            });
            observer.observe(document.documentElement, {
              attributes: true,
              childList: true,
              subtree: true,
            });
            window.addEventListener("load", () => {
              clean(document.documentElement);
              window.setTimeout(() => observer.disconnect(), 1500);
            }, { once: true });
          })();`}
        </Script>
      </body>
    </html>
  );
}
