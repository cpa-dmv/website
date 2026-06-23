// "use client";

// import { useRef, useState, useEffect } from "react";
// import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import { ArrowRight, MessageSquare } from "lucide-react";

// const rotatingWords = ["bookkeeping", "taxes", "accounting"];

// /* Cards repositioned to stay well inside the tighter hero height */
// const floatingCards = [
//   {
//     id: 1,
//     from: "Marty's Malt Shop",
//     fromInitial: "M",
//     fromColor: "bg-blue-500",
//     message: "Can you provide an update on my tax return?",
//     isClient: true,
//     pos: "top-[18%] left-[3%] lg:left-[2%]",
//     delay: 0.4,
//     floatDelay: 0,
//   },
//   {
//     id: 2,
//     from: "CPA-DMV Team",
//     fromInitial: "C",
//     fromColor: "bg-[#082B5C]",
//     message: "Yes, it's ready for your review!",
//     isClient: false,
//     pos: "top-[34%] right-[3%] lg:right-[2%]",
//     delay: 0.7,
//     floatDelay: 0.5,
//   },
//   {
//     id: 3,
//     from: "Sparkle Car Wash",
//     fromInitial: "S",
//     fromColor: "bg-emerald-500",
//     message: "I have a question about my business structure — can you give me some guidance?",
//     isClient: true,
//     pos: "top-[56%] left-[2%] lg:left-[1%]",
//     delay: 1.0,
//     floatDelay: 1.2,
//   },
//   {
//     id: 4,
//     from: "CPA-DMV Team",
//     fromInitial: "C",
//     fromColor: "bg-[#082B5C]",
//     message: "Of course! Let's set up a time to discuss this.",
//     isClient: false,
//     pos: "bottom-[4%] right-[2%] lg:right-[1%]",
//     delay: 1.3,
//     floatDelay: 0.8,
//   },
// ];

// function RotatingWord() {
//   const [index, setIndex] = useState(0);
//   useEffect(() => {
//     const t = setInterval(() => setIndex((i) => (i + 1) % rotatingWords.length), 2600);
//     return () => clearInterval(t);
//   }, []);
//   return (
//     <span className="block" style={{ minHeight: "1.1em" }}>
//       <AnimatePresence mode="wait">
//         <motion.span
//           key={rotatingWords[index]}
//           initial={{ opacity: 0, y: 14, filter: "blur(5px)" }}
//           animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//           exit={{ opacity: 0, y: -14, filter: "blur(5px)" }}
//           transition={{ duration: 0.35, ease: "easeInOut" }}
//           className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] to-[#FF8500]"
//         >
//           {rotatingWords[index]}
//         </motion.span>
//       </AnimatePresence>
//     </span>
//   );
// }

// function FloatingCard({ card }: { card: (typeof floatingCards)[0] }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.85, y: 16 }}
//       animate={{ opacity: 1, scale: 1, y: 0 }}
//       transition={{ delay: card.delay, duration: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
//       className={`absolute ${card.pos} z-20 hidden md:block`}
//     >
//       <motion.div
//         animate={{ y: [0, card.isClient ? -5 : 5, 0] }}
//         transition={{ delay: card.floatDelay, duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
//         className={`
//           w-[168px] lg:w-[186px] rounded-2xl p-3
//           backdrop-blur-xl border border-white/20
//           shadow-[0_6px_20px_rgba(0,0,0,0.25)]
//           ${card.isClient ? "rounded-tl-sm" : "rounded-tr-sm"}
//         `}
//         style={{
//           background: "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.07) 100%)",
//         }}
//       >
//         <div className={`flex items-start gap-2 ${!card.isClient ? "flex-row-reverse" : ""}`}>
//           <div className={`w-5 h-5 rounded-full ${card.fromColor} flex items-center justify-center flex-shrink-0 text-white text-[9px] font-bold shadow`}>
//             {card.fromInitial}
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className={`text-[9px] font-semibold mb-0.5 ${card.isClient ? "text-white/65" : "text-[#F59E0B]"}`}>
//               {card.from}
//             </p>
//             <p className="text-white text-[10.5px] leading-relaxed">{card.message}</p>
//           </div>
//         </div>
//         <div className="flex justify-end mt-1">
//           <MessageSquare size={8} className="text-white/20" />
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// export default function HeroSection() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { scrollY } = useScroll();

//   /* Shrink only width + border-radius; height stays stable */
//   const videoWidth  = useTransform(scrollY, [0, 400], ["100%", "86%"]);
//   const videoRadius = useTransform(scrollY, [0, 400], [0, 28]);

