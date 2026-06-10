"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";

const sections = [
  {
    title: "Federal Filing Deadlines",
    content: (
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-[#FAF5EB]">
            <th className="text-left p-3 font-semibold text-[#082B5C] border border-gray-200">Entity Type</th>
            <th className="text-left p-3 font-semibold text-[#082B5C] border border-gray-200">Due Date</th>
            <th className="text-left p-3 font-semibold text-[#082B5C] border border-gray-200">Extension</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Individual (Form 1040)", "April 15", "October 15"],
            ["S-Corporation (Form 1120-S)", "March 15", "September 15"],
            ["Partnership (Form 1065)", "March 15", "September 15"],
            ["C-Corporation (Form 1120)", "April 15", "October 15"],
            ["Trust & Estate (Form 1041)", "April 15", "September 30"],
          ].map(([e, d, x]) => (
            <tr key={e} className="border-b border-gray-100 hover:bg-[#F7F8FA]">
              <td className="p-3 border border-gray-200 text-[#1F2937]">{e}</td>
              <td className="p-3 border border-gray-200 text-[#1F2937]">{d}</td>
              <td className="p-3 border border-gray-200 text-[#6B7280]">{x}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ),
  },
  {
    title: "Standard Deduction Amounts (2025)",
    content: (
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-[#FAF5EB]">
            <th className="text-left p-3 font-semibold text-[#082B5C] border border-gray-200">Filing Status</th>
            <th className="text-left p-3 font-semibold text-[#082B5C] border border-gray-200">Standard Deduction</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Single", "$15,000"],
            ["Married Filing Jointly", "$30,000"],
            ["Married Filing Separately", "$15,000"],
            ["Head of Household", "$22,500"],
          ].map(([s, d]) => (
            <tr key={s} className="border-b border-gray-100 hover:bg-[#F7F8FA]">
              <td className="p-3 border border-gray-200 text-[#1F2937]">{s}</td>
              <td className="p-3 border border-gray-200 font-semibold text-[#F59E0B]">{d}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ),
  },
  {
    title: "Key Contribution Limits (2025)",
    content: (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { account: "401(k)", limit: "$23,500", catchUp: "$31,000 (50+)" },
          { account: "IRA (Traditional/Roth)", limit: "$7,000", catchUp: "$8,000 (50+)" },
          { account: "HSA (Individual)", limit: "$4,300", catchUp: "$5,300 (55+)" },
          { account: "HSA (Family)", limit: "$8,550", catchUp: "$9,550 (55+)" },
        ].map((a) => (
          <div key={a.account} className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <span className="block text-xs text-[#6B7280] mb-1">{a.account}</span>
            <span className="block font-display font-bold text-[#F59E0B] text-lg">{a.limit}</span>
            <span className="block text-[10px] text-[#6B7280] mt-1">{a.catchUp}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Business Tax Reminders",
    content: (
      <ul className="space-y-2">
        {[
          "Keep all receipts for business expenses — digital copies are acceptable",
          "Mileage log must be contemporaneous to be deductible",
          "Home office deduction requires exclusive and regular use",
          "Self-employed individuals must pay both employer and employee FICA",
          "S-Corp owners must pay themselves reasonable compensation before distributions",
          "Section 179 and bonus depreciation elections must be made on a timely filed return",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-[#1F2937]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] flex-shrink-0 mt-1.5" />
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "DMV-Region Entity Compliance (VA, MD, DC)",
    content: (
      <div className="space-y-4 text-sm">
        <div>
          <h4 className="font-semibold text-[#082B5C] mb-2">Virginia</h4>
          <ul className="space-y-1 text-[#6B7280]">
            <li>• Individual income tax return due May 1 (not April 15)</li>
            <li>• Corporate income tax rate: 6%</li>
            <li>• Annual report for LLCs due by the last day of the month of formation</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-[#082B5C] mb-2">Maryland</h4>
          <ul className="space-y-1 text-[#6B7280]">
            <li>• Individual return due April 15</li>
            <li>• Corporate income tax rate: 8.25%</li>
            <li>• Annual report due April 15</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-[#082B5C] mb-2">Washington DC</h4>
          <ul className="space-y-1 text-[#6B7280]">
            <li>• Individual and business returns due April 15</li>
            <li>• Unincorporated Business Tax (UBT): 8.25%</li>
            <li>• Biennial report required for LLCs</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "Estimated Tax Payment Dates",
    content: (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { q: "Q1", period: "Jan 1 – Mar 31", due: "April 15" },
          { q: "Q2", period: "Apr 1 – May 31", due: "June 16" },
          { q: "Q3", period: "Jun 1 – Aug 31", due: "September 15" },
          { q: "Q4", period: "Sep 1 – Dec 31", due: "January 15" },
        ].map((q) => (
          <div key={q.q} className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <span className="block font-display font-bold text-[#082B5C] text-xl">{q.q}</span>
            <span className="block text-[10px] text-[#6B7280] my-1">{q.period}</span>
            <span className="block text-sm font-semibold text-[#F59E0B]">{q.due}</span>
          </div>
        ))}
      </div>
    ),
  },
];

export default function TaxAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <AnimatedSection delay={0.3}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-bold text-[#082B5C] text-2xl">Tax Resources</h2>
        <p className="text-xs text-[#6B7280]">
          {/* TODO: Update this date annually */}
          Last updated: June 2025
        </p>
      </div>
      <p className="text-[#6B7280] text-sm mb-5">
        Key figures and deadlines for quick reference. Always verify with your CPA for your specific situation.
      </p>
      <div className="space-y-2">
        {sections.map((s, i) => (
          <div key={s.title} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#F7F8FA] transition-colors"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="font-semibold text-[#1F2937] text-sm">{s.title}</span>
              <ChevronDown
                size={16}
                className={`text-[#6B7280] transition-transform flex-shrink-0 ${open === i ? "rotate-180" : ""}`}
              />
            </button>
            {open === i && (
              <div className="px-5 pb-5 border-t border-gray-100">
                <div className="pt-4">{s.content}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
