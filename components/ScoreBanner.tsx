"use client";

import { Target } from "lucide-react";

interface ScoreBannerProps {
  score: number;
}

function getScoreColor(score: number): string {
  if (score >= 70) return "#3D6B4F";
  if (score >= 40) return "#B45309";
  return "#DC2626";
}

function getScoreBg(score: number): string {
  if (score >= 70) return "#D1FAE5";
  if (score >= 40) return "#FEF3C7";
  return "#FEE2E2";
}

export default function ScoreBanner({ score }: ScoreBannerProps) {
  const color = getScoreColor(score);
  const bg = getScoreBg(score);
  const circumference = 2 * Math.PI * 36;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <div
      style={{
        backgroundColor: "var(--color-accent-light)",
        border: "1px solid var(--color-border)",
        borderRadius: "16px",
        padding: "32px",
        display: "flex",
        alignItems: "center",
        gap: "28px",
        flexWrap: "wrap",
        animation: "var(--animate-fade-in)",
        opacity: 0,
      }}
    >
      {/* Score ring */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <svg width="88" height="88" viewBox="0 0 88 88">
          <circle
            cx="44"
            cy="44"
            r="36"
            fill={bg}
            stroke="#E5E0D8"
            strokeWidth="6"
          />
          <circle
            cx="44"
            cy="44"
            r="36"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 44 44)"
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 900,
              fontSize: "1.25rem",
              color,
              lineHeight: 1,
            }}
          >
            {score}%
          </span>
        </div>
      </div>

      <div style={{ flex: 1, minWidth: "200px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "8px",
          }}
        >
          <Target size={20} style={{ color: "var(--color-accent)" }} />
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              fontSize: "1.375rem",
              color: "var(--color-text)",
              margin: 0,
            }}
          >
            Your Match Score
          </h2>
        </div>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.9375rem",
            color: "var(--color-muted)",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          Based on keyword alignment and experience match
        </p>
        <div
          style={{
            marginTop: "12px",
            display: "inline-block",
            padding: "4px 14px",
            borderRadius: "9999px",
            backgroundColor: bg,
            border: `1px solid ${color}22`,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "0.8125rem",
              color,
            }}
          >
            {score >= 70
              ? "Strong match — great position!"
              : score >= 40
              ? "Decent match — room to improve"
              : "Low match — tailor your CV"}
          </span>
        </div>
      </div>
    </div>
  );
}
