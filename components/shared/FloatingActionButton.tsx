"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MessageCircle, X, Mail, Calendar } from "lucide-react";

export default function FloatingActionButton() {
  const [open, setOpen] = useState(false);

  const actions = [
    {
      label: "Email Us",
      href: "mailto:support@cpa-dmv.com",
      icon: Mail,
      color: "bg-white text-[#082B5C]",
    },
    {
      label: "Book a Call",
      href: "/contact",
      icon: Calendar,
      color: "bg-[#082B5C] text-white",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Sub-actions */}
      <AnimatePresence>
        {open &&
          actions.map((action, i) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 12, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.88 }}
              transition={{ duration: 0.2, delay: i * 0.06, ease: "easeOut" }}
              className="flex items-center gap-2.5"
            >
              <span className="bg-white text-[#082B5C] text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap border border-gray-100">
                {action.label}
              </span>
              <Link
                href={action.href}
                onClick={() => setOpen(false)}
                className={`w-10 h-10 rounded-full ${action.color} flex items-center justify-center shadow-lg hover:scale-110 transition-transform border border-white/20`}
                aria-label={action.label}
              >
                <action.icon size={16} />
              </Link>
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Main FAB — gold */}
      <div className="relative">
        {/* Outer pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#F59E0B]/35"
          animate={{ scale: [1, 1.6, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Inner ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[#F59E0B]/20"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />

        <motion.button
          onClick={() => setOpen((o) => !o)}
          whileHover={{ scale: 1.1, boxShadow: "0 0 24px rgba(245,158,11,0.55)" }}
          whileTap={{ scale: 0.93 }}
          className="relative w-14 h-14 rounded-full bg-[#F59E0B] text-white flex items-center justify-center shadow-xl shadow-[#F59E0B]/40 transition-colors hover:bg-[#e08e00]"
          aria-label="Contact options"
        >
          <motion.div
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.22 }}
          >
            {open ? <X size={21} /> : <MessageCircle size={21} />}
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}
