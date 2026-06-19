import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import type { CovrdResult } from "@/types/covrd";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }

  if (entry.count >= 10) return false;

  entry.count += 1;
  return true;
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function sanitize(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (!checkRateLimit(ip)) {
    return Response.json(
      {
        error:
          "You've run a few analyses already. Take a breath and try again in a minute. ☕",
      },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("jobDescription" in body) ||
    !("cvText" in body)
  ) {
    return Response.json({ error: "Missing required fields." }, { status: 400 });
  }

  const { jobDescription, cvText } = body as {
    jobDescription: unknown;
    cvText: unknown;
  };

  if (typeof jobDescription !== "string" || typeof cvText !== "string") {
    return Response.json({ error: "Invalid field types." }, { status: 400 });
  }

  const cleanJD = sanitize(jobDescription);
  const cleanCV = sanitize(cvText);

  if (cleanJD.length < 200 || cleanJD.length > 3000) {
    return Response.json(
      { error: "Job description must be between 200 and 3000 characters." },
      { status: 400 }
    );
  }

  if (cleanCV.length < 100 || cleanCV.length > 3000) {
    return Response.json(
      { error: "CV must be between 100 and 3000 characters." },
      { status: 400 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Analysis failed. Please try again." }, { status: 500 });
  }

  const client = new Anthropic({ apiKey });

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      system:
        "You are an expert career coach and professional CV writer. You analyse job descriptions and CVs to help candidates present themselves perfectly. Always respond with valid JSON only — no markdown, no explanation, no code fences.",
      messages: [
        {
          role: "user",
          content: `Analyse this job application.

Job Description:
${cleanJD}

Candidate CV:
${cleanCV}

Return ONLY this exact JSON structure:
{
  "matchScore": number (0-100),
  "coverLetter": "string (tailored 3-paragraph cover letter, warm but confident, references specific details from both JD and CV)",
  "missingKeywords": ["string"] (max 10, keywords in JD not found in CV),
  "presentKeywords": ["string"] (max 15, keywords in JD that ARE in CV),
  "improvementTips": ["string"] (exactly 3 specific actionable tips)
}`,
        },
      ],
    });

    const rawContent = message.content[0];
    if (rawContent.type !== "text") {
      return Response.json({ error: "Analysis failed. Please try again." }, { status: 500 });
    }

    const parsed: CovrdResult = JSON.parse(rawContent.text) as CovrdResult;

    if (
      typeof parsed.matchScore !== "number" ||
      typeof parsed.coverLetter !== "string" ||
      !Array.isArray(parsed.missingKeywords) ||
      !Array.isArray(parsed.presentKeywords) ||
      !Array.isArray(parsed.improvementTips)
    ) {
      return Response.json({ error: "Analysis failed. Please try again." }, { status: 500 });
    }

    return Response.json(parsed);
  } catch {
    return Response.json({ error: "Analysis failed. Please try again." }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ error: "Method not allowed." }, { status: 405 });
}

export async function PUT() {
  return Response.json({ error: "Method not allowed." }, { status: 405 });
}

export async function DELETE() {
  return Response.json({ error: "Method not allowed." }, { status: 405 });
}
