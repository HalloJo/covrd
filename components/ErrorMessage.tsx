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
  const Icon = isRateLimit
    ? Coffee
    : variant === "card"
    ? XCircle
    : AlertCircle;

  if (variant === "card") {
    return (
      <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-6 flex flex-col items-center gap-3 text-center animate-slide-up">
        <Icon size={32} className="text-[#DC2626]" />
        <p className="font-sans text-[#7F1D1D] text-base leading-[1.6]">
          {message}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="font-sans font-semibold text-sm text-surface bg-[#DC2626] border-0 rounded-full py-2.5 px-6 cursor-pointer transition-all duration-200 hover:opacity-90"
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-start gap-1.5 animate-slide-up">
      <Icon size={14} className="text-warning shrink-0 mt-0.5" />
      <span className="font-sans text-[0.8125rem] text-warning">{message}</span>
    </div>
  );
}
