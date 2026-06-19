"use client";

import { useState } from "react";
import type { CovrdResult, ApiError } from "@/types/covrd";

interface UseGenerateReturn {
  result: CovrdResult | null;
  isLoading: boolean;
  error: string | null;
  generate: (jobDescription: string, cvText: string) => Promise<void>;
  reset: () => void;
}

export function useGenerate(): UseGenerateReturn {
  const [result, setResult] = useState<CovrdResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async (jobDescription: string, cvText: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription, cvText }),
      });

      const data: CovrdResult | ApiError = await response.json();

      if (!response.ok || "error" in data) {
        const apiError = data as ApiError;
        setError(apiError.error ?? "Something went wrong. Please try again.");
        return;
      }

      setResult(data as CovrdResult);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
    setIsLoading(false);
  };

  return { result, isLoading, error, generate, reset };
}
