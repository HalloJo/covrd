"use client";

import { Tag } from "lucide-react";

interface KeywordBadgeProps {
  keyword: string;
  variant: "missing" | "present";
  delay?: string;
}

export default function KeywordBadge({
  keyword,
  variant,
  delay = "0s",
}: KeywordBadgeProps) {
  const isMissing = variant === "missing";

  return (
    <span
      className={`inline-flex items-center gap-1.25 py-1.25 px-3 rounded-full font-sans font-medium text-[0.8125rem] border animate-fade-in opacity-0 transition-transform duration-150 cursor-default hover:scale-105 ${
        isMissing
          ? "bg-[#FEF3C7] text-warning border-[#FDE68A]"
          : "bg-accent-light text-accent border-[#BBD8C6]"
      }`}
      style={{ animationDelay: delay }}
    >
      <Tag size={11} />
      {keyword}
    </span>
  );
}
