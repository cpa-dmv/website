/**
 * SVG recreation of the CPA-DMV logo mark.
 * Replace with <Image src="/images/logo.png" …/> once the PNG is saved to public/images/logo.png
 */
export default function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="CPA-DMV logo mark"
    >
      {/* Green left mountain */}
      <polyline
        points="5,72 28,30 42,52 52,38"
        stroke="#5CB85C"
        strokeWidth="7"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
      {/* Navy right mountain */}
      <polyline
        points="48,38 62,20 95,72"
        stroke="#082B5C"
        strokeWidth="7"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
      {/* Bar chart — 4 bars: green, teal, sky, navy */}
      <rect x="42" y="58" width="8" height="14" rx="1" fill="#5CB85C" />
      <rect x="53" y="52" width="8" height="20" rx="1" fill="#20B2AA" />
      <rect x="64" y="44" width="8" height="28" rx="1" fill="#29ABE2" />
      <rect x="75" y="36" width="8" height="36" rx="1" fill="#082B5C" />
      {/* Swoosh arc */}
      <path
        d="M8,76 Q50,88 92,76"
        stroke="#082B5C"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
