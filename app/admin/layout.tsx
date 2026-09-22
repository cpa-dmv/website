"use client";

import Link from "next/link";
import { FileText, Mail, Shield } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      <header className="border-b border-[#263f57]/10 bg-white">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4 sm:px-6">

          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#263f57] text-white">
              <Shield size={19} />
            </div>

            <div>
              <p className="text-sm font-bold text-[#263f57]">
                CPA-DMV
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c87568]">
                Admin Panel
              </p>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            <Link
              href="/admin/newsletters"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[#263f57] transition hover:bg-[#f7f5f1]"
            >
              <Mail size={16} />
              <span className="hidden sm:inline">Newsletters</span>
            </Link>

            <Link
              href="/admin/research"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[#263f57] transition hover:bg-[#f7f5f1]"
            >
              <FileText size={16} />
              <span className="hidden sm:inline">Research</span>
            </Link>
          </nav>

        </div>
      </header>

      {children}
    </div>
  );
}