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
    <div className="bg-surface border border-border rounded-2xl p-7 shadow-[0_1px_4px_rgba(0,0,0,0.04)] animate-slide-up [animation-delay:0.1s] opacity-0">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <PenLine size={20} className="text-accent" />
          <h2 className="font-serif font-bold text-[1.375rem] text-text m-0">
            Your Cover Letter
          </h2>
        </div>
        <button
          onClick={() => copy(coverLetter)}
          title="Copy cover letter"
          className={`flex items-center gap-1.5 font-sans font-medium text-sm bg-transparent border border-border rounded-full py-1.5 px-4 cursor-pointer transition-all duration-200 hover:border-accent hover:text-accent ${
            copied ? "text-success" : "text-muted"
          }`}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div className="font-sans text-base leading-[1.8] text-text whitespace-pre-line">
        {coverLetter}
      </div>

      <div className="mt-5 pt-5 border-t border-border">
        <button
          onClick={onRegenerate}
          className="flex items-center gap-1.5 font-sans font-medium text-sm text-accent bg-transparent border border-accent rounded-full py-2 px-5 cursor-pointer transition-all duration-200 hover:bg-accent-light"
        >
          <RefreshCw size={14} />
          Regenerate
        </button>
      </div>
    </div>
  );
}
