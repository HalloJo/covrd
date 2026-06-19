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
      className="flex items-center justify-center gap-2 font-sans font-medium text-[0.9375rem] text-accent bg-transparent border border-accent rounded-full py-2.5 px-6 cursor-pointer transition-all duration-200 min-h-11 flex-auto hover:bg-accent-light hover:scale-[1.02]"
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
    <div className="flex gap-3 flex-wrap animate-fade-in opacity-0 [animation-delay:0.3s]">
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
