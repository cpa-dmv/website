"use client";

import { useState } from "react";
import CTAButton from "./CTAButton";

const services = [
  "CDFA & Divorce Asset Division",
  "Audits & Attestations",
  "Forensics Accounting + Court Witness",
  "Taxation Services",
  "AP / AR",
  "Payroll Services",
  "HR Support & Advisory",
  "Business Valuation",
  "QuickBooks Setup & Training",
  "Business Registration",
  "Teachings / Events",
  "Other",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("https://formspree.io/f/REPLACE_WITH_FORMSPREE_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", organization: "", service: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-[#FAF5EB] border border-[#F59E0B]/30 rounded-xl p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-[#F59E0B] flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-xl font-bold text-[#082B5C] mb-2">Message Received</h3>
        <p className="text-[#6B7280]">
          We&apos;ll review your request and respond with clear, professional next steps.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#1F2937] mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all"
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#1F2937] mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all"
            placeholder="jane@company.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="organization" className="block text-sm font-medium text-[#1F2937] mb-1.5">
          Organization <span className="text-[#6B7280] font-normal">(optional)</span>
        </label>
        <input
          id="organization"
          name="organization"
          type="text"
          value={form.organization}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all"
          placeholder="Company or firm name"
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-[#1F2937] mb-1.5">
          Service Needed <span className="text-red-500">*</span>
        </label>
        <select
          id="service"
          name="service"
          required
          value={form.service}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all bg-white"
        >
          <option value="">Select a service...</option>
          {services.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#1F2937] mb-1.5">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={form.message}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all resize-none"
          placeholder="Tell us how we can help..."
        />
      </div>

      {status === "error" && (
        <p className="text-red-600 text-sm">Something went wrong. Please try again or email us directly at support@cpa-dmv.com.</p>
      )}

      <CTAButton type="submit" size="lg" className="w-full justify-center" variant="primary">
        {status === "submitting" ? "Sending..." : "Send Message"}
      </CTAButton>
    </form>
  );
}
