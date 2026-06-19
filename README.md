# Covrd

**Land the job. Every time.**

Covrd analyses a job description alongside your CV and instantly produces a tailored cover letter, a match score, missing keyword alerts, and concrete improvement tips — all powered by Claude AI.

---

## What it does

1. You paste a job description and your CV.
2. Covrd calls Claude via a secure server-side API route.
3. You get back:
   - **Match score** — how well your CV aligns with the role (0–100)
   - **Tailored cover letter** — 3 paragraphs referencing specific details from both documents
   - **Missing keywords** — terms in the JD that aren't in your CV
   - **Keywords you have** — what's already working
   - **3 improvement tips** — concrete, actionable next steps

---

## Tech stack

- **Next.js 16** (App Router, TypeScript strict mode)
- **Tailwind CSS v4** (`@import "tailwindcss"` + `@theme` — no config file)
- **Lucide React** for icons throughout
- **Claude API** (`claude-sonnet-4-6`) via `@anthropic-ai/sdk`
- **DM Sans** (body) + **Playfair Display** (headings) from Google Fonts

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the API key

Copy `.env.example` to `.env.local` and add your Anthropic API key:

```bash
cp .env.example .env.local
```

```env
ANTHROPIC_API_KEY=sk-ant-...
```

Get a key at [console.anthropic.com](https://console.anthropic.com).

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Security

All Claude API calls go through the Next.js route handler at `app/api/generate/route.ts`. The API key **never** leaves the server — the browser only calls `/api/generate`, which proxies to Anthropic. Input is sanitised (HTML stripped) and rate-limited to 10 requests per IP per minute before the Claude call is made.

---

## Deploy to Vercel

1. Push to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. In **Settings → Environment Variables**, add:
   - `ANTHROPIC_API_KEY` = your key (Production + Preview)
4. Deploy.

---

*Built with vibe coding + Claude*
