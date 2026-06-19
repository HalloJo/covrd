"use client";

import { useRef, useEffect, useState } from "react";
import { AlertTriangle, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import type { CovrdResult } from "@/types/covrd";
import ScoreBanner from "@/components/ScoreBanner";
import CoverLetterCard from "@/components/CoverLetterCard";
import KeywordBadge from "@/components/KeywordBadge";
import ImprovementTips from "@/components/ImprovementTips";
import ActionRow from "@/components/ActionRow";

interface ResultsPanelProps {
  result: CovrdResult;
  onRegenerate: () => void;
  onStartOver: () => void;
}

export default function ResultsPanel({
  result,
  onRegenerate,
  onStartOver,
}: ResultsPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [presentExpanded, setPresentExpanded] = useState(false);

  useEffect(() => {
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div
      ref={panelRef}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        scrollMarginTop: "80px",
      }}
    >
      <ScoreBanner score={result.matchScore} />
      <CoverLetterCard coverLetter={result.coverLetter} onRegenerate={onRegenerate} />

      {/* Missing Keywords */}
      <div
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "16px",
          padding: "28px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          animation: "var(--animate-slide-up)",
          animationDelay: "0.15s",
          opacity: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <AlertTriangle size={20} style={{ color: "var(--color-warning)" }} />
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              fontSize: "1.375rem",
              color: "var(--color-text)",
              margin: 0,
            }}
          >
            Keywords You&apos;re Missing
          </h2>
        </div>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.9rem",
            color: "var(--color-muted)",
            marginBottom: "16px",
          }}
        >
          Add these to your CV to improve your chances
        </p>

        {result.missingKeywords.length === 0 ? (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <CheckCircle size={18} style={{ color: "var(--color-success)" }} />
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.9375rem",
                color: "var(--color-success)",
                fontWeight: 500,
              }}
            >
              Great news — your CV covers all key terms!
            </span>
          </div>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {result.missingKeywords.map((kw, i) => (
              <KeywordBadge
                key={kw}
                keyword={kw}
                variant="missing"
                delay={`${i * 0.05}s`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Present Keywords */}
      <div
        style={{
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "16px",
          padding: "28px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          animation: "var(--animate-fade-in)",
          animationDelay: "0.2s",
          opacity: 0,
        }}
      >
        <button
          onClick={() => setPresentExpanded((prev) => !prev)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            gap: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <CheckCircle size={20} style={{ color: "var(--color-success)" }} />
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 700,
                fontSize: "1.375rem",
                color: "var(--color-text)",
                margin: 0,
              }}
            >
              What You&apos;ve Got
            </h2>
          </div>
          {presentExpanded ? (
            <ChevronUp size={20} style={{ color: "var(--color-muted)" }} />
          ) : (
            <ChevronDown size={20} style={{ color: "var(--color-muted)" }} />
          )}
        </button>

        {presentExpanded && (
          <div
            style={{
              marginTop: "16px",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              animation: "var(--animate-slide-up)",
              opacity: 0,
            }}
          >
            {result.presentKeywords.map((kw, i) => (
              <KeywordBadge
                key={kw}
                keyword={kw}
                variant="present"
                delay={`${i * 0.04}s`}
              />
            ))}
          </div>
        )}
      </div>

      <ImprovementTips tips={result.improvementTips} />
      <ActionRow
        coverLetter={result.coverLetter}
        onRegenerate={onRegenerate}
        onStartOver={onStartOver}
      />
    </div>
  );
}
