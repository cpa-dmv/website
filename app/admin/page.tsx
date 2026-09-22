import Link from "next/link";
import { FileText, Mail, ArrowRight } from "lucide-react";

export default function AdminPage() {
  return (
    <main className="min-h-screen px-4 pb-20 pt-12 sm:px-6">
      <div className="mx-auto max-w-[1100px]">

        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c87568]">
            Administration
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#263f57] sm:text-4xl">
            CPA-DMV Admin Panel
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6d777c]">
            Manage website newsletters and research publications from one
            centralized administration area.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <Link
            href="/admin/newsletters"
            className="group rounded-[24px] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#263f57]/10 text-[#263f57]">
                <Mail size={25} />
              </div>

              <ArrowRight
                size={20}
                className="text-[#c87568] transition-transform group-hover:translate-x-1"
              />
            </div>

            <h2 className="mt-7 text-2xl font-bold text-[#263f57]">
              Newsletter Manager
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#6d777c]">
              Create, edit, feature, and remove newsletters published on the
              website.
            </p>

            <p className="mt-6 text-sm font-bold text-[#c87568]">
              Open Newsletter Manager →
            </p>
          </Link>

          <Link
            href="/admin/research"
            className="group rounded-[24px] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c87568]/10 text-[#c87568]">
                <FileText size={25} />
              </div>

              <ArrowRight
                size={20}
                className="text-[#c87568] transition-transform group-hover:translate-x-1"
              />
            </div>

            <h2 className="mt-7 text-2xl font-bold text-[#263f57]">
              Research Manager
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#6d777c]">
              Update research publication information and manage the WholeLife
              research paper.
            </p>

            <p className="mt-6 text-sm font-bold text-[#c87568]">
              Open Research Manager →
            </p>
          </Link>

        </div>

      </div>
    </main>
  );
}