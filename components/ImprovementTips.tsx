"use client";

import { Lightbulb, ArrowRight } from "lucide-react";

interface ImprovementTipsProps {
  tips: string[];
}

export default function ImprovementTips({ tips }: ImprovementTipsProps) {
  return (
    <div
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "16px",
        padding: "28px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
        <Lightbulb size={20} style={{ color: "var(--color-accent)" }} />
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 700,
            fontSize: "1.375rem",
            color: "var(--color-text)",
            margin: 0,
          }}
        >
          Tips to Strengthen Your Application
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {tips.map((tip, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "flex-start",
              padding: "16px",
              backgroundColor: "var(--color-background)",
              borderRadius: "12px",
              border: "1px solid var(--color-border)",
              animation: "var(--animate-slide-in-right)",
              animationDelay: `${0.1 + i * 0.1}s`,
              opacity: 0,
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "9999px",
                backgroundColor: "var(--color-accent)",
                color: "var(--color-surface)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "0.8125rem",
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.9375rem",
                color: "var(--color-text)",
                lineHeight: 1.6,
                margin: 0,
                flex: 1,
              }}
            >
              {tip}
            </p>
            <ArrowRight
              size={16}
              style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "4px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
