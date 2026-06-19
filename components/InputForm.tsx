"use client";

import { useState } from "react";
import {
  Briefcase,
  FileText,
  Sparkles,
  Loader2,
  AlertCircle,
} from "lucide-react";

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

const textareaBase =
  "w-full min-h-[220px] resize-y font-sans text-[0.9375rem] leading-[1.6] text-text bg-surface border rounded-xl py-[14px] px-4 outline-none transition-[border-color,box-shadow] duration-200 focus:shadow-[0_0_0_3px_rgba(61,107,79,0.12)] disabled:opacity-50";

function CharCounter({ current, max }: { current: number; max: number }) {
  const isNear = current > max * 0.85;
  const isOver = current > max;
  return (
    <span
      className={`font-sans text-xs ${
        isOver
          ? "text-[#DC2626] font-semibold"
          : isNear
          ? "text-warning font-normal"
          : "text-muted font-normal"
      }`}
    >
      {current} / {max}
    </span>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-1.25 animate-slide-up opacity-0">
      <AlertCircle size={13} className="text-warning shrink-0 mt-0.5" />
      <span className="font-sans text-[0.8125rem] text-warning">{message}</span>
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 mb-7">
        {/* Job Description */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-1.5 font-sans font-semibold text-[0.9375rem] text-text">
            <Briefcase size={16} className="text-accent" />
            Job Description
          </label>
          <div className="relative">
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
              className={`${textareaBase} ${
                errors.jobDescription
                  ? "border-warning focus:border-warning"
                  : "border-border focus:border-accent"
              }`}
            />
          </div>
          <div className="flex justify-between items-start min-h-4.5">
            {errors.jobDescription ? (
              <FieldError message={errors.jobDescription} />
            ) : (
              <span />
            )}
            <CharCounter current={jobDescription.length} max={JD_MAX} />
          </div>
        </div>

        {/* CV */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-1.5 font-sans font-semibold text-[0.9375rem] text-text">
            <FileText size={16} className="text-accent" />
            Your CV / Resume
          </label>
          <div className="relative">
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
              className={`${textareaBase} ${
                errors.cvText
                  ? "border-warning focus:border-warning"
                  : "border-border focus:border-accent"
              }`}
            />
          </div>
          <div className="flex justify-between items-start min-h-4.5">
            {errors.cvText ? <FieldError message={errors.cvText} /> : <span />}
            <CharCounter current={cvText.length} max={CV_MAX} />
          </div>
        </div>
      </div>

      {/* Submit button */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isLoading}
          className={`flex items-center justify-center gap-2 font-sans font-semibold text-base text-surface border-0 rounded-full py-3.5 px-9 transition-all duration-200 min-h-13 min-w-60 ${
            isLoading
              ? "bg-[#6B9B7F] cursor-not-allowed"
              : "bg-accent cursor-pointer hover:opacity-90 hover:scale-[1.02]"
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
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
