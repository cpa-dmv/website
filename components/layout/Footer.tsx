"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Clock, ExternalLink } from "lucide-react";
import LogoMark from "@/components/icons/LogoMark";

const bizSupport = [
  { name: "Business Registration", href: "/business-registration" },
  { name: "QuickBooks Setup",      href: "/quickbooks" },
  { name: "HR Advisory",           href: "/hr-advisory" },
  { name: "Business Valuation",    href: "/business-valuation" },
  { name: "Accounting",            href: "/specialized-audit" },
  { name: "Entity Setup",          href: "/business-registration" },
];

const company = [
  { name: "About",     href: "/about" },
  { name: "Teachings", href: "/teachings" },
  { name: "Newsletter", href: "/newsletter" },
  { name: "Events",    href: "/events" },
  { name: "CSR",       href: "/csr" },
  { name: "Contact",   href: "/contact" },
];

const badges = [
  "CPA Licensed",
  "CDFA Certified",
  "AICPA Member",
  "QuickBooks ProAdvisor",
  "VA CPA Society",
];

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-[13px] font-bold uppercase tracking-widest text-white mb-4">
      {children}
    </h4>
  );
}

function ColLinks({ links }: { links: { name: string; href: string }[] }) {
  return (
    <ul className="space-y-2">
      {links.map((l) => (
        <li key={l.name}>
          <Link href={l.href} className="text-white/50 hover:text-white text-[15px] transition-colors">
            {l.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const linkedInUrl = pathname.startsWith("/whole-life")
    ? "https://www.linkedin.com/company/wholelifedmv/?viewAsMember=true"
    : "https://www.linkedin.com/company/cpa-dmv/";
  const linkedInLabel = pathname.startsWith("/whole-life") ? "WholeLife DMV on LinkedIn" : "CPA-DMV on LinkedIn";

  return (
    <footer className="bg-[#041830] text-white">

      {/* ── Main columns ── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">

          {/* Col 1 — Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-5">
              <LogoMark size={36} />
              <div>
                <span className="font-display text-[19px] font-bold text-white tracking-tight leading-none block">
                  CPA-DMV
                </span>
                <span className="text-[9px] text-white/40 uppercase tracking-widest block mt-0.5">
                  Certified Public Accountant
                </span>
              </div>
            </Link>
            <p className="text-white/45 text-[14px] leading-relaxed max-w-[240px]">
              Professional accounting, tax, audit, advisory, and financial analysis support for businesses and individuals.
            </p>
          </div>

          {/* Col 2 — Business Support */}
          <div>
            <ColHeading>Business Support</ColHeading>
            <ColLinks links={bizSupport} />
          </div>

          {/* Col 3 — The Company */}
          <div>
            <ColHeading>The Company</ColHeading>
            <ColLinks links={company} />
          </div>

          {/* Col 4 — Support */}
          <div>
            <ColHeading>Support</ColHeading>
            <ul className="space-y-4">
              <li className="flex items-start gap-2.5">
                <Mail size={14} className="text-white/50 flex-shrink-0 mt-0.5" />
                <a href="mailto:support@cpa-dmv.com"
                  className="text-white/50 hover:text-white text-[15px] transition-colors break-all">
                  support@cpa-dmv.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-white/50 flex-shrink-0 mt-0.5" />
                <span className="text-white/50 text-[15px] leading-relaxed">
                  10521 Judicial Dr #100<br />Fairfax, VA 22030
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={14} className="text-white/50 flex-shrink-0 mt-0.5" />
                <span className="text-white/50 text-[15px] leading-relaxed">
                  Mon – Fri: 9 AM – 6 PM
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/[0.16]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5">

            {/* Left — socials + copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-1.5">
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={linkedInLabel}
                  className="w-8 h-8 rounded-lg bg-white/6 hover:bg-[#0A66C2] text-white/45 hover:text-white flex items-center justify-center transition-all"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                {["Facebook", "YouTube", "X / Twitter"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    aria-label={s}
                    className="w-8 h-8 rounded-lg bg-white/6 hover:bg-white/14 text-white/45 hover:text-white flex items-center justify-center transition-all"
                  >
                    <ExternalLink size={13} />
                  </a>
                ))}
              </div>
              <p className="text-[13px] text-white/30">
                © {new Date().getFullYear()} CPA-DMV. All rights reserved.
              </p>
            </div>

            {/* Right — trust badges */}
            <div className="flex items-center flex-wrap justify-center gap-2">
              {badges.map((b) => (
                <span
                  key={b}
                  className="text-[11px] font-medium text-white/40 border border-white/[0.13] rounded-full px-3 py-1 tracking-wide"
                >
                  {b}
                </span>
              ))}
            </div>

          </div>
        </div>
      </div>

    </footer>
  );
}
