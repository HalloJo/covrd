"use client";

import { Lightbulb, ArrowRight } from "lucide-react";

interface ImprovementTipsProps {
  tips: string[];
}

export default function ImprovementTips({ tips }: ImprovementTipsProps) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-7 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-2 mb-5">
        <Lightbulb size={20} className="text-accent" />
        <h2 className="font-serif font-bold text-[1.375rem] text-text m-0">
          Tips to Strengthen Your Application
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {tips.map((tip, i) => (
          <div
            key={i}
            className="flex gap-4 items-start p-4 bg-background rounded-xl border border-border animate-slide-in-right opacity-0"
            style={{ animationDelay: `${0.1 + i * 0.1}s` }}
          >
            <div className="w-7 h-7 rounded-full bg-accent text-surface flex items-center justify-center font-sans font-bold text-[0.8125rem] shrink-0">
              {i + 1}
            </div>
            <p className="font-sans text-[0.9375rem] text-text leading-[1.6] m-0 flex-1">
              {tip}
            </p>
            <ArrowRight size={16} className="text-accent shrink-0 mt-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
