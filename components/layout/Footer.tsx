"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Clock } from "lucide-react";
import LogoMark from "@/components/icons/LogoMark";

const bizSupport = [
  { name: "Business Registration", href: "/business-registration" },
  { name: "QuickBooks Setup", href: "/quickbooks" },
  { name: "HR Advisory", href: "/hr-advisory" },
  { name: "Business Valuation", href: "/business-valuation" },
  { name: "Accounting", href: "/specialized-audit" },
  { name: "Entity Setup", href: "/business-registration" },
];

const company = [
  { name: "About", href: "/about" },
  { name: "Teachings", href: "/teachings" },
  { name: "Newsletter", href: "/newsletter" },
  { name: "Research", href: "/research" },
  { name: "Events", href: "/events" },
  { name: "CSR", href: "/csr" },
  { name: "Contact", href: "/contact" },
];

const badges = [
  "CPA Licensed",
  "CDFA Certified",
  "AICPA Member",
  "QuickBooks ProAdvisor",
  "VA CPA Society",
];

export default function Footer() {
  const pathname = usePathname();

  const isWholeLife = pathname.startsWith("/whole-life");

  const linkedInUrl = isWholeLife
    ? "https://www.linkedin.com/company/wholelifedmv/?viewAsMember=true"
    : "https://www.linkedin.com/company/cpa-dmv/";

  const linkedInLabel = isWholeLife
    ? "WholeLife DMV on LinkedIn"
    : "CPA-DMV on LinkedIn";

  return (
    <footer className="bg-[#041830] text-white">
      {/* Main columns */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">
          {/* Col 1 — Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3 mb-5"
            >
              {isWholeLife ? (
                <>
                  {/* Whole Life emblem */}
                  <img
  src="/images/whole-life/icon.png"
  alt="Whole Life"
  className="h-14 w-14 object-contain"
/>

                  {/* Whole Life name + tagline */}
                  <div className="leading-none">
                    <span className="font-display text-[22px] font-bold tracking-tight block whitespace-nowrap">
                      <span className="text-white">Whole</span>{" "}
                      <span className="text-[#E77A78]">Life</span>
                    </span>

                    <span className="mt-1 block text-[7px] sm:text-[8px] font-semibold uppercase tracking-[0.12em] text-white/65 whitespace-nowrap">
                      Guidance · Commitment · Perseverance
                    </span>
                  </div>
                </>
              ) : (
                <>
                  {/* CPA-DMV branding */}
                  <LogoMark size={36} />

                  <div>
                    <span className="font-display text-[19px] font-bold text-white tracking-tight leading-none block">
                      CPA-DMV
                    </span>

                    <span className="text-[9px] text-white/40 uppercase tracking-widest block mt-0.5">
                      Certified Public Accountant
                    </span>
                  </div>
                </>
              )}
            </Link>

            <p className="text-white/45 text-[14px] leading-relaxed max-w-[240px]">
              {isWholeLife
                ? "Thoughtful guidance for every stage of life — from education and career to finances, marriage, family, and long-term stability."
                : "Professional accounting, tax, audit, advisory, and financial analysis support for businesses and individuals."}
            </p>
          </div>

          {/* Col 2 — Business Support */}
          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-widest text-white mb-4">
              Business Support
            </h4>

            <ul className="space-y-2">
              {bizSupport.map((l) => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="text-white/50 hover:text-white text-[15px] transition-colors"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — The Company */}
          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-widest text-white mb-4">
              The Company
            </h4>

            <ul className="space-y-2">
              {company.map((l) => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="text-white/50 hover:text-white text-[15px] transition-colors"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Support */}
          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-widest text-white mb-4">
              Support
            </h4>

            <ul className="space-y-4">
              <li className="flex items-start gap-2.5">
                <Mail
                  size={14}
                  className="text-white/50 flex-shrink-0 mt-0.5"
                />

                <a
                  href="mailto:support@cpa-dmv.com"
                  className="text-white/50 hover:text-white text-[15px] transition-colors break-all"
                >
                  support@cpa-dmv.com
                </a>
              </li>

              <li className="flex items-start gap-2.5">
                <MapPin
                  size={14}
                  className="text-white/50 flex-shrink-0 mt-0.5"
                />

                <span className="text-white/50 text-[15px] leading-relaxed">
                  10521 Judicial Dr #100
                  <br />
                  Fairfax, VA 22030
                </span>
              </li>

              <li className="flex items-start gap-2.5">
                <Clock
                  size={14}
                  className="text-white/50 flex-shrink-0 mt-0.5"
                />

                <span className="text-white/50 text-[15px] leading-relaxed">
                  Mon – Fri: 9 AM – 6 PM
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.16]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
            {/* Left — socials + copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-1.5">
                {/* LinkedIn */}
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={linkedInLabel}
                  className="w-8 h-8 rounded-lg bg-white/6 hover:bg-[#0A66C2] text-white/45 hover:text-white flex items-center justify-center transition-all"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C23.2.774 22.4 0 21.422 0h.803z" />
                  </svg>
                </a>

                {/* WholeLife social links */}
                {isWholeLife && (
                  <>
                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/wholelife.dmv/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WholeLife DMV on Instagram"
                      className="w-8 h-8 rounded-lg bg-white/6 hover:bg-[#E4405F] text-white/45 hover:text-white flex items-center justify-center transition-all"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="5"
                        />
                        <circle cx="12" cy="12" r="4" />
                        <circle
                          cx="17.5"
                          cy="6.5"
                          r="0.8"
                          fill="currentColor"
                          stroke="none"
                        />
                      </svg>
                    </a>

                    {/* X */}
                    <a
                      href="https://x.com/WholeLifeDMV"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WholeLife DMV on X"
                      className="w-8 h-8 rounded-lg bg-white/6 hover:bg-white/20 text-white/45 hover:text-white flex items-center justify-center transition-all"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.967 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                      </svg>
                    </a>

                    {/* Facebook */}
                    <a
                      href="https://www.facebook.com/profile.php?id=61593770790169"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WholeLife DMV on Facebook"
                      className="w-8 h-8 rounded-lg bg-white/6 hover:bg-[#1877F2] text-white/45 hover:text-white flex items-center justify-center transition-all"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M14 8h3V4h-3c-3.314 0-5 1.686-5 5v3H6v4h3v8h4v-8h3.5l.5-4H13V9c0-.667.333-1 1-1z" />
                      </svg>
                    </a>

                    {/* YouTube */}
                    <a
                      href="https://www.youtube.com/@WholeLifeDMV"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WholeLife DMV on YouTube"
                      className="w-8 h-8 rounded-lg bg-white/6 hover:bg-[#FF0000] text-white/45 hover:text-white flex items-center justify-center transition-all"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M23.498 6.186a2.997 2.997 0 0 0-2.109-2.12C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.389.566a2.997 2.997 0 0 0-2.109 2.12C0 8.073 0 12 0 12s0 3.927.502 5.814a2.997 2.997 0 0 0 2.109 2.12c1.884.566 9.389.566 9.389.566s7.505 0 9.389-.566a2.997 2.997 0 0 0 2.109-2.12C24 15.927 24 12 24 12s0-3.927-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  </>
                )}
              </div>

              {/* Copyright */}
              <p className="text-[13px] text-white/30">
                © {new Date().getFullYear()}{" "}
                {isWholeLife ? "Whole Life" : "CPA-DMV"}. All rights reserved.
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