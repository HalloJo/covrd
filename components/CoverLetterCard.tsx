"use client";

import { PenLine, Copy, Check, RefreshCw } from "lucide-react";
import { useClipboard } from "@/hooks/useClipboard";

interface CoverLetterCardProps {
  coverLetter: string;
  onRegenerate: () => void;
}

export default function CoverLetterCard({
  coverLetter,
  onRegenerate,
}: CoverLetterCardProps) {
  const { copied, copy } = useClipboard();

  return (
    <div
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "16px",
        padding: "28px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        animation: "var(--animate-slide-up)",
        animationDelay: "0.1s",
        opacity: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <PenLine size={20} style={{ color: "var(--color-accent)" }} />
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              fontSize: "1.375rem",
              color: "var(--color-text)",
              margin: 0,
            }}
          >
            Your Cover Letter
          </h2>
        </div>
        <button
          onClick={() => copy(coverLetter)}
          title="Copy cover letter"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "0.875rem",
            color: copied ? "var(--color-success)" : "var(--color-muted)",
            backgroundColor: "transparent",
            border: "1px solid var(--color-border)",
            borderRadius: "9999px",
            padding: "6px 16px",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "var(--color-accent)";
            (e.currentTarget as HTMLButtonElement).style.color =
              "var(--color-accent)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "var(--color-border)";
            (e.currentTarget as HTMLButtonElement).style.color = copied
              ? "var(--color-success)"
              : "var(--color-muted)";
          }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "1rem",
          lineHeight: 1.8,
          color: "var(--color-text)",
          whiteSpace: "pre-line",
        }}
      >
        {coverLetter}
      </div>

      <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid var(--color-border)" }}>
        <button
          onClick={onRegenerate}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "0.875rem",
            color: "var(--color-accent)",
            backgroundColor: "transparent",
            border: "1px solid var(--color-accent)",
            borderRadius: "9999px",
            padding: "8px 20px",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "var(--color-accent-light)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "transparent";
          }}
        >
          <RefreshCw size={14} />
          Regenerate
        </button>
      </div>
    </div>
  );
}
