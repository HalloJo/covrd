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
    <div ref={panelRef} className="flex flex-col gap-6 scroll-mt-20">
      <ScoreBanner score={result.matchScore} />
      <CoverLetterCard coverLetter={result.coverLetter} onRegenerate={onRegenerate} />

      {/* Missing Keywords */}
      <div className="bg-surface border border-border rounded-2xl p-7 shadow-[0_1px_4px_rgba(0,0,0,0.04)] animate-slide-up [animation-delay:0.15s] opacity-0">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle size={20} className="text-warning" />
          <h2 className="font-serif font-bold text-[1.375rem] text-text m-0">
            Keywords You&apos;re Missing
          </h2>
        </div>
        <p className="font-sans text-[0.9rem] text-muted mb-4">
          Add these to your CV to improve your chances
        </p>

        {result.missingKeywords.length === 0 ? (
          <div className="flex items-center gap-2">
            <CheckCircle size={18} className="text-success" />
            <span className="font-sans text-[0.9375rem] text-success font-medium">
              Great news — your CV covers all key terms!
            </span>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
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
      <div className="bg-surface border border-border rounded-2xl p-7 shadow-[0_1px_4px_rgba(0,0,0,0.04)] animate-fade-in [animation-delay:0.2s] opacity-0">
        <button
          onClick={() => setPresentExpanded((prev) => !prev)}
          className="flex items-center justify-between w-full bg-transparent border-0 cursor-pointer p-0 gap-2"
        >
          <div className="flex items-center gap-2">
            <CheckCircle size={20} className="text-success" />
            <h2 className="font-serif font-bold text-[1.375rem] text-text m-0">
              What You&apos;ve Got
            </h2>
          </div>
          {presentExpanded ? (
            <ChevronUp size={20} className="text-muted" />
          ) : (
            <ChevronDown size={20} className="text-muted" />
          )}
        </button>

        {presentExpanded && (
          <div className="mt-4 flex flex-wrap gap-2 animate-slide-up opacity-0">
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
