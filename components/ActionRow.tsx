"use client";

import { Copy, Check, RefreshCw, RotateCcw } from "lucide-react";
import { useClipboard } from "@/hooks/useClipboard";

interface ActionRowProps {
  coverLetter: string;
  onRegenerate: () => void;
  onStartOver: () => void;
}

function OutlineButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        fontFamily: "var(--font-sans)",
        fontWeight: 500,
        fontSize: "0.9375rem",
        color: "var(--color-accent)",
        backgroundColor: "transparent",
        border: "1px solid var(--color-accent)",
        borderRadius: "9999px",
        padding: "10px 24px",
        cursor: "pointer",
        transition: "all 0.2s",
        minHeight: "44px",
        flex: "1 1 auto",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
          "var(--color-accent-light)";
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
          "transparent";
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
      }}
    >
      {children}
    </button>
  );
}

export default function ActionRow({
  coverLetter,
  onRegenerate,
  onStartOver,
}: ActionRowProps) {
  const { copied, copy } = useClipboard();

  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
        animation: "var(--animate-fade-in)",
        animationDelay: "0.3s",
        opacity: 0,
      }}
    >
      <OutlineButton onClick={() => copy(coverLetter)}>
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? "Copied!" : "Copy Cover Letter"}
      </OutlineButton>
      <OutlineButton onClick={onRegenerate}>
        <RefreshCw size={16} />
        Regenerate
      </OutlineButton>
      <OutlineButton onClick={onStartOver}>
        <RotateCcw size={16} />
        Start Over
      </OutlineButton>
    </div>
  );
}
