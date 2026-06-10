import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "outline" | "gold";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
}

const variants = {
  primary: "bg-[#082B5C] hover:bg-[#0d3d7a] text-white border-2 border-[#082B5C] hover:border-[#0d3d7a]",
  outline: "bg-transparent hover:bg-white/10 text-white border-2 border-white",
  gold: "bg-[#F59E0B] hover:bg-[#e08e00] text-[#082B5C] border-2 border-[#F59E0B] hover:border-[#e08e00]",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm font-semibold",
  lg: "px-8 py-4 text-base font-semibold",
};

export default function CTAButton({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
}: Props) {
  const cls = `inline-flex items-center justify-center gap-2 rounded font-semibold transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
