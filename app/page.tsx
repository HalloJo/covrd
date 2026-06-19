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
      <main
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        {/* Hero */}
        <section
          ref={formRef}
          style={{
            paddingTop: "72px",
            paddingBottom: "56px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <Sparkles size={22} style={{ color: "var(--color-accent)" }} />
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "0.9rem",
                color: "var(--color-accent)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              AI-powered application tailoring
            </span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              color: "var(--color-text)",
              lineHeight: 1.1,
              margin: "0 auto 20px",
              maxWidth: "780px",
            }}
          >
            Your CV. Their job.{" "}
            <span style={{ color: "var(--color-accent)" }}>Perfect match.</span>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(1rem, 2.5vw, 1.1875rem)",
              color: "var(--color-muted)",
              lineHeight: 1.7,
              margin: "0 auto",
              maxWidth: "620px",
            }}
          >
            Paste a job description and your CV — Covrd writes a tailored cover
            letter and shows exactly what keywords you&apos;re missing.
          </p>
        </section>

        {/* Input form card */}
        <section
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "20px",
            padding: "36px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            marginBottom: "48px",
          }}
        >
          <InputForm onSubmit={generate} isLoading={isLoading} />
        </section>

        {/* API-level error card (rate limit, network) */}
        {error && !isLoading && (
          <section style={{ marginBottom: "48px" }}>
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
