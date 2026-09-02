import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  HeartHandshake,
  Landmark,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";

const lifeStages = [
  { label: "Education", icon: GraduationCap },
  { label: "Career", icon: BriefcaseBusiness },
  { label: "Finances", icon: Landmark },
  { label: "Marriage", icon: HeartHandshake },
  { label: "Family", icon: UsersRound },
  { label: "Stability", icon: ShieldCheck },
];

function LifeTree() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]" aria-hidden="true">
      <div className="absolute inset-[8%] rounded-full border border-[#d9b98e]/35" />
      <div className="absolute inset-[17%] rounded-full border border-[#d9b98e]/20" />
      <div className="absolute inset-[2%] rounded-full bg-[radial-gradient(circle,rgba(255,246,232,0.95)_0%,rgba(255,246,232,0.35)_55%,transparent_72%)]" />

      <svg viewBox="0 0 520 520" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="whole-life-trunk" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#263f57" />
            <stop offset="1" stopColor="#527b75" />
          </linearGradient>
        </defs>
        <path
          d="M258 417c1-72 1-117-2-161m2 70c-42-24-72-54-90-92m89 61c41-27 68-60 83-98m-84 69c-24-53-24-94-3-130m5 112c29-42 62-68 101-78"
          fill="none"
          stroke="url(#whole-life-trunk)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {([
          [145, 213, 42, "#d89176"], [174, 165, 36, "#e9aa68"], [224, 121, 39, "#839d8c"],
          [287, 111, 42, "#d89176"], [344, 143, 38, "#e9aa68"], [382, 191, 40, "#527b75"],
          [355, 246, 34, "#839d8c"], [298, 210, 31, "#e9aa68"], [205, 247, 34, "#527b75"],
          [150, 278, 31, "#e9aa68"], [317, 284, 28, "#d89176"], [216, 190, 27, "#839d8c"],
        ] as const).map(([cx, cy, r, fill], index) => (
          <circle key={index} cx={cx} cy={cy} r={r} fill={fill} opacity="0.92" />
        ))}
        <path d="M205 427c26-16 83-16 109 0" fill="none" stroke="#d4a15f" strokeWidth="5" strokeLinecap="round" />
        <path d="M226 445c18-10 50-10 68 0" fill="none" stroke="#d4a15f" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
      </svg>

      <div className="absolute left-[3%] top-[18%] rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-[0_14px_45px_rgba(38,63,87,0.1)] backdrop-blur-md">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a66f4e]">Start early</p>
        <p className="mt-0.5 text-sm font-semibold text-[#263f57]">Build with intention</p>
      </div>
      <div className="absolute bottom-[15%] right-[1%] rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-[0_14px_45px_rgba(38,63,87,0.1)] backdrop-blur-md">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#527b75]">For every stage</p>
        <p className="mt-0.5 text-sm font-semibold text-[#263f57]">One trusted system</p>
      </div>
    </div>
  );
}

export default function WholeLifeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#fbf7f0] pt-[70px]">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_16%,rgba(216,145,118,0.14),transparent_28%),radial-gradient(circle_at_86%_72%,rgba(82,123,117,0.15),transparent_28%)]" />
      <div className="absolute inset-0 -z-10 opacity-45 [background-image:linear-gradient(rgba(38,63,87,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(38,63,87,0.035)_1px,transparent_1px)] [background-size:52px_52px]" />

      <div className="mx-auto grid min-h-[calc(100vh-70px)] max-w-[1280px] items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6 lg:px-8 lg:py-16">
        <div className="relative z-10 max-w-[720px]">
          <div className="mb-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
            <Image
              src="/images/whole-life-logo-transparent.png"
              alt="Whole Life — Guidance, Commitment, Perseverance"
              width={112}
              height={112}
              priority
              className="h-auto w-[96px] shrink-0 sm:w-[108px]"
            />
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d4a15f]/30 bg-white/65 px-4 py-2 text-xs font-semibold text-[#6c5244] shadow-sm backdrop-blur-sm">
              <Sparkles size={14} className="text-[#c27d55]" />
              A lifetime partnership, not a one-time service
            </div>
          </div>

          <h1 className="max-w-[700px] font-display text-[clamp(2.85rem,5.5vw,5.35rem)] font-bold leading-[0.98] tracking-[-0.045em] text-[#263f57]">
            One system for your
            <span className="block bg-gradient-to-r from-[#c46f57] via-[#d39155] to-[#527b75] bg-clip-text text-transparent">
              whole life.
            </span>
          </h1>

          <p className="mt-6 max-w-[650px] text-base leading-7 text-[#5f6060] sm:text-lg sm:leading-8">
            Continuous, thoughtful counseling through the decisions that shape your future—from education and career to finances, marriage, family, and long-term stability.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#263f57] px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(38,63,87,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#1c3144]"
            >
              Start the conversation
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#life-journey"
              className="inline-flex items-center justify-center rounded-full border border-[#263f57]/20 bg-white/55 px-6 py-3.5 text-sm font-bold text-[#263f57] transition-colors hover:bg-white"
            >
              Explore the journey
            </a>
          </div>

          <ol className="mt-10 grid grid-cols-3 gap-x-3 gap-y-4 border-t border-[#263f57]/10 pt-6 sm:grid-cols-6">
            {lifeStages.map(({ label, icon: Icon }, index) => (
              <li key={label} className="relative flex flex-col gap-2">
                <span className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#527b75] shadow-sm ring-1 ring-[#263f57]/8">
                    <Icon size={15} strokeWidth={1.8} />
                  </span>
                  {index < lifeStages.length - 1 && <span className="hidden h-px flex-1 bg-[#d4a15f]/45 sm:block" />}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#6d6a65]">{label}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative hidden lg:block">
          <LifeTree />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4a15f]/45 to-transparent" />
    </section>
  );
}