//   return (
//     <section
//       ref={containerRef}
//       className="relative bg-white overflow-hidden"
//       style={{ minHeight: 620, height: "calc(100vh - 70px)", maxHeight: 720 }}
//     >
//       {/* Shrinking video container — fills section height exactly */}
//       <motion.div
//         className="absolute inset-0 overflow-hidden"
//         style={{ width: videoWidth, borderRadius: videoRadius, left: "50%", x: "-50%" }}
//       >
//         {/* Gradient fallback */}
//         <div className="absolute inset-0 bg-gradient-to-br from-[#082B5C] via-[#061e40] to-[#041830] z-0" />

//         {/* Glow orbs */}
//         <div className="absolute top-1/4 right-1/3 w-[420px] h-[420px] bg-[#F59E0B]/5 rounded-full blur-[90px] z-[1]" />
//         <div className="absolute bottom-1/3 left-1/4 w-[340px] h-[340px] bg-blue-500/4 rounded-full blur-[70px] z-[1]" />

//         {/* Video */}
//         <video
//           className="absolute inset-0 w-full h-full object-cover object-center z-[2]"
//           autoPlay muted loop playsInline
//           poster="/images/hero-poster.jpg"
//         >
//           <source src="/video/hero-bg.mp4" type="video/mp4" />
//         </video>

//         {/* Dark overlay — inside video only */}
//         <div className="absolute inset-0 bg-[#041830]/55 z-[3]" />

//         {/* Floating cards — move with container */}
//         <div className="absolute inset-0 z-[4] pointer-events-none overflow-hidden">
//           {floatingCards.map((card) => (
//             <FloatingCard key={card.id} card={card} />
//           ))}
//         </div>
//       </motion.div>

//       {/* Content — centered in section, slight upward nudge */}
//       <div
//         className="relative z-30 max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8
//                    flex flex-col items-center justify-center text-center h-full"
//         style={{ transform: "translateY(32px)" }}
//       >
//         {/* Eyebrow */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.55, delay: 0.1 }}
//           className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 mb-6"
//         >
//           <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse flex-shrink-0" />
//           <span className="text-white/80 text-xs font-medium tracking-wide">
//             CPA-DMV &nbsp;|&nbsp; Dedication • Mastery • Vision
//           </span>
//         </motion.div>

//         {/* Headline */}
//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.22, ease: [0.25, 0.4, 0.25, 1] }}
//           className="font-display font-bold text-white tracking-tight mb-4 max-w-3xl"
//           style={{ fontSize: "clamp(2.5rem, 4vw, 3.625rem)", lineHeight: 1.02 }}
//         >
//           <span className="block">You grow your business.</span>
//           <span className="block mt-1">We&apos;ll handle the</span>
//           <RotatingWord />
//         </motion.h1>

//         {/* Subheadline */}
//         <motion.p
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.38 }}
//           className="text-white/60 text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed"
//         >
//           Expert CPA services for businesses, individuals, and professionals across the DMV area.
//         </motion.p>

//         {/* CTA */}
//         <motion.div
//           initial={{ opacity: 0, y: 14 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.55, delay: 0.5 }}
//         >
//           <Link
//             href="/contact"
//             className="inline-flex items-center gap-2.5 bg-[#082B5C] hover:bg-[#0d3d7a] text-white font-bold px-6 py-3 rounded-full text-sm shadow-lg transition-all duration-300 hover:scale-105 group"
//           >
//             Schedule a Free Consultation
//             <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
//           </Link>
//         </motion.div>

//         {/* Trust badges */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.85, duration: 0.5 }}
//           className="flex items-center gap-5 mt-5 text-white/38 text-[11px]"
//         >
//           {["CPA Licensed", "CDFA Certified", "AICPA Member"].map((badge, i) => (
//             <span key={badge} className="flex items-center gap-1.5">
//               {i > 0 && <span className="w-0.5 h-0.5 rounded-full bg-white/25" />}
//               {badge}
//             </span>
//           ))}
//         </motion.div>
//       </div>

//       {/* Scroll indicator — pinned to bottom of section */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.4, duration: 0.5 }}
//         className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30"
//       >
//         <motion.div
//           animate={{ y: [0, 6, 0] }}
//           transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
//           className="w-[18px] h-7 border border-white/22 rounded-full flex items-start justify-center pt-1"
//         >
//           <div className="w-0.5 h-1.5 bg-white/35 rounded-full" />
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// }
