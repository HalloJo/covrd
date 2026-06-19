"use client";

import { FileCheck } from "lucide-react";

export default function Header() {
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
      </div>
    </header>
  );
}
