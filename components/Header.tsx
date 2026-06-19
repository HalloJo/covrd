"use client";

import { FileCheck } from "lucide-react";
import { useState, useEffect } from "react";

const CREATED_AT = new Date("2026-06-19T10:57:00.000Z");

function useElapsed() {
  const [elapsed, setElapsed] = useState(
    () => Date.now() - CREATED_AT.getTime()
  );
  useEffect(() => {
    const id = setInterval(
      () => setElapsed(Date.now() - CREATED_AT.getTime()),
      1000
    );
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
    <header className="bg-surface border-b border-border sticky top-0 z-50">
      <div className="max-w-280 mx-auto px-6 h-16 flex items-center gap-3">
        <FileCheck size={28} className="text-accent shrink-0" />

        <div className="flex items-baseline gap-3">
          <span className="font-serif font-black text-2xl text-accent leading-none">
            Covrd
          </span>
          <span className="font-sans text-sm text-muted font-normal">
            Land the job. Every time.
          </span>
        </div>

        <div className="ml-auto flex flex-col items-end gap-px">
          <span className="font-sans text-[0.6875rem] text-muted font-medium uppercase tracking-[0.06em]">
            live since
          </span>
          <span className="font-mono text-[0.8125rem] text-accent font-semibold tracking-[0.02em]">
            {formatElapsed(elapsed)}
          </span>
        </div>
      </div>
    </header>
  );
}
