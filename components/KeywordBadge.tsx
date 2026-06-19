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
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        padding: "5px 12px",
        borderRadius: "9999px",
        fontFamily: "var(--font-sans)",
        fontWeight: 500,
        fontSize: "0.8125rem",
        backgroundColor: isMissing ? "#FEF3C7" : "var(--color-accent-light)",
        color: isMissing ? "var(--color-warning)" : "var(--color-accent)",
        border: `1px solid ${isMissing ? "#FDE68A" : "#BBD8C6"}`,
        animation: "var(--animate-fade-in)",
        animationDelay: delay,
        opacity: 0,
        transition: "transform 0.15s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLSpanElement).style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLSpanElement).style.transform = "scale(1)";
      }}
    >
      <Tag size={11} />
      {keyword}
    </span>
  );
}
