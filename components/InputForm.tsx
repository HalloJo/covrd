"use client";

import { useState } from "react";
import { Briefcase, FileText, Sparkles, Loader2, AlertCircle } from "lucide-react";

interface InputFormProps {
  onSubmit: (jobDescription: string, cvText: string) => void;
  isLoading: boolean;
}

interface FieldErrors {
  jobDescription: string | null;
  cvText: string | null;
}

const JD_MIN = 200;
const JD_MAX = 3000;
const CV_MIN = 100;
const CV_MAX = 3000;

function CharCounter({ current, max }: { current: number; max: number }) {
  const isNear = current > max * 0.85;
  const isOver = current > max;
  return (
    <span
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "0.75rem",
        color: isOver
          ? "#DC2626"
          : isNear
          ? "var(--color-warning)"
          : "var(--color-muted)",
        fontWeight: isOver ? 600 : 400,
      }}
    >
      {current} / {max}
    </span>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "5px",
        animation: "var(--animate-slide-up)",
        opacity: 0,
      }}
    >
      <AlertCircle
        size={13}
        style={{ color: "var(--color-warning)", flexShrink: 0, marginTop: "2px" }}
      />
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.8125rem",
          color: "var(--color-warning)",
        }}
      >
        {message}
      </span>
    </div>
  );
}

export default function InputForm({ onSubmit, isLoading }: InputFormProps) {
  const [jobDescription, setJobDescription] = useState("");
  const [cvText, setCvText] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({
    jobDescription: null,
    cvText: null,
  });

  const validate = (): boolean => {
    const newErrors: FieldErrors = { jobDescription: null, cvText: null };

    if (jobDescription.trim().length < JD_MIN) {
      newErrors.jobDescription = `Job description must be at least ${JD_MIN} characters.`;
    } else if (jobDescription.trim().length > JD_MAX) {
      newErrors.jobDescription = `Job description must be under ${JD_MAX} characters.`;
    }

    if (cvText.trim().length < CV_MIN) {
      newErrors.cvText = `CV must be at least ${CV_MIN} characters.`;
    } else if (cvText.trim().length > CV_MAX) {
      newErrors.cvText = `CV must be under ${CV_MAX} characters.`;
    }

    setErrors(newErrors);
    return !newErrors.jobDescription && !newErrors.cvText;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(jobDescription, cvText);
    }
  };

  const textareaBase: React.CSSProperties = {
    width: "100%",
    minHeight: "220px",
    resize: "vertical",
    fontFamily: "var(--font-sans)",
    fontSize: "0.9375rem",
    lineHeight: 1.6,
    color: "var(--color-text)",
    backgroundColor: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "12px",
    padding: "14px 16px",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          marginBottom: "28px",
        }}
      >
        {/* Job Description */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "0.9375rem",
              color: "var(--color-text)",
            }}
          >
            <Briefcase size={16} style={{ color: "var(--color-accent)" }} />
            Job Description
          </label>
          <div style={{ position: "relative" }}>
            <textarea
              value={jobDescription}
              onChange={(e) => {
                setJobDescription(e.target.value);
                if (errors.jobDescription) {
                  setErrors((prev) => ({ ...prev, jobDescription: null }));
                }
              }}
              placeholder="Paste the full job description here..."
              maxLength={JD_MAX + 200}
              disabled={isLoading}
              style={{
                ...textareaBase,
                borderColor: errors.jobDescription
                  ? "var(--color-warning)"
                  : "var(--color-border)",
              }}
              onFocus={(e) => {
                if (!errors.jobDescription) {
                  (e.currentTarget as HTMLTextAreaElement).style.borderColor =
                    "var(--color-accent)";
                  (e.currentTarget as HTMLTextAreaElement).style.boxShadow =
                    "0 0 0 3px rgba(61,107,79,0.12)";
                }
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLTextAreaElement).style.borderColor =
                  errors.jobDescription
                    ? "var(--color-warning)"
                    : "var(--color-border)";
                (e.currentTarget as HTMLTextAreaElement).style.boxShadow = "none";
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", minHeight: "18px" }}>
            {errors.jobDescription ? (
              <FieldError message={errors.jobDescription} />
            ) : (
              <span />
            )}
            <CharCounter current={jobDescription.length} max={JD_MAX} />
          </div>
        </div>

        {/* CV */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "0.9375rem",
              color: "var(--color-text)",
            }}
          >
            <FileText size={16} style={{ color: "var(--color-accent)" }} />
            Your CV / Resume
          </label>
          <div style={{ position: "relative" }}>
            <textarea
              value={cvText}
              onChange={(e) => {
                setCvText(e.target.value);
                if (errors.cvText) {
                  setErrors((prev) => ({ ...prev, cvText: null }));
                }
              }}
              placeholder="Paste your CV or resume here..."
              maxLength={CV_MAX + 200}
              disabled={isLoading}
              style={{
                ...textareaBase,
                borderColor: errors.cvText
                  ? "var(--color-warning)"
                  : "var(--color-border)",
              }}
              onFocus={(e) => {
                if (!errors.cvText) {
                  (e.currentTarget as HTMLTextAreaElement).style.borderColor =
                    "var(--color-accent)";
                  (e.currentTarget as HTMLTextAreaElement).style.boxShadow =
                    "0 0 0 3px rgba(61,107,79,0.12)";
                }
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLTextAreaElement).style.borderColor =
                  errors.cvText ? "var(--color-warning)" : "var(--color-border)";
                (e.currentTarget as HTMLTextAreaElement).style.boxShadow = "none";
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", minHeight: "18px" }}>
            {errors.cvText ? <FieldError message={errors.cvText} /> : <span />}
            <CharCounter current={cvText.length} max={CV_MAX} />
          </div>
        </div>
      </div>

      {/* Submit button */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          type="submit"
          disabled={isLoading}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: "1rem",
            color: "var(--color-surface)",
            backgroundColor: isLoading ? "#6B9B7F" : "var(--color-accent)",
            border: "none",
            borderRadius: "9999px",
            padding: "14px 36px",
            cursor: isLoading ? "not-allowed" : "pointer",
            transition: "all 0.2s",
            minHeight: "52px",
            minWidth: "240px",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              (e.currentTarget as HTMLButtonElement).style.opacity = "0.9";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "scale(1.02)";
            }
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "1";
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
        >
          {isLoading ? (
            <>
              <Loader2
                size={18}
                style={{ animation: "spin 1s linear infinite" }}
              />
              Analysing your fit...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Tailor My Application
            </>
          )}
        </button>
      </div>
    </form>
  );
}
