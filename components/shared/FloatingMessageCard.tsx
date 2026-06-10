"use client";

import { motion } from "framer-motion";

interface Props {
  message: string;
  sender: string;
  role: string;
  side: "left" | "right";
  delay?: number;
}

export default function FloatingMessageCard({ message, sender, role, side, delay = 0 }: Props) {
  return (
    <motion.div
      className={`absolute ${
        side === "left"
          ? "left-4 sm:left-8 lg:-left-4"
          : "right-4 sm:right-8 lg:-right-4"
      } glass rounded-2xl p-4 max-w-[220px] shadow-2xl`}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: { delay: delay + 0.5, duration: 0.6 },
        y: {
          delay: delay + 0.5,
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <p className="text-white text-xs leading-relaxed mb-2">{message}</p>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-[#F59E0B] flex items-center justify-center text-[#082B5C] text-[10px] font-bold flex-shrink-0">
          {sender[0]}
        </div>
        <div>
          <p className="text-white text-[10px] font-semibold leading-none">{sender}</p>
          <p className="text-white/50 text-[9px] mt-0.5">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}
