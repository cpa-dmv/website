"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LogoMark from "@/components/icons/LogoMark";

const serviceLinks = [
  { name: "CDFA & Divorce", slug: "cdfa-services", desc: "Certified Divorce Financial Analyst" },
  { name: "Audits & Attestations", slug: "specialized-audit", desc: "Credit unions, non-profits, ALFs" },
  { name: "Forensics + Court Witness", slug: "forensics-accounting", desc: "Investigation & expert testimony" },
  { name: "Taxation", slug: "taxation", desc: "Individual and business returns" },
  { name: "AP / AR", slug: "ap-ar", desc: "Cash flow management" },
  { name: "Payroll", slug: "payroll", desc: "Accurate payroll every cycle" },
  { name: "HR Advisory", slug: "hr-advisory", desc: "HR guidance without the overhead" },
  { name: "Business Valuation", slug: "business-valuation", desc: "Know what your business is worth" },
  { name: "QuickBooks Setup", slug: "quickbooks", desc: "ProAdvisor setup and training" },
  { name: "Business Registration", slug: "business-registration", desc: "Start on the right foundation" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Main nav — frosted glass */}
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-white/92 backdrop-blur-2xl shadow-sm border-b border-[#082B5C]/10"
            : "bg-white/82 backdrop-blur-2xl border-b border-[#082B5C]/08"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-[70px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <LogoMark size={38} />
            <div>
              <span className="font-display text-[22px] font-bold text-[#082B5C] tracking-tight leading-none block">
                CPA-DMV
              </span>
              <span className="text-[9px] text-[#9CA3AF] uppercase tracking-widest leading-none block mt-0.5">
                Certified Public Accountant
              </span>
            </div>
          </Link>

          {/* Desktop nav — shifted right with ml-auto on left spacer */}
          <div className="hidden lg:flex items-center gap-0.5 ml-auto mr-6">
            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 px-3.5 py-2 text-[15px] font-medium text-[#374151] hover:text-[#082B5C] transition-colors rounded-lg hover:bg-gray-50/80">
                Services
                <ChevronDown size={12} className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-[600px] bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 p-3.5 grid grid-cols-2 gap-1"
                  >
                    {serviceLinks.map((s) => (
                      <Link key={s.slug} href={`/${s.slug}`}
                        className="px-3 py-2 rounded-xl hover:bg-[#F7F8FA] transition-colors group">
                        <span className="text-[13px] font-medium text-[#1F2937] group-hover:text-[#082B5C]">{s.name}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {[
              { label: "Teachings", href: "/teachings" },
              { label: "CSR", href: "/csr" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3.5 py-2 text-[15px] font-medium text-[#374151] hover:text-[#082B5C] transition-colors rounded-lg hover:bg-gray-50/80"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center gap-2 bg-[#082B5C] hover:bg-[#0d3d7a] text-white text-[15px] font-semibold px-5 py-2.5 rounded-full transition-all hover:scale-105 shadow-sm flex-shrink-0"
          >
            Free Consultation
          </Link>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden ml-auto text-[#374151] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-gray-100/60"
            >
              <div className="px-4 py-4 space-y-1 bg-white/95 backdrop-blur-md">
                <div>
                  <button
                    className="w-full flex items-center justify-between px-3 py-2.5 text-[#374151] font-medium text-sm rounded-lg hover:bg-[#F7F8FA] transition-colors"
                    onClick={() => setMobileSub(mobileSub === "services" ? null : "services")}
                  >
                    Services
                    <ChevronDown size={13} className={`transition-transform ${mobileSub === "services" ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {mobileSub === "services" && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden pl-4">
                        {serviceLinks.map((s) => (
                          <Link key={s.slug} href={`/${s.slug}`}
                            className="block px-3 py-2 text-[#6B7280] text-sm hover:text-[#082B5C] transition-colors"
                            onClick={() => setMobileOpen(false)}>
                            {s.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {[
                  { label: "Teachings", href: "/teachings" },
                  { label: "CSR", href: "/csr" },
                  { label: "About", href: "/about" },
                  { label: "Contact", href: "/contact" },
                ].map((l) => (
                  <Link key={l.href} href={l.href}
                    className="block px-3 py-2.5 text-[#374151] font-medium text-sm rounded-lg hover:bg-[#F7F8FA]"
                    onClick={() => setMobileOpen(false)}>
                    {l.label}
                  </Link>
                ))}
                <div className="pt-2">
                  <Link href="/contact"
                    className="block w-full text-center bg-[#082B5C] hover:bg-[#0d3d7a] text-white font-semibold text-sm px-5 py-2.5 rounded-full"
                    onClick={() => setMobileOpen(false)}>
                    Free Consultation
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
