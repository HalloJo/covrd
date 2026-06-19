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
    <div className="bg-accent-light border border-border rounded-2xl p-8 flex items-center gap-7 flex-wrap animate-fade-in opacity-0">
      {/* Score ring */}
      <div className="relative shrink-0">
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
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-serif font-black text-xl leading-none"
            style={{ color }}
          >
            {score}%
          </span>
        </div>
      </div>

      <div className="flex-1 min-w-50">
        <div className="flex items-center gap-2 mb-2">
          <Target size={20} className="text-accent" />
          <h2 className="font-serif font-bold text-[1.375rem] text-text m-0">
            Your Match Score
          </h2>
        </div>
        <p className="font-sans text-[0.9375rem] text-muted m-0 leading-normal">
          Based on keyword alignment and experience match
        </p>
        <div
          className="mt-3 inline-block py-1 px-3.5 rounded-full"
          style={{ backgroundColor: bg, border: `1px solid ${color}22` }}
        >
          <span
            className="font-sans font-semibold text-[0.8125rem]"
            style={{ color }}
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
