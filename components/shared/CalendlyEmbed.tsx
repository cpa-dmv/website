"use client";

import { useEffect } from "react";

interface Props {
  url?: string;
  minHeight?: number;
}

export default function CalendlyEmbed({
  url = "https://calendly.com/cpa-dmv-support/30min",
  minHeight = 650,
}: Props) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget w-full rounded-xl overflow-hidden"
      data-url={url}
      style={{ minHeight, height: minHeight, width: "100%" }}
    />
  );
}
