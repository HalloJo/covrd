"use client";

import { useRef } from "react";
import { Sparkles } from "lucide-react";
import Header from "@/components/Header";
import InputForm from "@/components/InputForm";
import ResultsPanel from "@/components/ResultsPanel";
import LoadingState from "@/components/LoadingState";
import ErrorMessage from "@/components/ErrorMessage";
import { useGenerate } from "@/hooks/useGenerate";

export default function Home() {
  const { result, isLoading, error, generate, reset } = useGenerate();
  const formRef = useRef<HTMLDivElement>(null);

  const handleStartOver = () => {
    reset();
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Header />
      <main className="max-w-280 mx-auto px-6 pb-20">
        {/* Hero */}
        <section ref={formRef} className="pt-18 pb-14 text-center">
          <div className="flex items-center justify-center gap-2.5 mb-5">
            <Sparkles size={22} className="text-accent" />
            <span className="font-sans font-medium text-[0.9rem] text-accent tracking-[0.04em] uppercase">
              AI-powered application tailoring
            </span>
          </div>
          <h1 className="font-serif font-black text-[clamp(2.5rem,6vw,4rem)] text-text leading-[1.1] mx-auto mb-5 max-w-[780px]">
            Your CV. Their job.{" "}
            <span className="text-accent">Perfect match.</span>
          </h1>
          <p className="font-sans text-[clamp(1rem,2.5vw,1.1875rem)] text-muted leading-[1.7] mx-auto max-w-[620px]">
            Paste a job description and your CV — Covrd writes a tailored cover
            letter and shows exactly what keywords you&apos;re missing.
          </p>
        </section>

        {/* Input form card */}
        <section className="bg-surface border border-border rounded-[20px] p-9 shadow-[0_2px_12px_rgba(0,0,0,0.05)] mb-12">
          <InputForm onSubmit={generate} isLoading={isLoading} />
        </section>

        {/* API-level error card (rate limit, network) */}
        {error && !isLoading && (
          <section className="mb-12">
            <ErrorMessage message={error} variant="card" onRetry={handleStartOver} />
          </section>
        )}

        {/* Loading skeletons */}
        {isLoading && (
          <section>
            <LoadingState />
          </section>
        )}

        {/* Results */}
        {result && !isLoading && (
          <section>
            <ResultsPanel
              result={result}
              onRegenerate={() => {
                reset();
              }}
              onStartOver={handleStartOver}
            />
          </section>
        )}
      </main>
    </>
  );
}
