"use client";

import { AlertCircle, XCircle, Coffee } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  variant?: "inline" | "card";
  onRetry?: () => void;
}

export default function ErrorMessage({
  message,
  variant = "inline",
  onRetry,
}: ErrorMessageProps) {
  const isRateLimit = message.includes("breath");
  const Icon = isRateLimit ? Coffee : variant === "card" ? XCircle : AlertCircle;

  if (variant === "card") {
    return (
      <div
        style={{
          backgroundColor: "#FEF2F2",
          border: "1px solid #FECACA",
          borderRadius: "12px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          textAlign: "center",
          animation: "var(--animate-slide-up)",
        }}
      >
        <Icon size={32} style={{ color: "#DC2626" }} />
        <p
          style={{
            fontFamily: "var(--font-sans)",
            color: "#7F1D1D",
            fontSize: "1rem",
            lineHeight: 1.6,
          }}
        >
          {message}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "0.875rem",
              color: "var(--color-surface)",
              backgroundColor: "#DC2626",
              border: "none",
              borderRadius: "9999px",
              padding: "10px 24px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "0.9";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "1";
            }}
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "6px",
        animation: "var(--animate-slide-up)",
      }}
    >
      <Icon
        size={14}
        style={{ color: "var(--color-warning)", flexShrink: 0, marginTop: "2px" }}
      />
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.8125rem",
          color: "var(--color-warning)",
        }}
      >
        {message}
      </span>
    </div>
  );
}
