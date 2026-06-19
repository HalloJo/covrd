"use client";

import { FileCheck } from "lucide-react";
import { useState, useEffect } from "react";

const CREATED_AT = new Date("2026-06-19T10:57:00.000Z");

function useElapsed() {
  const [elapsed, setElapsed] = useState(() => Date.now() - CREATED_AT.getTime());
  useEffect(() => {
    const id = setInterval(() => setElapsed(Date.now() - CREATED_AT.getTime()), 1000);
    return () => clearInterval(id);
  }, []);
  return elapsed;
}

function formatElapsed(ms: number) {
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const parts: string[] = [];
  if (d > 0) parts.push(`${d}d`);
  if (d > 0 || h > 0) parts.push(`${h}h`);
  if (d > 0 || h > 0 || m > 0) parts.push(`${m}m`);
  parts.push(`${String(sec).padStart(2, "0")}s`);
  return parts.join(" ");
}

export default function Header() {
  const elapsed = useElapsed();

  return (
    <header
      style={{
        backgroundColor: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <FileCheck
          size={28}
          style={{ color: "var(--color-accent)", flexShrink: 0 }}
        />
        <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 900,
              fontSize: "1.5rem",
              color: "var(--color-accent)",
              lineHeight: 1,
            }}
          >
            Covrd
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.875rem",
              color: "var(--color-muted)",
              fontWeight: 400,
            }}
          >
            Land the job. Every time.
          </span>
        </div>

        {/* Age counter — pushed to the right */}
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "1px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.6875rem",
              color: "var(--color-muted)",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            live since
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8125rem",
              color: "var(--color-accent)",
              fontWeight: 600,
              letterSpacing: "0.02em",
            }}
          >
            {formatElapsed(elapsed)}
          </span>
        </div>
      </div>
    </header>
  );
}
